import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustStats } from '../components/TrustStats';
import { ProjectsGrid } from '../components/ProjectsGrid';
import { DeveloperWheel } from '../components/DeveloperWheel';
import { ProcessSection } from '../components/ProcessSection';
import { TeamSection } from '../components/TeamSection';
import { BlogsSection } from '../components/BlogsSection';
import { InquiryDesk } from '../components/InquiryDesk';
import { OffPlanProject } from '../data/realEstateData';

interface HomePageProps {
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
  onSearch: (term: string) => void;
  onOpenSecondarySite: () => void;
  onExploreOffPlan: () => void;
  filteredProjects: OffPlanProject[];
  filters: {
    enclave: string;
    paymentPlan: string;
    priceBracket: string;
    completionYear: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onResetFilters: () => void;
  onNavigateContact: () => void;
  cloudVideoUrl?: string;
  cloudLogoUrl?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  currency,
  onSearch,
  onOpenSecondarySite,
  onExploreOffPlan,
  filteredProjects,
  filters,
  onFilterChange,
  onResetFilters,
  onNavigateContact,
  cloudVideoUrl,
  cloudLogoUrl,
}) => {
  return (
    <div className="font-jakarta">
      {/* 1. Hero Section: Loop video in background, scroll fade-out, compact buttons/search, Jakarta typography */}
      <HeroSection
        onSearch={onSearch}
        onOpenSecondarySite={onOpenSecondarySite}
        onExploreOffPlan={onExploreOffPlan}
        cloudVideoUrl={cloudVideoUrl}
        cloudLogoUrl={cloudLogoUrl}
      />

      {/* 2. Trust Metric Strip: Animated Growing Numbers (0 -> Target) */}
      <TrustStats />

      {/* 3. Trusted Partners: Developer Brand Logos only (clean marquee with slots for cloud links) */}
      <DeveloperWheel />

      {/* 4. Iconic Dubai Off-Plan Developments ("Learn More" with Brochure & Booking Modal) */}
      <ProjectsGrid
        projects={filteredProjects}
        currency={currency}
      />

      {/* 5. Four-Step Acquisition Protocol */}
      <ProcessSection />

      {/* 6. Meet The Team Section */}
      <TeamSection onNavigateContact={onNavigateContact} />

      {/* 7. Dubai Real Estate Insights / Blogs */}
      <BlogsSection />

      {/* 8. Official Contact / Inquiry Desk (Friendly tone, Bayswater Tower 8th & 11th floor address) */}
      <InquiryDesk />
    </div>
  );
};
