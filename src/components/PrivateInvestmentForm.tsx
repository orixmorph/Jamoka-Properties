import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, ArrowRight, Loader2, Lock, MessageCircle } from 'lucide-react';
import {
  DIAL_CODES,
  PRIVATE_INVESTMENT_CONFIG,
  PRIVATE_INVESTMENT_CONTENT,
} from '../data/privateInvestmentConfig';
import { sendToFormBold } from '../utils/formbold';
import { sendToGoogleSheet } from '../utils/googleSheets';
import { trackEvent } from '../utils/analytics';
import { trackMetaCustomEvent, trackMetaPixel } from '../utils/metaPixel';

import type { SupportedCurrency } from '../hooks/useLiveCurrency';

export interface PrivateInvestmentFormProps {
  language: 'en' | 'ar';
  mode: 'full' | 'compact';
  initialBudget?: string;
  currency?: SupportedCurrency;
  formatAmount?: (aedValue: number, lang: 'en' | 'ar') => string;
  onOpenPrivacy: () => void;
  onSwitchToFullForm?: () => void;
  onSuccess?: () => void;
}

interface UtmData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
}

const getUtmParameters = (): UtmData => {
  if (typeof window === 'undefined') {
    return { utm_source: '', utm_medium: '', utm_campaign: '', utm_term: '', utm_content: '' };
  }
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
  };
};

export const PrivateInvestmentForm: React.FC<PrivateInvestmentFormProps> = ({
  language,
  mode,
  initialBudget,
  currency = 'AED',
  formatAmount,
  onOpenPrivacy,
  onSwitchToFullForm,
  onSuccess,
}) => {
  const copy = PRIVATE_INVESTMENT_CONTENT[language].form;
  const isCompact = mode === 'compact';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [dialCode, setDialCode] = useState('+971');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState(
    language === 'ar' ? 'Arabic' : 'English'
  );
  const [budget, setBudget] = useState(initialBudget || 'AED 5 Million');
  const [preference, setPreference] = useState('');
  const [consent, setConsent] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submittingRef = useRef(false);

  useEffect(() => {
    if (initialBudget) {
      setBudget(initialBudget);
    }
  }, [initialBudget]);

  useEffect(() => {
    setPreferredLanguage((prev) => {
      if (prev === 'Other') return prev;
      return language === 'ar' ? 'Arabic' : 'English';
    });
  }, [language]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = copy.errors.fullName;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email.trim())) {
      nextErrors.email = copy.errors.email;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = copy.errors.phone;
    }
    if (!isCompact && !country.trim()) {
      nextErrors.country = copy.errors.country;
    }
    if (!budget) {
      nextErrors.budget = copy.errors.budget;
    }
    if (!consent) {
      nextErrors.consent = copy.errors.consent;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const trackLeadSubmission = (selectedBudget: string) => {
    trackMetaPixel('Lead', {
      content_name: PRIVATE_INVESTMENT_CONFIG.campaignIdentifier,
      content_category: selectedBudget,
      currency: 'AED',
      value: selectedBudget.includes('10') ? 10000000 : 5000000,
    });
    trackMetaCustomEvent('PrivateInvestmentEnquiry', {
      budget: selectedBudget,
      language,
      placement: mode,
    });

    trackEvent('private_investment_lead', {
      campaign: PRIVATE_INVESTMENT_CONFIG.campaignIdentifier,
      budget: selectedBudget,
      currency,
      language,
      placement: mode,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submittingRef.current || isSubmitting) return;

    setSubmitError('');
    if (!validate()) return;

    submittingRef.current = true;
    setIsSubmitting(true);

    const utms = getUtmParameters();
    const formattedPhone = `${dialCode} ${phone.trim()}`;

    const payload: Record<string, string> = {
      campaign: PRIVATE_INVESTMENT_CONFIG.campaignIdentifier,
      form_placement: mode,
      landing_page_language: language.toUpperCase(),
      full_name: fullName.trim(),
      email: email.trim(),
      phone: formattedPhone,
      country_of_residence: country.trim() || 'Not specified (Quick Consultation)',
      preferred_language: preferredLanguage,
      investment_budget: budget,
      displayed_currency: currency,
      investment_preference: preference || 'Not specified',
      privacy_consent: consent ? 'Confirmed' : 'Declined',
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      submitted_at: new Date().toISOString(),
      ...utms,
    };

    try {
      let webhookDelivered = false;
      if (PRIVATE_INVESTMENT_CONFIG.crmWebhookUrl) {
        try {
          const webhookRes = await fetch(PRIVATE_INVESTMENT_CONFIG.crmWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });
          webhookDelivered = webhookRes.ok;
        } catch {
          webhookDelivered = false;
        }
      }

      // 1. Primary delivery: Unified Google Sheet ("All Leads" + "Private Investment" tab)
      const sheetPromise = sendToGoogleSheet({
        sheetTab: 'Private Investment',
        source: `${PRIVATE_INVESTMENT_CONFIG.campaignIdentifier} (${mode})`,
        subject: `Private Investment Enquiry — ${budget} (${fullName.trim()})`,
        fullName: fullName.trim(),
        name: fullName.trim(),
        email: email.trim(),
        phone: formattedPhone,
        country: country.trim() || 'Not specified (Quick Consultation)',
        preferredLanguage,
        budget,
        displayedCurrency: currency,
        preference: preference || 'Not specified',
        project: budget,
        pageUrl: typeof window !== 'undefined' ? window.location.href : '',
        ...utms,
      }).catch(() => false);

      // 2. Parallel backup delivery: FormBold email inbox (skipGoogleSheet prevents duplicate rows)
      const formboldPromise = sendToFormBold(
        {
          name: fullName.trim(),
          email: email.trim(),
          phone: formattedPhone,
          country: country.trim() || 'Not specified (Quick Consultation)',
          subject: `Private Investment Enquiry — ${budget} (${fullName.trim()})`,
          source: PRIVATE_INVESTMENT_CONFIG.campaignIdentifier,
          project: budget,
          ...payload,
        },
        { skipGoogleSheet: true }
      ).catch(() => ({ success: false }));

      const [sheetDelivered, formboldRes] = await Promise.all([sheetPromise, formboldPromise]);

      if (!sheetDelivered && !formboldRes.success && !webhookDelivered) {
        setSubmitError(copy.errors.generic);
        return;
      }

      trackLeadSubmission(budget);
      setIsSubmitted(true);
      onSuccess?.();
    } catch {
      setSubmitError(copy.errors.generic);
    } finally {
      setIsSubmitting(false);
      submittingRef.current = false;
    }
  };

  const whatsappUrl = `https://wa.me/${PRIVATE_INVESTMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    copy.whatsappPrefill
  )}`;

  if (isSubmitted) {
    return (
      <div
        className={`rounded-xl bg-white border border-slate-200 text-center ${
          isCompact ? 'p-5 space-y-3' : 'p-8 sm:p-10 space-y-5'
        }`}
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 text-emerald-700" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg sm:text-xl font-semibold text-[#0D1B2A] font-serif-luxury">
            {copy.successTitle}
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {copy.successBody}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1E6F4E] hover:bg-[#17593E] text-white text-xs font-semibold tracking-wide transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{copy.whatsappDirectLabel}</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setFullName('');
              setEmail('');
              setPhone('');
              setCountry('');
              setPreference('');
            }}
            className="text-xs font-medium text-slate-600 hover:text-[#0D1B2A] underline underline-offset-4 cursor-pointer"
          >
            {copy.submitAnother}
          </button>
        </div>
      </div>
    );
  }

  const inputBase =
    'w-full rounded-lg border border-slate-200 bg-white px-3.5 text-sm text-[#0D1B2A] placeholder:text-slate-400 focus:border-[#A6833D] focus:outline-none focus:ring-2 focus:ring-[#CFA55A]/20 transition-colors';

  return (
    <form onSubmit={handleSubmit} noValidate className={isCompact ? 'space-y-3' : 'space-y-5'}>
      {/* Hidden Campaign Identifier */}
      <input
        type="hidden"
        name="campaign"
        value={PRIVATE_INVESTMENT_CONFIG.campaignIdentifier}
      />

      {/* Name & Email */}
      <div className={isCompact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label
            htmlFor={`pi-name-${mode}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            {copy.fullName} <span className="text-[#A6833D]">*</span>
          </label>
          <input
            id={`pi-name-${mode}`}
            name="fullName"
            type="text"
            autoComplete="name"
            required
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
            }}
            placeholder={copy.fullNamePlaceholder}
            className={`${inputBase} ${isCompact ? 'py-2.5' : 'py-3'} ${
              errors.fullName ? 'border-red-400' : ''
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor={`pi-email-${mode}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            {copy.email} <span className="text-[#A6833D]">*</span>
          </label>
          <input
            id={`pi-email-${mode}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            dir="ltr"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
            }}
            placeholder={copy.emailPlaceholder}
            className={`${inputBase} ${isCompact ? 'py-2.5' : 'py-3'} ${
              errors.email ? 'border-red-400' : ''
            }`}
          />
          {errors.email && (
            <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
          )}
        </div>
      </div>

      {/* International Phone + Country (Full) */}
      <div className={isCompact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label
            htmlFor={`pi-phone-${mode}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            {copy.phone} <span className="text-[#A6833D]">*</span>
          </label>
          <div className="flex gap-2" dir="ltr">
            <select
              aria-label="Country dial code"
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              className={`rounded-lg border border-slate-200 bg-slate-50 px-2 text-xs font-medium text-[#0D1B2A] focus:border-[#A6833D] focus:outline-none shrink-0 w-[108px] ${
                isCompact ? 'py-2.5' : 'py-3'
              }`}
            >
              {DIAL_CODES.map((item) => (
                <option key={item.code + item.label} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <input
              id={`pi-phone-${mode}`}
              name="phone"
              type="tel"
              autoComplete="tel-national"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
              placeholder={copy.phonePlaceholder}
              className={`${inputBase} flex-1 min-w-0 ${isCompact ? 'py-2.5' : 'py-3'} ${
                errors.phone ? 'border-red-400' : ''
              }`}
            />
          </div>
          {errors.phone && (
            <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>

        {!isCompact && (
          <div>
            <label
              htmlFor={`pi-country-${mode}`}
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {copy.country} <span className="text-[#A6833D]">*</span>
            </label>
            <input
              id={`pi-country-${mode}`}
              name="country"
              type="text"
              autoComplete="country-name"
              required
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                if (errors.country) setErrors((prev) => ({ ...prev, country: '' }));
              }}
              placeholder={copy.countryPlaceholder}
              className={`${inputBase} py-3 ${errors.country ? 'border-red-400' : ''}`}
            />
            {errors.country && (
              <p className="text-[11px] text-red-600 mt-1">{errors.country}</p>
            )}
          </div>
        )}
      </div>

      {/* Budget & Language / Preference */}
      <div className={isCompact ? 'space-y-3' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
        <div>
          <label
            htmlFor={`pi-budget-${mode}`}
            className="block text-xs font-semibold text-slate-700 mb-1.5"
          >
            {copy.budget} <span className="text-[#A6833D]">*</span>
          </label>
          <select
            id={`pi-budget-${mode}`}
            name="budget"
            required
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              if (errors.budget) setErrors((prev) => ({ ...prev, budget: '' }));
            }}
            className={`${inputBase} ${isCompact ? 'py-2.5' : 'py-3'} ${
              errors.budget ? 'border-red-400' : ''
            }`}
          >
            {copy.budgetOptions.map((opt) => {
              let label = opt.label;
              if (formatAmount && currency !== 'AED') {
                if (opt.value === 'AED 5 Million') {
                  label =
                    language === 'ar'
                      ? `${formatAmount(5_000_000, 'ar')} (5 مليون درهم · عائد 15%)`
                      : `${formatAmount(5_000_000, 'en')} (AED 5M · 15% ROI)`;
                } else if (opt.value === 'AED 10 Million') {
                  label =
                    language === 'ar'
                      ? `${formatAmount(10_000_000, 'ar')} (10 مليون درهم · عائد 16%)`
                      : `${formatAmount(10_000_000, 'en')} (AED 10M · 16% ROI)`;
                }
              }
              return (
                <option key={opt.value} value={opt.value}>
                  {label}
                </option>
              );
            })}
          </select>
          {errors.budget && (
            <p className="text-[11px] text-red-600 mt-1">{errors.budget}</p>
          )}
        </div>

        {!isCompact && (
          <div>
            <label
              htmlFor={`pi-lang-${mode}`}
              className="block text-xs font-semibold text-slate-700 mb-1.5"
            >
              {copy.preferredLanguage}
            </label>
            <select
              id={`pi-lang-${mode}`}
              name="preferredLanguage"
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className={`${inputBase} py-3`}
            >
              {copy.languageOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Optional Investment Preference (Full Form Only) */}
      {!isCompact && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={`pi-pref-${mode}`}
              className="block text-xs font-semibold text-slate-700"
            >
              {copy.preference}
            </label>
            <span className="text-[11px] text-slate-400">{copy.preferenceOptional}</span>
          </div>
          <select
            id={`pi-pref-${mode}`}
            name="preference"
            value={preference}
            onChange={(e) => setPreference(e.target.value)}
            className={`${inputBase} py-3`}
          >
            <option value="">— {copy.preferenceOptional} —</option>
            {copy.preferenceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Privacy & Contact Consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((prev) => ({ ...prev, consent: '' }));
            }}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0D1B2A] focus:ring-[#CFA55A]"
          />
          <span className="text-xs text-slate-600 leading-relaxed">
            {copy.consentPrefix}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-[#0D1B2A] font-semibold underline underline-offset-2 hover:text-[#A6833D] cursor-pointer"
            >
              {copy.privacyLink}
            </button>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="text-[11px] text-red-600 mt-1">{errors.consent}</p>
        )}
      </div>

      {submitError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-3.5 py-2.5 text-xs text-red-700">
          {submitError}
        </div>
      )}

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] disabled:opacity-60 text-[#0A0D14] font-bold tracking-wide shadow-sm transition-colors cursor-pointer ${
          isCompact ? 'py-3.5 px-4 text-xs sm:text-sm' : 'py-4 px-6 text-sm'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#0A0D14]" />
            <span>{copy.submittingLabel}</span>
          </>
        ) : (
          <>
            <span>{copy.submitCta}</span>
            <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Secondary Utility Row */}
      <div className="flex items-center justify-between gap-2 pt-0.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
          <Lock className="w-3 h-3 text-[#A6833D] shrink-0" />
          <span>{PRIVATE_INVESTMENT_CONFIG.companyName}</span>
        </span>
        {isCompact && onSwitchToFullForm ? (
          <button
            type="button"
            onClick={onSwitchToFullForm}
            className="text-[11px] font-semibold text-[#A6833D] hover:text-[#0D1B2A] underline underline-offset-2 cursor-pointer"
          >
            {copy.switchToFullForm}
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E6F4E] hover:text-[#145339]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{copy.whatsappDirectLabel}</span>
          </a>
        )}
      </div>
    </form>
  );
};
