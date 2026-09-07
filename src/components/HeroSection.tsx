import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, ArrowUpRight, ChevronDown, Sparkles, X, Video } from 'lucide-react';
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
  const { t, isRTL } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Video source URL (supports custom cloud link provided via props or default fallback)
  const videoSource = cloudVideoUrl || DEFAULT_BACKGROUND_VIDEO_URL;

  // Auto-play video on mount / source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [videoSource]);

  // Window scroll position in pixels for precise scroll calibration:
  // - 1st Scroll (~120px): Elements begin gentle, subtle fade
  // - 2nd Scroll (~240px): Elements fade significantly
  // - 3rd Scroll (~360px): Elements completely disappear (opacity reaches 0)
  // - Scrolling back up: Elements smoothly fade and pop back into view!
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(scrollY, [0, 130, 250, 360], [1, 0.8, 0.35, 0]);
  const contentY = useTransform(scrollY, [0, 360], [0, -35]);
  const contentScale = useTransform(scrollY, [0, 360], [1, 0.95]);

  // Background overlay softens as elements disappear to make video crystal clear
  const overlayOpacity = useTransform(scrollY, [0, 360], [0.65, 0.25]);

  // Disable pointer events when faded out
  const isPointerDisabled = useTransform(scrollY, (val) => (val > 300 ? 'none' : 'auto'));

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
    <div
      className="relative h-[200vh] w-full bg-[#0A0E17] text-white"
    >
      {/* Sticky Fullscreen Frame for Video and Fading Content */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Looping Video */}
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

          {/* Luxury Cinematic Overlay: Softens as user scrolls to reveal pristine video */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/40 to-[#0A0E17]/70"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_75%)]" />
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        {/* Fading Content Layer on Scroll */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
            scale: contentScale,
            pointerEvents: isPointerDisabled as any,
          }}
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center py-10 transition-all duration-200"
        >
          {/* Main Hero Title - Jakarta Sans Bold */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase font-jakarta text-white leading-tight mb-3 select-none"
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
            {/* Primary CTA: Explore Off-Plan (reduced size) */}
            <button
              onClick={onExploreOffPlan}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-[#0A0E17] font-bold text-xs tracking-[0.12em] uppercase shadow-[0_8px_20px_rgba(212,175,55,0.25)] hover:shadow-[0_12px_28px_rgba(212,175,55,0.4)] hover:scale-102 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary CTA: Ready Properties (SQFT DXB) (reduced size) */}
            <button
              onClick={onOpenSecondarySite}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/25 hover:border-[#D4AF37] text-xs font-medium tracking-[0.12em] uppercase backdrop-blur-md transition-all flex items-center justify-center gap-2 group"
              title="Explore Ready & Secondary Market properties on SQFT DXB"
            >
              <span className="w-1.5 h-1.5 rounded-sm bg-[#D4AF37]"></span>
              <span>{t.hero.readyBtn}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>

          {/* Reduced-Size Search Bar with Instant Live Filter & Clear Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 sm:p-2 shadow-2xl"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
              <div className="flex items-center pl-2 text-neutral-400">
                <Search className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full bg-transparent text-white placeholder:text-neutral-400 text-xs sm:text-sm focus:outline-none py-1.5 px-1 font-light"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#D4AF37] hover:bg-[#ECC86A] text-black font-bold text-[11px] tracking-wider uppercase rounded-xl transition-colors shrink-0"
              >
                {t.hero.searchBtn}
              </button>
            </form>

            {/* Trending Community Tags - Compact */}
            <div className="flex items-center flex-wrap gap-1 sm:gap-1.5 mt-2 pt-2 border-t border-white/10 px-1 text-left">
              <span className="text-[10px] text-neutral-400 flex items-center gap-1 font-medium mr-1">
                <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" /> {t.hero.trending}:
              </span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="text-[10px] text-neutral-300 hover:text-white bg-white/5 hover:bg-white/15 px-2 py-0.5 rounded-md transition-colors border border-white/5 hover:border-[#D4AF37]/50 font-light"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-neutral-400 text-[9px] tracking-[0.25em] uppercase pointer-events-none"
        >
          <span>SCROLL TO VIEW BACKGROUND</span>
          <ChevronDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};
