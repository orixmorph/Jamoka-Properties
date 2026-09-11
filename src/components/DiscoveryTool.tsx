import React from 'react';
import { SlidersHorizontal, Sparkles, MapPin, CreditCard, DollarSign, Calendar } from 'lucide-react';

interface DiscoveryFilters {
  enclave: string;
  paymentPlan: string;
  priceBracket: string;
  completionYear: string;
}

interface DiscoveryToolProps {
  filters: DiscoveryFilters;
  onFilterChange: (key: keyof DiscoveryFilters, value: string) => void;
  onReset: () => void;
  matchCount: number;
}

export const DiscoveryTool: React.FC<DiscoveryToolProps> = ({
  filters,
  onFilterChange,
  onReset,
  matchCount,
}) => {
  const enclaves = ['All Enclaves', 'Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Dubai Water Canal', 'Dubai Harbour'];
  const paymentPlans = ['All Frameworks', '50 / 50 Milestones', '60 / 40 Handover', '70 / 30 On Handover', '80 / 20 Handover'];
  const priceBrackets = ['All Brackets', 'Under AED 3M', 'AED 3M - AED 10M', 'Above AED 10M'];
  const completionYears = ['All Horizons', '2026', '2027', '2028+'];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-6 relative z-30">
      <div className="bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-neutral-200/90 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F172A] text-[#CFA55A] flex items-center justify-center">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Off-Plan Portfolio Alignment Engine
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-[#FAF5EC] text-[#A6833D] px-2 py-0.5 rounded-full border border-[#CFA55A]/30">
                  <Sparkles className="w-3 h-3" /> LIVE DIRECTORY
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Filter Dubai off-plan inventory directly aligned to your capital deployment strategy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="font-extrabold">{matchCount}</span> Prime Allocations Matched
            </div>
            <button
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Enclave Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" /> Target Enclave
            </label>
            <select
              value={filters.enclave}
              onChange={(e) => onFilterChange('enclave', e.target.value)}
              className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CFA55A] transition-colors cursor-pointer"
            >
              {enclaves.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Plan */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-[#CFA55A]" /> Payment Framework
            </label>
            <select
              value={filters.paymentPlan}
              onChange={(e) => onFilterChange('paymentPlan', e.target.value)}
              className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CFA55A] transition-colors cursor-pointer"
            >
              {paymentPlans.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Price Bracket */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#CFA55A]" /> Investment Bracket
            </label>
            <select
              value={filters.priceBracket}
              onChange={(e) => onFilterChange('priceBracket', e.target.value)}
              className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CFA55A] transition-colors cursor-pointer"
            >
              {priceBrackets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Completion Horizon */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#CFA55A]" /> Completion Horizon
            </label>
            <select
              value={filters.completionYear}
              onChange={(e) => onFilterChange('completionYear', e.target.value)}
              className="w-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#CFA55A] transition-colors cursor-pointer"
            >
              {completionYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};
