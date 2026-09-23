export interface JobPosition {
  id: string;
  slug: 'real-estate-agent' | 'social-media-content-creator';
  title: string;
  department: string;
  location: string;
  type: string;
  compensationHighlight: string;
  badge: string;
  shortDescription: string;
  keyPerks: { title: string; desc: string }[];
  aboutRole: string[];
  responsibilities: string[];
  requirements: string[];
  whatWeOffer: string[];
}

export const OPEN_POSITIONS: JobPosition[] = [
  {
    id: 'pos-1',
    slug: 'real-estate-agent',
    title: 'Real Estate Agent',
    department: 'Sales & Advisory',
    location: 'Business Bay, Dubai, UAE',
    type: 'Full-time / On-site',
    compensationHighlight: 'Attractive Salary & Benefits + Up to 70% Commission (Paid On Spot)',
    badge: 'High Earning Potential',
    shortDescription:
      "Join our elite sales desk in Business Bay. Benefit from an attractive salary & benefits package, aggressive commission payouts up to 70% paid on spot, qualified investor leads, and direct VIP allocations with Dubai's top developers.",
    keyPerks: [
      {
        title: 'Attractive Salary & Benefits',
        desc: 'Competitive base package with comprehensive UAE employment visa, health insurance, and performance bonuses.',
      },
      {
        title: 'Up to 70% Commission (Paid On Spot)',
        desc: 'Aggressive commission payouts up to 70% paid on the spot on every closed transaction.',
      },
      {
        title: 'Qualified Pre-Vetted Leads',
        desc: 'Daily marketing-generated high-intent buyer and investor inquiries so you spend time closing deals.',
      },
      {
        title: 'Direct Developer Access',
        desc: 'VIP launch allocations with Emaar, Sobha, DAMAC, Nakheel, Ellington, Meraas, and boutique luxury developers.',
      },
    ],
    aboutRole: [
      'Jamoka Properties is expanding its high-performing luxury sales desk in Dubai. We are actively hiring ambitious, client-focused Real Estate Agents who want to scale their income and build a premier portfolio in the world’s most active property market.',
      'You will be backed by a full creative production house, in-house lead generation engines, proprietary CRM tools, and hands-on transaction advisory. We provide everything you need to win listings, host private client viewings, and close seven- and eight-figure deals.',
    ],
    responsibilities: [
      'Engage and qualify inbound high-net-worth investor and end-user leads provided by our marketing team',
      'Conduct professional property viewings and VIP private consultations across Dubai’s prime communities',
      'Guide buyers and international investors through off-plan payment plans, ROI forecasts, and legal formalities',
      'Maintain strong relationships with institutional developers and master planners across the UAE',
      'Negotiate terms and facilitate smooth transaction closings with buyer and seller parties',
      'Manage client relationships and sales pipeline within our dedicated real estate CRM',
      'Stay updated on Dubai Land Department (DLD) regulations, Golden Visa rules, and emerging off-plan launches',
      'Collaborate closely with our in-house media team for personal brand filming, video tours, and property features',
    ],
    requirements: [
      'Proven track record in sales, luxury retail, or real estate brokerage (Dubai market experience is a strong plus)',
      'Valid RERA card or willingness to obtain one (full company assistance provided)',
      'Exceptional interpersonal, negotiation, and closing abilities',
      'Professional presentation, proactive work ethic, and client-first mindset',
      'Fluency in English (Arabic, Russian, French, German, or other languages are highly advantageous)',
      'Valid UAE driving license and reliable transportation preferred',
    ],
    whatWeOffer: [
      'Attractive Salary & Benefits Package + Aggressive commission payouts up to 70% paid on spot',
      'Full UAE Employment Visa & comprehensive medical health insurance',
      'Continuous daily flow of verified digital marketing leads (Google, Meta, TikTok)',
      'In-house media & content production crew to shoot your property videos and build your personal brand',
      'Direct developer partnerships & privileged launch allocations across Dubai',
      'Luxury headquarters in Bayswater Tower, Business Bay overlooking Dubai Canal',
      'Sim card, marketing collateral, CRM subscription, and listing portal sponsorships (Property Finder & Bayut)',
      'Clear progression pathway to Senior Wealth Advisor and Sales Team Director',
    ],
  },
  {
    id: 'pos-2',
    slug: 'social-media-content-creator',
    title: 'Social Media Content Creator',
    department: 'Creative & Marketing',
    location: 'Business Bay, Dubai, UAE',
    type: 'Full-time / On-site & Shoots',
    compensationHighlight: 'Competitive Salary + Performance Bonuses + Pro Gear',
    badge: 'Creative Dream Role',
    shortDescription:
      "Take the creative wheel of a premier Dubai real estate brand. Film luxury penthouses and prime villas, script viral property breakdowns, and grow a multi-channel audience with full studio and gear support.",
    keyPerks: [
      {
        title: 'Competitive Salary Package',
        desc: 'Generous monthly salary, employment visa, healthcare, plus performance bonuses on viral reach and engagement.',
      },
      {
        title: 'Access to Prime Dubai Real Estate',
        desc: 'Shoot inside multi-million AED penthouses, waterfront villas, architectural masterworks, and VIP launches.',
      },
      {
        title: 'Creative Autonomy & Pro Gear',
        desc: 'State-of-the-art cameras, gimbals, lighting, wireless audio mics, and dedicated editing setups.',
      },
      {
        title: 'Rapid Growth & Portfolio Stardom',
        desc: 'Opportunity to produce signature shows, podcast series, and establish yourself at the top of Dubai real estate media.',
      },
    ],
    aboutRole: [
      'Jamoka Properties is looking for a dynamic, visually gifted Social Media Content Creator & Video Producer to lead our visual storytelling across Instagram, TikTok, YouTube, and LinkedIn.',
      'In this role, you will be our chief creative storyteller. You’ll scout incredible locations, storyboard captivating hooks, direct agents during cinematic shoots, and edit fast-paced, high-retention short and long-form videos that command attention.',
    ],
    responsibilities: [
      'Concept, storyboard, film, and edit high-impact short-form videos (Reels, TikToks, YouTube Shorts)',
      'Direct agents and executives on-camera with engaging hooks, pacing, and charismatic delivery',
      'Capture cinematic property walkthroughs, drone perspectives, lifestyle b-roll, and neighborhood guides',
      'Produce monthly long-form YouTube episodes covering Dubai market insights, project reviews, and podcasts',
      'Edit dynamic video assets using Premiere Pro, After Effects, or CapCut with clean motion graphics and sound design',
      'Stay ahead of viral trends, audio tracks, editing rhythms, and algorithm updates across all platforms',
      'Manage content calendars, publishing schedules, captions, hashtags, and performance analytics',
      'Help shape the visual identity and luxury brand positioning of Jamoka Properties',
    ],
    requirements: [
      'Demonstrated portfolio or social handle showcasing high-retention video creation and slick editing',
      'Proficiency with mirrorless cameras (Sony/Canon/Lumix), gimbals, lighting setups, and wireless audio mics',
      'Advanced editing skills in Adobe Premiere Pro, Final Cut, CapCut Desktop, or DaVinci Resolve',
      'Keen sense of hook creation, typography, motion graphics, audio mastering, and color grading',
      'Knowledge of real estate, architecture, luxury lifestyle, or high-aesthetic storytelling is a strong advantage',
      'Organized, energetic, proactive, and able to thrive on location in fast-paced Dubai shoot environments',
    ],
    whatWeOffer: [
      'Competitive monthly salary + viral reach bonuses & project completion incentives',
      'Full UAE Employment Visa & comprehensive medical health insurance',
      'Latest production equipment, cameras, lenses, lighting, and high-performance editing stations',
      'Backstage access to Dubai’s most exclusive villas, mega-yachts, private launches, and developer events',
      'Collaborative, high-energy team environment in Business Bay with no corporate bureaucracy',
      'Full creative freedom to experiment with novel formats, mini-documentaries, and branded series',
      'High visibility in Dubai’s premier luxury real estate creator ecosystem',
    ],
  },
];

