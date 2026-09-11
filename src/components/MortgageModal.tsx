import React, { useState } from 'react';

interface MortgageModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrice?: number;
}

export const MortgageModal: React.FC<MortgageModalProps> = ({
  isOpen,
  onClose,
  defaultPrice = 3500000,
}) => {
  const [propertyPrice, setPropertyPrice] = useState<number>(defaultPrice);
  const [constructionEquityPercent, setConstructionEquityPercent] = useState<number>(50); // e.g. 50% paid during build
  const [mortgageTermYears, setMortgageTermYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.75); // Current prime UAE mortgage rate
  const [investorStatus, setInvestorStatus] = useState<'resident' | 'non-resident'>('non-resident');

  if (!isOpen) return null;

  // Calculations
  const constructionEquityAed = (propertyPrice * constructionEquityPercent) / 100;
  const mortgageAmountAed = propertyPrice - constructionEquityAed; // Loan at handover
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = mortgageTermYears * 12;

  let monthlyInstallment = 0;
  if (monthlyRate > 0 && numberOfPayments > 0 && mortgageAmountAed > 0) {
    monthlyInstallment =
      (mortgageAmountAed *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  }

  // DLD fee 4% + registration admin
  const dldFee = propertyPrice * 0.04;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#CFA55A]/40 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-[#0F172A] text-white border-b border-[#CFA55A]/30">
          <div>
            <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-[0.24em] block">
              DUBAI REAL ESTATE FINANCING
            </span>
            <h2 className="text-xl md:text-2xl font-bold font-serif-luxury text-white">
              Off-Plan Mortgage & Handover Calculator
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Investor Residency Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider">
              Investor Status:
            </span>
            <div className="flex gap-1 bg-white p-1 rounded-lg border border-neutral-200">
              <button
                type="button"
                onClick={() => setInvestorStatus('non-resident')}
                className={`px-3 py-1 text-xs font-semibold rounded ${
                  investorStatus === 'non-resident'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                International / Non-Resident
              </button>
              <button
                type="button"
                onClick={() => setInvestorStatus('resident')}
                className={`px-3 py-1 text-xs font-semibold rounded ${
                  investorStatus === 'resident'
                    ? 'bg-[#0F172A] text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                UAE Resident / Citizen
              </button>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Off-Plan Property Value (AED)
                </label>
                <span className="text-sm font-extrabold text-[#0F172A]">
                  AED {propertyPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1500000"
                max="25000000"
                step="250000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-[#CFA55A] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-0.5">
                <span>AED 1.5M</span>
                <span>AED 10M</span>
                <span>AED 25M+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Paid During Construction Phase ({constructionEquityPercent}%)
                </label>
                <span className="text-sm font-extrabold text-[#CFA55A]">
                  AED {constructionEquityAed.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="10"
                value={constructionEquityPercent}
                onChange={(e) => setConstructionEquityPercent(Number(e.target.value))}
                className="w-full accent-[#CFA55A] cursor-pointer"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Staggered across 3-5 years linked to RERA construction milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                  Mortgage Term (Years at Handover)
                </label>
                <select
                  value={mortgageTermYears}
                  onChange={(e) => setMortgageTermYears(Number(e.target.value))}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CFA55A]"
                >
                  <option value={10}>10 Years</option>
                  <option value={15}>15 Years</option>
                  <option value={20}>20 Years</option>
                  <option value={25}>25 Years (Standard)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                  Estimated Bank Rate (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="3.0"
                  max="9.0"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#CFA55A]"
                />
              </div>
            </div>
          </div>

          {/* Financial Breakdown Card */}
          <div className="p-5 rounded-xl bg-[#FAF9F6] border border-[#CFA55A]/30 space-y-3">
            <div className="flex justify-between items-baseline pb-2 border-b border-neutral-200">
              <span className="text-xs uppercase font-bold text-neutral-600">
                Loan Amount at Handover ({100 - constructionEquityPercent}%)
              </span>
              <span className="text-base font-extrabold text-[#0F172A]">
                AED {mortgageAmountAed.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-baseline pb-2 border-b border-neutral-200">
              <span className="text-xs uppercase font-bold text-neutral-600">
                Estimated Monthly Repayment
              </span>
              <span className="text-lg font-extrabold text-[#CFA55A]">
                AED {Math.round(monthlyInstallment).toLocaleString()} / month
              </span>
            </div>

            <div className="flex justify-between items-baseline text-xs text-neutral-500 pt-1">
              <span>Estimated 4% DLD Fee + Trustee</span>
              <span>AED {dldFee.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-neutral-500 text-center sm:text-left">
            JAMOKA connects high-net-worth investors with leading UAE private banking desks (Emirates NBD, FAB, HSBC).
          </p>
          <button
            onClick={() => {
              onClose();
              document.getElementById('vip-inquiry')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#CFA55A] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-105 transition-all shrink-0"
          >
            Apply for Pre-Approval
          </button>
        </div>
      </div>
    </div>
  );
};
