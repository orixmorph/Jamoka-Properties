import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Calculator, Percent, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';

interface MortgagePageProps {
  onNavigateContact: () => void;
}

export const MortgagePage: React.FC<MortgagePageProps> = ({ onNavigateContact }) => {
  const { t, isRTL } = useLanguage();
  const [propertyPrice, setPropertyPrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.25);
  const [loanYears, setLoanYears] = useState<number>(25);

  // Mortgage calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanYears * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? loanAmount / totalMonths
      : (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  const partnerBanks = [
    { name: 'Emirates NBD', type: 'Premier Retail & Wealth Bank', maxLTV: 'Up to 80%' },
    { name: 'First Abu Dhabi Bank (FAB)', type: 'UAE Largest Financial Institution', maxLTV: 'Up to 80%' },
    { name: 'Dubai Islamic Bank (DIB)', type: 'Pioneering Sharia-Compliant Home Murabaha', maxLTV: 'Up to 80%' },
    { name: 'Abu Dhabi Islamic Bank (ADIB)', type: 'Leading Islamic Home Finance & Fast Approvals', maxLTV: 'Up to 80%' },
    { name: 'Abu Dhabi Commercial Bank (ADCB)', type: 'Competitive Fixed Rate Facilities', maxLTV: 'Up to 75%' },
    { name: 'Mashreq Neo & Private Bank', type: 'Fast Digital Pre-Approvals', maxLTV: 'Up to 80%' },
    { name: 'Standard Chartered & HSBC', type: 'Cross-Border Non-Resident Specialists', maxLTV: 'Up to 65%' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>MORTGAGE & FINANCIAL SOLUTIONS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.mortgage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.mortgage.subtitle}
          </p>
        </div>
      </section>

      {/* Main Interactive Calculator Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Form Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#A6833D] uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <span>{t.mortgage.calcTitle}</span>
              </div>

              {/* Property Price Slider */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {t.mortgage.propertyPrice}
                  </span>
                  <span className="text-base font-extrabold text-slate-900 font-jakarta">
                    AED {propertyPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={25000000}
                  step={250000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>AED 1M</span>
                  <span>AED 10M</span>
                  <span>AED 25M+</span>
                </div>
              </div>

              {/* Down Payment Slider */}
              <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      {t.mortgage.downPayment} ({downPaymentPercent}%)
                    </span>
                    <span className="text-[11px] text-slate-500 font-light">
                      Min. 20% for UAE residents, 35%-40% for international non-residents
                    </span>
                  </div>
                  <span className="text-base font-extrabold text-slate-900 font-jakarta">
                    AED {Math.round(downPaymentAmount).toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] h-2 bg-neutral-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Loan Term & Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    {t.mortgage.loanTerm}
                  </span>
                  <select
                    value={loanYears}
                    onChange={(e) => setLoanYears(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-sm font-bold text-slate-800 bg-white outline-none"
                  >
                    <option value={10}>10 Years (120 Months)</option>
                    <option value={15}>15 Years (180 Months)</option>
                    <option value={20}>20 Years (240 Months)</option>
                    <option value={25}>25 Years (300 Months - Max)</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {t.mortgage.interestRate}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={3.5}
                    max={7.5}
                    step={0.25}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] h-2 bg-neutral-200 rounded-lg cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Summary Output Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0E17] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-xs text-[#ECC86A] font-bold uppercase tracking-widest block mb-1">
                  Estimated Repayment Breakdown
                </span>
                <h3 className="text-sm text-neutral-300 font-light">
                  {t.mortgage.monthlyInstallment}
                </h3>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-jakarta mt-1 mb-6">
                  AED {Math.round(monthlyPayment).toLocaleString()}
                  <span className="text-xs text-neutral-400 font-normal"> / month</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">{t.mortgage.loanAmount}</span>
                    <span className="font-bold text-white">
                      AED {Math.round(loanAmount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Total Interest Payable</span>
                    <span className="font-bold text-white">
                      AED {Math.round(totalInterest).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Total Repayment Amount</span>
                    <span className="font-bold text-white">
                      AED {Math.round(totalRepayment).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Handover Mortgage Highlight */}
                <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed font-light">
                  <span className="font-bold text-[#ECC86A] block mb-1">
                    Off-Plan Handover Financing:
                  </span>
                  You can secure bank pre-approval up to 6 months prior to project handover to finance the remaining 30% to 50% completion installment.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={onNavigateContact}
                  className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{t.mortgage.applyBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/97143999999?text=Hello%20Jamoka%20Properties,%20I%20would%20like%20a%20mortgage%20pre-approval%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Mortgage Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Banks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs text-[#A6833D] font-bold uppercase tracking-widest block mb-1">
            ACCREDITED INSTITUTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900">
            {t.mortgage.partnerBanks}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-2">
            Jamoka Properties liaises directly with mortgage divisions of all major UAE banks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerBanks.map((bank) => (
            <div
              key={bank.name}
              className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#D4AF37]/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#D4AF37] flex items-center justify-center font-bold">
                  <Landmark className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {bank.maxLTV} LTV
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 font-jakarta">{bank.name}</h3>
              <p className="text-xs text-slate-500 mt-1 font-light">{bank.type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UAE Central Bank Rules & Criteria */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 rounded-3xl bg-[#0F172A] text-white border border-neutral-800">
          <h3 className="text-xl font-bold font-serif-luxury text-white mb-4">
            Key Mortgage Regulations for Dubai Buyers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 font-light leading-relaxed">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">UAE Residents</span>
              Can borrow up to 80% of property value for their first property under AED 5 Million, requiring a 20% down payment equity.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">International Non-Residents</span>
              Foreign buyers without UAE residency can typically secure financing up to 60%-65% of the property value upon handover.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">Debt Burden Ratio (DBR)</span>
              The maximum total monthly debt repayments (mortgage, credit cards, car loans) must not exceed 50% of verified monthly gross income.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
