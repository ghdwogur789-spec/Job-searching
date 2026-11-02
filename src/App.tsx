import React from 'react';
import { MobilityProvider, useMobility } from './context/MobilityContext';
import { Header, Footer } from './components/layout/Header';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { AIRecommendationsView } from './components/recommendations/AIRecommendationsView';
import { CalendarView } from './components/calendar/CalendarView';
import { CompanyIntelligenceView } from './components/companies/CompanyIntelligenceView';
import { IndustryNewsView } from './components/news/IndustryNewsView';
import { JobExplorationView } from './components/roles/JobExplorationView';
import { AICoachView } from './components/coach/AICoachView';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { RoadmapView } from './components/roadmap/RoadmapView';
import { Search, X, Sparkles, Building2, Briefcase, Newspaper } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeMenu,
    setActiveMenu,
    globalSearchQuery,
    setGlobalSearchQuery,
    jobPostings,
    companies,
    news,
    jobRoles,
    setSelectedJobForModal,
    setSelectedCompanyForModal,
    setSelectedNewsForModal
  } = useMobility();

  // Search Results if search query is active
  const isSearching = Boolean(globalSearchQuery.trim());
  const searchResults = isSearching
    ? {
        jobs: jobPostings.filter(
          j =>
            j.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            j.companyName.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            j.role.toLowerCase().includes(globalSearchQuery.toLowerCase())
        ),
        companies: companies.filter(
          c =>
            c.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            c.mainProducts.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            c.category.toLowerCase().includes(globalSearchQuery.toLowerCase())
        ),
        news: news.filter(
          n =>
            n.title.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            n.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())
        ),
        roles: jobRoles.filter(
          r =>
            r.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) ||
            r.summary.toLowerCase().includes(globalSearchQuery.toLowerCase())
        )
      }
    : null;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      <Header />

      {/* Global Search Results Overlay/View */}
      {isSearching && searchResults && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-6">
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  '{globalSearchQuery}' 통합 검색 결과
                </h3>
              </div>
              <button
                onClick={() => setGlobalSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold p-1 cursor-pointer flex items-center gap-1"
              >
                검색 닫기 <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              {/* Jobs */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  채용공고 ({searchResults.jobs.length})
                </h4>
                {searchResults.jobs.length === 0 ? (
                  <p className="text-slate-400">일치하는 채용공고 없음</p>
                ) : (
                  searchResults.jobs.map(j => (
                    <div
                      key={j.id}
                      onClick={() => {
                        setSelectedJobForModal(j);
                        setActiveMenu(1);
                        setGlobalSearchQuery('');
                      }}
                      className="p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/20 cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-slate-900 block">{j.companyName}</span>
                      <p className="text-slate-700 font-medium line-clamp-1">{j.title}</p>
                      <span className="text-[10px] text-blue-600 font-semibold">직무: {j.role}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Companies */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-600" />
                  기업 정보 ({searchResults.companies.length})
                </h4>
                {searchResults.companies.length === 0 ? (
                  <p className="text-slate-400">일치하는 기업 없음</p>
                ) : (
                  searchResults.companies.map(c => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedCompanyForModal(c);
                        setActiveMenu(3);
                        setGlobalSearchQuery('');
                      }}
                      className="p-3 rounded-xl border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/20 cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-slate-900 block">{c.name}</span>
                      <p className="text-slate-600 line-clamp-1">{c.businessFocus}</p>
                      <span className="text-[10px] text-slate-400">매출: {c.revenue}</span>
                    </div>
                  ))
                )}
              </div>

              {/* News */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Newspaper className="w-4 h-4 text-emerald-600" />
                  산업 뉴스 ({searchResults.news.length})
                </h4>
                {searchResults.news.length === 0 ? (
                  <p className="text-slate-400">일치하는 뉴스 없음</p>
                ) : (
                  searchResults.news.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setSelectedNewsForModal(n);
                        setActiveMenu(4);
                        setGlobalSearchQuery('');
                      }}
                      className="p-3 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/20 cursor-pointer transition-colors"
                    >
                      <span className="font-bold text-slate-900 block line-clamp-1">{n.title}</span>
                      <p className="text-slate-500 text-[11px] mt-0.5">{n.source} | {n.publishedDate}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 w-full py-8">
        {activeMenu === 0 && <MainDashboard />}
        {activeMenu === 1 && <AIRecommendationsView />}
        {activeMenu === 2 && <CalendarView />}
        {activeMenu === 3 && <CompanyIntelligenceView />}
        {activeMenu === 4 && <IndustryNewsView />}
        {activeMenu === 5 && <JobExplorationView />}
        {activeMenu === 6 && <AICoachView />}
        {activeMenu === 7 && <PortfolioView />}
        {activeMenu === 8 && <RoadmapView />}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <MobilityProvider>
      <AppContent />
    </MobilityProvider>
  );
}
