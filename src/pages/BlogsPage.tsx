import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useBlogs } from '../context/BlogsContext';
import { BlogPost, BlogBlockNode } from '../data/realEstateData';
import { withBasePath } from '../utils/basePath';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Copy,
  Search,
  ShieldCheck,
  FileText,
  MessageSquare,
  PhoneCall,
  Printer,
  AlertCircle,
} from 'lucide-react';

interface BlogsPageProps {
  initialBlogSlug?: string | null;
  onBlogSelect?: (slug: string | null) => void;
}

function headingToId(text: string, idx: number): string {
  const clean = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
  return clean ? `topic-${clean}-${idx}` : `topic-${idx}`;
}

function formatRichInline(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  initialBlogSlug = null,
  onBlogSelect,
}) => {
  const { t, isRTL } = useLanguage();
  const { blogs, isLoading: loading, error: fetchError, refreshBlogs } = useBlogs();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Silently sync latest published articles whenever Blogs view is opened
  useEffect(() => {
    refreshBlogs(true);
  }, [refreshBlogs]);

  useEffect(() => {
    if (initialBlogSlug && blogs.length > 0) {
      const target = blogs.find(
        (b) => b.slug?.toLowerCase() === initialBlogSlug.toLowerCase() || b.id === initialBlogSlug
      );
      if (target) {
        setSelectedBlog(target);
      }
    } else if (!initialBlogSlug) {
      setSelectedBlog(null);
    }
  }, [initialBlogSlug, blogs]);

  // Reading scroll progress
  useEffect(() => {
    if (!selectedBlog) return;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedBlog]);

  const handleOpenBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    if (onBlogSelect) {
      onBlogSelect(blog.slug || blog.id);
    } else {
      window.history.pushState(null, '', withBasePath(`/blogs/${blog.slug || blog.id}`));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedBlog(null);
    if (onBlogSelect) {
      onBlogSelect(null);
    } else {
      window.history.pushState(null, '', withBasePath('/blogs'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleShare = (platform: 'whatsapp' | 'linkedin' | 'twitter') => {
    if (!selectedBlog) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${selectedBlog.title} | Jamoka Properties Dubai`);

    let target = '';
    if (platform === 'whatsapp') {
      target = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    } else if (platform === 'linkedin') {
      target = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    } else if (platform === 'twitter') {
      target = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    }

    if (target) {
      window.open(target, '_blank', 'noopener,noreferrer');
    }
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category && b.category.trim()) {
        set.add(b.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
      if (!matchesCategory) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const blockText = (blog.blocks || [])
          .map((blk) => {
            if (blk.type === 'heading') return `${blk.text} ${blk.subheading || ''}`;
            if (blk.type === 'body' || blk.type === 'cta') return blk.text;
            return '';
          })
          .join(' ')
          .toLowerCase();

        const matchesQuery =
          blog.title.toLowerCase().includes(q) ||
          (blog.subtitle || '').toLowerCase().includes(q) ||
          blog.excerpt.toLowerCase().includes(q) ||
          blog.category.toLowerCase().includes(q) ||
          blockText.includes(q);

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Derive normalized ordered blocks for the selected article
  const articleBlocks: BlogBlockNode[] = useMemo(() => {
    if (!selectedBlog) return [];
    if (Array.isArray(selectedBlog.blocks) && selectedBlog.blocks.length > 0) {
      return selectedBlog.blocks;
    }
    const fallback: BlogBlockNode[] = [];
    if (selectedBlog.subtitle) {
      fallback.push({ type: 'heading', text: selectedBlog.subtitle });
    }
    if (selectedBlog.image) {
      fallback.push({ type: 'image', url: selectedBlog.image, alt: selectedBlog.title });
    }
    if (selectedBlog.content) {
      fallback.push({ type: 'body', text: selectedBlog.content });
    }
    return fallback;
  }, [selectedBlog]);

  // Extract Table of Contents directly from every `heading` (block subtitle) in order
  const tableOfContents = useMemo(() => {
    const items: { id: string; title: string }[] = [];
    articleBlocks.forEach((blk, idx) => {
      if (blk.type === 'heading' && blk.text.trim()) {
        items.push({
          id: headingToId(blk.text, idx),
          title: blk.text.trim(),
        });
      }
    });
    return items;
  }, [articleBlocks]);

  // Render clean editorial body text (supports multi-paragraph, bullets, numbered items)
  const renderBodyText = (text: string) => {
    const chunks = text.split(/\n{2,}/);
    return chunks.map((chunk, cIdx) => {
      const trimmed = chunk.trim();
      if (!trimmed) return null;

      const lines = trimmed.split('\n').map((l) => l.trim()).filter(Boolean);
      const isBulletList = lines.length > 0 && lines.every((l) => /^[-*•]\s+/.test(l));
      const isNumberedList = lines.length > 0 && lines.every((l) => /^\d+[.)]\s+/.test(l));

      if (isBulletList) {
        return (
          <ul key={cIdx} className="my-4 space-y-2.5">
            {lines.map((line, lIdx) => (
              <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CFA55A] mt-2.5 shrink-0" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatRichInline(line.replace(/^[-*•]\s+/, '')),
                  }}
                />
              </li>
            ))}
          </ul>
        );
      }

      if (isNumberedList) {
        return (
          <ol key={cIdx} className="my-4 space-y-2.5">
            {lines.map((line, lIdx) => {
              const numMatch = line.match(/^(\d+)[.)]\s+(.*)$/);
              return (
                <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed font-light">
                  <span className="text-xs font-bold text-[#A6833D] mt-1 shrink-0 min-w-[18px]">
                    {numMatch ? `${numMatch[1]}.` : `${lIdx + 1}.`}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatRichInline(numMatch ? numMatch[2] : line),
                    }}
                  />
                </li>
              );
            })}
          </ol>
        );
      }

      return (
        <div key={cIdx} className="space-y-3 my-4">
          {lines.map((line, lIdx) => (
            <p
              key={lIdx}
              className="text-sm sm:text-base text-slate-700 leading-[1.8] font-light"
              dangerouslySetInnerHTML={{ __html: formatRichInline(line) }}
            />
          ))}
        </div>
      );
    });
  };

  // =========================================================================
  // 1. FULL-PAGE ARTICLE READER VIEW (DYNAMIC ORDERED BLOCK LAYOUT)
  // =========================================================================
  if (selectedBlog) {
    const relatedBlogs = blogs.filter((b) => b.id !== selectedBlog.id).slice(0, 3);

    return (
      <div className={`min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-[#CFA55A]/30 pb-24 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-[#CFA55A] to-[#ECC86A] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#CFA55A] group-hover:-translate-x-1 transition-transform" />
              <span>{t.blogsPage.backToArticles || 'Back to Articles'}</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#CFA55A]" />
                {selectedBlog.readTime}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopyLink}
                  title="Copy Article URL"
                  className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-slate-600 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  title="Share to WhatsApp"
                  className="p-2 rounded-xl border border-neutral-200 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => window.print()}
                  title="Print Article"
                  className="hidden sm:inline-flex p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-slate-600 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Header: Main Block Title */}
        <section className="relative pt-14 pb-16 bg-[#0A0E17] text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/95 to-transparent" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#CFA55A] block mb-3">
              {selectedBlog.category}
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-white mb-5 leading-tight">
              {selectedBlog.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#CFA55A]" />
                {selectedBlog.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#CFA55A]" />
                {selectedBlog.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-[#CFA55A] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {selectedBlog.author || 'Jamoka Advisory Desk'}
              </span>
            </div>
          </div>
        </section>

        {/* Main Editorial Article + Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article Content Column */}
            <main className="lg:col-span-8">
              <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-neutral-200/80 shadow-xs space-y-6">
                {articleBlocks.map((block, idx) => {
                  if (block.type === 'heading') {
                    const headingId = headingToId(block.text, idx);
                    const precededByImage = idx > 0 && articleBlocks[idx - 1]?.type === 'image';
                    return (
                      <div
                        key={`h-${idx}`}
                        id={headingId}
                        className={`${idx === 0 || precededByImage ? 'pt-0' : 'pt-8 border-t border-neutral-100'} scroll-mt-24`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-2 h-2 rounded-full bg-[#CFA55A] shrink-0" />
                          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif-luxury text-slate-900 tracking-tight leading-snug">
                            {block.text}
                          </h2>
                        </div>
                        {block.subheading && (
                          <p className="text-sm sm:text-base font-medium text-slate-500 pl-5 mb-2">
                            {block.subheading}
                          </p>
                        )}
                        <div className="h-0.5 w-14 bg-gradient-to-r from-[#CFA55A] to-transparent" />
                      </div>
                    );
                  }

                  if (block.type === 'image') {
                    const startsNewSection = idx > 0 && articleBlocks[idx + 1]?.type === 'heading';
                    return (
                      <figure
                        key={`img-${idx}`}
                        className={`${startsNewSection ? 'pt-8 border-t border-neutral-100 mt-8 mb-4' : idx === 0 ? 'mt-0 mb-6' : 'my-6'}`}
                      >
                        <div className="rounded-2xl overflow-hidden border border-neutral-200/80 bg-slate-900 shadow-md aspect-video max-h-[480px] w-full">
                          <img
                            src={block.url}
                            alt={block.alt || selectedBlog.title}
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              const fallback = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop';
                              if (target.src !== fallback) target.src = fallback;
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </figure>
                    );
                  }

                  if (block.type === 'cta') {
                    return (
                      <div key={`cta-${idx}`} className="pt-2">
                        <a
                          href={block.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#CFA55A] text-white hover:text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          <span>{block.text}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    );
                  }

                  return (
                    <div key={`body-${idx}`} className="text-slate-700">
                      {renderBodyText(block.text)}
                    </div>
                  );
                })}
              </article>

              {/* Advisory Callout Banner */}
              <div className="mt-10 p-8 rounded-3xl bg-gradient-to-br from-[#0A0E17] to-slate-900 text-white relative overflow-hidden shadow-xl border border-neutral-800">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-[0.2em] block mb-2">
                    PRIVATE ADVISORY APPOINTMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury mb-3">
                    Acquire Priority Allocations in Dubai&apos;s Landmark Developments
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-xl mb-6 leading-relaxed">
                    Direct developer relationships guarantee Stage-0 pricing, customized post-handover payment tranches, and comprehensive 10-Year UAE Golden Visa conveyancing.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://api.whatsapp.com/send?phone=971588648093&text=I%20would%20like%20to%20discuss%20Dubai%20property%20insights%20with%20Jamoka%20Properties."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-[#CFA55A] hover:bg-[#ECC86A] text-slate-900 font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speak with Senior Advisory</span>
                    </a>
                    <a
                      href="tel:+971588648093"
                      className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 border border-white/20 cursor-pointer"
                    >
                      <PhoneCall className="w-4 h-4 text-[#CFA55A]" />
                      <span>+971 58 864 8093</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>

            {/* Sticky Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs sticky top-24">
                {tableOfContents.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-100">
                      <FileText className="w-4 h-4 text-[#CFA55A]" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Topics in This Article
                      </h4>
                    </div>
                    <nav className="space-y-2 mb-6">
                      {tableOfContents.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(h.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="block text-xs text-slate-600 hover:text-[#A6833D] hover:translate-x-1 transition-all py-1 font-medium truncate"
                        >
                          {h.title}
                        </a>
                      ))}
                    </nav>
                  </>
                )}

                <div className={`${tableOfContents.length > 0 ? 'pt-5 border-t border-neutral-100' : ''} space-y-3`}>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
                    Investor Safeguards
                  </span>
                  <div className="text-[11px] text-slate-600 space-y-2 font-light">
                    <div className="flex items-center justify-between">
                      <span>Freehold Rights:</span>
                      <span className="font-semibold text-slate-900">100% Foreign Freehold</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Taxation:</span>
                      <span className="font-semibold text-slate-900">0% Personal &amp; Capital Gains</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Residency:</span>
                      <span className="font-semibold text-slate-900">10-Year UAE Golden Visa</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Escrow Account:</span>
                      <span className="font-semibold text-[#A6833D]">DLD &amp; RERA Verified</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block mb-2">
                    Share Briefing
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 py-2 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-[0.2em] block mb-1">
                  CONTINUE READING
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-slate-900">
                  More Market Briefings
                </h3>
              </div>
              <button
                onClick={handleBackToList}
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CFA55A]" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleOpenBlog(b)}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 hover:border-[#CFA55A]/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                      <img
                        src={b.image}
                        alt={b.title}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const fallback = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop';
                          if (target.src !== fallback) target.src = fallback;
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6833D] block mb-1">
                        {b.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors line-clamp-2">
                        {b.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 font-light line-clamp-2">
                        {b.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{b.date}</span>
                    <span className="text-[#A6833D] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN BLOGS DIRECTORY LISTING VIEW
  // =========================================================================
  return (
    <div className={`min-h-screen bg-[#FAF9F6] pb-24 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Header Banner */}
      <section className="relative pt-36 sm:pt-40 pb-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-[#CFA55A] text-[11px] font-bold tracking-[0.22em] uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>DUBAI MARKET INTELLIGENCE &amp; ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.blogsPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mb-6">
            {t.blogsPage.subtitle}
          </p>

          {blogs.length > 0 && (
            <div className="inline-flex items-center justify-center gap-2 text-xs text-neutral-300">
              <span>Jamoka Editorial • {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}</span>
            </div>
          )}
        </div>
      </section>

      {/* Search Bar & Category Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="relative rounded-2xl shadow-lg bg-white border border-neutral-200/90 overflow-hidden flex items-center p-1.5">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, topics, or Dubai communities..."
              className="w-full py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 mr-3 px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white shadow-md border border-neutral-200/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-black text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading && blogs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-neutral-200 overflow-hidden p-4 space-y-4 animate-pulse"
              >
                <div className="h-52 bg-slate-200 rounded-2xl w-full" />
                <div className="h-4 bg-slate-200 rounded-md w-1/3" />
                <div className="h-6 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-200 rounded-md w-full" />
              </div>
            ))}
          </div>
        ) : fetchError && blogs.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-neutral-200/90 p-8 max-w-xl mx-auto shadow-xs">
            <AlertCircle className="w-10 h-10 text-[#CFA55A] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">Insights Temporarily Unavailable</h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-5 font-light leading-relaxed">
              {fetchError}
            </p>
            <button
              onClick={() => refreshBlogs(true)}
              className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 max-w-xl mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              {blogs.length === 0 ? 'No Articles Published Yet' : 'No Matching Articles Found'}
            </h3>
            <p className="text-xs text-slate-500 mb-4 font-light">
              {blogs.length === 0
                ? 'New Dubai real estate research and market briefings will appear here shortly.'
                : 'Try adjusting your search query or resetting category filters.'}
            </p>
            {blogs.length > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => handleOpenBlog(blog)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-[#CFA55A]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || blog.title}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        const fallback = 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop';
                        if (target.src !== fallback) target.src = fallback;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-neutral-200 text-[11px]">
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
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A6833D] block mb-1.5">
                      {blog.category}
                    </span>

                    <h3 className="text-lg font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>

                    {blog.subtitle && (
                      <p className="text-xs font-semibold text-slate-700 mt-1.5 line-clamp-1">
                        {blog.subtitle}
                      </p>
                    )}

                    <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-[#A6833D] group-hover:text-slate-900 transition-colors">
                  <span>{t.blogsPage.readMore || 'Read Article'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
