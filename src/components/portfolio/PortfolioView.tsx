import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { ProjectItem } from '../../types';
import {
  FolderKanban,
  Plus,
  Sparkles,
  Trash2,
  Edit3,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Upload,
  Layers,
  ArrowRight,
  Loader2
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    analyzeProjectAI,
    profile
  } = useMobility();

  const [showAddForm, setShowAddForm] = useState(false);
  const [analyzingProjId, setAnalyzingProjId] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // New Project Form State
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState('2025.03 ~ 2025.10 (8개월)');
  const [role, setRole] = useState('팀장 및 기구/공정 설계 담당 (팀 5명)');
  const [tools, setTools] = useState('CATIA V5, ANSYS, Minitab');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [result, setResult] = useState('');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addProject({
      title,
      period,
      role,
      tools,
      problem,
      solution,
      result
    });
    setShowAddForm(false);
    setTitle('');
    setProblem('');
    setSolution('');
    setResult('');
  };

  const handleRunAIProjectAnalysis = async (p: ProjectItem) => {
    setAnalyzingProjId(p.id);
    await analyzeProjectAI(p.id);
    setAnalyzingProjId(null);
  };

  const handleCopyPortfolioText = () => {
    const text = projects
      .map(
        p => `[${p.title}]\n기간: ${p.period}\n역할: ${p.role}\n사용 툴: ${p.tools}\n문제 해결: ${p.problem}\n해결책: ${p.solution}\n성과: ${p.result}\n`
      )
      .join('\n---\n\n');
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            프로젝트 & 포트폴리오
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {projects.length > 0 && (
            <button
              onClick={handleCopyPortfolioText}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? '복사 완료' : '전체 요약 복사'}</span>
            </button>
          )}

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>새 프로젝트 등록</span>
          </button>
        </div>
      </div>

      {/* ADD PROJECT FORM MODAL/EXPAND */}
      {showAddForm && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blue-200 shadow-lg animate-in fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">새 모빌리티 프로젝트 등록</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              닫기 ✕
            </button>
          </div>

          <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">프로젝트명 *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 친환경 하이브리드 포뮬러 섀시 브래킷 설계 및 조립 공차 최적화"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">프로젝트 기간</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="예: 2025.03 ~ 2025.10 (8개월)"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">본인의 역할 및 담당 파트</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="예: 팀장 및 섀시 기구/공정 설계 담당 (팀 5명)"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">활용 기술 및 소프트웨어 툴</label>
                <input
                  type="text"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="예: CATIA V5, ANSYS Mechanical, 3차원 측정기, Minitab"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">직면한 문제 상황 (Challenge / Problem)</label>
                <textarea
                  rows={2}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="예: 용접 열변형으로 인해 허용 공차(±0.02mm)를 초과하는 0.05mm 유격 발생으로 구동 진동 수치 급증"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">본인의 해결 과정 (Action / Solution)</label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="예: 3차원 측정 데이터 50회를 누적 수집하여 원인을 규명하고, 대각선 4단계 체결 시퀀스 및 방열 지그 전용 설계 적용"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">결과 및 정량적 성과 (Result / Achievement)</label>
                <textarea
                  rows={2}
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="예: 공차 ±0.012mm로 안정화, 실차 주행 진동 수치 35% 저감 및 경진대회 최우수상 수상"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                프로젝트 등록 완료
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Feed */}
      <div className="space-y-6">
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">등록된 프로젝트가 없습니다.</h4>
            <p className="text-xs text-slate-500 mt-1">상단의 '새 프로젝트 등록' 버튼 또는 예시 프로필을 불러오세요.</p>
          </div>
        ) : (
          projects.map((proj, idx) => {
            const isAnalyzing = analyzingProjId === proj.id;
            return (
              <div
                key={proj.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-4 hover:border-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      기간: {proj.period} | 역할: {proj.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRunAIProjectAnalysis(proj)}
                      disabled={isAnalyzing}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>분석 중...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI 역량 & 자소서 불릿 추출</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
                          deleteProject(proj.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Technical Tools */}
                <div className="text-xs flex items-center gap-2">
                  <span className="font-bold text-slate-500">사용 기술/툴:</span>
                  <div className="flex flex-wrap gap-1">
                    {proj.tools.split(',').map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[11px]">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem, Solution, Result Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-slate-900 block">문제 상황 (Challenge)</span>
                    <p className="text-slate-600 leading-relaxed">{proj.problem}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="font-bold text-blue-900 block">해결 과정 (Solution)</span>
                    <p className="text-slate-600 leading-relaxed">{proj.solution}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                    <span className="font-bold text-emerald-900 block">정량적 성과 (Result)</span>
                    <p className="text-emerald-800 leading-relaxed font-medium">{proj.result}</p>
                  </div>
                </div>

                {/* Extracted AI Bullets & Portfolio Presentation Tips */}
                {proj.coverLetterBullets && (
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/40 border border-blue-200 text-xs space-y-3">
                    <div>
                      <span className="font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        이력서 / 자기소개서용 추천 불릿 포인트:
                      </span>
                      <ul className="space-y-1 text-slate-800">
                        {proj.coverLetterBullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span className="font-medium">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {proj.portfolioTips && (
                      <div className="pt-2 border-t border-blue-200/60">
                        <span className="font-bold text-slate-700 block mb-1">포트폴리오 시각화 팁:</span>
                        <p className="text-slate-600">{proj.portfolioTips.join(' ')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
