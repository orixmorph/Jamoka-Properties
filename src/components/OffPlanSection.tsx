import React, { useState, useMemo } from 'react';
import { OFF_PLAN_PROPERTIES, OffPlanProperty } from '../data/mockData';

interface OffPlanSectionProps {
  searchQuery: string;
  onSelectProperty: (property: OffPlanProperty) => void;
  onOpenMortgage: (price: number) => void;
}

export const OffPlanSection: React.FC<OffPlanSectionProps> = ({
  searchQuery,
  onSelectProperty,
  onOpenMortgage,
}) => {
  const [selectedEnclave, setSelectedEnclave] = useState<string>('all');
  const [selectedHandover, setSelectedHandover] = useState<string>('all');
  const [priceSort, setPriceSort] = useState<'default' | 'asc' | 'desc'>('default');

  const enclaves = ['all', 'Palm Jumeirah', 'Downtown Dubai', 'Dubai Marina', 'Dubai Water Canal', 'Dubai Harbour'];

  const filteredProperties = useMemo(() => {
    return OFF_PLAN_PROPERTIES.filter((item) => {
      // Enclave filter
      if (selectedEnclave !== 'all' && item.enclave !== selectedEnclave) {
        return false;
      }
      // Handover filter
      if (selectedHandover !== 'all' && !item.handover.includes(selectedHandover)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDev = item.developer.toLowerCase().includes(q);
        const matchesEnclave = item.enclave.toLowerCase().includes(q);
        const matchesUnits = item.units.toLowerCase().includes(q);
        if (!matchesName && !matchesDev && !matchesEnclave && !matchesUnits) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'default') return 0;
      const numA = parseInt(a.priceAed.replace(/[^0-9]/g, ''), 10);
      const numB = parseInt(b.priceAed.replace(/[^0-9]/g, ''), 10);
      return priceSort === 'asc' ? numA - numB : numB - numA;
    });
  }, [selectedEnclave, selectedHandover, searchQuery, priceSort]);

  return (
    <section id="off-plan" className="py-24 bg-[#FFFFFF] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#CFA55A]"></span>
              <span className="text-[11px] font-bold text-[#CFA55A] uppercase tracking-[0.24em]">
                CURRENT ALLOCATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#0F172A] tracking-tight">
              Curated Off-Plan Developments
            </h2>
            <p className="text-sm text-neutral-500 mt-2 max-w-xl">
              Strictly verified against Dubai Land Department (DLD) escrow reserves and master developer construction track records.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-full bg-[#FAF9F6] border border-neutral-200 text-xs font-bold text-neutral-700">
              {filteredProperties.length} Verified Projects Available
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-neutral-200/90 mb-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Enclave Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 mr-1">
                Enclave:
              </span>
              {enclaves.map((enc) => (
                <button
                  key={enc}
                  onClick={() => setSelectedEnclave(enc)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedEnclave === enc
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:text-neutral-900 border border-neutral-200/80'
                  }`}
                >
                  {enc === 'all' ? 'All Dubai' : enc}
                </button>
              ))}
            </div>

            {/* Handover & Sort */}
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Delivery:
                </span>
                <select
                  value={selectedHandover}
                  onChange={(e) => setSelectedHandover(e.target.value)}
                  className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#CFA55A]"
                >
                  <option value="all">All Timelines</option>
                  <option value="2026">2026 Ready</option>
                  <option value="2027">2027 Delivery</option>
                  <option value="2028">2028 Horizon</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Sort:
                </span>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-neutral-700 focus:outline-none focus:border-[#CFA55A]"
                >
                  <option value="default">Curated Featured</option>
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-200">
            <span className="material-symbols-outlined text-[48px] text-neutral-400 mb-2">
              apartment
            </span>
            <h3 className="text-lg font-bold text-neutral-700">No properties matched your criteria</h3>
            <p className="text-xs text-neutral-500 mt-1">Try clearing filters or resetting the search term.</p>
            <button
              onClick={() => {
                setSelectedEnclave('all');
                setSelectedHandover('all');
              }}
              className="mt-4 px-4 py-2 bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => {
              const priceNumber = parseInt(prop.priceAed.replace(/[^0-9]/g, ''), 10) || 3000000;
              return (
                <div
                  key={prop.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/90 hover:border-[#CFA55A]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  {/* Image Container with Zoom-In Hover Effect */}
                  <div className="relative h-64 overflow-hidden bg-neutral-100">
                    <img
                      src={prop.image}
                      alt={prop.name}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Developer Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#0B0F19]/90 backdrop-blur-xs text-white text-[10px] font-extrabold tracking-[0.14em] uppercase border border-white/20">
                        {prop.developer}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#CFA55A] text-[#0F172A] text-[9px] font-bold tracking-wider uppercase">
                        {prop.tag}
                      </span>
                    </div>

                    {/* Handover Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#0F172A] text-[10px] font-bold tracking-wide uppercase shadow-xs">
                        {prop.handover}
                      </span>
                    </div>

                    {/* Overlay Title & Enclave */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-semibold text-[#CFA55A] tracking-wider uppercase block">
                        {prop.enclave}
                      </span>
                      <h3 className="text-xl font-bold font-serif-luxury leading-tight text-white group-hover:text-[#CFA55A] transition-colors">
                        {prop.name}
                      </h3>
                      <span className="text-xs text-neutral-300 block mt-0.5">
                        {prop.units}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                      {prop.description}
                    </p>

                    {/* Payment Plan Milestone Pills */}
                    <div className="p-3 bg-[#FAF9F6] rounded-xl border border-neutral-200/80">
                      <div className="flex justify-between items-center text-[10px] text-neutral-500 uppercase font-bold tracking-wider mb-1.5">
                        <span>Payment Milestone Structure</span>
                        <span className="text-[#0F172A] font-extrabold">{prop.paymentPlan}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                        <div className="bg-white py-1 rounded border border-neutral-100">
                          <span className="text-[9px] text-neutral-400 block uppercase">Booking</span>
                          <span className="font-bold text-[#0F172A]">{prop.bookingPercent}</span>
                        </div>
                        <div className="bg-white py-1 rounded border border-neutral-100">
                          <span className="text-[9px] text-neutral-400 block uppercase">Build</span>
                          <span className="font-bold text-[#CFA55A]">{prop.constructionPercent}</span>
                        </div>
                        <div className="bg-white py-1 rounded border border-neutral-100">
                          <span className="text-[9px] text-neutral-400 block uppercase">Handover</span>
                          <span className="font-bold text-[#0F172A]">{prop.handoverPercent}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          From
                        </span>
                        <span className="text-lg font-extrabold text-[#0F172A]">
                          {prop.priceAed}
                        </span>
                        <span className="text-[10px] text-neutral-500 block">
                          {prop.priceUsd}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenMortgage(priceNumber)}
                          className="p-2 rounded-lg border border-neutral-200 text-neutral-600 hover:text-[#CFA55A] hover:border-[#CFA55A] transition-all cursor-pointer"
                          title="Calculate Handover Mortgage"
                        >
                          <span className="material-symbols-outlined text-[18px]">calculate</span>
                        </button>
                        <button
                          onClick={() => onSelectProperty(prop)}
                          className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-2xs hover:shadow-md cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
