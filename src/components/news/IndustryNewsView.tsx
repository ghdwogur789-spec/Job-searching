import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { IndustryNews } from '../../types';
import {
  Newspaper,
  Sparkles,
  ExternalLink,
  Calendar,
  Building2,
  Briefcase,
  BookOpen,
  HelpCircle,
  TrendingUp,
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';

export const IndustryNewsView: React.FC = () => {
  const {
    news,
    analyzeNewsAI,
    selectedNewsForModal,
    setSelectedNewsForModal,
    setActiveMenu
  } = useMobility();

  const [activeCategory, setActiveCategory] = useState<string>('전체');
  const [analyzingNewsId, setAnalyzingNewsId] = useState<string | null>(null);

  const categories = [
    '전체',
    '스마트팩토리',
    '전기차/배터리',
    'SDV/자율주행',
    '완성차/PBV',
    '자동차 부품',
    '정책/자율주행'
  ];

  const filteredNews = news.filter(item => {
    if (activeCategory === '전체') return true;
    return item.category === activeCategory;
  });

  const handleOpenAnalysisModal = async (item: IndustryNews) => {
    setSelectedNewsForModal(item);
    if (!item.aiAnalysis) {
      setAnalyzingNewsId(item.id);
      await analyzeNewsAI(item.id);
      setAnalyzingNewsId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>모빌리티 최신 동향 & 직무 영향 분석</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            모빌리티 산업 뉴스 및 AI 직무 심층 분석
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            단순 뉴스 브리핑에 그치지 않고, 생산기술·전장·배터리 등 직무별 중요 역량과 실제 면접 예상 질문으로 연결합니다.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-700">기사 검증 원칙:</span> 실제 언론 보도 및 부처 보도자료 기반 출처/일자 표기
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              {/* Card Meta Header */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px]">
                  {item.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.publishedDate}
                </span>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                {item.summary}
              </p>

              {/* Related Companies */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1 text-[11px]">
                <span className="text-slate-400 font-semibold mr-1">관련 기업:</span>
                {item.relatedCompanies.map((c, i) => (
                  <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with AI Career Link */}
            <div className="p-4 bg-slate-50/70 border-t border-slate-100 rounded-b-2xl flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{item.source}</span>

              <button
                onClick={() => handleOpenAnalysisModal(item)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI 직무 영향 & 면접 분석</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DEEP AI CAREER IMPACT ANALYSIS MODAL */}
      {selectedNewsForModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">
                    {selectedNewsForModal.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    게시일: {selectedNewsForModal.publishedDate} | 출처: {selectedNewsForModal.source}
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-snug">
                  {selectedNewsForModal.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedNewsForModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 max-h-[70vh] overflow-y-auto pr-1 text-xs">
              {/* Article Content Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900 block mb-1">기사 핵심 내용 및 원문 발췌:</span>
                <p>{selectedNewsForModal.content}</p>
              </div>

              {/* 7-Point AI Job Impact Breakdown */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-sm font-bold text-white">Gemini AI 모빌리티 취업 연계 심층 분석</h4>
                  </div>
                </div>

                {analyzingNewsId === selectedNewsForModal.id ? (
                  <div className="py-8 text-center text-cyan-300 font-semibold flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>해당 산업 이슈가 채용 직무에 미치는 영향을 분석 중입니다...</span>
                  </div>
                ) : (
                  <div className="space-y-4 text-slate-300 leading-relaxed">
                    {/* 1 & 2: Summary & Industry Impact */}
                    <div>
                      <span className="font-bold text-cyan-300 block mb-0.5">1. 핵심 내용 및 산업에 미치는 영향</span>
                      <p>{selectedNewsForModal.aiAnalysis?.industryImpact}</p>
                    </div>

                    {/* 3 & 4: Related Companies & Target Roles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div>
                        <span className="font-bold text-blue-300 block mb-1">2. 관련 기업 및 사업 분야</span>
                        <div className="flex flex-wrap gap-1">
                          {(selectedNewsForModal.aiAnalysis?.relatedCompanies || []).map((c, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-200 text-[10px]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-cyan-300 block mb-1">3. 관련 채용 직무</span>
                        <div className="flex flex-wrap gap-1">
                          {(selectedNewsForModal.aiAnalysis?.relatedJobRoles || []).map((r, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-200 text-[10px]">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 5: Important Competencies */}
                    <div>
                      <span className="font-bold text-emerald-300 block mb-0.5">4. 해당 직무에서 중요해질 핵심 역량</span>
                      <p>{selectedNewsForModal.aiAnalysis?.importantCompetencies}</p>
                    </div>

                    {/* 6: Study Guide for Candidates */}
                    <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60">
                      <span className="font-bold text-blue-200 flex items-center gap-1.5 mb-1">
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        5. 취업 준비생이 반드시 공부해야 할 기술 및 지식
                      </span>
                      <p className="text-slate-200">{selectedNewsForModal.aiAnalysis?.studyGuide}</p>
                    </div>

                    {/* 7: Expected Interview Questions & Points */}
                    <div>
                      <span className="font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        6. 면접에서 나올 수 있는 예상 질문 & 모범 답변 포인트
                      </span>
                      <div className="space-y-2.5">
                        {(selectedNewsForModal.aiAnalysis?.expectedInterviewQuestions || []).map((iq, i) => (
                          <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                            <p className="font-bold text-white">Q{i + 1}. {iq.question}</p>
                            <p className="text-slate-300 mt-1 pl-2 border-l-2 border-amber-400 text-[11px]">
                              <strong className="text-amber-300">면접관 평가 포인트:</strong> {iq.point}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={selectedNewsForModal.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                언론사 원문 기사 확인
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedNewsForModal(null);
                    setActiveMenu(6); // AI mock interview coach
                  }}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  면접 코치에서 실전 연습
                </button>
                <button
                  onClick={() => setSelectedNewsForModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
