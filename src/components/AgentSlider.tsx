import React, { useRef, useState, useEffect } from 'react';
import { AGENT_PROFILES, AgentProfile } from '../data/teamAgents';
import { Shield, Sparkles, MapPin, ChevronLeft, ChevronRight, Hand } from 'lucide-react';

interface AgentSliderProps {
  onContactAgent?: (agent: AgentProfile) => void;
}

// Fallback image in case the remote Cloudinary asset is still uploading
const FALLBACK_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';

export const AgentSlider: React.FC<AgentSliderProps> = ({ onContactAgent }) => {
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
    <div className="w-full mt-16 pt-12 border-t border-neutral-200/80">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto mb-8 px-4 gap-4">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>OUR GLOBAL ADVISORY NETWORK</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-luxury">
            Meet Our Certified Property Specialists
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
            20+ specialized advisors covering every master community • Drag or swipe horizontally to explore
          </p>
        </div>

        {/* Manual navigation controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-2 font-medium">
            <Hand className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Drag or scroll</span>
          </div>
          <button
            onClick={() => handleScrollBy(-360)}
            aria-label="Previous agents"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#D4AF37] flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScrollBy(360)}
            aria-label="Next agents"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#D4AF37] flex items-center justify-center text-slate-700 transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
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
              className="w-72 sm:w-80 bg-[#FAF9F6] hover:bg-white border border-neutral-200/90 hover:border-[#D4AF37] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-4 shrink-0 group/card cursor-pointer relative overflow-hidden"
            >
              {/* Subtle gold glow on hover */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none group-hover/card:bg-[#D4AF37]/15 transition-all" />

              {/* Agent Photo - Sized bigger with graceful fallback */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden shrink-0 border border-neutral-200/80 shadow-sm bg-neutral-100">
                <img
                  src={agent.image}
                  alt={agent.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if Cloudinary link is not accessible
                    const target = e.target as HTMLImageElement;
                    if (target.src !== FALLBACK_PHOTO) {
                      target.src = FALLBACK_PHOTO;
                    }
                  }}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300 pointer-events-none"
                />
                <div className="absolute bottom-0 right-0 bg-[#0F172A] text-[#D4AF37] p-1 rounded-tl-lg">
                  <Shield className="w-3 h-3" />
                </div>
              </div>

              {/* Agent Details: Name, Designation, Location, Languages */}
              <div className="flex-1 min-w-0 pointer-events-none">
                <h4 className="text-[15px] font-bold text-slate-900 truncate font-serif-luxury group-hover/card:text-[#A6833D] transition-colors">
                  {agent.name}
                </h4>

                <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">
                  {agent.title}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1.5 truncate">
                  <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{agent.specialty}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {agent.languages
                    .filter((lang) => lang && lang.trim().length > 0)
                    .map((lang) => (
                      <span
                        key={lang}
                        className="text-[9px] px-2 py-0.5 rounded-md bg-neutral-100/90 text-slate-600 font-medium"
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
