import React, { useState } from 'react';
import { OffPlanProject } from '../data/realEstateData';
import { ArrowUpRight, Calendar, Percent, Download } from 'lucide-react';
import { PropertyDetailModal } from './PropertyDetailModal';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsGridProps {
  projects: OffPlanProject[];
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
  onSelectProjectForAdvisory?: (project: OffPlanProject) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  currency,
  onSelectProjectForAdvisory,
}) => {
  const { t } = useLanguage();
  const [activeModalProject, setActiveModalProject] = useState<OffPlanProject | null>(null);

  // Exchange rates relative to AED
  const formatPrice = (priceAED: number) => {
    switch (currency) {
      case 'USD':
        return `$${(priceAED / 3.6725).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'EUR':
        return `€${(priceAED / 3.98).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      case 'GBP':
        return `£${(priceAED / 4.65).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
      default:
        return `AED ${priceAED.toLocaleString()}`;
    }
  };

  return (
    <section id="off-plan-projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#D4AF37]/30 text-[#A6833D] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              {t.projects.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] font-caughe tracking-tight">
              {t.projects.title}
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2 max-w-2xl font-light">
              {t.projects.subtitle}
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-neutral-100 px-3.5 py-2 rounded-xl shrink-0 self-start md:self-auto">
            {t.projects.showing} <span className="text-[#0F172A] font-bold">{projects.length}</span> {t.projects.verifiedProjects}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(212,175,55,0.12)] hover:border-[#D4AF37]/50 transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Zoom Effect */}
              <div
                onClick={() => setActiveModalProject(project)}
                className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge Top Left */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-[#ECC86A] text-[10px] font-bold tracking-wider uppercase">
                    {project.badge}
                  </span>
                </div>

                {/* Developer Tag Top Right */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-[#0F172A] text-[11px] font-extrabold tracking-wide uppercase">
                    {project.developer}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-amber-300 uppercase tracking-wider block">
                      {project.enclave}
                    </span>
                    <h3 className="text-xl font-bold text-white font-serif-luxury leading-tight group-hover:text-[#ECC86A] transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-300 uppercase tracking-wider block">
                      {t.projects.starting}
                    </span>
                    <span className="text-lg font-bold text-white tracking-tight">
                      {formatPrice(project.priceAED)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Specifications Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-neutral-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">
                        {t.projects.handover}
                      </span>
                      <span className="font-semibold text-slate-800">{project.handover}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-600">
                    <Percent className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <div>
                      <span className="block text-[10px] uppercase text-slate-400">
                        {t.projects.paymentPlan}
                      </span>
                      <span className="font-semibold text-slate-800">{project.paymentPlan}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions - "Learn More" button as requested by user */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs tracking-wider uppercase shadow-sm hover:brightness-105 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t.projects.learnMore}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="p-3.5 rounded-xl border border-neutral-200 hover:border-neutral-900 text-slate-700 hover:text-slate-900 transition-colors"
                    title={t.projects.requestBrochure}
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Property Detail Modal with Download Brochure flow */}
      <PropertyDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        currency={currency}
      />
    </section>
  );
};
