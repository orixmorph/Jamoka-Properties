import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Building,
  Users,
  Video,
  TrendingUp,
  ShieldCheck,
  Send,
  Share2,
  Check,
  Coins,
  Award,
  Zap,
  Star,
  DollarSign,
  Compass,
  FileCheck2,
} from 'lucide-react';
import { OPEN_POSITIONS, JobPosition } from '../data/careersData';
import { JobApplicationModal } from '../components/JobApplicationModal';

interface CareersPageProps {
  initialJobSlug?: string | null;
  onNavigateContact?: () => void;
  onJobSelect?: (slug: string | null) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  initialJobSlug,
  onNavigateContact,
  onJobSelect,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  const [applicationModalJob, setApplicationModalJob] = useState<JobPosition | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync selected job with initialJobSlug prop or URL
  useEffect(() => {
    if (initialJobSlug) {
      const match = OPEN_POSITIONS.find((pos) => pos.slug === initialJobSlug);
      if (match) {
        setSelectedJob(match);
        return;
      }
    }
    setSelectedJob(null);
  }, [initialJobSlug]);

  const handleSelectJob = (position: JobPosition) => {
    setSelectedJob(position);
    if (onJobSelect) {
      onJobSelect(position.slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPositions = () => {
    setSelectedJob(null);
    if (onJobSelect) {
      onJobSelect(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSharePosition = (pos: JobPosition) => {
    const url = `${window.location.origin}/careers/${pos.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24 font-jakarta">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-36 sm:pt-40 pb-20 sm:pb-24 bg-[#0A0E17] text-white overflow-hidden">
        {/* Ambient Glow / Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/95 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CFA55A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>WE ARE EXPANDING • HIRING IN DUBAI</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-caughe text-white mb-4 tracking-tight leading-tight">
            Careers at Jamoka Properties
          </h1>

          <p className="text-[#CFA55A] text-lg sm:text-xl font-medium mb-3 max-w-2xl mx-auto">
            High-earning potential, prime Business Bay offices & a winning culture.
          </p>

          <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed mb-8">
            Whether you are closing mega-deals across Dubai&apos;s luxury skyline or shooting cinematic viral stories, Jamoka Properties provides the qualified leads, attractive salary benefits, and creative freedom you need to excel.
          </p>

          {/* Quick value badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-300">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Coins className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span className="font-semibold text-white">Attractive Salary & Benefits</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CFA55A]/15 border border-[#CFA55A]/40 text-[#E8CF94]">
              <TrendingUp className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span className="font-semibold text-white">Up to 70% Commission (Paid On Spot)</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span className="font-semibold text-white">Daily Qualified Leads</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              <Building className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span className="font-semibold text-white">Bayswater Tower, Business Bay</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN CONTENT: LIST OR DETAIL VIEW                           */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {!selectedJob ? (
          /* ========================================================= */
          /* OPEN POSITIONS LIST VIEW                                  */
          /* ========================================================= */
          <div className="space-y-8">
            {/* Section Header */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-[#A6833D] text-xs font-bold uppercase tracking-wider mb-1">
                  <Briefcase className="w-4 h-4 text-[#CFA55A]" />
                  <span>SELECT YOUR PATH</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
                  Current Open Positions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                  Click on any position to view the full scope or apply in 60 seconds.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#FAF5EC] border border-[#CFA55A]/40 text-xs font-bold text-[#A6833D] self-start sm:self-center shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>2 Active Priority Openings in Dubai</span>
              </div>
            </div>

            {/* Job Opening Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {OPEN_POSITIONS.map((position) => {
                const isSales = position.slug === 'real-estate-agent';

                return (
                  <div
                    key={position.id}
                    id={`job-card-${position.slug}`}
                    onClick={() => handleSelectJob(position)}
                    className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-neutral-200 hover:border-[#CFA55A] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
                  >
                    {/* Top Accent Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#CFA55A] via-[#E8CF94] to-[#0A0E17]" />

                    <div className="space-y-5">
                      {/* Top Badges & Department */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/40 text-[11px] font-bold uppercase tracking-wider text-[#A6833D]">
                          {isSales ? (
                            <TrendingUp className="w-3.5 h-3.5 text-[#CFA55A]" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-[#CFA55A]" />
                          )}
                          <span>{position.department}</span>
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-800">
                          <Star className="w-3 h-3 text-emerald-600 fill-emerald-600" />
                          <span>{position.badge}</span>
                        </span>
                      </div>

                      {/* Title & Location */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors leading-tight">
                          {position.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                            {position.location}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {position.type}
                          </span>
                        </div>
                      </div>

                      {/* Big Attractive Salary / Compensation Banner */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF5EC] via-[#FFFDF9] to-[#FAF5EC] border border-[#CFA55A]/40 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#CFA55A]/20 border border-[#CFA55A]/40 flex items-center justify-center shrink-0">
                          <Coins className="w-5 h-5 text-[#A6833D]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-[#A6833D] uppercase tracking-wider block">
                            Compensation & Perks
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug block">
                            {position.compensationHighlight}
                          </span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        {position.shortDescription}
                      </p>

                      {/* 4 Key Pillars / Perks */}
                      <div className="pt-2 border-t border-neutral-100 space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                          Key Role Advantages
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {position.keyPerks.map((perk, idx) => (
                            <div
                              key={idx}
                              className="p-2.5 rounded-xl bg-[#FAF9F6] border border-neutral-200/70 hover:border-[#CFA55A]/50 transition-colors"
                            >
                              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                                <span className="truncate">{perk.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-light mt-1 line-clamp-2 leading-tight">
                                {perk.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Jamoka Properties • Business Bay
                      </span>

                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setApplicationModalJob(position);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-[#FAF5EC] hover:bg-[#FAF0DC] border border-[#CFA55A]/50 text-[#A6833D] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs hover:shadow-sm"
                        >
                          Quick Apply
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectJob(position)}
                          className="px-5 py-2.5 rounded-xl bg-[#0A0E17] hover:bg-[#CFA55A] text-white hover:text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md group-hover:shadow-lg cursor-pointer"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* General Culture / Value Strip */}
            <div className="bg-gradient-to-br from-[#FAF9F6] via-white to-[#F7F4EC] rounded-3xl border border-[#CFA55A]/30 p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center shrink-0">
                    <Building className="w-6 h-6 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Prime Dubai Headquarters
                    </h4>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      Located in Bayswater Tower, 8th & 11th floor, Business Bay overlooking Dubai Canal.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Collaborative High-Energy Culture
                    </h4>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      Work alongside experienced off-plan specialists, full-time video creators, and market leaders.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#CFA55A]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Licensed & Accredited
                    </h4>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      RERA Brokerage ORN: 49679 with direct tier-1 developer allocations across the UAE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* DEDICATED JOB DETAIL VIEW                                 */
          /* ========================================================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top Navigation Strip */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleBackToPositions}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#A6833D] hover:text-slate-900 transition-colors uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Open Positions</span>
              </button>

              <button
                onClick={() => handleSharePosition(selectedJob)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer shadow-xs"
                title="Share position link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share Position</span>
                  </>
                )}
              </button>
            </div>

            {/* Main Job Detail Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-neutral-200/80 space-y-10 relative overflow-hidden">
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#CFA55A] via-[#E8CF94] to-[#0A0E17]" />

              {/* Job Header */}
              <div className="border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
                    <span className="px-3.5 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[10px] font-bold uppercase tracking-wider text-[#A6833D]">
                      {selectedJob.department}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700">
                      {selectedJob.type}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" />
                      {selectedJob.location}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif-luxury leading-tight">
                    {selectedJob.title}
                  </h2>

                  {/* Compensation highlight banner in detail view */}
                  <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
                    <Coins className="w-4 h-4 text-emerald-600" />
                    <span>{selectedJob.compensationHighlight}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    onClick={() => setApplicationModalJob(selectedJob)}
                    className="px-8 py-3.5 rounded-xl bg-[#0A0E17] hover:bg-[#CFA55A] text-white hover:text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Apply for this Position</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4 Major Pillars Box */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedJob.keyPerks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#CFA55A]/30 space-y-1.5 shadow-xs"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#CFA55A]/30 flex items-center justify-center mb-2">
                      <Award className="w-4 h-4 text-[#CFA55A]" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      {perk.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-light leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* About the Role */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>ROLE CONTEXT</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  About the Opportunity
                </h3>
                <div className="space-y-3 text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                  {selectedJob.aboutRole.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>DUTIES & EXPECTATIONS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  Core Responsibilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-neutral-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#CFA55A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                        {resp}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>WHAT WE ARE LOOKING FOR</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  Role Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-neutral-200/70"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Offer / Benefits */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>COMPENSATION & BENEFITS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  What You Receive at Jamoka
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.whatWeOffer.map((offer, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF9F6] border border-neutral-200/70"
                    >
                      <Sparkles className="w-4 h-4 text-[#CFA55A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                        {offer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0A0E17] text-white p-6 sm:p-10 rounded-3xl relative overflow-hidden">
                <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-[#CFA55A]/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-widest block">
                    READY TO APPLY?
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold font-serif-luxury mt-0.5">
                    Take the next step in your Dubai career.
                  </h4>
                  <p className="text-xs text-neutral-300 font-light mt-1 max-w-md">
                    Submit your application in under 60 seconds. Our talent acquisition team will review your profile immediately.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto relative z-10">
                  <button
                    onClick={handleBackToPositions}
                    className="w-1/2 sm:w-auto px-5 py-3.5 rounded-xl border border-neutral-700 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    All Openings
                  </button>

                  <button
                    onClick={() => setApplicationModalJob(selectedJob)}
                    className="w-1/2 sm:w-auto px-8 py-3.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Apply Now</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. APPLICATION MODAL DIALOG                                   */}
      {/* ------------------------------------------------------------- */}
      {applicationModalJob && (
        <JobApplicationModal
          position={applicationModalJob}
          isOpen={!!applicationModalJob}
          onClose={() => setApplicationModalJob(null)}
        />
      )}
    </div>
  );
};

