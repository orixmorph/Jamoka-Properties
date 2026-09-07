import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export interface DeveloperBrand {
  name: string;
  // User can insert direct cloud image links here (e.g. AWS S3, Cloudflare R2, Cloudinary, etc.)
  logoUrl?: string;
}

export const DEVELOPER_LOGOS: DeveloperBrand[] = [
  { name: 'EMAAR', logoUrl: '' },
  { name: 'NAKHEEL', logoUrl: '' },
  { name: 'OMNIYAT', logoUrl: '' },
  { name: 'DAMAC', logoUrl: '' },
  { name: 'SOBHA', logoUrl: '' },
  { name: 'MERAAS', logoUrl: '' },
  { name: 'SELECT GROUP', logoUrl: '' },
  { name: 'ELLINGTON', logoUrl: '' },
  { name: 'ALDAR', logoUrl: '' },
  { name: 'BINGHATTI', logoUrl: '' },
  { name: 'DANUBE', logoUrl: '' },
  { name: 'DEYAAR', logoUrl: '' },
];

interface DeveloperWheelProps {
  customLogos?: DeveloperBrand[];
}

export const DeveloperWheel: React.FC<DeveloperWheelProps> = ({ customLogos }) => {
  const { t } = useLanguage();
  const developers = customLogos || DEVELOPER_LOGOS;

  // Duplicate for smooth, seamless infinite marquee
  const duplicatedDevelopers = [...developers, ...developers, ...developers];

  return (
    <section className="py-16 bg-[#0A0E17] text-white overflow-hidden relative border-y border-white/10">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-40 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 relative z-10 font-jakarta">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#D4AF37]/35 text-[#ECC86A] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>TRUSTED PARTNERS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-jakarta">
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
          {duplicatedDevelopers.map((dev, idx) => (
            <div
              key={`${dev.name}-${idx}`}
              className="h-20 sm:h-24 w-44 sm:w-52 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#D4AF37]/50 rounded-xl px-5 py-3 backdrop-blur-sm transition-all duration-300 flex items-center justify-center shrink-0 group"
            >
              {dev.logoUrl ? (
                <img
                  src={dev.logoUrl}
                  alt={`${dev.name} Logo`}
                  className="max-h-12 max-w-[130px] object-contain filter grayscale brightness-125 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="text-sm sm:text-base font-extrabold tracking-[0.18em] text-white/85 group-hover:text-[#ECC86A] transition-colors font-jakarta uppercase">
                    {dev.name}
                  </span>
                  <span className="text-[9px] text-neutral-500 font-light tracking-widest mt-0.5">
                    DUBAI
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
