import React, { useState, useEffect } from 'react';
import { BlogPost } from '../data/realEstateData';
import { BookOpen, Calendar, Clock, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';

interface BlogsSectionProps {
  onOpenBlog?: (slug: string) => void;
  onNavigateAllBlogs?: () => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({
  onOpenBlog,
  onNavigateAllBlogs,
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBaserowBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.blogs)) {
            setBlogs(data.blogs);
          }
        }
      } catch (err) {
        console.warn('Unable to load Baserow blogs for home section:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBaserowBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleArticleClick = (blog: BlogPost) => {
    const slug = blog.slug || blog.id;
    if (onOpenBlog) {
      onOpenBlog(slug);
    } else {
      window.location.href = `/blogs/${slug}`;
    }
  };

  const handleViewAll = () => {
    if (onNavigateAllBlogs) {
      onNavigateAllBlogs();
    } else if (onOpenBlog) {
      onOpenBlog('');
    } else {
      window.location.href = '/blogs';
    }
  };

  // If loading has finished and no active blogs exist in Baserow, do not show any dummy blogs
  if (!loading && blogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#CFA55A]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>BASEROW LIVE INTELLIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-serif-luxury tracking-tight">
              Dubai Real Estate Insights
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Direct market intelligence sourced from our Baserow editorial repository and enhanced for luxury investors.
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#A6833D] hover:text-[#0F172A] uppercase tracking-wider transition-colors cursor-pointer self-start md:self-end group"
          >
            <span>Explore All Market Briefings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Live Baserow Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-200 rounded-md w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((article) => (
              <article
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="group bg-white rounded-3xl border border-neutral-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#CFA55A]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#CFA55A] text-[10px] font-bold tracking-wider uppercase border border-[#CFA55A]/30">
                        {article.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-300">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#CFA55A]" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#CFA55A]" /> {article.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#A6833D] font-serif-luxury transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>

                    {article.primaryKeywords && article.primaryKeywords.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {article.primaryKeywords.slice(0, 2).map((kw, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-[#A6833D] border border-[#CFA55A]/30 font-medium"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 text-xs font-bold text-[#A6833D] group-hover:text-[#0F172A] transition-colors">
                  <span>Read Full Briefing</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
