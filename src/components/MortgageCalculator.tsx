import React, { useState } from 'react';
import { Calculator, DollarSign, Calendar, Percent, ShieldCheck, ArrowRight } from 'lucide-react';

export const MortgageCalculator: React.FC<{ onBookConsultation: () => void }> = ({
  onBookConsultation,
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(3500000);
  const [planStructure, setPlanStructure] = useState<'60_40' | '50_50' | '70_30' | '80_20'>('60_40');
  const [constructionYears, setConstructionYears] = useState<number>(3);
  const [applyMortgageOnHandover, setApplyMortgageOnHandover] = useState<boolean>(true);
  const [mortgageTenureYears, setMortgageTenureYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.49); // UAE standard bank rate

  // Milestone splits
  const getSplits = () => {
    switch (planStructure) {
      case '50_50':
        return { booking: 10, construction: 40, handover: 50 };
      case '70_30':
        return { booking: 10, construction: 60, handover: 30 };
      case '80_20':
        return { booking: 20, construction: 60, handover: 20 };
      default: // 60_40
        return { booking: 10, construction: 50, handover: 40 };
    }
  };

  const splits = getSplits();
  const bookingAmount = (propertyPrice * splits.booking) / 100;
  const constructionTotal = (propertyPrice * splits.construction) / 100;
  const handoverAmount = (propertyPrice * splits.handover) / 100;
  const quarterlyInstalment = constructionTotal / (constructionYears * 4);

  // Mortgage on handover calculation
  // Monthly payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = mortgageTenureYears * 12;
  const loanPrincipal = handoverAmount;
  const monthlyHandoverMortgage =
    loanPrincipal > 0 && monthlyRate > 0
      ? (loanPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  return (
    <section id="mortgage-advisory" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>FINANCIAL ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
            Off-Plan Milestone & Mortgage Advisory
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
            Model your equity deployments across certified RERA construction stages, with pre-approved UAE mortgage conversion facilities upon handover.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Input Controls (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Property Purchase Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    Property Allocation Value (AED)
                  </label>
                  <span className="text-xl sm:text-2xl font-black text-[#CFA55A] font-jakarta">
                    AED {propertyPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="25000000"
                  step="250000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-[#CFA55A]"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 mt-1">
                  <span>AED 1.0M (Entry Suite)</span>
                  <span>AED 10M</span>
                  <span>AED 25M (Penthouse)</span>
                </div>
              </div>

              {/* Payment Framework Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                  Developer Payment Framework
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: '60_40', label: '60 / 40 Plan', sub: 'Standard Tier' },
                    { id: '50_50', label: '50 / 50 Plan', sub: 'Balanced' },
                    { id: '70_30', label: '70 / 30 Plan', sub: 'Downtown' },
                    { id: '80_20', label: '80 / 20 Plan', sub: '1% Monthly' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanStructure(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        planStructure === p.id
                          ? 'bg-[#CFA55A] text-black border-[#CFA55A] font-bold shadow-md'
                          : 'bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
                      }`}
                    >
                      <span className="block text-xs font-bold">{p.label}</span>
                      <span className="block text-[10px] opacity-75">{p.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Construction Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    Construction Horizon
                  </label>
                  <select
                    value={constructionYears}
                    onChange={(e) => setConstructionYears(Number(e.target.value))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#CFA55A]"
                  >
                    <option value={2}>2 Years (Fast-Track Handover)</option>
                    <option value={3}>3 Years (Master Planned)</option>
                    <option value={4}>4 Years (Trophy Island Horizon)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                    UAE Bank Handover Financing
                  </label>
                  <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3">
                    <input
                      type="checkbox"
                      id="mortgageToggle"
                      checked={applyMortgageOnHandover}
                      onChange={(e) => setApplyMortgageOnHandover(e.target.checked)}
                      className="w-4 h-4 accent-[#CFA55A] rounded cursor-pointer"
                    />
                    <label htmlFor="mortgageToggle" className="text-xs text-neutral-200 cursor-pointer font-medium">
                      Finance {splits.handover}% upon completion
                    </label>
                  </div>
                </div>
              </div>

              {/* Handover Mortgage Details if enabled */}
              {applyMortgageOnHandover && (
                <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/80 grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] uppercase text-neutral-400">Fixed Rate</span>
                    <span className="text-sm font-bold text-white">4.49% p.a. (UAE Resident/Non-Resident)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase text-neutral-400">Mortgage Tenure</span>
                    <span className="text-sm font-bold text-white">25 Years (UAE Central Bank Compliant)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Financial Output Summary (Right Column) */}
            <div className="lg:col-span-5 bg-neutral-900/90 rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#CFA55A] tracking-[0.2em] uppercase block mb-1">
                  DISBURSEMENT SCHEDULE
                </span>
                <h4 className="text-xl font-bold font-jakarta text-white">
                  Capital Commitment Summary
                </h4>

                <div className="mt-6 space-y-4 text-xs">
                  {/* Phase 1: Downpayment */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="font-semibold text-white block">
                        Phase 1: Initial Booking ({splits.booking}%)
                      </span>
                      <span className="text-[11px] text-neutral-400">Upon SPA & Oqood issuance</span>
                    </div>
                    <span className="font-bold text-white text-sm">
                      AED {bookingAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Phase 2: Construction Stagger */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="font-semibold text-white block">
                        Phase 2: Construction ({splits.construction}%)
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        ~AED {Math.round(quarterlyInstalment).toLocaleString()} / quarter ({constructionYears * 4} tranches)
                      </span>
                    </div>
                    <span className="font-bold text-white text-sm">
                      AED {constructionTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Phase 3: Handover */}
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <div>
                      <span className="font-semibold text-white block">
                        Phase 3: Handover Balance ({splits.handover}%)
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {applyMortgageOnHandover ? 'Mortgageable via UAE Partner Banks' : 'Lump Sum Settlement'}
                      </span>
                    </div>
                    <span className="font-bold text-[#CFA55A] text-sm">
                      AED {handoverAmount.toLocaleString()}
                    </span>
                  </div>

                  {/* Estimated Handover Mortgage EMI */}
                  {applyMortgageOnHandover && (
                    <div className="p-3.5 bg-[#FAF5EC]/10 rounded-xl border border-[#CFA55A]/30 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-[#CFA55A] block">
                          Handover Bank EMI (Monthly)
                        </span>
                        <span className="text-[10px] text-neutral-300">25 Years @ 4.49%</span>
                      </div>
                      <span className="text-base font-extrabold text-white">
                        ~AED {Math.round(monthlyHandoverMortgage).toLocaleString()} / mo
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={onBookConsultation}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0F172A] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <span>Request Bespoke Structuring Sheet</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-[10px] text-neutral-500 text-center block mt-2">
                  Complimentary advisory by certified Jamoka financial conveyancing partners.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
