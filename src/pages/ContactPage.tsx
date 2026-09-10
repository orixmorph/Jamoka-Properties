import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, CheckCircle2, Send, Building, Loader2 } from 'lucide-react';
import { sendToFormBold, FORMBOLD_ENDPOINT } from '../utils/formbold';
import { SOCIAL_LINKS } from '../components/SocialIcons';

export const ContactPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendToFormBold({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: 'Contact Page (Main Inquiry)',
      subject: 'New Inquiry from Contact Page',
    });
    setIsSubmitting(false);
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
                      setFormData({ name: '', email: '', phone: '', queryType: 'Off-Plan Properties', message: '' });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-800 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form action={FORMBOLD_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="source" value="Contact Page" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                      {t.contactPage.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
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
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    {t.contactPage.phone} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 000 0000"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    {t.contactPage.message}
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide any specific development name, budget, or preferred handover year..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:border-[#D4AF37] focus:outline-none bg-neutral-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contactPage.sendBtn}</span>
                    </>
                  )}
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
                    <a href="tel:+971588648093" className="font-bold text-white hover:text-[#D4AF37]">
                      +971 58 864 8093
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

            {/* Official Social Channels Card - Bigger Version */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/80 shadow-md">
              <span className="text-[11px] font-bold text-[#A6833D] uppercase tracking-widest block mb-1">
                OFFICIAL SOCIAL MEDIA
              </span>
              <h4 className="text-lg font-bold text-slate-900 font-serif-luxury mb-1">
                Follow Jamoka Properties
              </h4>
              <p className="text-xs text-slate-500 font-light mb-5">
                Stay updated with off-plan launch videos, construction updates, and market briefings.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200/80 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group`}
                    >
                      <div className={`w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center ${social.hoverBg} transition-colors shrink-0 shadow-sm`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-[#A6833D] transition-colors">
                          {social.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium block">
                          Follow us
                        </span>
                      </div>
                    </a>
                  );
                })}
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
