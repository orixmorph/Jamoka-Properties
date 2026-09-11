import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, ArrowUpRight, ChevronDown, Sparkles, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ---------------------------------------------------------------------------------
// BACKGROUND VIDEO CONFIGURATION
// You can replace this URL with your cloud video link (AWS S3, Cloudflare, GCP, etc.)
// The video plays continuously on loop, muted in the background.
// ---------------------------------------------------------------------------------
export const DEFAULT_BACKGROUND_VIDEO_URL =
  'https://res.cloudinary.com/dy6km7beb/video/upload/v1788751184/Dubai___Cinematic_Video___Sony_A7SIII_1080p_sqx0kn.mp4';

interface HeroSectionProps {
  onSearch: (term: string) => void;
  onOpenSecondarySite: () => void;
  onExploreOffPlan: () => void;
  cloudVideoUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onOpenSecondarySite,
  onExploreOffPlan,
  cloudVideoUrl,
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [, setVideoLoaded] = useState(false);

  // Video source URL (supports custom cloud link provided via props or default fallback)
  const videoSource = cloudVideoUrl || DEFAULT_BACKGROUND_VIDEO_URL;

  // Auto-play video on mount / source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSource]);

  const trendingTags = [
    'Palm Jumeirah',
    'Downtown Dubai',
    'Dubai Hills Estate',
    'Dubai Islands',
    'Dubai Canal',
  ];

  const handleInputChange = (val: string) => {
    setSearchTerm(val);
    onSearch(val.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
    onExploreOffPlan();
  };

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
    onSearch(tag);
    onExploreOffPlan();
  };

  return (
    <section className="relative min-h-screen w-full bg-[#0A0E17] text-white flex items-center justify-center overflow-hidden">
      {/* Background Looping Video - Anchored to the hero section */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          poster="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=85&w=2400&auto=format&fit=crop"
          className="w-full h-full object-cover"
          src={videoSource}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Luxury Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/45 to-[#0A0E17]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)]" />
      </div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Hero Content Elements - Fixed firmly over video, scrolls naturally with the page */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-24 sm:py-32 w-full">
        {/* Main Hero Title - Caughe font */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase font-caughe text-white leading-tight mb-3 select-none"
          style={{ fontFamily: "'Caughe', serif" }}
        >
          {t.hero.title}
        </motion.h1>

        {/* Tagline in Jakarta Sans below JAMOKA PROPERTIES */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-jakarta text-base sm:text-lg md:text-[19px] font-medium text-neutral-200/95 tracking-wide max-w-2xl mx-auto mb-7 drop-shadow-sm"
        >
          Most Trusted Agency For Your Property Needs
        </motion.p>

        {/* Reduced-Size CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center gap-3 mb-7 w-full sm:w-auto"
        >
          {/* Primary CTA: Explore Off-Plan */}
          <button
            onClick={onExploreOffPlan}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-xs tracking-[0.12em] uppercase shadow-[0_8px_20px_rgba(207,165,90,0.3)] hover:scale-102 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>{t.hero.exploreBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Secondary CTA: Ready Properties (SQFT DXB) */}
          <button
            onClick={onOpenSecondarySite}
            className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-[#CFA55A] text-xs font-medium tracking-[0.12em] uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            title="Explore Ready & Secondary Market properties on SQFT DXB"
          >
            <span className="w-1.5 h-1.5 rounded-sm bg-[#CFA55A]"></span>
            <span>{t.hero.readyBtn}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#CFA55A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Sleek Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-2xl lg:max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3 sm:py-1.5 shadow-2xl"
        >
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="flex items-center pl-1 text-neutral-400">
              <Search className="w-4 h-4 text-[#D4AF37] shrink-0" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t.hero.searchPlaceholder}
              className="w-full bg-transparent text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none py-1 px-1 font-light"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#CFA55A] hover:bg-[#b8914b] text-[#0A0E17] font-bold text-[11px] tracking-wider uppercase rounded-lg sm:rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer"
            >
              {t.hero.searchBtn}
            </button>
          </form>

          {/* Trending Community Tags - Sleek Single-Line Strip */}
          <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 mt-1.5 pt-1.5 border-t border-white/10 px-0.5 text-left">
            <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-medium mr-1 shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-[#CFA55A]" /> {t.hero.trending}:
            </span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className="text-[10px] text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 px-2 py-0.5 rounded-md transition-colors border border-white/5 hover:border-[#CFA55A]/50 font-light cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Downward Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <ChevronDown className="w-4 h-4 text-[#D4AF37]/80 animate-bounce" />
      </div>
    </section>
  );
};
