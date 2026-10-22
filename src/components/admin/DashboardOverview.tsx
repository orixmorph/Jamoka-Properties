import React from 'react';
import { FirestoreBlogPost } from '../../services/firestoreDataService';
import {
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
  CheckCircle2,
  CalendarCheck,
  FileText,
  ArrowRight,
  ShieldCheck,
  Share2,
  Tag,
  Plus,
  Wand2,
  ExternalLink,
  Layers,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

interface DashboardOverviewProps {
  blogs: FirestoreBlogPost[];
  onOpenCreateBlog: () => void;
  onOpenAiGenerator: () => void;
  onViewBlog: (blog: FirestoreBlogPost) => void;
  onPublishNow: (blog: FirestoreBlogPost) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  blogs,
  onOpenCreateBlog,
  onOpenAiGenerator,
  onViewBlog,
  onPublishNow,
  onNavigateToTab,
}) => {
  const now = new Date();

  // Categorize blogs
  const publishedBlogs = blogs.filter((b) => {
    if (b.status === 'published') return true;
    if (b.status === 'scheduled' && b.scheduledDate) {
      const sched = new Date(b.scheduledDate);
      return !isNaN(sched.getTime()) && sched <= now;
    }
    return false;
  });

  const scheduledBlogs = blogs.filter((b) => {
    if (b.status !== 'scheduled') return false;
    if (!b.scheduledDate) return false;
    const sched = new Date(b.scheduledDate);
    return !isNaN(sched.getTime()) && sched > now;
  });

  const draftBlogs = blogs.filter(
    (b) => b.status === 'draft' || b.status === 'ready_for_review'
  );

  // Total views and shares estimates
  const totalViews = blogs.reduce(
    (acc, b) => acc + (typeof b.viewsCount === 'number' ? b.viewsCount : 1240),
    0
  );

  // Category distribution
  const categoryCounts: Record<string, number> = {};
  blogs.forEach((b) => {
    const cat = b.category || 'Market Intelligence';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  // Calculate time remaining for scheduled posts
  const formatTimeRemaining = (targetDateStr: string) => {
    const target = new Date(targetDateStr);
    const diffMs = target.getTime() - now.getTime();
    if (diffMs <= 0) return 'Ready to publish';

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffHours / 24);
    const hours = diffHours % 24;

    if (days > 0) {
      return `Auto-posts in ${days}d ${hours}h`;
    }
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `Auto-posts in ${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Welcome & Quick Actions Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1420] via-[#0A0D16] to-black border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFA55A]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-[#CFA55A]/30 text-[#CFA55A] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jamoka Editorial Intelligence Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-caughe text-white">
              Editorial Operations & Performance Dashboard
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
              Full control over published Dubai market briefings, date-scheduled auto-posts, SEO meta tags, and AI-grounded investor research.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCreateBlog}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#CFA55A] to-[#ECC86A] text-slate-900 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#CFA55A]/20 hover:opacity-95 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 text-slate-900" />
              <span>New Article Studio</span>
            </button>

            <button
              onClick={onOpenAiGenerator}
              className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-[#CFA55A]" />
              <span>AI Co-Pilot</span>
            </button>

            <a
              href="/blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Public Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Articles */}
        <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 shadow-lg relative overflow-hidden group hover:border-[#CFA55A]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium uppercase tracking-wider">Total Articles</span>
            <div className="p-2 rounded-xl bg-white/5 text-[#CFA55A]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {blogs.length}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-light">
            <span>Managed in Firestore</span>
          </div>
        </div>

        {/* Live Published */}
        <div className="p-5 rounded-2xl bg-[#0D111C] border border-emerald-500/20 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium uppercase tracking-wider text-emerald-400">Live Published</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mb-1 flex items-center gap-2">
            <span>{publishedBlogs.length}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-light">
            <span>Indexed and visible to investors</span>
          </div>
        </div>

        {/* Scheduled Auto-Posts */}
        <div className="p-5 rounded-2xl bg-[#0D111C] border border-amber-500/20 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium uppercase tracking-wider text-amber-400">Auto-Scheduled</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 mb-1">
            {scheduledBlogs.length}
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1 font-light">
            <span>Timed release queued</span>
          </div>
        </div>

        {/* Readership Estimate */}
        <div className="p-5 rounded-2xl bg-[#0D111C] border border-white/10 shadow-lg relative overflow-hidden group hover:border-[#CFA55A]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium uppercase tracking-wider">Estimated Views</span>
            <div className="p-2 rounded-xl bg-white/5 text-[#CFA55A]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white mb-1">
            {totalViews.toLocaleString()}+
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-light">
            <span>High-intent investor reach</span>
          </div>
        </div>
      </div>

      {/* Scheduled Auto-Posting Pipeline (Active Timers) */}
      <div className="bg-[#0C101A] border border-amber-500/30 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-caughe flex items-center gap-2">
                <span>Date-Scheduled Auto-Posting Queue</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono">
                  {scheduledBlogs.length} Pending
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Articles with future dates automatically go live on the public site the instant their scheduled date arrives.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('blogs')}
            className="text-xs text-[#CFA55A] hover:text-[#ECC86A] font-semibold flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>Manage All Posts</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {scheduledBlogs.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
            <Clock className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">No upcoming scheduled posts</p>
            <p className="text-[11px] text-slate-500 font-light mt-1 mb-4">
              When creating an article, select "Scheduled" and set a future date. It will queue here with a live countdown.
            </p>
            <button
              onClick={onOpenCreateBlog}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>Schedule a Post</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {scheduledBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-start gap-4">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-[#CFA55A]/20 text-[#CFA55A] text-[10px] font-bold uppercase tracking-wider">
                        {blog.category}
                      </span>
                      <span className="text-[11px] text-amber-300 font-mono font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {formatTimeRemaining(blog.scheduledDate!)}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white font-caughe line-clamp-1">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 font-light mt-0.5">
                      Target Launch: {new Date(blog.scheduledDate!).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                  <button
                    onClick={() => onViewBlog(blog)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Edit / Preview
                  </button>
                  <button
                    onClick={() => onPublishNow(blog)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Publish Live Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dual Insights Grid: Category Velocity & Top Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0D111C] border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#CFA55A]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Category Distribution
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              {Object.keys(categoryCounts).length} Sectors
            </span>
          </div>

          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / (blogs.length || 1)) * 100);
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">{cat}</span>
                    <span className="text-slate-400 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#CFA55A] to-[#ECC86A] rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 space-y-1 font-light">
            <span className="font-semibold text-slate-200 block">Editorial Tip:</span>
            Articles focused on UAE Golden Visa and 50/50 payment frameworks generate the highest international buyer engagement.
          </div>
        </div>

        {/* Recent Performance & Top Articles (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0D111C] border border-white/10 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#CFA55A]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Recent Market Briefings
              </h3>
            </div>
            <button
              onClick={() => onNavigateToTab('blogs')}
              className="text-xs text-[#CFA55A] hover:underline"
            >
              View Full Catalog
            </button>
          </div>

          <div className="space-y-3">
            {blogs.slice(0, 4).map((blog) => (
              <div
                key={blog.id}
                onClick={() => onViewBlog(blog)}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#CFA55A]/40 flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                    <img
                      src={
                        blog.image ||
                        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=400'
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white group-hover:text-[#CFA55A] transition-colors truncate">
                      {blog.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                      <span>{blog.category}</span>
                      <span>•</span>
                      <span>{blog.date || 'Recent'}</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      blog.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : blog.status === 'scheduled'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-white/10 text-slate-400'
                    }`}
                  >
                    {blog.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
