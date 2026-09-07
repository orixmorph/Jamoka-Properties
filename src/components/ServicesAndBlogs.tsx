import React, { useState } from 'react';
import { JAMOKA_SERVICES, REAL_ESTATE_BLOGS, RealEstateArticle } from '../data/mockData';

interface ServicesAndBlogsProps {
  onInquireService: (serviceName: string) => void;
}

export const ServicesAndBlogs: React.FC<ServicesAndBlogsProps> = ({
  onInquireService,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<RealEstateArticle | null>(null);

  return (
    <>
      {/* Services Section */}
      <section id="services" className="py-24 bg-[#FAF9F6] border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2.5 h-0.5 bg-[#D4AF37]"></span>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.24em]">
                CLIENT FIDUCIARY SERVICES
              </span>
              <span className="w-2.5 h-0.5 bg-[#D4AF37]"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#0F172A] tracking-tight">
              Bespoke Off-Plan Advisory
            </h2>
            <p className="text-sm text-neutral-500 mt-3">
              Comprehensive institutional stewardship safeguarding your acquisition from reservation to final title deed issuance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {JAMOKA_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white p-6 rounded-2xl border border-neutral-200/90 hover:border-[#D4AF37]/70 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] text-[#D4AF37] flex items-center justify-center mb-5 border border-[#D4AF37]/30">
                    <span className="material-symbols-outlined text-[24px]">
                      {srv.icon}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-[#D4AF37] tracking-[0.16em] uppercase block mb-1">
                    {srv.tag}
                  </span>

                  <h3 className="text-lg font-bold font-serif-luxury text-[#0F172A] mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-neutral-100 text-neutral-700 text-xs">
                    {srv.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-[14px] text-[#D4AF37] shrink-0 mt-0.5">
                          done
                        </span>
                        <span className="text-[11px]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100">
                  <button
                    onClick={() => onInquireService(srv.title)}
                    className="w-full py-2 px-3 rounded-lg bg-neutral-50 hover:bg-[#0F172A] text-neutral-700 hover:text-white border border-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Consult Advisor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs / Market Briefings Section */}
      <section id="blogs" className="py-24 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-0.5 bg-[#D4AF37]"></span>
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.24em]">
                  MARKET BRIEFINGS & RESEARCH
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#0F172A] tracking-tight">
                Dubai Real Estate Intelligence
              </h2>
              <p className="text-sm text-neutral-500 mt-2 max-w-xl">
                Critical legal, financial, and master-planning analysis authored by Jamoka advisory partners.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REAL_ESTATE_BLOGS.map((article) => (
              <article
                key={article.id}
                className="bg-[#FAF9F6] rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#D4AF37]/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0F19]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border border-white/20">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-semibold mb-2">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold font-serif-luxury text-[#0F172A] group-hover:text-[#D4AF37] transition-colors leading-snug mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200/80 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-neutral-500">
                      {article.author}
                    </span>
                    <span className="font-bold text-[#D4AF37] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Read Briefing →
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative h-52 w-full overflow-hidden shrink-0">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
                  {selectedArticle.category} • {selectedArticle.date}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif-luxury text-white">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-neutral-700 text-sm leading-relaxed">
              <p className="font-semibold text-neutral-900 border-l-2 border-[#D4AF37] pl-3 italic">
                {selectedArticle.summary}
              </p>
              <p>
                Dubai continues to position itself as the undisputed capital for institutional and high-net-worth real estate capital. With zero personal income tax, zero capital gains tax, and the robust protection of Dubai Real Estate Regulatory Authority (RERA) Law No. 8, off-plan property has matured into a globally benchmarked asset class.
              </p>
              <p>
                Crucially, all buyer funds are deposited directly into government-monitored escrow accounts, with releases to developers strictly tied to audited construction milestones verified by third-party civil engineering surveyors.
              </p>
              <p>
                For international investors seeking to deploy USD or EUR liquidity, favorable foreign exchange pegging (3.6725 AED/USD) guarantees absolute capital stability alongside projected annual capital appreciation rates exceeding 8-12% in prime waterfront corridors.
              </p>
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 mt-4">
                <span className="text-xs font-bold text-[#0F172A] block uppercase tracking-wider mb-1">
                  Private Briefing Author:
                </span>
                <span className="text-xs text-neutral-600 block">{selectedArticle.author}</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">Jamoka Properties Fiduciary Research Desk</span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold uppercase tracking-wider"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
