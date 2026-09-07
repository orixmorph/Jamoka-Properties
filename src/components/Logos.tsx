import React from 'react';

/**
 * Jamoka Properties Logo
 * Displays the luxury interlocking 'PJ' monogram in champagne gold along with
 * the Caughe/editorial typography.
 */
export const JamokaLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; lightMode?: boolean }> = ({
  size = 'md',
  lightMode = false,
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none">
      {/* Exact PJ interlocking monogram logo matching user's uploaded brand mark */}
      <div
        className={`relative flex items-center justify-center rounded-sm overflow-hidden bg-black border border-[#D4AF37]/50 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 ${
          isSm ? 'w-8 h-8' : isLg ? 'w-12 h-12' : 'w-10 h-10'
        }`}
      >
        <img
          src="/jamoka-logo.png"
          alt="Jamoka Properties Monogram Logo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col leading-tight">
        <span
          className={`font-bold tracking-[0.22em] uppercase font-jakarta ${
            lightMode ? 'text-white' : 'text-[#0F172A]'
          } ${isSm ? 'text-sm sm:text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
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

export const JamokaMonogram: React.FC<{ className?: string; size?: number }> = ({
  size = 40,
}) => {
  return (
    <div
      className="relative flex items-center justify-center rounded-sm overflow-hidden bg-black border border-[#D4AF37]/50 shadow-sm shrink-0"
      style={{ width: size, height: size }}
    >
      <img
        src="/jamoka-logo.png"
        alt="Jamoka Properties Monogram Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const SqftMonogram: React.FC<{ className?: string; size?: number }> = ({
  size = 40,
}) => {
  return (
    <div
      className="relative flex items-center justify-center rounded-sm bg-black border border-white/20 shadow-sm shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-3/4 h-3/4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 20H80V70H70V30H30V45H70V75H20V65H60V55H20V20Z"
          fill="white"
        />
        <path
          d="M62 65L78 80H68L55 68L62 65Z"
          fill="#C5A059"
        />
      </svg>
    </div>
  );
};

export const SqftDxbLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; onClick?: () => void }> = ({
  size = 'md',
  onClick,
}) => {
  const pixelSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 group cursor-pointer select-none relative"
      title="Partnered Website: SQFT DXB - Secondary Market & Ready Resale"
    >
      <SqftMonogram size={pixelSize} />
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1">
          <span className="text-[12px] sm:text-[13px] font-extrabold tracking-[0.14em] text-[#0F172A] uppercase">
            SQFT DXB
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
        </div>
        <span className="text-[7.5px] sm:text-[8.5px] font-medium tracking-[0.16em] uppercase text-slate-500">
          Secondary Resale
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





