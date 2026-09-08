import React from 'react';
import { JamokaLogo } from './Logos';
import { ShieldCheck, ExternalLink, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PageType } from './Header';

interface FooterProps {
  onOpenSecondarySite: () => void;
  onNavigate: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSecondarySite,
  onNavigate,
}) => {
  const { t } = useLanguage();

  const handleNav = (page: PageType) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070A10] text-white border-t border-neutral-800">
      {/* Secondary Market Ribbon (Highlighting Partner SQFT DXB) */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-[#D4AF37]/30 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37]/40 flex items-center justify-center p-2 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M20 20H80V70H70V30H30V45H70V75H20V65H60V55H20V20Z" fill="white" />
                <path d="M62 65L78 80H68L55 68L62 65Z" fill="#C5A059" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] tracking-widest uppercase block">
                SECONDARY MARKET & READY PROPERTIES
              </span>
              <span className="text-sm font-semibold text-white">
                Looking for ready-to-move penthouses or prime resale villas in Dubai?
              </span>
            </div>
          </div>

          <button
            onClick={onOpenSecondarySite}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-[#D4AF37]/40 text-white text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Visit SQFT DXB Partner Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <button onClick={() => handleNav('home')} className="text-left">
                <JamokaLogo lightMode={true} size="md" />
              </button>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              Jamoka Properties is Dubai’s premier luxury off-plan advisory firm, orchestrating high-value property acquisitions with accredited master developers across the UAE.
            </p>
            <div className="pt-2 text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>RERA Registered Brokerage ORN: 49679</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Bayswater Tower, 8th and 11th floor, Business Bay, Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Column 1: Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Explore
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('offplan')} className="hover:text-white transition-colors">
                  {t.nav.offPlan}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('mortgage')} className="hover:text-white transition-colors">
                  {t.nav.mortgage}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  {t.nav.developers}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  {t.nav.services}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Master Developers */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Developers
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  Emaar Properties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  Nakheel
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  Omniyat
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  DAMAC Properties
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  Sobha Realty
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('developers')} className="hover:text-white transition-colors">
                  Select Group
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Insights */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Direct Access
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => handleNav('blogs')} className="hover:text-white transition-colors">
                  {t.nav.blogs}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <a href="tel:+971588648093" className="hover:text-white transition-colors">
                  +971 58 864 8093
                </a>
              </li>
              <li>
                <a href="mailto:info@jamokaproperties.com" className="hover:text-white transition-colors">
                  info@jamokaproperties.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Jamoka Properties LLC. All rights reserved. Real Estate Regulatory Agency (RERA) Certified.</p>
          <div className="flex items-center gap-6">
            <span className="text-neutral-400">Privacy Policy</span>
            <span>•</span>
            <span className="text-neutral-400">DLD Escrow Protected</span>
            <span>•</span>
            <button onClick={onOpenSecondarySite} className="hover:text-[#D4AF37] flex items-center gap-1">
              <span>Partner: SQFT DXB</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
