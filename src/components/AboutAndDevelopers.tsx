import React from 'react';
import { MASTER_DEVELOPERS } from '../data/mockData';

interface AboutAndDevelopersProps {
  onInquireDeveloper: (devName: string) => void;
}

export const AboutAndDevelopers: React.FC<AboutAndDevelopersProps> = ({
  onInquireDeveloper,
}) => {
  return (
    <>
      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#FAF9F6] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Narrative */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-0.5 bg-[#CFA55A]"></span>
                <span className="text-[11px] font-bold text-[#CFA55A] uppercase tracking-[0.24em]">
                  ABOUT JAMOKA PROPERTIES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#0F172A] tracking-tight leading-tight mb-6">
                Fiduciary Excellence in Dubai's Off-Plan Realm
              </h2>
              <div className="space-y-4 text-neutral-600 text-sm md:text-base leading-relaxed">
                <p>
                  Founded as an exclusive advisory for family offices, sovereign funds, and discerning international investors, <strong className="text-neutral-900 font-semibold">Jamoka Properties</strong> represents the vanguard of Dubai off-plan advisory.
                </p>
                <p>
                  Unlike traditional brokerage models, our operations are dedicated exclusively to primary master developments. We maintain direct, executive-level relationships with Dubai’s tier-1 master developers—securing early Stage-0 floor allocations, bespoke milestone structures, and zero agency brokerage fees for our investors.
                </p>
                <p>
                  Headquartered in Dubai, our multi-lingual team combines institutional legal diligence, RERA escrow verification, and predictive yield modeling to ensure client capital compounds securely.
                </p>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-neutral-200">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-1">
                    Direct Tier-1 Access
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug block">
                    Zero intermediary markups with direct developer pricing.
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-1">
                    100% Escrow Guard
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug block">
                    Every project audited against DLD Law No. 8 accounts.
                  </span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-1">
                    Complete Lifecycle
                  </span>
                  <span className="text-xs text-neutral-500 leading-snug block">
                    From pre-launch allocation to Golden Visa & handover.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Imagery with Zoom / Architectural Frame */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 aspect-4/3 group">
                <img
                  src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop"
                  alt="Dubai Architecture"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-widest block mb-1">
                    HEADQUARTERS • DUBAI
                  </span>
                  <p className="text-lg font-bold font-serif-luxury">
                    DIFC Gate Precinct & Downtown Advisory Galleries
                  </p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-xl shadow-xl border border-neutral-200 max-w-[220px] hidden sm:block">
                <span className="text-2xl font-extrabold text-[#0F172A] block font-serif-luxury">
                  100%
                </span>
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
                  Off-Plan Specialization
                </span>
                <span className="text-[11px] text-neutral-500 mt-1 block">
                  Focused purely on Dubai primary market allocations.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Section */}
      <section id="developers" className="py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#CFA55A]"></span>
              <span className="text-[11px] font-bold text-[#CFA55A] uppercase tracking-[0.24em]">
                AUTHORIZED MASTER DEVELOPERS
              </span>
              <span className="w-2.5 h-0.5 bg-[#CFA55A]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#0F172A] tracking-tight">
              Dubai's Preeminent Developers
            </h2>
            <p className="text-sm text-neutral-500 mt-3">
              Direct institutional partnerships ensuring priority registration and Stage-0 unit holds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MASTER_DEVELOPERS.map((dev) => (
              <div
                key={dev.name}
                className="bg-[#FAF9F6] p-6 rounded-2xl border border-neutral-200/90 hover:border-[#CFA55A]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-2xl font-extrabold font-serif-luxury text-[#0F172A] tracking-wider block">
                        {dev.name}
                      </span>
                      <span className="text-[11px] font-semibold text-neutral-500">
                        {dev.fullName}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#CFA55A] bg-white px-2.5 py-1 rounded-full border border-neutral-200 uppercase">
                      {dev.rating}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
                    {dev.tagline}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-200/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                      Marquee Off-Plan Developments:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dev.keyProjects.map((p, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white text-neutral-700 text-[10px] font-semibold border border-neutral-200"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200/80 flex items-center justify-between">
                  <span className="text-xs text-neutral-500">
                    {dev.activeProjects} Active Launches
                  </span>
                  <button
                    onClick={() => onInquireDeveloper(dev.name)}
                    className="text-xs font-bold text-[#CFA55A] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Request Allocations</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
