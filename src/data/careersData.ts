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
    location: 'Business Bay, Dubai',
    type: 'Full-time',
    compensationHighlight: 'Base Salary + Up to 70% Instant Commission',
    badge: 'High Earning Potential',
    shortDescription:
      'Close luxury and off-plan properties in Dubai with daily qualified leads and direct developer access.',
    keyPerks: [
      {
        title: 'Up to 70% Commission',
        desc: 'Paid directly on the spot when you close.',
      },
      {
        title: 'Daily Qualified Leads',
        desc: 'Pre-vetted buyer inquiries every day.',
      },
      {
        title: 'Salary + UAE Visa',
        desc: 'Base package with full visa and medical cover.',
      },
      {
        title: 'VIP Developer Access',
        desc: 'Direct launches with Emaar, Sobha & DAMAC.',
      },
    ],
    aboutRole: [
      'Join our Business Bay sales team to connect international buyers with Dubai’s top off-plan and luxury properties, backed by daily leads and in-house marketing support.',
    ],
    responsibilities: [
      'Respond to daily buyer and investor inquiries',
      'Host private property viewings across Dubai',
      'Advise clients on payment plans and ROI',
      'Negotiate offers and close sales smoothly',
    ],
    requirements: [
      'Experience in sales or real estate',
      'RERA card (or ready to get one with our help)',
      'Strong communication and closing skills',
      'Fluent in English (extra languages are a plus)',
    ],
    whatWeOffer: [
      'Base salary + up to 70% commission paid on spot',
      'Full UAE employment visa and health insurance',
      'In-house video team to build your personal brand',
      'Prime office in Bayswater Tower, Business Bay',
    ],
  },
  {
    id: 'pos-2',
    slug: 'social-media-content-creator',
    title: 'Social Media Content Creator',
    department: 'Creative & Marketing',
    location: 'Business Bay, Dubai',
    type: 'Full-time',
    compensationHighlight: 'Competitive Salary + Bonuses + Pro Gear',
    badge: 'Creative Role',
    shortDescription:
      'Film luxury penthouses and villas, edit viral reels, and lead Jamoka’s creative brand across social channels.',
    keyPerks: [
      {
        title: 'Competitive Salary',
        desc: 'Monthly pay plus performance bonuses.',
      },
      {
        title: 'Luxury Property Access',
        desc: 'Shoot inside Dubai’s top villas and penthouses.',
      },
      {
        title: 'Pro Gear Included',
        desc: 'Cameras, gimbals, lighting & editing suite.',
      },
      {
        title: 'Creative Freedom',
        desc: 'Own our Reels, TikTok & YouTube visual style.',
      },
    ],
    aboutRole: [
      'Lead visual storytelling across Instagram, TikTok, and YouTube—filming Dubai’s finest properties and crafting fast-paced, high-retention videos.',
    ],
    responsibilities: [
      'Film and edit Reels, TikToks & YouTube Shorts',
      'Direct agents on-camera during property tours',
      'Produce YouTube market guides and video series',
      'Track trends and manage posting schedules',
    ],
    requirements: [
      'Strong portfolio of Reels, TikToks, or videos',
      'Skilled with cameras, gimbals, and lighting',
      'Proficient in Premiere Pro, CapCut, or Final Cut',
      'Sharp eye for hooks, pacing, and luxury aesthetics',
    ],
    whatWeOffer: [
      'Competitive salary + viral performance bonuses',
      'Full UAE employment visa and health insurance',
      'Latest cameras, lenses, mics, and studio setup',
      'VIP access to exclusive launches and luxury villas',
    ],
  },
];


