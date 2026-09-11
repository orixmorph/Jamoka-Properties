import React from 'react';
import { DEVELOPERS_DATA } from '../data/realEstateData';
import { ShieldCheck, Award, ArrowUpRight } from 'lucide-react';

export const DevelopersSection: React.FC<{ onInquireDeveloper?: (name: string) => void }> = ({
  onInquireDeveloper,
}) => {
  return (
    <section id="developers" className="py-20 bg-neutral-50 border-t border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>DIRECT INSTITUTIONAL APPOINTMENTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-jakarta tracking-tight">
            Dubai Master Developers
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
            Jamoka Properties maintains direct Tier-1 partner agreements with the UAE’s sovereign and leading master developers, securing Stage 0 VIP pre-launch quotas for our clients.
          </p>
        </div>

        {/* Developer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEVELOPERS_DATA.map((dev) => (
            <div
              key={dev.name}
              className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-xl hover:border-[#CFA55A]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Developer Logo Monogram Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 px-3 bg-neutral-900 text-white rounded-lg flex items-center justify-center font-black tracking-widest text-xs font-jakarta uppercase group-hover:bg-[#CFA55A] group-hover:text-black transition-colors">
                    {dev.logoText}
                  </div>
                  <span className="text-[10px] font-bold text-[#A6833D] bg-[#FAF5EC] px-2 py-0.5 rounded-full border border-[#CFA55A]/20">
                    VIP ALLOCATION
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#CFA55A] transition-colors leading-tight">
                  {dev.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{dev.tagline}</p>

                <div className="my-4 pt-3 border-t border-neutral-100 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Delivery Track Record</span>
                    <span className="font-semibold text-slate-800">{dev.stats}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Flagship Developments</span>
                    <span className="font-semibold text-slate-800">{dev.flagship}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onInquireDeveloper && onInquireDeveloper(dev.name)}
                className="w-full mt-2 py-2.5 px-3 rounded-xl border border-neutral-200 hover:border-slate-900 text-slate-800 hover:text-black text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Request {dev.logoText} Quota</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#CFA55A]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
