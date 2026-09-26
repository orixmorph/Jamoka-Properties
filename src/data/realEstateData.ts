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
  image: string; // Default/fallback image
  coverImage?: string; // Card cover photo on listing grid
  heroImage?: string; // High-resolution hero image inside detailed modal window
  area?: string; // e.g. "1,200 – 4,800 sq.ft"
  tagline?: string; // e.g. "Waterfront Living for Select Group", "Sky Suites"
  tags?: string[];
  description: string;
  roi?: string;
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
    id: 'baserow-1',
    name: '995',
    developer: 'Reef Luxury Developments',
    enclave: 'DLRC',
    priceAED: 696000,
    priceUSD: 189500,
    paymentPlan: '60 / 40 Handover',
    handover: 'Q4 2028',
    bedrooms: 'Studio',
    type: 'Climate Controled Balcony',
    badge: 'REEF LUXURY',
    tagline: 'Climate Controled Balcony',
    area: '450 – 580 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/yKxYK1IuUBOeUVgvGhglnRqSdkQsfyol_37c91f52d80bfad6d2471768af744d31cd81696a9cf627d77011e280d6f99ebe.png',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/yKxYK1IuUBOeUVgvGhglnRqSdkQsfyol_37c91f52d80bfad6d2471768af744d31cd81696a9cf627d77011e280d6f99ebe.png',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/I05nxiSKNVkoQ1ey2jsaHfXZwxlbT7Ia_b2e93ef95e2759f9c096bd129b2301e51d72602fd278dfc38818c8728d93c450.png',
    description: 'REEF 995 is a contemporary residential development in Dubailand Residence Complex, bringing together modern apartments with a strong focus on wellness, comfort and innovative living. The project offers studios, 1, 2 and 3-bedroom residences, complemented by amenities including an infinity pool, AI-powered gym, cryotherapy, hyperbaric oxygen therapy, yoga spaces and more. REEF’s focus on creating year-round lifestyle experiences is reflected throughout the development, making REEF 995 an appealing choice for both end users and investors',
    features: ['Climate Controlled Balcony', 'AI-Powered Gym', 'Cryotherapy & Wellness Deck', 'Infinity Swimming Pool'],
    milestones: [
      { phase: 'Booking Deposit', percentage: 10, description: 'Immediate reservation' },
      { phase: 'During Construction', percentage: 50, description: 'Linked to certified RERA construction milestones' },
      { phase: 'Upon Key Handover', percentage: 40, description: 'Q4 2028 completion balance' },
    ],
  },
  {
    id: 'baserow-2',
    name: 'Alva',
    developer: 'Emaar Developments',
    enclave: 'The Valley',
    priceAED: 4300000,
    priceUSD: 1170000,
    paymentPlan: '80 / 20 Handover',
    handover: 'Q4 2030',
    bedrooms: '3 Beds',
    type: 'Family Living / Luxury',
    badge: 'EMAAR EXCLUSIVE',
    tagline: 'Family Living / Luxury',
    area: '1,980 – 2,750 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/OaQFakdU7x9E7IklRmBfnFH5ta6bpOVE_241c22633a5a39312e73cd32789403eca2cd9bd03008f76fa5b3562be7d15de0.webp',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/OaQFakdU7x9E7IklRmBfnFH5ta6bpOVE_241c22633a5a39312e73cd32789403eca2cd9bd03008f76fa5b3562be7d15de0.webp',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/lS8EWUeHK5OYqExR1QddxoDxhKb369kP_2223012f6b9db4560bbfa819c725e8c9efa52e25d8fb8d0d65ef7f7384c67803.jpg',
    description: 'ALVA is a collection of contemporary 3 and 4-bedroom townhouses within Emaar’s The Valley community. Designed around open landscapes, greenery and family-oriented living, the development combines modern architecture with access to parks, walking and cycling routes, retail, dining and recreational destinations. Its location along the Dubai–Al Ain Road corridor provides connectivity to key areas of Dubai while maintaining the quieter, community-focused character of The Valley.',
    features: ['Emaar Master Community', 'Expansive Green Parks', 'Golden Beach Access', 'Sports Village'],
    milestones: [
      { phase: 'Initial Allocation', percentage: 10, description: 'Priority reservation' },
      { phase: 'Milestone Instalments', percentage: 70, description: 'Structured instalments through 2030' },
      { phase: 'Completion & Deeds', percentage: 20, description: 'Handover Q4 2030' },
    ],
  },
  {
    id: 'baserow-3',
    name: 'Valia',
    developer: 'Emaar Developments',
    enclave: 'Downtown',
    priceAED: 2060000,
    priceUSD: 561000,
    paymentPlan: '80 / 20 Handover',
    handover: 'Q4 2030',
    bedrooms: '1 Beds',
    type: 'Family Living',
    badge: 'DOWNTOWN ICON',
    tagline: 'Family Living',
    area: '780 – 950 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/XAHnpnIJHhORGzrieIk7UjjkBaTyvjZP_f5e21302ee2740de02a60774770697c9998ae062f6d42885f6dc438512fd2db7.jpeg',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/XAHnpnIJHhORGzrieIk7UjjkBaTyvjZP_f5e21302ee2740de02a60774770697c9998ae062f6d42885f6dc438512fd2db7.jpeg',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/XAHnpnIJHhORGzrieIk7UjjkBaTyvjZP_f5e21302ee2740de02a60774770697c9998ae062f6d42885f6dc438512fd2db7.jpeg',
    description: 'Valia by Emaar is a contemporary residential development in Dubai Creek Harbour, offering thoughtfully designed residences in one of Dubai’s emerging waterfront destinations. The project combines modern architecture, expansive views and lifestyle-focused amenities with the wider community’s waterfront promenade, retail, dining and recreational experiences. Its location within Dubai Creek Harbour also places residents close to major road networks and key areas of the city, creating a balance between waterfront living and everyday connectivity.',
    features: ['Dubai Creek Harbour Promenade', 'Waterfront Living', 'Infinity Pool & Wellness Deck', 'High Capital Appreciation'],
    milestones: [
      { phase: 'Reservation', percentage: 10, description: 'Immediate allocation' },
      { phase: 'Construction Tranches', percentage: 70, description: 'Staggered over build schedule' },
      { phase: 'Key Release', percentage: 20, description: 'Final handover Q4 2030' },
    ],
  },
  {
    id: 'baserow-4',
    name: 'Violet 4',
    developer: 'Damac Properties',
    enclave: 'Damac hills 2',
    priceAED: 2200000,
    priceUSD: 599000,
    paymentPlan: '60 / 40 Handover',
    handover: 'Q4 2030',
    bedrooms: '4 Beds',
    type: 'Community Living',
    badge: 'DAMAC EXCLUSIVE',
    tagline: 'Community Living',
    area: '2,350 – 2,900 sq.ft',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
    description: 'Violet 4 by DAMAC is a collection of contemporary 4-bedroom townhouses within the established DAMAC Hills 2 community. Designed with families in mind, the development offers spacious residences surrounded by landscaped areas and a wide range of leisure and recreational facilities. Residents can enjoy access to the community’s pools, sports facilities, parks and family attractions, creating a lifestyle that combines residential comfort with resort-style amenities. The development also benefits from DAMAC Hills 2’s growing community infrastructure and connectivity across Dubai.',
    features: ['Damac Hills 2 Master Plan', 'Water Town & Wave Surfing', 'Private Garden Plots', 'Equestrian Trails'],
    milestones: [
      { phase: 'Booking', percentage: 10, description: 'Immediate allocation' },
      { phase: 'Construction', percentage: 50, description: 'Structured payment milestones' },
      { phase: 'Key Handover', percentage: 40, description: 'Upon completion Q4 2030' },
    ],
  },
  {
    id: 'baserow-5',
    name: 'Chelsea Residences',
    developer: 'Damac Properties',
    enclave: 'Maritime city',
    priceAED: 2500000,
    priceUSD: 680000,
    paymentPlan: '60 / 40 Handover',
    handover: 'Q4 2030',
    bedrooms: '1 Beds',
    type: 'Sea View free / golden visa',
    badge: 'GOLDEN VISA',
    tagline: 'Sea View free / golden visa',
    area: '820 – 1,150 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/resjTdcr9bHLafL0OPvsTNTKuSRPZg5t_c004fc18eadfa55b810a5f0fdc7d05de2db6675f4d4fc5d07990a14d97db5f8e.jpeg',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/resjTdcr9bHLafL0OPvsTNTKuSRPZg5t_c004fc18eadfa55b810a5f0fdc7d05de2db6675f4d4fc5d07990a14d97db5f8e.jpeg',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/resjTdcr9bHLafL0OPvsTNTKuSRPZg5t_c004fc18eadfa55b810a5f0fdc7d05de2db6675f4d4fc5d07990a14d97db5f8e.jpeg',
    description: 'Chelsea Residences by DAMAC brings the world of Chelsea Football Club into a distinctive waterfront residential development in Dubai Maritime City. The project combines football-inspired design with contemporary residences, sea-facing surroundings and a range of wellness, leisure and lifestyle amenities. Developed through the collaboration between DAMAC and Chelsea FC, the project is designed around a branded living experience while benefiting from its location within Dubai Maritime City, close to Dubai’s central districts and waterfront destinations',
    features: ['Chelsea FC Branded Living', 'Panoramic Arabian Gulf Views', 'UAE 10-Year Golden Visa', 'Luxury Wellness Concierge'],
    milestones: [
      { phase: 'Reservation', percentage: 10, description: 'Immediate allocation' },
      { phase: 'Construction Tranches', percentage: 50, description: 'Linked to foundation and superstructure' },
      { phase: 'Completion Handover', percentage: 40, description: 'Handover Q4 2030' },
    ],
  },
  {
    id: 'baserow-6',
    name: 'Sobha Sanctuary',
    developer: 'Sobha Realty',
    enclave: 'Al Ain Road',
    priceAED: 4200000,
    priceUSD: 1143000,
    paymentPlan: '40 / 60 Handover',
    handover: 'Q4 2029',
    bedrooms: '4 Beds',
    type: 'Green Living',
    badge: 'GREEN LIVING',
    tagline: 'Green Living',
    area: '3,800 – 5,200 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/s16tkyGks0EXFqobfaBXwDGjlxP1WQf5_a240db0b4f3dcf04757fdede9d0a4c948a67962d7a8fb0fea23a7004b970bd0a.jpeg',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/s16tkyGks0EXFqobfaBXwDGjlxP1WQf5_a240db0b4f3dcf04757fdede9d0a4c948a67962d7a8fb0fea23a7004b970bd0a.jpeg',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/N5s42FDjy9OPsamFImccKfRNrfb6LPD1_101883c531108b169572a71b25f2c0898a405da97ae857b8f0495e8473546699.jpeg',
    description: 'Sobha Sanctuary is a premium villa community by Sobha Realty designed around nature, privacy and elevated family living. The masterplan integrates contemporary villas with landscaped spaces, greenery, water features and dedicated recreational areas, creating a more tranquil residential environment away from the intensity of central Dubai. With its focus on open spaces, wellness and community living, Sobha Sanctuary is positioned as a private residential destination for families looking for larger homes and a more nature-led lifestyle.',
    features: ['Signature German Craftsmanship', 'Crystal Lagoon Access', 'Forest Canopy Walking Trails', 'Private Clubhouse'],
    milestones: [
      { phase: 'Booking', percentage: 10, description: 'Instant allocation' },
      { phase: 'During Construction', percentage: 30, description: 'Structured milestone disbursements' },
      { phase: 'Handover Balance', percentage: 60, description: 'Key release Q4 2029' },
    ],
  },
  {
    id: 'baserow-7',
    name: 'Sobah Central',
    developer: 'Sobha Realty',
    enclave: 'SZR',
    priceAED: 1500000,
    priceUSD: 408000,
    paymentPlan: '40 / 60 Handover',
    handover: 'Q4 2029',
    bedrooms: '1 Beds',
    type: 'Amenities',
    badge: 'PRIME SZR',
    tagline: 'Amenities',
    area: '750 – 1,100 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/3OXiwPr9z5gcIdVbVMlYtm6ZQBi3lcAU_9283a0373d6491468115060d2e4f55e7cc36c258ee33b10d5316765cd38b227b.webp',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/3OXiwPr9z5gcIdVbVMlYtm6ZQBi3lcAU_9283a0373d6491468115060d2e4f55e7cc36c258ee33b10d5316765cd38b227b.webp',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/3OXiwPr9z5gcIdVbVMlYtm6ZQBi3lcAU_9283a0373d6491468115060d2e4f55e7cc36c258ee33b10d5316765cd38b227b.webp',
    description: 'Sobha Central is a large-scale urban development by Sobha Realty, located along Sheikh Zayed Road and designed around modern city living. The development brings together residential towers with landscaped spaces, elevated parks, retail and lifestyle amenities, creating a connected environment within one of Dubai’s most established corridors. Its strategic location provides convenient access to major business, entertainment and residential districts, while the development itself is planned to bring green spaces and everyday amenities closer to residents.',
    features: ['Direct SZR Highway Access', 'Sky Pool & Observation Deck', 'High-Speed Elevators', 'DLD Escrow Protection'],
    milestones: [
      { phase: 'Down Payment', percentage: 10, description: 'Immediate reservation' },
      { phase: 'Construction', percentage: 30, description: 'Linked to certified progress' },
      { phase: 'Key Handover', percentage: 60, description: 'Completion Q4 2029' },
    ],
  },
  {
    id: 'baserow-8',
    name: 'Mercedes-Benz Places',
    developer: 'Binghatti Developers',
    enclave: 'Meydan',
    priceAED: 1250000,
    priceUSD: 340000,
    paymentPlan: '50 / 50 Handover',
    handover: 'Q4 2029',
    bedrooms: 'Studio',
    type: 'Mercedes Branded',
    badge: 'MERCEDES-BENZ',
    tagline: 'Mercedes Branded',
    area: '520 – 720 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/OODBRHEoELtHRblomt5ppToj5RACO8sx_ede5d5e7182f6813007cb2fac10773a1ad296634e62d8f7b380efc486b7c34aa.jpg',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/OODBRHEoELtHRblomt5ppToj5RACO8sx_ede5d5e7182f6813007cb2fac10773a1ad296634e62d8f7b380efc486b7c34aa.jpg',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/OODBRHEoELtHRblomt5ppToj5RACO8sx_ede5d5e7182f6813007cb2fac10773a1ad296634e62d8f7b380efc486b7c34aa.jpg',
    description: 'Mercedes-Benz Places | Binghatti is a landmark branded development created through the collaboration between Mercedes-Benz and Binghatti. Located in Meydan, the project brings together Mercedes-Benz’s design philosophy, technology and luxury with Binghatti’s approach to high-rise development. The wider Mercedes-Benz Places concept has been expanded into Mercedes-Benz Places | Binghatti City, a major master-planned development in Nad Al Sheba. The project represents a distinctive intersection of automotive design, architecture, technology and luxury real estate.',
    features: ['Mercedes-Benz Branded Architecture', 'Burj Khalifa Frontage', 'Private Cantilevered Pools', 'Smart Automotive Valet'],
    milestones: [
      { phase: 'Booking', percentage: 10, description: 'Priority tier reservation' },
      { phase: 'During Construction', percentage: 40, description: 'Structured milestone payments' },
      { phase: 'Final Handover', percentage: 50, description: 'Handover Q4 2029' },
    ],
  },
  {
    id: 'baserow-9',
    name: 'Starfall',
    developer: 'Binghatti Developers',
    enclave: 'Al Jaddaf',
    priceAED: 785000,
    priceUSD: 213000,
    paymentPlan: '50 / 50 Handover',
    handover: 'Q4 2029',
    bedrooms: 'Studio',
    type: 'Amenities',
    badge: 'BINGHATTI',
    tagline: 'Amenities',
    area: '460 – 620 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/l3yxF0LdZ8foTv2BjE1lTUYHQ7wGuUze_a38b89805353bd6323a8421574ecfb89bcccfa87522ff6f14b10fa41276a7082.webp',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/l3yxF0LdZ8foTv2BjE1lTUYHQ7wGuUze_a38b89805353bd6323a8421574ecfb89bcccfa87522ff6f14b10fa41276a7082.webp',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/l3yxF0LdZ8foTv2BjE1lTUYHQ7wGuUze_a38b89805353bd6323a8421574ecfb89bcccfa87522ff6f14b10fa41276a7082.webp',
    description: 'Binghatti Starfall is a contemporary residential development designed around modern architecture, elevated amenities and a connected urban lifestyle. Located in Al Jaddaf along Sheikh Rashid Road, the project benefits from its position between established Dubai districts and emerging waterfront destinations. Its architecture incorporates extensive glass elements and modern forms, while the development provides residents with a collection of leisure, wellness and lifestyle facilities. The location also offers views toward Dubai’s skyline, Dubai Creek Harbour and the surrounding waterfront.',
    features: ['Dubai Creek Proximity', 'Infinity Horizon Pool', 'State-of-the-Art Gymnasium', 'Retail & Dining Promenade'],
    milestones: [
      { phase: 'Reservation', percentage: 10, description: 'Immediate allocation' },
      { phase: 'Construction Tranches', percentage: 40, description: 'Linked to structural milestones' },
      { phase: 'Upon Key Handover', percentage: 50, description: 'Final release Q4 2029' },
    ],
  },
  {
    id: 'baserow-10',
    name: 'Bay Estate',
    developer: 'Nakheel',
    enclave: 'Dubai Island',
    priceAED: 5900000,
    priceUSD: 1606000,
    paymentPlan: '60 / 40 Handover',
    handover: 'Q4 2031',
    bedrooms: '3 Beds',
    type: 'Island Living',
    badge: 'ISLAND MANSIONS',
    tagline: 'Island Living',
    area: '3,200 – 4,600 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/VXFZPoOtKgNyjdL8wq3AbFjQmXGzFakd_2d61eebbcb8fa69db30fe010aba9df081b1e7c2d488e632cb7511b4d7eba950f.jpg',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/VXFZPoOtKgNyjdL8wq3AbFjQmXGzFakd_2d61eebbcb8fa69db30fe010aba9df081b1e7c2d488e632cb7511b4d7eba950f.jpg',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/VXFZPoOtKgNyjdL8wq3AbFjQmXGzFakd_2d61eebbcb8fa69db30fe010aba9df081b1e7c2d488e632cb7511b4d7eba950f.jpg',
    description: 'Bay Estate by Nakheel is an exclusive waterfront residential development located on Dubai Islands. The project features a collection of spacious villas and townhouses designed around coastal living, privacy and contemporary architecture. Its island setting offers residents a quieter waterfront environment while remaining connected to the wider city. With landscaped surroundings, premium residences and proximity to Dubai Islands’ emerging beachfront, hospitality and leisure destinations, Bay Estate is positioned for buyers looking for a more private and spacious waterfront lifestyle.',
    features: ['Private Island Beachfront', 'Yacht Berth Privileges', 'Championship Golf Access', '20km Coastal Boardwalk'],
    milestones: [
      { phase: 'Booking Deposit', percentage: 10, description: 'Immediate reservation' },
      { phase: 'Construction Calls', percentage: 50, description: 'Distributed construction calls' },
      { phase: 'Completion Handover', percentage: 40, description: 'Key release Q4 2031' },
    ],
  },
  {
    id: 'baserow-11',
    name: 'Azizi Florence',
    developer: 'Azizi',
    enclave: 'Sharjah',
    priceAED: 1900000,
    priceUSD: 517000,
    paymentPlan: '30 / 70 Handover',
    handover: 'Q4 2029',
    bedrooms: '3 Beds',
    type: 'Community',
    badge: 'AZIZI COLLECTION',
    tagline: 'Community',
    area: '1,600 – 2,400 sq.ft',
    image: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/x6pnzyp0qD2SVzP8HRxRtE9MpoBtrzWL_299aeded768a9380bb8b1a8fef5bcca62671e953552cddc3c41f4754a38a233f.webp',
    coverImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/x6pnzyp0qD2SVzP8HRxRtE9MpoBtrzWL_299aeded768a9380bb8b1a8fef5bcca62671e953552cddc3c41f4754a38a233f.webp',
    heroImage: 'https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/SCubQ2VZbMlLCTj3SqOp0OMj5P8R6QNh_642d3a0cdfc2e16a50438726cb0a51ec7e67f689c0518fef866043bcf9637b68.jpg',
    description: 'Azizi Florence is a large-scale master-planned community in Sharjah, spanning approximately 30 million square feet and planned across six residential districts. The development brings together villas, townhouses and apartments alongside extensive green spaces, community facilities, retail and lifestyle amenities. A central park forms a major part of the masterplan, while direct access to E311 provides connectivity toward Sharjah, Dubai and the wider UAE. With its focus on greenery, family living and integrated amenities, Florence is planned as a complete residential destination rather than a standalone development.',
    features: ['Italian-Inspired Architecture', '30 / 70 Investor Plan', 'Central Landscaped Park', 'Retail & Promenade'],
    milestones: [
      { phase: 'Booking', percentage: 10, description: 'Immediate allocation' },
      { phase: 'During Construction', percentage: 20, description: 'Milestone instalments' },
      { phase: 'Handover Balance', percentage: 70, description: 'Completion Q4 2029' },
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
