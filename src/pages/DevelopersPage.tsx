import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DEVELOPERS_DATA, Developer, OFF_PLAN_PROJECTS } from '../data/realEstateData';
import { Building2, Award, Calendar, ArrowRight, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

interface DevelopersPageProps {
  onNavigateOffPlan: () => void;
  onNavigateContact: () => void;
}

export const DevelopersPage: React.FC<DevelopersPageProps> = ({
  onNavigateOffPlan,
  onNavigateContact,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>ACCREDITED BUILDERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.developersPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.developersPage.subtitle}
          </p>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DEVELOPERS_DATA.map((dev) => {
            // Check active listings for this developer in our catalog
            const devProjects = OFF_PLAN_PROJECTS.filter((p) =>
              p.developer.toLowerCase().includes(dev.name.toLowerCase().split(' ')[0])
            );

            return (
              <div
                key={dev.name}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-neutral-200/80 hover:border-[#D4AF37]/60 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6833D] block">
                        {dev.tier}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 font-serif-luxury mt-0.5">
                        {dev.name}
                      </h2>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-neutral-100 text-slate-900 font-extrabold text-xs tracking-wider uppercase font-jakarta border border-neutral-200">
                      Est. {dev.founded}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-4">
                    {dev.description}
                  </p>

                  <div className="space-y-2 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t.developersPage.unitsDelivered}</span>
                      <span className="font-bold text-slate-900">{dev.stats}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 pt-2 border-t border-neutral-200/60">
                      <span className="text-slate-500 shrink-0">Flagship Portfolio:</span>
                      <span className="font-semibold text-slate-800 text-right">{dev.flagship}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium">
                    {devProjects.length > 0 ? (
                      <span className="text-emerald-700 font-semibold">
                        {devProjects.length} Active Allocations in Jamoka Catalog
                      </span>
                    ) : (
                      'Direct Developer Relationship'
                    )}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={onNavigateOffPlan}
                      className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      {t.developersPage.viewProjects}
                    </button>
                    <button
                      onClick={onNavigateContact}
                      className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Developer Access Guarantee */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="p-8 rounded-3xl bg-[#0F172A] text-white border border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-300 font-light leading-relaxed">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">
                Zero Buyer Brokerage Commission
              </span>
              In off-plan developer purchases in Dubai, buyers pay 0% agency fees. Agency commission is compensated directly by the master developer.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">
                Pre-Launch Priority Units
              </span>
              Our accredited partner status allows clients to submit Letters of Intent (EOI) for high-demand units prior to public launch days.
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="font-bold text-[#ECC86A] block text-sm mb-1">
                Escrow Account Verification
              </span>
              Every contract is validated against RERA statutory accounts under Law No. 8 to verify project registration and construction milestones.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
