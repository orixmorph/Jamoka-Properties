import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  FileText,
  Lock,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Check,
  AlertCircle,
  Clock,
  Award,
} from 'lucide-react';
import { JamokaLogo } from '../components/Logos';
import {
  LandingPageItem,
  getLandingPageBySlug,
  submitLandingLead,
} from '../services/firestoreDataService';
import { MercedesLandingPage } from './MercedesLandingPage';

interface LandingPageViewProps {
  slug: string;
  onNavigateHome: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({
  slug,
  onNavigateHome,
  isAdmin = false,
  onOpenAdmin,
}) => {
  const isMercedes =
    slug.toLowerCase() === 'mercedes-benz-places' ||
    slug.toLowerCase() === 'vision-iconic' ||
    slug.toLowerCase().includes('mercedes');

  if (isMercedes) {
    return (
      <MercedesLandingPage
        onNavigateHome={onNavigateHome}
        isAdmin={isAdmin}
        onOpenAdmin={onOpenAdmin}
      />
    );
  }

  const [pageData, setPageData] = useState<LandingPageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    budget: 'AED 15M - 30M ($4.1M - $8.2M)',
    preferredLanguage: 'English',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadLandingPage() {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await getLandingPageBySlug(slug);
        if (!isMounted) return;

        if (!data) {
          setNotFound(true);
        } else if (data.status === 'draft' && !isAdmin) {
          // If draft and visitor is not authenticated admin, keep private
          setNotFound(true);
        } else {
          setPageData(data);
        }
      } catch (err) {
        console.error('Error fetching landing page:', err);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadLandingPage();
    return () => {
      isMounted = false;
    };
  }, [slug, isAdmin]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setSubmitError('Please provide your name and phone number for VIP allocation verification.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitLandingLead({
        landingPageSlug: slug,
        landingPageTitle: pageData?.title || 'Private Campaign',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        budget: formData.budget,
        preferredLanguage: formData.preferredLanguage,
        notes: formData.notes.trim(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Lead submission failed:', err);
      setSubmitError('Failed to record inquiry. Please contact our private desk directly via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp link helper
  const getWhatsAppUrl = () => {
    const rawNumber = pageData?.whatsAppNumber || '+97140000000';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Hello Jamoka Properties, I am inquiring regarding the private allocation for: ${pageData?.title || slug}.`
    );
    return `https://wa.me/${cleanNumber || '97140000000'}?text=${text}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center text-white font-jakarta">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-[#CFA55A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#CFA55A]">
            Securing Private Allocation Dossier...
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !pageData) {
    return (
      <div className="min-h-screen bg-[#07090E] text-white flex flex-col justify-between p-6 font-jakarta">
        <div className="flex items-center justify-between max-w-5xl mx-auto w-full pt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#CFA55A]/10 border border-[#CFA55A]/30 flex items-center justify-center">
              <JamokaLogo className="w-6 h-6 text-[#CFA55A]" />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase text-white">
              JAMOKA PROPERTIES
            </span>
          </div>
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Site</span>
          </button>
        </div>

        <div className="max-w-md mx-auto text-center my-16 bg-[#0C101A] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#CFA55A]">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold font-caughe tracking-wide text-white mb-2">
            Confidential Invitation Only
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            This private campaign allocation has expired, was archived, or requires direct client manager authorization.
          </p>
          <div className="space-y-3">
            <button
              onClick={onNavigateHome}
              className="w-full py-2.5 rounded-xl bg-[#CFA55A] text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
            >
              Explore Public Portfolio
            </button>
            {isAdmin && onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 transition-colors"
              >
                Open Admin Dashboard
              </button>
            )}
          </div>
        </div>

        <div className="text-center text-[11px] text-slate-600 pb-2">
          Jamoka Properties LLC • Confidential Client Relations
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-jakarta selection:bg-[#CFA55A]/30 selection:text-white">
      {/* Admin Preview Header if logged in */}
      {isAdmin && (
        <div className="bg-black/90 border-b border-[#CFA55A]/30 px-4 py-2 sticky top-0 z-50 backdrop-blur-md flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#CFA55A] font-semibold tracking-wider uppercase text-[11px]">
              Admin Preview
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300">
              Slug: <code className="text-[#CFA55A]">/landing/{pageData.slug}</code>
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                pageData.status === 'published'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              {pageData.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#CFA55A] hover:underline font-medium text-xs flex items-center gap-1"
              >
                <span>Edit in Admin Dashboard</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Floating Luxury Bar */}
      <header className="border-b border-white/10 bg-[#07090E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={onNavigateHome}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CFA55A]/20 to-black border border-[#CFA55A]/40 flex items-center justify-center shadow-lg shadow-[#CFA55A]/10">
              <JamokaLogo className="w-6 h-6 text-[#CFA55A]" />
            </div>
            <div>
              <span className="text-sm font-bold tracking-widest uppercase text-white block font-caughe">
                JAMOKA PROPERTIES
              </span>
              <span className="text-[10px] tracking-wider text-[#CFA55A] block uppercase font-medium">
                PRIVATE ALLOCATION DESK
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Priority WhatsApp</span>
            </a>

            <a
              href="#vip-register"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] hover:opacity-95 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#CFA55A]/20 cursor-pointer"
            >
              <span>{pageData.ctaButtonText || 'Request Allocation'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copy & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3 h-3" />
                <span>{pageData.badge || 'Private VIP Release'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold font-caughe tracking-tight text-white leading-tight">
                {pageData.heroHeadline}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {pageData.heroSubheadline}
              </p>

              {/* Key Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#0C101A] border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                    Starting From
                  </span>
                  <div className="text-sm font-bold text-white">
                    AED {(pageData.priceAED / 1000000).toFixed(1)}M
                  </div>
                  <span className="text-[10px] text-[#CFA55A]">
                    ${(pageData.priceUSD / 1000000).toFixed(2)}M USD
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0C101A] border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                    Payment Plan
                  </span>
                  <div className="text-sm font-bold text-white">
                    {pageData.paymentPlan || 'Flexible Framework'}
                  </div>
                  <span className="text-[10px] text-slate-400">Investor Structured</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0C101A] border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                    Handover Date
                  </span>
                  <div className="text-sm font-bold text-white">
                    {pageData.handover || 'Q4 2027'}
                  </div>
                  <span className="text-[10px] text-slate-400">Escrow Protected</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0C101A] border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1">
                    Target Net ROI
                  </span>
                  <div className="text-sm font-bold text-[#CFA55A]">
                    {pageData.roiEstimate || '9.5% Net Yield'}
                  </div>
                  <span className="text-[10px] text-emerald-400">High Growth</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#CFA55A]" />
                  <span>100% Freehold Title</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#CFA55A]" />
                  <span>10-Year UAE Golden Visa</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#CFA55A]" />
                  <span>Developer: {pageData.developer}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#CFA55A]/30 shadow-2xl shadow-black/80 group">
                <img
                  src={pageData.heroImage}
                  alt={pageData.title}
                  className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#07090E]/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#CFA55A]" />
                      <span>{pageData.location}</span>
                    </div>
                    <span className="text-[#CFA55A] font-semibold">{pageData.badge}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Registration Section */}
      <section id="vip-register" className="py-16 bg-[#090C14] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 7 Columns: Narrative, Highlights, Gallery */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-xs font-semibold text-[#CFA55A] uppercase tracking-widest block mb-2">
                  Confidential Property Dossier
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-caughe text-white mb-4">
                  {pageData.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {pageData.description}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#CFA55A]" />
                  <span>Strategic Investment Privileges</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pageData.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#0F1420] border border-white/5 flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#CFA55A]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#CFA55A]" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery if present */}
              {pageData.galleryImages && pageData.galleryImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
                    Architectural Renderings & Vistas
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {pageData.galleryImages.map((imgUrl, i) => (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden border border-white/10 h-32 group relative"
                      >
                        <img
                          src={imgUrl}
                          alt="Gallery item"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security & Regulatory Backing */}
              <div className="p-5 rounded-2xl bg-[#0B0E17] border border-[#CFA55A]/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#CFA55A] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Dubai Regulatory Compliance Assurance</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  All off-plan transactions are registered directly through the Dubai Land Department (DLD) with fully ring-fenced escrow accounts under Law No. 8 of 2007. Jamoka Properties provides independent fiduciary representation for international buyers.
                </p>
              </div>
            </div>

            {/* Right 5 Columns: Lead Submission Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0C101A] border border-[#CFA55A]/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative sticky top-28">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CFA55A]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-6 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#CFA55A]/10 border border-[#CFA55A]/30 text-[#CFA55A] text-[10px] font-bold tracking-widest uppercase mb-2">
                    <Lock className="w-3 h-3" />
                    <span>Private Investor Allocation</span>
                  </div>
                  <h3 className="text-xl font-bold font-caughe text-white">
                    Request Confidential Dossier
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Receive complete floor plans, unit allocations, and investor payment schedules.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-white">
                      Allocation Request Confirmed
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Thank you, <strong className="text-white">{formData.name}</strong>. A dedicated Senior Portfolio Director has been assigned to your request and will reach out via WhatsApp/Phone shortly.
                    </p>

                    <div className="pt-4 space-y-2.5">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Instantly on WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: '',
                            email: '',
                            phone: '',
                            budget: 'AED 15M - 30M ($4.1M - $8.2M)',
                            preferredLanguage: 'English',
                            notes: '',
                          });
                        }}
                        className="text-[11px] text-slate-400 hover:text-white underline"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                    {submitError && (
                      <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                        Full Name <span className="text-[#CFA55A]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sheikh / Lord / Dr. / Mr. / Ms."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                        WhatsApp / Phone <span className="text-[#CFA55A]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 000 0000 or +44 ..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vip@familyoffice.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                          Target Capital
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                        >
                          <option value="AED 5M - 15M">AED 5M - 15M ($1.4M - $4M)</option>
                          <option value="AED 15M - 30M">AED 15M - 30M ($4.1M - $8.2M)</option>
                          <option value="AED 30M - 60M">AED 30M - 60M ($8.2M - $16.3M)</option>
                          <option value="AED 60M+ Ultra-Luxury">AED 60M+ ($16.3M+)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                          Language
                        </label>
                        <select
                          value={formData.preferredLanguage}
                          onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                          className="w-full px-2.5 py-2 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none"
                        >
                          <option value="English">English</option>
                          <option value="Russian">Russian (Русский)</option>
                          <option value="Arabic">Arabic (العربية)</option>
                          <option value="French">French (Français)</option>
                          <option value="German">German (Deutsch)</option>
                          <option value="Chinese">Mandarin (中文)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1 tracking-wider uppercase">
                        Confidential Notes / Requests
                      </label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Preferred floor, view orientation, or Golden Visa questions..."
                        className="w-full px-3.5 py-2 rounded-lg bg-black/60 border border-white/10 focus:border-[#CFA55A] text-white text-xs outline-none transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] via-[#dfb86e] to-[#CFA55A] hover:opacity-95 text-black font-bold text-xs tracking-widest uppercase transition-all shadow-lg shadow-[#CFA55A]/20 cursor-pointer disabled:opacity-50"
                    >
                      {submitting ? 'Registering with Desk...' : (pageData.ctaButtonText || 'Request VIP Allocation')}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center leading-normal">
                      Protected by strict non-disclosure. We never share client records with third parties.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#07090E] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <JamokaLogo className="w-5 h-5 text-[#CFA55A]" />
            <span className="text-xs font-bold tracking-widest uppercase text-white font-caughe">
              JAMOKA PROPERTIES LLC
            </span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-lg mx-auto">
            Licensed Real Estate Brokerage • Dubai, United Arab Emirates • ORN Registered.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateHome}
              className="text-xs text-[#CFA55A] hover:underline"
            >
              ← Return to Jamoka Properties Home
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
