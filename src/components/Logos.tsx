import React from 'react';

/**
 * Jamoka Properties Logo
 * Displays the luxury interlocking 'PJ' monogram in champagne gold along with
 * the Caughe/editorial typography.
 */
export const JamokaMonogram: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 42,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-sm overflow-hidden bg-black border border-[#D4AF37]/60 shadow-sm shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="Jamoka Properties"
    >
      <svg
        viewBox="0 0 1000 1000"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="1000" height="1000" fill="#000000" />
        <g fill="#BA9452">
          {/* Letter J Serif & Trunk & Tail */}
          <path d="M 472 240 C 480 240 500 240 548 240 C 533 255 525 268 525 288 L 525 715 C 522 745 495 770 452 775 C 475 765 495 740 495 710 L 495 288 C 495 268 487 255 472 240 Z" />
          
          {/* Letter P Stem with Left-Top Serif and Base Serif */}
          <path d="M 382 338 C 394 345 405 354 405 370 L 405 645 C 405 658 395 668 385 675 L 455 675 C 445 668 435 658 435 645 L 435 338 Z" />
          
          {/* Letter P Bar Left of J (Bridge between P stem and J stem) */}
          <path d="M 435 338 L 495 338 L 495 368 L 435 368 Z" />
          <path d="M 435 468 L 495 468 L 495 498 L 435 498 Z" />
          
          {/* Letter P Outer Bowl Right of J */}
          <path d="M 525 338 C 585 338 618 375 618 418 C 618 461 585 498 525 498 L 525 468 C 565 468 586 444 586 418 C 586 392 565 368 525 368 Z" />
        </g>
      </svg>
    </div>
  );
};

export const JamokaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; lightMode?: boolean }> = ({
  size = 'md',
  lightMode = false,
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const pixelSize = isSm ? 34 : isLg ? 48 : 42;

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none">
      {/* Exact PJ interlocking monogram logo matching user's uploaded brand mark */}
      <JamokaMonogram
        size={pixelSize}
        className="transition-transform duration-300 group-hover:scale-105"
      />

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-bold tracking-[0.24em] uppercase font-caughe ${
            lightMode ? 'text-white' : 'text-[#0F172A]'
          } ${isSm ? 'text-sm sm:text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
          style={{ fontFamily: "'Caughe', 'Cinzel', 'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
        >
          JAMOKA
        </span>
        <span
          className="text-[8px] sm:text-[9px] font-semibold tracking-[0.32em] uppercase text-[#D4AF37] font-jakarta"
        >
          Properties • Dubai
        </span>
      </div>
    </div>
  );
};

/**
 * SQFT DXB Partner Logo
 * Displays the modern geometric white 'SQ' block with gold angled slash on black square,
 * matching the user's secondary real estate logo.
 */
export const JamokaFullLogo: React.FC<{ isDarkBackground?: boolean }> = ({
  isDarkBackground = false,
}) => {
  return <JamokaLogo lightMode={isDarkBackground} size="md" />;
};

export const SqftMonogram: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 40,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center rounded-sm overflow-hidden bg-black border border-white/20 shadow-sm shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="SQFT DXB - Secondary & Resale"
    >
      <img
        src="/sqft-logo.png"
        alt="SQFT DXB Monogram Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const SqftDxbLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  lightMode?: boolean;
  onClick?: () => void;
}> = ({
  size = 'md',
  lightMode = false,
  onClick,
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';
  const pixelSize = isSm ? 34 : isLg ? 48 : 42;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none relative"
      title="Partnered Website: SQFT DXB - Secondary Market & Ready Resale"
    >
      <SqftMonogram
        size={pixelSize}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-bold tracking-[0.20em] uppercase font-jakarta ${
              lightMode ? 'text-white' : 'text-[#0F172A]'
            } ${isSm ? 'text-sm sm:text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
          >
            SQFT DXB
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
        </div>
        <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.30em] uppercase text-slate-500 font-jakarta">
          Secondary • Resale
        </span>
      </div>
    </div>
  );
};

export const SqftPartnerLogo: React.FC<{ isDarkBackground?: boolean }> = ({
  isDarkBackground = false,
}) => {
  return (
    <a
      href="https://sqftdxb.ae"
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md border transition-all shadow-2xs focus:outline-none ${
        isDarkBackground
          ? 'bg-white/5 border-neutral-700 hover:border-[#D4AF37]/80 text-white'
          : 'bg-white/90 border-neutral-200/90 hover:border-[#D4AF37]/60 text-[#0F172A]'
      }`}
      title="Visit Partner Site: SQFT DXB Prime Resale & Secondary Market"
    >
      <SqftMonogram size={30} />
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1">
          <span
            className={`text-[11px] md:text-xs font-extrabold tracking-[0.14em] uppercase group-hover:text-[#D4AF37] transition-colors ${
              isDarkBackground ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            SQFT DXB
          </span>
          <span className="material-symbols-outlined text-[12px] text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            north_east
          </span>
        </div>
        <span
          className={`text-[8px] font-semibold uppercase tracking-wider ${
            isDarkBackground ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          Secondary Resale
        </span>
      </div>
    </a>
  );
};





