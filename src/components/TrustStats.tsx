import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Star, Users, Building2, Globe, Award, Languages, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { useInView } from 'motion/react';

interface AnimatedStatProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 1800,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth ease-out curve: 1 - Math.pow(1 - progress, 3)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeOut * target);

      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const TrustStats: React.FC = () => {
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const stats = [
    {
      icon: Users,
      targetNumber: 70,
      suffix: '+',
      label: 'Property Advisors',
      detail: 'Dedicated off-plan specialists',
    },
    {
      icon: Award,
      targetNumber: 5,
      suffix: '+',
      label: 'Years of Excellence',
      detail: 'High-net-worth investor track record',
    },
    {
      icon: Building2,
      targetNumber: 2,
      suffix: '',
      label: 'Dubai Offices',
      detail: 'Bayswater Tower (8th & 11th Fl.)',
    },
    {
      icon: Globe,
      targetNumber: 15,
      suffix: '+',
      label: 'Nationalities',
      detail: 'Multilingual team (18+ languages spoken)',
    },
  ];

  const primaryLanguages = [
    { name: 'English', native: 'English' },
    { name: 'French', native: 'Français' },
    { name: 'Urdu', native: 'اردو' },
    { name: 'Arabic', native: 'العربية' },
    { name: 'Hindi', native: 'हिन्दी' },
    { name: 'Turkish', native: 'Türkçe' },
    { name: 'Bulgarian', native: 'Български' },
    { name: 'Swedish', native: 'Svenska' },
    { name: 'German', native: 'Deutsch' },
    { name: 'Russian', native: 'Русский' },
  ];

  const secondaryLanguages = [
    { name: 'Albanian', native: 'Shqip' },
    { name: 'Luxembourgish', native: 'Lëtzebuergesch' },
    { name: 'Danish', native: 'Dansk' },
    { name: 'Norwegian', native: 'Norsk' },
    { name: 'Italian', native: 'Italiano' },
    { name: 'Kurmanji', native: 'Kurdî' },
    { name: 'Philippines', native: 'Tagalog' },
    { name: 'Persian', native: 'فارسی' },
  ];

  return (
    <section id="about-us" className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Floating Trust Metric Bar */}
      <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-neutral-100 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                  index > 0 ? 'sm:pl-8' : ''
                } ${index > 1 ? 'pt-6 sm:pt-0' : ''}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A]">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A] font-jakarta">
                    <AnimatedStat target={stat.targetNumber} suffix={stat.suffix} />
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 tracking-wide font-jakarta">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-light font-jakarta">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Minimal Multilingual Advisory Element */}
        <div className="mt-7 pt-6 border-t border-neutral-100">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FAF5EC] border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A] shrink-0">
                <Languages className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-900 tracking-wide font-jakarta">
                Languages Spoken:
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#FAF5EC] text-[#B8860B] border border-[#CFA55A]/30">
                18+ Languages
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-light hidden sm:block">
              Consult with an off-plan advisor fluent in your native language
            </p>
          </div>

          {/* Line 1: Single line of languages + toggle button */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1">
            {primaryLanguages.map((lang) => (
              <a
                key={lang.name}
                href={`https://wa.me/971588648093?text=${encodeURIComponent(
                  `Hello Jamoka Properties, I would like to consult with an off-plan property advisor who speaks ${lang.name} (${lang.native}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Click to connect with a ${lang.name}-speaking advisor on WhatsApp`}
                className="shrink-0 group inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-50/90 hover:bg-[#FAF5EC] border border-neutral-200 hover:border-[#CFA55A]/60 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap"
              >
                <span className="text-slate-900 font-semibold group-hover:text-[#B8860B] transition-colors">
                  {lang.native}
                </span>
                {lang.native !== lang.name && (
                  <span className="text-slate-400 group-hover:text-slate-600 text-[10px]">
                    {lang.name}
                  </span>
                )}
              </a>
            ))}

            {/* +8 more / Show less toggle */}
            <button
              type="button"
              onClick={() => setShowAllLanguages(!showAllLanguages)}
              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#FAF5EC] hover:border-[#CFA55A]/50 border border-slate-200 text-slate-700 hover:text-slate-900 text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap"
            >
              <span>{showAllLanguages ? 'Show less' : `+${secondaryLanguages.length} more`}</span>
              {showAllLanguages ? (
                <ChevronUp className="w-3 h-3 text-slate-500" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-500" />
              )}
            </button>
          </div>

          {/* Line 2: Expandable secondary languages */}
          {showAllLanguages && (
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pt-2 pb-1 animate-fadeIn">
              {secondaryLanguages.map((lang) => (
                <a
                  key={lang.name}
                  href={`https://wa.me/971588648093?text=${encodeURIComponent(
                    `Hello Jamoka Properties, I would like to consult with an off-plan property advisor who speaks ${lang.name} (${lang.native}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Click to connect with a ${lang.name}-speaking advisor on WhatsApp`}
                  className="shrink-0 group inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF5EC] border border-neutral-200 hover:border-[#CFA55A]/60 text-slate-700 hover:text-slate-900 text-[11px] font-medium transition-all shadow-2xs hover:shadow-xs cursor-pointer whitespace-nowrap"
                >
                  <span className="text-slate-900 font-semibold group-hover:text-[#B8860B] transition-colors">
                    {lang.native}
                  </span>
                  {lang.native !== lang.name && (
                    <span className="text-slate-400 group-hover:text-slate-600 text-[10px]">
                      {lang.name}
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Underneath Button: Centered "Chat with your language" sinking seamlessly into the design */}
          <div className="flex justify-center pt-3 sm:pt-4">
            <a
              href="https://wa.me/971588648093?text=Hello%20Jamoka%20Properties,%20I%20would%20like%20to%20consult%20with%20an%20advisor%20in%20my%20native%20language."
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#FAF5EC] hover:bg-[#F5EBD7] border border-[#CFA55A]/40 hover:border-[#CFA55A] text-slate-900 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <MessageCircle className="w-3 h-3 text-emerald-600 group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-xs font-bold tracking-wide font-jakarta text-slate-900 group-hover:text-[#B8860B] transition-colors">
                Chat with your language
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white border border-[#CFA55A]/30 text-[#B8860B]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                WhatsApp
              </span>
            </a>
          </div>
        </div>

        {/* Reputation & Google Review Bar */}
        <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-jakarta">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amber-400 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-slate-900 text-sm">4.9 / 5.0</span>
            <span className="text-slate-500 font-light">
              Verified Rating from over 650+ Global Property Investors
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              <ShieldCheck className="w-4 h-4" />
              RERA Lic. #49679
            </span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="text-slate-500 hidden sm:inline font-light">
              Authorized Allocation Partner for Emaar, Nakheel, Omniyat & Sobha
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
