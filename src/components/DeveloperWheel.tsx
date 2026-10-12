import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export interface DeveloperBrand {
  name: string;
  /**
   * Cloudinary or remote image URL for the developer logo.
   * Example: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/emaar-logo.png'
   * If empty or omitted, an elegant SVG image placeholder will automatically be generated.
   */
  logoUrl?: string;
}

/**
 * Creates an elegant SVG vector image placeholder for any developer.
 * This ensures every developer item is an actual <img> element (image holder)
 * even before replacing it with a Cloudinary image URL.
 */
export const createDeveloperLogoPlaceholder = (name: string): string => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="80" viewBox="0 0 250 80">
    <rect width="250" height="80" rx="16" fill="#000000" />
    <defs>
      <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CFA55A" />
        <stop offset="50%" stop-color="#CFA55A" />
        <stop offset="100%" stop-color="#AA822A" />
      </linearGradient>
    </defs>
    <!-- Architectural Monogram Icon -->
    <g transform="translate(125, 24)" text-anchor="middle">
      <path d="M-14 -6 L0 -14 L14 -6 L0 2 Z" fill="none" stroke="url(#goldGlow)" stroke-width="1.5" opacity="0.9" />
      <path d="M-9 -3 L0 -8 L9 -3 L0 2 Z" fill="url(#goldGlow)" opacity="0.3" />
      <circle cx="0" cy="-6" r="1.5" fill="#FFFFFF" />
    </g>
    <!-- Developer Name Display -->
    <text x="125" y="52" fill="#FFFFFF" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      ${name}
    </text>
    <!-- Sub-label -->
    <text x="125" y="66" fill="#CFA55A" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600" letter-spacing="2.5" text-anchor="middle" opacity="0.75">
      DEVELOPER LOGO
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Default list of sliding master developers.
 * Sourced from the ImageKit DEV LOGO SLIDER folder:
 * https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/
 */
export const DEVELOPER_LOGOS: DeveloperBrand[] = [
  { name: 'EMAAR', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Emaar.png' },
  { name: 'NAKHEEL', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Nakheel.png' },
  { name: 'OMNIYAT', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Omniyat.png' },
  { name: 'DAMAC', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Damac.png' },
  { name: 'SOBHA', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Sobah.png' },
  { name: 'MERAAS', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Meraas.png' },
  { name: 'SELECT GROUP', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Select%20Group.png' },
  { name: 'ELLINGTON', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Ellington.png' },
  { name: 'ALDAR', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Aldar.png' },
  { name: 'BINGHATTI', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Binghatti.png' },
  { name: 'DANUBE', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Danube.png' },
  { name: 'DEYAAR', logoUrl: 'https://ik.imagekit.io/zb5ih81ig/DEV%20LOGO%20SLIDER/Deyaar.png' },
];

interface DeveloperWheelProps {
  customLogos?: DeveloperBrand[];
}

export const DeveloperWheel: React.FC<DeveloperWheelProps> = ({ customLogos }) => {
  const { t } = useLanguage();
  const developers = customLogos || DEVELOPER_LOGOS;

  // Duplicate for smooth, seamless infinite marquee (translateX -50%)
  const duplicatedDevelopers = [...developers, ...developers];

  return (
    <section className="py-16 bg-[#0A0E17] text-white overflow-hidden relative border-y border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-40 bg-[#CFA55A]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-10 font-jakarta">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#CFA55A]/35 text-[#CFA55A] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
          <Sparkles className="w-3 h-3 text-[#CFA55A]" />
          <span>TRUSTED PARTNERS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-jakarta-bold">
          {t.wheel.title}
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto font-light leading-relaxed font-jakarta">
          {t.wheel.subtitle}
        </p>
      </div>

      {/* Infinite Logo Marquee Track */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#0A0E17] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#0A0E17] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 sm:gap-10 py-4 animate-marquee hover:[animation-play-state:paused] w-max select-none items-center">
          {duplicatedDevelopers.map((dev, idx) => {
            const imageSrc = dev.logoUrl?.trim()
              ? dev.logoUrl.trim()
              : createDeveloperLogoPlaceholder(dev.name);

            return (
              <div
                key={`${dev.name}-${idx}`}
                className="shrink-0 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 select-none shadow-lg"
                title={`${dev.name} - Dubai Master Developer`}
              >
                {/* Floating black logo image with curved corners - no stroke around, no holder */}
                <img
                  src={imageSrc}
                  alt={`${dev.name} Developer Logo`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="h-14 sm:h-16 md:h-20 w-auto rounded-2xl object-cover select-none pointer-events-none block"
                  onError={(e) => {
                    // Fallback to placeholder image if image URL fails to load
                    const target = e.currentTarget;
                    if (target.src !== createDeveloperLogoPlaceholder(dev.name)) {
                      target.src = createDeveloperLogoPlaceholder(dev.name);
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
