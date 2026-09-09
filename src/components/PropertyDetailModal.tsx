import React, { useState } from 'react';
import { OffPlanProject } from '../data/realEstateData';
import { useLanguage } from '../context/LanguageContext';
import { X, Calendar, Percent, Landmark, Download, CheckCircle2, MessageSquare, ShieldCheck, MapPin, Sparkles, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface PropertyDetailModalProps {
  project: OffPlanProject | null;
  onClose: () => void;
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  project,
  onClose,
  currency,
}) => {
  const { t, isRTL } = useLanguage();
  const [showBrochureForm, setShowBrochureForm] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  if (!project) return null;

  const formatPrice = (priceAED: number) => {
    switch (currency) {
      case 'USD':
        return `$${(priceAED / 3.6725).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'EUR':
        return `€${(priceAED / 3.98).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'GBP':
        return `£${(priceAED / 4.65).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      default:
        return `AED ${priceAED.toLocaleString()}`;
    }
  };

  const handleBrochureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-neutral-200"
      >
        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors z-10`}
            aria-label={t.projects.closeModal}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Developer */}
          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} flex items-center gap-2`}>
            <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/50 text-[#ECC86A] text-[10px] font-bold tracking-wider uppercase">
              {project.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 text-slate-900 text-[10px] font-extrabold uppercase">
              {project.developer}
            </span>
          </div>

          {/* Bottom Title & Pricing */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-white">
            <div>
              <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                {project.enclave}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury mt-0.5">
                {project.name}
              </h2>
              <p className="text-xs text-neutral-300 font-light mt-0.5">{project.bedrooms}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-neutral-300 uppercase block">{t.projects.starting}</span>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {formatPrice(project.priceAED)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[62vh] overflow-y-auto">
          {/* Key Spec Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-xs">
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">{t.projects.handover}</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {project.handover}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">{t.projects.paymentPlan}</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5 flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-[#D4AF37]" />
                {project.paymentPlan}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">Projected ROI</span>
              <span className="font-bold text-emerald-700 text-sm mt-0.5">
                {project.roi}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block uppercase text-[10px]">Property Type</span>
              <span className="font-bold text-slate-900 text-sm mt-0.5">
                {project.type}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Property Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Key Amenities */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t.projects.amenities}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-neutral-200/80 text-xs text-slate-700 shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Schedule */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              {t.projects.milestones}
            </h3>
            <div className="space-y-2">
              {project.milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-neutral-200/80 bg-neutral-50/60"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF5EC] text-[#D4AF37] font-bold text-xs flex items-center justify-center border border-[#D4AF37]/30">
                      {m.percentage}%
                    </div>
                    <div>
                      <span className="font-semibold text-xs text-slate-900 block">{m.phase}</span>
                      <span className="text-[11px] text-slate-500 font-light">{m.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learn More & Project Inquiry Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FAF5EC] via-white to-[#F5EFE6] border border-[#D4AF37]/40 shadow-sm">
            <div className="flex items-center gap-2 text-[#A6833D] text-[11px] font-bold uppercase tracking-widest mb-1">
              <Send className="w-4 h-4 text-[#D4AF37]" />
              <span>Direct Developer Advisory</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-serif-luxury">
              {t.projects.downloadBrochure}
            </h3>
            <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed font-light">
              {t.projects.brochurePrompt}
            </p>

            {downloadSuccess ? (
              <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{t.projects.brochureSuccessTitle}</span>
                </div>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  {t.projects.brochureSuccessDesc}
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    href={`https://wa.me/97143999999?text=Hello%20Jamoka%20Properties,%20I%20am%20inquiring%20about%20${encodeURIComponent(project.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-[#25D366] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:brightness-105"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open in WhatsApp</span>
                  </a>
                  <button
                    onClick={() => setDownloadSuccess(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-200 text-slate-700 font-bold text-xs hover:bg-neutral-300 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBrochureSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Michael Smith"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37] bg-white text-slate-800 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="investor@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37] bg-white text-slate-800 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37] bg-white text-slate-800 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={`Please send me details, current availability, and the best payment plans for ${project.name}...`}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#D4AF37] bg-white text-slate-800 resize-none shadow-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs tracking-wider uppercase hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={`https://wa.me/97143999999?text=Hello%20Jamoka%20Properties,%20please%20send%20me%20details%20and%20payment%20plans%20for%20${encodeURIComponent(project.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
