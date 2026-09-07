import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { OFF_PLAN_PROJECTS, OffPlanProject } from '../data/realEstateData';
import { PropertyDetailModal } from '../components/PropertyDetailModal';
import { Search, RotateCcw, Filter, MapPin, Calendar, Percent, ArrowUpRight, Download, Sparkles, Building2, X } from 'lucide-react';

interface OffPlanPageProps {
  currency: 'AED' | 'USD' | 'EUR' | 'GBP';
  onNavigateContact?: () => void;
}

export const OffPlanPage: React.FC<OffPlanPageProps> = ({ currency }) => {
  const { t, isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnclave, setSelectedEnclave] = useState('All');
  const [selectedDeveloper, setSelectedDeveloper] = useState('All');
  const [selectedHandover, setSelectedHandover] = useState('All');
  const [selectedPriceBracket, setSelectedPriceBracket] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState<OffPlanProject | null>(null);

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

  // Extract unique filter lists
  const enclaves = ['All', ...Array.from(new Set(OFF_PLAN_PROJECTS.map((p) => p.enclave)))];
  const developers = ['All', ...Array.from(new Set(OFF_PLAN_PROJECTS.map((p) => p.developer)))];
  const handovers = ['All', '2026', '2027', '2028'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return OFF_PLAN_PROJECTS.filter((project) => {
      // Search matching
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.developer.toLowerCase().includes(query) ||
        project.enclave.toLowerCase().includes(query) ||
        project.type.toLowerCase().includes(query) ||
        project.bedrooms.toLowerCase().includes(query);

      // Enclave matching
      const matchesEnclave = selectedEnclave === 'All' || project.enclave === selectedEnclave;

      // Developer matching
      const matchesDev = selectedDeveloper === 'All' || project.developer === selectedDeveloper;

      // Handover matching
      const matchesHandover =
        selectedHandover === 'All' || project.handover.includes(selectedHandover);

      // Price bracket matching
      let matchesPrice = true;
      if (selectedPriceBracket === '<3M') matchesPrice = project.priceAED < 3000000;
      else if (selectedPriceBracket === '3M-5M')
        matchesPrice = project.priceAED >= 3000000 && project.priceAED <= 5000000;
      else if (selectedPriceBracket === '>5M') matchesPrice = project.priceAED > 5000000;

      return matchesSearch && matchesEnclave && matchesDev && matchesHandover && matchesPrice;
    });
  }, [searchQuery, selectedEnclave, selectedDeveloper, selectedHandover, selectedPriceBracket]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedEnclave('All');
    setSelectedDeveloper('All');
    setSelectedHandover('All');
    setSelectedPriceBracket('All');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Header Banner */}
      <section className="relative py-20 bg-[#0A0E17] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/90 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4AF37]/40 text-[#ECC86A] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>OFF-PLAN CATALOG</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-luxury text-white mb-3">
            Dubai Off-Plan Developments
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Direct developer allocations with early-tier pricing, RERA Escrow protection, and flexible payment plans.
          </p>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-neutral-200/80 space-y-4">
          {/* Primary Search Input */}
          <div className="relative flex items-center">
            <Search className={`w-5 h-5 text-neutral-400 absolute ${isRTL ? 'right-4' : 'left-4'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by development name, enclave, or developer (e.g. Emaar, Palm Jumeirah)..."
              className={`w-full py-3.5 ${
                isRTL ? 'pr-12 pl-10' : 'pl-12 pr-10'
              } rounded-2xl bg-neutral-50 border border-neutral-200 focus:bg-white focus:border-[#D4AF37] text-sm text-slate-800 outline-none transition-all`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isRTL ? 'left-4' : 'right-4'} p-1 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700`}
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Select Filter Dropdowns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Community
              </label>
              <select
                value={selectedEnclave}
                onChange={(e) => setSelectedEnclave(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-slate-700 bg-white focus:border-[#D4AF37] outline-none"
              >
                {enclaves.map((e) => (
                  <option key={e} value={e}>
                    {e === 'All' ? 'All Communities' : e}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Developer
              </label>
              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-slate-700 bg-white focus:border-[#D4AF37] outline-none"
              >
                {developers.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Developers' : d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Handover Year
              </label>
              <select
                value={selectedHandover}
                onChange={(e) => setSelectedHandover(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-slate-700 bg-white focus:border-[#D4AF37] outline-none"
              >
                {handovers.map((h) => (
                  <option key={h} value={h}>
                    {h === 'All' ? 'All Handover Years' : `Completion ${h}`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Price Budget
              </label>
              <select
                value={selectedPriceBracket}
                onChange={(e) => setSelectedPriceBracket(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-slate-700 bg-white focus:border-[#D4AF37] outline-none"
              >
                <option value="All">All Budgets</option>
                <option value="<3M">Under AED 3 Million</option>
                <option value="3M-5M">AED 3M - AED 5 Million</option>
                <option value=">5M">Ultra-Luxury (AED 5M+)</option>
              </select>
            </div>
          </div>

          {/* Results Counter & Reset */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs text-slate-500">
            <span>
              Showing <strong className="text-slate-900">{filteredProjects.length}</strong> of{' '}
              {OFF_PLAN_PROJECTS.length} verified developments
            </span>
            {(searchQuery ||
              selectedEnclave !== 'All' ||
              selectedDeveloper !== 'All' ||
              selectedHandover !== 'All' ||
              selectedPriceBracket !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-[#A6833D] hover:text-slate-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-neutral-200 p-8">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 font-serif-luxury">
              No matching off-plan developments found
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4 font-light">
              Try adjusting your search criteria or reset filters to view all available allocations.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-[#0F172A] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1E293B]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 hover:border-[#D4AF37]/50 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Image & Badges */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/40 text-[#ECC86A] text-[10px] font-bold tracking-wider uppercase">
                      {project.badge}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-extrabold uppercase shadow-sm">
                      {project.developer}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] text-[#D4AF37] font-semibold flex items-center gap-1 uppercase tracking-wider">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.enclave}
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury mt-0.5 group-hover:text-[#ECC86A] transition-colors">
                      {project.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">
                      {project.bedrooms}
                    </span>

                    {/* Spec Chips */}
                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-neutral-100 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          {t.projects.handover}
                        </span>
                        <span className="font-semibold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#D4AF37]" />
                          {project.handover}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">
                          {t.projects.paymentPlan}
                        </span>
                        <span className="font-semibold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
                          <Percent className="w-3 h-3 text-[#D4AF37]" />
                          {project.paymentPlan}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="pt-3 border-t border-neutral-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">
                          {t.projects.starting}
                        </span>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">
                          {formatPrice(project.priceAED)}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        {project.roi}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBD4B] to-[#C5A059] text-black font-bold text-xs tracking-wider uppercase hover:brightness-105 transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span>{t.projects.learnMore}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className="p-3 rounded-xl border border-neutral-200 hover:border-neutral-900 text-slate-700 hover:text-slate-900 transition-colors"
                        title={t.projects.requestBrochure}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Property Detail Modal */}
      <PropertyDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        currency={currency}
      />
    </div>
  );
};
