import React from 'react';
import { TrendingUp, ShieldCheck, DollarSign, Building, Award, CheckCircle2 } from 'lucide-react';

export const AdvantagesSection: React.FC = () => {
  const advantages = [
    {
      title: 'Ground-Floor Launch Pricing',
      desc: 'Acquire at the developer launch baseline before public marketing pushes prices higher across consecutive phases.',
    },
    {
      title: 'Strict RERA Escrow Security',
      desc: 'Every payment is deposited into an independent government-monitored escrow account, released only upon physical construction audits.',
    },
    {
      title: 'Staggered Capital Calls',
      desc: 'Spread your financial outlay across 2 to 4 years without liquidating other high-yielding assets prematurely.',
    },
    {
      title: 'Zero Property & Capital Gains Tax',
      desc: 'Dubai levies 0% capital gains tax, 0% personal income tax, and 0% annual municipal property holding tax.',
    },
    {
      title: 'High Rental Yield Benchmark',
      desc: 'Modern off-plan completions in Dubai command 7.5% to 9.5% gross rental yields, significantly outperforming London, New York, or Singapore.',
    },
    {
      title: 'Seamless Golden Visa Route',
      desc: 'Purchases of AED 2M ($545k) or more qualify the buyer and their family for renewable 10-year residency with full bank account privileges.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Capital Appreciation Chart Visual */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase">
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>EMPIRICAL APPRECIATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] font-caughe tracking-tight leading-tight">
              The Off-Plan Capital Appreciation Curve
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Historical performance data across Dubai’s Tier-1 developments demonstrates an average capital growth of 45% to 65% from launch allocation through to final handover and secondary trading.
            </p>

            {/* Custom SVG Capital Appreciation Graph */}
            <div className="p-6 rounded-2xl bg-[#0F172A] text-white border border-neutral-800 shadow-xl">
              <div className="flex justify-between items-center mb-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block">Average Value Expansion</span>
                  <span className="text-xl font-extrabold text-[#D4AF37]">+58.4% Net Appreciation</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-400 block">Typical Horizon</span>
                  <span className="font-semibold text-white">36 Months</span>
                </div>
              </div>

              {/* Responsive SVG Curve */}
              <div className="relative h-44 w-full pt-4">
                <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Shaded Area */}
                  <path
                    d="M 10 140 C 120 135, 180 110, 260 80 C 340 50, 420 30, 490 15 L 490 150 L 10 150 Z"
                    fill="url(#curveGradient)"
                  />

                  {/* Golden Curve Line */}
                  <path
                    d="M 10 140 C 120 135, 180 110, 260 80 C 340 50, 420 30, 490 15"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Milestone Points */}
                  <circle cx="10" cy="140" r="5" fill="#D4AF37" />
                  <circle cx="170" cy="115" r="5" fill="#D4AF37" />
                  <circle cx="340" cy="50" r="5" fill="#D4AF37" />
                  <circle cx="490" cy="15" r="6" fill="#FFFFFF" stroke="#D4AF37" strokeWidth="3" />
                </svg>

                {/* Milestone Labels */}
                <div className="flex justify-between text-[10px] text-neutral-400 mt-3 pt-2 border-t border-neutral-800">
                  <span>VIP Launch (0%)</span>
                  <span>Superstructure (+22%)</span>
                  <span>Handover (+48%)</span>
                  <span className="text-[#D4AF37] font-bold">Resale / Handover (+58%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Value Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-[#D4AF37]/50 hover:bg-white transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2 mb-2 text-[#0F172A] group-hover:text-[#D4AF37] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <h3 className="font-bold text-sm">{adv.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
