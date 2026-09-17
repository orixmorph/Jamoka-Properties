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
      <section className="relative pt-36 sm:pt-40 pb-16 sm:pb-20 bg-[#0A0E17] text-white overflow-hidden">
        {/* Ambient Glow / Subtle Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#CFA55A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>CAREERS AT JAMOKA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3 tracking-tight">
            Careers at Jamoka
          </h1>

          <p className="text-[#CFA55A] text-base sm:text-lg font-medium mb-3">
            Build your career with a growing Dubai real estate company.
          </p>

          <p className="text-neutral-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
            We're always looking for ambitious people who want to grow, create, and make an impact in Dubai's real estate market. Explore our current opportunities below.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN CONTENT: LIST OR DETAIL VIEW                           */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
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
                  <span>OPPORTUNITIES</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
                  Open Positions
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
                  Find the opportunity that's right for you.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF5EC] border border-[#CFA55A]/30 text-xs font-semibold text-[#A6833D] self-start sm:self-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>2 Active Openings in Dubai</span>
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
                    className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-neutral-200/80 hover:border-[#CFA55A]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-5">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[11px] font-bold uppercase tracking-wider text-[#A6833D]">
                          {isSales ? (
                            <TrendingUp className="w-3.5 h-3.5 text-[#CFA55A]" />
                          ) : (
                            <Video className="w-3.5 h-3.5 text-[#CFA55A]" />
                          )}
                          <span>{position.department}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{position.type}</span>
                        </span>
                      </div>

                      {/* Title & Location */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors">
                          {position.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                          <MapPin className="w-4 h-4 text-[#CFA55A] shrink-0" />
                          <span>{position.location}</span>
                          <span>•</span>
                          <span className="text-slate-600">{position.department}</span>
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        {position.shortDescription}
                      </p>

                      {/* Key Offer Highlights */}
                      <div className="pt-2 border-t border-neutral-100 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                          Highlights
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {position.whatWeOffer.slice(0, 4).map((offer, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                              <span className="truncate">{offer}</span>
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

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setApplicationModalJob(position);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-[#FAF5EC] hover:bg-[#FAF0DC] border border-[#CFA55A]/40 text-[#A6833D] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Quick Apply
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectJob(position)}
                          className="px-5 py-2.5 rounded-xl bg-[#0A0E17] hover:bg-[#CFA55A] text-white hover:text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm group-hover:shadow-md cursor-pointer"
                        >
                          <span>View Role</span>
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
                      Collaborative Culture
                    </h4>
                    <p className="text-xs text-slate-500 font-light mt-1">
                      Work alongside experienced off-plan specialists, creative directors, and market leaders.
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
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
            <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-neutral-200/80 space-y-10">
              {/* Job Header */}
              <div className="border-b border-neutral-200 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <span className="px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[10px] font-bold uppercase tracking-wider text-[#A6833D]">
                      {selectedJob.department}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600">
                      {selectedJob.type}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" />
                      {selectedJob.location}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 font-serif-luxury">
                    {selectedJob.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 font-light mt-2">
                    <strong>{selectedJob.location}</strong> · {selectedJob.type}
                  </p>
                </div>

                <button
                  onClick={() => setApplicationModalJob(selectedJob)}
                  className="px-8 py-3.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Apply for this Position</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* About the Role */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>OVERVIEW</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  About the Role
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
                  Responsibilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] border border-neutral-200/60"
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
                  <span>QUALIFICATIONS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  Requirements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.requirements.map((req, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] border border-neutral-200/60"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                        {req}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Offer */}
              <div className="space-y-4 pt-4 border-t border-neutral-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] text-[#A6833D] text-[10px] font-bold uppercase tracking-wider">
                  <span>BENEFITS & ADVANTAGES</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                  What We Offer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedJob.whatWeOffer.map((offer, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] border border-neutral-200/60"
                    >
                      <Sparkles className="w-4 h-4 text-[#CFA55A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                        {offer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Block */}
              <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#0A0E17] text-white p-6 sm:p-8 rounded-3xl">
                <div>
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-widest block">
                    READY TO APPLY?
                  </span>
                  <h4 className="text-xl font-bold font-serif-luxury mt-0.5">
                    Take the next step in your real estate career.
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    Submit your details and CV/portfolio directly to Jamoka Properties.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleBackToPositions}
                    className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-neutral-700 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    All Roles
                  </button>

                  <button
                    onClick={() => setApplicationModalJob(selectedJob)}
                    className="w-1/2 sm:w-auto px-8 py-3.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Apply for this Position</span>
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
