import React from 'react';
import { X, ExternalLink, ShieldCheck, CheckCircle2, Building, Key, Award, Phone } from 'lucide-react';
import { motion } from 'motion/react';

interface SecondaryMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecondaryMarketModal: React.FC<SecondaryMarketModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const keyHighlights = [
    {
      icon: Key,
      title: 'Ready & Handed Over Properties',
      description: 'Immediate key release, vacant on transfer penthouses, branded residences, and luxury private beachfront villas.',
    },
    {
      icon: ShieldCheck,
      title: 'DLD Trustee & Title Conveyancing',
      description: 'Full legal title deed verification, escrow account reconciliation, and seamless registration via Dubai Land Department trustees.',
    },
    {
      icon: Building,
      title: 'Prime Secondary Communities',
      description: 'Curated access to prestigious resale units across Palm Jumeirah, Downtown Dubai, Dubai Marina, and Emirates Hills.',
    },
    {
      icon: Award,
      title: 'UAE Golden Visa Advisory',
      description: 'Specialized assistance with qualifying property acquisitions ensuring fast-track eligibility for 10-Year UAE residency.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header Ribbon - Premium Black */}
        <div className="bg-black text-white p-6 sm:p-8 flex items-start justify-between gap-4 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black border border-white/20 flex items-center justify-center p-2.5 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M20 20H80V70H70V30H30V45H70V75H20V65H60V55H20V20Z" fill="white" />
                <path d="M62 65L78 80H68L55 68L62 65Z" fill="#C5A059" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-[#CFA55A] tracking-widest uppercase">
                  PARTNERED SECONDARY MARKET SPECIALIST
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-jakarta tracking-tight text-white flex items-center gap-2.5">
                <span>SQFT DXB</span>
                <span className="text-sm sm:text-base font-semibold text-[#CFA55A] tracking-normal font-jakarta">
                  • We Find, You Move In
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl font-light leading-relaxed">
                While Jamoka Properties commands Dubai’s premier off-plan sector, our partner SQFT DXB curates verified secondary market and ready-to-move luxury properties across the UAE.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content - Information Highlights */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider font-jakarta mb-1">
              Secondary Market Expertise & Turnkey Services
            </h4>
            <p className="text-xs text-slate-500 font-light">
              Access authenticated resale properties with immediate occupancy and transparent title registration.
            </p>
          </div>

          {/* 4 Feature Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {keyHighlights.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-neutral-50 rounded-2xl p-4 sm:p-5 border border-neutral-200/80 hover:border-[#CFA55A]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A] shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm leading-tight">
                      {item.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light pl-11">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* External Link Action to Partner Platform */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 hidden sm:inline" />
              <span>Full private listings, title deed verification, and secondary conveyancing hosted on SQFT DXB portal.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="https://sqftdxb.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Launch SQFT DXB Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
