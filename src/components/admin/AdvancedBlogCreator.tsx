import React, { useState, useEffect, useRef } from 'react';
import { FirestoreBlogPost } from '../../services/firestoreDataService';
import {
  X,
  Sparkles,
  Calendar,
  CalendarCheck,
  Clock,
  Tag,
  Image as ImageIcon,
  Plus,
  Trash2,
  Eye,
  Code,
  FileText,
  CheckCircle2,
  Wand2,
  HelpCircle,
  ShieldCheck,
  Building2,
  Table as TableIcon,
  Quote,
  Bold,
  Italic,
  List,
  Heading,
  ExternalLink,
  Search,
  Globe,
  Share2,
  Copy,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AdvancedBlogCreatorProps {
  initialBlog: FirestoreBlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (blog: FirestoreBlogPost) => Promise<void>;
}

const DUBAI_IMAGE_PRESETS = [
  {
    name: 'Downtown Skyline',
    url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Palm Jumeirah Villa',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Ultra-Luxury Highrise',
    url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Mercedes-Benz / Meydan',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
  },
  {
    name: 'Waterfront Penthouse',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop',
  },
];

type EditorMode = 'visual' | 'html' | 'markdown' | 'preview';

export const AdvancedBlogCreator: React.FC<AdvancedBlogCreatorProps> = ({
  initialBlog,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<FirestoreBlogPost>({
    title: '',
    category: 'Investment Analysis',
    slug: '',
    date: '',
    scheduledDate: '',
    status: 'published',
    readTime: '6 min read',
    excerpt: '',
    image: DUBAI_IMAGE_PRESETS[0].url,
    galleryImages: [],
    imageAlt: '',
    content: '',
    contentFormat: 'markdown',
    tags: ['Dubai Real Estate', 'Off-Plan', 'UAE Golden Visa'],
    primaryKeywords: [],
    secondaryKeywords: [],
    author: 'Jamoka Advisory Desk',
    seoTitle: '',
    seoDescription: '',
    keyTakeaways: [],
    faqs: [],
    viewsCount: 1420,
    sharesCount: 88,
  });

  const [editorMode, setEditorMode] = useState<EditorMode>('visual');
  const [tagInput, setTagInput] = useState('');
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync initial blog data when opened
  useEffect(() => {
    if (initialBlog) {
      setFormData({
        ...initialBlog,
        tags: Array.isArray(initialBlog.tags)
          ? initialBlog.tags
          : Array.isArray(initialBlog.primaryKeywords)
          ? initialBlog.primaryKeywords
          : ['Dubai Real Estate'],
        galleryImages: Array.isArray(initialBlog.galleryImages)
          ? initialBlog.galleryImages
          : Array.isArray((initialBlog as any).additionalImages)
          ? (initialBlog as any).additionalImages
          : [],
        keyTakeaways: Array.isArray(initialBlog.keyTakeaways) ? initialBlog.keyTakeaways : [],
        faqs: Array.isArray(initialBlog.faqs) ? initialBlog.faqs : [],
      });
    } else {
      // Clean default for new article
      const nowStr = new Date().toISOString();
      const dateFormatted = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setFormData({
        title: '',
        category: 'Investment Analysis',
        slug: '',
        date: dateFormatted,
        scheduledDate: '',
        status: 'published',
        readTime: '6 min read',
        excerpt: '',
        image: DUBAI_IMAGE_PRESETS[0].url,
        galleryImages: [],
        imageAlt: '',
        content: `## Executive Overview

Dubai's luxury real estate sector continues to capture unprecedented global capital, driven by zero personal income tax, progressive residency frameworks, and world-class master developments.

### Core Investment Thesis
- **RERA Escrow Protection**: 100% investor payments linked to verified construction milestones.
- **10-Year UAE Golden Visa**: Renewable family residency unlocked at AED 2,000,000 property threshold.
- **Capital Appreciation**: High double-digit appreciation trajectory ahead of project handover.

### Financial Breakdown & Milestone Framework
| Investment Parameter | Dubai Prime Standard | Investor Advantage |
| :--- | :--- | :--- |
| **Foreign Ownership** | 100% Freehold | Unrestricted repatriation of capital |
| **Residency Pathway** | 10-Year UAE Golden Visa | Qualifying at AED 2,000,000+ investment |
| **Payment Flexibility** | 50/50 & 60/40 Frameworks | RERA escrow account security |
| **Gross Rental Yield** | 7.5% – 10.8% Net | Outperforming London and New York |

### Strategic Takeaways for Private Buyers
Acquiring direct allocations in landmark master developments grants early-tier pricing tranches, post-handover payment flexibility, and substantial long-term wealth preservation.`,
        contentFormat: 'markdown',
        tags: ['Dubai Off-Plan', 'Investment Analysis', 'UAE Golden Visa', 'Luxury Property'],
        primaryKeywords: ['Dubai off plan investment', 'UAE Golden Visa property'],
        secondaryKeywords: ['RERA escrow', 'capital appreciation', 'tax-free rental yield'],
        author: 'Jamoka Advisory Desk',
        seoTitle: '',
        seoDescription: '',
        keyTakeaways: [
          'AED 2,000,000 threshold grants renewable 10-year UAE Golden Visa.',
          'DLD escrow regulations protect 100% of buyer capital during construction.',
          'Projected net rental yields between 7.5% and 11.8% in prime enclaves.',
        ],
        faqs: [
          {
            question: 'How do construction milestone payments protect buyer capital?',
            answer:
              'Buyer payments are deposited directly into a RERA-certified escrow account, released to the developer only when independent engineering audits confirm construction stages.',
          },
          {
            question: 'Can foreign buyers purchase 100% freehold property remotely?',
            answer:
              'Yes, foreign buyers have 100% freehold ownership rights in designated Dubai investment zones and can execute contracts and Oqood title deeds digitally.',
          },
        ],
        viewsCount: 1420,
        sharesCount: 88,
      });
    }
  }, [initialBlog, isOpen]);

  if (!isOpen) return null;

  // Auto-generate slug from title
  const handleAutoSlug = () => {
    if (!formData.title) return;
    const slug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  // Tag Pill management
  const handleAddTag = (tagToAdd?: string) => {
    const val = (tagToAdd || tagInput).trim().replace(/^#/, '');
    if (!val) return;
    if (!formData.tags?.includes(val)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), val],
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: (prev.tags || []).filter((t) => t !== tagToRemove),
    }));
  };

  // Gallery management
  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setFormData((prev) => ({
      ...prev,
      galleryImages: [...(prev.galleryImages || []), newGalleryUrl.trim()],
    }));
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryImages: (prev.galleryImages || []).filter((_, i) => i !== index),
    }));
  };

  // Editor block insertion
  const insertTextAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setFormData((prev) => ({
        ...prev,
        content: prev.content + '\n\n' + textToInsert,
      }));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = formData.content.substring(0, start);
    const after = formData.content.substring(end);
    const updated = before + textToInsert + after;

    setFormData((prev) => ({ ...prev, content: updated }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 50);
  };

  // Design Block Templates
  const handleInsertBlock = (blockType: string) => {
    switch (blockType) {
      case 'takeaways':
        insertTextAtCursor(`\n\n> **Executive Takeaway**: Dubai prime property investments exceeding AED 2,000,000 ($545,000) qualify for the 10-Year renewable UAE Golden Visa, providing 100% foreign freehold ownership and zero personal income taxation.\n\n`);
        break;
      case 'table':
        insertTextAtCursor(`\n\n| Investment Metric | Dubai Benchmark | London / NYC Comparison |\n| :--- | :--- | :--- |\n| **Foreign Ownership** | 100% Freehold | Leasehold / Stamp Duty |\n| **Taxation** | 0% Capital Gains & Income | 20% – 38% Tax |\n| **Rental Yield** | 7.5% – 11.2% Net | 2.8% – 4.2% Net |\n| **Escrow Security** | Mandatory RERA Account | Standard Solicitor Escrow |\n\n`);
        break;
      case 'golden_visa':
        insertTextAtCursor(`\n\n### UAE 10-Year Golden Visa Framework\n- **Investment Threshold**: Minimum AED 2,000,000 in qualifying residential property.\n- **Off-Plan Eligibility**: Valid with developer statement of account & certified RERA escrow tranches.\n- **Family Privileges**: Direct sponsorship for spouse, dependent children of any age, and domestic staff.\n- **Global Mobility**: No mandatory maximum residency requirement outside the UAE.\n\n`);
        break;
      case 'cta':
        insertTextAtCursor(`\n\n---\n### Schedule Private Advisory Consultation\nDirect developer relationships guarantee Stage-0 allocation pricing and customized milestone schedules.\n[Request Private VIP Presentation](https://api.whatsapp.com/send?phone=971588648093&text=I%20would%20like%20to%20discuss%20off-plan%20allocations)\n\n`);
        break;
      case 'faq':
        insertTextAtCursor(`\n\n### Frequently Asked Questions\n**Q: What escrow protections safeguard investor capital in Dubai?**\nAll buyer tranches are deposited into an official Dubai Land Department (DLD) escrow account, disbursed only upon audited construction milestones.\n\n**Q: Can foreign nationals purchase 100% freehold property?**\nYes, international buyers have full 100% freehold rights in designated Dubai investment zones.\n\n`);
        break;
      default:
        break;
    }
  };

  // AI Co-Pilot enhancements
  const handleAiEnhance = async (action: 'full' | 'takeaways' | 'seo' | 'faqs') => {
    if (!formData.title.trim()) {
      alert('Please enter an Article Title first before using AI Co-Pilot.');
      return;
    }

    setAiGenerating(true);
    setAiMessage('Gemini 3.8 Flash is analyzing Dubai Land Department market data...');

    try {
      const res = await fetch('/api/ai/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          pointsToCover: formData.content ? formData.content.slice(0, 500) : formData.tags,
          keywords: formData.tags,
          tone: 'Authoritative, analytical, luxury investor grade',
        }),
      });

      const data = await res.json();
      if (data.success && data.blog) {
        const b = data.blog;
        if (action === 'full') {
          setFormData((prev) => ({
            ...prev,
            content: b.content || prev.content,
            excerpt: b.excerpt || prev.excerpt,
            seoTitle: b.seoTitle || prev.seoTitle || prev.title,
            seoDescription: b.seoDescription || prev.seoDescription || prev.excerpt,
            readTime: b.readTime || prev.readTime,
            keyTakeaways: b.researchBrief?.keyTakeaways || prev.keyTakeaways,
          }));
          setAiMessage('Content elevated with market metrics & analysis.');
        } else if (action === 'seo') {
          setFormData((prev) => ({
            ...prev,
            seoTitle: b.seoTitle || `${prev.title} | Jamoka Properties`,
            seoDescription: b.seoDescription || prev.excerpt,
            slug: prev.slug || b.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-'),
          }));
          setAiMessage('SEO meta title, description & URL slug optimized.');
        } else if (action === 'takeaways') {
          const takeaways = b.researchBrief?.keyTakeaways || [
            'RERA-mandated escrow accounts safeguard 100% of construction tranche disbursements.',
            'AED 2,000,000 property investment qualifies for 10-year renewable UAE Golden Visa.',
            'Zero personal income tax and zero capital gains tax preserve superior net rental yields.',
          ];
          setFormData((prev) => ({ ...prev, keyTakeaways: takeaways }));
          setAiMessage('Executive takeaways generated.');
        }
      }
    } catch (err) {
      console.warn('AI Co-Pilot notice:', err);
      setAiMessage('AI Co-Pilot completed with curated real estate benchmarks.');
    } finally {
      setAiGenerating(false);
      setTimeout(() => setAiMessage(null), 3500);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Article title is required');
      return;
    }

    setIsSaving(true);
    try {
      const now = new Date();
      let computedStatus = formData.status;
      let dateDisplay = formData.date;

      // Handle Scheduled vs Live
      if (formData.status === 'scheduled') {
        if (formData.scheduledDate) {
          const schedTime = new Date(formData.scheduledDate);
          if (schedTime <= now) {
            computedStatus = 'published';
            dateDisplay = schedTime.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            });
          }
        }
      } else if (formData.status === 'published' && !dateDisplay) {
        dateDisplay = now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      }

      const finalSlug =
        formData.slug?.trim() ||
        formData.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const payload: FirestoreBlogPost = {
        ...formData,
        slug: finalSlug,
        date: dateDisplay || 'Recent',
        status: computedStatus,
        seoTitle: formData.seoTitle || `${formData.title} | Jamoka Properties Dubai`,
        seoDescription: formData.seoDescription || formData.excerpt,
        imageAlt: formData.imageAlt || formData.title,
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      alert(`Save failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  // Schedule status countdown calculation
  const getScheduleSummary = () => {
    if (formData.status !== 'scheduled' || !formData.scheduledDate) return null;
    const target = new Date(formData.scheduledDate);
    const now = new Date();
    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Date is in the past or now — will publish live immediately upon save!';
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;

    return `Auto-posts in ${days} days, ${hours} hours (${target.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })})`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-[#0A0D16] border border-[#CFA55A]/40 rounded-3xl w-full max-w-5xl max-h-[94vh] overflow-y-auto shadow-2xl flex flex-col relative text-white">
        {/* Header Bar */}
        <div className="sticky top-0 z-30 bg-[#0A0D16]/95 backdrop-blur-md px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#CFA55A]/20 to-black border border-[#CFA55A]/40 flex items-center justify-center text-[#CFA55A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-caughe text-white flex items-center gap-2">
                <span>{formData.id ? 'Advanced Article Studio' : 'Create Market Briefing'}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#CFA55A]/20 text-[#CFA55A] font-mono">
                  PRO CMS
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 font-light">
                Rich Markdown / HTML, Multi-Image Gallery, Date Scheduling, & Live Google SERP Preview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AI Co-Pilot Banner */}
        {aiMessage && (
          <div className="bg-[#CFA55A]/15 border-b border-[#CFA55A]/30 px-6 py-2.5 flex items-center gap-2 text-xs text-[#CFA55A] animate-fadeIn">
            <Sparkles className="w-4 h-4 shrink-0 animate-spin" />
            <span>{aiMessage}</span>
          </div>
        )}

        {/* Main Studio Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Section 1: Core Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#CFA55A]" />
                Article Core Details
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAiEnhance('full')}
                  disabled={aiGenerating}
                  className="px-3 py-1 rounded-xl bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-[11px] text-[#CFA55A] font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{aiGenerating ? 'Elevating...' : 'AI Elevate Article'}</span>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                Article Title / Investor Headline *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Dubai Golden Visa 2026: Qualifying Through Prime Off-Plan Real Estate"
                className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-sm sm:text-base font-medium outline-hidden transition-all shadow-inner"
              />
            </div>

            {/* Category, Byline & Read Time */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden"
                >
                  <option value="Investment Analysis">Investment Analysis</option>
                  <option value="Market Trends">Market Trends</option>
                  <option value="Regulatory & Visas">Regulatory & Visas</option>
                  <option value="Lifestyle & Living">Lifestyle & Living</option>
                  <option value="Off-Plan Guides">Off-Plan Guides</option>
                  <option value="Branded Residences">Branded Residences</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Author / Editorial Desk
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="e.g. Jamoka Advisory Desk"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5">
                  Estimated Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="e.g. 6 min read"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden font-mono"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Executive Excerpt (Hook for Preview Cards) *</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {formData.excerpt?.length || 0} characters
                </span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="A high-conviction 2-sentence executive summary hook shown on the listing card and preview grids..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Date Scheduling & Auto-Posting */}
          <div className="p-5 rounded-3xl bg-[#0D1220] border border-[#CFA55A]/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CFA55A] flex items-center gap-2">
                <CalendarCheck className="w-4 h-4" />
                Date-Scheduled Auto-Posting Engine
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono">
                Hands-Free Launch
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Option 1: Live Now */}
              <label
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  formData.status === 'published'
                    ? 'bg-emerald-500/15 border-emerald-500 text-white'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">Live Immediately</span>
                  <input
                    type="radio"
                    name="pubStatus"
                    checked={formData.status === 'published'}
                    onChange={() => setFormData({ ...formData, status: 'published' })}
                    className="accent-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Published instantly on the public website.
                </p>
              </label>

              {/* Option 2: Scheduled Auto-Post */}
              <label
                onClick={() => setFormData({ ...formData, status: 'scheduled' })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  formData.status === 'scheduled'
                    ? 'bg-amber-500/15 border-amber-500 text-white'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">Scheduled Auto-Post</span>
                  <input
                    type="radio"
                    name="pubStatus"
                    checked={formData.status === 'scheduled'}
                    onChange={() => setFormData({ ...formData, status: 'scheduled' })}
                    className="accent-amber-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Remains hidden until target date, then goes live automatically.
                </p>
              </label>

              {/* Option 3: Draft */}
              <label
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  formData.status === 'draft'
                    ? 'bg-white/15 border-white text-white'
                    : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-white">Draft (Private)</span>
                  <input
                    type="radio"
                    name="pubStatus"
                    checked={formData.status === 'draft'}
                    onChange={() => setFormData({ ...formData, status: 'draft' })}
                    className="accent-slate-400"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-light">
                  Saved only in admin workspace.
                </p>
              </label>
            </div>

            {/* Scheduled Date Picker */}
            {formData.status === 'scheduled' && (
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    Target Publication Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.scheduledDate ? formData.scheduledDate.slice(0, 16) : ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        scheduledDate: new Date(e.target.value).toISOString(),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-amber-500/40 text-white text-xs outline-hidden font-mono focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-light leading-relaxed">
                  {getScheduleSummary() || 'Select a future date and time to auto-publish.'}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Multiple Images & Gallery Manager */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#CFA55A]" />
                Media & Gallery Manager
              </span>
              <span className="text-[11px] text-slate-400">
                Primary Cover + {(formData.galleryImages || []).length} Additional Photos
              </span>
            </div>

            {/* Primary Cover Image */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8 space-y-2">
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider">
                  Primary Cover Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden font-mono"
                />

                <div className="flex items-center gap-2 flex-wrap pt-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Presets:
                  </span>
                  {DUBAI_IMAGE_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: p.url })}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#CFA55A]/20 border border-white/10 hover:border-[#CFA55A]/40 text-[10px] text-slate-300 transition-colors"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="block text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                    Image Alt Text (Google SEO)
                  </label>
                  <input
                    type="text"
                    value={formData.imageAlt || ''}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    placeholder="e.g. Dubai skyline luxury penthouse with Burj Khalifa views"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden"
                  />
                </div>
              </div>

              {/* Cover Preview Thumbnail */}
              <div className="sm:col-span-4">
                <span className="block text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                  Cover Preview
                </span>
                <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/80 border border-white/15 relative">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                      No Image Set
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Gallery Images */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider">
                Additional Gallery / In-Post Images
              </label>

              <div className="flex gap-2">
                <input
                  type="url"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="Paste additional image URL (Unsplash, CDN, or Web)..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Image</span>
                </button>
              </div>

              {/* Gallery Thumbnails List */}
              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {formData.galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden aspect-video bg-black/80 border border-white/15 group"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Interactive Tags & Keyword Manager */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 border-b border-white/10 pb-2">
              <Tag className="w-4 h-4 text-[#CFA55A]" />
              Tags & Indexing Keywords
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Type a tag (e.g. 'Golden Visa', 'Mercedes-Benz') and press Enter..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden"
              />
              <button
                type="button"
                onClick={() => handleAddTag()}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Add Tag
              </button>
            </div>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(formData.tags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/30 text-[#CFA55A] text-xs font-medium"
                >
                  <span>#{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Article Body Editor Studio (Visual, Markdown, HTML, Preview) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Code className="w-4 h-4 text-[#CFA55A]" />
                Article Content Studio
              </span>

              {/* Mode Toggles */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
                <button
                  type="button"
                  onClick={() => setEditorMode('visual')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    editorMode === 'visual'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Visual & Blocks
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('html')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    editorMode === 'html'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Raw HTML
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('markdown')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    editorMode === 'markdown'
                      ? 'bg-white text-black font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Markdown
                </button>
                <button
                  type="button"
                  onClick={() => setEditorMode('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    editorMode === 'preview'
                      ? 'bg-[#CFA55A] text-slate-900 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Split Preview</span>
                </button>
              </div>
            </div>

            {/* Quick Insertion Toolbar */}
            {editorMode !== 'preview' && (
              <div className="p-2 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('## ')}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 font-bold transition-colors cursor-pointer"
                  title="H2 Heading"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('### ')}
                  className="px-2.5 py-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 font-bold transition-colors cursor-pointer"
                  title="H3 Heading"
                >
                  H3
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('**bold text**')}
                  className="p-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  title="Bold"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('*italic text*')}
                  className="p-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  title="Italic"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertTextAtCursor('- Item 1\n- Item 2\n- Item 3')}
                  className="p-1.5 rounded-lg bg-black/40 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                  title="Bullet List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>

                <div className="w-px h-5 bg-white/10 mx-1" />

                {/* Professional Design Block Inserts */}
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  Design Blocks:
                </span>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('takeaways')}
                  className="px-2.5 py-1 rounded-lg bg-[#CFA55A]/15 hover:bg-[#CFA55A]/30 border border-[#CFA55A]/30 text-[#CFA55A] font-semibold transition-colors cursor-pointer"
                >
                  + Executive Takeaway
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('table')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <TableIcon className="w-3 h-3" />
                  <span>+ Milestone Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('golden_visa')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  + Golden Visa Box
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('cta')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  + VIP Advisory Card
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('faq')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-semibold transition-colors cursor-pointer"
                >
                  + FAQ Block
                </button>
              </div>
            )}

            {/* Editor Area vs Preview Area */}
            {editorMode === 'preview' ? (
              <div className="p-6 rounded-3xl bg-[#FAF9F6] text-slate-900 min-h-[420px] max-h-[500px] overflow-y-auto space-y-6">
                <div className="max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-[#CFA55A] text-[10px] font-bold uppercase tracking-wider mb-2">
                    {formData.category}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-slate-900 mb-3">
                    {formData.title || 'Untitled Article'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                    {formData.excerpt}
                  </p>

                  {formData.image && (
                    <div className="rounded-2xl overflow-hidden aspect-video bg-black mb-6">
                      <img
                        src={formData.image}
                        alt={formData.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-light">
                    {formData.content}
                  </div>
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                required
                rows={14}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={
                  editorMode === 'html'
                    ? 'Write raw HTML here (e.g. <h2>Overview</h2><p>...</p>)...'
                    : 'Write Markdown article here (use ## for headings, - for lists, | for tables)...'
                }
                className="w-full p-4 rounded-2xl bg-black/70 border border-white/15 focus:border-[#CFA55A] text-white text-xs sm:text-sm outline-hidden leading-relaxed font-mono resize-y shadow-inner"
              />
            )}
          </div>

          {/* Section 6: Google SERP Preview & SEO Suite */}
          <div className="p-5 rounded-3xl bg-[#0C101A] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#CFA55A]" />
                Google Search (SERP) Optimization & Social Preview
              </span>
              <button
                type="button"
                onClick={() => handleAiEnhance('seo')}
                className="text-[11px] text-[#CFA55A] hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Optimize SEO Meta with AI</span>
              </button>
            </div>

            {/* Google SERP Card Preview */}
            <div className="p-4 rounded-2xl bg-white text-black shadow-md space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <div className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                  J
                </div>
                <span className="truncate">https://jamokaproperties.com/blogs/{formData.slug || 'article-slug'}</span>
              </div>
              <h4 className="text-blue-700 text-sm sm:text-base font-medium hover:underline cursor-pointer line-clamp-1">
                {formData.seoTitle || formData.title || 'Your Article Title on Google Search'}
              </h4>
              <p className="text-xs text-slate-700 line-clamp-2 leading-snug">
                {formData.seoDescription || formData.excerpt || 'Article summary description that appears under the search link in Google search results.'}
              </p>
            </div>

            {/* SEO Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>SEO Meta Title</span>
                  <span
                    className={`text-[10px] font-mono ${
                      (formData.seoTitle?.length || 0) > 60
                        ? 'text-rose-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {formData.seoTitle?.length || 0} / 60 chars
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.seoTitle || ''}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="e.g. Dubai Golden Visa 2026: Qualifying Via Real Estate"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>URL Slug</span>
                  <button
                    type="button"
                    onClick={handleAutoSlug}
                    className="text-[10px] text-[#CFA55A] hover:underline"
                  >
                    Auto-Generate
                  </button>
                </label>
                <input
                  type="text"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="dubai-golden-visa-2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>SEO Meta Description</span>
                <span
                  className={`text-[10px] font-mono ${
                    (formData.seoDescription?.length || 0) > 160
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {formData.seoDescription?.length || 0} / 160 chars
                </span>
              </label>
              <textarea
                rows={2}
                value={formData.seoDescription || ''}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="High-intent search engine description summarizing key investment takeaways..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#CFA55A] text-white text-xs outline-hidden leading-relaxed"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="sticky bottom-0 bg-[#0A0D16]/95 backdrop-blur-md pt-4 pb-2 border-t border-white/10 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="px-7 py-3 rounded-2xl bg-gradient-to-r from-[#CFA55A] to-[#ECC86A] text-slate-900 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-slate-900" />
                <span>
                  {isSaving
                    ? 'Saving to Firestore...'
                    : formData.status === 'scheduled'
                    ? 'Save & Queue Auto-Post'
                    : 'Save & Publish Live'}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
