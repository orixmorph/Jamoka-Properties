import React, { useState } from 'react';
import { JamokaLogo, SqftDxbLogo } from './Logos';
import { Menu, X, PhoneCall, ExternalLink, ChevronDown, ShieldCheck, Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type PageType = 'home' | 'about' | 'offplan' | 'mortgage' | 'developers' | 'services' | 'blogs' | 'contact';

interface HeaderProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  currentCurrency: 'AED' | 'USD' | 'EUR' | 'GBP';
  onCurrencyChange: (c: 'AED' | 'USD' | 'EUR' | 'GBP') => void;
  onOpenSecondarySite: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  currentCurrency,
  onCurrencyChange,
  onOpenSecondarySite,
}) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks: { id: PageType; label: string }[] = [
    { id: 'about', label: t.nav.about },
    { id: 'offplan', label: t.nav.offPlan },
    { id: 'mortgage', label: t.nav.mortgage },
    { id: 'developers', label: t.nav.developers },
    { id: 'services', label: t.nav.services },
    { id: 'blogs', label: t.nav.blogs },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
      {/* Top Announcement Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 xl:px-12 py-1.5 bg-[#0F172A] text-white text-[11px] font-medium tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            BAYSWATER TOWER, BUSINESS BAY • DIRECT DEVELOPER ALLOCATIONS
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-[#D4AF37] font-semibold tracking-wider">
            DUBAI LAND DEPARTMENT (DLD) ESCROW VERIFIED
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>RERA ORN: 31822</span>
          </div>
          <a
            href="tel:+97143999999"
            className="flex items-center gap-1 text-[#D4AF37] hover:text-[#e4c259] font-medium transition-colors"
          >
            <PhoneCall className="w-3 h-3" />
            <span>+971 4 399 9999</span>
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-3">
        {/* Dual Logos Side by Side */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Logo 1: Jamoka Properties (Clicking navigates to Home) */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left cursor-pointer outline-none"
            aria-label="Jamoka Properties Home"
          >
            <JamokaLogo size="md" />
          </button>

          {/* Elegant Divider */}
          <div className="h-9 w-px bg-neutral-200 hidden sm:block"></div>

          {/* Logo 2: SQFT DXB (Partnered Site for Secondary Resale) */}
          <div className="hidden sm:block">
            <div
              onClick={onOpenSecondarySite}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenSecondarySite()}
              className="flex items-center cursor-pointer p-1 rounded-md hover:bg-neutral-50 transition-colors"
              title="Click to visit SQFT DXB for Secondary Market Resales"
            >
              <SqftDxbLogo size="sm" />
              <ExternalLink className="w-3 h-3 text-neutral-400 ml-1.5 opacity-60 group-hover:opacity-100" />
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 lg:gap-6 text-[13px] font-medium text-slate-700 tracking-[0.02em]">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1.5 transition-colors font-semibold ${
                  isActive ? 'text-[#0F172A]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#D4AF37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Currency Selector + Language Switcher + Contact Us Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setCurrencyDropdownOpen(!currencyDropdownOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-2 rounded-xl transition-colors"
              title="Select Currency"
            >
              <span>{currentCurrency}</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {currencyDropdownOpen && (
              <div
                className={`absolute ${
                  isRTL ? 'left-0' : 'right-0'
                } mt-1.5 w-24 bg-white border border-neutral-200 rounded-xl shadow-xl py-1 z-50 text-xs`}
              >
                {(['AED', 'USD', 'EUR', 'GBP'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onCurrencyChange(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-neutral-50 flex items-center justify-between font-semibold ${
                      currentCurrency === curr ? 'text-[#D4AF37] bg-neutral-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{curr}</span>
                    {currentCurrency === curr && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher (Beside Contact Us Button) */}
          <div className="relative">
            <button
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setCurrencyDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-neutral-100 hover:bg-neutral-200/80 px-3 py-2 rounded-xl border border-neutral-200/60 transition-colors"
              title="Change Language (English / العربية)"
            >
              <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{language === 'en' ? 'English' : 'العربية'}</span>
              <ChevronDown className="w-3 h-3 text-neutral-500" />
            </button>

            {langDropdownOpen && (
              <div
                className={`absolute ${
                  isRTL ? 'left-0' : 'right-0'
                } mt-1.5 w-32 bg-white border border-neutral-200 rounded-xl shadow-xl py-1 z-50 text-xs`}
              >
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-50 font-semibold ${
                    language === 'en' ? 'text-[#D4AF37] bg-neutral-50' : 'text-slate-700'
                  }`}
                >
                  <span>English</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </button>
                <button
                  onClick={() => {
                    setLanguage('ar');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-right flex items-center justify-between hover:bg-neutral-50 font-semibold font-jakarta ${
                    language === 'ar' ? 'text-[#D4AF37] bg-neutral-50' : 'text-slate-700'
                  }`}
                >
                  <span>العربية</span>
                  {language === 'ar' && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </button>
              </div>
            )}
          </div>

          {/* Contact Us CTA Button (Replaced Private Advisory) */}
          <button
            onClick={() => handleNavClick('contact')}
            className={`hidden md:inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-xl transition-all shadow-sm ${
              activePage === 'contact'
                ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black shadow-md'
                : 'bg-[#0F172A] hover:bg-[#1E293B] text-white border border-[#D4AF37]/40 hover:border-[#D4AF37]'
            }`}
          >
            <span>{t.nav.contactBtn}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-neutral-200 px-6 py-5 space-y-4 shadow-2xl">
          {/* SQFT DXB Mobile Link */}
          <div
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSecondarySite();
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsMobileMenuOpen(false);
                onOpenSecondarySite();
              }
            }}
            className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 flex items-center justify-between cursor-pointer"
          >
            <SqftDxbLogo size="sm" />
            <span className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1">
              Visit SQFT DXB <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Nav Links */}
          <div className="space-y-1 pt-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'home' ? 'bg-[#FAF5EC] text-[#A6833D]' : 'text-slate-800'
              }`}
            >
              {t.nav.home}
            </button>
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? 'bg-[#FAF5EC] text-[#A6833D]' : 'text-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full bg-[#0F172A] text-white py-3 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 border border-[#D4AF37]/50"
            >
              <span>{t.nav.contactBtn}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
