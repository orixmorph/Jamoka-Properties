export interface OffPlanProject {
  id: string;
  name: string;
  developer: string;
  enclave: string;
  priceAED: number;
  priceUSD: number;
  paymentPlan: string;
  handover: string;
  bedrooms: string;
  type: string;
  badge: string;
  image: string;
  description: string;
  roi: string;
  features: string[];
  milestones: { phase: string; percentage: number; description: string }[];
}

export interface TeamMember {
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  bio: string;
}

export interface Developer {
  name: string;
  tagline: string;
  stats: string;
  tier: string;
  flagship: string;
  logoText: string;
  description: string;
  founded: string;
}

export interface Enclave {
  name: string;
  tag: string;
  yoyGrowth: string;
  developers: string;
  image: string;
  description: string;
  startingPrice: string;
}

export interface BlogPost {
  id: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Tariq Al-Mansoor',
    role: 'Managing Partner & Founder',
    experience: '18+ Years Dubai Real Estate',
    specialty: 'Master Developer Negotiations & Sovereign Portfolios',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000001/team/tariq-al-mansoor.jpg',
    bio: 'Former senior investment director at top regional sovereign wealth funds, Tariq founded Jamoka Properties to bring transparency, institutional discipline, and priority developer access to private investors worldwide.',
  },
  {
    name: 'Farhan Sheikh',
    role: 'Head of Off-Plan Investments',
    experience: '12+ Years Advisory',
    specialty: 'Stage-0 Allocations & Escrow Account Structuring',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000002/team/farhan-sheikh.jpg',
    bio: 'Directly oversees off-plan developer relationships with Emaar, Nakheel, and Omniyat. Farhan has advised on over AED 2.4 Billion in off-plan residential transactions.',
  },
  {
    name: 'Sarah Jenkins',
    role: 'Senior Investment Advisor - Prime Waterfront',
    experience: '9+ Years in UAE',
    specialty: 'Palm Jumeirah, Dubai Islands & Canal Estates',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000003/team/sarah-jenkins.jpg',
    bio: 'Specializing in trophy residences and beachfront acquisitions, Sarah represents international family offices seeking prime capital appreciation and Golden Visa qualification.',
  },
  {
    name: 'Elena Rostova',
    role: 'Director of International Client Relations',
    experience: '10+ Years Cross-Border Advisory',
    specialty: 'European & CIS Wealth Management & Golden Visa',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000004/team/elena-rostova.jpg',
    bio: 'Guides overseas buyers through zero-tax residency setup, seamless banking onboarding, and legal conveyancing under the Dubai Land Department framework.',
  },
  {
    name: 'Zaid Al-Hashimi',
    role: 'Head of Legal & Escrow Conveyancing',
    experience: '14+ Years Property Law',
    specialty: 'RERA Law No. 8 & Title Deed Registration',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000005/team/zaid-al-hashimi.jpg',
    bio: 'Licensed legal counsel ensuring all client transactions strictly comply with RERA escrow custody rules, developer sales contracts, and Oqood registrations.',
  },
  {
    name: 'Marcus Vance',
    role: 'Head of Mortgage & Financing Solutions',
    experience: '11+ Years Banking',
    specialty: 'UAE Central Bank Regulations & Non-Resident Mortgages',
    image: 'https://res.cloudinary.com/jamoka/image/upload/v1710000006/team/marcus-vance.jpg',
    bio: 'Former senior private banker coordinating pre-approvals and handover financing with top UAE institutions including Emirates NBD, First Abu Dhabi Bank (FAB), and ADCB.',
  },
];

export const OFF_PLAN_PROJECTS: OffPlanProject[] = [
  {
    id: 'palm-royal-mirage',
    name: 'The Palm Royal Mirage',
    developer: 'Nakheel',
    enclave: 'Palm Jumeirah',
    priceAED: 2850000,
    priceUSD: 776000,
    paymentPlan: '60 / 40 Handover',
    handover: 'Q4 2027',
    bedrooms: '1 - 4 Bed Residences & Penthouses',
    type: 'Waterfront Sanctuary',
    badge: 'WATERFRONT',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1600&auto=format&fit=crop',
    description: 'Private beachfront sanctuaries featuring uninterrupted Dubai Marina skyline views, private yacht moorings, and bespoke Italian marble finishes.',
    roi: '9.4% Projected Gross Yield',
    features: ['Private Beach Access', 'Infinity Horizon Pool', 'Yacht Berth Privileges', 'Smart Automation Concierge'],
    milestones: [
      { phase: 'Booking Deposit', percentage: 10, description: 'Immediate on signing Reservation Agreement' },
      { phase: 'During Construction', percentage: 50, description: 'Linked to 5 certified RERA construction stages' },
      { phase: 'Upon Key Handover', percentage: 40, description: 'Q4 2027 with option for bank mortgage' },
    ],
  },
  {
    id: 'horizon-sky-residences',
    name: 'The Horizon Sky Residences',
    developer: 'Emaar Properties',
    enclave: 'Downtown Dubai',
    priceAED: 4200000,
    priceUSD: 1140000,
    paymentPlan: '70 / 30 On Handover',
    handover: 'Q2 2028',
    bedrooms: '2 - 5 Bed Sky Duplexes',
    type: 'Sky Suites',
    badge: 'SKY SUITES',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1600&auto=format&fit=crop',
    description: 'Direct footbridge access to Dubai Opera and Burj Lake, featuring private double-height sky terraces and five-star bespoke hospitality services.',
    roi: '8.8% Projected Gross Yield',
    features: ['Burj Khalifa Frontage', 'Private Elevator Lobbies', 'Valet & Sommelier Service', 'Sky Deck & Helipad Access'],
    milestones: [
      { phase: 'Initial Allocation', percentage: 10, description: 'Securing preferred elevation tier' },
      { phase: 'Milestone Instalments', percentage: 60, description: '10% every 6 months during superstructure work' },
      { phase: 'Completion & Deeds', percentage: 30, description: 'Handover Q2 2028' },
    ],
  },
  {
    id: 'marina-bay-cove',
    name: 'Marina Bay Cove Residences',
    developer: 'Select Group',
    enclave: 'Dubai Marina',
    priceAED: 3600000,
    priceUSD: 980000,
    paymentPlan: '50 / 50 Milestones',
    handover: 'Q1 2027',
    bedrooms: '1 - 3 Bed Waterfront Apts',
    type: 'Waterfront Living',
    badge: 'MARINA BERTHS',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
    description: 'Prime promenade positioning with direct access to private marina berths, sunset wellness lounges, and premier capital appreciation potential.',
    roi: '8.2% Projected Gross Yield',
    features: ['Direct Promenade Access', 'Wellness Hydrotherapy Spa', 'Residents Cigar Lounge', 'EV High-Speed Charging'],
    milestones: [
      { phase: 'Down Payment', percentage: 10, description: 'Immediate reservation' },
      { phase: 'Construction Tranches', percentage: 40, description: 'Staggered over 24 months' },
      { phase: 'Final Handover', percentage: 50, description: 'Upon completion inspection Q1 2027' },
    ],
  },
  {
    id: 'canal-crown-residences',
    name: 'Canal Crown Residences',
    developer: 'DAMAC Properties',
    enclave: 'Dubai Water Canal',
    priceAED: 2100000,
    priceUSD: 571000,
    paymentPlan: '80 / 20 Handover',
    handover: 'Q3 2027',
    bedrooms: 'Studio - 4 Bed Mansions',
    type: 'Branded Luxury',
    badge: 'BRANDED JEWEL',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop',
    description: 'Jewelry-inspired branded duplexes and penthouses perched along the Dubai Canal with private cantilevered plunge pools.',
    roi: '9.8% Projected Gross Yield',
    features: ['Private Plunge Pools', 'de GRISOGONO Architecture', 'Canal Boardwalk Entry', 'Observation Deck'],
    milestones: [
      { phase: 'Registration', percentage: 20, description: '10% down + 10% within 60 days' },
      { phase: 'Construction', percentage: 60, description: 'Distributed 1% monthly structures' },
      { phase: 'Key Handover', percentage: 20, description: 'Final tranche Q3 2027' },
    ],
  },
  {
    id: 'sobha-seahaven',
    name: 'Sobha Seahaven Sky Edition',
    developer: 'Sobha Realty',
    enclave: 'Dubai Harbour',
    priceAED: 3800000,
    priceUSD: 1035000,
    paymentPlan: '60 / 40 On Handover',
    handover: 'Q4 2026',
    bedrooms: '1 - 4 Bed Panoramic Suites',
    type: 'Maritime Splendor',
    badge: 'PRE-COMPLETION',
    image: 'https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=1600&auto=format&fit=crop',
    description: 'Ultra-luxurious nautical living offering dual 360-degree views of Palm Jumeirah and Ain Dubai with Sobha signature German craftsmanship.',
    roi: '9.1% Projected Gross Yield',
    features: ['Dual 360-Degree Views', 'Cruise Terminal Adjacency', 'Triple-Height Atrium', 'Private Cinema Lounge'],
    milestones: [
      { phase: 'Deposit', percentage: 10, description: 'Instant allocation' },
      { phase: 'Structural Calls', percentage: 50, description: 'Aligned to RERA inspection milestones' },
      { phase: 'Key Release', percentage: 40, description: 'December 2026 handover' },
    ],
  },
  {
    id: 'the-lana-residences',
    name: 'The Lana Residences (Dorchester)',
    developer: 'Omniyat',
    enclave: 'Downtown Dubai',
    priceAED: 18500000,
    priceUSD: 5035000,
    paymentPlan: '50 / 50 Milestones',
    handover: 'Q1 2027',
    bedrooms: '3 - 6 Bed Trophy Penthouses',
    type: 'Ultra-Luxury',
    badge: 'TROPHY ASSET',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    description: 'Managed exclusively by Dorchester Collection. Bespoke Gilles & Boissier French interiors, private yacht berths, and Michelin-star room service.',
    roi: '7.8% Capital Growth Focused',
    features: ['Dorchester White-Glove Hospitality', 'Private Pool Terraces', 'Bespoke Wine Cellars', 'VIP Concierge'],
    milestones: [
      { phase: 'Private Allocation', percentage: 15, description: 'Executed under priority terms' },
      { phase: 'Construction Tranches', percentage: 35, description: 'Escrow account disbursements' },
      { phase: 'Title Deed Handover', percentage: 50, description: 'Oqood to Title Deed conversion' },
    ],
  },
  {
    id: 'dubai-islands-bay-mansions',
    name: 'Dubai Islands Bay Mansions',
    developer: 'Nakheel',
    enclave: 'Dubai Islands',
    priceAED: 6400000,
    priceUSD: 1740000,
    paymentPlan: '70 / 30 On Handover',
    handover: 'Q3 2028',
    bedrooms: '3 - 5 Bed Beachfront Mansions',
    type: 'Island Living',
    badge: 'NEW LAUNCH',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    description: 'Exclusive beachfront sanctuary across Dubai’s newest coastal archipelago with private boat docking, resort wellness facilities, and expansive gardens.',
    roi: '10.2% Projected Yield',
    features: ['20km Pristine Beaches', 'Golf Course Proximity', 'Private Boat Moorings', 'Resort Concierge'],
    milestones: [
      { phase: 'Booking', percentage: 10, description: '10% on booking' },
      { phase: 'Milestones', percentage: 60, description: 'Linked to foundation and structural milestones' },
      { phase: 'Handover', percentage: 30, description: 'Upon completion Q3 2028' },
    ],
  },
  {
    id: 'hills-park-residences',
    name: 'Hills Park Horizon',
    developer: 'Emaar Properties',
    enclave: 'Dubai Hills Estate',
    priceAED: 1950000,
    priceUSD: 530000,
    paymentPlan: '80 / 20 Handover',
    handover: 'Q2 2027',
    bedrooms: '1 - 3 Bed Green Living Apts',
    type: 'Family Living',
    badge: 'PARK FRONT',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600&auto=format&fit=crop',
    description: 'Overlooking Dubai Hills Park and 18-hole championship golf course, featuring modern layouts, lush jogging trails, and minutes to Dubai Hills Mall.',
    roi: '8.5% Rental Yield',
    features: ['Dubai Hills Park Views', 'Championship Golf Course', 'Direct Mall Access', 'Kids Splash Pads'],
    milestones: [
      { phase: 'Reservation', percentage: 10, description: '10% down' },
      { phase: 'Construction', percentage: 70, description: '10% every 4 months' },
      { phase: 'Handover', percentage: 20, description: 'Key release Q2 2027' },
    ],
  },
  {
    id: 'creek-waters-haven',
    name: 'Creek Waters Luxury Tower',
    developer: 'Emaar Properties',
    enclave: 'Dubai Creek Harbour',
    priceAED: 2300000,
    priceUSD: 626000,
    paymentPlan: '70 / 30 On Handover',
    handover: 'Q4 2027',
    bedrooms: '1 - 4 Bed Waterfront Suites',
    type: 'Waterfront Urban',
    badge: 'CREEK VIEW',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1600&auto=format&fit=crop',
    description: 'Glamorous island living at Dubai Creek Harbour with skyline panoramas of Downtown Dubai, marina promenades, and fine waterfront dining.',
    roi: '8.9% Projected Yield',
    features: ['Full Downtown Skyline View', 'Infinity Edge Marina Pool', 'Flamingo Sanctuary Adjacency', 'Metro Connection'],
    milestones: [
      { phase: 'Down Payment', percentage: 10, description: 'Immediate reservation' },
      { phase: 'Construction', percentage: 60, description: 'Structured payment milestones' },
      { phase: 'Handover', percentage: 30, description: 'Completion Q4 2027' },
    ],
  },
];

export const DEVELOPERS_DATA: Developer[] = [
  {
    name: 'Emaar Properties',
    tagline: 'The Master Pioneer Behind Downtown Dubai & Dubai Marina',
    stats: '108,000+ Units Delivered',
    tier: 'Government Tier 1 Master Builder',
    flagship: 'Burj Khalifa, Downtown Dubai, Dubai Creek Harbour, Dubai Hills Estate',
    logoText: 'EMAAR',
    description: 'Founded in 1997, Emaar is the cornerstone of Dubai’s global urban transformation, delivering world-renowned landmarks and community living.',
    founded: '1997',
  },
  {
    name: 'Nakheel',
    tagline: 'Visionaries of Palm Jumeirah & Dubai Islands',
    stats: 'World-Renowned Waterfront Masterplans',
    tier: 'Government Master Developer',
    flagship: 'Palm Jumeirah, Palm Jebel Ali, Dubai Islands',
    logoText: 'NAKHEEL',
    description: 'Pioneered landmark coastal developments adding over 300km of coastline to Dubai, including the world-famous Palm Jumeirah.',
    founded: '2000',
  },
  {
    name: 'Omniyat',
    tagline: 'Architectural Sculptures with Dorchester Collection',
    stats: 'Ultra-High-Net-Worth Benchmark',
    tier: 'Ultra-Luxury Boutique Mastermind',
    flagship: 'The Opus by Zaha Hadid, One at Palm Jumeirah, The Lana',
    logoText: 'OMNIYAT',
    description: 'Renowned for treating real estate as fine art, collaborating with world icons like Zaha Hadid, Norman Foster, and Dorchester Collection.',
    founded: '2005',
  },
  {
    name: 'DAMAC Properties',
    tagline: 'High-Fashion Branded Residences (Cavalli, de GRISOGONO)',
    stats: '46,000+ Homes Delivered',
    tier: 'Branded Luxury Master Developer',
    flagship: 'DAMAC Lagoons, Cavalli Tower, Canal Crown, Safa One',
    logoText: 'DAMAC',
    description: 'A global leader in branded luxury real estate, partnering with iconic fashion houses to deliver statement towers and resort communities.',
    founded: '2002',
  },
  {
    name: 'Sobha Realty',
    tagline: 'Backward-Integrated Precision Craftsmanship',
    stats: 'In-House Architectural Precision',
    tier: 'Signature Quality Developer',
    flagship: 'Sobha Hartland, Seahaven, Sobha Estates, Verde',
    logoText: 'SOBHA',
    description: 'Renowned for its unique self-reliant construction model, ensuring 100% internal control of materials, joinery, and engineering standards.',
    founded: '1976',
  },
  {
    name: 'Meraas',
    tagline: 'Creators of City Walk, Bluewaters, and Jumeirah Bay Island',
    stats: 'Dubai Holding Portfolio',
    tier: 'Lifestyle Icon Developer',
    flagship: 'Bulgari Residences, Bluewaters Island, Central Park City Walk',
    logoText: 'MERAAS',
    description: 'Part of Dubai Holding, Meraas crafts iconic urban destinations that define luxury tourism, high-end retail, and waterfront living in the UAE.',
    founded: '2007',
  },
  {
    name: 'Select Group',
    tagline: 'Premium Waterfront Living across Dubai Marina & Palm',
    stats: 'Award-Winning Delivery Record',
    tier: 'Premier Waterfront Specialist',
    flagship: 'The Edge, Peninsula Business Bay, Six Senses Residences Palm',
    logoText: 'SELECT GROUP',
    description: 'Known for high capital appreciation, on-time project execution, and prime waterfront developments in Dubai Marina and Business Bay.',
    founded: '2002',
  },
  {
    name: 'Ellington Properties',
    tagline: 'Design-Led Boutique Residences with Artistic Refinement',
    stats: 'High Rental Yield Specialty',
    tier: 'Boutique Design Champion',
    flagship: 'One River Point, Mercer House, Wilton Terraces, Belgravia',
    logoText: 'ELLINGTON',
    description: 'Dubai’s leading design-centric developer, recognized for hotel-grade amenities, artisanal detailing, and strong tenant demand.',
    founded: '2014',
  },
  {
    name: 'Aldar Properties',
    tagline: 'Leading UAE Master Builder Expanding Across Prime Dubai',
    stats: 'AED 30B+ Development Pipeline',
    tier: 'Sovereign-Backed Developer',
    flagship: 'Haven by Aldar, Athlon Dubai, Yas Island',
    logoText: 'ALDAR',
    description: 'Abu Dhabi’s foremost sovereign developer, now bringing sustainable wellness communities and master developments into Dubai.',
    founded: '2004',
  },
  {
    name: 'Binghatti Developers',
    tagline: 'Branded Automotive & Horology Architecture',
    stats: 'Speed of Delivery Leader',
    tier: 'Hyper-Luxury Branded Specialist',
    flagship: 'Bugatti Residences, Mercedes-Benz Places, Burj Binghatti Jacob & Co',
    logoText: 'BINGHATTI',
    description: 'Pioneered hyper-branded residences with global icons Bugatti, Mercedes-Benz, and Jacob & Co, defining skyline landmarks in Business Bay.',
    founded: '2008',
  },
];

export const ENCLAVES_DATA: Enclave[] = [
  {
    name: 'Downtown Dubai & DIFC',
    tag: 'FINANCIAL & OPERA EPICENTER',
    yoyGrowth: '+14.2% YoY',
    developers: 'Emaar, Omniyat, H&H',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1600&auto=format&fit=crop',
    description: 'The center of luxury living featuring Burj Khalifa views, the Dubai Opera District, and direct access to DIFC corporate hubs.',
    startingPrice: 'From AED 2.4M',
  },
  {
    name: 'Palm Jumeirah & Jumeirah Bay',
    tag: 'WATERFRONT PRESTIGE',
    yoyGrowth: '+18.8% YoY',
    developers: 'Nakheel, Meraas, Omniyat',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1600&auto=format&fit=crop',
    description: 'Globally renowned island delivering beachfront residences, private deep-water yacht berths, and unmatched prestige.',
    startingPrice: 'From AED 4.8M',
  },
  {
    name: 'Dubai Hills Estate',
    tag: 'THE GREEN HEART OF DUBAI',
    yoyGrowth: '+12.5% YoY',
    developers: 'Emaar Properties',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    description: 'Master-planned family community with an 18-hole championship golf course, King’s College Hospital, and sprawling linear parks.',
    startingPrice: 'From AED 1.8M',
  },
  {
    name: 'Dubai Islands Archipelago',
    tag: 'NEW COASTAL FRONTIER',
    yoyGrowth: '+21.4% YoY',
    developers: 'Nakheel',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop',
    description: 'Dubai’s most anticipated coastal destination featuring 20 kilometers of beaches, eco-resorts, and resort-style living.',
    startingPrice: 'From AED 2.1M',
  },
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'regulatory-advisory-2026',
    category: 'Market Guide',
    date: 'February 2026',
    readTime: '6 min read',
    title: "Dubai's Off-Plan Market: What International Buyers Need to Know",
    excerpt: 'A practical overview of purchasing off-plan property in Dubai, Oqood registration, and how the Dubai Land Department protects buyer funds.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    content: `Dubai continues to set the global benchmark for international real estate investment. Driven by Law No. 8 of 2007, every single off-plan development is mandated to maintain an independent Escrow Account overseen strictly by the Real Estate Regulatory Agency (RERA).

Key protection points for foreign investors:
1. Escrow Guarantee: Developer can only withdraw funds strictly according to verified third-party engineering progress certificates.
2. Oqood Registration: Within 30 days of reservation, your interim title deed is cataloged on the Dubai Land Department ledger.
3. 10-Year Golden Visa: Property investment of AED 2,000,000 or above entitles investors to 100% residency without local sponsorship.`,
  },
  {
    id: 'payment-plans-escrow-security',
    category: 'Financing Guide',
    date: 'January 2026',
    readTime: '8 min read',
    title: 'The Practical Guide to Off-Plan Payment Plans & Escrow Security',
    excerpt: 'How Law No. 8 of 2007 safeguards buyer deposits through RERA trust accounts and how to compare 50/50, 60/40, and 70/30 schedules.',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1600&auto=format&fit=crop',
    content: `Understanding Dubai off-plan payment structures is essential for planning cash flows and maximizing returns. Unlike secondary purchases requiring immediate 100% capital deployment, off-plan permits staggered installments throughout the construction timeline.

Milestone breakdown:
- 10% to 20% Initial Booking Deposit
- 40% to 60% construction-linked payments over 2 to 4 years
- 30% to 40% on Key Handover, eligible for mortgage refinancing up to 50%-80% LTV from top UAE banks (Emirates NBD, FAB, Dubai Islamic Bank).`,
  },
  {
    id: 'waterfront-communities-growth',
    category: 'Market Trends',
    date: 'January 2026',
    readTime: '5 min read',
    title: 'Top Emerging Waterfront Communities in Dubai for 2026',
    excerpt: 'Why Dubai Islands, Palm Jebel Ali, and Dubai Canal continue to attract high capital appreciation compared to mature inland locations.',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop',
    content: `Waterfront real estate in Dubai represents a small, highly sought-after percentage of total residential supply, maintaining strong price resilience.

Key areas to explore:
1. Dubai Islands: 5 islands, 20km of clean beachfronts, and new luxury resort developments.
2. Palm Jebel Ali: Double the surface area of Palm Jumeirah, featuring ultra-exclusive villas.
3. Dubai Water Canal: Prime waterfront corridor linking Business Bay and Downtown to the Arabian Gulf.`,
  },
];
