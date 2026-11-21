import React, { useState, useMemo, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ProjectsProvider, useProjects } from './context/ProjectsContext';
import { BlogsProvider } from './context/BlogsContext';
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
import { LandingPageView } from './pages/LandingPageView';
import { PrivateInvestmentPage } from './pages/PrivateInvestmentPage';
import { Footer } from './components/Footer';
import { SecondaryMarketPopup } from './components/SecondaryMarketPopup';
import { SecondaryMarketModal } from './components/SecondaryMarketModal';
import { OFF_PLAN_PROJECTS } from './data/realEstateData';
import { trackMetaPixel } from './utils/metaPixel';
import {
  initGlobalAnalytics,
  resetPageEngagementTrackers,
  trackCurrencyChange,
  trackPageView,
  trackSiteSearch,
} from './utils/analytics';
import { stripBasePath, withBasePath } from './utils/basePath';

export interface RouteState {
  page: PageType;
  careerSlug: string | null;
  landingSlug: string | null;
  blogSlug: string | null;
}

const getInitialRoute = (): RouteState => {
  if (typeof window === 'undefined') {
    return { page: 'home', careerSlug: null, landingSlug: null, blogSlug: null };
  }

  // Check query parameters (e.g. ?landing=palm-residences-vip, ?blog=some-slug)
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const queryLp = searchParams.get('landing') || searchParams.get('lp');
    if (queryLp) {
      if (queryLp.toLowerCase() === 'private-investment') {
        return { page: 'private-investment', careerSlug: null, landingSlug: null, blogSlug: null };
      }
      return { page: 'landing', careerSlug: null, landingSlug: queryLp, blogSlug: null };
    }
    const queryBlog = searchParams.get('blog') || searchParams.get('article');
    if (queryBlog) {
      return { page: 'blogs', careerSlug: null, landingSlug: null, blogSlug: queryBlog };
    }
  } catch (e) {
    // Ignore query parsing errors
  }

  // Check both stripped pathname and hash for deployment environments (e.g. GitHub Pages, Vercel, sub-domains)
  const path = stripBasePath(window.location.pathname).toLowerCase();
  const hash = window.location.hash.toLowerCase().replace(/^#/, '');

  const effectivePath = hash ? (hash.startsWith('/') ? hash : `/${hash}`) : path;

  // Dedicated Private Investment landing page route
  if (
    effectivePath.startsWith('/private-investment') ||
    effectivePath.startsWith('/services/private-investment') ||
    effectivePath.startsWith('/landing/private-investment') ||
    effectivePath.startsWith('/lp/private-investment')
  ) {
    return { page: 'private-investment', careerSlug: null, landingSlug: null, blogSlug: null };
  }

  // Hidden campaign landing page routes (e.g. /landing/palm-residences-vip or /lp/downtown-sky)
  if (effectivePath.startsWith('/landing') || effectivePath.startsWith('/lp')) {
    const clean = effectivePath.replace(/^\/(landing|lp)\/?/, '');
    const slug = clean.split(/[?#]/)[0] || 'palm-residences-vip';
    return { page: 'landing', careerSlug: null, landingSlug: slug, blogSlug: null };
  }

  // Blog deep-link route (e.g. /blogs/dubai-golden-visa-2026)
  if (effectivePath.startsWith('/blogs/')) {
    const clean = effectivePath.replace(/^\/blogs\/?/, '');
    const slug = clean.split(/[?#]/)[0];
    if (slug) {
      return { page: 'blogs', careerSlug: null, landingSlug: null, blogSlug: slug };
    }
    return { page: 'blogs', careerSlug: null, landingSlug: null, blogSlug: null };
  }

  if (effectivePath.startsWith('/careers/real-estate-agent')) {
    return { page: 'careers', careerSlug: 'real-estate-agent', landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/careers/social-media-content-creator')) {
    return { page: 'careers', careerSlug: 'social-media-content-creator', landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/careers')) {
    return { page: 'careers', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/about')) {
    return { page: 'about', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/offplan')) {
    return { page: 'offplan', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/mortgage')) {
    return { page: 'mortgage', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/developers')) {
    return { page: 'developers', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/services')) {
    return { page: 'services', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/blogs')) {
    return { page: 'blogs', careerSlug: null, landingSlug: null, blogSlug: null };
  }
  if (effectivePath.startsWith('/contact')) {
    return { page: 'contact', careerSlug: null, landingSlug: null, blogSlug: null };
  }

  return { page: 'home', careerSlug: null, landingSlug: null, blogSlug: null };
};

function MainApp() {
  const { isRTL } = useLanguage();
  const { projects: allProjects } = useProjects();
  const initialRoute = useMemo(() => getInitialRoute(), []);
  const [activePage, setActivePage] = useState<PageType>(initialRoute.page);
  const [careerSlug, setCareerSlug] = useState<string | null>(initialRoute.careerSlug);
  const [landingSlug, setLandingSlug] = useState<string | null>(initialRoute.landingSlug);
  const [blogSlug, setBlogSlug] = useState<string | null>(initialRoute.blogSlug);
  const [currency, setCurrency] = useState<'AED' | 'USD' | 'EUR' | 'GBP'>('AED');
  const [secondaryModalOpen, setSecondaryModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize browser URL on load and popstate
  useEffect(() => {
    const handleLocation = () => {
      const route = getInitialRoute();
      setActivePage(route.page);
      setCareerSlug(route.careerSlug);
      setLandingSlug(route.landingSlug);
      setBlogSlug(route.blogSlug);
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Initialize site-wide GTM / GA4 tracking (all button clicks, scroll depth, section views, form starts, engaged time)
  useEffect(() => {
    initGlobalAnalytics();
  }, []);

  const hasTrackedInitialRouteRef = useRef(false);

  // Track SPA virtual page views & reset per-page scroll/section/time milestones on every route change
  useEffect(() => {
    const slug = blogSlug || careerSlug || landingSlug || undefined;
    const pageName = slug ? `${activePage}:${slug}` : activePage;
    resetPageEngagementTrackers();

    // Skip the very first mount because gtag('config', 'G-9GS16D6FZ2') in index.html
    // already fires the initial page_view immediately on page load.
    if (!hasTrackedInitialRouteRef.current) {
      hasTrackedInitialRouteRef.current = true;
      return;
    }

    trackPageView(pageName, {
      page_section: activePage,
      content_slug: slug,
      currency,
    });
  }, [activePage, blogSlug, careerSlug, landingSlug]);

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
    if (term.trim().length >= 3) {
      trackSiteSearch(term);
    }
  };

  const handleCurrencyChange = (nextCurrency: 'AED' | 'USD' | 'EUR' | 'GBP') => {
    setCurrency(nextCurrency);
    trackCurrencyChange(nextCurrency, 'main_header');
  };

  // Filtered projects for Home page
  const filteredProjects = useMemo(() => {
    return allProjects.filter((proj) => {
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
  }, [allProjects, filters, searchQuery]);

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
      window.history.pushState(null, '', withBasePath('/careers'));
    } else if (page === 'blogs') {
      setBlogSlug(null);
      window.history.pushState(null, '', withBasePath('/blogs'));
    } else if (page === 'home') {
      window.history.pushState(null, '', withBasePath('/'));
    } else {
      window.history.pushState(null, '', withBasePath(`/${page}`));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackMetaPixel('PageView');
  };

  const handleBlogSelect = (slug: string | null) => {
    setBlogSlug(slug);
    setActivePage('blogs');
    if (slug) {
      window.history.pushState(null, '', withBasePath(`/blogs/${slug}`));
    } else {
      window.history.pushState(null, '', withBasePath('/blogs'));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackMetaPixel('PageView');
  };

  const handleJobSelect = (slug: string | null) => {
    setCareerSlug(slug);
    if (slug) {
      window.history.pushState(null, '', withBasePath(`/careers/${slug}`));
    } else {
      window.history.pushState(null, '', withBasePath('/careers'));
    }
    trackMetaPixel('PageView');
  };

  // Fullscreen isolated view for dedicated Private Investment landing page
  if (activePage === 'private-investment') {
    return (
      <PrivateInvestmentPage
        onNavigateMainSite={(targetPage) => handleNavigate(targetPage || 'home')}
      />
    );
  }

  // Fullscreen isolated view for hidden campaign landing pages
  if (activePage === 'landing') {
    return (
      <LandingPageView
        slug={landingSlug || 'palm-residences-vip'}
        onNavigateHome={() => handleNavigate('home')}
      />
    );
  }

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
        onCurrencyChange={handleCurrencyChange}
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
            onNavigateBlog={handleBlogSelect}
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
            onOpenPrivateInvestment={() => handleNavigate('private-investment')}
          />
        )}

        {activePage === 'blogs' && (
          <BlogsPage
            initialBlogSlug={blogSlug}
            onBlogSelect={handleBlogSelect}
          />
        )}

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
      <ProjectsProvider>
        <BlogsProvider>
          <MainApp />
        </BlogsProvider>
      </ProjectsProvider>
    </LanguageProvider>
  );
}
