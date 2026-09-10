import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SecondaryMarketPopupProps {
  onOpenSecondarySite?: () => void;
}

export const SecondaryMarketPopup: React.FC<SecondaryMarketPopupProps> = ({
  onOpenSecondarySite,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // 10-second timer as specified in prompt
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    // Optional visual countdown tracker
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
  };

  const handleExplore = () => {
    if (onOpenSecondarySite) {
      onOpenSecondarySite();
    } else {
      window.open('https://sqftdxb.ae', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            aria-label="Secondary Market Notification"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-4 sm:right-6 z-50 w-[90vw] sm:w-[350px] max-w-[360px] bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.18)] border border-[#D4AF37]/30 p-4.5 sm:p-5 overflow-hidden font-jakarta"
          >
            {/* Top Row: SQFT DXB Icon with Animated Border + Header + Close Button */}
            <div className="flex items-start justify-between gap-3 mb-3.5 relative z-10">
              <div className="flex items-center gap-3">
                {/* SQ Logo with Animated Gradient Border Only (No background glow) */}
                <div className="relative p-[2px] rounded-xl overflow-hidden shadow-xs shrink-0">
                  <div className="absolute inset-[-150%] animate-rotate-gradient bg-[conic-gradient(from_0deg,#D4AF37_0%,#F59E0B_25%,#FFFFFF_45%,#ECC86A_65%,#C5A059_85%,#D4AF37_100%)] opacity-100" />

                  {/* Dark Core Container with SQ Mark */}
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-[#0A0E17] flex items-center justify-center p-2 z-10 border border-black/40">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 20H80V70H70V30H30V45H70V75H20V65H60V55H20V20Z"
                        fill="white"
                      />
                      <path
                        d="M62 65L78 80H68L55 68L62 65Z"
                        fill="#ECC86A"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm sm:text-base font-bold text-[#0F172A] leading-tight font-jakarta">
                      SQFT DXB
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0 inline-block" />
                  </div>
                  <span className="text-[11px] font-semibold text-[#A6833D] tracking-wide font-jakarta">
                    We Find, You Move In
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors shrink-0"
                aria-label="Dismiss secondary market recommendation"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headline */}
            <h4 className="text-base sm:text-[17px] font-bold text-[#0F172A] font-jakarta tracking-tight mb-1.5 leading-snug">
              Looking for secondary properties?
            </h4>

            {/* Subtext */}
            <p className="text-xs text-slate-600 leading-relaxed mb-4 font-light font-jakarta">
              Explore curated ready-to-move penthouses, luxury villas, and exclusive secondary market inventory across Dubai with SQFT DXB — <span className="font-semibold text-slate-800">We Find, You Move In</span>.
            </p>

            <div className="h-px w-full bg-neutral-100 mb-3.5" />

            {/* Gold CTA Action Button */}
            <button
              onClick={handleExplore}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] hover:brightness-105 active:scale-[0.99] text-[#0A0E17] font-bold text-xs tracking-[0.1em] uppercase py-3 px-3.5 rounded-xl shadow-[0_4px_16px_rgba(212,175,55,0.28)] transition-all group font-jakarta cursor-pointer"
            >
              <span>EXPLORE SECONDARY MARKET</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Pill when dismissed or before 10 seconds */}
      {hasDismissed && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-4 sm:right-6 z-40 flex items-center gap-2.5 bg-[#0F172A] text-white px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:scale-105 transition-all text-xs font-bold font-jakarta"
          title="SQFT DXB • We Find, You Move In"
        >
          <div className="relative p-[1.5px] rounded-lg overflow-hidden shrink-0">
            <div className="absolute inset-[-100%] animate-rotate-gradient bg-[conic-gradient(from_0deg,#D4AF37_0%,#F59E0B_50%,#D4AF37_100%)]" />
            <div className="relative w-5 h-5 rounded-[6px] bg-[#0A0E17] flex items-center justify-center text-[9px] font-bold text-[#ECC86A]">
              SQ
            </div>
          </div>
          <span className="tracking-wide">SQFT DXB • We Find, You Move In</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
        </button>
      )}
    </>
  );
};
