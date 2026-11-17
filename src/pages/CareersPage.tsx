import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Send,
  Share2,
  Check,
  Coins,
  Briefcase,
  UserCheck,
  Gift,
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
  onJobSelect,
}) => {
  const { isRTL } = useLanguage();
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
    <div className={`min-h-screen bg-[#FAF9F6] pb-20 font-jakarta ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Clean Top Backdrop Strip for Site Navbar */}
      <div className="bg-[#0A0E17] pt-28 sm:pt-32 pb-6 sm:pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold font-caughe text-white tracking-tight">
            {isRTL ? 'الوظائف' : 'Careers'}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
        {!selectedJob ? (
          /* ========================================================= */
          /* SIDE-BY-SIDE SQUARE JOB LISTINGS                          */
          /* ========================================================= */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif-luxury">
                {isRTL ? 'الوظائف المتاحة حالياً' : 'Open Positions'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {isRTL
                  ? 'اختر دورك الوظيفي وقدّم خلال دقيقة واحدة'
                  : 'Select a role to view details or apply in 60 seconds'}
              </p>
            </div>

            {/* Square Side-by-Side Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {OPEN_POSITIONS.map((position) => {
                const isSales = position.slug === 'real-estate-agent';

                return (
                  <div
                    key={position.id}
                    id={`job-card-${position.slug}`}
                    onClick={() => handleSelectJob(position)}
                    className={`md:aspect-square bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl relative overflow-hidden group ${
                      isSales
                        ? 'border-[#CFA55A]/40 hover:border-[#CFA55A]'
                        : 'border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {/* Subtle Top Color Bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1.5 ${
                        isSales
                          ? 'bg-gradient-to-r from-[#CFA55A] to-[#E8CF94]'
                          : 'bg-gradient-to-r from-slate-800 to-slate-500'
                      }`}
                    />

                    {/* Top Info */}
                    <div className="space-y-3 pt-1">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span
                          className={`font-bold uppercase tracking-wider text-[11px] ${
                            isSales ? 'text-[#9A742E]' : 'text-slate-700'
                          }`}
                        >
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" />
                          {position.location}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-[26px] font-bold text-slate-900 font-serif-luxury leading-tight group-hover:text-[#9A742E] transition-colors">
                        {position.title}
                      </h3>

                      {/* Color Highlight Strip */}
                      <div
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 ${
                          isSales
                            ? 'bg-[#FAF5EC] text-[#8E6B2B] border border-[#CFA55A]/25'
                            : 'bg-slate-50 text-slate-800 border border-slate-200/80'
                        }`}
                      >
                        <Coins
                          className={`w-4 h-4 shrink-0 ${
                            isSales ? 'text-[#CFA55A]' : 'text-slate-600'
                          }`}
                        />
                        <span className="truncate">{position.compensationHighlight}</span>
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2">
                        {position.shortDescription}
                      </p>

                      {/* 3 Simple Key Points */}
                      <ul className="space-y-1.5 pt-1">
                        {position.keyPerks.slice(0, 3).map((perk, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isSales ? 'text-[#CFA55A]' : 'text-emerald-600'
                              }`}
                            />
                            <span className="font-medium truncate">{perk.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Emphasized Apply Now + Simple Details Link */}
                    <div className="pt-4 mt-4 border-t border-neutral-100 space-y-2.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setApplicationModalJob(position);
                        }}
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#CFA55A] via-[#dfb56c] to-[#CFA55A] text-slate-950 hover:brightness-105 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                      >
                        <span>{isRTL ? 'قدم الآن' : 'Apply Now'}</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectJob(position);
                        }}
                        className="w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>{isRTL ? 'عرض تفاصيل الوظيفة' : 'View role details'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* MINIMAL COLOR-CODED JOB DETAIL VIEW                       */
          /* ========================================================= */
          <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={handleBackToPositions}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#8E6B2B] hover:text-slate-900 transition-colors uppercase tracking-wider cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isRTL ? 'العودة للوظائف' : 'All Open Positions'}</span>
              </button>

              <button
                onClick={() => handleSharePosition(selectedJob)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>

            {/* Clean Overview Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9A742E]">
                    {selectedJob.department} • {selectedJob.type} • {selectedJob.location}
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif-luxury">
                    {selectedJob.title}
                  </h2>
                </div>

                {/* Emphasized Top Apply Now CTA */}
                <button
                  onClick={() => setApplicationModalJob(selectedJob)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] via-[#dfb56c] to-[#CFA55A] text-slate-950 hover:brightness-105 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
                >
                  <span>{isRTL ? 'قدم الآن' : 'Apply Now'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Pay & Overview */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#8E6B2B] text-xs sm:text-sm font-bold">
                <Coins className="w-4 h-4 text-[#CFA55A] shrink-0" />
                <span>{selectedJob.compensationHighlight}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {selectedJob.aboutRole[0]}
              </p>
            </div>

            {/* Color-Coded 3-Card Breakdown: Easy to Scan at a Glance */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* 1. What You'll Do (Warm Gold Tint) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#FDFBF5] border border-[#CFA55A]/30 space-y-3.5">
                <div className="flex items-center gap-2.5 text-[#8E6B2B]">
                  <div className="w-8 h-8 rounded-lg bg-[#CFA55A]/15 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-[#9A742E]" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {isRTL ? 'مهامك اليومية' : "What You'll Do"}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {selectedJob.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-[#CFA55A] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Who We're Looking For (Cool Slate Blue Tint) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#F4F7FB] border border-slate-200/90 space-y-3.5">
                <div className="flex items-center gap-2.5 text-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-slate-200/70 flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 text-slate-700" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {isRTL ? 'المتطلبات' : 'What You Need'}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {selectedJob.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 3. What You Get (Fresh Emerald Tint) */}
              <div className="rounded-2xl p-5 sm:p-6 bg-[#F2FAF6] border border-emerald-200/80 space-y-3.5">
                <div className="flex items-center gap-2.5 text-emerald-900">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <Gift className="w-4 h-4 text-emerald-700" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider">
                    {isRTL ? 'ما نقدمه لك' : 'What You Get'}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {selectedJob.whatWeOffer.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-800 font-medium leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Minimal Bottom Apply Bar */}
            <div className="bg-[#0A0E17] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base sm:text-lg font-bold font-serif-luxury">
                  {isRTL ? 'هل أنت مستعد للانضمام إلينا؟' : 'Ready to apply?'}
                </h4>
                <p className="text-xs text-neutral-300 mt-0.5">
                  {isRTL
                    ? 'يستغرق التقديم 60 ثانية فقط.'
                    : 'Takes 60 seconds. Direct review by our Business Bay leadership team.'}
                </p>
              </div>

              <button
                onClick={() => setApplicationModalJob(selectedJob)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] via-[#dfb56c] to-[#CFA55A] text-slate-950 hover:brightness-105 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
              >
                <span>{isRTL ? 'قدم الآن' : 'Apply Now'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Application Modal Dialog */}
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



