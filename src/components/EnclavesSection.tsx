import React from 'react';
import { ENCLAVES_DATA } from '../data/realEstateData';
import { TrendingUp, ArrowUpRight, Compass } from 'lucide-react';

export const EnclavesSection: React.FC<{ onExploreEnclave?: (name: string) => void }> = ({
  onExploreEnclave,
}) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>TERRITORIAL SPECIALIZATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
              Dubai Premier Investment Enclaves
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
              High-growth corridors exhibiting exceptional capital appreciation, institutional liquidity, and generational prestige.
            </p>
          </div>
        </div>

        {/* 3 Large Enclave Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ENCLAVES_DATA.map((enclave) => (
            <div
              key={enclave.name}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80 cursor-pointer"
              onClick={() => onExploreEnclave && onExploreEnclave(enclave.name)}
            >
              <img
                src={enclave.image}
                alt={enclave.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

              {/* Top YoY Pill */}
              <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-neutral-300 tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                  {enclave.tag}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {enclave.yoyGrowth}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-xs text-[#ECC86A] font-semibold tracking-wider uppercase block">
                  {enclave.developers}
                </span>
                <h3 className="text-2xl font-bold font-serif-luxury leading-snug">
                  {enclave.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 font-normal leading-relaxed">
                  {enclave.description}
                </p>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">
                    {enclave.startingPrice}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D4AF37] group-hover:text-black transition-colors flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
