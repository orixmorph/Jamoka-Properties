import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock,
  Globe,
  KeyRound,
  Landmark,
  Lock,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Repeat2,
  ShieldCheck,
  Wallet,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { JamokaLogo } from '../components/Logos';
import { GoogleTranslateWidget } from '../components/GoogleTranslateWidget';
import { PrivateInvestmentForm } from '../components/PrivateInvestmentForm';
import {
  PRIVATE_INVESTMENT_CONFIG,
  PRIVATE_INVESTMENT_CONTENT,
  PRIVATE_INVESTMENT_IMAGES,
  SELECTED_DEVELOPMENTS_CMS,
  TEAM_MEDIA,
} from '../data/privateInvestmentConfig';
import { SupportedCurrency, useLiveCurrency } from '../hooks/useLiveCurrency';
import { GTM_CONTAINER_ID, trackCurrencyChange } from '../utils/analytics';
import { withBasePath } from '../utils/basePath';
import type { PageType } from '../components/Header';

interface PrivateInvestmentPageProps {
  onNavigateMainSite: (page?: PageType) => void;
}

type LegalModalType = 'privacy' | 'terms' | 'disclaimer' | null;

const COOKIE_STORAGE_KEY = 'jamoka_pi_cookie_consent_v1';
const CURRENCIES: SupportedCurrency[] = ['AED', 'EUR', 'USD'];

const PROTECTION_PILLARS = {
  en: [
    'Backed by UAE Government Framework',
    'Protected by Escrow Account',
    'Dubai Land Department (DLD) Registered',
  ],
  ar: [
    'مدعومة بالإطار الحكومي لدولة الإمارات',
    'محمية بحسابات الضمان (Escrow)',
    'مسجّلة لدى دائرة الأراضي والأملاك بدبي (DLD)',
  ],
};

interface ProtectionStripProps {
  language: 'en' | 'ar';
  dark?: boolean;
}

const ProtectionStrip: React.FC<ProtectionStripProps> = ({ language, dark = false }) => {
  const items = PROTECTION_PILLARS[language];
  return (
    <div
      className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium ${
        dark ? 'text-slate-200' : 'text-[#0A0D14]'
      }`}
    >
      {items.map((label, idx) => (
        <span key={idx} className="inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#CFA55A] shrink-0" />
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
};

export const PrivateInvestmentPage: React.FC<PrivateInvestmentPageProps> = ({
  onNavigateMainSite,
}) => {
  const { language, setLanguage, isRTL } = useLanguage();
  const content = PRIVATE_INVESTMENT_CONTENT[language];
  const { currency, setCurrency, ratesLive, detectedCountry, formatAmount, formatShort } =
    useLiveCurrency();

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<string>('AED 5 Million');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);

  // Floating consultation popup activates smoothly once user scrolls past the Hero embedded form
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupDismissedByUser, setPopupDismissedByUser] = useState(false);
  const [passedHero, setPassedHero] = useState(false);
  const [teamPhotoSrc, setTeamPhotoSrc] = useState<string>(TEAM_MEDIA.groupPhoto);

  // 5-second auto-fading language selector popup on every page load/reload
  const [langPromptMounted, setLangPromptMounted] = useState(true);
  const [langPromptFading, setLangPromptFading] = useState(false);
  const [langPromptHovered, setLangPromptHovered] = useState(false);
  const [langPromptBarStarted, setLangPromptBarStarted] = useState(false);
  const [translateOpenSignal, setTranslateOpenSignal] = useState(0);

  const [cookieChoice, setCookieChoice] = useState<string | null>(() => {
    if (typeof window === 'undefined') return 'essential';
    try {
      return window.localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      language === 'ar'
        ? 'جاموكا العقارية | الاستثمار العقاري الخاص في دبي (عائد 15% - 16%)'
        : 'Jamoka Properties | Dubai Private Real Estate Investment (15%–16% ROI)';
    return () => {
      document.title = previousTitle;
    };
  }, [language]);

  // 10-second auto-fade timer for the language welcome popup
  useEffect(() => {
    if (!langPromptMounted || langPromptHovered) return;

    const startTimer = window.setTimeout(() => setLangPromptBarStarted(true), 50);
    const fadeTimer = window.setTimeout(() => setLangPromptFading(true), 9500);
    const unmountTimer = window.setTimeout(() => setLangPromptMounted(false), 10000);

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [langPromptMounted, langPromptHovered]);

  const dismissLangPrompt = () => {
    setLangPromptFading(true);
    window.setTimeout(() => setLangPromptMounted(false), 250);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrolledPast = window.scrollY > 620;
      setPassedHero(scrolledPast);
      if (scrolledPast && !popupDismissedByUser && window.innerWidth >= 1024) {
        setPopupOpen(true);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [popupDismissedByUser]);

  useEffect(() => {
    if (cookieChoice !== 'all') return;
    const { ga4MeasurementId, gtmContainerId } = PRIVATE_INVESTMENT_CONFIG.analytics;

    if (ga4MeasurementId && !document.getElementById('jamoka-ga4-script')) {
      const script = document.createElement('script');
      script.id = 'jamoka-ga4-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4MeasurementId)}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer?.push(args as unknown as Record<string, unknown>);
      };
      window.gtag('js', new Date());
      window.gtag('config', ga4MeasurementId);
    }

    if (
      gtmContainerId &&
      gtmContainerId !== GTM_CONTAINER_ID &&
      !document.getElementById('jamoka-gtm-script')
    ) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const script = document.createElement('script');
      script.id = 'jamoka-gtm-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmContainerId)}`;
      document.head.appendChild(script);
    }
  }, [cookieChoice]);

  const handleCookieChoice = (choice: 'all' | 'essential') => {
    setCookieChoice(choice);
    try {
      window.localStorage.setItem(COOKIE_STORAGE_KEY, choice);
    } catch {
      // Ignore storage failures
    }
  };

  const scrollToSection = (sectionId: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectAllocationCta = (budgetValue: string) => {
    setSelectedBudget(budgetValue);
    scrollToSection('enquire');
  };

  const whatsappUrl = `https://wa.me/${PRIVATE_INVESTMENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    content.form.whatsappPrefill
  )}`;

  // Live formatted monetary values (auto-localized to AED / EUR / USD)
  const amt5M = formatAmount(5_000_000, language);
  const amt10M = formatAmount(10_000_000, language);
  const short5M = formatShort(5_000_000, language);
  const short10M = formatShort(10_000_000, language);
  const annual5M = formatAmount(750_000, language);
  const annual10M = formatAmount(1_600_000, language);
  const total3Yr5M = formatAmount(2_250_000, language);
  const total3Yr10M = formatAmount(4_800_000, language);
  const total6Yr5M = formatAmount(4_500_000, language);
  const total6Yr10M = formatAmount(9_600_000, language);

  const navItems = [
    { id: 'buyback', label: content.nav.opportunity },
    { id: 'structure', label: content.nav.structure },
    { id: 'about', label: content.nav.team },
    { id: 'faq', label: content.nav.faq },
  ];

  // Top 6 concise FAQs (minimal, high-signal)
  const conciseFaqs =
    language === 'ar'
      ? [
          {
            q: 'ما هو الحد الأدنى للاستثمار وما هي العوائد؟',
            a: `تبدأ الاستثمارات من ${amt5M} (عائد سنوي 15% = ${annual5M}/سنوياً) أو ${amt10M} (عائد سنوي 16% = ${annual10M}/سنوياً) لمدة 3 سنوات، وفق الاتفاقية الموقّعة.`,
          },
          {
            q: 'هل المشاريع مسجّلة ومحمية قانونياً في دبي؟',
            a: 'نعم. جميع المشاريع المختارة مسجّلة لدى دائرة الأراضي والأملاك بدبي (DLD)، ومحمية بحسابات الضمان المعتمدة (Escrow)، وتعمل ضمن الإطار التنظيمي لحكومة الإمارات.',
          },
          {
            q: 'كيف يعمل خيار إعادة الشراء بعد 3 سنوات؟',
            a: `عند نهاية السنة الثالثة يمكنك تفعيل خيار إعادة الشراء لاسترداد 100% من سعر الشراء الأصلي (${amt5M} أو ${amt10M})، أو الاحتفاظ بالعقار، أو التمديد 3+3 سنوات وفق العقد.`,
          },
          {
            q: 'هل يمكنني اختيار نوع العقارات والوحدات؟',
            a: 'نعم، يمكنك توزيع محفظتك بين الاستوديوهات وشقق غرفة وغرفتي النوم والوحدات التجارية عبر 3 مشاريع من الفئة الأولى.',
          },
          {
            q: 'لماذا لا تُنشر أسماء المطوّرين على الموقع؟',
            a: 'لأن شروط العوائد وإعادة الشراء متفاوض عليها حصرياً خارج السوق لعملاء جاموكا العقارية. نشارك الملف السري الكامل خلال الاستشارة الخاصة.',
          },
          {
            q: 'كيف أبدأ الاستثمار مع جاموكا العقارية؟',
            a: 'املأ النموذج في هذه الصفحة أو تواصل معنا مباشرة عبر واتساب، وسيرتّب مستشارنا الخاص لقاءً في دبي أو مكالمة فيديو خلال ساعات.',
          },
        ]
      : [
          {
            q: 'What are the minimum tiers and annual returns?',
            a: `${amt5M} earns 15% annual ROI (${annual5M}/yr) and ${amt10M} earns 16% annual ROI (${annual10M}/yr) over a 3-year term, subject to the signed agreement.`,
          },
          {
            q: 'Are the projects DLD-registered and Escrow-protected?',
            a: 'Yes. Every shortlisted development is registered with the Dubai Land Department (DLD), protected through regulated Escrow accounts, and governed under the UAE government real estate framework.',
          },
          {
            q: 'How does the Year-3 buyback option work?',
            a: `At the end of Year 3, you can sell back at 100% of the original purchase price (${amt5M} or ${amt10M}), keep your Dubai units, or optionally extend for 3+3 years under your signed contract.`,
          },
          {
            q: 'Can I choose my own property mix?',
            a: 'Yes. Customise your allocation across studios, 1–2 bedroom apartments, and selected retail units across three prime Class-A projects.',
          },
          {
            q: 'Why aren’t developer names published publicly?',
            a: 'These negotiated 15%–16% terms are strictly off-market and exclusive to Jamoka Properties clients. Our advisors share the full confidential dossier one-on-one.',
          },
          {
            q: 'How quickly can I arrange a private briefing?',
            a: 'Submit the form above or message our WhatsApp desk. A senior Dubai advisor will respond promptly in English or Arabic.',
          },
        ];

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-white text-[#1E293B] selection:bg-[#CFA55A]/25 selection:text-[#0D1B2A] ${
        language === 'ar' ? 'font-arabic' : 'font-jakarta'
      }`}
    >
      {/* TOP BAR: BRAND · 4 CLEAN LINKS · LIVE CURRENCY (AED/EUR/USD) · LANGUAGE · CTA */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Brand + Main Site (2xl+) */}
          <div className="flex items-center gap-3 min-w-0 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateMainSite('home')}
              className="flex items-center shrink-0 cursor-pointer"
              aria-label="Jamoka Properties Home"
            >
              <JamokaLogo className="h-7 sm:h-9" light={false} />
            </button>
            <span className="hidden 2xl:inline-block h-5 w-px bg-slate-200 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigateMainSite('services')}
              className="hidden 2xl:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#0D1B2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
              <span>{content.nav.mainSite}</span>
            </button>
          </div>

          {/* Center: 4 Clean Section Links */}
          <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-6 shrink-0">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-xs font-semibold text-slate-600 hover:text-[#0D1B2A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Live Currency (AED | EUR | USD) + EN | العربية + Translate (xl+) + CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Live Currency Selector */}
            <div
              role="group"
              aria-label="Currency selector"
              title={
                detectedCountry
                  ? `Auto-detected for ${detectedCountry}${ratesLive ? ' (Live FX)' : ''}`
                  : 'Select display currency'
              }
              className="inline-flex items-center rounded-md border border-slate-200 bg-[#FAF7F0] p-0.5 shrink-0"
            >
              {CURRENCIES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    setCurrency(code);
                    trackCurrencyChange(code, 'private_investment_header');
                  }}
                  className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    currency === code
                      ? 'bg-[#0A0D14] text-[#CFA55A]'
                      : 'text-slate-600 hover:text-[#0A0D14]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* EN | العربية Toggle */}
            <div
              role="group"
              aria-label="Language switcher"
              className="inline-flex items-center rounded-md border border-slate-200 bg-[#FAF7F0] p-0.5 shrink-0"
            >
              <button
                type="button"
                onClick={() => {
                  setLanguage('en');
                  dismissLangPrompt();
                }}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#0A0D14] text-white'
                    : 'text-slate-600 hover:text-[#0A0D14]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => {
                  setLanguage('ar');
                  dismissLangPrompt();
                }}
                className={`px-1.5 sm:px-2 py-1 rounded text-[10px] sm:text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  language === 'ar'
                    ? 'bg-[#0A0D14] text-white'
                    : 'text-slate-600 hover:text-[#0A0D14]'
                }`}
              >
                العربية
              </button>
            </div>

            <div className="hidden xl:block shrink-0">
              <GoogleTranslateWidget
                label={content.nav.moreLanguages}
                openSignal={translateOpenSignal}
              />
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('enquire')}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] text-xs font-bold tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{content.nav.cta}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="lg:hidden p-1.5 sm:p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 shrink-0 cursor-pointer"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 10-SECOND PROMINENT AUTO-FADING LANGUAGE POP-UP ON LOAD/RELOAD */}
        {langPromptMounted && (
          <div
            onMouseEnter={() => setLangPromptHovered(true)}
            onMouseLeave={() => setLangPromptHovered(false)}
            role="dialog"
            aria-label="Choose your preferred language"
            className={`fixed top-[76px] sm:top-[88px] left-1/2 -translate-x-1/2 z-50 w-[calc(100vw-1.5rem)] sm:w-[480px] rounded-2xl bg-[#0A0D14] text-white border-2 border-[#CFA55A] ring-4 ring-[#CFA55A]/20 shadow-[0_24px_64px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-500 ${
              langPromptFading
                ? 'opacity-0 -translate-y-2 pointer-events-none'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/50 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#CFA55A]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#CFA55A]">
                      {detectedCountry
                        ? `${detectedCountry} · ${currency}`
                        : 'INTERNATIONAL INVESTOR DESK'}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-white leading-snug mt-0.5">
                      Choose Language · اختر لغتك
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {language === 'ar'
                        ? 'استمر باللغة العربية أو بدّل إلى الإنجليزية أو أي لغة أخرى'
                        : 'Keep English, switch to Arabic, or translate to your language'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={dismissLangPrompt}
                  aria-label="Close language prompt"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('en');
                    dismissLangPrompt();
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {language === 'en' ? 'Keep English' : 'English'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage('ar');
                    dismissLangPrompt();
                  }}
                  className={`py-3 px-4 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                    language === 'ar'
                      ? 'bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                >
                  {language === 'ar' ? 'الاستمرار بالعربية' : 'العربية'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dismissLangPrompt();
                    if (window.innerWidth < 1280) {
                      setMobileNavOpen(true);
                    }
                    setTranslateOpenSignal((prev) => prev + 1);
                  }}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
                >
                  {language === 'ar' ? 'لغات أخرى' : 'Other Languages'}
                </button>
              </div>
            </div>

            <div className="h-1.5 w-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#CFA55A] transition-all ease-linear"
                style={{
                  width: langPromptHovered ? '100%' : langPromptBarStarted ? '0%' : '100%',
                  transitionDuration: langPromptHovered ? '200ms' : '9900ms',
                }}
              />
            </div>
          </div>
        )}

        {/* Mobile / Tablet Drawer */}
        {mobileNavOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-start px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-[#FAF7F0] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('enquire')}
              className="md:hidden w-full py-2.5 px-4 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] text-xs font-bold tracking-wide transition-colors cursor-pointer"
            >
              {content.nav.cta}
            </button>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <GoogleTranslateWidget
                label={content.nav.moreLanguages}
                alignEnd={false}
                openSignal={translateOpenSignal}
              />
              <button
                type="button"
                onClick={() => onNavigateMainSite('services')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0A0D14] cursor-pointer"
              >
                <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                <span>{content.nav.mainSite}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* BAND 1: HERO — DISTILLED VALUE PROP + LIVE CURRENCY TIERS + IMMEDIATE FORM */}
      <section id="top" className="relative overflow-hidden bg-[#090C12] text-white">
        <img
          src={PRIVATE_INVESTMENT_IMAGES.heroSkyline}
          alt="Dubai iconic architectural skyline at golden hour"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090C12]/96 via-[#090C12]/85 to-[#090C12]/74" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090C12] via-transparent to-[#090C12]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Cols: Minimal, High-Impact Pitch */}
            <div className="lg:col-span-7 space-y-5">
              <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#CFA55A]">
                {content.hero.eyebrow}
              </p>

              <h1
                className="text-3xl sm:text-5xl lg:text-[50px] font-semibold leading-[1.1] tracking-tight text-white font-serif-luxury"
                style={{ textWrap: 'balance' }}
              >
                {content.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-xl">
                {language === 'ar'
                  ? 'عوائد سنوية مهيكلة 15%–16% لمدة 3 سنوات عبر مشاريع مختارة في دبي — مع خيار إعادة الشراء بسعر الشراء الأصلي.'
                  : '15%–16% structured annual returns over a simple 3-year Dubai property term—with an original purchase price buyback option.'}
              </p>

              {/* Two Live-Currency Tier Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 max-w-xl">
                <button
                  type="button"
                  onClick={() => setSelectedBudget('AED 5 Million')}
                  className={`text-start rounded-xl p-5 transition-all cursor-pointer border ${
                    selectedBudget === 'AED 5 Million'
                      ? 'bg-white text-[#0A0D14] border-[#CFA55A] shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-white border-white/20 hover:border-[#CFA55A]/70'
                  }`}
                >
                  <p
                    className={`text-xs font-bold tracking-wider uppercase tabular-nums ${
                      selectedBudget === 'AED 5 Million' ? 'text-slate-500' : 'text-slate-300'
                    }`}
                  >
                    {amt5M}
                    {currency !== 'AED' && (
                      <span className="font-normal opacity-75"> · AED 5M</span>
                    )}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold font-serif-luxury tabular-nums mt-1">
                    {content.hero.tier1Roi}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-1 tabular-nums ${
                      selectedBudget === 'AED 5 Million' ? 'text-[#A6833D]' : 'text-[#CFA55A]'
                    }`}
                  >
                    {annual5M} / {language === 'ar' ? 'سنوياً' : 'year'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedBudget('AED 10 Million')}
                  className={`text-start rounded-xl p-5 transition-all cursor-pointer border ${
                    selectedBudget === 'AED 10 Million'
                      ? 'bg-white text-[#0A0D14] border-[#CFA55A] shadow-lg'
                      : 'bg-white/10 backdrop-blur-md text-white border-[#CFA55A]/50 hover:border-[#CFA55A]'
                  }`}
                >
                  <p
                    className={`text-xs font-bold tracking-wider uppercase tabular-nums ${
                      selectedBudget === 'AED 10 Million' ? 'text-slate-500' : 'text-slate-300'
                    }`}
                  >
                    {amt10M}
                    {currency !== 'AED' && (
                      <span className="font-normal opacity-75"> · AED 10M</span>
                    )}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold font-serif-luxury tabular-nums mt-1">
                    {content.hero.tier2Roi}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-1 tabular-nums ${
                      selectedBudget === 'AED 10 Million' ? 'text-[#A6833D]' : 'text-[#CFA55A]'
                    }`}
                  >
                    {annual10M} / {language === 'ar' ? 'سنوياً' : 'year'}
                  </p>
                </button>
              </div>

              {/* Repeated UAE Government · Escrow · DLD Protection Strip */}
              <div className="pt-1">
                <ProtectionStrip language={language} dark />
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => scrollToSection('structure')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] font-bold text-sm tracking-wide transition-colors cursor-pointer"
                >
                  <span>{content.hero.secondaryCta}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1E6F4E] hover:bg-[#17593E] text-white font-semibold text-sm tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{content.form.whatsappDirectLabel}</span>
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Immediate Above-the-Fold Consultation Form */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white text-[#0A0D14] border-2 border-[#CFA55A]/70 shadow-2xl overflow-hidden">
                <div className="bg-[#0F1624] text-white px-6 py-4 border-b border-[#CFA55A]/30">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#CFA55A]">
                    {content.hero.formCardEyebrow}
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold font-serif-luxury mt-0.5">
                    {content.hero.formCardTitle}
                  </h2>
                </div>
                <div className="p-5 sm:p-6">
                  <PrivateInvestmentForm
                    language={language}
                    mode="compact"
                    initialBudget={selectedBudget}
                    currency={currency}
                    formatAmount={formatAmount}
                    onOpenPrivacy={() => setLegalModal('privacy')}
                    onSwitchToFullForm={() => scrollToSection('enquire')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 2: HOW YOUR CAPITAL WORKS — AND HOW YOU EXIT (WARM SAND, DISTILLED) */}
      <section id="buyback" className="py-16 sm:py-20 bg-[#F5F1E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6833D]">
              {content.buyback.eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-[#0A0D14] font-serif-luxury leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {content.buyback.heading}
            </h2>
          </div>

          {/* Crisp 3-Step Visual Flowchart */}
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              {/* Step 1 */}
              <div className="md:col-span-5 rounded-2xl bg-white border border-slate-200 p-6 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A6833D]">
                  {content.buyback.step1Tag}
                </span>
                <h3 className="text-xl font-bold text-[#0A0D14] font-serif-luxury tabular-nums">
                  {language === 'ar'
                    ? `استثمر ${short5M} أو ${short10M}`
                    : `Invest ${short5M} or ${short10M}`}
                </h3>
                <p className="text-sm text-slate-600">
                  {language === 'ar'
                    ? 'عقارات مسجّلة لدى DLD ومحمية بحساب ضمان معتمد.'
                    : 'DLD-registered Dubai properties protected by Escrow.'}
                </p>
              </div>

              <div className="md:col-span-1 flex justify-center py-1">
                <div className="w-9 h-9 rounded-full bg-[#0A0D14] text-[#CFA55A] flex items-center justify-center">
                  <ArrowRight className={`hidden md:block w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  <ArrowDown className="md:hidden w-4 h-4" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="md:col-span-5 rounded-2xl bg-[#0A0D14] text-white border border-[#CFA55A]/60 p-6 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#CFA55A]">
                  {content.buyback.step2Tag}
                </span>
                <h3 className="text-xl font-bold text-white font-serif-luxury">
                  {content.buyback.step2Title}
                </h3>
                <p className="text-sm text-slate-300 tabular-nums">
                  {language === 'ar'
                    ? `${annual5M} أو ${annual10M} سنوياً — موثّقة بشيكات من اليوم الأول.`
                    : `${annual5M} or ${annual10M}/yr — backed by day-one cheques.`}
                </p>
              </div>
            </div>

            {/* Milestone */}
            <div className="flex flex-col items-center">
              <div className="w-px h-5 bg-[#A6833D]" />
              <div className="px-5 py-1.5 rounded-lg bg-[#0A0D14] text-white text-xs font-bold tracking-wider uppercase border border-[#CFA55A]/60">
                {content.buyback.step3Tag} — {content.buyback.step3Heading}
              </div>
              <div className="w-px h-5 bg-[#A6833D]" />
            </div>

            {/* Two Primary Year-3 Choices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white border-2 border-[#CFA55A] p-6 space-y-2">
                <div className="flex items-center gap-2.5">
                  <Wallet className="w-5 h-5 text-[#A6833D]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#A6833D]">
                    {content.buyback.optionATag}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#0A0D14] font-serif-luxury">
                  {content.buyback.optionATitle}
                </h4>
                <p className="text-sm text-slate-600 tabular-nums">
                  {language === 'ar'
                    ? `استرد 100% من رأس المال (${short5M} أو ${short10M}) وفق اتفاقية إعادة الشراء.`
                    : `Exit cleanly with 100% original purchase price (${short5M} or ${short10M}) back.`}
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2">
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-5 h-5 text-[#0A0D14]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {content.buyback.optionBTag}
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-[#0A0D14] font-serif-luxury">
                  {content.buyback.optionBTitle}
                </h4>
                <p className="text-sm text-slate-600">
                  {language === 'ar'
                    ? 'احتفظ بوحداتك في دبي للسكن الشخصي أو التملك طويل الأمد.'
                    : 'Keep full DLD-registered ownership for personal use or long-term wealth.'}
                </p>
              </div>
            </div>

            {/* Lightweight Optional 3+3 Renewal Line */}
            <div className="rounded-xl bg-white/85 border border-slate-200 px-5 py-3.5 flex items-center gap-3 text-xs sm:text-sm text-slate-700">
              <Repeat2 className="w-4 h-4 text-[#A6833D] shrink-0" />
              <span className="tabular-nums">
                <strong className="text-[#0A0D14]">
                  {language === 'ar' ? 'تمديد اختياري (3+3 سنوات):' : 'Optional 3+3-Year Renewal:'}
                </strong>{' '}
                {language === 'ar'
                  ? `يمكنك التمديد لـ 6 سنوات إجمالاً (${total6Yr5M} أو ${total6Yr10M}).`
                  : `Extend up to 6 years total (${total6Yr5M} or ${total6Yr10M} cumulative return).`}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 3: SIMPLE 3-YEAR INVESTMENT RETURNS (DEEP OBSIDIAN BLACK + LIVE CURRENCY) */}
      <section
        id="structure"
        className="py-16 sm:py-20 bg-[#0A0D14] text-white border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-2 mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CFA55A]">
              {content.structure.eyebrow}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-semibold text-white font-serif-luxury leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {content.structure.heading}
            </h2>
            {currency !== 'AED' && (
              <p className="text-xs text-slate-400">
                {language === 'ar'
                  ? `أسعار صرف لحظية (${currency}) · العملة التعاقدية المرجعية: الدرهم الإماراتي (AED)`
                  : `Showing live ${currency} conversion · Contractual reference currency: AED`}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
            {/* CARD ONE: AED 5M */}
            <article className="rounded-2xl bg-white text-[#0A0D14] p-7 sm:p-8 border border-white/20 shadow-xl flex flex-col justify-between">
              <div>
                <div className="pb-5 border-b border-slate-200 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A6833D]">
                      {content.structure.tier1.label}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#0A0D14] font-serif-luxury tabular-nums mt-1">
                      {amt5M}
                    </h3>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#A6833D] whitespace-nowrap">
                    15% {language === 'ar' ? 'سنوياً' : 'Annual ROI'}
                  </span>
                </div>

                {/* Annual & 3-Year Total */}
                <div className="py-5 border-b border-slate-200 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                      {content.structure.annualReturnLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#0A0D14] font-serif-luxury tabular-nums mt-1 block">
                      {annual5M}
                    </span>
                  </div>
                  <div className="border-s border-slate-200 ps-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#A6833D] block">
                      {content.structure.threeYearTotalLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#0A0D14] font-serif-luxury tabular-nums mt-1 block">
                      {total3Yr5M}
                    </span>
                  </div>
                </div>

                <dl className="divide-y divide-slate-100 text-sm">
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <dt className="text-slate-600">{content.structure.termLabel}</dt>
                    <dd className="font-bold text-[#0A0D14]">{content.structure.termValue}</dd>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <dt className="text-slate-600">{content.structure.exitOptionLabel}</dt>
                    <dd className="font-semibold text-[#0A0D14] tabular-nums text-end">
                      {amt5M} {language === 'ar' ? '(إعادة الشراء)' : 'Buyback'}
                    </dd>
                  </div>
                </dl>

                {/* Lightweight Optional 6-Year Note */}
                <div className="mt-2 pt-3 border-t border-dashed border-slate-200 flex items-center justify-between gap-2 text-xs text-slate-600">
                  <span>{content.structure.extendedHeading}</span>
                  <span className="font-semibold text-[#A6833D] tabular-nums">{total6Yr5M}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handleSelectAllocationCta('AED 5 Million')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#0A0D14] hover:bg-[#172133] text-white text-sm font-bold tracking-wide transition-colors cursor-pointer"
                >
                  <span>
                    {language === 'ar'
                      ? `استثمر ${short5M} بعائد 15% سنوياً`
                      : `Invest ${short5M} at 15% Annual ROI`}
                  </span>
                  <ArrowRight className={`w-4 h-4 text-[#CFA55A] ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </article>

            {/* CARD TWO: AED 10M */}
            <article className="rounded-2xl bg-[#121826] text-white p-7 sm:p-8 border-2 border-[#CFA55A] shadow-2xl flex flex-col justify-between">
              <div>
                <div className="pb-5 border-b border-white/15 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#CFA55A]">
                      {content.structure.tier2.label}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury tabular-nums mt-1">
                      {amt10M}
                    </h3>
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#CFA55A] whitespace-nowrap">
                    16% {language === 'ar' ? 'سنوياً' : 'Annual ROI'}
                  </span>
                </div>

                {/* Annual & 3-Year Total */}
                <div className="py-5 border-b border-white/15 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-300 block">
                      {content.structure.annualReturnLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#CFA55A] font-serif-luxury tabular-nums mt-1 block">
                      {annual10M}
                    </span>
                  </div>
                  <div className="border-s border-white/15 ps-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#CFA55A] block">
                      {content.structure.threeYearTotalLabel}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-white font-serif-luxury tabular-nums mt-1 block">
                      {total3Yr10M}
                    </span>
                  </div>
                </div>

                <dl className="divide-y divide-white/10 text-sm">
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <dt className="text-slate-300">{content.structure.termLabel}</dt>
                    <dd className="font-bold text-white">{content.structure.termValue}</dd>
                  </div>
                  <div className="py-3.5 flex items-center justify-between gap-4">
                    <dt className="text-slate-300">{content.structure.exitOptionLabel}</dt>
                    <dd className="font-semibold text-white tabular-nums text-end">
                      {amt10M} {language === 'ar' ? '(إعادة الشراء)' : 'Buyback'}
                    </dd>
                  </div>
                </dl>

                {/* Lightweight Optional 6-Year Note */}
                <div className="mt-2 pt-3 border-t border-dashed border-white/15 flex items-center justify-between gap-2 text-xs text-slate-300">
                  <span>{content.structure.extendedHeading}</span>
                  <span className="font-semibold text-[#CFA55A] tabular-nums">{total6Yr10M}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => handleSelectAllocationCta('AED 10 Million')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] text-sm font-bold tracking-wide transition-colors cursor-pointer"
                >
                  <span>
                    {language === 'ar'
                      ? `استثمر ${short10M} بعائد 16% سنوياً`
                      : `Invest ${short10M} at 16% Annual ROI`}
                  </span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </article>
          </div>

          {/* Repeated UAE Government · Escrow · DLD Protection Ribbon */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-3 text-center">
            <ProtectionStrip language={language} dark />
            <p className="text-[11px] text-slate-400 max-w-2xl">
              {language === 'ar'
                ? 'تخضع كافة الشروط المالية وخيارات إعادة الشراء والتمديد للاتفاقية النهائية الموقّعة. الدرهم الإماراتي (AED) هو العملة المرجعية.'
                : 'All returns, buyback terms, and renewal options are governed by the signed agreement. AED is the contractual reference currency.'}
            </p>
          </div>
        </div>
      </section>

      {/* BAND 4: ABOUT JAMOKA PROPERTIES & REAL DUBAI TEAM (WARM IVORY, CONCISE) */}
      <section id="about" className="py-16 sm:py-20 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6833D]">
                  {content.about.eyebrow}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-[#0A0D14] font-serif-luxury leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {content.about.heading}
                </h2>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {language === 'ar'
                  ? 'شركة وساطة عقارية مرخصة من ريرا (ORN 49679) في الخليج التجاري بدبي، تضم أكثر من 70 مستشاراً يتحدثون +15 لغة لربط المستثمرين الدوليين بأفضل الفرص المضمونة والمسجّلة لدى دائرة الأراضي والأملاك.'
                  : 'A RERA-licensed Dubai brokerage (ORN 49679) in Business Bay with 70+ consultants speaking 15+ languages—connecting global investors directly to vetted, DLD-registered and Escrow-protected allocations.'}
              </p>

              {/* Verified Jamoka Trust Metrics */}
              <div className="grid grid-cols-3 gap-3">
                {content.about.trustMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white border border-slate-200 p-3.5 text-center"
                  >
                    <p className="text-lg sm:text-2xl font-bold text-[#0A0D14] font-serif-luxury tabular-nums">
                      {metric.value}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Compact Contact Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs">
                <div className="flex items-start gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-[#A6833D] shrink-0 mt-0.5" />
                  <span>{PRIVATE_INVESTMENT_CONFIG.officeAddress[language]}</span>
                </div>
                <div className="space-y-1">
                  <a
                    href={`tel:${PRIVATE_INVESTMENT_CONFIG.phoneHref}`}
                    dir="ltr"
                    className="inline-flex items-center gap-2 font-semibold text-[#0A0D14] hover:text-[#A6833D]"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#A6833D]" />
                    <span>{PRIVATE_INVESTMENT_CONFIG.phoneDisplay}</span>
                  </a>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#A6833D] shrink-0" />
                    <span>{PRIVATE_INVESTMENT_CONFIG.officeHours[language]}</span>
                  </p>
                </div>
              </div>

              <a
                href={PRIVATE_INVESTMENT_CONFIG.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0D14] hover:text-[#A6833D] underline underline-offset-4"
              >
                <span>{content.about.visitSiteCta}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Right: Exact Homepage Team Photo + Verified ImageKit Advisors */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-[#0A0D14] shadow-xl">
                <div className="aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={teamPhotoSrc}
                    alt="Jamoka Properties Dubai real estate advisory team"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => {
                      if (teamPhotoSrc !== withBasePath('/advisory-team.jpg')) {
                        setTeamPhotoSrc(withBasePath('/advisory-team.jpg'));
                      }
                    }}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A0D14]/95 via-[#0A0D14]/55 to-transparent pt-14 pb-5 px-6 flex items-end justify-between gap-4">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {content.about.teamCaption}
                    </h4>
                    <p className="text-xs text-[#CFA55A] font-medium mt-0.5">
                      {content.about.teamSubcaption}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-[#CFA55A]/50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-[#CFA55A]" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white border border-slate-200 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center -space-x-2.5 rtl:space-x-reverse">
                  {TEAM_MEDIA.advisorPortraits.map((advisor, idx) => (
                    <img
                      key={idx}
                      src={advisor.url}
                      alt={advisor.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover object-top border-2 border-white bg-[#FAF7F0]"
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[#0A0D14]">
                  {language === 'ar'
                    ? 'مستشارو استثمار مرخصون في دبي (مقابلات شخصية أو عبر الفيديو)'
                    : 'Licensed Dubai Investment Advisors · In-Person or Video'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 5: EXCLUSIVE PRIVATE PORTFOLIO — DEEP PRIVATE-VAULT CHARCOAL BLACK (MINIMAL) */}
      <section
        id="developments"
        className="py-16 sm:py-20 bg-[#0B0F17] text-white border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CFA55A]">
                {content.developments.eyebrow}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-white font-serif-luxury leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {content.developments.heading}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'نحتفظ بأسماء المطوّرين والمشاريع بسرّية تامة لأنها تخصيصات حصرية خارج السوق لعملائنا فقط — وكل مشروع مسجّل لدى DLD ومحمي بحساب ضمان.'
                  : 'Developer and project names stay strictly private—these off-market 15%–16% allocations are reserved exclusively for Jamoka clients, and every project is DLD-registered & Escrow-protected.'}
              </p>
            </div>
            <ProtectionStrip language={language} dark />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SELECTED_DEVELOPMENTS_CMS.map((dev) => (
              <article
                key={dev.id}
                className="rounded-xl bg-[#131926] border border-white/12 hover:border-[#CFA55A]/60 transition-colors overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={dev.image}
                      alt={dev.imageAlt[language]}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-transparent" />
                    <div className="absolute bottom-3 start-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#E5C98E]">
                      <Lock className="w-3.5 h-3.5 text-[#CFA55A]" />
                      <span>{dev.developerName[language]}</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg sm:text-xl font-semibold text-white font-serif-luxury">
                      {dev.projectName[language]}
                    </h3>
                    <p className="text-xs text-[#CFA55A] font-medium">
                      {dev.propertyTypes[language]}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'ar'
                        ? 'مشروع من الفئة الأولى مسجّل لدى DLD ومحمي بحساب ضمان — يُكشف عنه خلال الاستشارة الخاصة.'
                        : 'Tier-1 DLD-registered & Escrow-protected development—disclosed privately during consultation.'}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <button
                    type="button"
                    onClick={() => scrollToSection('enquire')}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    <span>{content.developments.dossierCta}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 6: FLEXIBLE PROPERTY ALLOCATION — PURE WHITE (DISTILLED) */}
      <section id="allocation" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6833D]">
                {content.allocation.eyebrow}
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-[#0A0D14] font-serif-luxury leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {content.allocation.heading}
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              {language === 'ar'
                ? 'وزّع استثمارك بحرية بين الوحدات السكنية والتجارية عبر ثلاثة مشاريع فاخرة في دبي.'
                : 'Mix and match studios, apartments, or retail units across three prime Dubai developments.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.allocation.categories.map((cat, idx) => (
              <div
                key={idx}
                className="rounded-xl overflow-hidden border border-slate-200 bg-white flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#A6833D]">
                    {cat.subtitle}
                  </p>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0A0D14] font-serif-luxury">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">{cat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BAND 7: 5-STEP PROCESS + UAE GOVERNMENT / DLD / ESCROW SAFEGUARDS (DEEP NAVY-BLACK) */}
      <section
        id="process"
        className="py-16 sm:py-20 bg-[#0A101B] text-white border-y border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* UAE Government · Escrow · DLD 3-Card Safeguard Grid */}
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#CFA55A]">
                {language === 'ar'
                  ? 'حماية حكومة الإمارات · حساب الضمان · DLD'
                  : 'UAE GOVERNMENT FRAMEWORK · ESCROW · DLD'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white font-serif-luxury">
                {language === 'ar'
                  ? 'استثمر بثقة تحت مظلة دبي التنظيمية'
                  : 'Structured Within Dubai’s Regulated Real Estate Framework'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl bg-[#121A2B] border border-[#CFA55A]/40 p-6 space-y-2">
                <Landmark className="w-6 h-6 text-[#CFA55A]" />
                <h3 className="text-base font-bold text-white">
                  {language === 'ar'
                    ? 'مشاريع مدعومة بالإطار الحكومي للإمارات'
                    : 'Backed by UAE Government Framework'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'جميع المشاريع المشاركة خاضعة للوائح والرقابة العقارية المعتمدة في دولة الإمارات.'
                    : 'Participating developments operate under strict UAE government real estate laws and oversight.'}
                </p>
              </div>

              <div className="rounded-xl bg-[#121A2B] border border-[#CFA55A]/40 p-6 space-y-2">
                <ShieldCheck className="w-6 h-6 text-[#CFA55A]" />
                <h3 className="text-base font-bold text-white">
                  {language === 'ar'
                    ? 'حماية كاملة عبر حساب الضمان (Escrow)'
                    : 'Protected With Escrow Account'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'الدفعات الإنشائية محمية بحسابات ضمان منظّمة قانونياً وفق القانون رقم 8 لسنة 2007.'
                    : 'Investor funds are safeguarded in regulated developer Escrow accounts under Dubai Law No. 8 of 2007.'}
                </p>
              </div>

              <div className="rounded-xl bg-[#121A2B] border border-[#CFA55A]/40 p-6 space-y-2">
                <Check className="w-6 h-6 text-[#CFA55A]" />
                <h3 className="text-base font-bold text-white">
                  {language === 'ar'
                    ? 'مسجّلة لدى دائرة الأراضي والأملاك (DLD)'
                    : 'Dubai Land Department (DLD)'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {language === 'ar'
                    ? 'توثيق رسمي لملكية الوحدات وعقود التسجيل عبر دائرة الأراضي والأملاك في دبي.'
                    : 'Official property registration and transparent title documentation via the Dubai Land Department.'}
                </p>
              </div>
            </div>
          </div>

          {/* 5 Simple Steps */}
          <div className="pt-8 border-t border-white/10">
            <h3 className="text-xl sm:text-2xl font-semibold text-white font-serif-luxury text-center mb-8">
              {content.process.heading}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {content.process.steps.map((step) => (
                <div
                  key={step.number}
                  className="rounded-xl bg-white/5 border border-white/10 p-5 space-y-2"
                >
                  <span className="text-xl font-serif-luxury font-bold text-[#CFA55A] tabular-nums block">
                    {step.number}
                  </span>
                  <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BAND 8: FULL CONSULTATION & ALLOCATION DESK — WARM SAND */}
      <section id="enquire" className="py-16 sm:py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6833D]">
                  {content.form.eyebrow}
                </p>
                <h2
                  className="text-3xl sm:text-4xl font-semibold text-[#0A0D14] font-serif-luxury leading-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {content.form.heading}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {language === 'ar'
                    ? 'اترك بياناتك وسيتواصل معك مستشار استثمار من مكتبنا في دبي لمشاركة الملف السري الكامل.'
                    : 'Leave your details and a senior Dubai advisor will share our confidential DLD-registered & Escrow-protected portfolio.'}
                </p>
              </div>

              <div className="rounded-xl bg-[#0A0D14] text-white border border-[#CFA55A]/50 p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 tabular-nums">
                      {short5M}
                    </p>
                    <p className="text-lg font-bold text-[#CFA55A] font-serif-luxury tabular-nums mt-0.5">
                      15% {language === 'ar' ? 'سنوياً' : 'Annual ROI'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 tabular-nums">
                      {short10M}
                    </p>
                    <p className="text-lg font-bold text-[#CFA55A] font-serif-luxury tabular-nums mt-0.5">
                      16% {language === 'ar' ? 'سنوياً' : 'Annual ROI'}
                    </p>
                  </div>
                </div>

                <ProtectionStrip language={language} dark />

                <div className="space-y-2.5 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg bg-[#1E6F4E] hover:bg-[#17593E] text-white text-xs font-bold tracking-wide transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{content.form.whatsappDirectLabel}</span>
                  </a>
                  <a
                    href={`tel:${PRIVATE_INVESTMENT_CONFIG.phoneHref}`}
                    dir="ltr"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/8 hover:bg-white/14 border border-white/15 text-white text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#CFA55A]" />
                    <span>{PRIVATE_INVESTMENT_CONFIG.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-white text-[#0A0D14] border-2 border-[#CFA55A]/60 shadow-xl p-6 sm:p-8">
                <PrivateInvestmentForm
                  language={language}
                  mode="full"
                  initialBudget={selectedBudget}
                  currency={currency}
                  formatAmount={formatAmount}
                  onOpenPrivacy={() => setLegalModal('privacy')}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND 9: CONCISE FAQ (TOP 6 QUESTIONS — CRISP WHITE) */}
      <section id="faq" className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A6833D]">
              {content.faq.eyebrow}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-semibold text-[#0A0D14] font-serif-luxury"
              style={{ textWrap: 'balance' }}
            >
              {content.faq.heading}
            </h2>
          </div>

          <div className="divide-y divide-slate-200 rounded-2xl bg-[#FAF7F0] border border-slate-200 overflow-hidden">
            {conciseFaqs.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={isOpen ? 'bg-white' : ''}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-start hover:bg-white transition-colors cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#0A0D14]">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A6833D] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 text-sm text-slate-600 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CORPORATE FOOTER & LEGAL DISCLAIMER */}
      <footer className="bg-[#07090E] text-slate-300 pt-14 pb-28 lg:pb-14 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigateMainSite('home')}
                className="inline-flex items-center cursor-pointer"
                aria-label="Jamoka Properties Home"
              >
                <JamokaLogo className="h-9" light />
              </button>
              <p className="text-xs text-slate-400">
                {PRIVATE_INVESTMENT_CONFIG.companyName} ·{' '}
                {PRIVATE_INVESTMENT_CONFIG.officeAddress[language]}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-xs">
              <button
                type="button"
                onClick={() => onNavigateMainSite('home')}
                className="hover:text-[#CFA55A] cursor-pointer"
              >
                {content.footer.home}
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#CFA55A] cursor-pointer"
              >
                {content.footer.privacy}
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#CFA55A] cursor-pointer"
              >
                {content.footer.terms}
              </button>
              <button
                type="button"
                onClick={() => setLegalModal('disclaimer')}
                className="hover:text-[#CFA55A] cursor-pointer"
              >
                {content.footer.disclaimerLink}
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-[#CFA55A]">{content.footer.disclaimerHeading}:</strong>{' '}
            {content.footer.disclaimerText}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-white/10">
            <p>
              © {new Date().getFullYear()} {PRIVATE_INVESTMENT_CONFIG.companyName}.{' '}
              {content.footer.rights}
            </p>
            <p>RERA ORN {PRIVATE_INVESTMENT_CONFIG.reraOrn} · Dubai, UAE</p>
          </div>
        </div>
      </footer>

      {/* PERSISTENT FLOATING CONSULTATION POP-UP & ALWAYS-ACCESSIBLE WHATSAPP CTA */}
      <div
        className={`fixed bottom-4 z-50 flex flex-col gap-3 ${
          isRTL ? 'left-4 sm:left-6 items-start' : 'right-4 sm:right-6 items-end'
        }`}
      >
        {popupOpen && (
          <div
            role="dialog"
            aria-label={content.form.popupHeading}
            className="w-[calc(100vw-2rem)] sm:w-[370px] max-h-[82vh] overflow-y-auto rounded-2xl bg-white border-2 border-[#CFA55A]/70 shadow-2xl"
          >
            <div className="bg-[#0A0D14] text-white px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#CFA55A]">
                  {content.form.popupEyebrow}
                </p>
                <h3 className="text-base font-semibold font-serif-luxury mt-0.5">
                  {content.form.popupHeading}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPopupOpen(false);
                  setPopupDismissedByUser(true);
                }}
                aria-label="Minimize consultation form"
                className="p-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">
              <PrivateInvestmentForm
                language={language}
                mode="compact"
                initialBudget={selectedBudget}
                currency={currency}
                formatAmount={formatAmount}
                onOpenPrivacy={() => setLegalModal('privacy')}
                onSwitchToFullForm={() => {
                  setPopupOpen(false);
                  setPopupDismissedByUser(true);
                  scrollToSection('enquire');
                }}
              />
            </div>
          </div>
        )}

        <div className="hidden sm:flex items-center gap-2.5">
          {!popupOpen && passedHero && (
            <button
              type="button"
              onClick={() => setPopupOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#CFA55A] hover:bg-[#BE9346] text-[#0A0D14] text-xs font-bold tracking-wide shadow-xl transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>{content.form.popupReopenLabel}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          )}

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={content.form.whatsappDirectLabel}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#1E6F4E] hover:bg-[#17593E] text-white text-xs font-bold tracking-wide shadow-xl transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>{content.form.whatsappDirectLabel}</span>
          </a>
        </div>
      </div>

      {/* Compact Mobile Sticky Bar */}
      {!popupOpen && (
        <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0D14]/98 backdrop-blur-md border-t border-[#CFA55A]/40 px-3 py-2.5 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setPopupOpen(true)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#CFA55A] text-[#0A0D14] text-xs font-bold whitespace-nowrap cursor-pointer"
          >
            <span>{content.form.popupReopenLabel}</span>
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg bg-[#1E6F4E] text-white text-xs font-bold whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>
        </div>
      )}

      {/* LEGAL DOCUMENT MODAL */}
      {legalModal && (
        <div
          className="fixed inset-0 z-[60] bg-[#0A0D14]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLegalModal(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <h3 className="text-lg font-semibold text-[#0A0D14] font-serif-luxury">
                {legalModal === 'privacy'
                  ? content.legal.privacyTitle
                  : legalModal === 'terms'
                  ? content.legal.termsTitle
                  : content.legal.disclaimerTitle}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                aria-label={content.legal.close}
                className="p-1.5 rounded-md text-slate-500 hover:text-[#0A0D14] hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3.5 text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
              {(legalModal === 'privacy'
                ? content.legal.privacyBody
                : legalModal === 'terms'
                ? content.legal.termsBody
                : content.legal.disclaimerBody
              ).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="px-6 py-3.5 border-t border-slate-100 bg-[#FAF7F0] flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 rounded-lg bg-[#0A0D14] text-white text-xs font-semibold cursor-pointer"
              >
                {content.legal.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCREET COOKIE CONSENT BANNER */}
      {cookieChoice === null && (
        <div className="fixed bottom-16 sm:bottom-4 inset-x-4 sm:inset-x-auto sm:start-6 z-40 max-w-md rounded-xl bg-white border border-slate-200 shadow-lg p-4 space-y-3">
          <p className="text-xs text-slate-600 leading-relaxed">{content.cookie.message}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleCookieChoice('all')}
              className="px-3.5 py-1.5 rounded-md bg-[#0A0D14] text-white text-xs font-semibold cursor-pointer"
            >
              {content.cookie.accept}
            </button>
            <button
              type="button"
              onClick={() => handleCookieChoice('essential')}
              className="px-3.5 py-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-medium cursor-pointer"
            >
              {content.cookie.essentialOnly}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
