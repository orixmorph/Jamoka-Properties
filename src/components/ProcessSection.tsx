import React from 'react';
import { Compass, Filter, CheckCircle, Key } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Strategic Brief & Alignment',
      desc: 'We analyze your capital allocation parameters, return horizons, and tax residency objectives to formulate a customized off-plan strategy.',
      icon: Compass,
    },
    {
      num: '02',
      title: 'Tier-1 Inventory Shortlist',
      desc: 'Gain direct access to unreleased master developer units, high-floor premium orientations, and verified escrow trust accounts.',
      icon: Filter,
    },
    {
      num: '03',
      title: 'Allocation & Oqood Registration',
      desc: 'Lock in launch pricing with a 10% booking deposit. We handle formal DLD registration, interim title deed cataloging, and legal reviews.',
      icon: CheckCircle,
    },
    {
      num: '04',
      title: 'Handover & Secondary Exit',
      desc: 'Rigorous architectural snagging upon completion, followed by turnkey tenant placement or strategic secondary resale via SQFT DXB.',
      icon: Key,
    },
  ];

  return (
    <section className="py-20 bg-neutral-50 border-t border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <span>THE JAMOKA METHOD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
            Our 4-Step Acquisition Process
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
            From initial sovereign thesis to final title deed handover, we safeguard your capital at every construction milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl p-7 border border-neutral-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:border-[#D4AF37]/50 transition-all"
              >
                <div className="absolute top-3 right-4 text-4xl font-black text-neutral-100 font-caughe select-none group-hover:text-[#FAF5EC] transition-colors">
                  {step.num}
                </div>

                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center mb-5 group-hover:bg-[#0F172A] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 text-[10px] font-bold text-[#A6833D] uppercase tracking-widest">
                  Stage {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
