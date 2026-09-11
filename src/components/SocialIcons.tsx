import React from 'react';

interface SocialIconProps {
  className?: string;
}

export const InstagramIcon: React.FC<SocialIconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const LinkedInIcon: React.FC<SocialIconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const YouTubeIcon: React.FC<SocialIconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const FacebookIcon: React.FC<SocialIconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export const TikTokIcon: React.FC<SocialIconProps> = ({ className = 'w-5 h-5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.3 0 .59.05.86.13V9.4a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.96 1.63V6.76c-.4 0-.8-.02-1.2-.07z" />
  </svg>
);

export const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/jamoka.properties/?hl=en',
    icon: InstagramIcon,
    hoverBg: 'hover:bg-[#E4405F] hover:border-[#E4405F]',
    hoverColor: 'hover:text-[#E4405F]',
    color: '#E4405F',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/jamoka-properties/',
    icon: LinkedInIcon,
    hoverBg: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
    hoverColor: 'hover:text-[#0A66C2]',
    color: '#0A66C2',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@Jamokaproperties',
    icon: YouTubeIcon,
    hoverBg: 'hover:bg-[#FF0000] hover:border-[#FF0000]',
    hoverColor: 'hover:text-[#FF0000]',
    color: '#FF0000',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/p/Jamoka-Properties-61576727052602/',
    icon: FacebookIcon,
    hoverBg: 'hover:bg-[#1877F2] hover:border-[#1877F2]',
    hoverColor: 'hover:text-[#1877F2]',
    color: '#1877F2',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@jamokaproperties',
    icon: TikTokIcon,
    hoverBg: 'hover:bg-black hover:border-[#FE2C55]',
    hoverColor: 'hover:text-[#FE2C55]',
    color: '#000000',
  },
];
