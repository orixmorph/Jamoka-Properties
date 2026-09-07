import React from 'react';
import { KeyRound, ShieldAlert, FileText, BadgePercent, Stamp, RefreshCw, ArrowUpRight } from 'lucide-react';

export const ServicesSection: React.FC<{ onBookConsultation: () => void }> = ({
  onBookConsultation,
}) => {
  const services = [
    {
      icon: KeyRound,
      title: 'Stage 0 VIP Pre-Launch Allocations',
      desc: 'Exclusive private access to developer launch allocations before open market publication, locking in floor-price unit tiers.',
    },
    {
      icon: Stamp,
      title: '10-Year UAE Golden Visa Advisory',
      desc: 'Complete legal facilitation of UAE Golden Residency for investors and family members on qualifying purchases of AED 2M+.',
    },
    {
      icon: ShieldAlert,
      title: 'DLD & Escrow Statutory Audit',
      desc: 'Rigorous legal vetting of RERA trust accounts, developer track records, and construction milestone verification.',
    },
    {
      icon: BadgePercent,
      title: 'Milestone & Mortgage Structuring',
      desc: 'Negotiation of extended post-handover payment terms and seamless handover mortgage take-outs with UAE banks.',
    },
    {
      icon: FileText,
      title: 'Oqood & Conveyancing Management',
      desc: 'Full title deed issuance, power of attorney execution for overseas principals, and cross-border currency compliance.',
    },
    {
      icon: RefreshCw,
      title: 'Secondary Resale Exit via SQFT DXB',
      desc: 'Direct synchronization with our partnered secondary market arm for turnkey resale at maximum capital gain realization.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-neutral-50 border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <span>FULL-LIFECYCLE MANDATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
            Institutional Real Estate Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
            Comprehensive off-plan acquisition advisory designed specifically for sovereign wealth, family offices, and discerning international investors.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className="bg-white rounded-2xl p-7 border border-neutral-200/80 hover:border-[#D4AF37]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] border border-[#D4AF37]/25 flex items-center justify-center text-[#D4AF37] mb-5 group-hover:scale-110 group-hover:bg-[#0F172A] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#D4AF37] transition-colors leading-tight mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                    Direct Mandate
                  </span>
                  <button
                    onClick={onBookConsultation}
                    className="text-xs font-bold text-[#D4AF37] hover:text-[#0F172A] flex items-center gap-1 transition-colors"
                  >
                    <span>Engage Advisory</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
