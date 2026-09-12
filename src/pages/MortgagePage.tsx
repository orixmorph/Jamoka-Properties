import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Landmark, Calculator, Percent, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Mail, Phone, Send, Loader2, Clock, Building, Sparkles } from 'lucide-react';
import { sendToFormBold, FORMBOLD_ENDPOINT } from '../utils/formbold';
import { InquiryDesk } from '../components/InquiryDesk';

interface MortgagePageProps {
  onNavigateContact: () => void;
}

export const MortgagePage: React.FC<MortgagePageProps> = ({ onNavigateContact }) => {
  const { t, isRTL } = useLanguage();
  const [propertyPrice, setPropertyPrice] = useState<number>(3500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(4.25);
  const [loanYears, setLoanYears] = useState<number>(25);

  // Mortgage contact form state
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residencyStatus: 'UAE Resident',
    financingType: 'Handover Mortgage (Off-Plan)',
    estimatedPrice: 'AED 3,500,000',
    message: '',
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendToFormBold({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      residencyStatus: formData.residencyStatus,
      financingType: formData.financingType,
      estimatedPrice: formData.estimatedPrice || `AED ${propertyPrice.toLocaleString()}`,
      calculatedMonthlyPayment: `AED ${Math.round(monthlyPayment).toLocaleString()} / month`,
      calculatedDownPayment: `AED ${downPaymentAmount.toLocaleString()} (${downPaymentPercent}%)`,
      message: formData.message,
      source: 'Mortgage Page Consultation Form',
      subject: `Mortgage Pre-Approval Request - ${formData.name}`,
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

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
      <section className="relative pt-36 sm:pt-40 pb-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Landmark className="w-3.5 h-3.5 text-[#CFA55A]" />
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
                  className="w-full accent-[#CFA55A] h-2 bg-neutral-200 rounded-lg cursor-pointer"
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
                  className="w-full accent-[#CFA55A] h-2 bg-neutral-200 rounded-lg cursor-pointer"
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
                    className="w-full accent-[#CFA55A] h-2 bg-neutral-200 rounded-lg cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Right Summary Output Card */}
            <div className="lg:col-span-5 bg-neutral-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between border border-neutral-800">
              <div>
                <span className="text-xs text-[#CFA55A] font-bold uppercase tracking-widest block mb-1">
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
                  <span className="font-bold text-[#CFA55A] block mb-1">
                    Off-Plan Handover Financing:
                  </span>
                  You can secure bank pre-approval up to 6 months prior to project handover to finance the remaining 30% to 50% completion installment.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('mortgage-contact-form');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onNavigateContact();
                    }
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0F172A] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.mortgage.applyBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/971588648093?text=Hello%20Jamoka%20Properties,%20I%20would%20like%20a%20mortgage%20pre-approval%20consultation"
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
              className="p-6 rounded-2xl bg-white border border-neutral-200/80 hover:border-[#CFA55A]/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] text-[#CFA55A] flex items-center justify-center font-bold">
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
        <div className="p-8 rounded-3xl bg-neutral-950 text-white border border-neutral-800">
          <h3 className="text-xl font-bold font-serif-luxury text-white mb-4">
            Key Mortgage Regulations for Dubai Buyers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 font-light leading-relaxed">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#CFA55A] block text-sm mb-1">UAE Residents</span>
              Can borrow up to 80% of property value for their first property under AED 5 Million, requiring a 20% down payment equity.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#CFA55A] block text-sm mb-1">International Non-Residents</span>
              Foreign buyers without UAE residency can typically secure financing up to 60%-65% of the property value upon handover.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#CFA55A] block text-sm mb-1">Debt Burden Ratio (DBR)</span>
              The maximum total monthly debt repayments (mortgage, credit cards, car loans) must not exceed 50% of verified monthly gross income.
            </div>
          </div>
        </div>
      </section>

      {/* Mortgage Pre-Approval Consultation & Contact Form */}
      <section id="mortgage-contact-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-28">
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-neutral-200/90 relative overflow-hidden">
          {/* Subtle warm luxury glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(207,165,90,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
            {/* Left Side: Mortgage Advisory Features & Hotline */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/35 text-[#A6833D] text-[11px] font-bold tracking-widest uppercase mb-3">
                  <Landmark className="w-3.5 h-3.5 text-[#CFA55A]" />
                  <span>PRE-APPROVAL CONSULTATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 font-serif-luxury tracking-tight leading-tight">
                  Speak with a Mortgage Specialist
                </h2>
                <div className="w-16 h-0.5 bg-gradient-to-r from-[#CFA55A] to-transparent mt-3 mb-4" />
                <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
                  Plan your financing strategy with our licensed Dubai mortgage division. We compare competitive fixed and variable loan structures across the UAE’s leading institutions to deliver fast approvals.
                </p>
              </div>

              {/* Value Propositions */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#A6833D] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Fast 48-Hour Pre-Approval</h4>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">Receive formal bank pre-qualification to commit to properties with complete confidence.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#A6833D] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <Percent className="w-4 h-4 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Preferential Rates from 3.99%</h4>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">Access exclusive discounted interest spreads negotiated directly with premier UAE lenders.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/80">
                  <div className="w-9 h-9 rounded-xl bg-[#FAF5EC] text-[#A6833D] flex items-center justify-center font-bold shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Non-Resident & Expat Solutions</h4>
                    <p className="text-[11px] text-slate-500 font-light mt-0.5">Tailored underwriting for international property investors, Golden Visa holders, and offshore income streams.</p>
                  </div>
                </div>
              </div>

              {/* Direct Support Strip */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-[#CFA55A] font-bold uppercase tracking-wider block">Direct Mortgage Advisory</span>
                  <a href="tel:+971588648093" className="text-sm font-bold text-white hover:text-[#CFA55A] transition-colors">
                    +971 58 864 8093
                  </a>
                </div>
                <a
                  href="https://wa.me/971588648093?text=Hello%20Jamoka%20Properties,%20I%20would%20like%20to%20request%20a%20mortgage%20pre-approval%20consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Form */}
            <div className="lg:col-span-7 bg-[#FAF9F6] p-6 sm:p-8 rounded-2xl border border-neutral-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif-luxury">
                    Mortgage Pre-Approval Form
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-0.5">
                    Fill out your property details below for an obligation-free finance assessment.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Bank Assessment</span>
                </div>
              </div>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Mortgage Request Received</h4>
                    <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed font-light mt-1 max-w-md mx-auto">
                      Thank you, <span className="font-semibold text-emerald-950">{formData.name}</span>. Our senior mortgage consultant will review your profile and contact you within 24 hours with pre-approval options.
                    </p>
                  </div>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          residencyStatus: 'UAE Resident',
                          financingType: 'Handover Mortgage (Off-Plan)',
                          estimatedPrice: `AED ${propertyPrice.toLocaleString()}`,
                          message: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors shadow-sm cursor-pointer"
                    >
                      Submit Another Request
                    </button>
                    <a
                      href="https://wa.me/971588648093?text=Hello%20Jamoka%20Properties,%20I%20just%20submitted%20a%20mortgage%20inquiry"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs uppercase tracking-wider hover:bg-emerald-100 transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form action={FORMBOLD_ENDPOINT} method="POST" onSubmit={handleFormSubmit} className="space-y-4">
                  <input type="hidden" name="source" value="Mortgage Page (Pre-Approval Consultation)" />
                  <input type="hidden" name="calculated_monthly_payment" value={`AED ${Math.round(monthlyPayment).toLocaleString()} / month`} />

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Michael Smith"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Phone & Residency Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Residency Status
                      </label>
                      <select
                        name="residencyStatus"
                        value={formData.residencyStatus}
                        onChange={(e) => setFormData({ ...formData, residencyStatus: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs text-slate-700"
                      >
                        <option value="UAE Resident">UAE Resident (Salaried or Self-Employed)</option>
                        <option value="International Non-Resident">International Non-Resident Buyer</option>
                        <option value="UAE Golden Visa Holder">UAE Golden Visa Holder</option>
                        <option value="GCC National">GCC National</option>
                      </select>
                    </div>
                  </div>

                  {/* Financing Type & Estimated Property Value */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Financing Purpose
                      </label>
                      <select
                        name="financingType"
                        value={formData.financingType}
                        onChange={(e) => setFormData({ ...formData, financingType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs text-slate-700"
                      >
                        <option value="Handover Mortgage (Off-Plan)">Off-Plan Handover Financing (Remaining %)</option>
                        <option value="Secondary Market Purchase">Secondary Ready Property Purchase</option>
                        <option value="Islamic Home Murabaha">Islamic Financing (Sharia-Compliant Murabaha)</option>
                        <option value="Refinance & Equity Release">Equity Release / Mortgage Buyout</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                        Estimated Property Value (AED)
                      </label>
                      <input
                        type="text"
                        name="estimatedPrice"
                        value={formData.estimatedPrice}
                        onChange={(e) => setFormData({ ...formData, estimatedPrice: e.target.value })}
                        placeholder={`AED ${propertyPrice.toLocaleString()}`}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Message / Specific Requirements */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Notes or Additional Requirements (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Expected handover date, preferred bank, fixed loan duration preferences..."
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#CFA55A] focus:outline-none bg-white shadow-xs resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-slate-400 font-light flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                      <span>Data protected under UAE regulations. Confidential and secure.</span>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Pre-Approval Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Direct Contact & Inquiry Desk at Bottom */}
      <InquiryDesk />
    </div>
  );
};
