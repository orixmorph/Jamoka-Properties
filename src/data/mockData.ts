export interface OffPlanProperty {
  id: string;
  name: string;
  developer: string;
  enclave: string;
  tag: string;
  handover: string;
  units: string;
  description: string;
  priceAed: string;
  priceUsd: string;
  paymentPlan: string;
  bookingPercent: string;
  constructionPercent: string;
  handoverPercent: string;
  postHandoverPercent?: string;
  image: string;
  featured?: boolean;
  projectHighlights: string[];
}

export const OFF_PLAN_PROPERTIES: OffPlanProperty[] = [
  {
    id: 'palm-royal-mirage',
    name: 'The Palm Royal Mirage',
    developer: 'NAKHEEL',
    enclave: 'Palm Jumeirah',
    tag: 'WATERFRONT',
    handover: 'Q4 2027',
    units: '1 - 4 Bed Residences & Penthouses',
    description: 'Private beachfront sanctuaries featuring uninterrupted marina views, private yacht docks, and branded Italian finishes.',
    priceAed: 'AED 2,850,000',
    priceUsd: '$776,000 USD',
    paymentPlan: '60 / 40 Handover',
    bookingPercent: '10%',
    constructionPercent: '50%',
    handoverPercent: '40%',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    projectHighlights: [
      'Private sandy beach with 300m frontage',
      'Infinity pool overlooking Dubai Marina skyline',
      'Full smart home automation with European finishes',
      'Eligibility for 10-Year UAE Golden Visa'
    ]
  },
  {
    id: 'horizon-sky-residences',
    name: 'The Horizon Sky Residences',
    developer: 'EMAAR',
    enclave: 'Downtown Dubai',
    tag: 'SKY SUITES',
    handover: 'Q2 2028',
    units: '2 - 5 Bed Sky Duplexes',
    description: 'Direct access to Dubai Opera and Burj Lake, featuring private sky terraces and five-star bespoke hospitality services.',
    priceAed: 'AED 4,200,000',
    priceUsd: '$1,140,000 USD',
    paymentPlan: '70 / 30 On Handover',
    bookingPercent: '15%',
    constructionPercent: '55%',
    handoverPercent: '30%',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    projectHighlights: [
      'Unobstructed front-row views of Burj Khalifa',
      'Private lift access for Sky Duplexes',
      'Exclusive resident lounge with Michelin star catering',
      'Walking distance to Dubai Mall & DIFC Gate'
    ]
  },
  {
    id: 'marina-bay-cove',
    name: 'Marina Bay Cove Residences',
    developer: 'SELECT GROUP',
    enclave: 'Dubai Marina',
    tag: 'MARINA',
    handover: 'Q1 2027',
    units: '1 - 3 Bed Waterfront Apts',
    description: 'Prime waterfront positioning with private marina berths, sunset wellness lounges, and exceptional projected capital appreciation.',
    priceAed: 'AED 3,600,000',
    priceUsd: '$980,000 USD',
    paymentPlan: '50 / 50 Milestones',
    bookingPercent: '10%',
    constructionPercent: '40%',
    handoverPercent: '50%',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    projectHighlights: [
      'Private marina yacht club membership',
      'Dual-aspect waterfront and Arabian Gulf panoramas',
      'State-of-the-art biophilic gymnasium and spa',
      'Flexible construction-linked escrow disbursement'
    ]
  },
  {
    id: 'canal-crown',
    name: 'Canal Crown Residences',
    developer: 'DAMAC',
    enclave: 'Dubai Water Canal',
    tag: 'BRANDED',
    handover: 'Q3 2027',
    units: 'Studio - 4 Bed Mansions',
    description: 'Jewelry-inspired branded duplexes and penthouses perched along the Dubai Canal with private plunge pools.',
    priceAed: 'AED 2,100,000',
    priceUsd: '$571,000 USD',
    paymentPlan: '80 / 20 Handover',
    bookingPercent: '20%',
    constructionPercent: '60%',
    handoverPercent: '20%',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    projectHighlights: [
      'de GRISOGONO jewelry-crafted architectural aesthetics',
      'Hydroponic sky garden on 50th floor',
      'Direct yacht dock access to Dubai Water Canal',
      'High anticipated gross rental yield of 8.5%+'
    ]
  },
  {
    id: 'omniyat-vela-dorada',
    name: 'Vela Viento Signature',
    developer: 'OMNIYAT',
    enclave: 'Downtown Dubai',
    tag: 'ULTRA LUXURY',
    handover: 'Q4 2027',
    units: '3 - 5 Bed Sky Mansions',
    description: 'Managed by Dorchester Collection, featuring architectural designs by Foster + Partners with sweeping canal horizons.',
    priceAed: 'AED 18,500,000',
    priceUsd: '$5,037,000 USD',
    paymentPlan: '60 / 40 Handover',
    bookingPercent: '10%',
    constructionPercent: '50%',
    handoverPercent: '40%',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    projectHighlights: [
      'Dorchester Collection 5-star hotel management',
      'Private glass bridge between twin architectural towers',
      'Floor-to-ceiling 6-meter ceiling heights in grand salons',
      'Direct private marina berths'
    ]
  },
  {
    id: 'sobha-hartland-crest',
    name: 'Sobha Seahaven Island',
    developer: 'SOBHA REALTY',
    enclave: 'Dubai Harbour',
    tag: 'ISLAND PRESTIGE',
    handover: 'Q4 2026',
    units: '1 - 4 Bed Harbour Apartments',
    description: 'Overlooking Palm Jumeirah and Ain Dubai with superyacht marina berthing and smart soundproof acoustic glazing.',
    priceAed: 'AED 3,200,000',
    priceUsd: '$871,000 USD',
    paymentPlan: '60 / 40 Handover',
    bookingPercent: '10%',
    constructionPercent: '50%',
    handoverPercent: '40%',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    projectHighlights: [
      'Unobstructed vistas of cruise terminal and Gulf',
      'In-house backward integrated construction quality',
      'Private infinity sky pools on every tower summit',
      '2-minute walk to Dubai Harbour marina promenade'
    ]
  }
];

export interface DeveloperPartner {
  name: string;
  fullName: string;
  tagline: string;
  established: string;
  activeProjects: number;
  rating: string;
  keyProjects: string[];
}

export const MASTER_DEVELOPERS: DeveloperPartner[] = [
  {
    name: 'EMAAR',
    fullName: 'Emaar Properties PJSC',
    tagline: 'Master creators of Downtown Dubai & Burj Khalifa',
    established: '1997',
    activeProjects: 38,
    rating: 'AAA Sovereign',
    keyProjects: ['Burj Crown', 'Dubai Creek Tower Precinct', 'Oasis by Emaar', 'Dubai Hills Estate']
  },
  {
    name: 'NAKHEEL',
    fullName: 'Nakheel PJSC (Dubai Holding)',
    tagline: 'World pioneer of waterfront & island destinations',
    established: '2000',
    activeProjects: 24,
    rating: 'AAA Sovereign',
    keyProjects: ['Palm Jebel Ali Sovereign Villas', 'Como Residences', 'Palm Beach Towers']
  },
  {
    name: 'OMNIYAT',
    fullName: 'Omniyat Properties',
    tagline: 'Ultra-prime architectural art and Dorchester branded residences',
    established: '2005',
    activeProjects: 9,
    rating: 'Prime Connoisseur',
    keyProjects: ['One at Palm Jumeirah', 'Vela & Vela Viento', 'The Lana Residences']
  },
  {
    name: 'DAMAC',
    fullName: 'DAMAC Properties',
    tagline: 'Luxury branded living with Cavalli, de Grisogono & Safa',
    established: '2002',
    activeProjects: 31,
    rating: 'Top Tier Global',
    keyProjects: ['DAMAC Lagoons', 'Canal Crown', 'Safa Two by de GRISOGONO']
  },
  {
    name: 'SOBHA',
    fullName: 'Sobha Realty',
    tagline: 'Passion for perfection with backward integrated craftsmanship',
    established: '1976',
    activeProjects: 18,
    rating: 'Quality Benchmark',
    keyProjects: ['Sobha Hartland II', 'Sobha Seahaven', 'Sobha Reserve Villas']
  },
  {
    name: 'MERAAS',
    fullName: 'Meraas Holding',
    tagline: 'Curators of Bluewaters, City Walk & Bulgari Island',
    established: '2007',
    activeProjects: 14,
    rating: 'Sovereign Waterfront',
    keyProjects: ['Bulgari Lighthouse', 'Central Park Plaza', 'Bluewaters Bay']
  }
];

export interface ServiceDetail {
  id: string;
  title: string;
  tag: string;
  icon: string;
  description: string;
  scope: string[];
}

export const JAMOKA_SERVICES: ServiceDetail[] = [
  {
    id: 'vip-allocations',
    title: 'Stage-0 VIP Allocations',
    tag: 'PRE-LAUNCH EXCLUSIVE',
    icon: 'vpn_key',
    description: 'Securing direct sovereign allocations, premier floor elevations, and developer discounts before public marketing opens.',
    scope: ['Priority unit hold privileges', 'Direct developer board introductions', 'Bulk purchase syndication discounts']
  },
  {
    id: 'escrow-diligence',
    title: 'DLD Escrow & RERA Diligence',
    tag: 'FIDUCIARY SAFETY',
    icon: 'verified_user',
    description: 'Auditing government-regulated escrow accounts (Law No. 8 of 2007) and verifying independent engineering progress reports.',
    scope: ['Oqood registration oversight', 'Developer construction progress certification', 'Escrow liquidity audits']
  },
  {
    id: 'golden-visa',
    title: '10-Year UAE Golden Visa',
    tag: 'GOVERNMENT FACILITATION',
    icon: 'badge',
    description: 'End-to-end concierge handling for UAE long-term residency upon purchasing eligible off-plan property of AED 2,000,000+.',
    scope: ['Immigration fast-tracking', 'Family and domestic sponsorship', 'Bank account and Emirates ID setup']
  },
  {
    id: 'exit-strategy',
    title: 'Milestone & Exit Structuring',
    tag: 'CAPITAL PRESERVATION',
    icon: 'trending_up',
    description: 'Formulating strategic assignment sales prior to completion or orchestrating post-handover high-yield tenant placement.',
    scope: ['Secondary contract reassignment', 'Gross yield cash flow modeling', 'Capital repatriation legal counseling']
  }
];

export interface RealEstateArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
  image: string;
  author: string;
}

export const REAL_ESTATE_BLOGS: RealEstateArticle[] = [
  {
    id: 'market-guide-2026',
    title: "Dubai's Off-Plan Market: What International Investors Need to Know",
    category: 'Regulatory Advisory',
    readTime: '6 min read',
    date: 'February 2026',
    summary: 'An exhaustive briefing on cross-border currency regulations, sovereign tax efficiencies, and the role of the Dubai Land Department in protecting global capital.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
    author: 'Tariq Al-Sabah, Senior DIFC Partner'
  },
  {
    id: 'escrow-payment-plans',
    title: 'The Ultimate Guide to Off-Plan Payment Plans & Escrow Security',
    category: 'Financial Structuring',
    readTime: '8 min read',
    date: 'January 2026',
    summary: 'How Law No. 8 of 2007 safeguards buyer capital through RERA trust accounts, and how to optimize 1% monthly or post-handover facilities for maximum IRR.',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop',
    author: 'Elena Rostova, Head of Fiduciary Structuring'
  },
  {
    id: 'emerging-waterfront',
    title: 'Top 5 Emerging Waterfront Communities for Long-Term Growth',
    category: 'Market Projections',
    readTime: '5 min read',
    date: 'January 2026',
    summary: 'Why Palm Jebel Ali, Dubai Islands, and Dubai Creek Harbour Island are projected to outperform mature inland enclaves across the 2026-2030 cycle.',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop',
    author: 'Marcus Sterling, Chief Strategist'
  }
];
