export interface JobPosition {
  id: string;
  slug: 'real-estate-agent' | 'social-media-content-creator';
  title: string;
  department: string;
  location: string;
  type: string;
  shortDescription: string;
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
    department: 'Sales',
    location: 'Dubai, UAE',
    type: 'Full-time',
    shortDescription:
      "Join our sales team and work with clients across Dubai's dynamic real estate market, supported by professional marketing, lead generation, and sales resources.",
    aboutRole: [
      'Jamoka Properties is looking for motivated real estate agents to join its growing sales team in Dubai.',
      'The role involves working with property buyers, sellers, investors, and landlords while building strong client relationships and generating successful transactions.',
    ],
    responsibilities: [
      'Generate and follow up with property leads',
      'Understand client requirements and recommend suitable properties',
      'Conduct property viewings',
      'Build and maintain strong client relationships',
      'Negotiate and assist with transactions',
      'Follow up with prospects and existing clients',
      'Maintain accurate CRM and lead information',
      'Stay updated on Dubai’s real estate market',
      'Work closely with the marketing and sales team',
    ],
    requirements: [
      'Previous real estate or sales experience is preferred',
      'Dubai real estate experience is an advantage',
      'Strong communication and negotiation skills',
      'Good knowledge of the Dubai property market is an advantage',
      'Strong follow-up and client-management skills',
      'Professional appearance and attitude',
      'English required',
      'Additional languages are an advantage',
    ],
    whatWeOffer: [
      'Marketing and lead-generation support',
      'Access to property opportunities',
      'Professional working environment',
      'Sales and marketing support',
      'Career growth opportunities',
      'Commission-based earning opportunities',
    ],
  },
  {
    id: 'pos-2',
    slug: 'social-media-content-creator',
    title: 'Social Media Content Creator',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'Full-time',
    shortDescription:
      'Join our creative team and help produce high-quality real estate content across Instagram, TikTok, YouTube, and other digital platforms.',
    aboutRole: [
      'Jamoka Properties is looking for a creative and driven Social Media Content Creator to help develop and produce engaging content for the brand’s digital channels.',
      'The role involves filming, editing, creating social media content, and helping develop ideas that showcase properties, people, projects, and the Jamoka brand.',
    ],
    responsibilities: [
      'Plan and produce short-form social media content',
      'Film real estate properties, agents, lifestyle content, and brand content',
      'Edit Reels, TikToks, YouTube Shorts, and other video content',
      'Develop creative concepts, hooks, and content ideas',
      'Assist with social media content planning',
      'Create content for Instagram, TikTok, YouTube, and other relevant platforms',
      'Work with agents and the marketing team during shoots',
      'Maintain consistent visual quality and brand standards',
      'Keep up with current social media trends and formats',
      'Help create content that improves engagement, reach, and brand awareness',
    ],
    requirements: [
      'Experience creating social media content',
      'Strong video shooting and editing skills',
      'Good understanding of Instagram, TikTok, and YouTube',
      'Strong sense of visual storytelling',
      'Ability to create engaging hooks and short-form content',
      'Experience with editing software such as Premiere Pro, After Effects, CapCut, or similar tools is an advantage',
      'Photography skills are an advantage',
      'Strong communication and creative thinking',
      'Real estate or property content experience is an advantage',
    ],
    whatWeOffer: [
      'Creative working environment',
      'Opportunities to work on premium real estate content',
      'Access to properties, developments, and real estate projects',
      'Opportunity to build a strong creative portfolio',
      'Collaboration with the marketing and sales team',
      'Career growth opportunities',
    ],
  },
];
