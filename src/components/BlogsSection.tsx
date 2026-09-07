import React, { useState } from 'react';
import { BLOGS_DATA, BlogPost } from '../data/realEstateData';
import { BookOpen, Calendar, Clock, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blogs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>MARKET INTELLIGENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
              Dubai Real Estate Insights
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
              Executive research and regulatory briefings curated by Jamoka’s senior conveyancing and investment analysis desks.
            </p>
          </div>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOGS_DATA.map((article) => (
            <article
              key={article.id}
              onClick={() => setActiveArticle(article)}
              className="group bg-white rounded-2xl border border-neutral-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[#ECC86A] text-[10px] font-bold tracking-wider uppercase border border-[#D4AF37]/30">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 text-xs font-bold text-[#D4AF37] group-hover:text-[#0F172A] transition-colors">
                <span>Read Full Briefing</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
            >
              <div className="relative h-56 w-full">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest block">
                    {activeArticle.category} • {activeArticle.readTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury leading-tight">
                    {activeArticle.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 text-slate-700 text-sm leading-relaxed max-h-[60vh] overflow-y-auto">
                <p className="font-semibold text-slate-900 text-base">
                  {activeArticle.excerpt}
                </p>
                <div className="whitespace-pre-line text-xs sm:text-sm text-slate-600 space-y-3">
                  {activeArticle.content}
                </div>
                <div className="mt-8 pt-6 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Published by Jamoka Properties Research Desk</span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2 rounded-lg bg-[#0F172A] text-white font-bold text-xs uppercase"
                  >
                    Close Briefing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
