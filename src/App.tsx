import React, { useState, useMemo, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header, PageType } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OffPlanPage } from './pages/OffPlanPage';
import { MortgagePage } from './pages/MortgagePage';
import { DevelopersPage } from './pages/DevelopersPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogsPage } from './pages/BlogsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { Footer } from './components/Footer';
import { SecondaryMarketPopup } from './components/SecondaryMarketPopup';
import { SecondaryMarketModal } from './components/SecondaryMarketModal';
import { OFF_PLAN_PROJECTS } from './data/realEstateData';

const getInitialRoute = (): { page: PageType; careerSlug: string | null } => {
  if (typeof window === 'undefined') {
    return { page: 'home', careerSlug: null };
  }
  // Check both window.location.pathname and hash for deployment environments (e.g. Vercel, sub-domains)
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#/, '');

  const effectivePath = hash ? (hash.startsWith('/') ? hash : `/${hash}`) : path;

  if (effectivePath.startsWith('/careers/real-estate-agent')) {
    return { page: 'careers', careerSlug: 'real-estate-agent' };
  }
  if (effectivePath.startsWith('/careers/social-media-content-creator')) {
    return { page: 'careers', careerSlug: 'social-media-content-creator' };
  }
  if (effectivePath.startsWith('/careers')) {
    return { page: 'careers', careerSlug: null };
  }
  if (effectivePath.startsWith('/about')) {
    return { page: 'about', careerSlug: null };
  }
  if (effectivePath.startsWith('/offplan')) {
    return { page: 'offplan', careerSlug: null };
  }
  if (effectivePath.startsWith('/mortgage')) {
    return { page: 'mortgage', careerSlug: null };
  }
  if (effectivePath.startsWith('/developers')) {
    return { page: 'developers', careerSlug: null };
  }
  if (effectivePath.startsWith('/services')) {
    return { page: 'services', careerSlug: null };
  }
  if (effectivePath.startsWith('/blogs')) {
    return { page: 'blogs', careerSlug: null };
  }
  if (effectivePath.startsWith('/contact')) {
    return { page: 'contact', careerSlug: null };
  }

  return { page: 'home', careerSlug: null };
};

function MainApp() {
  const { isRTL } = useLanguage();
  const initialRoute = useMemo(() => getInitialRoute(), []);
  const [activePage, setActivePage] = useState<PageType>(initialRoute.page);
  const [careerSlug, setCareerSlug] = useState<string | null>(initialRoute.careerSlug);
  const [currency, setCurrency] = useState<'AED' | 'USD' | 'EUR' | 'GBP'>('AED');
  const [secondaryModalOpen, setSecondaryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize browser URL on load and popstate
  useEffect(() => {
    const handleLocation = () => {
      const route = getInitialRoute();
      setActivePage(route.page);
      setCareerSlug(route.careerSlug);
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Filters for Discovery Tool on Home Page
  const [filters, setFilters] = useState({
    enclave: 'All Enclaves',
    paymentPlan: 'All Frameworks',
    priceBracket: 'All Brackets',
    completionYear: 'All Horizons',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      enclave: 'All Enclaves',
      paymentPlan: 'All Frameworks',
      priceBracket: 'All Brackets',
      completionYear: 'All Horizons',
    });
    setSearchQuery('');
  };

  // Search logic with automatic reset when empty or cleared
  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  // Filtered projects for Home page
  const filteredProjects = useMemo(() => {
    return OFF_PLAN_PROJECTS.filter((proj) => {
      // Live search term
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery =
          proj.name.toLowerCase().includes(q) ||
          proj.enclave.toLowerCase().includes(q) ||
          proj.developer.toLowerCase().includes(q) ||
          proj.type.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // Enclave filter
      if (filters.enclave !== 'All Enclaves' && proj.enclave !== filters.enclave) {
        return false;
      }

      // Payment plan
      if (filters.paymentPlan !== 'All Frameworks' && proj.paymentPlan !== filters.paymentPlan) {
        return false;
      }

      // Completion year
      if (filters.completionYear !== 'All Horizons') {
        if (!proj.handover.includes(filters.completionYear)) {
          return false;
        }
      }

      // Price bracket
      if (filters.priceBracket === 'Under AED 3M' && proj.priceAED >= 3000000) {
        return false;
      }
      if (
        filters.priceBracket === 'AED 3M - AED 10M' &&
        (proj.priceAED < 3000000 || proj.priceAED > 10000000)
      ) {
        return false;
      }
      if (filters.priceBracket === 'Above AED 10M' && proj.priceAED <= 10000000) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  const scrollToProjectsOnHome = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const projElem = document.getElementById('off-plan-projects');
        if (projElem) {
          projElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const projElem = document.getElementById('off-plan-projects');
      if (projElem) {
        projElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavigate = (page: PageType) => {
    setActivePage(page);
    if (page === 'careers') {
      setCareerSlug(null);
      window.history.pushState(null, '', '/careers');
    } else if (page === 'home') {
      window.history.pushState(null, '', '/');
    } else {
      window.history.pushState(null, '', `/${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJobSelect = (slug: string | null) => {
    setCareerSlug(slug);
    if (slug) {
      window.history.pushState(null, '', `/careers/${slug}`);
    } else {
      window.history.pushState(null, '', '/careers');
    }
  };

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen bg-white text-slate-800 font-jakarta flex flex-col selection:bg-[#CFA55A]/30 selection:text-slate-900"
    >
      {/* Header with Dual Logos, Language Switcher, and Contact Us Button (Transparent Background) */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        onOpenSecondarySite={() => setSecondaryModalOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            currency={currency}
            onSearch={handleSearch}
            onOpenSecondarySite={() => setSecondaryModalOpen(true)}
            onExploreOffPlan={scrollToProjectsOnHome}
            filteredProjects={filteredProjects}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigateContact={() => handleNavigate('contact')}
            onNavigateDevelopers={() => handleNavigate('developers')}
          />
        )}

        {activePage === 'offplan' && (
          <OffPlanPage
            currency={currency}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'mortgage' && (
          <MortgagePage
            currency={currency}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'developers' && (
          <DevelopersPage
            onNavigateOffPlan={() => handleNavigate('offplan')}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigateContact={() => handleNavigate('contact')}
            onOpenSecondaryModal={() => setSecondaryModalOpen(true)}
          />
        )}

        {activePage === 'blogs' && <BlogsPage />}

        {activePage === 'careers' && (
          <CareersPage
            initialJobSlug={careerSlug}
            onJobSelect={handleJobSelect}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onOpenSecondarySite={() => setSecondaryModalOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* 10-Second Secondary Market Notification Modal (SQFT DXB) */}
      <SecondaryMarketPopup
        onOpenSecondarySite={() => setSecondaryModalOpen(true)}
      />

      {/* Secondary Market Dedicated Modal */}
      <SecondaryMarketModal
        isOpen={secondaryModalOpen}
        onClose={() => setSecondaryModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
