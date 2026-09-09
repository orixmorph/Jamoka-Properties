import React, { useState, useEffect } from 'react';
import { JamokaFullLogo, SqftPartnerLogo } from './Logos';

interface NavbarProps {
  onOpenMortgage: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMortgage,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (sectionId === 'mortgage') {
      onOpenMortgage();
      return;
    }
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs py-3 border-b border-neutral-200/80'
          : 'bg-white/80 backdrop-blur-sm py-4 border-b border-neutral-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Dual Logos Section (Jamoka Properties & Partner SQFT DXB) */}
          <div className="flex items-center gap-3 md:gap-5 shrink-0">
            {/* Primary Logo: Jamoka Properties */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('hero');
              }}
              className="focus:outline-none"
            >
              <JamokaFullLogo />
            </a>

            {/* Subtle Divider */}
            <div className="h-6 w-px bg-neutral-200 hidden sm:block shrink-0"></div>

            {/* Secondary Partner Logo: SQFT DXB */}
            <div className="hidden sm:flex items-center shrink-0">
              <SqftPartnerLogo />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <button
              onClick={() => handleLinkClick('about')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick('off-plan')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Off Plan
            </button>
            <button
              onClick={() => handleLinkClick('mortgage')}
              className="text-xs font-bold text-[#D4AF37] hover:brightness-110 uppercase tracking-[0.14em] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Mortgage</span>
              <span className="material-symbols-outlined text-[14px]">calculate</span>
            </button>
            <button
              onClick={() => handleLinkClick('developers')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Developers
            </button>
            <button
              onClick={() => handleLinkClick('services')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleLinkClick('blogs')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Blogs
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-xs font-bold text-neutral-700 hover:text-[#D4AF37] uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Right Action: Private Advisory Desk */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('vip-inquiry')}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-[0.15em] border border-[#D4AF37]/40 shadow-xs transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span>Sovereign Desk</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-4">
            {/* Mobile Partner Link */}
            <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-500">Partner Resale Desk:</span>
              <SqftPartnerLogo />
            </div>

            <button
              onClick={() => handleLinkClick('about')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              About Us
            </button>
            <button
              onClick={() => handleLinkClick('off-plan')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              Off Plan
            </button>
            <button
              onClick={() => handleLinkClick('mortgage')}
              className="text-left text-sm font-bold text-[#D4AF37] uppercase tracking-wider py-1 flex items-center justify-between"
            >
              <span>Mortgage Calculator</span>
              <span className="material-symbols-outlined text-[18px]">calculate</span>
            </button>
            <button
              onClick={() => handleLinkClick('developers')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              Developers
            </button>
            <button
              onClick={() => handleLinkClick('services')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              Services
            </button>
            <button
              onClick={() => handleLinkClick('blogs')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              Blogs
            </button>
            <button
              onClick={() => handleLinkClick('contact')}
              className="text-left text-sm font-bold text-neutral-800 hover:text-[#D4AF37] uppercase tracking-wider py-1"
            >
              Contact Us
            </button>

            <div className="pt-4 border-t border-neutral-100">
              <button
                onClick={() => handleLinkClick('vip-inquiry')}
                className="w-full py-3 rounded-lg bg-[#0F172A] text-white text-xs font-bold uppercase tracking-widest text-center border border-[#D4AF37]/50"
              >
                Inquire With Sovereign Desk
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
