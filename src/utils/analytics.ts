/**
 * Jamoka Properties — Unified Google Tag Manager (GTM-WD2J2M9S) & GA4 Tracking Engine
 *
 * Uses window.gtag('event', ...) backed by window.dataLayer so EVERY event:
 * 1. Automatically flows to any Google Analytics 4 / Google Tag configured inside GTM-WD2J2M9S.
 * 2. Fires matching GTM Custom Event triggers and populates Data Layer Variables with ZERO duplicate counting.
 *
 * Automatically tracks across the entire site:
 * - Virtual SPA page views (page_view)
 * - Every button, link, nav item, logo, WhatsApp, phone, email & outbound click (button_click + specialized events)
 * - Scroll depth milestones: 10%, 25%, 50%, 75%, 90%, 100% (scroll_depth)
 * - Section visibility via IntersectionObserver (section_view)
 * - Form starts (form_start) and all form submissions (form_submit + generate_lead)
 * - Engaged active time on page: 15s, 30s, 60s, 120s, 300s (engaged_time)
 * - Language changes, currency changes, and property searches
 */

export const GA4_MEASUREMENT_ID = 'G-9GS16D6FZ2';
export const GA4_STREAM_ID = '16386227619';
export const GTM_CONTAINER_ID = 'GTM-WD2J2M9S';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __jamokaAnalyticsInitialized?: boolean;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function ensureGtag(): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }
}

function cleanParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  const cleaned: Record<string, string | number | boolean> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      cleaned[key] = value;
    }
  });
  return cleaned;
}

/**
 * Core event emitter for Google Analytics 4 / Google Tag Manager.
 */
export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  ensureGtag();

  const payload = cleanParams({
    page_path: window.location.pathname + window.location.search + window.location.hash,
    page_location: window.location.href,
    page_title: document.title,
    ...params,
  });

  try {
    window.gtag?.('event', eventName, payload);
  } catch (err) {
    console.warn('Analytics event error:', err);
  }
}

/**
 * Track virtual SPA page views whenever the active page or slug changes.
 */
export function trackPageView(pageName: string, extra: AnalyticsParams = {}): void {
  if (typeof window === 'undefined') return;
  trackEvent('page_view', {
    page_name: pageName,
    ...extra,
  });
}

/**
 * Track form submissions + standard GA4 generate_lead conversion event.
 */
export function trackFormSubmission(details: {
  formName: string;
  formCategory?: string;
  source?: string;
  subject?: string;
  budget?: string;
  currency?: string;
  project?: string;
  developer?: string;
  country?: string;
  preferredLanguage?: string;
}): void {
  const params: AnalyticsParams = {
    form_name: details.formName,
    form_category: details.formCategory,
    lead_source: details.source,
    lead_subject: details.subject,
    budget: details.budget,
    currency: details.currency || 'AED',
    project: details.project,
    developer: details.developer,
    country: details.country,
    preferred_language: details.preferredLanguage,
  };

  trackEvent('form_submit', params);
  trackEvent('generate_lead', params);
}

export function trackLanguageChange(language: string, method: string = 'toggle'): void {
  trackEvent('language_change', {
    selected_language: language,
    selection_method: method,
  });
}

export function trackCurrencyChange(currency: string, source: string = 'switcher'): void {
  trackEvent('currency_change', {
    selected_currency: currency,
    switcher_location: source,
  });
}

export function trackSiteSearch(searchTerm: string): void {
  const trimmed = searchTerm.trim();
  if (!trimmed) return;
  trackEvent('search', {
    search_term: trimmed,
  });
}

// ---------------------------------------------------------------------------
// Automatic Global DOM Tracking (Buttons, Links, Scroll Depth, Sections, Forms, Engaged Time)
// ---------------------------------------------------------------------------

const SCROLL_MILESTONES = [10, 25, 50, 75, 90, 100];
const ENGAGED_SECONDS_MILESTONES = [15, 30, 60, 120, 300];

let firedScrollMilestones = new Set<number>();
let firedSectionIds = new Set<string>();
let firedFormStarts = new Set<string>();
let firedEngagedMilestones = new Set<number>();
let engagedSeconds = 0;
let activeSectionObserver: IntersectionObserver | null = null;

function normalizeText(raw: string | null | undefined, maxLen = 100): string {
  if (!raw) return '';
  const collapsed = raw.replace(/\s+/g, ' ').trim();
  if (!collapsed) return '';
  return collapsed.length > maxLen ? `${collapsed.slice(0, maxLen - 1)}…` : collapsed;
}

function getSectionContext(el: Element): string {
  const dialog = el.closest('[role="dialog"]');
  if (dialog) {
    const dialogLabel =
      dialog.getAttribute('aria-label') ||
      normalizeText(dialog.querySelector('h1, h2, h3, h4')?.textContent, 60);
    return dialogLabel ? `modal:${dialogLabel}` : 'modal';
  }

  const section = el.closest('section[id], header, footer, nav, main');
  if (!section) return 'page';

  const tag = section.tagName.toLowerCase();
  if (tag === 'header') return 'header';
  if (tag === 'footer') return 'footer';
  if (tag === 'nav') return `nav:${section.getAttribute('aria-label') || 'primary'}`;
  if (section.id) return section.id;

  const heading = normalizeText(section.querySelector('h1, h2, h3')?.textContent, 50);
  return heading || tag;
}

function extractButtonName(el: HTMLElement): string {
  const dataTrack = normalizeText(el.getAttribute('data-track-name'));
  if (dataTrack) return dataTrack;

  const ariaLabel = normalizeText(el.getAttribute('aria-label'));
  if (ariaLabel) return ariaLabel;

  const text = normalizeText(el.innerText || el.textContent);
  if (text) return text;

  const title = normalizeText(el.getAttribute('title'));
  if (title) return title;

  const imgAlt = normalizeText(el.querySelector('img')?.getAttribute('alt'));
  if (imgAlt) return imgAlt;

  const svgTitle = normalizeText(el.querySelector('title')?.textContent);
  if (svgTitle) return svgTitle;

  if (el.id) return el.id;
  return el.tagName.toLowerCase();
}

function classifyClickType(el: HTMLElement, href: string): string {
  const lowerHref = href.toLowerCase();
  if (lowerHref.includes('wa.me') || lowerHref.includes('whatsapp.com')) return 'whatsapp';
  if (lowerHref.startsWith('tel:')) return 'phone';
  if (lowerHref.startsWith('mailto:')) return 'email';

  if (lowerHref.startsWith('http://') || lowerHref.startsWith('https://')) {
    try {
      const targetUrl = new URL(href);
      if (targetUrl.hostname !== window.location.hostname) {
        return 'outbound';
      }
    } catch {
      // Ignore invalid URL
    }
  }

  if (el.closest('header, nav')) return 'navigation';
  if (el.closest('footer')) return 'footer_link';
  if (el.tagName.toLowerCase() === 'button' || el.getAttribute('type') === 'submit') {
    return 'button';
  }
  return 'link';
}

function handleGlobalClick(event: MouseEvent): void {
  const target = event.target as Element | null;
  if (!target) return;

  const clickable = target.closest(
    'button, a[href], [role="button"], input[type="submit"], [data-track-name]'
  ) as HTMLElement | null;
  if (!clickable) return;

  const buttonName = extractButtonName(clickable);
  const href = clickable.getAttribute('href') || '';
  const sectionName = getSectionContext(clickable);
  const clickType = classifyClickType(clickable, href);
  const elementTag = clickable.tagName.toLowerCase();

  const commonParams: AnalyticsParams = {
    button_name: buttonName,
    button_text: normalizeText(clickable.innerText || clickable.textContent),
    button_type: clickType,
    element_tag: elementTag,
    element_id: clickable.id || undefined,
    section_name: sectionName,
    link_url: href || undefined,
  };

  // Primary universal click event so every single button/link can be reported by button_name
  trackEvent('button_click', commonParams);

  // Additional semantic events for key conversion actions
  if (clickType === 'whatsapp') {
    trackEvent('whatsapp_click', commonParams);
  } else if (clickType === 'phone') {
    trackEvent('phone_click', commonParams);
  } else if (clickType === 'email') {
    trackEvent('email_click', commonParams);
  } else if (clickType === 'outbound') {
    trackEvent('outbound_click', commonParams);
  }
}

function handleFormFocusIn(event: FocusEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;

  const form = target.closest('form');
  if (!form) return;

  const tag = target.tagName.toLowerCase();
  if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') return;

  const sectionName = getSectionContext(form);
  const formHeading = normalizeText(
    form.closest('section, [role="dialog"], div')?.querySelector('h2, h3, h4')?.textContent,
    70
  );
  const formKey = `${sectionName}|${formHeading || form.getAttribute('action') || 'form'}`;

  if (firedFormStarts.has(formKey)) return;
  firedFormStarts.add(formKey);

  trackEvent('form_start', {
    form_name: formHeading || sectionName,
    section_name: sectionName,
    first_field: target.getAttribute('name') || target.getAttribute('type') || tag,
  });
}

let scrollRafPending = false;
function checkScrollDepth(): void {
  scrollRafPending = false;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const docEl = document.documentElement;
  const scrollTop = window.scrollY || docEl.scrollTop || 0;
  const viewportHeight = window.innerHeight || 0;
  const fullHeight = Math.max(docEl.scrollHeight, document.body.scrollHeight, viewportHeight);

  if (fullHeight <= 0) return;

  const maxScrollable = Math.max(fullHeight - viewportHeight, 1);
  const percent =
    fullHeight <= viewportHeight
      ? 100
      : Math.min(100, Math.round(((scrollTop + viewportHeight) / fullHeight) * 100));

  // Only count scroll once user actually scrolls past the top (unless short page)
  if (scrollTop < 20 && maxScrollable > 150) return;

  SCROLL_MILESTONES.forEach((milestone) => {
    if (percent >= milestone && !firedScrollMilestones.has(milestone)) {
      firedScrollMilestones.add(milestone);
      trackEvent('scroll_depth', {
        percent_scrolled: milestone,
        scroll_milestone: `${milestone}%`,
      });
    }
  });
}

function handleGlobalScroll(): void {
  if (scrollRafPending) return;
  scrollRafPending = true;
  window.requestAnimationFrame(checkScrollDepth);
}

function observePageSections(): void {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

  if (activeSectionObserver) {
    activeSectionObserver.disconnect();
    activeSectionObserver = null;
  }

  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  activeSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const secId = el.id;
        if (!secId || firedSectionIds.has(secId)) return;

        firedSectionIds.add(secId);
        const heading = normalizeText(el.querySelector('h1, h2, h3')?.textContent, 80);
        trackEvent('section_view', {
          section_id: secId,
          section_title: heading || secId,
        });
      });
    },
    { threshold: 0.25 }
  );

  sections.forEach((section) => activeSectionObserver?.observe(section));
}

/**
 * Reset per-page scroll, section visibility, form starts, and engaged time timers
 * whenever the user navigates to a new virtual route in the SPA.
 */
export function resetPageEngagementTrackers(): void {
  firedScrollMilestones = new Set<number>();
  firedSectionIds = new Set<string>();
  firedFormStarts = new Set<string>();
  firedEngagedMilestones = new Set<number>();
  engagedSeconds = 0;

  if (typeof window !== 'undefined') {
    window.setTimeout(() => {
      observePageSections();
    }, 350);
  }
}

/**
 * Initialize global site-wide tracking listeners once on app startup.
 */
export function initGlobalAnalytics(): void {
  if (typeof window === 'undefined' || window.__jamokaAnalyticsInitialized) return;
  window.__jamokaAnalyticsInitialized = true;
  ensureGtag();

  // Capture-phase click tracking catches every button/link even if stopPropagation() is used
  document.addEventListener('click', handleGlobalClick, true);
  document.addEventListener('focusin', handleFormFocusIn, true);
  window.addEventListener('scroll', handleGlobalScroll, { passive: true });

  // Engaged active time tracker (ticks only while tab is visible)
  window.setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    engagedSeconds += 5;
    ENGAGED_SECONDS_MILESTONES.forEach((milestone) => {
      if (engagedSeconds >= milestone && !firedEngagedMilestones.has(milestone)) {
        firedEngagedMilestones.add(milestone);
        trackEvent('engaged_time', {
          engaged_seconds: milestone,
          engagement_label: `${milestone}s`,
        });
      }
    });
  }, 5000);

  observePageSections();
}
