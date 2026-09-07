import React from 'react';
import { X, ExternalLink, ShieldCheck, ArrowRight, Building, Home, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface SecondaryMarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecondaryMarketModal: React.FC<SecondaryMarketModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const sampleSecondaryUnits = [
    {
      title: 'Bvlgari Lighthouse Sky Villa',
      location: 'Jumeirah Bay Island',
      price: 'AED 48,000,000',
      status: 'Ready to Move / Handed Over',
      beds: '4 Bed Trophy Residence',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Palm Jumeirah Signature Beachfront Villa',
      location: 'Frond N, Palm Jumeirah',
      price: 'AED 36,500,000',
      status: 'Fully Furnished & Vacant on Transfer',
      beds: '5 Bed Waterfront Mansion',
      image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop',
    },
    {
      title: 'Il Primo Opera District Penthouse',
      location: 'Downtown Dubai',
      price: 'AED 24,000,000',
      status: 'Direct Burj Khalifa Frontage',
      beds: '4 Bed Panoramic Duplex',
      image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=800&auto=format&fit=crop',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-[#0F172A] text-white p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black border border-white/20 flex items-center justify-center p-2.5 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M20 20H80V70H70V30H30V45H70V75H20V65H60V55H20V20Z" fill="white" />
                <path d="M62 65L78 80H68L55 68L62 65Z" fill="#C5A059" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold text-[#D4AF37] tracking-widest uppercase">
                  PARTNERED SECONDARY MARKET SPECIALIST
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-caughe tracking-tight text-white">
                SQFT DXB Prime Resale
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                While Jamoka Properties commands Dubai’s off-plan sector, SQFT DXB curates verified secondary market and ready-to-move luxury properties.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Featured Ready Inventory (Vacant on Transfer)
            </h4>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Immediate Handover & Key Release
            </span>
          </div>

          {/* Grid of sample secondary homes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sampleSecondaryUnits.map((unit) => (
              <div
                key={unit.title}
                className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-200 flex flex-col justify-between"
              >
                <div className="relative h-40 w-full bg-slate-900">
                  <img src={unit.image} alt={unit.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-bold bg-black/70 text-amber-300 px-2 py-0.5 rounded backdrop-blur-sm">
                      {unit.status}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                    {unit.location}
                  </span>
                  <h5 className="font-bold text-slate-900 text-sm leading-tight">
                    {unit.title}
                  </h5>
                  <p className="text-xs text-slate-500">{unit.beds}</p>
                  <div className="pt-2 border-t border-neutral-200 flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 text-sm">{unit.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* External Link Action to Partner Platform */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Full private listings, title deed verification, and secondary conveyancing hosted on SQFT DXB portal.
            </div>

            <a
              href="https://sqftdxb.ae"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 transition-all"
            >
              <span>Launch SQFT DXB Portal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
