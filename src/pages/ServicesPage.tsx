import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Sparkles, Award, Key, Building, CheckCircle2, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';

interface ServicesPageProps {
  onNavigateContact: () => void;
  onOpenSecondaryModal: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigateContact,
  onOpenSecondaryModal,
}) => {
  const { t, isRTL } = useLanguage();

  const services = [
    {
      icon: <Award className="w-7 h-7 text-[#D4AF37]" />,
      title: t.servicesPage.goldenVisaTitle,
      subtitle: 'Residency by Investment',
      desc: t.servicesPage.goldenVisaDesc,
      highlights: [
        'Eligible on cumulative real estate value of AED 2,000,000+',
        'Off-plan properties are 100% eligible with minimum AED 2M contract value',
        'Includes spouse, dependent children of any age, and domestic staff',
        'Direct coordination with Dubai Land Department (DLD) and GDRFA',
      ],
      ctaText: 'Inquire Golden Visa',
      action: onNavigateContact,
    },
    {
      icon: <Sparkles className="w-7 h-7 text-[#D4AF37]" />,
      title: t.servicesPage.stage0Title,
      subtitle: 'VIP Priority Allocation',
      desc: t.servicesPage.stage0Desc,
      highlights: [
        'Early Expression of Interest (EOI) token submission',
        'Access to full floor plates, duplexes, and prime view elevations',
        'Zero buyer agency commissions (developer compensated)',
        'Pre-launch price advantage before official public release',
      ],
      ctaText: 'Access Pre-Launch Units',
      action: onNavigateContact,
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-emerald-600" />,
      title: t.servicesPage.escrowTitle,
      subtitle: 'RERA Regulatory Compliance',
      desc: t.servicesPage.escrowDesc,
      highlights: [
        'Verification of Law No. 8 of 2007 trust bank account status',
        'Audit of developer construction milestones & engineering certificates',
        'Assistance with Dubai Land Department Oqood pre-registration',
        'Ensuring 100% safe disbursement of buyer construction tranches',
      ],
      ctaText: 'Escrow Verification',
      action: onNavigateContact,
    },
    {
      icon: <Key className="w-7 h-7 text-[#D4AF37]" />,
      title: t.servicesPage.portfolioTitle,
      subtitle: 'Secondary Market Partnership with SQFT DXB',
      desc: t.servicesPage.portfolioDesc,
      highlights: [
        'Professional snagging & handover key collection service',
        'Immediate transition to high-yield long-term tenancy or short-let',
        'Capital exit and resale marketing via partner brokerage SQFT DXB',
        'Access to verified secondary market buyers and cash investors',
      ],
      ctaText: 'Explore Secondary Market (SQFT DXB)',
      action: onOpenSecondaryModal,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>EXECUTIVE ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.servicesPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.servicesPage.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-neutral-200/80 hover:border-[#D4AF37]/60 hover:shadow-xl transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAF5EC] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#A6833D] uppercase tracking-wider block">
                      {service.subtitle}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  {service.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                <button
                  onClick={service.action}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] hover:brightness-125 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Secondary Resale Synergy Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FAF5EC] via-white to-[#F5EFE6] border border-[#D4AF37]/40 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-[#A6833D] uppercase tracking-widest block mb-1">
              DUAL BROKERAGE ECOSYSTEM
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
              Jamoka Properties & SQFT DXB
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mt-1 font-light leading-relaxed">
              While Jamoka Properties specializes exclusively in high-yield off-plan developer allocations, our partner brokerage SQFT DXB manages resale, ready villa acquisitions, and tenant leasing across prime Dubai communities.
            </p>
          </div>
          <button
            onClick={onOpenSecondaryModal}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
          >
            <span>Visit SQFT DXB</span>
            <ExternalLink className="w-4 h-4 text-[#ECC86A]" />
          </button>
        </div>
      </section>
    </div>
  );
};
