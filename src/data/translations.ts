export type Language = 'en' | 'ar';

export interface Translations {
  nav: {
    home: string;
    about: string;
    offPlan: string;
    mortgage: string;
    developers: string;
    services: string;
    blogs: string;
    contact: string;
    contactBtn: string;
    secondaryMarket: string;
  };
  hero: {
    badge: string;
    subtitle: string;
    title: string;
    caption: string;
    exploreBtn: string;
    readyBtn: string;
    searchPlaceholder: string;
    searchBtn: string;
    trending: string;
  };
  stats: {
    delivered: string;
    deliveredSub: string;
    growth: string;
    growthSub: string;
    escrow: string;
    escrowSub: string;
    rating: string;
    reviews: string;
  };
  discovery: {
    title: string;
    subtitle: string;
    allEnclaves: string;
    allPlans: string;
    allBrackets: string;
    allYears: string;
    reset: string;
    matching: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    showing: string;
    verifiedProjects: string;
    handover: string;
    paymentPlan: string;
    starting: string;
    learnMore: string;
    requestBrochure: string;
    downloadBrochure: string;
    amenities: string;
    milestones: string;
    brochurePrompt: string;
    brochureSuccessTitle: string;
    brochureSuccessDesc: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    closeModal: string;
  };
  wheel: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    subtitle: string;
    storyTitle: string;
    storyText1: string;
    storyText2: string;
    teamTitle: string;
    teamSubtitle: string;
    valuesTitle: string;
  };
  mortgage: {
    title: string;
    subtitle: string;
    calcTitle: string;
    propertyPrice: string;
    downPayment: string;
    loanTerm: string;
    interestRate: string;
    monthlyInstallment: string;
    loanAmount: string;
    partnerBanks: string;
    applyBtn: string;
  };
  developersPage: {
    title: string;
    subtitle: string;
    unitsDelivered: string;
    viewProjects: string;
    inquireDeveloper: string;
  };
  servicesPage: {
    title: string;
    subtitle: string;
    goldenVisaTitle: string;
    goldenVisaDesc: string;
    stage0Title: string;
    stage0Desc: string;
    escrowTitle: string;
    escrowDesc: string;
    portfolioTitle: string;
    portfolioDesc: string;
  };
  blogsPage: {
    title: string;
    subtitle: string;
    readBriefing: string;
    closeBriefing: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    formTitle: string;
    name: string;
    email: string;
    phone: string;
    queryType: string;
    queryOffPlan: string;
    querySecondary: string;
    message: string;
    sendBtn: string;
    successMsg: string;
    officeTitle: string;
    officeAddress: string;
    hoursTitle: string;
    hoursText: string;
    phoneTitle: string;
    whatsappTitle: string;
    licenseTitle: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    enclaves: string;
    developers: string;
    copyright: string;
    secondaryBanner: string;
    secondaryBannerSub: string;
    visitSecondary: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About Us',
      offPlan: 'Off Plan',
      mortgage: 'Mortgage',
      developers: 'Developers',
      services: 'Services',
      blogs: 'Blogs',
      contact: 'Contact Us',
      contactBtn: 'Contact Us',
      secondaryMarket: 'Secondary Resale',
    },
    hero: {
      badge: 'DUBAI OFF-PLAN PROPERTIES • BUSINESS BAY ADVISORY',
      subtitle: 'Luxury Real Estate Counsel',
      title: 'JAMOKA PROPERTIES',
      caption: 'Direct developer allocations with transparent escrow security and structured payment milestones across Dubai.',
      exploreBtn: 'EXPLORE OFF-PLAN',
      readyBtn: 'READY PROPERTIES (SQFT DXB)',
      searchPlaceholder: 'Search by community, developer (Emaar, Nakheel), or price...',
      searchBtn: 'Search',
      trending: 'Trending',
    },
    stats: {
      delivered: 'AED 3.8B+',
      deliveredSub: 'Off-Plan Volume Transacted',
      growth: '+14.6%',
      growthSub: 'Average 1st-Year Capital Yield',
      escrow: '100% Escrow',
      escrowSub: 'RERA Trust Account Protected',
      rating: '4.9/5',
      reviews: 'From 420+ International Buyers',
    },
    discovery: {
      title: 'Filter Off-Plan Developments',
      subtitle: 'Specify your preferred community, handover horizon, and payment framework.',
      allEnclaves: 'All Communities',
      allPlans: 'All Payment Plans',
      allBrackets: 'All Budgets',
      allYears: 'All Handover Years',
      reset: 'Reset Filters',
      matching: 'Matches Found',
    },
    projects: {
      badge: 'OFF-PLAN ALLOCATION',
      title: 'Iconic Dubai Off-Plan Developments',
      subtitle: 'Direct developer opportunities featuring early-tier pricing, escrow protection, and flexible construction-linked payment structures.',
      showing: 'Showing',
      verifiedProjects: 'Verified Prime Developments',
      handover: 'Handover',
      paymentPlan: 'Payment Plan',
      starting: 'Starting From',
      learnMore: 'Learn More',
      requestBrochure: 'Learn More',
      downloadBrochure: 'Learn More & Get Full Project Details',
      amenities: 'Key Amenities & Features',
      milestones: 'Payment Milestones',
      brochurePrompt: "Fill the form below and we'll get back to you with all the details, best payment plans, and available options.",
      brochureSuccessTitle: 'Inquiry Sent Successfully!',
      brochureSuccessDesc: 'Thank you for reaching out! Our advisory team will get back to you promptly with all project details, floor plans, and the best payment plans.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Email Address',
      phonePlaceholder: 'Phone Number',
      closeModal: 'Close',
    },
    wheel: {
      title: 'Trusted Partners with Dubai Leading Developers',
      subtitle: 'Official accredited sales partners with the UAE’s most prestigious master developers.',
    },
    about: {
      title: 'About Jamoka Properties',
      subtitle: 'A trusted real estate brokerage headquartered in Dubai, guiding global clients with integrity and deep market knowledge.',
      storyTitle: 'Our Heritage & Mission',
      storyText1: 'Jamoka Properties was established to provide transparent, analytical guidance in Dubai’s vibrant off-plan market. Headquartered at DIFC Gate Precinct, our advisory team helps individuals, families, and sovereign investors navigate developer releases with confidence.',
      storyText2: 'Our team monitors every construction milestone, verifies Land Department trust accounts, and ensures each client receives the most advantageous payment structure and prime unit allocations.',
      teamTitle: 'Meet Our Leadership & Senior Advisors',
      teamSubtitle: 'Decades of combined experience in Dubai master developments, conveyancing, and property investment.',
      valuesTitle: 'Our Core Principles',
    },
    mortgage: {
      title: 'Dubai Mortgage & Financing Advisory',
      subtitle: 'Calculate your handover financing, monthly installments, and post-completion equity according to UAE Central Bank regulations.',
      calcTitle: 'Interactive Mortgage Calculator',
      propertyPrice: 'Property Purchase Price',
      downPayment: 'Down Payment Equity',
      loanTerm: 'Mortgage Duration (Years)',
      interestRate: 'Interest Rate (% Annual)',
      monthlyInstallment: 'Estimated Monthly Payment',
      loanAmount: 'Financed Loan Amount',
      partnerBanks: 'Approved Lending Partners in UAE',
      applyBtn: 'Speak to Mortgage Specialist',
    },
    developersPage: {
      title: 'Dubai Master Developers',
      subtitle: 'Explore accredited master builders shaping Dubai’s skyline with world-class engineering and iconic architecture.',
      unitsDelivered: 'Units Delivered',
      viewProjects: 'View Projects',
      inquireDeveloper: 'Inquire Allocations',
    },
    servicesPage: {
      title: 'Our Real Estate Services',
      subtitle: 'Comprehensive real estate support from early project selection to handover and ongoing asset management.',
      goldenVisaTitle: '10-Year UAE Golden Visa Assistance',
      goldenVisaDesc: 'Property purchases of AED 2M+ qualify for the UAE 10-Year Golden Residency. We coordinate the full verification with the Dubai Land Department and GDRFA.',
      stage0Title: 'Direct Developer Pre-Launch Access',
      stage0Desc: 'Gain access to first-tier pricing and prime high-floor units before public launch releases.',
      escrowTitle: 'Escrow Account & Contract Diligence',
      escrowDesc: 'Verification of RERA trust accounts under Law No. 8 of 2007, ensuring complete safety of all construction installments.',
      portfolioTitle: 'Turnkey Handover & Resale via SQFT DXB',
      portfolioDesc: 'Professional snagging inspection upon handover, rental management, and seamless secondary market resale through our partner portal SQFT DXB.',
    },
    blogsPage: {
      title: 'Dubai Real Estate Insights',
      subtitle: 'Articles, market analyses, and practical guides on purchasing off-plan properties in Dubai.',
      readBriefing: 'Read Article',
      closeBriefing: 'Close Article',
    },
    contactPage: {
      title: 'Contact Jamoka Properties',
      subtitle: 'Get in touch with our advisory team at Bayswater Tower, Business Bay for project inquiries, brochures, or private meetings.',
      formTitle: 'Send an Inquiry',
      name: 'Your Name',
      email: 'Email Address',
      phone: 'Phone / WhatsApp Number',
      queryType: 'Off-Plan or Secondary Query',
      queryOffPlan: 'Off-Plan Properties (Developer Releases)',
      querySecondary: 'Secondary Market (Ready & Resale)',
      message: 'Message',
      sendBtn: 'Send Message',
      successMsg: 'Thank you! Your message has been received. Our team will contact you promptly.',
      officeTitle: 'Business Bay Office',
      officeAddress: 'Bayswater Tower, 8th and 11th floor, Business Bay, Dubai, UAE',
      hoursTitle: 'Working Hours',
      hoursText: 'Monday to Saturday: 9:00 AM – 7:00 PM (GST)',
      phoneTitle: 'Telephone',
      whatsappTitle: 'WhatsApp Desk',
      licenseTitle: 'RERA License ORN: 49679',
    },
    footer: {
      tagline: 'Jamoka Properties is a certified real estate brokerage based in Dubai, UAE, specializing in prime off-plan residential developments.',
      quickLinks: 'Navigation',
      enclaves: 'Popular Areas',
      developers: 'Top Developers',
      copyright: 'All rights reserved. Jamoka Properties LLC.',
      secondaryBanner: 'Looking for ready-to-move properties or resales?',
      secondaryBannerSub: 'Visit our dedicated partner portal SQFT DXB for verified ready homes and secondary listings.',
      visitSecondary: 'Visit SQFT DXB Resale Portal',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      offPlan: 'المشاريع قيد الإنشاء',
      mortgage: 'التمويل العقاري',
      developers: 'المطورون',
      services: 'خدماتنا',
      blogs: 'المقالات',
      contact: 'اتصل بنا',
      contactBtn: 'اتصل بنا',
      secondaryMarket: 'إعادة البيع الجاهز',
    },
    hero: {
      badge: 'عقارات دبي قيد الإنشاء • استشارات الخليج التجاري، دبي',
      subtitle: 'استشارات عقارية فاخرة وموثوقة',
      title: 'جاموكا العقارية',
      caption: 'حجوزات مباشرة من كبار المطورين مع حماية كاملة لحسابات الضمان وخطط سداد ميسرة في دبي.',
      exploreBtn: 'استكشف المشاريع قيد الإنشاء',
      readyBtn: 'العقارات الجاهزة (SQFT DXB)',
      searchPlaceholder: 'ابحث حسب المنطقة، المطور (إعمار، نخيل)، أو السعر...',
      searchBtn: 'بحث',
      trending: 'الأكثر بحثاً',
    },
    stats: {
      delivered: '+3.8 مليار درهم',
      deliveredSub: 'حجم المبيعات المنفذة',
      growth: '+14.6%',
      growthSub: 'متوسط العائد الرأسمالي للسنة الأولى',
      escrow: 'حساب ضمان 100%',
      escrowSub: 'محمي لدى مؤسسة التنظيم العقاري (ريرا)',
      rating: '4.9/5',
      reviews: 'من أكثر من 420 مستثمر دولي',
    },
    discovery: {
      title: 'تصفية المشاريع قيد الإنشاء',
      subtitle: 'حدد المنطقة المفضلة، موعد التسليم، وخطة السداد المناسبة لك.',
      allEnclaves: 'جميع المناطق',
      allPlans: 'جميع خطط السداد',
      allBrackets: 'جميع الميزانيات',
      allYears: 'جميع سنوات التسليم',
      reset: 'إعادة ضبط التصفية',
      matching: 'المشاريع المطابقة',
    },
    projects: {
      badge: 'فرصة قيد الإنشاء',
      title: 'أبرز المشاريع قيد الإنشاء في دبي',
      subtitle: 'فرص مباشرة من المطورين بأسعار الطرح الأول، مع حماية حسابات الضمان وجداول سداد مرنة مرتبطة بالإنجاز.',
      showing: 'عرض',
      verifiedProjects: 'مشروع معتمد وموثق',
      handover: 'التسليم',
      paymentPlan: 'خطة السداد',
      starting: 'يبدأ من',
      learnMore: 'اعرف المزيد',
      requestBrochure: 'اعرف المزيد',
      downloadBrochure: 'اعرف المزيد واحصل على كامل تفاصيل المشروع',
      amenities: 'أبرز المزايا والمرافق',
      milestones: 'مراحل خطة السداد',
      brochurePrompt: 'املأ النموذج أدناه وسنتواصل معك بكافة التفاصيل وأفضل خطط وخيارات السداد.',
      brochureSuccessTitle: 'تم إرسال استفسارك بنجاح!',
      brochureSuccessDesc: 'شكراً لتواصلك معنا! سيتواصل معك فريقنا قريباً بكافة تفاصيل المشروع ومخططات الطوابق وأفضل خطط السداد.',
      namePlaceholder: 'الاسم الكامل',
      emailPlaceholder: 'البريد الإلكتروني',
      phonePlaceholder: 'رقم الهاتف',
      closeModal: 'إغلاق',
    },
    wheel: {
      title: 'شركاء موثوقون مع أبرز مطوري دبي',
      subtitle: 'وكلاء معتمدون رسمياً مع نخبة المطورين العقاريين في دولة الإمارات.',
    },
    about: {
      title: 'عن جاموكا العقارية',
      subtitle: 'شركة وساطة واستشارات عقارية معتمدة في دبي، تقدم خدمات متميزة قائمة على الشفافية والخبرة السوقية العميقة.',
      storyTitle: 'مسيرتنا ورؤيتنا',
      storyText1: 'تأسست جاموكا العقارية لتقديم استشارات دقيقة وموثوقة للمستثمرين في سوق دبي العقاري المتنامي. من مقرنا في مركز دبي المالي العالمي (DIFC)، نساعد العائلات والمستثمرين على اقتناء أفضل الوحدات بأسعار الإطلاق الأولى.',
      storyText2: 'نحرص على متابعة مراحل الإنجاز الميداني، والتحقق من حسابات الضمان المعتمدة لدى دائرة الأراضي والأملاك، لضمان أعلى مستويات الأمان الاستثماري لعملائنا.',
      teamTitle: 'فريق الإدارة والمستشارين',
      teamSubtitle: 'خبرة طويلة متراكمة في مجالات التطوير العقاري والاستثمار في دبي.',
      valuesTitle: 'مبادئنا الأساسية',
    },
    mortgage: {
      title: 'التمويل العقاري في دبي',
      subtitle: 'احسب أقساطك الشهرية والتمويل المتاح عند التسليم وفقاً للوائح المصرف المركزي لدولة الإمارات.',
      calcTitle: 'حاسبة التمويل العقاري التفاعلية',
      propertyPrice: 'سعر العقار',
      downPayment: 'الدفعة الأولى',
      loanTerm: 'مدة القرض (سنوات)',
      interestRate: 'معدل الفائدة السنوي (%)',
      monthlyInstallment: 'القسط الشهري التقريبي',
      loanAmount: 'مبلغ التمويل الإجمالي',
      partnerBanks: 'البنوك الشريكة المعتمدة في الإمارات',
      applyBtn: 'تواصل مع مستشار التمويل',
    },
    developersPage: {
      title: 'المطورون العقاريون في دبي',
      subtitle: 'تعرف على كبار المطورين الذين يرسمون أفق دبي بمشاريع معمارية عالمية المستوى.',
      unitsDelivered: 'الوحدات المنجزة',
      viewProjects: 'عرض المشاريع',
      inquireDeveloper: 'طلب معلومات المطور',
    },
    servicesPage: {
      title: 'خدماتنا العقارية',
      subtitle: 'دعم عقاري شامل يبدأ من اختيار المشروع وحتى الاستلام وإعادة البيع وإدارة الأصول.',
      goldenVisaTitle: 'المساعدة في الإقامة الذهبية (10 سنوات)',
      goldenVisaDesc: 'شراء عقار بقيمة 2 مليون درهم فما فوق يمنحك حق الحصول على الإقامة الذهبية في الإمارات. نقوم بتنسيق الإجراءات كاملة مع دائرة الأراضي والأملاك والإقامة.',
      stage0Title: 'أولوية الحجز قبل الإطلاق الرسمي',
      stage0Desc: 'احصل على وحدات الطوابق العليا بأسعار المرحلة الأولى المتميزة قبل طرحها للجمهور.',
      escrowTitle: 'تدقيق حسابات الضمان والعقود',
      escrowDesc: 'التحقق الصارم من حسابات الضمان وفق القانون رقم 8 لسنة 2007 لحماية جميع الدفعات الإنشائية للمشتري.',
      portfolioTitle: 'الاستلام وإعادة البيع عبر SQFT DXB',
      portfolioDesc: 'فحص فني شامل للوحدة قبل الاستلام، وإدارة التأجير، وإعادة البيع عبر بوابتنا الشريكة SQFT DXB.',
    },
    blogsPage: {
      title: 'مقالات وأبحاث سوق دبي العقاري',
      subtitle: 'أدلة إرشادية وتحليلات لأحدث المستجدات التنظيمية والفرص الاستثمارية في دبي.',
      readBriefing: 'قراءة المقال',
      closeBriefing: 'إغلاق المقال',
    },
    contactPage: {
      title: 'اتصل بجاموكا العقارية',
      subtitle: 'تواصل مع فريقنا في برج بايزووتر بالخليج التجاري لأي استفسار أو لطلب الكتيبات ومقابلة مستشارينا.',
      formTitle: 'أرسل استفسارك',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف / الواتساب',
      queryType: 'نوع الاستفسار (قيد الإنشاء أو السوق الثانوي)',
      queryOffPlan: 'عقارات قيد الإنشاء (طروحات المطورين)',
      querySecondary: 'السوق الثانوي (عقارات جاهزة وإعادة بيع)',
      message: 'الرسالة',
      sendBtn: 'إرسال الرسالة',
      successMsg: 'شكراً لك! تم استلام رسالتك وسيتواصل معك مستشارنا المختص قريباً.',
      officeTitle: 'مكتب الخليج التجاري (Business Bay)',
      officeAddress: 'برج بايزووتر، الطابقين 8 و 11، الخليج التجاري، دبي، الإمارات',
      hoursTitle: 'ساعات العمل',
      hoursText: 'من الإثنين إلى السبت: 9:00 صباحاً – 7:00 مساءً (توقيت الإمارات)',
      phoneTitle: 'الهاتف المباشر',
      whatsappTitle: 'خدمة الواتساب',
      licenseTitle: 'ترخيص ريرا ORN: 49679',
    },
    footer: {
      tagline: 'جاموكا العقارية هي شركة وساطة عقارية مرخصة في دبي، متخصصة في تسويق المشاريع السكنية الفاخرة قيد الإنشاء.',
      quickLinks: 'روابط سريعة',
      enclaves: 'أشهر المناطق',
      developers: 'أبرز المطورين',
      copyright: 'جميع الحقوق محفوظة. شركة جاموكا العقارية ذ.م.م.',
      secondaryBanner: 'هل تبحث عن عقارات جاهزة للسكن أو إعادة البيع؟',
      secondaryBannerSub: 'تفضل بزيارة بوابتنا الشريكة SQFT DXB للعقارات الجاهزة وإعادة البيع الموثقة.',
      visitSecondary: 'زيارة بوابة SQFT DXB',
    },
  },
};
