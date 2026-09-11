import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TEAM_MEMBERS } from '../data/realEstateData';
import { AgentSlider } from '../components/AgentSlider';
import { ShieldCheck, Award, Building, Users, MapPin, CheckCircle2, ArrowRight, Quote } from 'lucide-react';

const CEO_PHOTO_URL = '/basil-al-naimi.jpg';

interface AboutPageProps {
  onNavigateContact: () => void;
  onNavigateOffPlan: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateContact, onNavigateOffPlan }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-24 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CFA55A]"></span>
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
                  <span className="text-xs text-[#CFA55A] font-bold uppercase tracking-widest block">
                    Bayswater Tower, 8th and 11th floor, Business Bay, Dubai
                  </span>
                  <p className="text-lg font-bold font-serif-luxury mt-1">
                    Licensed & Regulated by Dubai Real Estate Regulatory Agency (RERA)
                  </p>
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className={`absolute -bottom-6 ${isRTL ? '-left-4 sm:left-6' : '-right-4 sm:right-6'} bg-white p-5 rounded-2xl shadow-xl border border-[#CFA55A]/30 max-w-xs`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF5EC] text-[#CFA55A] flex items-center justify-center font-bold">
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
                  <Building className="w-5 h-5 text-[#CFA55A] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">Tier-1 Developer Access</span>
                    <span className="text-[11px] text-slate-500 font-light">Direct relationships with Emaar, Nakheel, and Omniyat.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onNavigateContact}
                  className="px-6 py-3.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#A6833D] text-[11px] font-bold tracking-widest uppercase mb-3">
              <Users className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>THE TEAM BEHIND JAMOKA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-serif-luxury">
              {t.about.teamTitle}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-3 font-light leading-relaxed">
              {t.about.teamSubtitle}
            </p>
          </div>

          {/* CEO Message & Executive Portrait */}
          <div id="ceo-message" className="mb-20 bg-gradient-to-br from-[#FAF9F6] via-white to-[#F7F4EC] rounded-3xl border border-[#CFA55A]/30 p-6 sm:p-8 lg:p-12 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            {/* Subtle luxury ambient glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(207,165,90,0.09)_0%,transparent_70%)] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Picture on the left side */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#CFA55A]/40 bg-slate-900 group">
                  <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden bg-slate-950">
                    <img
                      src={CEO_PHOTO_URL}
                      alt="Basil Al Naimi - Managing Director & CEO of Jamoka Properties"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const fallback = 'https://jamokaproperties.com/wp-content/uploads/2026/01/Basil-Al-Nuimi.jpeg';
                        const target = e.target as HTMLImageElement;
                        if (target.src !== fallback) {
                          target.src = fallback;
                        }
                      }}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {/* Subtle dark gradient overlay at bottom for badge contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Name badge over image on mobile / lower corner */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#CFA55A] text-[#0A0E17] text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                      <span>{t.about.ceoRole || 'Managing Director & CEO'}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                      {t.about.ceoName || 'Basil Al Naimi'}
                    </h3>
                    <p className="text-xs text-neutral-300 font-light">
                      {t.about.ceoCompany || 'Jamoka Properties'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CEO Message section on the right side */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/35 text-[#A6833D] text-[11px] font-bold tracking-widest uppercase mb-3">
                    <Quote className="w-3.5 h-3.5 text-[#CFA55A]" />
                    <span>{t.about.ceoBadge || 'EXECUTIVE LEADERSHIP'}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif-luxury tracking-tight leading-tight">
                    {t.about.ceoTitle || 'CEO Message'}
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#CFA55A] to-transparent mt-3" />
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  <p className="border-l-2 border-[#CFA55A] pl-4 py-1 text-slate-800 font-normal">
                    {t.about.ceoParagraph1}
                  </p>
                  <p>
                    {t.about.ceoParagraph2}
                  </p>
                  <p>
                    {t.about.ceoParagraph3}
                  </p>
                </div>

                {/* Signature & Title Block */}
                <div className="pt-4 border-t border-[#CFA55A]/20 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                      {t.about.ceoName || 'Basil Al Naimi'}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#A6833D] uppercase tracking-wider mt-0.5">
                      {t.about.ceoRole || 'Managing Director & CEO'}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {t.about.ceoCompany || 'Jamoka Properties'}
                    </p>
                  </div>

                  <button
                    onClick={onNavigateContact}
                    className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>Schedule an Appointment</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA55A]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group bg-[#FAF9F6] rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-[#CFA55A]/60 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-72 w-full overflow-hidden bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const fallback = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop';
                      const target = e.target as HTMLImageElement;
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-wider block">
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
                    <span className="text-xs font-semibold text-[#A6833D] block mt-1.5 leading-snug">
                      {member.specialty}
                    </span>
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

          {/* Horizontal Sliding Team Profiles (20 Specialized Advisors) */}
          <AgentSlider onContactAgent={() => onNavigateContact()} />
        </div>
      </section>

      {/* Trust Credentials Strip */}
      <section className="py-12 bg-black text-white border-t border-neutral-800">
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
              <MapPin className="w-10 h-10 text-[#CFA55A] shrink-0" />
              <div>
                <span className="font-bold text-white text-sm block">Business Bay Headquarters</span>
                <span className="text-xs text-neutral-400">Bayswater Tower, 8th and 11th floor, Business Bay, Dubai</span>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Building className="w-10 h-10 text-[#CFA55A] shrink-0" />
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
