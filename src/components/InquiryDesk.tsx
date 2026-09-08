import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const InquiryDesk: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: 'Off-Plan Properties',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        queryType: 'Off-Plan Properties',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#0A0E17] text-white relative overflow-hidden font-jakarta">
      {/* Background Ambience */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12">
          {/* Left Column: Office & Authority Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/35 text-[#ECC86A] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>CONTACT US</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight font-jakarta">
                Get in Touch with Our Team
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-3 font-light font-jakarta">
                Have questions about an upcoming off-plan launch or looking for genuine advice on Dubai properties? Send us a quick note or reach out directly.
              </p>
            </div>

            {/* Address & Credentials */}
            <div className="space-y-3 text-xs text-neutral-300 font-jakarta">
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold text-sm block">Business Bay Office</span>
                  <span className="font-light text-neutral-300">
                    Bayswater Tower, 8th and 11th floor, Business Bay, Dubai, UAE
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold text-sm block">Working Hours</span>
                  <span className="font-light text-neutral-300">
                    Monday to Saturday: 9:00 AM – 7:00 PM (GST)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/5 border border-white/10">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-bold text-sm block">Licensed Brokerage</span>
                  <span className="font-light text-neutral-300">
                    RERA Broker Registration No. 49679 • DLD Certified Escrow Verification
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="https://wa.me/971588648093"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+971588648093"
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#D4AF37]" />
                <span>+971 58 864 8093</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Simple Form */}
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl">
            {isSubmitted ? (
              <div className="p-8 text-center space-y-4 my-6">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-jakarta">
                  Thank You for Reaching Out
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-light font-jakarta">
                  Your message has been received. One of our property advisors from our Business Bay office will be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-jakarta">
                <div className="border-b border-white/10 pb-3 mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white font-jakarta">
                    Send a Message
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 font-light">
                    Fill out your contact details and our team will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors font-light"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 tracking-wider">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors font-light"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5 tracking-wider">
                      Off-Plan or Secondary Query *
                    </label>
                    <select
                      value={formData.queryType}
                      onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                      className="w-full bg-[#111622] border border-white/15 focus:border-[#D4AF37] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors font-light"
                    >
                      <option value="Off-Plan Properties">Off-Plan Properties (Developer Releases)</option>
                      <option value="Secondary Market">Secondary Market (Ready & Resale)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5 tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you are looking for (bedrooms, budget, handover year, etc.)..."
                    className="w-full bg-white/5 border border-white/15 focus:border-[#D4AF37] rounded-xl p-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-colors resize-none font-light"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:brightness-105 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
