import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, CheckCircle2, Send, Building } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Off-Plan Investment',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            {t.contactPage.title}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            {t.contactPage.subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-neutral-200/80">
            <h2 className="text-2xl font-bold text-slate-900 font-serif-luxury mb-2">
              {t.contactPage.formTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light mb-6">
              Our licensed off-plan advisors are ready to assist with project brochures, floor plans, and pricing.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <h3 className="font-bold text-base">Inquiry Sent Successfully</h3>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed font-light">
                  {t.contactPage.successMsg}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', interest: 'Off-Plan Investment', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      {t.contactPage.name} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Michael Smith"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      {t.contactPage.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      {t.contactPage.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 000 0000"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      Area of Interest
                    </label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs font-semibold text-slate-700 bg-neutral-50/50 focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option>Off-Plan Investment (Emaar, Nakheel, etc.)</option>
                      <option>10-Year UAE Golden Visa Consultation</option>
                      <option>Mortgage & Handover Financing</option>
                      <option>Ready Property Resale (SQFT DXB)</option>
                      <option>Developer Master Contract Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    {t.contactPage.message}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any specific development name, budget, or preferred handover year..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contactPage.sendBtn}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Office & Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6 border border-neutral-800">
              <div>
                <span className="text-xs font-bold text-[#ECC86A] uppercase tracking-widest block mb-1">
                  OFFICE LOCATION
                </span>
                <h3 className="text-xl font-bold font-serif-luxury text-white">
                  {t.contactPage.officeTitle}
                </h3>
                <p className="text-xs text-neutral-300 font-light mt-1 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{t.contactPage.officeAddress}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">
                      {t.contactPage.phoneTitle}
                    </span>
                    <a href="tel:+97143999999" className="font-bold text-white hover:text-[#D4AF37]">
                      +971 4 399 9999
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Official Inquiries</span>
                    <a href="mailto:info@jamokaproperties.com" className="font-bold text-white hover:text-[#D4AF37]">
                      info@jamokaproperties.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">
                      {t.contactPage.hoursTitle}
                    </span>
                    <span className="font-medium text-white">{t.contactPage.hoursText}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="https://wa.me/97143999999?text=Hello%20Jamoka%20Properties,%20I%20would%20like%20to%20inquire%20about%20Dubai%20off-plan%20properties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:brightness-105 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contactPage.whatsappTitle}</span>
                </a>
              </div>
            </div>

            {/* License & Regulatory Trust Badge */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5EC] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {t.contactPage.licenseTitle}
                </span>
                <span className="text-[11px] text-slate-500 font-light block mt-0.5">
                  Regulated by Dubai Real Estate Regulatory Agency (RERA) & Dubai Land Department.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
