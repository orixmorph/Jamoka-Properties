import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Star, Users, Building2, Globe, Award } from 'lucide-react';
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
      detail: 'Bayswater Tower Business Bay & Marina',
    },
    {
      icon: Globe,
      targetNumber: 15,
      suffix: '+',
      label: 'Nationalities',
      detail: 'Multilingual investor advisory',
    },
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
                  <div className="w-10 h-10 rounded-xl bg-[#FAF5EC] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
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

        {/* Reputation & Google Review Bar */}
        <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-jakarta">
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
              RERA Lic. #31822
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
