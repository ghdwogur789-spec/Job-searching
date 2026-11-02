import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { Company, CompanyCategory } from '../../types';
import {
  Building2,
  Search,
  Filter,
  Sparkles,
  ExternalLink,
  Briefcase,
  TrendingUp,
  Scale,
  CheckCircle2,
  AlertCircle,
  MapPin,
  DollarSign,
  Layers,
  ArrowUpRight,
  Loader2,
  X
} from 'lucide-react';

export const CompanyIntelligenceView: React.FC = () => {
  const {
    companies,
    jobPostings,
    analyzeCompanyAI,
    profile,
    selectedCompanyForModal,
    setSelectedCompanyForModal,
    setActiveMenu
  } = useMobility();

  const [categoryFilter, setCategoryFilter] = useState<string>('전체');
  const [sizeFilter, setSizeFilter] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [analyzingCompanyId, setAnalyzingCompanyId] = useState<string | null>(null);

  // Comparison State (allow picking up to 3 companies)
  const [compareCompanyIds, setCompareCompanyIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const categories: (string | CompanyCategory)[] = [
    '전체',
    '완성차',
    '자동차 부품',
    '전기차/배터리',
    '자율주행/SW',
    '스마트팩토리/로봇'
  ];

  const filteredCompanies = companies.filter(comp => {
    const matchCat = categoryFilter === '전체' || comp.category === categoryFilter;
    const matchSize = sizeFilter === '전체' || comp.size === sizeFilter;
    const matchSearch =
      !searchQuery ||
      comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.mainProducts.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.businessFocus.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSize && matchSearch;
  });

  const toggleCompare = (comp: Company) => {
    if (compareCompanyIds.includes(comp.id)) {
      setCompareCompanyIds(prev => prev.filter(id => id !== comp.id));
    } else {
      if (compareCompanyIds.length >= 3) {
        alert('기업 비교는 최대 3개 기업까지 가능합니다.');
        return;
      }
      setCompareCompanyIds(prev => [...prev, comp.id]);
    }
  };

  const handleRunAIAnalysis = async (company: Company) => {
    setAnalyzingCompanyId(company.id);
    await analyzeCompanyAI(company.id);
    setAnalyzingCompanyId(null);
  };

  const comparedCompanies = companies.filter(c => compareCompanyIds.includes(c.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            기업 정보 & 분석
          </h2>
        </div>

        {/* Compare Floating Button */}
        {compareCompanyIds.length > 0 && (
          <button
            onClick={() => setShowCompareModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer transition-all animate-bounce"
          >
            <Scale className="w-4 h-4" />
            <span>선택한 {compareCompanyIds.length}개 기업 비교하기</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="기업명, 제품, 기술 검색..."
            className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map(comp => {
          const isCompared = compareCompanyIds.includes(comp.id);
          const compJobs = jobPostings.filter(j => j.companyName === comp.name);
          const isAnalyzing = analyzingCompanyId === comp.id;

          return (
            <div
              key={comp.id}
              className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between ${
                isCompared ? 'border-blue-500 ring-2 ring-blue-500/10' : 'border-slate-200'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs">
                      {comp.name.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {comp.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                          {comp.size}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-1">{comp.name}</h3>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleCompare(comp)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                      isCompared
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title="비교함 담기"
                  >
                    <Scale className="w-4 h-4" />
                  </button>
                </div>

                {/* Locations & Business Focus */}
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex items-start gap-1.5 text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span className="line-clamp-1">{comp.majorPlants}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">주요 제품 & 기술:</span>
                    <p className="line-clamp-2">{comp.mainProducts}</p>
                  </div>
                </div>

                {/* Financial Indicators (DART Source explicitly noted) */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">연간 매출액:</span>
                    <span className="font-bold text-slate-900">{comp.revenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">영업이익:</span>
                    <span className="font-bold text-blue-600">{comp.operatingProfit}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>기준: {comp.financialYear}</span>
                    <span>출처: {comp.financialSource}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  진행 공고: <strong className="text-blue-600">{compJobs.length}건</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <a
                    href={comp.careerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                    title="공식 채용 페이지 바로가기"
                  >
                    <span>채용관</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </a>

                  <button
                    onClick={() => setSelectedCompanyForModal(comp)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    기업 분석
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* COMPANY DETAIL & AI STRATEGY MODAL */}
      {selectedCompanyForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-base shrink-0">
                  {selectedCompanyForModal.name.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-black text-slate-900">{selectedCompanyForModal.name}</h3>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                      {selectedCompanyForModal.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    본사: {selectedCompanyForModal.headquarters}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedCompanyForModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 max-h-[70vh] overflow-y-auto pr-1">
              {/* Financial & Corporate Profile */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-500 block">매출액</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedCompanyForModal.revenue}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">영업이익</span>
                  <span className="font-bold text-blue-600 text-sm">{selectedCompanyForModal.operatingProfit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">기업 규모</span>
                  <span className="font-bold text-slate-800 text-sm">{selectedCompanyForModal.size}</span>
                </div>
                <div className="col-span-2 sm:col-span-3 text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                  기준: {selectedCompanyForModal.financialYear} | 공시 출처: {selectedCompanyForModal.financialSource}
                </div>
              </div>

              {/* Plants & Technology */}
              <div className="space-y-3 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">주요 사업장 및 연구소</h4>
                  <p className="text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    {selectedCompanyForModal.majorPlants}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">최근 사업 및 기술 방향</h4>
                  <p className="text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-100 leading-relaxed">
                    {selectedCompanyForModal.businessFocus}
                  </p>
                </div>
              </div>

              {/* AI Strategic Analysis Block */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Gemini AI 기업 전략 & 취업 심층 분석</h4>
                  </div>
                  <button
                    onClick={() => handleRunAIAnalysis(selectedCompanyForModal)}
                    disabled={analyzingCompanyId === selectedCompanyForModal.id}
                    className="text-xs text-blue-300 hover:text-white font-semibold underline cursor-pointer disabled:opacity-50"
                  >
                    {analyzingCompanyId === selectedCompanyForModal.id ? '분석 중...' : '전략 재분석'}
                  </button>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div>
                    <span className="font-bold text-cyan-300 block mb-0.5">1. 핵심 경쟁력 및 산업 내 위상</span>
                    <p className="leading-relaxed">
                      {selectedCompanyForModal.aiAnalysis?.coreCompetitiveness}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-cyan-300 block mb-0.5">2. 미래 성장 분야 및 모빌리티 전환 전략</span>
                    <p className="leading-relaxed">
                      {selectedCompanyForModal.aiAnalysis?.futureGrowthAreas}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-amber-300 block mb-1">3. 취업 준비 시 주목할 핵심 이슈 & 면접 팁</span>
                    <ul className="space-y-1 text-slate-200">
                      {(selectedCompanyForModal.aiAnalysis?.jobSeekerKeyIssues || []).map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400">•</span>
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Current Job Postings for This Company */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs mb-2 flex items-center justify-between">
                  <span>현재 진행 중인 채용공고</span>
                  <span className="text-blue-600 font-semibold">
                    {jobPostings.filter(j => j.companyName === selectedCompanyForModal.name).length}건
                  </span>
                </h4>
                <div className="space-y-2">
                  {jobPostings
                    .filter(j => j.companyName === selectedCompanyForModal.name)
                    .map(job => (
                      <div
                        key={job.id}
                        className="p-3 rounded-lg border border-slate-200 bg-white flex items-center justify-between text-xs hover:border-blue-300 transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{job.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {job.role} | {job.location} | 마감: {job.deadline}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedCompanyForModal(null);
                            setActiveMenu(1); // Go to job recs
                          }}
                          className="px-3 py-1 rounded bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 cursor-pointer"
                        >
                          공고 보기
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href={selectedCompanyForModal.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-600 hover:text-blue-600 font-medium flex items-center gap-1 cursor-pointer"
                >
                  공식 홈페이지 <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={selectedCompanyForModal.careerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  공식 채용 페이지 <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => setSelectedCompanyForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPANY COMPARISON MODAL (2-3 Companies) */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">모빌리티 기업 심층 비교 (2~3개 사)</h3>
              </div>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="p-3 font-bold text-slate-600 w-28">항목</th>
                    {comparedCompanies.map(c => (
                      <th key={c.id} className="p-3 font-black text-slate-900 text-sm">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">산업 카테고리</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 font-semibold text-slate-800">
                        {c.category} ({c.size})
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">연간 매출액</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 font-bold text-slate-900">
                        {c.revenue}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">영업이익</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 font-bold text-blue-600">
                        {c.operatingProfit}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">주요 사업장</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 text-slate-700">
                        {c.majorPlants}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">핵심 제품 및 기술</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 text-slate-700 leading-relaxed">
                        {c.mainProducts}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">모빌리티 전환 전략</td>
                    {comparedCompanies.map(c => (
                      <td key={c.id} className="p-3 text-slate-700 leading-relaxed">
                        {c.businessFocus}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-slate-500 bg-slate-50/50">채용 직무 연결</td>
                    {comparedCompanies.map(c => {
                      const count = jobPostings.filter(j => j.companyName === c.name).length;
                      return (
                        <td key={c.id} className="p-3">
                          <span className="font-bold text-blue-600">{count}개 공고 진행 중</span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setCompareCompanyIds([])}
                className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
              >
                비교 목록 비우기
              </button>
              <button
                onClick={() => setShowCompareModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
