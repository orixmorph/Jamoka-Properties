import heroSkylineImg from '../assets/images/private_inv_hero_skyline_1795089964739.jpg';
import studioUnitImg from '../assets/images/private_inv_studio_unit_1795089964560.jpg';
import apartmentUnitImg from '../assets/images/private_inv_apartment_unit_1795089972332.jpg';
import retailUnitImg from '../assets/images/private_inv_retail_unit_1795089963776.jpg';
import towerShowcaseImg from '../assets/images/private_inv_tower_showcase_1795089965400.jpg';

export interface SelectedDevelopmentPlaceholder {
  id: string;
  developerLogoUrl: string | null;
  developerName: { en: string; ar: string };
  projectName: { en: string; ar: string };
  projectLocation: { en: string; ar: string };
  propertyTypes: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  imageAlt: { en: string; ar: string };
}

export const PRIVATE_INVESTMENT_IMAGES = {
  heroSkyline: heroSkylineImg,
  studioUnit: studioUnitImg,
  apartmentUnit: apartmentUnitImg,
  retailUnit: retailUnitImg,
  towerShowcase: towerShowcaseImg,
};

export const TEAM_MEDIA = {
  // Exact same team photo used on the Jamoka Properties homepage TeamSection
  groupPhoto: 'https://res.cloudinary.com/ui01u7dm/image/upload/v1793170985/_IMR1064.jpg',
  // Verified ImageKit advisor portraits from the Jamoka Dubai team
  advisorPortraits: [
    { name: 'Senior Investment Advisor', url: 'https://ik.imagekit.io/pkn80iczwu/teams/9.png' },
    { name: 'Private Wealth Consultant', url: 'https://ik.imagekit.io/pkn80iczwu/teams/8.png' },
    { name: 'Portfolio Specialist', url: 'https://ik.imagekit.io/pkn80iczwu/teams/11.png' },
    { name: 'European Desk Advisor', url: 'https://ik.imagekit.io/pkn80iczwu/teams/5.png' },
    { name: 'GCC Investor Relations', url: 'https://ik.imagekit.io/pkn80iczwu/teams/1.png' },
    { name: 'Executive Property Advisor', url: 'https://ik.imagekit.io/pkn80iczwu/teams/12.png' },
  ],
};

/**
 * Editable CMS-Ready Configuration for Jamoka Properties Private Investment Landing Page.
 * Update CRM webhook, analytics IDs, WhatsApp business number, and approved developer/project
 * entries here when final partner disclosures are ready.
 */
export const PRIVATE_INVESTMENT_CONFIG = {
  companyName: 'Jamoka Properties LLC',
  brandName: 'Jamoka Properties',
  websiteUrl: 'https://jamokaproperties.com',
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '971588648093',
  phoneDisplay: '+971 58 864 8093',
  phoneHref: '+971588648093',
  officeAddress: {
    en: 'Bayswater Tower, 8th & 11th Floor, Business Bay, Dubai, UAE',
    ar: 'برج بايزووتر، الطابقان الثامن والحادي عشر، الخليج التجاري، دبي، الإمارات العربية المتحدة',
  },
  officeHours: {
    en: 'Mon–Fri: 10:00 AM – 7:00 PM | Sat: 10:00 AM – 2:00 PM (GST)',
    ar: 'الإثنين – الجمعة: 10:00 صباحاً – 7:00 مساءً | السبت: 10:00 صباحاً – 2:00 ظهراً (بتوقيت دبي)',
  },
  reraOrn: '49679',
  campaignIdentifier: 'Dubai Private Investment',
  // Optional external CRM/webhook URL (e.g. HubSpot, Pipedrive, Zapier, Make, custom API).
  // When empty, submissions route securely through the configured FormBold lead inbox.
  crmWebhookUrl: import.meta.env.VITE_PRIVATE_INVESTMENT_CRM_WEBHOOK || '',
  analytics: {
    ga4MeasurementId: import.meta.env.VITE_GA4_MEASUREMENT_ID || '',
    gtmContainerId: import.meta.env.VITE_GTM_CONTAINER_ID || '',
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '724770330263678',
  },
};

/**
 * Editable CMS-Ready Project / Developer Placeholders.
 * No developer brands or unverified project statistics are invented here.
 * Replace each placeholder field once Jamoka Properties provides approved partner details.
 */
export const SELECTED_DEVELOPMENTS_CMS: SelectedDevelopmentPlaceholder[] = [
  {
    id: 'development-01',
    developerLogoUrl: null,
    developerName: {
      en: 'Exclusive Private Allocation · Portfolio 01',
      ar: 'تخصيص خاص حصري · المحفظة 01',
    },
    projectName: {
      en: 'Tier-1 Prime Residential Tower',
      ar: 'برج سكني فاخر من الفئة الأولى',
    },
    projectLocation: {
      en: 'Prime Central Dubai · Shared Privately With Clients',
      ar: 'موقع رئيسي في قلب دبي · يُشارك حصرياً مع عملائنا',
    },
    propertyTypes: {
      en: 'Studios & 1–2 Bedroom Apartments',
      ar: 'استوديوهات وشقق من غرفة إلى غرفتي نوم',
    },
    description: {
      en: 'Hand-picked by our investment specialists for its established Tier-1 developer track record, high-demand prime location, and negotiated structured return + buyback terms.',
      ar: 'اختاره خبراء الاستثمار لدينا بعناية لسجل المطوّر المرموق والموقع الحيوي المميز وشروط العائد المهيكل وإعادة الشراء الحصرية.',
    },
    image: towerShowcaseImg,
    imageAlt: {
      en: 'Contemporary Class-A residential tower in Dubai',
      ar: 'برج سكني حديث من الفئة الأولى في دبي',
    },
  },
  {
    id: 'development-02',
    developerLogoUrl: null,
    developerName: {
      en: 'Exclusive Private Allocation · Portfolio 02',
      ar: 'تخصيص خاص حصري · المحفظة 02',
    },
    projectName: {
      en: 'Class-A Luxury Residence Collection',
      ar: 'مجموعة شقق سكنية فاخرة من الفئة (A)',
    },
    projectLocation: {
      en: 'Flagship Dubai Community · Confidential Client Brief',
      ar: 'مجتمع سكني رئيسي في دبي · ملف خاص للعملاء',
    },
    propertyTypes: {
      en: '1–2 Bedroom Apartments & Selected Studios',
      ar: 'شقق غرفة وغرفتي نوم واستوديوهات مختارة',
    },
    description: {
      en: 'Reserved off-market residential inventory structured for investors seeking both dependable annual returns and strong long-term personal ownership appeal.',
      ar: 'مخزون سكني حصري خارج السوق العام، مهيكل للمستثمرين الباحثين عن عائد سنوي مجزٍ وقيمة سكنية راقية على المدى الطويل.',
    },
    image: apartmentUnitImg,
    imageAlt: {
      en: 'Spacious contemporary residential interior overlooking Dubai skyline',
      ar: 'تصميم داخلي سكني حديث مطل على أفق دبي',
    },
  },
  {
    id: 'development-03',
    developerLogoUrl: null,
    developerName: {
      en: 'Exclusive Private Allocation · Portfolio 03',
      ar: 'تخصيص خاص حصري · المحفظة 03',
    },
    projectName: {
      en: 'Prime Mixed-Use & Boutique Retail',
      ar: 'مشروع متعدد الاستخدامات ووحدات تجارية مختارة',
    },
    projectLocation: {
      en: 'High-Footfall Dubai District · Advisory Access Only',
      ar: 'منطقة تجارية نشطة في دبي · عبر مكتبنا الاستشاري فقط',
    },
    propertyTypes: {
      en: 'Ground-Level Retail Units & Residential Mix',
      ar: 'وحدات تجارية بالطابق الأرضي ومزيج سكني',
    },
    description: {
      en: 'An exclusive blend of commercial retail and residential units vetted exclusively by Jamoka Properties—giving our investors true portfolio diversification.',
      ar: 'مزيج حصري يجمع بين وحدات التجزئة التجارية والوحدات السكنية المختارة بعناية عبر جاموكا العقارية لتنويع المحفظة بذكاء.',
    },
    image: retailUnitImg,
    imageAlt: {
      en: 'Upscale ground-floor retail promenade in a prime Dubai development',
      ar: 'واجهة تجارية راقية في مشروع رئيسي بدبي',
    },
  },
];

export const DIAL_CODES = [
  { code: '+971', label: 'UAE (+971)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+49', label: 'Germany (+49)' },
  { code: '+33', label: 'France (+33)' },
  { code: '+41', label: 'Switzerland (+41)' },
  { code: '+31', label: 'Netherlands (+31)' },
  { code: '+39', label: 'Italy (+39)' },
  { code: '+34', label: 'Spain (+34)' },
  { code: '+32', label: 'Belgium (+32)' },
  { code: '+43', label: 'Austria (+43)' },
  { code: '+46', label: 'Sweden (+46)' },
  { code: '+47', label: 'Norway (+47)' },
  { code: '+45', label: 'Denmark (+45)' },
  { code: '+353', label: 'Ireland (+353)' },
  { code: '+351', label: 'Portugal (+351)' },
  { code: '+48', label: 'Poland (+48)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+965', label: 'Kuwait (+965)' },
  { code: '+973', label: 'Bahrain (+973)' },
  { code: '+968', label: 'Oman (+968)' },
  { code: '+20', label: 'Egypt (+20)' },
  { code: '+962', label: 'Jordan (+962)' },
  { code: '+961', label: 'Lebanon (+961)' },
  { code: '+212', label: 'Morocco (+212)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+91', label: 'India (+91)' },
];

export interface PrivateInvestmentContent {
  nav: {
    opportunity: string;
    structure: string;
    team: string;
    allocation: string;
    developments: string;
    process: string;
    faq: string;
    cta: string;
    mainSite: string;
    moreLanguages: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    paragraph: string;
    tier1Amount: string;
    tier1Roi: string;
    tier1Note: string;
    tier2Amount: string;
    tier2Roi: string;
    tier2Note: string;
    supportingLine: string;
    primaryCta: string;
    secondaryCta: string;
    formCardEyebrow: string;
    formCardTitle: string;
    formCardSubtitle: string;
  };
  intro: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    cards: { title: string; desc: string }[];
  };
  structure: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    annualReturnLabel: string;
    threeYearTotalLabel: string;
    termLabel: string;
    termValue: string;
    exitOptionLabel: string;
    exitOptionValue: string;
    principalExitLabel: string;
    extendedHeading: string;
    extendedOptionLabel: string;
    extendedOptionValue: string;
    sixYearTotalLabel: string;
    tier1: {
      label: string;
      amount: string;
      roi: string;
      annualReturn: string;
      threeYearTotal: string;
      principalExit: string;
      sixYearTotal: string;
      cta: string;
    };
    tier2: {
      label: string;
      amount: string;
      roi: string;
      annualReturn: string;
      threeYearTotal: string;
      principalExit: string;
      sixYearTotal: string;
      cta: string;
    };
    disclaimer: string;
  };
  allocation: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    categories: {
      title: string;
      subtitle: string;
      desc: string;
      image: string;
      imageAlt: string;
    }[];
    flexibilityHeading: string;
    flexibilityPoints: string[];
    availabilityNote: string;
  };
  developments: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    exclusiveTitle: string;
    exclusiveReason: string;
    developerLabel: string;
    locationLabel: string;
    typesLabel: string;
    dossierCta: string;
    cmsNotice: string;
  };
  buyback: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    retainHeading: string;
    retainP1: string;
    retainP2: string;
    step1Tag: string;
    step1Title: string;
    step1Desc: string;
    step2Tag: string;
    step2Title: string;
    step2Desc: string;
    step3Tag: string;
    step3Heading: string;
    optionATag: string;
    optionATitle: string;
    optionADesc: string;
    optionBTag: string;
    optionBTitle: string;
    optionBDesc: string;
    optionCTag: string;
    optionCTitle: string;
    optionCDesc: string;
    governanceNote: string;
  };
  confidence: {
    eyebrow: string;
    heading: string;
    intro: string;
    pillars: { title: string; desc: string }[];
  };
  process: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
  };
  about: {
    eyebrow: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    trustMetrics: { value: string; label: string }[];
    teamCaption: string;
    teamSubcaption: string;
    websiteLabel: string;
    officeLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    licenseLabel: string;
    visitSiteCta: string;
  };
  form: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    popupEyebrow: string;
    popupHeading: string;
    popupSubtitle: string;
    popupReopenLabel: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    country: string;
    countryPlaceholder: string;
    preferredLanguage: string;
    languageOptions: { value: string; label: string }[];
    budget: string;
    budgetOptions: { value: string; label: string }[];
    preference: string;
    preferenceOptional: string;
    preferenceOptions: { value: string; label: string }[];
    consentPrefix: string;
    privacyLink: string;
    submitCta: string;
    submittingLabel: string;
    switchToFullForm: string;
    whatsappDirectLabel: string;
    whatsappPrefill: string;
    successTitle: string;
    successBody: string;
    submitAnother: string;
    errors: {
      fullName: string;
      email: string;
      phone: string;
      country: string;
      budget: string;
      consent: string;
      generic: string;
    };
  };
  faq: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  footer: {
    home: string;
    opportunity: string;
    structure: string;
    developments: string;
    about: string;
    contact: string;
    privacy: string;
    terms: string;
    disclaimerLink: string;
    disclaimerHeading: string;
    disclaimerText: string;
    rights: string;
  };
  legal: {
    close: string;
    privacyTitle: string;
    privacyBody: string[];
    termsTitle: string;
    termsBody: string[];
    disclaimerTitle: string;
    disclaimerBody: string[];
  };
  cookie: {
    message: string;
    accept: string;
    essentialOnly: string;
  };
}

export const PRIVATE_INVESTMENT_CONTENT: Record<'en' | 'ar', PrivateInvestmentContent> = {
  en: {
    nav: {
      opportunity: 'How It Works',
      structure: '3-Year Returns',
      team: 'Our Team',
      allocation: 'Properties',
      developments: 'Exclusive Portfolio',
      process: 'Process',
      faq: 'FAQ',
      cta: 'Invest With Us',
      mainSite: 'Main Website',
      moreLanguages: 'Other Languages',
    },
    hero: {
      eyebrow: 'JAMOKA PROPERTIES | PRIVATE INVESTMENT OPPORTUNITY',
      headline: 'A Smarter Way to Invest in Dubai Real Estate.',
      subheadline:
        'Exclusive Off-Market Access to Selected Tier-1 Developers. Structured Annual Returns. Flexible Property Allocation.',
      paragraph:
        'Partner with Dubai’s private real estate investment specialists. Allocate AED 5 million or AED 10 million across our privately selected Class-A developments—with structured 15%–16% annual returns and a clear exit strategy.',
      tier1Amount: 'AED 5,000,000',
      tier1Roi: '15% Annual ROI',
      tier1Note: 'AED 750,000 Paid Annually',
      tier2Amount: 'AED 10,000,000',
      tier2Roi: '16% Annual ROI',
      tier2Note: 'AED 1,600,000 Paid Annually',
      supportingLine:
        '3-Year Term  ·  Optional 3+3-Year Renewal  ·  Original Purchase Price Buyback Option',
      primaryCta: 'Start Your Private Investment Journey',
      secondaryCta: 'Compare 15% & 16% Returns',
      formCardEyebrow: 'INVEST WITH JAMOKA PROPERTIES',
      formCardTitle: 'Speak With Our Private Investment Desk',
      formCardSubtitle:
        'Tell us your preferred tier and our senior Dubai advisors will personally share the confidential portfolio and structure.',
    },
    intro: {
      eyebrow: 'THE INVESTMENT OPPORTUNITY',
      heading: 'An Exclusive Opportunity in Dubai Real Estate',
      p1: 'Jamoka Properties has carefully selected a limited portfolio of established, top-tier Dubai developers and premium real estate developments to present a tailored investment opportunity to qualified investors.',
      p2: 'Rather than restricting investors to a single property type or unit configuration, the investment structure offers flexibility across three selected Class-A projects in prime Dubai locations.',
      p3: 'Investors can customise their allocation according to their preferred asset class and unit mix.',
      cards: [
        {
          title: 'Selected Tier-1 Developers',
          desc: 'Carefully vetted, established Dubai developers and three shortlisted Class-A developments in prime locations.',
        },
        {
          title: 'Flexible Property Allocation',
          desc: 'Structure your AED 5M or AED 10M allocation across studios, 1–2 bedroom apartments, and selected retail units.',
        },
        {
          title: 'Structured Annual Returns',
          desc: 'Clearly defined annual return arrangements of 15% on AED 5M or 16% on AED 10M over a 3-year term, with an optional 3+3-year renewal.',
        },
        {
          title: 'Defined Exit & Buyback Option',
          desc: 'Contractual original purchase price buyback option at the end of the 3-year term, or the flexibility to retain your properties.',
        },
      ],
    },
    structure: {
      eyebrow: '3-YEAR INVESTMENT STRUCTURE',
      heading: 'Simple 3-Year Plans. Clear Annual Returns.',
      subtitle:
        'Start with an accessible 3-year commitment—choose AED 5 million (15% annual ROI) or AED 10 million (16% annual ROI) with an original purchase price buyback option. Optional 6-year (3+3) renewal is also available if you wish to extend.',
      annualReturnLabel: 'Annual Return (Every Year)',
      threeYearTotalLabel: '3-Year Total Return',
      termLabel: 'Investment Term',
      termValue: '3 Years',
      exitOptionLabel: 'Exit Option',
      exitOptionValue: 'Original Purchase Price Buyback',
      principalExitLabel: 'Principal Exit',
      extendedHeading: 'Optional 6-Year Renewal (3 + 3)',
      extendedOptionLabel: 'Optional Extension',
      extendedOptionValue: '3 + 3 Years',
      sixYearTotalLabel: '6-Year Total Return',
      tier1: {
        label: 'TIER I ALLOCATION',
        amount: 'AED 5,000,000',
        roi: '15% Guaranteed Annual ROI',
        annualReturn: 'AED 750,000',
        threeYearTotal: 'AED 2,250,000',
        principalExit:
          'AED 5,000,000 at the end of the 3-year term, subject to the agreed contractual terms.',
        sixYearTotal: 'AED 4,500,000',
        cta: 'Invest AED 5M at 15% Annual ROI',
      },
      tier2: {
        label: 'TIER II ALLOCATION',
        amount: 'AED 10,000,000',
        roi: '16% Guaranteed Annual ROI',
        annualReturn: 'AED 1,600,000',
        threeYearTotal: 'AED 4,800,000',
        principalExit:
          'AED 10,000,000 at the end of the 3-year term, subject to the agreed contractual terms.',
        sixYearTotal: 'AED 9,600,000',
        cta: 'Invest AED 10M at 16% Annual ROI',
      },
      disclaimer:
        'All financial terms, structured return commitments, renewal eligibility, and principal exit provisions are governed by and subject to the final signed investment agreement and supporting contractual documentation. AED is the contractual reference currency.',
    },
    allocation: {
      eyebrow: 'FLEXIBLE PROPERTY ALLOCATION',
      heading: 'Your Investment. Your Property Selection.',
      p1: 'Your investment does not need to be restricted to a single unit or property type.',
      p2: 'Jamoka Properties provides investors with flexibility to customise their allocation across three selected premium developments.',
      categories: [
        {
          title: 'Studios',
          subtitle: 'Category 01 · Residential',
          desc: 'Compact residential units within selected developments, well suited for diversified multi-unit allocations.',
          image: studioUnitImg,
          imageAlt: 'Minimalist luxury studio residence interior in Dubai',
        },
        {
          title: '1–2 Bedroom Apartments',
          subtitle: 'Category 02 · Residential',
          desc: 'Residential properties offering flexibility for structured investment or future personal use.',
          image: apartmentUnitImg,
          imageAlt: 'Spacious one and two bedroom luxury apartment living room in Dubai',
        },
        {
          title: 'Retail Units',
          subtitle: 'Category 03 · Commercial',
          desc: 'Selected commercial property opportunities within participating developments.',
          image: retailUnitImg,
          imageAlt: 'Upscale boutique retail promenade within a prime Dubai development',
        },
      ],
      flexibilityHeading: 'Tailored Portfolio Structuring',
      flexibilityPoints: [
        'Custom unit combinations aligned with your target allocation',
        'Flexible unit count across residential and commercial categories',
        'Choice across three selected Class-A projects in prime Dubai locations',
        'Tailored property allocation based on individual investment objectives',
      ],
      availabilityNote:
        'Unit types and inventory availability vary by participating development and are confirmed during your private consultation prior to agreement execution.',
    },
    developments: {
      eyebrow: 'SELECTED DEVELOPERS & PRIME DEVELOPMENTS',
      heading: 'An Exclusive Portfolio Known Only to Our Investment Desk',
      p1: 'We do not publish participating developer names or project titles publicly—and that discretion is intentional. Access to these privately negotiated 15%–16% structured allocations is strictly off-market and reserved for investors working directly with Jamoka Properties.',
      p2: 'As dedicated Dubai investment specialists, we vet every Tier-1 developer for financial strength, build quality, prime location, and contractual reliability—then present the full confidential portfolio to you one-on-one.',
      exclusiveTitle: 'Why Keep Our Partner Portfolio Private?',
      exclusiveReason:
        'Our institutional relationships with select Tier-1 Dubai developers are what allow us to structure preferential return and buyback terms unavailable on the open market. Connect with our experts to unlock the full confidential project dossier.',
      developerLabel: 'Access Level',
      locationLabel: 'Location',
      typesLabel: 'Unit Mix',
      dossierCta: 'Know More',
      cmsNotice:
        'Full developer profiles, prime project locations, floor plans, and live allocation schedules are shared exclusively in private briefings with qualified investors.',
    },
    buyback: {
      eyebrow: 'SIMPLE 3-STEP INVESTMENT & EXIT PATHWAY',
      heading: 'How Your Capital Works—And How You Exit.',
      p1: 'We designed this investment structure to be transparent and straightforward from day one.',
      p2: 'You invest your chosen capital, collect structured annual returns every year for three years, and then choose the exit path that fits your goals best.',
      p3: 'No guesswork—every step, payout, and exit option is agreed in writing before you invest.',
      retainHeading: 'Prefer to Keep Your Dubai Property?',
      retainP1:
        'Instead of selling back at Year 3, you are welcome to keep your units for personal residence or long-term ownership, subject to ownership, handover, occupancy, and contractual conditions.',
      retainP2:
        'You stay in control—cash out your original purchase price, keep the property, or extend for another 3 years.',
      step1Tag: 'STEP 1 · START',
      step1Title: 'Invest AED 5M or AED 10M',
      step1Desc:
        'Select your preferred mix of Dubai studios, 1–2 BR apartments, or retail units with our advisory team.',
      step2Tag: 'STEP 2 · YEARS 1 TO 3',
      step2Title: 'Earn 15% or 16% Every Year',
      step2Desc:
        'Collect AED 750,000/yr (on AED 5M) or AED 1,600,000/yr (on AED 10M), backed by day-one post-dated cheques under the proposed agreement.',
      step3Tag: 'STEP 3 · END OF YEAR 3',
      step3Heading: 'Choose What Happens Next',
      optionATag: 'CHOICE A · CASH OUT',
      optionATitle: '100% Original Purchase Price Buyback',
      optionADesc:
        'Exit cleanly and receive your original purchase price back (AED 5M or AED 10M basis) under the agreed buyback terms.',
      optionBTag: 'CHOICE B · KEEP PROPERTY',
      optionBTitle: 'Keep Your Dubai Units',
      optionBDesc:
        'Retain full property ownership for personal use or long-term wealth, subject to handover and contractual terms.',
      optionCTag: 'CHOICE C · EXTEND 3 + 3 YEARS',
      optionCTitle: 'Renew for 3 More Years',
      optionCDesc:
        'Extend for 6 years total—reaching AED 4.5M (on AED 5M) or AED 9.6M (on AED 10M) in cumulative returns.',
      governanceNote:
        'Please note: Exit choices are selected individually according to your signed investment agreement. All return schedules, renewal eligibility, buyback mechanics, and retention rights are governed exclusively by the final executed contract.',
    },
    confidence: {
      eyebrow: 'GOVERNANCE & REGULATORY CONTEXT',
      heading: 'Invest with Greater Clarity and Confidence.',
      intro:
        'This investment opportunity is structured around selected Dubai real estate developments and participating entities operating within the applicable UAE regulatory framework. Relevant real estate activities and developments are subject to applicable UAE government regulations and oversight.',
      pillars: [
        {
          title: 'UAE Regulatory Framework',
          desc: 'Participating real estate developments and relevant entities operate within applicable UAE regulatory requirements and real estate oversight.',
        },
        {
          title: 'Established Developers',
          desc: 'A carefully shortlisted group of established Tier-1 developers and Class-A residential and commercial developments.',
        },
        {
          title: 'Contractual Structure',
          desc: 'Investment terms, structured return arrangements, and buyback or retention provisions are formally documented through the relevant agreements.',
        },
        {
          title: 'Day-One Documentation',
          desc: 'The proposed structure includes post-dated cheques issued from the beginning of the investment arrangement, as outlined in the investment proposal.',
        },
        {
          title: 'Transparent Allocation',
          desc: 'Investors receive clear visibility to understand and customise their property allocation, unit mix, and preferred investment tenure.',
        },
      ],
    },
    process: {
      eyebrow: 'HOW IT WORKS',
      heading: 'Five Simple Steps to Invest With Us.',
      subtitle:
        'From your first conversation to signing and receiving day-one documentation, our Dubai investment team stands beside you at every stage.',
      steps: [
        {
          number: '01',
          title: 'Connect With Us',
          desc: 'Share your contact details and preferred investment tier (AED 5M or AED 10M).',
        },
        {
          number: '02',
          title: 'Private Briefing',
          desc: 'Meet our senior investment advisor in Dubai or on video to review our confidential Tier-1 portfolio.',
        },
        {
          number: '03',
          title: 'Tailor Your Units',
          desc: 'Choose your preferred development, property mix, and 3-year or 3+3-year investment horizon.',
        },
        {
          number: '04',
          title: 'Review Agreements',
          desc: 'Inspect the formal investment contract, annual payout schedule, and buyback terms with complete clarity.',
        },
        {
          number: '05',
          title: 'Execute & Earn',
          desc: 'Complete your allocation and receive all signed documentation and post-dated cheques as agreed.',
        },
      ],
    },
    about: {
      eyebrow: 'ABOUT JAMOKA PROPERTIES',
      heading: 'A Trusted Real Estate Investment Partner in Dubai.',
      p1: 'Jamoka Properties LLC is a RERA-licensed Dubai real estate brokerage headquartered in Business Bay, trusted by international investors across Europe and the GCC for transparent property advisory and privately structured allocations.',
      p2: 'Backed by over 70 multilingual property consultants speaking 15+ languages, our team negotiates directly with Dubai’s leading Tier-1 developers so our clients gain access to high-conviction opportunities unavailable on public portals.',
      p3: 'When you invest with Jamoka Properties, you gain a dedicated Dubai partner committed to clarity, discretion, and long-term relationships.',
      trustMetrics: [
        { value: '70+', label: 'Dubai Property Consultants' },
        { value: '15+', label: 'Languages Spoken Globally' },
        { value: 'ORN 49679', label: 'RERA Licensed Brokerage' },
      ],
      teamCaption: 'Jamoka Properties Advisory Team',
      teamSubcaption: 'Bayswater Tower, 8th & 11th Floor · Business Bay, Dubai',
      websiteLabel: 'Official Website',
      officeLabel: 'Dubai Headquarters',
      phoneLabel: 'Direct Advisory Line',
      hoursLabel: 'Advisory Hours',
      licenseLabel: 'Brokerage Registration',
      visitSiteCta: 'Visit jamokaproperties.com',
    },
    form: {
      eyebrow: 'INVEST WITH JAMOKA PROPERTIES',
      heading: 'Let’s Build Your Dubai Real Estate Portfolio Together.',
      subtitle:
        'Ready to explore our private AED 5M (15% ROI) or AED 10M (16% ROI) allocations? Share your details below and a senior Jamoka investment specialist will personally walk you through our confidential developer portfolio, unit options, and contractual terms.',
      popupEyebrow: 'INVEST WITH US · PRIVATE DESK',
      popupHeading: 'Unlock Our Private Investment Dossier',
      popupSubtitle: 'Connect with a Jamoka specialist for AED 5M (15%) & AED 10M (16%) opportunities.',
      popupReopenLabel: 'Invest With Us · Private Briefing',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Alexander Weber',
      email: 'Email Address',
      emailPlaceholder: 'name@company.com',
      phone: 'Phone Number',
      phonePlaceholder: '50 123 4567',
      country: 'Country of Residence',
      countryPlaceholder: 'e.g. United Kingdom, Germany, UAE',
      preferredLanguage: 'Preferred Language',
      languageOptions: [
        { value: 'English', label: 'English' },
        { value: 'Arabic', label: 'العربية (Arabic)' },
        { value: 'Other', label: 'Other European Language' },
      ],
      budget: 'Investment Budget',
      budgetOptions: [
        { value: 'AED 5 Million', label: 'AED 5 Million (15% Annual ROI)' },
        { value: 'AED 10 Million', label: 'AED 10 Million (16% Annual ROI)' },
        { value: 'Other / Discuss with an Advisor', label: 'Other / Discuss with an Advisor' },
      ],
      preference: 'Investment Preference',
      preferenceOptional: 'Optional',
      preferenceOptions: [
        { value: '3-Year Exit Option', label: '3-Year Exit Option (Buyback)' },
        { value: '3+3-Year Extended Option', label: '3+3-Year Extended Option' },
        { value: 'Property Ownership / Retention', label: 'Property Ownership / Retention' },
        { value: 'Would Like to Discuss', label: 'Would Like to Discuss' },
      ],
      consentPrefix:
        'I agree to be contacted by Jamoka Properties regarding this investment opportunity and acknowledge the ',
      privacyLink: 'Privacy Policy',
      submitCta: 'Speak With a Jamoka Investment Advisor',
      submittingLabel: 'Connecting You With Our Desk...',
      switchToFullForm: 'Need more options? Open full allocation form',
      whatsappDirectLabel: 'Chat With Our Investment Desk',
      whatsappPrefill:
        'Hello Jamoka Properties, I would like to speak with an investment advisor regarding the Dubai Private Real Estate Investment Opportunity (AED 5M / AED 10M).',
      successTitle: 'Thank you for your interest.',
      successBody:
        'Your enquiry has been received. A member of our investment team will contact you shortly to discuss the opportunity.',
      submitAnother: 'Submit another enquiry',
      errors: {
        fullName: 'Please enter your full name.',
        email: 'Please enter a valid email address.',
        phone: 'Please enter a valid phone number.',
        country: 'Please enter your country of residence.',
        budget: 'Please select an investment budget.',
        consent: 'Please confirm your consent so our team may contact you.',
        generic: 'Unable to submit right now. Please try again or reach us directly on WhatsApp.',
      },
    },
    faq: {
      eyebrow: 'FREQUENTLY ASKED QUESTIONS',
      heading: 'Key Investment Questions Answered',
      subtitle:
        'Clear, concise answers based on the proposed private investment structure.',
      items: [
        {
          q: 'What is the minimum investment allocation?',
          a: 'The structured private investment opportunity starts at an allocation of AED 5,000,000, with a higher-tier allocation available at AED 10,000,000. Investors wishing to explore tailored structures may also select "Other / Discuss with an Advisor" in the enquiry form.',
        },
        {
          q: 'What annual returns are offered?',
          a: 'Under the proposed investment structure, the AED 5,000,000 allocation offers a 15% guaranteed annual ROI (AED 750,000 per year; AED 2,250,000 over 3 years), while the AED 10,000,000 allocation offers a 16% guaranteed annual ROI (AED 1,600,000 per year; AED 4,800,000 over 3 years), subject to the signed investment agreement.',
        },
        {
          q: 'How does the original purchase price buyback option work?',
          a: 'At the conclusion of the agreed three-year investment term, investors have the option to exit via the contractual buyback mechanism, using the original property purchase price (AED 5,000,000 or AED 10,000,000) as the basis of the principal exit, subject to the notice periods, eligibility criteria, and terms set out in the signed agreement.',
        },
        {
          q: 'Can I choose the properties and unit types?',
          a: 'Yes. Investors are not restricted to a single unit or asset class. You may customise your allocation across studios, 1–2 bedroom apartments, and selected retail units across three shortlisted Class-A developments, subject to available inventory at the time of allocation.',
        },
        {
          q: 'Which developers and projects are included?',
          a: 'Jamoka Properties has shortlisted established Tier-1 Dubai developers and three Class-A projects in prime locations based on developer track record, build quality, and commercial alignment. Specific developer names, project dossiers, and available unit inventories are presented confidentially during your private consultation.',
        },
        {
          q: 'Can I retain the purchased property instead of exercising the buyback option?',
          a: 'Yes. Rather than exercising the buyback exit at the end of the term, investors may elect to retain their purchased units for personal use or continued ownership, subject to ownership, handover, occupancy, and contractual conditions.',
        },
        {
          q: 'What is the difference between the 3-year and 3+3-year options?',
          a: 'The core structure runs for an initial 3-year investment term (delivering AED 2,250,000 cumulative return on AED 5M, or AED 4,800,000 on AED 10M) with the buyback or retention decision at Year 3. Investors seeking a longer income horizon may opt into the optional 3+3-year extended tenure (totalling 6 years, with cumulative returns of AED 4,500,000 on AED 5M or AED 9,600,000 on AED 10M), subject to agreed contractual terms.',
        },
        {
          q: 'How are the investment terms documented?',
          a: 'All commercial terms, structured return schedules, property allocations, and buyback or retention provisions are documented in the formal investment agreement and supporting property contracts. As outlined in the investment proposal, the proposed structure includes post-dated cheques issued from the outset of the investment arrangement.',
        },
        {
          q: 'Is the investment structure regulated in the UAE?',
          a: 'Participating Dubai real estate developments and relevant brokerage and development entities operate within the applicable UAE regulatory framework and property oversight. Prospective investors should note that government authorities do not guarantee private commercial returns, and all agreements should be reviewed independently with legal or financial counsel.',
        },
        {
          q: 'How can I arrange a private consultation?',
          a: 'Complete the Private Consultation Request form on this page or connect directly with our advisory desk via WhatsApp. A senior member of the Jamoka Properties investment team will reach out in English or Arabic to schedule a private in-person meeting in Dubai or a confidential video briefing.',
        },
      ],
    },
    footer: {
      home: 'Home',
      opportunity: 'Investment Opportunity',
      structure: 'Investment Structure',
      developments: 'Selected Developments',
      about: 'About Us',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms and Conditions',
      disclaimerLink: 'Investment Disclaimer',
      disclaimerHeading: 'Important Investment Disclaimer',
      disclaimerText:
        'The information presented on this website is for informational and promotional purposes only and does not constitute financial, legal, or investment advice. Investment returns, buyback arrangements, and principal exit provisions are subject to the relevant signed agreements, eligibility requirements, and applicable conditions. Prospective investors should independently review all supporting documentation and obtain appropriate professional advice before proceeding.',
      rights: 'All rights reserved.',
    },
    legal: {
      close: 'Close',
      privacyTitle: 'Privacy Policy',
      privacyBody: [
        'Jamoka Properties LLC respects your privacy and handles all investor enquiry data strictly for the purpose of responding to your consultation request and sharing relevant private real estate investment documentation.',
        'Information submitted through this page—including your contact details, country of residence, preferred language, allocation preference, and campaign attribution parameters—is accessed only by authorized Jamoka Properties advisory personnel and approved CRM infrastructure.',
        'We never sell or trade personal data to unrelated third parties. You may request access to, correction of, or deletion of your personal details at any time by contacting our Dubai office.',
      ],
      termsTitle: 'Terms and Conditions',
      termsBody: [
        'This landing page presents an overview of a structured private real estate investment opportunity arranged through Jamoka Properties LLC in Dubai, UAE.',
        'Figures presented on this page illustrate the proposed AED 5,000,000 (15% annual ROI) and AED 10,000,000 (16% annual ROI) frameworks. All property allocations, unit availability, post-dated cheque schedules, 3-year or 3+3-year terms, buyback mechanisms, and retention rights are strictly subject to execution of binding written agreements between the relevant parties.',
        'UAE Dirham (AED) serves as the sole contractual reference currency. Jamoka Properties LLC reserves the right to modify or withdraw available allocations without prior notice prior to contract signing.',
      ],
      disclaimerTitle: 'Investment Disclaimer',
      disclaimerBody: [
        'The information presented on this website is for informational and promotional purposes only and does not constitute financial, legal, or investment advice.',
        'Investment returns, buyback arrangements, and principal exit provisions are subject to the relevant signed agreements, eligibility requirements, and applicable conditions.',
        'Real estate investments involve commercial and contractual considerations. Participating developments operate within the applicable UAE regulatory framework; however, neither the UAE Government nor any regulatory authority guarantees commercial returns or principal repayment. Prospective investors should independently review all supporting documentation and obtain appropriate legal, tax, and financial advice before proceeding.',
      ],
    },
    cookie: {
      message:
        'We use essential cookies and optional analytics to improve your experience and measure campaign performance.',
      accept: 'Accept All',
      essentialOnly: 'Essential Only',
    },
  },

  ar: {
    nav: {
      opportunity: 'كيف يعمل',
      structure: 'عوائد 3 سنوات',
      team: 'فريقنا',
      allocation: 'تخصيص العقارات',
      developments: 'المحفظة الحصرية',
      process: 'الخطوات',
      faq: 'الأسئلة الشائعة',
      cta: 'ابدأ الاستثمار معنا',
      mainSite: 'الموقع الرئيسي',
      moreLanguages: 'لغات أخرى',
    },
    hero: {
      eyebrow: 'جاموكا العقارية | فرصة استثمار عقاري خاص',
      headline: 'طريقة أكثر ذكاءً للاستثمار في عقارات دبي.',
      subheadline:
        'وصول حصري خارج السوق إلى نخبة مطوّري الفئة الأولى. عوائد سنوية مهيكلة. مرونة كاملة في اختيار العقارات.',
      paragraph:
        'استثمر مع خبراء العقار الخاص في دبي. خصّص 5 مليون أو 10 مليون درهم إماراتي ضمن محفظتنا المختارة بعناية من الفئة الأولى بعوائد سنوية مهيكلة (15%–16%) واستراتيجية تخارج واضحة.',
      tier1Amount: '5,000,000 درهم',
      tier1Roi: 'عائد سنوي 15%',
      tier1Note: '750,000 درهم تُصرف سنوياً',
      tier2Amount: '10,000,000 درهم',
      tier2Roi: 'عائد سنوي 16%',
      tier2Note: '1,600,000 درهم تُصرف سنوياً',
      supportingLine:
        'مدة 3 سنوات  ·  خيار التمديد 3+3 سنوات  ·  خيار إعادة الشراء بسعر الشراء الأصلي',
      primaryCta: 'ابدأ رحلتك الاستثمارية الخاصة',
      secondaryCta: 'قارن عوائد 15% و16%',
      formCardEyebrow: 'استثمر مع جاموكا العقارية',
      formCardTitle: 'تحدث مع مكتب الاستثمار الخاص',
      formCardSubtitle:
        'اختر الشريحة المناسبة وسيتواصل معك أحد كبار مستشارينا لمشاركة المحفظة السرية وكافة التفاصيل.',
    },
    intro: {
      eyebrow: 'الفرصة الاستثمارية',
      heading: 'فرصة حصرية في سوق دبي العقاري',
      p1: 'اختارت جاموكا العقارية بعناية محفظة محدودة من كبار المطوّرين العقاريين الراسخين والمشاريع العقارية الراقية في دبي لتقديم فرصة استثمارية مصممة خصيصاً للمستثمرين المؤهلين.',
      p2: 'وبدلاً من تقييد المستثمر بنوع عقار واحد أو فئة وحدات محددة، يوفر هذا الهيكل الاستثماري مرونة عالية عبر ثلاثة مشاريع مختارة من الفئة الأولى (Class-A) في مواقع رئيسية بدبي.',
      p3: 'يمكن للمستثمرين تخصيص استثماراتهم وفقاً لفئة الأصول المفضلة ومزيج الوحدات الذي يناسب أهدافهم.',
      cards: [
        {
          title: 'مطوّرون مختارون من الفئة الأولى',
          desc: 'مجموعة منتقاة من المطوّرين الموثوقين وثلاثة مشاريع عقارية متميزة من الفئة (A) في أبرز مناطق دبي.',
        },
        {
          title: 'مرونة في تخصيص العقارات',
          desc: 'وزّع استثمارك بقيمة 5 مليون أو 10 مليون درهم بين الاستوديوهات وشقق غرفة وغرفتي النوم والوحدات التجارية المختارة.',
        },
        {
          title: 'عوائد سنوية مهيكلة',
          desc: 'ترتيبات عائد سنوي واضحة بنسبة 15% لاستثمار 5 مليون درهم أو 16% لاستثمار 10 مليون درهم لمدة 3 سنوات، مع خيار التمديد لـ 3+3 سنوات.',
        },
        {
          title: 'خيار تخارج وإعادة شراء محدد',
          desc: 'خيار تعاقدي لإعادة الشراء بسعر الشراء الأصلي عند نهاية مدة الثلاث سنوات، أو حرية الاحتفاظ بوحداتك العقارية.',
        },
      ],
    },
    structure: {
      eyebrow: 'هيكل الاستثمار لمدة 3 سنوات',
      heading: 'خطط بسيطة لمدة 3 سنوات. عوائد سنوية واضحة.',
      subtitle:
        'ابدأ بالتزام ميسّر لمدة 3 سنوات — اختر 5 مليون درهم (عائد 15% سنوياً) أو 10 مليون درهم (عائد 16% سنوياً) مع خيار إعادة الشراء بسعر الشراء الأصلي، ويتوفر أيضاً خيار التمديد لـ 6 سنوات (3+3) لمن يرغب.',
      annualReturnLabel: 'العائد السنوي (كل عام)',
      threeYearTotalLabel: 'إجمالي العائد خلال 3 سنوات',
      termLabel: 'مدة الاستثمار',
      termValue: '3 سنوات',
      exitOptionLabel: 'خيار التخارج',
      exitOptionValue: 'إعادة الشراء بسعر الشراء الأصلي',
      principalExitLabel: 'استرداد رأس المال عند التخارج',
      extendedHeading: 'تمديد اختياري لـ 6 سنوات (3 + 3)',
      extendedOptionLabel: 'خيار التمديد',
      extendedOptionValue: '3 + 3 سنوات',
      sixYearTotalLabel: 'إجمالي العائد خلال 6 سنوات',
      tier1: {
        label: 'الشريحة الأولى',
        amount: '5,000,000 درهم',
        roi: 'عائد سنوي مضمون 15%',
        annualReturn: '750,000 درهم',
        threeYearTotal: '2,250,000 درهم',
        principalExit:
          '5,000,000 درهم في نهاية مدة الثلاث سنوات، وفقاً للشروط التعاقدية المتفق عليها.',
        sixYearTotal: '4,500,000 درهم',
        cta: 'استثمر 5 مليون درهم بعائد 15% سنوياً',
      },
      tier2: {
        label: 'الشريحة الثانية',
        amount: '10,000,000 درهم',
        roi: 'عائد سنوي مضمون 16%',
        annualReturn: '1,600,000 درهم',
        threeYearTotal: '4,800,000 درهم',
        principalExit:
          '10,000,000 درهم في نهاية مدة الثلاث سنوات، وفقاً للشروط التعاقدية المتفق عليها.',
        sixYearTotal: '9,600,000 درهم',
        cta: 'استثمر 10 مليون درهم بعائد 16% سنوياً',
      },
      disclaimer:
        'تخضع جميع الشروط المالية والتزامات العوائد وأهلية التمديد وأحكام التخارج واسترداد رأس المال للاتفاقية الاستثمارية النهائية الموقّعة والمستندات التعاقدية المساندة. يُعتمد الدرهم الإماراتي (AED) كعملة مرجعية تعاقدية.',
    },
    allocation: {
      eyebrow: 'تخصيص عقاري مرن',
      heading: 'استثمارك. واختيارك العقاري.',
      p1: 'لا يلزم أن يقتصر استثمارك على وحدة واحدة أو نوع عقاري واحد.',
      p2: 'تتيح جاموكا العقارية للمستثمرين مرونة تخصيص محافظهم عبر ثلاثة مشاريع عقارية راقية مختارة بعناية.',
      categories: [
        {
          title: 'الاستوديوهات',
          subtitle: 'الفئة 01 · سكني',
          desc: 'وحدات سكنية عصرية مدمجة ضمن المشاريع المختارة، مثالية لتنويع التخصيص عبر عدة وحدات.',
          image: studioUnitImg,
          imageAlt: 'تصميم داخلي لاستوديو فاخر حديث في دبي',
        },
        {
          title: 'شقق غرفة وغرفتي نوم',
          subtitle: 'الفئة 02 · سكني',
          desc: 'وحدات سكنية راقية توفر مرونة عالية للاستثمار المهيكل أو للاستخدام الشخصي مستقبلاً.',
          image: apartmentUnitImg,
          imageAlt: 'غرفة معيشة فسيحة لشقة فاخرة بإطلالة على أفق دبي',
        },
        {
          title: 'الوحدات التجارية (التجزئة)',
          subtitle: 'الفئة 03 · تجاري',
          desc: 'فرص عقارية تجارية مختارة ضمن المشاريع المشاركة في البرنامج الاستثماري.',
          image: retailUnitImg,
          imageAlt: 'واجهة محلات تجارية فاخرة في مشروع عقاري رئيسي بدبي',
        },
      ],
      flexibilityHeading: 'هيكلة محفظة مصممة وفق أهدافك',
      flexibilityPoints: [
        'توليفات وحدات مخصصة تتوافق مع قيمة الاستثمار المستهدفة',
        'مرونة في عدد الوحدات بين الفئات السكنية والتجارية',
        'حرية الاختيار عبر ثلاثة مشاريع مختارة من الفئة الأولى (Class-A) في دبي',
        'تخصيص عقاري مدروس يراعي أهداف المستثمر وتفضيلاته',
      ],
      availabilityNote:
        'تختلف أنواع الوحدات وتوفرها حسب كل مشروع مشارك، ويتم تأكيد المخزون المتاح بدقة خلال الاستشارة الخاصة قبل توقيع الاتفاقية.',
    },
    developments: {
      eyebrow: 'المطوّرون المختارون والمشاريع الحصرية',
      heading: 'محفظة حصرية لا يطّلع عليها إلا عملاء مكتبنا الاستشاري',
      p1: 'نحن لا ننشر أسماء المطوّرين أو المشاريع علناً — وهذا سرّ تميّزنا كخبراء استثمار عقاري في دبي. هذه التخصيصات الخاصة بعوائد 15%–16% متفاوض عليها حصرياً خارج السوق العام ومخصصة فقط لعملاء جاموكا العقارية.',
      p2: 'نقوم بدراسة وتقييم كل مطوّر من الفئة الأولى بدقة من حيث القوة المالية وجودة البناء والموقع الاستراتيجي والموثوقية التعاقدية، ثم نشارك معك الملف السري الكامل خلال الجلسة الاستشارية الخاصة.',
      exclusiveTitle: 'لماذا نحتفظ بأسماء المشاريع والمطوّرين بسرّية تامة؟',
      exclusiveReason:
        'علاقاتنا المباشرة مع نخبة مطوّري الفئة الأولى في دبي هي ما يمنح مستثمرينا شروط عائد وإعادة شراء غير متاحة في السوق المفتوح. تواصل مع خبرائنا لفتح الملف السري الكامل.',
      developerLabel: 'مستوى الوصول',
      locationLabel: 'الموقع',
      typesLabel: 'مزيج الوحدات',
      dossierCta: 'اعرف المزيد',
      cmsNotice:
        'تُعرض ملفات المطوّرين الكاملة والمواقع الدقيقة والمخططات وجداول التخصيص حصرياً خلال الجلسات الخاصة للمستثمرين المؤهلين.',
    },
    buyback: {
      eyebrow: 'مسار استثماري وتخارج مبسّط في 3 خطوات',
      heading: 'كيف ينمو استثمارك — وكيف تتخارج بسهولة.',
      p1: 'صممنا هذا الهيكل الاستثماري ليكون واضحاً وبسيطاً منذ اليوم الأول.',
      p2: 'تستثمر المبلغ الذي تختاره، وتجني عوائدك السنوية المهيكلة لمدة 3 سنوات، ثم تقرّر بنفسك المسار الأنسب لك عند نهاية السنة الثالثة.',
      p3: 'كل خطوة وعائد وخيار تخارج موثّق تعاقدياً بوضوح تام قبل البدء.',
      retainHeading: 'هل تفضّل الاحتفاظ بعقارك في دبي؟',
      retainP1:
        'بدلاً من إعادة البيع عند السنة الثالثة، يمكنك الاحتفاظ بوحداتك العقارية للاستخدام الشخصي أو التملك طويل الأمد، وفق شروط الملكية والتسليم والإشغال التعاقدية.',
      retainP2:
        'القرار بيدك بالكامل — استرداد كامل سعر الشراء الأصلي، أو الاحتفاظ بالعقار، أو التمديد لـ 3 سنوات إضافية.',
      step1Tag: 'الخطوة 1 · البداية',
      step1Title: 'استثمر 5 مليون أو 10 مليون درهم',
      step1Desc:
        'اختر مزيجك المفضل من الاستوديوهات أو شقق غرفة وغرفتي النوم أو الوحدات التجارية في دبي برفقة فريقنا.',
      step2Tag: 'الخطوة 2 · السنوات 1 إلى 3',
      step2Title: 'احصل على 15% أو 16% كل عام',
      step2Desc:
        'استلم 750,000 درهم سنوياً (على 5 مليون) أو 1,600,000 درهم سنوياً (على 10 مليون)، مع شيكات مؤجلة منذ اليوم الأول وفق المقترح.',
      step3Tag: 'الخطوة 3 · نهاية السنة الثالثة',
      step3Heading: 'اختر خطوتك التالية بحرية',
      optionATag: 'الخيار أ · استرداد رأس المال',
      optionATitle: 'إعادة الشراء بـ 100% من السعر الأصلي',
      optionADesc:
        'تخارج بوضوح واسترد كامل سعر الشراء الأصلي (5 مليون أو 10 مليون درهم) وفق شروط اتفاقية إعادة الشراء.',
      optionBTag: 'الخيار ب · الاحتفاظ بالعقار',
      optionBTitle: 'احتفظ بملكية وحداتك في دبي',
      optionBDesc:
        'تملّك عقارك بالكامل للسكن الشخصي أو الاستثمار طويل الأمد وفق شروط التسليم والتملك التعاقدية.',
      optionCTag: 'الخيار ج · التمديد 3 + 3 سنوات',
      optionCTitle: 'جدّد لمدة 3 سنوات إضافية',
      optionCDesc:
        'واصل العوائد لمدة 6 سنوات إجمالاً لتصل إلى 4.5 مليون درهم (على 5 مليون) أو 9.6 مليون درهم (على 10 مليون).',
      governanceNote:
        'ملاحظة مهمة: يتم اختيار مسار التخارج وفقاً للاتفاقية الاستثمارية الموقّعة. تخضع كافة جداول العوائد وأهلية التمديد وآليات إعادة الشراء وحقوق الاحتفاظ بالعقار للعقد النهائي الموقّع حصراً.',
    },
    confidence: {
      eyebrow: 'الثقة الاستثمارية والإطار التنظيمي في الإمارات',
      heading: 'استثمر بوضوح وثقة أكبر.',
      intro:
        'تُبنى هذه الفرصة الاستثمارية على مشاريع عقارية مختارة في دبي وجهات مشاركة تعمل ضمن الإطار التنظيمي المعمول به في دولة الإمارات العربية المتحدة، حيث تخضع الأنشطة والمشاريع العقارية ذات الصلة للأنظمة والرقابة الحكومية السارية في الدولة.',
      pillars: [
        {
          title: 'الإطار التنظيمي في دولة الإمارات',
          desc: 'تعمل المشاريع العقارية المشاركة والجهات المعنية ضمن المتطلبات التنظيمية والرقابية المعمول بها في دولة الإمارات.',
        },
        {
          title: 'مطوّرون راسخون ومعتمدون',
          desc: 'مجموعة منتقاة بعناية من المطوّرين الموثوقين والمشاريع العقارية الراقية من الفئة الأولى.',
        },
        {
          title: 'هيكلة تعاقدية واضحة',
          desc: 'تُوثَّق شروط الاستثمار وترتيبات العوائد وأحكام إعادة الشراء أو الاحتفاظ بالعقار رسمياً عبر الاتفاقيات المعتمدة.',
        },
        {
          title: 'توثيق منذ اليوم الأول',
          desc: 'يتضمن الهيكل المقترح إصدار شيكات مؤجلة الدفع منذ بداية الترتيب الاستثماري، وفق ما هو موضّح في المقترح الاستثماري.',
        },
        {
          title: 'شفافية كاملة في التخصيص',
          desc: 'رؤية واضحة تمكّن المستثمر من فهم تفاصيل التخصيص وتحديد مزيج الوحدات ومدة الاستثمار المفضلة بكل شفافية.',
        },
      ],
    },
    process: {
      eyebrow: 'آلية العمل',
      heading: 'خمس خطوات بسيطة للاستثمار معنا.',
      subtitle:
        'من أول تواصل وحتى التوقيع واستلام الوثائق منذ اليوم الأول، يقف فريقنا الاستثماري في دبي إلى جانبك في كل خطوة.',
      steps: [
        {
          number: '01',
          title: 'تواصل معنا',
          desc: 'شارك بياناتك واختر الشريحة الاستثمارية المناسبة (5 مليون أو 10 مليون درهم).',
        },
        {
          number: '02',
          title: 'جلسة تعريفية خاصة',
          desc: 'اجتمع بكبار مستشارينا في دبي أو عبر الفيديو لاستعراض محفظتنا السرية من الفئة الأولى.',
        },
        {
          number: '03',
          title: 'صمّم تخصيصك',
          desc: 'اختر المشروع المفضل ومزيج الوحدات والأفق الزمني الأنسب (3 سنوات أو 3+3 سنوات).',
        },
        {
          number: '04',
          title: 'مراجعة العقود',
          desc: 'اطّلع على اتفاقية الاستثمار وجدول العوائد السنوية وشروط إعادة الشراء بكل شفافية.',
        },
        {
          number: '05',
          title: 'التنفيذ وجني العوائد',
          desc: 'أتمّ التخصيص واستلم كافة المستندات الموقّعة والشيكات المؤجلة حسب الاتفاق.',
        },
      ],
    },
    about: {
      eyebrow: 'عن جاموكا العقارية',
      heading: 'شريكك العقاري الموثوق في دبي.',
      p1: 'جاموكا العقارية ذ.م.م هي شركة وساطة عقارية مرخصة من ريرا ومقرها الخليج التجاري بدبي، تحظى بثقة المستثمرين الدوليين من أوروبا ودول الخليج بفضل استشاراتها الشفافة وتخصيصاتها الخاصة المهيكلة.',
      p2: 'بدعم أكثر من 70 مستشاراً عقارياً يتحدثون أكثر من 15 لغة، يتفاوض فريقنا مباشرة مع أبرز مطوّري الفئة الأولى في دبي ليمنح عملاءنا وصولاً إلى فرص حصرية لا تُعرض في السوق المفتوح.',
      p3: 'عندما تستثمر مع جاموكا العقارية، فأنت تكتسب شريكاً موثوقاً في دبي يضع الوضوح والسرّية ومصلحتك طويلة الأمد في المقدمة.',
      trustMetrics: [
        { value: '+70', label: 'مستشاراً عقارياً في دبي' },
        { value: '+15', label: 'لغة لتواصل عالمي سلس' },
        { value: 'ORN 49679', label: 'وساطة مرخصة من ريرا' },
      ],
      teamCaption: 'فريق جاموكا العقارية الاستشاري',
      teamSubcaption: 'برج بايزووتر، الطابقان الثامن والحادي عشر · الخليج التجاري، دبي',
      websiteLabel: 'الموقع الرسمي',
      officeLabel: 'المقر الرئيسي في دبي',
      phoneLabel: 'الخط الاستشاري المباشر',
      hoursLabel: 'ساعات العمل',
      licenseLabel: 'تسجيل الوساطة العقارية',
      visitSiteCta: 'زيارة jamokaproperties.com',
    },
    form: {
      eyebrow: 'استثمر مع جاموكا العقارية',
      heading: 'دعنا نبني محفظتك العقارية في دبي معاً.',
      subtitle:
        'هل أنت مستعد لاستكشاف شرائح 5 مليون درهم (عائد 15%) أو 10 مليون درهم (عائد 16%)؟ اترك بياناتك أدناه وسيتواصل معك أحد كبار خبراء الاستثمار لدينا لمشاركتك المحفظة السرية وخيارات الوحدات وكافة الشروط التعاقدية.',
      popupEyebrow: 'استثمر معنا · المكتب الخاص',
      popupHeading: 'احصل على ملف الاستثمار الخاص',
      popupSubtitle: 'تواصل مباشرة مع خبير استثمار حول فرص 5 مليون (15%) و10 مليون (16%).',
      popupReopenLabel: 'استثمر معنا · جلسة خاصة',
      fullName: 'الاسم الكامل',
      fullNamePlaceholder: 'مثال: عبدالله المنصوري',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      phone: 'رقم الهاتف',
      phonePlaceholder: '50 123 4567',
      country: 'دولة الإقامة',
      countryPlaceholder: 'مثال: الإمارات، السعودية، قطر، المملكة المتحدة',
      preferredLanguage: 'اللغة المفضلة للتواصل',
      languageOptions: [
        { value: 'Arabic', label: 'العربية' },
        { value: 'English', label: 'English (الإنجليزية)' },
        { value: 'Other', label: 'لغة أوروبية أخرى' },
      ],
      budget: 'الميزانية الاستثمارية',
      budgetOptions: [
        { value: 'AED 5 Million', label: '5 مليون درهم إماراتي (عائد سنوي 15%)' },
        { value: 'AED 10 Million', label: '10 مليون درهم إماراتي (عائد سنوي 16%)' },
        { value: 'Other / Discuss with an Advisor', label: 'مبلغ آخر / أرغب في النقاش مع مستشار' },
      ],
      preference: 'التفضيل الاستثماري',
      preferenceOptional: 'اختياري',
      preferenceOptions: [
        { value: '3-Year Exit Option', label: 'خيار التخارج بعد 3 سنوات (إعادة الشراء)' },
        { value: '3+3-Year Extended Option', label: 'خيار التمديد 3+3 سنوات' },
        { value: 'Property Ownership / Retention', label: 'التملك والاحتفاظ بالعقار' },
        { value: 'Would Like to Discuss', label: 'أرغب في مناقشة الخيارات' },
      ],
      consentPrefix:
        'أوافق على تواصل جاموكا العقارية معي بخصوص هذه الفرصة الاستثمارية وأقرّ بالاطلاع على ',
      privacyLink: 'سياسة الخصوصية',
      submitCta: 'تحدث مع مستشار الاستثمار في جاموكا',
      submittingLabel: 'جارٍ ربطك بمكتب الاستثمار...',
      switchToFullForm: 'تحتاج خيارات إضافية؟ افتح النموذج الكامل',
      whatsappDirectLabel: 'تواصل عبر واتساب الآن',
      whatsappPrefill:
        'مرحباً جاموكا العقارية، أرغب في التحدث مع مستشار استثمار حول فرصة الاستثمار العقاري الخاص في دبي (5 مليون / 10 مليون درهم).',
      successTitle: 'شكراً لاهتمامك.',
      successBody:
        'تم استلام استفسارك بنجاح. سيتواصل معك أحد أعضاء فريق الاستثمار لدينا قريباً لمناقشة تفاصيل الفرصة.',
      submitAnother: 'إرسال استفسار آخر',
      errors: {
        fullName: 'يرجى إدخال الاسم الكامل.',
        email: 'يرجى إدخال بريد إلكتروني صحيح.',
        phone: 'يرجى إدخال رقم هاتف صحيح.',
        country: 'يرجى إدخال دولة الإقامة.',
        budget: 'يرجى اختيار الميزانية الاستثمارية.',
        consent: 'يرجى تأكيد الموافقة على التواصل للمتابعة.',
        generic: 'تعذر إرسال الطلب حالياً. يرجى المحاولة مجدداً أو التواصل معنا مباشرة عبر واتساب.',
      },
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      heading: 'إجابات واضحة على أبرز تساؤلات المستثمرين',
      subtitle:
        'توضيحات دقيقة ومباشرة مستندة إلى هيكل الفرصة الاستثمارية المقترح.',
      items: [
        {
          q: 'ما هو الحد الأدنى للتخصيص الاستثماري؟',
          a: 'تبدأ الفرصة الاستثمارية المهيكلة بتخصيص قدره 5,000,000 درهم إماراتي، كما تتوفر شريحة أعلى بقيمة 10,000,000 درهم إماراتي. ويمكن للمستثمرين الراغبين في مناقشة بدائل أخرى اختيار "مبلغ آخر / أرغب في النقاش مع مستشار" في نموذج الاستفسار.',
        },
        {
          q: 'ما هي العوائد السنوية المقدّمة؟',
          a: 'وفق الهيكل الاستثماري المقترح، توفر شريحة 5,000,000 درهم عائداً سنوياً مضموناً بنسبة 15% (750,000 درهم سنوياً؛ بإجمالي 2,250,000 درهم خلال 3 سنوات)، فيما توفر شريحة 10,000,000 درهم عائداً سنوياً مضموناً بنسبة 16% (1,600,000 درهم سنوياً؛ بإجمالي 4,800,000 درهم خلال 3 سنوات)، وذلك وفقاً للاتفاقية الاستثمارية الموقّعة.',
        },
        {
          q: 'كيف تعمل آلية خيار إعادة الشراء بسعر الشراء الأصلي؟',
          a: 'عند انتهاء مدة الاستثمار المتفق عليها والبالغة ثلاث سنوات، يتاح للمستثمر خيار التخارج عبر آلية إعادة الشراء التعاقدية على أساس سعر الشراء الأصلي للعقار (5,000,000 أو 10,000,000 درهم)، وذلك وفقاً لمهل الإشعار وشروط الأهلية والأحكام المنصوص عليها في الاتفاقية الموقّعة.',
        },
        {
          q: 'هل يمكنني اختيار العقارات وأنواع الوحدات؟',
          a: 'نعم. لا يُلزم المستثمر بنوع واحد من العقارات أو وحدة واحدة فقط؛ إذ يمكنك تخصيص محفظتك بين الاستوديوهات وشقق غرفة إلى غرفتي نوم والوحدات التجارية المختارة عبر ثلاثة مشاريع من الفئة الأولى (Class-A)، بحسب الوحدات المتوفرة وقت التخصيص.',
        },
        {
          q: 'ما هي شركات التطوير والمشاريع المشمولة في العرض؟',
          a: 'اختارت جاموكا العقارية نخبة من المطوّرين الراسخين من الفئة الأولى في دبي وثلاثة مشاريع رئيسية من الفئة (A) بناءً على سجل المطوّر وجودة التنفيذ والمواءمة التجارية. تُعرض أسماء المطوّرين وملفات المشاريع وجداول الوحدات المتاحة بصورة خاصة خلال الجلسة الاستشارية.',
        },
        {
          q: 'هل يمكنني الاحتفاظ بالعقار المشترى بدلاً من ممارسة خيار إعادة الشراء؟',
          a: 'نعم. بدلاً من ممارسة خيار إعادة الشراء عند نهاية المدة، يمكن للمستثمر اختيار الاحتفاظ بوحداته المشتراة للاستخدام الشخصي أو التملك المستمر، وذلك وفقاً لشروط التملك والتسليم والإشغال والأحكام التعاقدية المعمول بها.',
        },
        {
          q: 'ما الفرق بين خيار الـ 3 سنوات وخيار الـ 3+3 سنوات؟',
          a: 'يمتد الهيكل الأساسي لمدة 3 سنوات (بإجمالي عوائد 2,250,000 درهم لشريحة 5 مليون درهم، أو 4,800,000 درهم لشريحة 10 مليون درهم) مع خيار التخارج أو الاحتفاظ عند السنة الثالثة. أما المستثمرون الراغبون في أفق أطول فيمكنهم الاستفادة من خيار التمديد 3+3 سنوات (إجمالي 6 سنوات بعوائد تراكمية 4,500,000 درهم لشريحة 5 مليون أو 9,600,000 درهم لشريحة 10 مليون درهم)، وفق الشروط التعاقدية المتفق عليها.',
        },
        {
          q: 'كيف يتم توثيق شروط الاستثمار؟',
          a: 'تُوثَّق جميع الشروط التجارية وجداول العوائد وتخصيص الوحدات وأحكام إعادة الشراء أو الاحتفاظ ضمن الاتفاقية الاستثمارية الرسمية وعقود العقار المساندة. وكما ورد في المقترح الاستثماري، يتضمن الهيكل المقترح إصدار شيكات مؤجلة الدفع منذ بداية الترتيب الاستثماري.',
        },
        {
          q: 'هل يخضع الهيكل الاستثماري للتنظيم في دولة الإمارات؟',
          a: 'تعمل المشاريع العقارية المشاركة والجهات المعنية في دبي ضمن الإطار التنظيمي العقاري المعمول به في دولة الإمارات العربية المتحدة. ونؤكد أن الجهات الحكومية لا تضمن العوائد التجارية الخاصة، كما يُنصح المستثمرون دائماً بمراجعة جميع العقود مع مستشار قانوني أو مالي مستقل قبل الإقدام على الاستثمار.',
        },
        {
          q: 'كيف يمكنني ترتيب استشارة خاصة؟',
          a: 'يمكنك تعبئة نموذج طلب الاستشارة الخاصة في هذه الصفحة أو التواصل مباشرة مع مكتبنا الاستشاري عبر واتساب. سيتواصل معك أحد كبار مستشاري الاستثمار في جاموكا العقارية باللغة العربية أو الإنجليزية لترتيب اجتماع خاص في دبي أو جلسة مرئية سرية.',
        },
      ],
    },
    footer: {
      home: 'الرئيسية',
      opportunity: 'الفرصة الاستثمارية',
      structure: 'هيكل الاستثمار',
      developments: 'المشاريع المختارة',
      about: 'من نحن',
      contact: 'تواصل معنا',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      disclaimerLink: 'إخلاء المسؤولية الاستثمارية',
      disclaimerHeading: 'إخلاء مسؤولية استثماري هام',
      disclaimerText:
        'المعلومات الواردة في هذا الموقع مخصصة لأغراض تعريفية وترويجية فقط ولا تشكّل نصيحة مالية أو قانونية أو استثمارية. تخضع عوائد الاستثمار وترتيبات إعادة الشراء وأحكام استرداد رأس المال للاتفاقيات الموقّعة ذات الصلة ومتطلبات الأهلية والشروط المعمول بها. ينبغي على المستثمرين المحتملين مراجعة كافة المستندات المساندة بصورة مستقلة والحصول على المشورة المهنية المناسبة قبل المضي قدماً.',
      rights: 'جميع الحقوق محفوظة.',
    },
    legal: {
      close: 'إغلاق',
      privacyTitle: 'سياسة الخصوصية',
      privacyBody: [
        'تحترم شركة جاموكا العقارية ذ.م.م خصوصيتك وتتعامل مع جميع بيانات استفسارات المستثمرين بسرية تامة ولغرض الاستجابة لطلب الاستشارة ومشاركة الوثائق العقارية ذات الصلة فقط.',
        'يقتصر الوصول إلى المعلومات المقدَّمة عبر هذه الصفحة — بما في ذلك بيانات التواصل ودولة الإقامة واللغة المفضلة وميزانية التخصيص ومصدر الحملة — على فريق الاستشارات المعتمد لدى جاموكا العقارية وأنظمة إدارة علاقات العملاء المعتمدة.',
        'لا نقوم ببيع أو مشاركة البيانات الشخصية مع أطراف خارجية غير ذات صلة. يمكنك في أي وقت طلب الاطلاع على بياناتك أو تصحيحها أو حذفها عبر التواصل مع مكتبنا في دبي.',
      ],
      termsTitle: 'الشروط والأحكام',
      termsBody: [
        'تقدّم هذه الصفحة نظرة عامة على فرصة استثمار عقاري خاص مهيكل يتم ترتيبها عبر شركة جاموكا العقارية ذ.م.م في دبي، الإمارات العربية المتحدة.',
        'توضح الأرقام الواردة في هذه الصفحة هيكلي التخصيص المقترحين بقيمة 5,000,000 درهم (عائد سنوي 15%) و10,000,000 درهم (عائد سنوي 16%). وتخضع كافة تخصيصات العقارات وتوفر الوحدات وجداول الشيكات المؤجلة ومدد الاستثمار (3 سنوات أو 3+3 سنوات) وآليات إعادة الشراء وحقوق الاحتفاظ بالعقار لتوقيع اتفاقيات خطية ملزمة بين الأطراف المعنية.',
        'الدرهم الإماراتي (AED) هو العملة المرجعية التعاقدية الوحيدة. تحتفظ جاموكا العقارية ذ.م.م بحق تعديل أو سحب التخصيصات المتاحة دون إشعار مسبق قبل توقيع العقد.',
      ],
      disclaimerTitle: 'إخلاء المسؤولية الاستثمارية',
      disclaimerBody: [
        'المعلومات الواردة في هذا الموقع مخصصة لأغراض تعريفية وترويجية فقط ولا تشكّل نصيحة مالية أو قانونية أو استثمارية.',
        'تخضع عوائد الاستثمار وترتيبات إعادة الشراء وأحكام التخارج واسترداد رأس المال للاتفاقيات الموقّعة ذات الصلة ومتطلبات الأهلية والشروط المعمول بها.',
        'تنطوي الاستثمارات العقارية على اعتبارات تجارية وتعاقدية. تعمل المشاريع المشاركة ضمن الإطار التنظيمي المعمول به في دولة الإمارات، إلا أن حكومة الإمارات والجهات التنظيمية لا تضمن العوائد التجارية أو استرداد رأس المال. يُنصح المستثمرون المحتملون بمراجعة جميع المستندات بصورة مستقلة والحصول على استشارة قانونية ومالية وضريبية مناسبة قبل اتخاذ القرار.',
      ],
    },
    cookie: {
      message:
        'نستخدم ملفات تعريف الارتباط الأساسية والتحليلات الاختيارية لتحسين تجربتك وقياس أداء الحملات.',
      accept: 'قبول الكل',
      essentialOnly: 'الأساسية فقط',
    },
  },
};
