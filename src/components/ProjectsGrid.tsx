import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { OffPlanProject, OFF_PLAN_PROJECTS } from '../data/realEstateData';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  HardHat,
  ArrowUpRight,
  Sparkles,
  Play,
  Pause,
  Calendar,
  Percent,
} from 'lucide-react';
import { PropertyDetailModal } from './PropertyDetailModal';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsGridProps {
  projects: OffPlanProject[];
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
  onSelectProjectForAdvisory?: (project: OffPlanProject) => void;
}

type CategoryFilter = 'All' | 'Villas' | 'Luxury' | 'Flats';

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  currency,
  onSelectProjectForAdvisory,
}) => {
  const { t } = useLanguage();
  const [activeModalProject, setActiveModalProject] = useState<OffPlanProject | null>(null);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const isResettingScrollRef = useRef<boolean>(false);

  // Use provided projects or fallback to all 9 OFF_PLAN_PROJECTS if empty
  const baseProjects = useMemo(() => {
    return projects && projects.length > 0 ? projects : OFF_PLAN_PROJECTS;
  }, [projects]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return baseProjects;

    return baseProjects.filter((p) => {
      const typeLower = (p.type || '').toLowerCase();
      const nameLower = (p.name || '').toLowerCase();
      const descLower = (p.description || '').toLowerCase();
      const enclaveLower = (p.enclave || '').toLowerCase();

      if (activeCategory === 'Villas') {
        return (
          typeLower.includes('villa') ||
          typeLower.includes('mansion') ||
          typeLower.includes('sanctuary') ||
          nameLower.includes('mansion') ||
          descLower.includes('mansion') ||
          enclaveLower.includes('islands')
        );
      }
      if (activeCategory === 'Luxury') {
        return (
          typeLower.includes('luxury') ||
          typeLower.includes('trophy') ||
          typeLower.includes('branded') ||
          typeLower.includes('maritime') ||
          p.priceAED >= 3800000
        );
      }
      if (activeCategory === 'Flats') {
        return (
          typeLower.includes('flat') ||
          typeLower.includes('suite') ||
          typeLower.includes('sky') ||
          typeLower.includes('living') ||
          typeLower.includes('apt') ||
          typeLower.includes('tower')
        );
      }
      return true;
    });
  }, [baseProjects, activeCategory]);

  // 3 complete sets for infinite horizontal scrolling
  const carouselItems = useMemo(() => {
    const list = filteredProjects.length > 0 ? filteredProjects : baseProjects;
    return [...list, ...list, ...list];
  }, [filteredProjects, baseProjects]);

  // Clean payment plan badge
  const getBadgeInfo = (project: OffPlanProject) => {
    const plan = project.paymentPlan || '';
    if (plan.includes('40 / 60') || project.developer === 'Select Group') {
      return { text: '40 / 60 Payment Plan', tone: 'gold' };
    }
    if (plan.includes('60 / 40')) {
      return { text: '60 / 40 Payment Plan', tone: 'gold' };
    }
    if (plan.includes('70 / 30')) {
      return { text: '70 / 30 Payment Plan', tone: 'gold' };
    }
    if (plan.includes('80 / 20')) {
      return { text: '80 / 20 Payment Plan', tone: 'gold' };
    }
    if (plan.includes('50 / 50')) {
      return { text: '50 / 50 Payment Plan', tone: 'gold' };
    }
    if (project.badge === 'PRE-COMPLETION' || project.handover.includes('2026')) {
      return { text: 'Ready Soon', tone: 'gold' };
    }
    return { text: plan, tone: 'gold' };
  };

  // Prominent price display
  const getPriceDisplay = (priceAED: number) => {
    if (currency === 'AED') {
      const millions = priceAED / 1000000;
      const formattedNumber =
        millions % 1 === 0 ? `${millions}M` : `${parseFloat(millions.toFixed(2))}M`;
      return {
        prefix: 'From',
        currencyLabel: 'AED',
        amount: formattedNumber,
      };
    } else if (currency === 'USD') {
      const usd = priceAED / 3.6725;
      const millions = usd / 1000000;
      const formatted =
        millions >= 1
          ? `$${parseFloat(millions.toFixed(2))}M`
          : `$${Math.round(usd / 1000)}K`;
      return {
        prefix: 'From',
        currencyLabel: 'USD',
        amount: formatted,
      };
    } else if (currency === 'EUR') {
      const eur = priceAED / 3.98;
      const millions = eur / 1000000;
      const formatted =
        millions >= 1
          ? `€${parseFloat(millions.toFixed(2))}M`
          : `€${Math.round(eur / 1000)}K`;
      return {
        prefix: 'From',
        currencyLabel: 'EUR',
        amount: formatted,
      };
    } else {
      const gbp = priceAED / 4.65;
      const millions = gbp / 1000000;
      const formatted =
        millions >= 1
          ? `£${parseFloat(millions.toFixed(2))}M`
          : `£${Math.round(gbp / 1000)}K`;
      return {
        prefix: 'From',
        currencyLabel: 'GBP',
        amount: formatted,
      };
    }
  };

  // Center scroll position on the middle set
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const singleSetWidth = container.scrollWidth / 3;
      if (singleSetWidth > 0) {
        container.scrollLeft = singleSetWidth;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [activeCategory, filteredProjects.length]);

  // Seamless infinite scroll loop
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || isResettingScrollRef.current) return;

    const singleSetWidth = container.scrollWidth / 3;
    if (singleSetWidth <= 0) return;

    if (container.scrollLeft >= singleSetWidth * 2) {
      isResettingScrollRef.current = true;
      container.scrollLeft -= singleSetWidth;
      setTimeout(() => {
        isResettingScrollRef.current = false;
      }, 30);
    } else if (container.scrollLeft <= 10) {
      isResettingScrollRef.current = true;
      container.scrollLeft += singleSetWidth;
      setTimeout(() => {
        isResettingScrollRef.current = false;
      }, 30);
    }
  }, []);

  // Smooth auto-glide (pauses on hover, active dragging, or manual pause)
  useEffect(() => {
    if (!isAutoScrolling || isHovered) return;

    let animationFrameId: number;
    const speed = 0.75;

    const step = () => {
      const container = scrollContainerRef.current;
      if (container && !isDraggingRef.current && !isResettingScrollRef.current) {
        container.scrollLeft += speed;
        handleScroll();
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling, isHovered, handleScroll]);

  // Previous & Next navigation controls
  const handleScrollLeft = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 360;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = 360;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    container.scrollLeft = scrollLeftRef.current - walk;
    handleScroll();
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const openProjectModal = (project: OffPlanProject) => {
    setActiveModalProject(project);
    if (onSelectProjectForAdvisory) {
      onSelectProjectForAdvisory(project);
    }
  };

  return (
    <section
      id="off-plan-projects"
      className="py-20 lg:py-28 bg-[#FAF9F5] text-slate-900 relative overflow-hidden font-jakarta select-none border-y border-neutral-200/60"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUpOrLeave();
      }}
    >
      {/* Refined light ambient background glows */}
      <div className="absolute top-0 right-10 w-[550px] h-[550px] bg-[#CFA55A]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[550px] h-[550px] bg-[#E8DFCE]/60 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Light Themed Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE0] border border-[#CFA55A]/35 text-[#9A7326] text-[11px] font-bold tracking-[0.2em] uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>MOST TRENDING DEVELOPMENTS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-caughe">
              Most Trending Projects in Dubai
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
              Explore Dubai’s most distinguished off-plan master developments. Direct developer allocations, guaranteed escrow accounts, and investor-preferred payment plans.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {(['All', 'Villas', 'Luxury', 'Flats'] as CategoryFilter[]).map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.03]'
                        : 'bg-white hover:bg-neutral-100 text-slate-600 hover:text-slate-900 border border-neutral-200/90 shadow-xs'
                    }`}
                  >
                    {category === 'All' ? 'All Projects' : category}
                  </button>
                );
              })}

              {/* Auto-scroll toggle indicator */}
              <button
                onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] text-slate-600 hover:text-slate-900 bg-white hover:bg-neutral-100 border border-neutral-200/90 shadow-xs transition-colors ml-2 cursor-pointer"
                title={isAutoScrolling ? 'Pause Auto Scroll' : 'Resume Auto Scroll'}
              >
                {isAutoScrolling ? (
                  <>
                    <Pause className="w-3 h-3 text-[#A6833D]" />
                    <span>Auto-Scroll Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-slate-500" />
                    <span>Paused</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Top Right: Circular Navigation Arrows (Light Luxury Style) */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={handleScrollLeft}
              aria-label="Previous Projects"
              className="w-12 h-12 rounded-full border border-neutral-300 bg-white hover:bg-[#CFA55A] hover:border-[#CFA55A] hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Next Projects"
              className="w-12 h-12 rounded-full border border-neutral-300 bg-white hover:bg-[#CFA55A] hover:border-[#CFA55A] hover:text-slate-950 text-slate-700 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontally Scrollable Infinite Track */}
      <div className="relative w-full">
        {/* Soft edge fade for light theme */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          className="flex gap-6 overflow-x-auto px-4 sm:px-8 lg:px-12 py-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
        >
          {carouselItems.map((project, index) => {
            const badge = getBadgeInfo(project);
            const price = getPriceDisplay(project.priceAED);

            return (
              <div
                key={`${project.id}-${index}`}
                onClick={() => openProjectModal(project)}
                className="group shrink-0 w-[295px] sm:w-[325px] md:w-[350px] bg-white rounded-[28px] border border-neutral-200/90 hover:border-[#CFA55A]/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(207,165,90,0.18)] transition-all duration-500 hover:-translate-y-2 flex flex-col cursor-pointer overflow-hidden relative"
              >
                {/* Image Container with Elegant Zoom Effect */}
                <div className="relative h-[300px] sm:h-[330px] w-full overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlay for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/10 to-black/20 group-hover:from-slate-950/80 transition-colors duration-500" />

                  {/* Top-Left Badge (Payment plan pill with champagne gold branding CFA55A) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#CFA55A] text-[#0F172A] text-[11px] sm:text-xs font-bold tracking-wide shadow-md backdrop-blur-sm">
                      {badge.text}
                    </span>
                  </div>

                  {/* Top-Right Enclave Pill */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold uppercase tracking-wider shadow-xs border border-white/60">
                      {project.enclave}
                    </span>
                  </div>

                  {/* Hover Prompt on Image: "Learn More" with subtle bounce arrow */}
                  <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#CFA55A]/50">
                    <span>Explore Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#CFA55A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content Area Below Image */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 bg-white">
                  {/* Price Row: Stacked "From AED" with Large Bold Price Number and Yield Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {price.prefix}
                        </span>
                        <span className="text-[11px] font-bold text-[#A6833D] tracking-wider mt-0.5">
                          {price.currencyLabel}
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-jakarta">
                        {price.amount}
                      </div>
                    </div>

                    {/* Projected ROI / Status pill */}
                    <div className="px-2.5 py-1 rounded-lg bg-[#FAF5EC] border border-[#CFA55A]/35 text-[#9A7326] text-[10px] font-bold tracking-wide">
                      {project.roi ? project.roi.split(' ')[0] + ' Yield' : 'Prime Tier'}
                    </div>
                  </div>

                  {/* Project Name with Building Icon */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#CCA14C] shrink-0" />
                      <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-[#A6833D] transition-colors">
                        {project.name}
                      </h3>
                    </div>

                    {/* Developer Name & Handover */}
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-medium pl-6">
                      <HardHat className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{project.developer}</span>
                      <span>•</span>
                      <span className="truncate">{project.handover}</span>
                    </div>
                  </div>

                  {/* Quick Feature Pills */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 font-medium">
                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-slate-700 truncate max-w-[150px]">
                      {project.bedrooms ? project.bedrooms.split(' ')[0] + ' Beds' : 'Residences'}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-slate-700 truncate">
                      {project.type}
                    </span>
                  </div>

                  {/* Interactive Bottom Action Button */}
                  <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-[#9A7326] transition-colors flex items-center gap-1.5">
                      <span>View Project Plans & Details</span>
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-[#CFA55A] group-hover:text-slate-950 text-slate-600 flex items-center justify-center transition-all duration-300 shadow-xs">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Property Detail Modal for Inquiries & Payment Plans */}
      <PropertyDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        currency={currency}
      />
    </section>
  );
};
