import React, { useState } from 'react';
import { JamokaFullLogo, SqftPartnerLogo } from './Logos';

interface ContactAndFooterProps {
  onOpenMortgage: () => void;
  onNavigate: (sectionId: string) => void;
}

export const ContactAndFooter: React.FC<ContactAndFooterProps> = ({
  onOpenMortgage,
  onNavigate,
}) => {
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
  };

  return (
    <>
      {/* Dark Luxury Section: Sovereign Client Desk & Private Consultation */}
      <section id="vip-inquiry" className="py-24 bg-[#0B0F19] text-white relative overflow-hidden border-t border-[#D4AF37]/20">
        {/* Subtle Luxury Gold Sheen & Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.05),transparent_50%)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Context & Guarantees */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                SOVEREIGN ADVISORY MANDATE
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-white tracking-tight leading-tight">
                Direct Developer Allocation <br />
                <span className="text-gold-gradient italic font-normal">
                  Private Client Desk
                </span>
              </h2>

              <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
                Submit an allocation request to receive confidential off-market inventory, Stage-0 pricing, and comprehensive payment schedule models from our DIFC fiduciary advisors.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase block">0% Agency Brokerage</span>
                    <span className="text-neutral-400">Direct contract with authorized master developers.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <span className="material-symbols-outlined text-[18px]">lock</span>
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase block">Strict Non-Disclosure</span>
                    <span className="text-neutral-400">Complete fiduciary privacy for sovereign and family office capital.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                  </div>
                  <div>
                    <span className="font-bold text-white uppercase block">15-Minute Priority Response</span>
                    <span className="text-neutral-400">Direct connection with a licensed Dubai off-plan director.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Confidential Form */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                    <span className="material-symbols-outlined text-[36px]">check_circle</span>
                  </div>
                  <h3 className="text-2xl font-bold font-serif-luxury text-white">
                    Mandate Received Successfully
                  </h3>
                  <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name || 'Valued Investor'}. A Jamoka Properties private client partner has been assigned to your brief and will initiate confidential contact shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Confidential Advisory Form
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      Fields marked * are required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alexander Vance"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="investor@example.com"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1">
                        Off-Plan or Secondary Query *
                      </label>
                      <select
                        value={formData.queryType}
                        onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                        className="w-full bg-[#141C2C] border border-white/20 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="Off-Plan Properties">Off-Plan Properties (Developer Releases)</option>
                        <option value="Secondary Market">Secondary Market (Ready & Resale)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300 block mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify preferred bedroom counts, payment milestones, or property requirements..."
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-[#D4AF37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] hover:brightness-105 active:scale-[0.99] text-[#0F172A] font-bold text-xs uppercase tracking-[0.16em] shadow-lg transition-all cursor-pointer"
                  >
                    SEND MESSAGE
                  </button>

                  <p className="text-[10px] text-neutral-400 text-center font-normal">
                    Strict adherence to DLD privacy standards. Your data is never shared with third-party telemarketers.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Official Footer */}
      <footer id="contact" className="bg-[#070A10] text-neutral-400 pt-16 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
            
            {/* Brand Column with Dual Logos */}
            <div className="lg:col-span-4 space-y-4">
              <JamokaFullLogo isDarkBackground={true} />
              
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Premier Dubai off-plan real estate advisory licensed by the Dubai Land Department and RERA. Specializing in primary developer launches, VIP allocations, and sovereign asset advisory.
              </p>

              {/* Secondary Market Partner Integration */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-neutral-800 space-y-2">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                  Secondary Market Partner:
                </span>
                <SqftPartnerLogo isDarkBackground={true} />
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-[0.16em] block">
                Navigation
              </span>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('off-plan')} className="hover:text-white transition-colors">
                    Off-Plan Portfolio
                  </button>
                </li>
                <li>
                  <button onClick={onOpenMortgage} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                    <span>Mortgage Calculator</span>
                    <span className="material-symbols-outlined text-[13px]">calculate</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('developers')} className="hover:text-white transition-colors">
                    Authorized Developers
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">
                    Fiduciary Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('blogs')} className="hover:text-white transition-colors">
                    Market Briefings
                  </button>
                </li>
              </ul>
            </div>

            {/* Prime Enclaves */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-[0.16em] block">
                Covered Enclaves
              </span>
              <ul className="space-y-2 text-xs">
                <li>Palm Jumeirah Waterfront Mansions</li>
                <li>Downtown Dubai Sky Duplexes</li>
                <li>Dubai Water Canal Residences</li>
                <li>Dubai Harbour Superyacht Marina</li>
                <li>Dubai Hills Estate Fairway Villas</li>
                <li>Palm Jebel Ali Sovereign Beachfront</li>
              </ul>
            </div>

            {/* Official Headquarters & Contact */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-[0.16em] block">
                Headquarters
              </span>
              <div className="text-xs space-y-2 text-neutral-400">
                <p>
                  <strong className="text-white">DIFC Advisory Desk:</strong><br />
                  Gate Precinct 4, Level 5, DIFC, Dubai, United Arab Emirates
                </p>
                <p>
                  <strong className="text-white">Downtown Gallery:</strong><br />
                  Boulevard Plaza Tower 1, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai
                </p>
                <p className="pt-2">
                  <span className="block text-white font-semibold">Direct Desk:</span>
                  +971 4 248 8888
                </p>
                <p>
                  <span className="block text-white font-semibold">Private Advisory:</span>
                  private.desk@jamokaproperties.ae
                </p>
                <p className="text-[10px] text-neutral-500 pt-1">
                  RERA Registered Agency • ORN #29841
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
            <p>
              © {new Date().getFullYear()} Jamoka Properties LLC. All rights reserved. Registered with Dubai Land Department.
            </p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="hover:text-neutral-400 cursor-pointer">DLD Escrow Policy</span>
              <span>•</span>
              <span className="hover:text-neutral-400 cursor-pointer">Privacy Charter</span>
              <span>•</span>
              <span className="hover:text-neutral-400 cursor-pointer">Anti-Money Laundering (AML) Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
