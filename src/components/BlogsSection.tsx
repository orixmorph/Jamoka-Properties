import React from 'react';
import { BlogPost } from '../data/realEstateData';
import { useBlogs } from '../context/BlogsContext';
import { BookOpen, Calendar, Clock, ArrowUpRight, ArrowRight } from 'lucide-react';

interface BlogsSectionProps {
  onOpenBlog?: (slug: string) => void;
  onNavigateAllBlogs?: () => void;
}

export const BlogsSection: React.FC<BlogsSectionProps> = ({
  onOpenBlog,
  onNavigateAllBlogs,
}) => {
  const { blogs, isLoading } = useBlogs();

  const featuredOnly = blogs.filter((b) => b.featured);
  const displayedBlogs = (featuredOnly.length > 0 ? featuredOnly : blogs).slice(0, 3);

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

  // If initial fetch finished and no published articles exist, omit the section cleanly
  if (!isLoading && displayedBlogs.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="py-20 bg-[#FAF9F6] border-t border-neutral-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>FEATURED MARKET INTELLIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-serif-luxury tracking-tight">
              Dubai Real Estate Insights
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Featured research briefings and investment perspectives curated by Jamoka Properties.
            </p>
          </div>

          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#A6833D] hover:text-[#0F172A] uppercase tracking-wider transition-colors cursor-pointer self-start md:self-end group"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Featured Published Articles Grid (3 Featured Articles) */}
        {isLoading && displayedBlogs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-200 rounded-md w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.map((article) => (
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

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-neutral-200">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#CFA55A]" /> {article.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#CFA55A]" /> {article.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A6833D] block">
                      {article.category}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#A6833D] font-serif-luxury transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    {article.subtitle && (
                      <p className="text-xs font-semibold text-slate-700 line-clamp-1">
                        {article.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed font-light">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-3 flex items-center justify-between border-t border-neutral-100 text-xs font-bold text-[#A6833D] group-hover:text-[#0F172A] transition-colors">
                  <span>Read Full Article</span>
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
