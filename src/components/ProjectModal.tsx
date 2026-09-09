import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { OffPlanProperty } from '../data/mockData';
import { sendToFormBold, FORMBOLD_ENDPOINT } from '../utils/formbold';

interface ProjectModalProps {
  property: OffPlanProperty | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenMortgage: (price: number) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  property,
  isOpen,
  onClose,
  onOpenMortgage,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen || !property) return null;

  const rawPriceNumber = parseInt(property.priceAed.replace(/[^0-9]/g, ''), 10) || 3000000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendToFormBold({
      name,
      email,
      phone,
      message,
      project: property.name,
      developer: property.developer,
      price: property.priceAed,
      source: 'Project Modal (Priority Unit Allocation)',
      subject: `Priority Allocation: ${property.name} (${property.developer})`,
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header Image */}
        <div className="relative h-56 md:h-72 w-full overflow-hidden shrink-0">
          <img
            src={property.image}
            alt={property.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-3 text-white">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded bg-[#0F172A]/90 text-[10px] font-bold tracking-wider text-white border border-white/20 uppercase">
                  {property.developer}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#D4AF37] text-[10px] font-bold tracking-wider text-[#0F172A] uppercase">
                  {property.tag}
                </span>
                <span className="text-[11px] text-[#D4AF37] font-semibold">
                  Handover: {property.handover}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-white">
                {property.name}
              </h2>
              <span className="text-xs text-neutral-300">
                {property.enclave} • {property.units}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block tracking-wider">
                Baseline Price
              </span>
              <span className="text-xl md:text-2xl font-extrabold text-white">
                {property.priceAed}
              </span>
              <span className="text-xs text-neutral-300 block">
                {property.priceUsd}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block mb-1">
              ARCHITECTURAL BRIEF
            </span>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Payment Plan Milestone Cards */}
          <div className="bg-[#FAF9F6] p-4 md:p-5 rounded-xl border border-neutral-200/90">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Contractual Payment Plan Structure
              </span>
              <button
                onClick={() => {
                  onClose();
                  onOpenMortgage(rawPriceNumber);
                }}
                className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                <span>Calculate Mortgage</span>
                <span className="material-symbols-outlined text-[14px]">calculate</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  On Booking
                </span>
                <span className="text-lg font-bold text-[#0F172A]">
                  {property.bookingPercent}
                </span>
                <span className="text-[10px] text-neutral-500 block">Immediate DLD Oqood</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  During Construction
                </span>
                <span className="text-lg font-bold text-[#D4AF37]">
                  {property.constructionPercent}
                </span>
                <span className="text-[10px] text-neutral-500 block">Staggered Escrow</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-neutral-200">
                <span className="text-[10px] font-bold text-neutral-400 uppercase block mb-1">
                  On Handover
                </span>
                <span className="text-lg font-bold text-[#0F172A]">
                  {property.handoverPercent}
                </span>
                <span className="text-[10px] text-neutral-500 block">Bank Mortgage / Cash</span>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
              RESIDENCE HIGHLIGHTS & AMENITIES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {property.projectHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                  <span className="material-symbols-outlined text-[16px] text-[#D4AF37]">
                    check_circle
                  </span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Confidential VIP Inquiry Form */}
          <div className="pt-4 border-t border-neutral-200">
            {submitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-emerald-800">
                <span className="material-symbols-outlined text-[32px] text-emerald-600 mb-1">
                  task_alt
                </span>
                <h4 className="text-sm font-bold">Allocation Request Registered</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  A JAMOKA private client director will contact you directly with unit layouts and floorplan dossiers.
                </p>
              </div>
            ) : (
              <form action={FORMBOLD_ENDPOINT} method="POST" onSubmit={handleSubmit} className="space-y-3">
                <input type="hidden" name="source" value="Project Modal (Priority Unit Allocation)" />
                <input type="hidden" name="project" value={property.name} />
                <input type="hidden" name="developer" value={property.developer} />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
                  Request Priority Unit Allocation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Inquiring about ${property.name} (preferred layouts, unit elevation, or payment terms)...`}
                    className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:outline-none focus:border-[#D4AF37] resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <span className="text-[10px] text-neutral-500">
                    Direct developer price • No agency commission on off-plan acquisitions
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-lg hover:brightness-105 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
