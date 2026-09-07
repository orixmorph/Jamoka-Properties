import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_MEMBERS } from '../data/realEstateData';
import { ShieldCheck, Award, Building, Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateContact: () => void;
  onNavigateOffPlan: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact, onNavigateOffPlan }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative py-20 sm:py-24 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
            <span>JAMOKA PROPERTIES DUBAI</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-serif-luxury tracking-tight text-white mb-4">
            {t.about.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Story & Heritage */}
      <section className="py-20 bg-[#FAF9F6] border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Collage */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
                  alt="Dubai Architecture"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest block">
                    Bayswater Tower, Business Bay, Dubai
                  </span>
                  <p className="text-lg font-bold font-serif-luxury mt-1">
                    Licensed & Regulated by Dubai Real Estate Regulatory Agency (RERA)
                  </p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className={`absolute -bottom-6 ${isRTL ? '-left-4 sm:left-6' : '-right-4 sm:right-6'} bg-white p-5 rounded-2xl shadow-xl border border-[#D4AF37]/30 max-w-xs`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] text-[#D4AF37] flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-slate-900 block">AED 3.8B+</span>
                    <span className="text-xs text-slate-500 font-medium">Off-Plan Transactions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Story Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[#A6833D] text-[11px] font-bold uppercase tracking-widest">
                <span>OUR MISSION & FOUNDATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-luxury">
                {t.about.storyTitle}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {t.about.storyText1}
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {t.about.storyText2}
              </p>

              {/* Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">100% Escrow Account Safety</span>
                    <span className="text-[11px] text-slate-500 font-light">Every installment routed strictly to Law No. 8 accounts.</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-neutral-200 flex items-start gap-3">
                  <Building className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">Tier-1 Developer Access</span>
                    <span className="text-[11px] text-slate-500 font-light">Direct relationships with Emaar, Nakheel, and Omniyat.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onNavigateContact}
                  className="px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
                >
                  <span>Schedule an Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onNavigateOffPlan}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-slate-900 border border-neutral-300 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Explore Off-Plan Projects</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Info & Portraits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-widest uppercase mb-3">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>THE TEAM BEHIND JAMOKA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-serif-luxury">
              {t.about.teamTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 font-light leading-relaxed">
              {t.about.teamSubtitle}
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group bg-[#FAF9F6] rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-[#D4AF37]/60 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                      {member.experience}
                    </span>
                    <h3 className="text-xl font-bold text-white font-serif-luxury">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                      {member.role}
                    </span>
                    <span className="text-[11px] font-semibold text-[#A6833D] block mt-1">
                      {member.specialty}
                    </span>
                    <p className="text-xs text-slate-600 mt-3 font-light leading-relaxed">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Jamoka Executive Desk</span>
                    <button
                      onClick={onNavigateContact}
                      className="font-bold text-[#A6833D] hover:text-slate-900 flex items-center gap-1 transition-colors"
                    >
                      <span>Connect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Credentials Strip */}
      <section className="py-12 bg-[#0F172A] text-white border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <ShieldCheck className="w-10 h-10 text-emerald-400 shrink-0" />
              <div>
                <span className="font-bold text-white text-sm block">RERA Registered Brokerage</span>
                <span className="text-xs text-neutral-400">Office Registration ORN: 49679</span>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <MapPin className="w-10 h-10 text-[#D4AF37] shrink-0" />
              <div>
                <span className="font-bold text-white text-sm block">Business Bay Headquarters</span>
                <span className="text-xs text-neutral-400">Bayswater Tower, Office 807, Business Bay, Dubai</span>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Building className="w-10 h-10 text-[#D4AF37] shrink-0" />
              <div>
                <span className="font-bold text-white text-sm block">Law No. 8 of 2007 Protected</span>
                <span className="text-xs text-neutral-400">Direct Land Department Trust Accounts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
