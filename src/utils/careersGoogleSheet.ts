/**
 * Careers Application Submission Engine
 *
 * Transmits candidate application data directly to:
 * 1. Google Sheets (via your deployed Google Apps Script Web App).
 *    Fills candidate columns and includes:
 *    - Candidate's clean phone number
 *    - Direct 1-click WhatsApp Link (e.g., https://wa.me/971501234567)
 *    - Candidate's CV/Portfolio link
 * 2. FormBold / Email (backup notification to Jamoka recruitment team).
 */

import { sendToFormBold } from './formbold';
import {
  GOOGLE_SHEETS_WEBHOOK_URL,
  formatSheetWhatsAppLink,
  sendToGoogleSheet,
} from './googleSheets';

export interface ApplicationPayload {
  positionTitle: string;
  department: string;
  location: string;
  fullName: string;
  email: string;
  phone: string;
  residencyStatus: string;
  portfolioOrCvUrl: string;
  coverNote?: string;
}

// Re-export the unified Google Apps Script Web App endpoint
export const GOOGLE_APPS_SCRIPT_WEBHOOK_URL = GOOGLE_SHEETS_WEBHOOK_URL;

/**
 * Formats any candidate phone number into a direct 1-click WhatsApp wa.me link.
 */
export function formatWhatsAppLink(
  phoneInput: string,
  candidateName: string,
  positionTitle: string
): {
  cleanNumber: string;
  waLink: string;
} {
  return formatSheetWhatsAppLink(
    phoneInput,
    candidateName || 'Candidate',
    `the ${positionTitle || 'open'} position`
  );
}

export async function submitCareerApplication(payload: ApplicationPayload): Promise<{
  success: boolean;
  message: string;
}> {
  const { waLink } = formatWhatsAppLink(
    payload.phone,
    payload.fullName,
    payload.positionTitle
  );

  // 1. Post to the unified Google Sheet ("All Leads" + "Careers" tab)
  const googleSuccess = await sendToGoogleSheet({
    action: 'job_application',
    sheetTab: 'Careers',
    source: `Careers Portal - ${payload.positionTitle}`,
    subject: `Job Application: ${payload.positionTitle} (${payload.fullName})`,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    position: payload.positionTitle,
    department: payload.department,
    location: payload.location,
    residencyStatus: payload.residencyStatus,
    portfolioUrl: payload.portfolioOrCvUrl || '',
    message: payload.coverNote || '',
  });

  // 2. FormBold backup notification to Jamoka HR inbox (skipGoogleSheet avoids duplicate rows)
  try {
    await sendToFormBold(
      {
        name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        source: `Careers Portal - Application for ${payload.positionTitle}`,
        subject: `Job Application: ${payload.positionTitle} (${payload.fullName})`,
        message: `Position: ${payload.positionTitle}
Department: ${payload.department}
Location: ${payload.location}
Candidate: ${payload.fullName}
Email: ${payload.email}
Phone: ${payload.phone}
Direct WhatsApp: ${waLink || payload.phone}
Residency Status: ${payload.residencyStatus}
CV / Portfolio Link: ${payload.portfolioOrCvUrl}
Google Sheets Log: ${googleSuccess ? 'Logged successfully' : 'Dispatched to Apps Script'}

Candidate Statement / Introduction:
${payload.coverNote || 'N/A'}`,
      },
      { skipGoogleSheet: true }
    );
  } catch (err) {
    console.warn('FormBold backup notification warning:', err);
  }

  return {
    success: true,
    message: 'Application submitted successfully',
  };
}

export interface LeadSheetPayload {
  name: string;
  email: string;
  phone: string;
  project?: string;
  preferredUnit?: string;
  timeline?: string;
  notes?: string;
  source?: string;
}

/**
 * Sends a real estate / landing page lead directly to the unified Google Sheet.
 */
export async function submitLeadToGoogleSheet(payload: LeadSheetPayload): Promise<boolean> {
  return sendToGoogleSheet({
    action: 'lead_inquiry',
    sheetTab: 'Campaign Landings',
    source: payload.source || 'Mercedes-Benz Places Campaign Registration Form',
    subject: `Campaign Lead: ${payload.project || 'Mercedes-Benz Places | Binghatti City'}`,
    fullName: payload.name,
    email: payload.email,
    phone: payload.phone,
    project: payload.project || 'Mercedes-Benz Places | Binghatti City',
    budget: payload.preferredUnit || '1-Bedroom Residence (From AED 1.25M)',
    timeline: payload.timeline || 'Immediate (Within 14 Days)',
    location: 'Meydan, Dubai',
    message: payload.notes || '',
  });
}

