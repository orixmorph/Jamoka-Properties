import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOGS_DATA, BlogPost } from '../data/realEstateData';
import { BookOpen, Calendar, Clock, ArrowRight, X, Sparkles, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlogsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  const categories = ['All', 'Market Guide', 'Financing Guide', 'Market Trends'];

  const filteredBlogs =
    selectedCategory === 'All'
      ? BLOGS_DATA
      : BLOGS_DATA.filter((b) => b.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative pt-36 sm:pt-40 pb-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>MARKET INTELLIGENCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.blogsPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.blogsPage.subtitle}
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white shadow-lg border border-neutral-200/80 max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-black text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-[#CFA55A]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => setActiveArticle(blog)}
                  className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#CFA55A] text-[10px] font-bold uppercase tracking-wider">
                      {blog.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-neutral-300 text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#CFA55A]" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#CFA55A]" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    onClick={() => setActiveArticle(blog)}
                    className="text-lg font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors line-clamp-2 cursor-pointer"
                  >
                    {blog.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveArticle(blog)}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200/80 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t.blogsPage.readBriefing}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#CFA55A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-neutral-200"
            >
              <div className="relative h-56 sm:h-64 w-full bg-black">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <button
                  onClick={() => setActiveArticle(null)}
                  className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors z-10 cursor-pointer`}
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-widest block mb-1">
                    {activeArticle.category} • {activeArticle.readTime}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury">
                    {activeArticle.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-neutral-100">
                  <span>Published: {activeArticle.date}</span>
                  <span className="text-[#A6833D] font-medium">Jamoka Advisory Desk</span>
                </div>

                <div className="text-sm text-slate-700 leading-relaxed font-light space-y-3 whitespace-pre-line">
                  {activeArticle.content}
                </div>

                <div className="pt-6 border-t border-neutral-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    Have questions about this article?
                  </span>
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {t.blogsPage.closeBriefing}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
