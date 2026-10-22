import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BlogPost } from '../data/realEstateData';
import { getPublishedBlogs } from '../services/firestoreDataService';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Share2,
  Check,
  Copy,
  ExternalLink,
  Search,
  RefreshCw,
  Tag,
  ShieldCheck,
  Building2,
  FileText,
  HelpCircle,
  ChevronRight,
  MessageSquare,
  PhoneCall,
  Printer,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface BlogsPageProps {
  initialBlogSlug?: string | null;
  onBlogSelect?: (slug: string | null) => void;
}

export const BlogsPage: React.FC<BlogsPageProps> = ({
  initialBlogSlug = null,
  onBlogSelect,
}) => {
  const { t, isRTL } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Load published blogs from Firestore
  const loadBlogs = async (forceFresh = false) => {
    try {
      if (forceFresh) setIsSyncing(true);
      const data = await getPublishedBlogs();
      setBlogs(data);
      if (forceFresh) {
        setSyncMessage(`Market Intelligence portal refreshed (${data.length} articles live).`);
        setTimeout(() => setSyncMessage(null), 3000);
      }
      return data;
    } catch (err) {
      console.warn('Failed to load published blogs:', err);
    } finally {
      setLoading(false);
      setIsSyncing(false);
    }
    return [];
  };

  useEffect(() => {
    let isMounted = true;
    loadBlogs().then((loaded) => {
      if (!isMounted) return;
      // If an initial slug was requested via URL, select it
      if (initialBlogSlug) {
        const target = (loaded || []).find(
          (b) => b.slug?.toLowerCase() === initialBlogSlug.toLowerCase() || b.id === initialBlogSlug
        );
        if (target) {
          setSelectedBlog(target);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [initialBlogSlug]);

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

  // Synchronize reading scroll progress when an article is open
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

  // Open a blog in the FULL-PAGE VIEW (never a popup window!)
  const handleOpenBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    if (onBlogSelect) {
      onBlogSelect(blog.slug || blog.id);
    } else {
      window.history.pushState(null, '', `/blogs/${blog.slug || blog.id}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Return to the main blog listings directory
  const handleBackToList = () => {
    setSelectedBlog(null);
    if (onBlogSelect) {
      onBlogSelect(null);
    } else {
      window.history.pushState(null, '', '/blogs');
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
        const keywordsStr = [
          ...(blog.primaryKeywords || []),
          ...(blog.secondaryKeywords || []),
        ]
          .join(' ')
          .toLowerCase();

        const matchesQuery =
          blog.title.toLowerCase().includes(q) ||
          blog.excerpt.toLowerCase().includes(q) ||
          blog.category.toLowerCase().includes(q) ||
          keywordsStr.includes(q);

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [blogs, selectedCategory, searchQuery]);

  // Extract table of contents from Markdown H2 headings
  const tableOfContents = useMemo(() => {
    if (!selectedBlog || !selectedBlog.content) return [];
    const lines = selectedBlog.content.split('\n');
    const headings: { id: string; title: string }[] = [];

    for (const line of lines) {
      const match = line.match(/^##\s+(.+)$/);
      if (match) {
        const rawTitle = match[1].trim();
        const id = rawTitle
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-');
        headings.push({ id, title: rawTitle });
      }
    }
    return headings;
  }, [selectedBlog]);

  // Render Rich Markdown with Executive Styling
  const renderMarkdown = (content: string) => {
    if (!content) return null;

    const sections = content.split('\n\n');

    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      if (!trimmed) return null;

      // H2 Headings
      if (trimmed.startsWith('## ')) {
        const titleText = trimmed.replace(/^##\s+/, '').trim();
        const headingId = titleText
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-');

        return (
          <div key={idx} id={headingId} className="pt-8 pb-3 scroll-mt-28">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#CFA55A]" />
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 tracking-tight">
                {titleText}
              </h2>
            </div>
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#CFA55A] to-transparent" />
          </div>
        );
      }

      // H3 Headings
      if (trimmed.startsWith('### ')) {
        const titleText = trimmed.replace(/^###\s+/, '').trim();
        return (
          <h3
            key={idx}
            className="text-lg sm:text-xl font-bold font-serif-luxury text-slate-800 pt-5 pb-2 border-l-2 border-[#CFA55A] pl-3"
          >
            {titleText}
          </h3>
        );
      }

      // Markdown Table
      if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
        const lines = trimmed.split('\n').filter((l) => l.includes('|'));
        if (lines.length >= 2) {
          const parseRow = (line: string) =>
            line
              .split('|')
              .map((c) => c.trim())
              .filter((c, i, arr) => i > 0 && i < arr.length - 1);

          const headerCells = parseRow(lines[0]);
          const dataRows = lines
            .slice(2)
            .filter((l) => !l.includes('---'))
            .map(parseRow);

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-neutral-200/90 shadow-xs bg-white">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0A0E17] text-white">
                  <tr>
                    {headerCells.map((h, i) => (
                      <th
                        key={i}
                        className="py-3 px-4 font-bold text-[#CFA55A] uppercase tracking-wider text-[11px]"
                      >
                        {h.replace(/\*\*/g, '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {dataRows.map((row, rIdx) => (
                    <tr
                      key={rIdx}
                      className={rIdx % 2 === 0 ? 'bg-white hover:bg-neutral-50/80' : 'bg-neutral-50/50 hover:bg-neutral-50'}
                    >
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4 text-slate-700 leading-relaxed font-light">
                          {cell.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Blockquotes
      if (trimmed.startsWith('>')) {
        const quoteText = trimmed.replace(/^>\s*/, '');
        return (
          <blockquote
            key={idx}
            className="my-5 p-4 sm:p-5 rounded-2xl bg-amber-50/60 border-l-4 border-[#CFA55A] text-slate-800 italic text-sm leading-relaxed"
          >
            "{quoteText.replace(/\*\*/g, '')}"
          </blockquote>
        );
      }

      // Bullet List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
        return (
          <ul key={idx} className="my-4 space-y-2.5">
            {items.map((item, iIdx) => {
              const cleanItem = item.replace(/^[-*]\s+/, '').trim();
              return (
                <li key={iIdx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CFA55A] mt-2 shrink-0" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: cleanItem
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                    }}
                  />
                </li>
              );
            })}
          </ul>
        );
      }

      // Regular Paragraph
      return (
        <p
          key={idx}
          className="my-4 text-sm sm:text-base text-slate-700 leading-relaxed font-light"
          dangerouslySetInnerHTML={{
            __html: trimmed
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
          }}
        />
      );
    });
  };

  // =========================================================================
  // 1. FULL-PAGE DEDICATED ARTICLE READER VIEW (NOT IN A WINDOW!)
  // =========================================================================
  if (selectedBlog) {
    const primaryKeywords = selectedBlog.primaryKeywords || [];
    const secondaryKeywords = selectedBlog.secondaryKeywords || [];
    const sourceLinks = selectedBlog.sourceLinks || [];
    const additionalImages = selectedBlog.additionalImages || [];
    const keyTakeaways = selectedBlog.keyTakeaways || [
      'Comprehensive investor milestone framework and RERA escrow compliance.',
      '10-Year UAE Golden Visa eligibility at AED 2,000,000 threshold with family sponsorship.',
      '100% freehold foreign ownership with zero capital gains and zero personal income taxation.',
    ];

    const relatedBlogs = blogs
      .filter((b) => b.id !== selectedBlog.id)
      .slice(0, 3);

    return (
      <div className="min-h-screen bg-[#FAF9F6] text-slate-900 selection:bg-[#CFA55A]/30 pb-24">
        {/* Sticky Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-[#CFA55A] to-[#ECC86A] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Top Floating Navigation Header */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 hover:text-black transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 text-[#CFA55A] group-hover:-translate-x-1 transition-transform" />
              <span>{t.blogsPage.backToArticles || 'Back to Market Intelligence'}</span>
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-[#CFA55A]" />
                {selectedBlog.readTime}
              </span>

              {/* Share Menu */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopyLink}
                  title="Copy Article URL"
                  className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 text-slate-600 transition-colors cursor-pointer relative"
                >
                  {copiedLink ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
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

        {/* Hero Section */}
        <section className="relative pt-12 pb-16 bg-[#0A0E17] text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent z-10" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center">
            {/* Meta tags & Category */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>{selectedBlog.category}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-white mb-5 leading-tight">
              {selectedBlog.title}
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg font-light max-w-3xl mx-auto leading-relaxed mb-6">
              {selectedBlog.excerpt}
            </p>

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
                Jamoka Advisory Desk
              </span>
            </div>
          </div>
        </section>

        {/* Featured Image & Alt Banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 relative z-30">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 bg-black aspect-video max-h-[500px] w-full">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.imageAlt || selectedBlog.title}
              className="w-full h-full object-cover"
            />
          </div>
          {selectedBlog.imageAlt && (
            <p className="text-center text-[11px] text-slate-500 mt-2 italic">
              {selectedBlog.imageAlt}
            </p>
          )}
        </div>

        {/* Main Content & Sidebar Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Article Main Body (8 Cols) */}
            <main className="lg:col-span-8">
              {/* Executive Takeaways Callout Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/60 border border-[#CFA55A]/40 mb-10 shadow-xs">
                <div className="flex items-center gap-2 mb-4 text-[#A6833D]">
                  <Sparkles className="w-5 h-5 text-[#CFA55A]" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 font-serif-luxury">
                    Executive Summary & Key Takeaways
                  </h3>
                </div>
                <ul className="space-y-3">
                  {keyTakeaways.map((point, kIdx) => (
                    <li key={kIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CFA55A] mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rendered Markdown Article */}
              <article className="prose prose-slate max-w-none text-slate-800">
                {renderMarkdown(selectedBlog.content)}
              </article>

              {/* Primary & Secondary Keywords Tags Box */}
              {(primaryKeywords.length > 0 || secondaryKeywords.length > 0) && (
                <div className="mt-12 p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-[#CFA55A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Targeted Indexing Terms & Primary Keywords
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {primaryKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-amber-50 text-[#A6833D] border border-[#CFA55A]/50 text-xs font-medium"
                      >
                        #{kw}
                      </span>
                    ))}
                    {secondaryKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 text-slate-600 border border-neutral-200 text-xs font-medium"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Images Gallery */}
              {additionalImages.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-lg font-bold font-serif-luxury text-slate-900 mb-4">
                    Architectural Renderings & Gallery
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {additionalImages.map((imgUrl, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-neutral-200 shadow-xs bg-slate-900 aspect-video">
                        <img src={imgUrl} alt={`Additional view ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Source Links & Disclaimers */}
              {sourceLinks.length > 0 && (
                <div className="mt-10 p-5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-slate-600">
                  <span className="font-bold uppercase tracking-wider block mb-2 text-slate-800">
                    Verified Source References & Research Links:
                  </span>
                  <ul className="space-y-1.5">
                    {sourceLinks.map((link, lIdx) => (
                      <li key={lIdx} className="flex items-center gap-2 truncate">
                        <ExternalLink className="w-3.5 h-3.5 text-[#CFA55A] shrink-0" />
                        <a
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-[#A6833D] truncate"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ Section */}
              {selectedBlog.faqs && selectedBlog.faqs.length > 0 && (
                <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-neutral-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-6 text-[#A6833D]">
                    <HelpCircle className="w-5 h-5 text-[#CFA55A]" />
                    <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 font-serif-luxury">
                      Frequently Asked Questions
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {selectedBlog.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="rounded-2xl border border-neutral-200/80 overflow-hidden"
                      >
                        <button
                          onClick={() => setExpandedFaqIndex(expandedFaqIndex === fIdx ? null : fIdx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          {expandedFaqIndex === fIdx ? (
                            <ChevronUp className="w-4 h-4 text-[#CFA55A] shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                        </button>
                        {expandedFaqIndex === fIdx && (
                          <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 font-light leading-relaxed bg-neutral-50/50 border-t border-neutral-100">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Callout Banner */}
              <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#0A0E17] to-slate-900 text-white relative overflow-hidden shadow-xl border border-neutral-800">
                <div className="relative z-10">
                  <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-[0.2em] block mb-2">
                    PRIVATE ADVISORY APPOINTMENT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury mb-3">
                    Acquire Priority Allocations in Dubai's Landmark Developments
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-light max-w-xl mb-6 leading-relaxed">
                    Direct developer relationships guarantee Stage-0 pricing, customized post-handover payment tranches, and comprehensive 10-Year UAE Golden Visa conveyancing.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://api.whatsapp.com/send?phone=971588648093&text=I%20would%20like%20to%20discuss%20off-plan%20allocations%20from%20your%20market%20intelligence%20briefing."
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

            {/* Sticky Sidebar (4 Cols) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="p-6 rounded-3xl bg-white border border-neutral-200/90 shadow-xs sticky top-24">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-100">
                    <FileText className="w-4 h-4 text-[#CFA55A]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      In This Briefing
                    </h4>
                  </div>
                  <nav className="space-y-2">
                    {tableOfContents.map((h, i) => (
                      <a
                        key={i}
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="block text-xs text-slate-600 hover:text-[#A6833D] hover:translate-x-1 transition-all py-1 font-light truncate"
                      >
                        {h.title}
                      </a>
                    ))}
                  </nav>

                  {/* Quick Investment Snapshot */}
                  <div className="mt-6 pt-5 border-t border-neutral-100 space-y-3">
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
                        <span className="font-semibold text-slate-900">0% Personal & Capital Gains</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Residency:</span>
                        <span className="font-semibold text-slate-900">10-Year UAE Golden Visa</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Escrow Account:</span>
                        <span className="font-semibold text-[#A6833D]">DLD & RERA Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Share Box */}
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
              )}
            </aside>
          </div>
        </div>

        {/* Related Articles Carousel */}
        {relatedBlogs.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] font-bold text-[#CFA55A] uppercase tracking-[0.2em] block mb-1">
                  CONTINUE READING
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif-luxury text-slate-900">
                  Related Market Intelligence
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
                      <img src={b.image} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[#CFA55A] text-[9px] font-bold uppercase tracking-wider">
                          {b.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
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
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative pt-36 sm:pt-40 pb-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#CFA55A]/40 text-[#CFA55A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-[#CFA55A]" />
            <span>DUBAI MARKET INTELLIGENCE & ADVISORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.blogsPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mb-6">
            {t.blogsPage.subtitle}
          </p>

          {/* Jamoka Editorial Live Status Badge */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Jamoka Editorial Desk • {blogs.length} Active Market Briefings</span>
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <button
              onClick={() => loadBlogs(true)}
              disabled={isSyncing}
              className="inline-flex items-center gap-1 text-[#CFA55A] hover:text-[#ECC86A] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Refreshing...' : 'Refresh Feed'}</span>
            </button>
          </div>

          {syncMessage && (
            <div className="mt-3 text-xs text-emerald-400 font-medium animate-fadeIn">
              {syncMessage}
            </div>
          )}
        </div>
      </section>

      {/* Search Bar & Category Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Live Search */}
          <div className="relative rounded-2xl shadow-lg bg-white border border-neutral-200/90 overflow-hidden flex items-center p-1.5">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. 'Golden Visa', 'Mercedes-Benz', 'Payment Plan')..."
              className="w-full py-2.5 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 mr-3 px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
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
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-slate-600 font-medium">
              Sourcing live articles from Baserow and running AI enhancement...
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8 max-w-xl mx-auto">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Matching Articles Found</h3>
            <p className="text-xs text-slate-500 mb-4 font-light">
              Try adjusting your search query or switching category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-[#CFA55A]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => handleOpenBlog(blog)}
                    className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || blog.title}
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
                      onClick={() => handleOpenBlog(blog)}
                      className="text-lg font-bold text-slate-900 font-serif-luxury group-hover:text-[#A6833D] transition-colors line-clamp-2 cursor-pointer"
                    >
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 font-light leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Primary Keyword Pills */}
                    {blog.primaryKeywords && blog.primaryKeywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {blog.primaryKeywords.slice(0, 3).map((kw, ki) => (
                          <span
                            key={ki}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50/80 text-[#A6833D] border border-[#CFA55A]/30 font-medium"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleOpenBlog(blog)}
                    className="w-full py-2.5 px-4 rounded-xl bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200/80 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:bg-black group-hover:text-white"
                  >
                    <span>{t.blogsPage.readBriefing}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#CFA55A]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
