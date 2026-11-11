import React, { useRef, useState, useEffect } from 'react';
import { AGENT_PROFILES, AgentProfile } from '../data/teamAgents';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Sparkles, MapPin, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

interface AgentSliderProps {
  onContactAgent?: (agent: AgentProfile) => void;
}

// Fallback image in case the remote Cloudinary asset is still uploading
const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

export const AgentSlider: React.FC<AgentSliderProps> = ({ onContactAgent }) => {
  const { isRTL } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollTimer = useRef<number | null>(null);

  // Smooth continuous auto-scroll when user is NOT dragging or hovering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollSpeed = 0.8; // Calibrated slow dignified drift

    const step = () => {
      if (!isInteracting && el) {
        el.scrollLeft += scrollSpeed;
        // If reached end of first set (halfway), seamless wrap around
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      autoScrollTimer.current = requestAnimationFrame(step);
    };

    autoScrollTimer.current = requestAnimationFrame(step);

    return () => {
      if (autoScrollTimer.current) {
        cancelAnimationFrame(autoScrollTimer.current);
      }
    };
  }, [isInteracting]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setIsInteracting(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Manual arrow navigation controls
  const handleScrollBy = (offset: number) => {
    if (!containerRef.current) return;
    setIsInteracting(true);
    containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    // Resume auto-scroll after 4 seconds of inactivity
    setTimeout(() => {
      setIsInteracting(false);
    }, 4000);
  };

  // Duplicate the 20 profiles so infinite scroll wraps seamlessly
  const duplicatedAgents = [...AGENT_PROFILES, ...AGENT_PROFILES];

  return (
    <div className="w-full mt-10 pt-10 border-t border-neutral-200/80">
      <div className={`flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto mb-8 px-4 gap-4 ${isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'}`}>
        <div className={isRTL ? 'text-center sm:text-right' : 'text-center sm:text-left'}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#A6833D] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            <Sparkles className="w-3 h-3 text-[#CFA55A]" />
            <span>{isRTL ? 'شبكة مستشارينا العالمية' : 'OUR GLOBAL ADVISORY NETWORK'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
            {isRTL ? 'تعرف على مستشارينا العقاريين المعتمدين' : 'Meet Our Certified Property Specialists'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
            {isRTL
              ? 'أكثر من 20 مستشاراً متخصصاً يتحدثون لغات متعددة ويغطون كافة مجمعات دبي • اسحب للتنقل'
              : '20+ specialized advisors covering every master community • Drag or swipe horizontally to explore'}
          </p>
        </div>

        {/* Manual navigation controls */}
        <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
            <Hand className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>{isRTL ? 'اسحب للتصفح' : 'Drag or scroll'}</span>
          </div>
          <button
            onClick={() => handleScrollBy(isRTL ? 410 : -410)}
            aria-label="Previous agents"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#CFA55A] flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={() => handleScrollBy(isRTL ? -410 : 410)}
            aria-label="Next agents"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#CFA55A] flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Interactive Carousel Container */}
      <div className="relative w-full overflow-hidden group">
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div
          ref={containerRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => {
            setIsInteracting(false);
            setIsDragging(false);
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsInteracting(false), 2500);
          }}
          className={`flex gap-6 py-5 px-4 overflow-x-auto no-scrollbar select-none cursor-grab ${
            isDragging ? 'cursor-grabbing' : ''
          }`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {duplicatedAgents.map((agent, index) => (
            <div
              key={`${agent.id}-${index}`}
              onClick={() => {
                if (!isDragging) {
                  onContactAgent?.(agent);
                }
              }}
              className={`w-80 sm:w-[390px] bg-[#FAF9F6] hover:bg-white border border-neutral-200/90 hover:border-[#CFA55A] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-4 sm:gap-5 shrink-0 group/card cursor-pointer relative overflow-hidden ${
                isRTL ? 'flex-row-reverse text-right' : 'text-left'
              }`}
            >
              {/* Subtle gold glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#CFA55A]/5 rounded-full blur-xl pointer-events-none group-hover/card:bg-[#CFA55A]/15 transition-all" />

              {/* Agent Photo - Sized bigger for clear portrait prominence */}
              <div className="relative w-26 h-26 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-neutral-200/90 shadow-md bg-neutral-100">
                <img
                  src={agent.image}
                  alt={agent.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FALLBACK_PHOTO) {
                      target.src = FALLBACK_PHOTO;
                    }
                  }}
                  className="w-full h-full object-cover object-top group-hover/card:scale-105 transition-transform duration-300 pointer-events-none"
                />
                <div className="absolute bottom-0 right-0 bg-[#0F172A] text-[#CFA55A] p-1.5 rounded-tl-lg shadow-sm">
                  <Shield className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Agent Details: Name, Designation, Location, Languages */}
              <div className="flex-1 min-w-0 pointer-events-none">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 truncate font-serif-luxury group-hover/card:text-[#A6833D] transition-colors">
                  {agent.name}
                </h4>

                <p className="text-xs sm:text-[13px] font-semibold text-slate-700 truncate mt-0.5">
                  {agent.title}
                </p>

                <div className={`flex items-center gap-1.5 text-xs text-slate-500 mt-1.5 truncate ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                  <span className="truncate">{agent.specialty}</span>
                </div>

                <div className={`flex items-center gap-1.5 mt-2.5 flex-wrap ${isRTL ? 'justify-end' : ''}`}>
                  {agent.languages
                    .filter((lang) => lang && lang.trim().length > 0)
                    .map((lang) => (
                      <span
                        key={lang}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-neutral-100/90 text-slate-700 font-medium border border-neutral-200/60"
                      >
                        {lang}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
