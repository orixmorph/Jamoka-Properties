import React, { useState } from 'react';

/**
 * Cloudinary / Cloud Image Array for Jamoka Properties Header Logo
 * You can insert your direct Cloudinary or external cloud-hosted image URL(s) in this array.
 * The system automatically loads from this cloud array and seamlessly falls back through
 * the list if a URL fails to load.
 */
export const JAMOKA_HEADER_CLOUD_LOGOS: string[] = [
  // Primary Cloudinary link (configured with cloud name: dy6km7beb)
  'https://res.cloudinary.com/dy6km7beb/image/upload/v1788770576/Untitled_design_8_wgqp5r.png',
  // Local high-resolution brand asset fallback
  '/jamoka-header-logo.png',
];

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
      className={`relative flex items-center justify-center rounded-sm overflow-hidden bg-black border border-[#CFA55A]/60 shadow-sm shrink-0 select-none ${className}`}
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

export interface JamokaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  lightMode?: boolean;
  className?: string;
  imageClassName?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  cloudImages?: string[];
}

export const JamokaLogo: React.FC<JamokaLogoProps> = ({
  size = 'md',
  lightMode = false,
  className = '',
  imageClassName = '',
  href,
  onClick,
  cloudImages = JAMOKA_HEADER_CLOUD_LOGOS,
}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const heightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-14 sm:h-16 md:h-20'
      : size === 'xl'
      ? 'h-16 sm:h-20 md:h-24'
      : 'h-11 sm:h-13 md:h-14 lg:h-[58px]';

  const maxWidthClass =
    size === 'sm'
      ? 'max-w-[220px] sm:max-w-[260px]'
      : size === 'lg'
      ? 'max-w-[360px] sm:max-w-[440px]'
      : size === 'xl'
      ? 'max-w-[460px] sm:max-w-[560px]'
      : 'max-w-[280px] sm:max-w-[350px] md:max-w-[400px]';

  const imageList =
    cloudImages && cloudImages.length > 0
      ? cloudImages
      : JAMOKA_HEADER_CLOUD_LOGOS;
  const currentSrc = imageList[imageIndex] || '/jamoka-header-logo.png';

  const handleImageError = () => {
    // If a cloud URL fails to load (e.g. pending Cloudinary asset), smoothly step to next URL in array
    if (imageIndex < imageList.length - 1) {
      setImageIndex((prev) => prev + 1);
    }
  };

  const imageElement = (
    <img
      src={currentSrc}
      alt="Jamoka Properties"
      onError={handleImageError}
      className={`${heightClass} ${maxWidthClass} w-auto object-contain shrink-0 ${
        lightMode ? 'brightness-110 drop-shadow-sm' : ''
      } ${imageClassName}`}
      referrerPolicy="no-referrer"
      loading="eager"
    />
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`inline-flex items-center group select-none transition-transform duration-300 hover:scale-[1.02] cursor-pointer outline-none ${className}`}
        title="Jamoka Properties"
      >
        {imageElement}
      </a>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center group select-none transition-transform duration-300 hover:scale-[1.02] ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      title="Jamoka Properties"
    >
      {imageElement}
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
      title="SQFT DXB • We Find, You Move In"
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
      className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none relative whitespace-nowrap shrink-0"
      title="Partnered Website: SQFT DXB • We Find, You Move In"
    >
      <SqftMonogram
        size={pixelSize}
        className="transition-transform duration-300 group-hover:scale-105 shrink-0"
      />
      <div className="flex flex-col leading-tight whitespace-nowrap text-left">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            className={`font-bold tracking-[0.16em] uppercase font-jakarta whitespace-nowrap ${
              lightMode ? 'text-white' : 'text-[#0F172A]'
            } ${isSm ? 'text-sm sm:text-base' : isLg ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
          >
            SQFT DXB
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CFA55A] animate-pulse shrink-0"></span>
        </div>
        <span
          className={`text-[8px] sm:text-[9px] font-semibold tracking-[0.18em] uppercase font-jakarta whitespace-nowrap ${
            lightMode ? 'text-neutral-400' : 'text-slate-500'
          }`}
        >
          We Find, You Move In
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
      className={`group relative flex items-center gap-2.5 px-2.5 py-1.5 rounded-md border transition-all shadow-2xs focus:outline-none whitespace-nowrap shrink-0 ${
        isDarkBackground
          ? 'bg-white/5 border-neutral-700 hover:border-[#CFA55A]/80 text-white'
          : 'bg-white/90 border-neutral-200/90 hover:border-[#CFA55A]/60 text-[#0F172A]'
      }`}
      title="Visit Partner Site: SQFT DXB • We Find, You Move In"
    >
      <SqftMonogram size={30} className="shrink-0" />
      <div className="flex flex-col text-left whitespace-nowrap">
        <div className="flex items-center gap-1 whitespace-nowrap">
          <span
            className={`text-[11px] md:text-xs font-extrabold tracking-[0.14em] uppercase group-hover:text-[#CFA55A] transition-colors whitespace-nowrap ${
              isDarkBackground ? 'text-white' : 'text-[#0F172A]'
            }`}
          >
            SQFT DXB
          </span>
          <span className="material-symbols-outlined text-[12px] text-[#CFA55A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0">
            north_east
          </span>
        </div>
        <span
          className={`text-[8px] font-semibold uppercase tracking-wider whitespace-nowrap ${
            isDarkBackground ? 'text-neutral-400' : 'text-neutral-500'
          }`}
        >
          We Find, You Move In
        </span>
      </div>
    </a>
  );
};





