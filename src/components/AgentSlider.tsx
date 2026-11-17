import React, { useRef, useState, useEffect, useCallback } from 'react';
import { AGENT_PROFILES, AgentProfile } from '../data/teamAgents';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Sparkles, MapPin, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

interface AgentSliderProps {
  onContactAgent?: (agent: AgentProfile) => void;
}

// Fallback image in case the remote asset is still uploading or unavailable
const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

export const AgentSlider: React.FC<AgentSliderProps> = ({ onContactAgent }) => {
  const { isRTL } = useLanguage();

  // Container & Track refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  // Animation & position state stored in refs for 60/120fps stutter-free updates
  const offsetRef = useRef<number>(0);
  const targetOffsetRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const resumeTimerRef = useRef<number | null>(null);
  const isTemporarilyPausedRef = useRef<boolean>(false);

  const [isDraggingState, setIsDraggingState] = useState(false);

  // Measure the single-set width with ResizeObserver
  const measureSetWidth = useCallback(() => {
    if (setRef.current) {
      // The single set width plus gap (24px = gap-6)
      const rect = setRef.current.getBoundingClientRect();
      if (rect.width > 0) {
        // gap-6 in Tailwind is 1.5rem = 24px
        singleSetWidthRef.current = rect.width + 24;
      }
    }
  }, []);

  useEffect(() => {
    measureSetWidth();

    const observer = new ResizeObserver(() => {
      measureSetWidth();
    });

    if (setRef.current) {
      observer.observe(setRef.current);
    }
    if (viewportRef.current) {
      observer.observe(viewportRef.current);
    }

    window.addEventListener('resize', measureSetWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measureSetWidth);
    };
  }, [measureSetWidth]);

  // Main continuous 60/120fps hardware-accelerated animation loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    const speed = 40; // Pixels per second (calibrated dignified elegant drift)

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1); // Clamp to prevent big leaps on tab focus
      lastTime = now;

      const singleWidth = singleSetWidthRef.current;

      // Handle animated button step target if active
      if (targetOffsetRef.current !== null) {
        const diff = targetOffsetRef.current - offsetRef.current;
        if (Math.abs(diff) < 0.5) {
          offsetRef.current = targetOffsetRef.current;
          targetOffsetRef.current = null;
        } else {
          // Smooth spring/lerp easing
          offsetRef.current += diff * Math.min(dt * 9, 1);
        }
      } else if (!isHoveredRef.current && !isDraggingRef.current && !isTemporarilyPausedRef.current) {
        // Normal constant speed auto-drift
        offsetRef.current += speed * dt;
      }

      // Seamless modulo wrap (always keep offset strictly between [0, singleWidth))
      if (singleWidth > 0) {
        offsetRef.current = ((offsetRef.current % singleWidth) + singleWidth) % singleWidth;
        if (targetOffsetRef.current !== null) {
          targetOffsetRef.current = ((targetOffsetRef.current % singleWidth) + singleWidth) % singleWidth;
        }
      }

      // Apply transform directly to GPU compositor layer (zero layout reflow!)
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  // Helper to pause auto-drift for a few seconds after manual user interaction
  const triggerTemporaryPause = (durationMs = 4000) => {
    isTemporarilyPausedRef.current = true;
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = window.setTimeout(() => {
      isTemporarilyPausedRef.current = false;
    }, durationMs);
  };

  // Pointer Drag Handlers (works seamlessly for mouse and touch)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to main primary pointer click/touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    hasMovedRef.current = false;
    setIsDraggingState(true);
    targetOffsetRef.current = null; // Cancel any active button tween
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;

    triggerTemporaryPause(5000);

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore if setPointerCapture is unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }

    // Dragging left moves the carousel forward; dragging right moves backwards
    offsetRef.current = dragStartOffsetRef.current - deltaX;

    const singleWidth = singleSetWidthRef.current;
    if (singleWidth > 0) {
      offsetRef.current = ((offsetRef.current % singleWidth) + singleWidth) % singleWidth;
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    triggerTemporaryPause(3000);
  };

  const handlePointerCancel = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
    triggerTemporaryPause(2000);
  };

  // Step button navigation (advances/retreats smoothly by ~1 card width)
  const handleStep = (direction: 'next' | 'prev') => {
    const cardStep = window.innerWidth < 640 ? 344 : 414; // card width + gap
    const delta = direction === 'next' ? cardStep : -cardStep;

    const current = targetOffsetRef.current !== null ? targetOffsetRef.current : offsetRef.current;
    targetOffsetRef.current = current + delta;

    triggerTemporaryPause(4500);
  };

  // Card click: only trigger if user didn't drag
  const handleCardClick = (agent: AgentProfile) => {
    if (hasMovedRef.current) return;
    onContactAgent?.(agent);
  };

  return (
    <div className="w-full mt-10 pt-10 border-t border-neutral-200/80">
      {/* Section Header with Title & Navigation Controls */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto mb-8 px-4 gap-4 ${
          isRTL ? 'sm:flex-row-reverse text-right' : 'text-left'
        }`}
      >
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
              ? 'مستشارون متخصصون يتحدثون لغات متعددة ويغطون كافة مجمعات دبي • اسحب أو استخدم الأسهم للتنقل'
              : 'Specialized advisors covering every master community • Drag or use arrows to explore'}
          </p>
        </div>

        {/* Manual navigation controls */}
        <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
            <Hand className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>{isRTL ? 'اسحب للتصفح' : 'Drag or swipe'}</span>
          </div>
          <button
            onClick={() => handleStep(isRTL ? 'next' : 'prev')}
            aria-label="Previous agents"
            type="button"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#CFA55A] active:scale-95 flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button
            onClick={() => handleStep(isRTL ? 'prev' : 'next')}
            aria-label="Next agents"
            type="button"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#CFA55A] active:scale-95 flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Interactive Carousel Viewport Container */}
      <div
        ref={viewportRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        className={`relative w-full overflow-hidden select-none touch-pan-y ${
          isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {/* Soft edge gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        {/* 
          GPU-Accelerated Continuous Track
          dir="ltr" isolates translation math from RTL inversion quirks,
          while each card's content retains full native RTL/LTR styling!
        */}
        <div
          ref={trackRef}
          dir="ltr"
          className="flex gap-6 py-5 will-change-transform"
          style={{
            transform: 'translate3d(0px, 0, 0)',
          }}
        >
          {/* Primary Set (Measured for exact seamless wrap) */}
          <div ref={setRef} className="flex gap-6 shrink-0">
            {AGENT_PROFILES.map((agent) => (
              <AgentCard
                key={`p-${agent.id}`}
                agent={agent}
                isRTL={isRTL}
                onClick={() => handleCardClick(agent)}
              />
            ))}
          </div>

          {/* Duplicate Set 1 (Provides continuous seamless horizon) */}
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {AGENT_PROFILES.map((agent) => (
              <AgentCard
                key={`d1-${agent.id}`}
                agent={agent}
                isRTL={isRTL}
                onClick={() => handleCardClick(agent)}
              />
            ))}
          </div>

          {/* Duplicate Set 2 (Guarantees no whitespace on ultra-wide / 4K displays) */}
          <div className="flex gap-6 shrink-0" aria-hidden="true">
            {AGENT_PROFILES.map((agent) => (
              <AgentCard
                key={`d2-${agent.id}`}
                agent={agent}
                isRTL={isRTL}
                onClick={() => handleCardClick(agent)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Extracted Agent Card for clean rendering & performance
interface AgentCardProps {
  agent: AgentProfile;
  isRTL: boolean;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isRTL, onClick }) => {
  return (
    <div
      onClick={onClick}
      dir={isRTL ? 'rtl' : 'ltr'}
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
  );
};

