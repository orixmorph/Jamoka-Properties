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
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="80" viewBox="0 0 240 80">
    <defs>
      <linearGradient id="goldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#CFA55A" />
        <stop offset="50%" stop-color="#CFA55A" />
        <stop offset="100%" stop-color="#AA822A" />
      </linearGradient>
    </defs>
    <!-- Architectural Monogram Icon -->
    <g transform="translate(120, 24)" text-anchor="middle">
      <path d="M-14 -6 L0 -14 L14 -6 L0 2 Z" fill="none" stroke="url(#goldGlow)" stroke-width="1.5" opacity="0.9" />
      <path d="M-9 -3 L0 -8 L9 -3 L0 2 Z" fill="url(#goldGlow)" opacity="0.3" />
      <circle cx="0" cy="-6" r="1.5" fill="#FFFFFF" />
    </g>
    <!-- Developer Name Display -->
    <text x="120" y="52" fill="#FFFFFF" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="3.5" text-anchor="middle">
      ${name}
    </text>
    <!-- Sub-label -->
    <text x="120" y="66" fill="#CFA55A" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="7.5" font-weight="600" letter-spacing="2.5" text-anchor="middle" opacity="0.75">
      DEVELOPER LOGO
    </text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Default list of sliding master developers.
 *
 * HOW TO REPLACE WITH YOUR CLOUDINARY IMAGES:
 * Simply paste your Cloudinary logo URL into the `logoUrl` property for any developer below, e.g.:
 *   { name: 'EMAAR', logoUrl: 'https://res.cloudinary.com/your-account/image/upload/v1234/emaar.png' },
 */
export const DEVELOPER_LOGOS: DeveloperBrand[] = [
  { name: 'EMAAR', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Emaar_rnmems.png' },
  { name: 'NAKHEEL', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961883/Nakheel_q2yx7u.png' },
  { name: 'OMNIYAT', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961883/Omniyat_tql2hl.png' },
  { name: 'DAMAC', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Damac_cdliec.png' },
  { name: 'SOBHA', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961883/Sobah_bf0khj.png' },
  { name: 'MERAAS', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Meraas_avhtyt.png' },
  { name: 'SELECT GROUP', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961883/Select_Group_ewxn2s.png' },
  { name: 'ELLINGTON', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Ellington_p8xhho.png' },
  { name: 'ALDAR', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961929/Aldar_b3jbha.png' },
  { name: 'BINGHATTI', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Binghatti_bjaqpl.png' },
  { name: 'DANUBE', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Danube_fsw8z1.png' },
  { name: 'DEYAAR', logoUrl: 'https://res.cloudinary.com/dy6km7beb/image/upload/v1788961882/Deyaar_dr3nsc.png' },
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-caughe">
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

        <div className="flex gap-5 sm:gap-8 py-3 animate-marquee hover:[animation-play-state:paused] w-max select-none items-center">
          {duplicatedDevelopers.map((dev, idx) => {
            const imageSrc = dev.logoUrl?.trim()
              ? dev.logoUrl.trim()
              : createDeveloperLogoPlaceholder(dev.name);

            return (
              <div
                key={`${dev.name}-${idx}`}
                className="h-20 sm:h-24 w-44 sm:w-56 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#CFA55A]/50 rounded-xl px-4 py-3 backdrop-blur-sm transition-all duration-300 flex items-center justify-center shrink-0 group relative overflow-hidden"
                title={`${dev.name} - Dubai Master Developer`}
              >
                {/* Subtle hover backlight */}
                <div className="absolute inset-0 bg-[#CFA55A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Image Holder - Renders Cloudinary logo image or SVG image placeholder */}
                <img
                  src={imageSrc}
                  alt={`${dev.name} Developer Logo`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className="max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[170px] w-auto h-auto object-contain filter grayscale brightness-125 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-300 select-none pointer-events-none"
                  onError={(e) => {
                    // Fallback to placeholder image if Cloudinary URL is broken or misconfigured
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
