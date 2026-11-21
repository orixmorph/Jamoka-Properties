/**
 * Unified Google Sheets Submission Engine (Google Apps Script Web App)
 *
 * Connects EVERY form across the Jamoka Properties website to ONE Google Sheet:
 * - Homepage Inquiry Desk
 * - Contact Page (including Services, Developers, CEO & COO inquiries)
 * - Private Investment Landing Page (Hero, Floating Popup & Full Consultation Desk)
 * - Team Consultation Booking Modal
 * - Property / Off-Plan Project Modals
 * - Mortgage Consultation Form
 * - Careers / Job Application Modal
 * - Mercedes-Benz Places & Dynamic Campaign Landing Pages
 *
 * Configure your deployed Apps Script Web App URL via:
 *   VITE_GOOGLE_SHEETS_WEBHOOK_URL
 * (or update DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL below).
 */

import { trackFormSubmission } from './analytics';

export const DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwYFKM9XL0c42WunGRZsHqY5W7hS08XP1n_sAmUp0cO2CFnST9t4y4H00e7mvHducfhTw/exec';

export const GOOGLE_SHEETS_WEBHOOK_URL = (
  import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_GOOGLE_SHEETS_WEBHOOK_URL
).trim();

const INQUIRY_CONTEXT_KEY = 'jamoka_inquiry_context_v1';

/**
 * Stores lightweight click context (e.g., "Services Page - Golden Visa",
 * "Developers Page - Emaar Properties", "Executive Meeting - CEO") before
 * navigating to the Contact Page so Google Sheets records the exact origin.
 */
export function setInquiryContext(context: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(INQUIRY_CONTEXT_KEY, context.trim());
  } catch {
    // Ignore storage issues in private browsing
  }
}

export function getInquiryContext(): string {
  if (typeof window === 'undefined') return '';
  try {
    return window.sessionStorage.getItem(INQUIRY_CONTEXT_KEY) || '';
  } catch {
    return '';
  }
}

export function clearInquiryContext(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.removeItem(INQUIRY_CONTEXT_KEY);
  } catch {
    // Ignore
  }
}

export type SheetTabName =
  | 'Homepage & Contact'
  | 'Services & Visa'
  | 'Private Investment'
  | 'Projects & Developers'
  | 'Team & Executive'
  | 'Mortgage'
  | 'Careers'
  | 'Campaign Landings';

export interface UniversalSheetPayload {
  action?: string;
  sheetTab?: SheetTabName;
  source?: string;
  subject?: string;
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  preferredLanguage?: string;
  budget?: string;
  displayedCurrency?: string;
  preference?: string;
  project?: string;
  developer?: string;
  price?: string;
  office?: string;
  advisor?: string;
  position?: string;
  department?: string;
  location?: string;
  residencyStatus?: string;
  portfolioUrl?: string;
  financingType?: string;
  estimatedPrice?: string;
  downPayment?: string;
  monthlyPayment?: string;
  timeline?: string;
  message?: string;
  [key: string]: string | undefined;
}

/**
 * Formats a phone number into a 1-click WhatsApp link for Google Sheets.
 */
export function formatSheetWhatsAppLink(
  phoneInput: string,
  leadName: string,
  topic: string
): { cleanNumber: string; waLink: string } {
  if (!phoneInput) return { cleanNumber: '', waLink: '' };

  let digits = phoneInput.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '971' + digits.substring(1);
  } else if (digits.startsWith('00')) {
    digits = digits.substring(2);
  }

  if (!digits) return { cleanNumber: phoneInput, waLink: '' };

  const greeting = encodeURIComponent(
    `Hello ${leadName || 'there'}, thank you for contacting Jamoka Properties Dubai regarding ${
      topic || 'your inquiry'
    }.`
  );

  return {
    cleanNumber: digits,
    waLink: `https://wa.me/${digits}?text=${greeting}`,
  };
}

/**
 * Automatically maps any form's source/subject into a clean tab inside the Google Sheet.
 */
export function resolveSheetTab(source: string, explicitTab?: SheetTabName): SheetTabName {
  if (explicitTab) return explicitTab;
  const s = (source || '').toLowerCase();

  if (s.includes('career') || s.includes('job application')) return 'Careers';
  if (s.includes('private investment') || s.includes('private-investment')) {
    return 'Private Investment';
  }
  if (s.includes('mortgage')) return 'Mortgage';
  if (
    s.includes('team') ||
    s.includes('ceo') ||
    s.includes('coo') ||
    s.includes('executive') ||
    s.includes('consultation booking')
  ) {
    return 'Team & Executive';
  }
  if (
    s.includes('service') ||
    s.includes('golden visa') ||
    s.includes('investor visa') ||
    s.includes('escrow') ||
    s.includes('pre-launch')
  ) {
    return 'Services & Visa';
  }
  if (
    s.includes('mercedes') ||
    s.includes('brochure request modal') ||
    s.includes('landing page') ||
    s.includes('campaign')
  ) {
    return 'Campaign Landings';
  }
  if (
    s.includes('developer') ||
    s.includes('project') ||
    s.includes('property detail') ||
    s.includes('off-plan')
  ) {
    return 'Projects & Developers';
  }

  return 'Homepage & Contact';
}

function readCurrentUtms(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      utmTerm: params.get('utm_term') || '',
      utmContent: params.get('utm_content') || '',
    };
  } catch {
    return {};
  }
}

/**
 * Dispatches any website form submission to the connected Google Apps Script Web App.
 * Uses text/plain + no-cors so Google Apps Script accepts cross-origin browser POSTs reliably.
 */
export async function sendToGoogleSheet(data: UniversalSheetPayload): Promise<boolean> {
  const scriptUrl = GOOGLE_SHEETS_WEBHOOK_URL;
  if (!scriptUrl) return false;

  const fullName = (data.fullName || data.name || '').trim();
  const email = (data.email || '').trim();
  const phone = (data.phone || '').trim();
  const source = (data.source || 'Website Form').trim();
  const subject = (data.subject || source).trim();
  const sheetTab = resolveSheetTab(`${source} ${subject}`, data.sheetTab);

  const { cleanNumber, waLink } = formatSheetWhatsAppLink(
    phone,
    fullName,
    data.project || data.position || subject
  );

  const utms = readCurrentUtms();

  const knownKeys = new Set([
    'action',
    'sheetTab',
    'source',
    'subject',
    'name',
    'fullName',
    'email',
    'phone',
    'country',
    'preferredLanguage',
    'preferred_language',
    'budget',
    'investment_budget',
    'displayedCurrency',
    'displayed_currency',
    'preference',
    'investment_preference',
    'project',
    'developer',
    'price',
    'office',
    'advisor',
    'position',
    'department',
    'location',
    'residencyStatus',
    'portfolioUrl',
    'financingType',
    'estimatedPrice',
    'downPayment',
    'calculatedDownPayment',
    'monthlyPayment',
    'calculatedMonthlyPayment',
    'timeline',
    'message',
    'notes',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'page_url',
    'pageUrl',
  ]);

  const extraFields: Record<string, string> = {};
  Object.entries(data).forEach(([k, v]) => {
    if (!knownKeys.has(k) && v !== undefined && v !== null && String(v).trim() !== '') {
      extraFields[k] = String(v).trim();
    }
  });

  const normalizedPayload = {
    action: data.action || 'universal_form_submission',
    timestamp: new Date().toISOString(),
    sheetTab,
    source,
    subject,
    fullName,
    name: fullName,
    email,
    phone,
    phoneClean: cleanNumber,
    whatsAppLink: waLink,
    country: (data.country || '').trim(),
    preferredLanguage: (data.preferredLanguage || data.preferred_language || '').trim(),
    budget: (data.budget || data.investment_budget || '').trim(),
    displayedCurrency: (data.displayedCurrency || data.displayed_currency || '').trim(),
    preference: (data.preference || data.investment_preference || '').trim(),
    project: (data.project || '').trim(),
    developer: (data.developer || '').trim(),
    price: (data.price || data.estimatedPrice || '').trim(),
    office: (data.office || '').trim(),
    advisor: (data.advisor || '').trim(),
    position: (data.position || '').trim(),
    department: (data.department || '').trim(),
    location: (data.location || '').trim(),
    residencyStatus: (data.residencyStatus || '').trim(),
    portfolioUrl: (data.portfolioUrl || '').trim(),
    financingType: (data.financingType || '').trim(),
    downPayment: (data.downPayment || data.calculatedDownPayment || '').trim(),
    monthlyPayment: (data.monthlyPayment || data.calculatedMonthlyPayment || '').trim(),
    timeline: (data.timeline || '').trim(),
    message: (data.message || data.notes || '').trim(),
    pageUrl:
      data.pageUrl ||
      data.page_url ||
      (typeof window !== 'undefined' ? window.location.href : ''),
    utmSource: data.utm_source || utms.utmSource || '',
    utmMedium: data.utm_medium || utms.utmMedium || '',
    utmCampaign: data.utm_campaign || utms.utmCampaign || '',
    utmTerm: data.utm_term || utms.utmTerm || '',
    utmContent: data.utm_content || utms.utmContent || '',
    extraDetails: Object.keys(extraFields).length > 0 ? JSON.stringify(extraFields) : '',
  };

  // Track every form submission cleanly in Google Analytics / GTM (form_submit + generate_lead)
  trackFormSubmission({
    formName: source,
    formCategory: sheetTab,
    source,
    subject,
    budget: normalizedPayload.budget,
    currency: normalizedPayload.displayedCurrency || 'AED',
    project: normalizedPayload.project || normalizedPayload.position,
    developer: normalizedPayload.developer,
    country: normalizedPayload.country,
    preferredLanguage: normalizedPayload.preferredLanguage,
  });

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(normalizedPayload),
      mode: 'no-cors',
    });
    return true;
  } catch (err) {
    console.warn('Google Sheets submission warning:', err);
    return false;
  }
}
