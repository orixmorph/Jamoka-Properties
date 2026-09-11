import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  onSearch: (query: string) => void;
  onExploreOffPlan: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onExploreOffPlan,
  onOpenConsultation,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const { scrollY } = useScroll();

  // Responsive Zoom-in and Zoom-out motion on scroll for that high-end "AI vibe"
  // As user scrolls down, the background expands/zooms smoothly, and foreground drifts gently
  const backgroundScale = useTransform(scrollY, [0, 800], [1, 1.18]);
  const backgroundY = useTransform(scrollY, [0, 800], [0, 140]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);
  const contentY = useTransform(scrollY, [0, 450], [0, -40]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const trendingTags = [
    'Palm Jumeirah',
    'Downtown Sky Suites',
    'Dubai Water Canal',
    'Dubai Harbour',
    'Dubai Hills Mansions',
  ];

  return (
    <section id="hero" className="relative min-h-[96vh] flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#0B0F19]">
      {/* Background with Zoom-in & Zoom-out Scroll Dynamics */}
      <motion.div
        className="absolute inset-0 z-0 origin-center pointer-events-none"
        style={{
          scale: backgroundScale,
          y: backgroundY,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=2200&auto=format&fit=crop"
          alt="Dubai Skyline Skyline Night"
          className="w-full h-full object-cover object-center brightness-[0.42] contrast-[1.12]"
        />
        {/* Luxury Vignette & Radial Light Sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-transparent to-[#0B0F19]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.12),transparent_70%)]" />
      </motion.div>

      {/* Main Container */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        {/* Sovereign Desk Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#CFA55A]/40 mb-6 animate-in fade-in zoom-in-95 duration-500">
          <span className="w-2 h-2 rounded-full bg-[#CFA55A] animate-ping" />
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.22em] text-[#FAF5EC] uppercase">
            DUBAI OFF-PLAN ADVISORY • SOVEREIGN DESK
          </span>
          <span className="hidden sm:inline text-neutral-400 text-xs">|</span>
          <span className="hidden sm:inline text-[10px] tracking-widest text-[#CFA55A] font-semibold uppercase">
            DIRECT ALLOCATIONS
          </span>
        </div>

        {/* Eyebrow */}
        <p className="text-xs md:text-sm font-semibold tracking-[0.3em] text-[#CFA55A] uppercase mb-3">
          PRIVATE REAL ESTATE COUNSEL
        </p>

        {/* Main Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-caughe"
        >
          The Benchmark in Dubai <br className="hidden sm:inline" />
          <span className="text-gold-gradient italic font-normal">
            Off-Plan Advisory
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed mb-10">
          Curating exclusive developer stage-0 allocations, escrow-protected payment structures, and high-yield residential assets across Dubai’s prime enclaves.
        </p>

        {/* Interactive Search Engine Box */}
        <div className="max-w-3xl mx-auto mb-8">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl focus-within:border-[#CFA55A]/70 transition-all gap-2"
          >
            <div className="flex items-center flex-1 w-full px-3 py-1">
              <span className="material-symbols-outlined text-neutral-400 text-[20px] mr-2">
                search
              </span>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by community (e.g. Palm Jumeirah, Downtown, Waterfront)..."
                className="w-full bg-transparent text-white placeholder-neutral-400 text-xs sm:text-sm focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('');
                    onSearch('');
                  }}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#CFA55A] hover:brightness-105 active:scale-95 text-[#0F172A] text-xs font-bold uppercase tracking-[0.14em] shadow-lg transition-all shrink-0 cursor-pointer"
            >
              Search Off-Plan
            </button>
          </form>

          {/* Quick Enclave Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[11px] text-neutral-400">
            <span className="text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
              Prime Enclaves:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchInput(tag);
                  onSearch(tag);
                }}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white border border-white/10 hover:border-[#CFA55A]/50 transition-all cursor-pointer text-[10px] sm:text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Primary Call-to-Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onExploreOffPlan}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#0F172A] font-bold text-xs uppercase tracking-[0.16em] hover:bg-[#FAF9F6] hover:shadow-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>EXPLORE OFF-PLAN PORTFOLIO</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-y-0.5 transition-transform">
              expand_more
            </span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-transparent border border-white/30 text-white font-bold text-xs uppercase tracking-[0.16em] hover:bg-white/10 hover:border-[#CFA55A] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#CFA55A]">
              calendar_month
            </span>
            <span>PRIVATE CONSULTATION</span>
          </button>
        </div>

        {/* Trust Badges / Telemetry */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10 text-center">
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-extrabold text-[#CFA55A] block font-serif-luxury">
              AED 2.4B+
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Capital Allocated
            </span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-extrabold text-white block font-serif-luxury">
              100% Escrow
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Law No. 8 Protected
            </span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-extrabold text-[#CFA55A] block font-serif-luxury">
              0% Commission
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Direct Developer Terms
            </span>
          </div>
          <div className="p-3">
            <span className="text-xl sm:text-2xl font-extrabold text-white block font-serif-luxury">
              10-Yr Visa
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Golden Residency Help
            </span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
