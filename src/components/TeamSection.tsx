import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Phone, Mail, Send, Users, Loader2 } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/realEstateData';
import { sendToFormBold, FORMBOLD_ENDPOINT } from '../utils/formbold';

interface TeamSectionProps {
  onNavigateContact?: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onNavigateContact }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<'Business Bay' | 'DIFC'>('Business Bay');
  const [selectedAdvisor, setSelectedAdvisor] = useState('Senior Advisory Partner');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendToFormBold({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      office: selectedOffice,
      advisor: selectedAdvisor,
      source: 'Team Section (Private Client Advisory Consultation)',
      subject: `Advisory Session Request - ${selectedOffice}`,
    });
    setIsSubmitting(false);
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setIsBookingModalOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 4500);
  };

  const handleOpenBooking = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <section id="team" className="py-20 lg:py-28 bg-white font-jakarta border-t border-neutral-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Collective Mastery Text & Metric Bullets */}
          <div className="lg:col-span-6 space-y-7">
            {/* Eyebrow */}
            <div>
              <span className="text-[#CCA14C] text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase block mb-3">
                COLLECTIVE MASTERY
              </span>
              
              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0D1B2A] tracking-tight leading-[1.18] font-jakarta">
                Meet the People Behind JAMOKA
              </h2>
            </div>

            {/* Subtitle / Description */}
            <p className="text-slate-500 text-sm sm:text-[15px] font-light leading-relaxed max-w-xl font-jakarta">
              A specialized collective of 70+ property advisors bringing local market intelligence, strategic insight, and international financial acumen to every Dubai off-plan acquisition.
            </p>

            {/* Metric Items with Circular Badges */}
            <div className="space-y-4 pt-1">
              {/* Metric 1 */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-neutral-300/90 bg-[#FAFBFD] flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 font-jakarta">
                    70+
                  </span>
                </div>
                <span className="text-xs sm:text-[14px] text-slate-700 font-medium font-jakarta">
                  Property Advisors across Dubai
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-neutral-300/90 bg-[#FAFBFD] flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 font-jakarta">
                    15+
                  </span>
                </div>
                <span className="text-xs sm:text-[14px] text-slate-700 font-medium font-jakarta">
                  Languages spoken, connecting clients across global markets
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full border border-neutral-300/90 bg-[#FAFBFD] flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xs sm:text-[13px] font-bold text-slate-900 font-jakarta">
                    100%
                  </span>
                </div>
                <span className="text-xs sm:text-[14px] text-slate-700 font-medium font-jakarta">
                  Client-focused approach, from property selection to acquisition
                </span>
              </div>
            </div>

            {/* Gold CTA Action Button matching user screenshot */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenBooking}
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-[#CCA14C] hover:bg-[#B88F3E] text-[#1F1600] font-bold text-xs sm:text-[13px] tracking-[0.1em] uppercase transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] font-jakarta cursor-pointer"
              >
                <span>MEET OUR TEAM • BOOK ADVISOR</span>
              </button>
            </div>
          </div>

          {/* Right Column: Boardroom Meeting Image Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/90 aspect-[4/3] sm:aspect-[16/11] bg-[#0A0E17] group">
              {/* Background Team Meeting Photo */}
              <img
                src="/advisory-team.jpg"
                alt="Jamoka Properties Private Client Advisory Council in Dubai Boardroom"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />

              {/* Top Right Subtle Brand Stamp matching glass partition */}
              <div className="absolute top-5 right-5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl px-3.5 py-1.5 text-right hidden sm:block shadow-sm">
                <span className="text-[10px] font-extrabold tracking-[0.18em] text-white block uppercase">
                  JAMOKA
                </span>
                <span className="text-[8px] text-white/80 font-light tracking-wider block uppercase">
                  Advisory Council
                </span>
              </div>

              {/* Bottom Gradient Shadow Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-6 px-6 sm:px-8 flex items-end justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white tracking-tight font-jakarta">
                    Private Client Advisory Council
                  </h4>
                  <p className="text-xs text-[#CCA14C] font-medium tracking-wide font-jakarta mt-0.5">
                    Bayswater Tower, 8th & 11th Floor, Business Bay
                  </p>
                </div>

                {/* Scalloped Rosette Verified Seal Badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#CCA14C] shrink-0 drop-shadow-md"
                  title="RERA Certified Escrow & Advisory Council"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Advisor Consultation Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative overflow-hidden font-jakarta">
            {/* Close Button */}
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-jakarta">
                  Appointment Request Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. A private client partner from our {selectedOffice} office will confirm your appointment for {formData.date || 'your selected date'}.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-[#CCA14C] tracking-[0.2em] uppercase block">
                    JAMOKA ADVISORY DESK
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-jakarta mt-1">
                    Book a Private Client Advisory Session
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Meet with a licensed Dubai off-plan specialist in-person or via secure video conference.
                  </p>
                </div>

                <form action={FORMBOLD_ENDPOINT} method="POST" onSubmit={handleBookingSubmit} className="space-y-4">
                  <input type="hidden" name="source" value="Team Section (Advisory Booking)" />
                  <input type="hidden" name="office" value={selectedOffice} />
                  {/* Office Selection Tabs */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wider uppercase">
                      Select Meeting Location
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedOffice('Business Bay')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                          selectedOffice === 'Business Bay'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-neutral-50 text-slate-600 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#CCA14C]" />
                        <span>Bayswater (8th & 11th Fl.)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedOffice('DIFC')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                          selectedOffice === 'DIFC'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-neutral-50 text-slate-600 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#CCA14C]" />
                        <span>DIFC Gate Precinct 4</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#CCA14C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#CCA14C]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-[#CCA14C]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Your message, preferred meeting time, or property requirements..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-[#CCA14C] resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#CCA14C] hover:bg-[#B88F3E] text-[#1F1600] font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
