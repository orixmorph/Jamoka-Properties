import React, { useState, useEffect, useRef } from 'react';
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
  Clock,
  Award,
  Layers,
  Compass,
  ArrowUpRight,
  Download,
  X,
  Send,
  Loader2,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { JamokaLogo } from '../components/Logos';
import { MERCEDES_IMAGES } from '../assets/mercedesImages';
import { submitLandingLead } from '../services/firestoreDataService';
import { sendToFormBold, FORMBOLD_ENDPOINT } from '../utils/formbold';
import { submitLeadToGoogleSheet } from '../utils/careersGoogleSheet';

interface MercedesLandingPageProps {
  onNavigateHome: () => void;
  isAdmin?: boolean;
  onOpenAdmin?: () => void;
}

export const MercedesLandingPage: React.FC<MercedesLandingPageProps> = ({
  onNavigateHome,
  isAdmin = false,
  onOpenAdmin,
}) => {
  // Scroll responsive state:
  // Video zooms 10% on scroll (scale 1.0 to 1.10)
  const [videoScale, setVideoScale] = useState(1);

  // Video player state for Karim Benzema section
  const benzemaVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingBenzema, setIsPlayingBenzema] = useState(false);
  const [isMutedBenzema, setIsMutedBenzema] = useState(true);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          // Zoom video up to 10% (scale 1.0 to 1.10) over 600px of scrolling
          const progress = Math.min(1, Math.max(0, scrollY / 600));
          setVideoScale(1 + progress * 0.10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleBenzemaVideo = () => {
    if (!benzemaVideoRef.current) return;
    if (benzemaVideoRef.current.paused) {
      benzemaVideoRef.current.play();
      setIsPlayingBenzema(true);
    } else {
      benzemaVideoRef.current.pause();
      setIsPlayingBenzema(false);
    }
  };

  const toggleBenzemaMute = () => {
    if (!benzemaVideoRef.current) return;
    benzemaVideoRef.current.muted = !benzemaVideoRef.current.muted;
    setIsMutedBenzema(benzemaVideoRef.current.muted);
  };

  // Brochure Modal State
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [brochureLoading, setBrochureLoading] = useState(false);
  const [brochureFormData, setBrochureFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Mercedes-Benz Places Residences',
  });

  // Main Lead Form State (Mid Page)
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredUnit: '1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]',
    timeline: 'Immediate (Within 14 Days)',
    notes: '',
  });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  // Bottom Lead Form State
  const [bottomData, setBottomData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredUnit: '1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]',
    timeline: 'Immediate (Within 14 Days)',
    notes: '',
  });
  const [bottomSubmitting, setBottomSubmitting] = useState(false);
  const [bottomSubmitted, setBottomSubmitted] = useState(false);
  const [bottomError, setBottomError] = useState<string | null>(null);

  // Section 3 Contact form submission handler
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactData.name.trim() || !contactData.phone.trim()) {
      setContactError('Please enter your full name and contact phone number.');
      return;
    }

    setContactSubmitting(true);
    setContactError(null);

    const payload = {
      landingPageSlug: 'mercedes-benz-places',
      landingPageTitle: 'Mercedes-Benz Places | Binghatti City',
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      phone: contactData.phone.trim(),
      budget: contactData.preferredUnit,
      preferredLanguage: 'English / Arabic',
      timeframe: contactData.timeline,
      notes: `Preferred Unit: ${contactData.preferredUnit}. Notes: ${contactData.notes.trim()}`,
    };

    try {
      // 1. Save lead to Firestore database
      await submitLandingLead(payload);

      // 2. Direct real-time sync with connected Google Sheets
      await submitLeadToGoogleSheet({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        preferredUnit: contactData.preferredUnit,
        timeline: contactData.timeline,
        notes: contactData.notes,
        source: 'Mercedes White Registration Form (Mid-Page)',
      });

      // 3. FormBold email notification
      await sendToFormBold({
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        source: 'Mercedes White Contact Form (Mid-Page)',
        subject: `New Mercedes-Benz Places Lead: ${contactData.name} (${contactData.preferredUnit})`,
        message: `Preferred Unit: ${contactData.preferredUnit}\nTimeline: ${contactData.timeline}\nNotes: ${contactData.notes}`,
      });

      setContactSubmitted(true);
    } catch (err: any) {
      console.error('Contact lead submission error:', err);
      setContactError('Network issue submitting inquiry. Please contact our VIP Desk directly via WhatsApp.');
    } finally {
      setContactSubmitting(false);
    }
  };

  // Bottom form submission handler
  const handleBottomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomData.name.trim() || !bottomData.phone.trim()) {
      setBottomError('Please enter your full name and contact phone number.');
      return;
    }

    setBottomSubmitting(true);
    setBottomError(null);

    const payload = {
      landingPageSlug: 'mercedes-benz-places',
      landingPageTitle: 'Mercedes-Benz Places | Binghatti City',
      name: bottomData.name.trim(),
      email: bottomData.email.trim(),
      phone: bottomData.phone.trim(),
      budget: bottomData.preferredUnit,
      preferredLanguage: 'English / Arabic',
      timeframe: bottomData.timeline,
      notes: `Preferred Unit: ${bottomData.preferredUnit}. Notes: ${bottomData.notes.trim()}`,
    };

    try {
      // 1. Save lead to Firestore database
      await submitLandingLead(payload);

      // 2. Direct real-time sync with connected Google Sheets
      await submitLeadToGoogleSheet({
        name: bottomData.name,
        email: bottomData.email,
        phone: bottomData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        preferredUnit: bottomData.preferredUnit,
        timeline: bottomData.timeline,
        notes: bottomData.notes,
        source: 'Mercedes White Registration Form (Bottom)',
      });

      // 3. FormBold email notification
      await sendToFormBold({
        name: bottomData.name,
        email: bottomData.email,
        phone: bottomData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        source: 'Mercedes White Contact Form (Bottom)',
        subject: `New Mercedes-Benz Places Lead (Bottom Form): ${bottomData.name} (${bottomData.preferredUnit})`,
        message: `Preferred Unit: ${bottomData.preferredUnit}\nTimeline: ${bottomData.timeline}\nNotes: ${bottomData.notes}`,
      });

      setBottomSubmitted(true);
    } catch (err: any) {
      console.error('Bottom lead submission error:', err);
      setBottomError('Network issue submitting inquiry. Please contact our VIP Desk directly via WhatsApp.');
    } finally {
      setBottomSubmitting(false);
    }
  };

  // Brochure submit handler
  const handleBrochureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brochureFormData.name.trim() || !brochureFormData.phone.trim()) return;

    setBrochureLoading(true);
    try {
      await submitLandingLead({
        landingPageSlug: 'mercedes-benz-places',
        landingPageTitle: 'Mercedes-Benz Places (Brochure Download Request)',
        name: brochureFormData.name.trim(),
        email: brochureFormData.email.trim(),
        phone: brochureFormData.phone.trim(),
        notes: `Requested official brochure for: ${brochureFormData.interest}`,
      });

      // Dispatch to connected Google Sheets
      await submitLeadToGoogleSheet({
        name: brochureFormData.name,
        email: brochureFormData.email,
        phone: brochureFormData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        preferredUnit: brochureFormData.interest,
        notes: 'Requested official brochure and floor plan deck',
        source: 'Brochure Request Modal',
      });

      await sendToFormBold({
        name: brochureFormData.name,
        email: brochureFormData.email,
        phone: brochureFormData.phone,
        project: 'Mercedes-Benz Places | Binghatti City',
        source: 'Brochure Request Modal',
        subject: `Brochure Request: Mercedes-Benz Places - ${brochureFormData.name}`,
        message: `Interest: ${brochureFormData.interest}`,
      });

      setBrochureSubmitted(true);
    } catch (err) {
      console.warn('Brochure submit fallback:', err);
      setBrochureSubmitted(true);
    } finally {
      setBrochureLoading(false);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      'Hello Jamoka Properties VIP Desk, I am inquiring about residences at Mercedes-Benz Places | Binghatti City.'
    );
    return `https://wa.me/97143999999?text=${text}`;
  };

  // Scroll smoothly and stop directly at the form
  const scrollToForm = () => {
    const el = document.getElementById('section-contact-form');
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToBottomForm = () => {
    const el = document.getElementById('bottom-contact-form');
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-white font-jakarta font-thin selection:bg-[#CFA55A]/30 selection:text-white">
      {/* Admin Preview Banner if authenticated */}
      {isAdmin && (
        <div className="bg-black/95 border-b border-[#CFA55A]/30 px-4 py-2 sticky top-0 z-50 backdrop-blur-md flex items-center justify-between text-xs font-jakarta">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#CFA55A] font-bold tracking-wider uppercase text-[11px]">
              Mercedes-Benz Places • Live Campaign Landing Page
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-300 font-thin">
              Slug: <code className="text-[#CFA55A] font-mono">/landing/mercedes-benz-places</code>
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Published
            </span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#CFA55A] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <span>Manage in Admin Dashboard</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Floating Navigation Bar */}
      <header className="border-b border-white/10 bg-[#07090E]/95 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo / Branding */}
          <div className="flex items-center gap-3.5">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 group text-left cursor-pointer"
              title="Return to Jamoka Properties"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-800 to-black border border-white/20 flex items-center justify-center shadow-lg group-hover:border-[#CFA55A]/60 transition-colors">
                <svg className="w-6 h-6 text-white group-hover:text-[#CFA55A] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2v10m0 0L3.5 17m8.5-5l8.5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-bold font-jakarta tracking-widest uppercase text-white block">
                  MERCEDES-BENZ PLACES
                </span>
                <span className="text-[10px] tracking-wider text-[#CFA55A] block uppercase font-bold">
                  BINGHATTI CITY • MEYDAN DUBAI
                </span>
              </div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+97143999999"
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-bold tracking-wider transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#CFA55A]" />
              <span>+971 4 399 9999</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Desk</span>
            </a>

            <button
              onClick={scrollToForm}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] hover:brightness-105 text-black font-bold text-xs tracking-wider uppercase transition-all shadow-md shadow-[#CFA55A]/20 cursor-pointer"
            >
              <span>Register Your Interest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* "OWN WHAT'S NEXT" SUB-HEADER */}
      <div className="w-full bg-gradient-to-r from-black via-zinc-950 to-black py-2.5 px-4 border-b border-white/10 text-center relative z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6">
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#CFA55A]" />
          <span className="text-xs sm:text-sm font-bold font-jakarta tracking-[0.28em] sm:tracking-[0.38em] uppercase text-white">
            OWN WHAT&apos;S NEXT
          </span>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#CFA55A]" />
        </div>
      </div>

      {/* 1. CINEMATIC HERO SECTION:
          - Video sourced from Cloudinary with 10% scroll zoom
          - A subtle 10% bottom gradient on video holder
          - Tightly sized gradient backdrop behind the prices image
          - Increased prices image (especially at mid-size) that fades out on scroll
      */}
      <section className="relative w-full h-[84vh] sm:h-[88vh] min-h-[580px] max-h-[900px] overflow-hidden bg-black flex flex-col justify-end items-center text-center select-none border-b border-white/10">
        {/* Background Video with 10% Scroll Zoom */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-100 ease-out will-change-transform pointer-events-none"
          style={{ transform: `scale(${videoScale})` }}
        >
          <video
            src="https://res.cloudinary.com/ui01u7dm/video/upload/v1792226607/xbenz.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Bottom gradient: Uniform across left and right, covering ~25% to 30% from the bottom, fading to transparent at the top */}
        <div className="absolute bottom-0 left-0 right-0 h-[28%] min-h-[140px] max-h-[240px] bg-gradient-to-t from-black via-black/65 to-transparent pointer-events-none z-10" />

        {/* Pricing Image: Pushed down further, shadow removed, stays in place, does not move or fade out */}
        <div className="absolute bottom-[-8px] sm:bottom-[-12px] md:bottom-[-16px] left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
          <img
            src="https://ik.imagekit.io/pkn80iczwu/17PROMAX%20SC.png"
            alt="Mercedes-Benz Places | Binghatti City Starting from AED 1,250,000"
            className="w-full max-w-[300px] sm:max-w-[405px] md:max-w-[485px] lg:max-w-[540px] h-auto object-contain"
          />
        </div>
      </section>

      {/* 2. PROJECT OVERVIEW */}
      <section className="py-20 bg-[#0A0D17] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column with Dezeen Masterpiece Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="https://ik.imagekit.io/pkn80iczwu/mercedes-benz-binghatti-city_dezeen_2364_col_5-1704x1948.jpg"
                  alt="Mercedes-Benz Places Binghatti City Architecture"
                  className="w-full h-[460px] sm:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                  <div className="font-bold font-jakarta text-white mb-0.5">Mercedes-Benz Places | Binghatti City</div>
                  <div className="text-[11px] text-slate-400 font-thin">
                    Sensual Purity design language with fluid aerodynamic towers towering over Meydan, Dubai.
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold font-jakarta uppercase tracking-widest text-[#CFA55A]">
                <Layers className="w-4 h-4 text-[#CFA55A]" />
                <span>Project Overview</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta tracking-tight text-white leading-tight">
                WHERE DESIGN MEETS DISTINCTION.
              </h2>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-thin">
                <p>
                  Experience a new expression of branded living at Mercedes-Benz Places. Inspired by the precision and design philosophy of Mercedes-Benz, this landmark community combines striking architecture, refined automotive-inspired interiors and thoughtfully designed residential spaces.
                </p>
                <p>
                  Set within Binghatti City in Meydan, Dubai, Mercedes-Benz Places brings together contemporary living, world-class amenities, and an unmistakable architectural identity.
                </p>
              </div>

              {/* Three Design Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A] font-bold text-xs font-jakarta">
                    01
                  </div>
                  <h4 className="text-xs font-bold font-jakarta uppercase tracking-wider text-white">Aerodynamic Form</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-thin">
                    Sculptural silhouette modeled after wind-tunnel automotive curves.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A] font-bold text-xs font-jakarta">
                    02
                  </div>
                  <h4 className="text-xs font-bold font-jakarta uppercase tracking-wider text-white">Refined Interiors</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-thin">
                    Acoustic dampening glass, chrome accents, and travertine stonework.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A] font-bold text-xs font-jakarta">
                    03
                  </div>
                  <h4 className="text-xs font-bold font-jakarta uppercase tracking-wider text-white">Smart Integration</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-thin">
                    Automated valet dispatch, EV charging, and biometric smart entry.
                  </p>
                </div>
              </div>

              {/* REGISTER YOUR INTEREST CTA BUTTON */}
              <div className="pt-2">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] hover:brightness-105 text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Register Your Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION THREE: VIBRANT & INVITING WHITE LUXURY CONTACT FORM
          - High-contrast white card design that invites people to fill it
          - Connected to Firestore + FormBold
      */}
      <section id="section-contact-form" className="py-20 bg-[#07090E] border-b border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-2xl border-2 border-[#CFA55A]/50 relative overflow-hidden">
            {/* Subtle luxury ambient accent */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Form Intro & Trust Badges */}
              <div className="md:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFA55A]/15 border border-[#CFA55A]/30 text-[#8f6e2e] text-[11px] font-bold font-jakarta uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#A6833D]" />
                  <span>VIP Priority Allocation Desk</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-slate-900 tracking-tight leading-tight">
                  Register Your Private Allocation
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-thin leading-relaxed">
                  Gain priority access to confirmed floor plans, unreleased penthouse availability, and direct developer payment tranches.
                </p>

                <div className="pt-2 space-y-2.5 text-xs text-slate-700 font-normal">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>Official Binghatti Direct Channel Partner</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>100% Freehold</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>10-year UAE golden visa on applicable units</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>Strict Non-Disclosure Protection</span>
                  </div>
                </div>

                <div className="pt-3 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900">
                  <span className="font-bold block mb-0.5 font-jakarta">Instant WhatsApp Assistance</span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8f6e2e] font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                  >
                    <span>Connect directly with our VIP Desk</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Right Column: Clean, Bright Interactive Form */}
              <div className="md:col-span-7">
                {contactSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3.5">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-xl font-bold font-jakarta text-emerald-950">Inquiry Registered Successfully</h4>
                    <p className="text-xs sm:text-sm text-emerald-800 font-thin">
                      Thank you. Our executive advisory desk will provide your confidential pricing and floor plan deck shortly.
                    </p>
                    <div className="pt-2">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold font-jakarta text-xs uppercase shadow-md cursor-pointer hover:brightness-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Directly on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {contactError && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-normal">
                        {contactError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={contactData.name}
                          onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                          placeholder="e.g. Alexander Wright"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={contactData.email}
                          onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Phone Number (with Country Code) *</label>
                        <input
                          type="tel"
                          required
                          value={contactData.phone}
                          onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Unit Preference</label>
                        <select
                          value={contactData.preferredUnit}
                          onChange={(e) => setContactData({ ...contactData, preferredUnit: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 outline-none cursor-pointer font-normal shadow-sm"
                        >
                          <option value="1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]">
                            1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="2-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            2-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="3-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            3-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="4-Bedroom Sky Mansion (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            4-Bedroom Sky Mansion (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="5-Bedroom Triplex Penthouse (Invitation Only) [100% Freehold • 10-Year Golden Visa]">
                            5-Bedroom Triplex Penthouse (Invitation Only) [100% Freehold • 10-Year Golden Visa]
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={contactSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#DFB86E] hover:from-[#c29645] hover:to-[#d4a856] text-black font-bold font-jakarta text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#CFA55A]/30 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {contactSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Your Interest Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center font-thin">
                      🔒 Your details are safeguarded and strictly protected under non-disclosure terms.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOURTH SECTION: KARIM BENZEMA ACQUIRING ESTATES
          - Written matter on the LEFT SIDE (compact, simplified, smaller heading)
          - Video section on the RIGHT SIDE
      */}
      <section className="py-16 bg-[#0A0D17] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Side: Simplified, punchy editorial text */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFA55A]/15 border border-[#CFA55A]/30 text-[#CFA55A] text-[11px] font-bold font-jakarta uppercase tracking-widest">
                <Award className="w-3.5 h-3.5" />
                <span>Trophy Acquisition • Meydan Dubai</span>
              </div>

              {/* Smaller, refined heading */}
              <h2 className="text-xl sm:text-2xl font-bold font-jakarta text-white tracking-tight leading-snug">
                Karim Benzema Secures Signature Estates at Mercedes-Benz Places
              </h2>

              {/* Simplified, easy-to-understand copy */}
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-thin leading-relaxed">
                <p>
                  French football icon and 2022 Ballon d&apos;Or winner <strong>Karim Benzema</strong> has acquired multiple trophy residences at <strong>Mercedes-Benz Places | Binghatti City</strong>.
                </p>
                <p>
                  Signed in Dubai with Chairman Muhammad BinGhatti, this landmark purchase affirms the project&apos;s status among global sports royalty and sovereign collectors.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-[#0D121F] border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold font-jakarta block">Master Community</span>
                  <span className="text-xs font-bold font-jakarta text-white mt-0.5 block">Mercedes-Benz Places</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D121F] border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold font-jakarta block">Location</span>
                  <span className="text-xs font-bold font-jakarta text-white mt-0.5 block">Meydan, Dubai</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D121F] border border-white/5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold font-jakarta block">Residency</span>
                  <span className="text-xs font-bold font-jakarta text-emerald-400 mt-0.5 block">10-Yr Golden Visa</span>
                </div>
              </div>

              {/* Compact Quote */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300 font-thin italic">
                &ldquo;An architectural benchmark combining automotive precision with monumental luxury.&rdquo;
                <span className="block mt-0.5 font-bold font-jakarta text-[#CFA55A] not-italic text-[11px]">
                  — Karim Benzema, 2022 Ballon d&apos;Or Winner
                </span>
              </div>

              {/* REGISTER YOUR INTEREST CTA BUTTON */}
              <div className="pt-2">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 rounded-xl bg-[#CFA55A] hover:bg-[#dfb86e] text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Register Your Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Side: Video Section / Interactive Media Player */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-[#CFA55A]/40 shadow-2xl bg-black group max-w-lg mx-auto lg:max-w-none">
                <video
                  ref={benzemaVideoRef}
                  src="https://res.cloudinary.com/ui01u7dm/video/upload/v1792227386/football-superstar-karim-benzema-chooses-his-new-dubai-home-at-mercedes-benz-places-binghatti-city-1080-ytshorts.savetube.me.mp4#t=0.001"
                  poster="https://res.cloudinary.com/ui01u7dm/video/upload/so_0/v1792227386/football-superstar-karim-benzema-chooses-his-new-dubai-home-at-mercedes-benz-places-binghatti-city-1080-ytshorts.savetube.me.jpg"
                  preload="metadata"
                  playsInline
                  loop
                  muted={isMutedBenzema}
                  className="w-full h-[320px] sm:h-[390px] object-cover"
                />

                {/* Video Play/Pause Overlay Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-center justify-center pointer-events-none">
                  {!isPlayingBenzema && (
                    <button
                      type="button"
                      onClick={toggleBenzemaVideo}
                      className="pointer-events-auto w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-2xl hover:scale-110 hover:bg-[#CFA55A] hover:text-black transition-all cursor-pointer"
                      title="Play Video"
                    >
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                    </button>
                  )}
                </div>

                {/* Bottom Control Bar */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleBenzemaVideo}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isPlayingBenzema ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleBenzemaMute}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      {isMutedBenzema ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <div>
                      <span className="text-[10px] text-[#CFA55A] uppercase tracking-wider block font-bold font-jakarta">
                        Official Signing
                      </span>
                      <span className="text-white font-bold font-jakarta text-[11px]">
                        Karim Benzema × Muhammad BinGhatti
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://res.cloudinary.com/ui01u7dm/video/upload/v1792227386/football-superstar-karim-benzema-chooses-his-new-dubai-home-at-mercedes-benz-places-binghatti-city-1080-ytshorts.savetube.me.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-[#CFA55A] hover:text-black text-slate-300 text-[10px] uppercase font-bold font-jakarta transition-colors flex items-center gap-1"
                  >
                    <span>Full Film</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AMENITIES SECTION */}
      <section className="py-20 bg-[#07090E] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold font-jakarta uppercase tracking-widest text-[#CFA55A]">
              Curated Wellness & Leisure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta tracking-tight text-white">
              ELEVATE YOUR EVERYDAY.
            </h2>
            <div className="space-y-2 text-slate-300 text-sm sm:text-base leading-relaxed font-thin">
              <p>
                More than a place to call home, Mercedes-Benz Places offers a lifestyle shaped by wellness, leisure and recreation.
              </p>
              <p>
                Discover more than 30 amenities, including swimming pools, fitness facilities, outdoor entertainment spaces and dedicated areas to unwind, recharge and connect.
              </p>
              <p className="text-[#CFA55A] font-bold font-jakarta text-xs sm:text-sm">
                Every day brings a new way to experience elevated living.
              </p>
            </div>
          </div>

          {/* Featured Amenities Visual Banner */}
          <div className="relative rounded-3xl overflow-hidden border border-[#CFA55A]/30 mb-12 shadow-2xl group">
            <img
              src={MERCEDES_IMAGES.pool}
              alt="Mercedes-Benz Places Infinity Sky Pool"
              className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs text-[#CFA55A] font-bold font-jakarta uppercase tracking-widest">
                  Flagship Amenity
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-white">
                  Cantilevered Horizon Sky Pool
                </h3>
                <p className="text-xs text-slate-300 max-w-lg font-thin">
                  Suspended high above the Meydan skyline with unobstructed views of Burj Khalifa and the Downtown lights.
                </p>
              </div>

              {/* REGISTER YOUR INTEREST BUTTON */}
              <button
                onClick={scrollToForm}
                className="px-5 py-2.5 rounded-xl bg-[#CFA55A] text-black font-bold font-jakarta text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md shrink-0 cursor-pointer"
              >
                Register Your Interest
              </button>
            </div>
          </div>

          {/* 6 Curated Amenities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Automated Mercedes Valet',
                tag: 'Mobility',
                desc: 'Intelligent automotive staging system with EV rapid superchargers and white-glove automotive concierge.',
              },
              {
                title: 'AI Panoramic Fitness Sanctuary',
                tag: 'Wellness',
                desc: 'Next-generation Technogym equipment, private biometric training pods, yoga pavilions and Pilates studios.',
              },
              {
                title: 'Thermal & Cryotherapy Spas',
                tag: 'Recovery',
                desc: 'Sub-zero cryo-chambers, cedarwood saunas, aromatherapy steam suites and vitality hydrotherapy plunges.',
              },
              {
                title: 'Executive Private Cigar & Wine Lounge',
                tag: 'Club',
                desc: 'Climate-controlled private humidors, sommelier reserve cellar, and soundproof boardroom suites.',
              },
              {
                title: 'Private Screening Cinema',
                tag: 'Entertainment',
                desc: 'Dolby Atmos acoustic theater with reclining leather armchairs and personalized screening bookings.',
              },
              {
                title: 'Children’s Sensory Wonderland',
                tag: 'Family',
                desc: 'Interactive learning zones, splash pools, dedicated tutoring pods, and 24/7 child concierge supervision.',
              },
            ].map((amenity, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#0D121F] border border-white/5 hover:border-[#CFA55A]/30 transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#CFA55A] font-bold font-jakarta uppercase tracking-widest px-2 py-0.5 rounded bg-[#CFA55A]/10 border border-[#CFA55A]/20">
                    {amenity.tag}
                  </span>
                  <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-[#CFA55A] transition-colors" />
                </div>
                <h4 className="text-base font-bold font-jakarta text-white">{amenity.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-thin">{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCATION SECTION */}
      <section className="py-20 bg-[#0A0D17] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold font-jakarta uppercase tracking-widest text-[#CFA55A]">
                Prime Connectivity
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta tracking-tight text-white leading-tight">
                A DISTINCTIVE ADDRESS IN MEYDAN.
              </h2>
              <div className="space-y-3 text-slate-300 text-sm leading-relaxed font-thin">
                <p>
                  Positioned in Meydan, Dubai, Mercedes-Benz Places | Binghatti City brings a distinctive residential concept to one of the city&apos;s evolving districts.
                </p>
                <p>
                  Enjoy access to key road connections, business destinations, leisure experiences and the wider Dubai lifestyle.
                </p>
                <p className="text-white font-bold font-jakarta">
                  A location to live, explore and consider for the future.
                </p>
              </div>

              {/* Transit Distance Cards */}
              <div className="space-y-2.5 pt-2">
                {[
                  { time: '05 Mins', destination: 'Downtown Dubai & Burj Khalifa', note: 'Direct arterial highway' },
                  { time: '08 Mins', destination: 'Meydan Racecourse & Grandstand', note: 'World Cup venue' },
                  { time: '10 Mins', destination: 'Dubai Water Canal & Business Bay', note: 'Waterfront promenade' },
                  { time: '12 Mins', destination: 'Dubai International Financial Centre (DIFC)', note: 'Financial hub' },
                  { time: '15 Mins', destination: 'Dubai International Airport (DXB)', note: 'Global flight terminal' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#0D121F] border border-white/5 hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 text-center py-1 rounded-lg bg-[#CFA55A]/15 border border-[#CFA55A]/30 text-[#CFA55A] font-bold text-xs font-mono">
                        {item.time}
                      </div>
                      <div>
                        <span className="text-xs font-bold font-jakarta text-white block">{item.destination}</span>
                        <span className="text-[10px] text-slate-400 font-thin">{item.note}</span>
                      </div>
                    </div>
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </div>

              {/* REGISTER YOUR INTEREST CTA */}
              <div className="pt-2">
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Register Your Interest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Aerial Visual */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
                <img
                  src={MERCEDES_IMAGES.location}
                  alt="Meydan Dubai Location Overview"
                  className="w-full h-[450px] sm:h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#CFA55A]/40 text-[#CFA55A] text-xs font-bold font-jakarta uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Meydan, Nad Al Sheba</span>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 text-xs text-slate-300">
                  <div className="font-bold font-jakarta text-white">Central Dubai Epicenter</div>
                  <div className="text-[11px] text-slate-400 font-thin">
                    Seamless access to Al Khail Road, Sheikh Zayed Road, and Dubai Water Canal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INVESTMENT OPPORTUNITY */}
      <section className="py-20 bg-[#07090E] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="text-xs font-bold font-jakarta uppercase tracking-widest text-[#CFA55A]">
              Strategic Capital Allocation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-jakarta tracking-tight text-white">
              A PROPERTY THAT STANDS APART.
            </h2>
            <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed font-thin">
              <p>
                Discover the opportunity to own a residence within a distinctive branded development in Dubai.
              </p>
              <p>
                With its recognisable design identity, diverse residential options and lifestyle-focused amenities, Mercedes-Benz Places offers buyers an opportunity to explore a property that goes beyond conventional residential living.
              </p>
              <p>
                Explore current prices, available layouts and payment plans to determine whether this opportunity aligns with your goals.
              </p>
            </div>
          </div>

          {/* 4 Pillars of Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A]">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-jakarta text-white">Branded Trophy Asset</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-thin">
                Global brand power of Mercedes-Benz commands higher occupancy rates and superior secondary market premiums.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-jakarta text-white">High Growth Corridor</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-thin">
                Meydan Nad Al Sheba is expanding rapidly with infrastructure, racecourse, and upcoming metro extensions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-jakarta text-white">10-Year Golden Visa</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-thin">
                Qualifies buyer and immediate family for UAE renewable 10-year residency with zero personal or capital tax.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0D121F] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#CFA55A]/15 border border-[#CFA55A]/30 flex items-center justify-center text-[#CFA55A]">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold font-jakarta text-white">Escrow Safeguard</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-thin">
                Payments held under RERA / Dubai Land Department escrow custody, released strictly on build milestones.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#DFB86E] hover:from-[#c29645] hover:to-[#d4a856] text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#CFA55A]/30 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Register Your Interest & Request Payment Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION - 10 / 40 / 50 FRAMEWORK */}
      <section className="py-20 bg-[#0A0D17] border-b border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0D121F] via-[#090C15] to-[#121826] border border-[#CFA55A]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center space-y-5">
              <span className="text-xs font-bold font-jakarta uppercase tracking-widest text-[#CFA55A]">
                Pricing & Payment Framework
              </span>

              <h2 className="text-3xl sm:text-5xl font-bold font-jakarta text-white">
                FIND YOUR PLACE AT MERCEDES-BENZ PLACES.
              </h2>

              <div className="text-2xl sm:text-3xl font-extrabold text-[#CFA55A] font-jakarta">
                Residences starting from AED 1.25 million.
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-thin">
                Explore available residences, discover current pricing and review payment plan options with our private property team.
              </p>

              {/* Payment Plan Milestone Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl mx-auto text-left">
                <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-jakarta">Phase 1</span>
                  <div className="text-lg font-bold font-jakarta text-white mt-1">10% Deposit</div>
                  <span className="text-[11px] text-slate-400 font-thin">Immediate Allocation</span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-jakarta">Phase 2</span>
                  <div className="text-lg font-bold font-jakarta text-white mt-1">40% Build Tranches</div>
                  <span className="text-[11px] text-slate-400 font-thin">Linked to Construction</span>
                </div>
                <div className="p-4 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-jakarta">Phase 3</span>
                  <div className="text-lg font-bold font-jakarta text-[#CFA55A] mt-1">50% On Handover</div>
                  <span className="text-[11px] text-slate-400 font-thin">Completion Q4 2029</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={scrollToForm}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#dfb86e] hover:brightness-105 text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Register Your Interest
                </button>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold font-jakarta text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Speak to a Property Specialist</span>
                </a>
              </div>

              <p className="text-[11px] text-slate-500 italic pt-2 font-thin">
                *Prices and availability are subject to confirmation. 2 to 5-bedroom suites pricing available exclusively on private request.*
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BOTTOM SECTION: DEDICATED WHITE LUXURY LEAD FORM
          - High-contrast, engaging white card that makes people want to fill it
          - At the bottom of the page right before footer
      */}
      <section id="bottom-contact-form" className="py-20 bg-[#07090E] border-b border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-12 rounded-3xl bg-white text-slate-900 shadow-2xl border-2 border-[#CFA55A]/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#CFA55A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Final Call to Action */}
              <div className="md:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CFA55A]/15 border border-[#CFA55A]/30 text-[#8f6e2e] text-[11px] font-bold font-jakarta uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-[#A6833D]" />
                  <span>Final VIP Allocation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-jakarta text-slate-900 tracking-tight leading-tight">
                  Secure Your Mercedes-Benz Places Residence
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-thin leading-relaxed">
                  Your next property milestone begins here. Inquire now to secure official digital brochures, payment schedules, and priority unit selection.
                </p>

                <div className="pt-2 space-y-2.5 text-xs text-slate-700 font-normal">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>Official Binghatti Direct Channel Partner</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>100% Freehold</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>10-year UAE golden visa on applicable units</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#A6833D] shrink-0" />
                    <span>Strict Non-Disclosure Protection & Escrow Security</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setBrochureModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold font-jakarta transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A6833D]" />
                    <span>Download Brochure PDF</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Bottom Form Inputs */}
              <div className="md:col-span-7">
                {bottomSubmitted ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3.5">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="text-xl font-bold font-jakarta text-emerald-950">Inquiry Received</h4>
                    <p className="text-xs sm:text-sm text-emerald-800 font-thin">
                      Thank you. Our luxury property advisor will contact you with full floor plans and unit allocations.
                    </p>
                    <div className="pt-2">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold font-jakarta text-xs uppercase shadow-md hover:brightness-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleBottomSubmit} className="space-y-4">
                    {bottomError && (
                      <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-normal">
                        {bottomError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={bottomData.name}
                          onChange={(e) => setBottomData({ ...bottomData, name: e.target.value })}
                          placeholder="Full Name"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={bottomData.email}
                          onChange={(e) => setBottomData({ ...bottomData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Phone Number (with Country Code) *</label>
                        <input
                          type="tel"
                          required
                          value={bottomData.phone}
                          onChange={(e) => setBottomData({ ...bottomData, phone: e.target.value })}
                          placeholder="+971 50 123 4567"
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition-all font-normal shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Unit Preference</label>
                        <select
                          value={bottomData.preferredUnit}
                          onChange={(e) => setBottomData({ ...bottomData, preferredUnit: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] focus:bg-white text-xs text-slate-900 outline-none cursor-pointer font-normal shadow-sm"
                        >
                          <option value="1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]">
                            1-Bedroom Residence (From AED 1.25M) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="2-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            2-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="3-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            3-Bedroom Residence (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="4-Bedroom Sky Mansion (Price on Application) [100% Freehold • 10-Year Golden Visa]">
                            4-Bedroom Sky Mansion (Price on Application) [100% Freehold • 10-Year Golden Visa]
                          </option>
                          <option value="5-Bedroom Triplex Penthouse (Invitation Only) [100% Freehold • 10-Year Golden Visa]">
                            5-Bedroom Triplex Penthouse (Invitation Only) [100% Freehold • 10-Year Golden Visa]
                          </option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bottomSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#CFA55A] to-[#DFB86E] hover:from-[#c29645] hover:to-[#d4a856] text-black font-bold font-jakarta text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#CFA55A]/30 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {bottomSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Your Interest Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-500 text-center font-thin">
                      🔒 Your details are safeguarded and strictly protected under non-disclosure terms.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brochure Request Modal */}
      {brochureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white text-slate-900 border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => {
                setBrochureModalOpen(false);
                setBrochureSubmitted(false);
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {brochureSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-jakarta text-slate-900">Brochure Dossier Requested</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-thin">
                  Our private client advisory desk has received your request. The official Mercedes-Benz Places brochure and floor plan deck is being dispatched to your email.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setBrochureModalOpen(false);
                      setBrochureSubmitted(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#CFA55A] text-black font-bold font-jakarta text-xs uppercase"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#CFA55A]/15 text-[#8f6e2e] text-[10px] font-bold font-jakarta uppercase tracking-wider">
                    <Download className="w-3 h-3" />
                    <span>Official Dossier</span>
                  </div>
                  <h4 className="text-xl font-bold font-jakarta text-slate-900">
                    Request Project Brochure
                  </h4>
                  <p className="text-xs text-slate-500 font-thin">
                    Mercedes-Benz Places | Binghatti City
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={brochureFormData.name}
                    onChange={(e) => setBrochureFormData({ ...brochureFormData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] text-xs text-slate-900 outline-none font-normal"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={brochureFormData.email}
                    onChange={(e) => setBrochureFormData({ ...brochureFormData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] text-xs text-slate-900 outline-none font-normal"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold font-jakarta text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={brochureFormData.phone}
                    onChange={(e) => setBrochureFormData({ ...brochureFormData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#CFA55A] text-xs text-slate-900 outline-none font-normal"
                  />
                </div>

                <button
                  type="submit"
                  disabled={brochureLoading}
                  className="w-full py-3 rounded-xl bg-[#CFA55A] hover:bg-[#dfb86e] text-black font-bold font-jakarta text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {brochureLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Send Official Brochure Now</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 bg-[#05070B] text-slate-400 text-xs font-jakarta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#CFA55A]/20 border border-[#CFA55A]/40 flex items-center justify-center text-[#CFA55A]">
              <JamokaLogo className="w-5 h-5 text-[#CFA55A]" />
            </div>
            <div>
              <span className="text-white font-bold font-jakarta tracking-widest uppercase block">
                JAMOKA PROPERTIES
              </span>
              <span className="text-[10px] text-slate-500 font-thin">
                Official Advisory Desk for Mercedes-Benz Places | Binghatti City
              </span>
            </div>
          </div>

          <div className="text-center sm:text-right text-[11px] text-slate-500 font-thin">
            <p>© {new Date().getFullYear()} Jamoka Properties LLC. All rights reserved.</p>
            <p className="text-[10px] text-slate-600 mt-0.5 font-thin">
              Authorized Developer Advisory • Meydan Nad Al Sheba, Dubai, UAE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
