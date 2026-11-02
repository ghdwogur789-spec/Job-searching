import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Milestone,
  CheckCircle2,
  Circle,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Target,
  RefreshCw,
  Loader2
} from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const {
    roadmap,
    generateRoadmapAI,
    toggleRoadmapItem,
    profile,
    jobPostings,
    coverLetters,
    projects
  } = useMobility();

  const [selectedRole, setSelectedRole] = useState(
    roadmap?.targetRole || profile.targetRoles[0] || '생산기술'
  );
  const [isGenerating, setIsGenerating] = useState(false);

  // Progress Calculation based on actual user actions
  const totalChecklistItems = roadmap?.checklist.length || 5;
  const completedChecklistItems = roadmap?.checklist.filter(c => c.done).length || 1;
  const checklistRate = Math.round((completedChecklistItems / totalChecklistItems) * 100);

  // Profile readiness score
  const hasCoverLetter = Boolean(profile.coverLetter || coverLetters.length > 0);
  const hasProjects = projects.length >= 2;
  const hasApplied = jobPostings.some(j => j.status === '지원 완료');
  const hasSkills = profile.skills.length >= 5;

  const totalPoints =
    (hasCoverLetter ? 25 : 10) +
    (hasProjects ? 30 : 15) +
    (hasApplied ? 25 : 10) +
    (hasSkills ? 20 : 10);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateRoadmapAI(selectedRole);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            역량 로드맵
          </h2>
        </div>

        {/* Target Role Selector & Generate Button */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800"
          >
            <option value="생산기술">생산기술 (Manufacturing Eng)</option>
            <option value="제조기술">제조기술 (Production Eng)</option>
            <option value="품질관리 및 품질보증">품질보증 (QA/QC)</option>
            <option value="기계설계">기계 및 섀시/의장 설계</option>
            <option value="배터리 제조기술">배터리 제조기술</option>
            <option value="자율주행">자율주행 및 차량 전장 SW</option>
            <option value="스마트팩토리">스마트팩토리 및 로봇자동화</option>
          </select>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>생성 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>AI 플랜 갱신</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Readiness Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">전체 취업 준비 완성도</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-blue-600">{totalPoints}%</span>
            <span className="text-xs text-slate-400">/ 100%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${totalPoints}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">자기소개서 작성 현황</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{coverLetters.length + (profile.coverLetter ? 1 : 0)}</span>
            <span className="text-xs text-emerald-600 font-bold">건 준비 완료</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">STAR 기법 적용 완료</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">포트폴리오 프로젝트</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{projects.length}</span>
            <span className="text-xs text-blue-600 font-bold">개 등록됨</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">공차 최적화 & PLC 실습</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-semibold block mb-1">체크리스트 달성률</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-600">{checklistRate}%</span>
            <span className="text-xs text-slate-400">({completedChecklistItems}/{totalChecklistItems})</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full" style={{ width: `${checklistRate}%` }} />
          </div>
        </div>
      </div>

      {/* Main Roadmap & Goals Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Goals & Milestones */}
        <div className="lg:col-span-8 space-y-6">
          {/* Target Gap Diagnosis Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>목표 직무: {roadmap?.targetRole || selectedRole} 역량 진단</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {roadmap?.gapAnalysis ||
                `현재 보유 중인 기계/설계 기초 역량은 우수하나, ${selectedRole} 현장에서 즉시 요구되는 스마트팩토리 PLC 제어와 공정 품질 규격(Cpk, FMEA) 실무 적용 경험이 보완 과제입니다.`}
            </h3>
          </div>

          {/* Weekly Action Goals (4 Weeks) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>주간 집중 실행 과제 (Weekly Goals)</span>
              </h3>
              <span className="text-xs text-slate-400">체크하여 진도율 반영</span>
            </div>

            <div className="space-y-3">
              {(roadmap?.weeklyGoals || [
                { id: 'wg-0', week: '1주차', goal: '현대차 E-FOREST 등 최신 모빌리티 생산기술 공법 및 라인 구조 분석', done: true },
                { id: 'wg-1', week: '2주차', goal: 'PLC 래더 다이어그램 기초 및 센서/액추에이터 인터페이스 제어 실습', done: false },
                { id: 'wg-2', week: '3주차', goal: '미니 캡스톤: 공정 불량률 데이터를 활용한 Cpk 산출 및 가동률 분석 프로젝트', done: false },
                { id: 'wg-3', week: '4주차', goal: '목표 기업별(현대차, 모비스 등) 생산기술 기출 면접 질문 20선 스크립트 작성', done: false }
              ]).map(wg => (
                <div
                  key={wg.id}
                  onClick={() => toggleRoadmapItem('weekly', wg.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    wg.done ? 'bg-blue-50/50 border-blue-200 text-slate-500' : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80 text-slate-800'
                  }`}
                >
                  {wg.done ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                  )}
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-blue-700 mr-2">[{wg.week}]</span>
                    <span className={wg.done ? 'line-through text-slate-400' : 'font-medium'}>
                      {wg.goal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Milestones */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-100">
              <Milestone className="w-4 h-4 text-purple-600" />
              <span>3개월 월간 마일스톤 로드맵</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(roadmap?.monthlyMilestones || [
                { month: '1개월차', title: '직무 핵심 이론 및 기사 자격증 필기/실기 마스터', done: true },
                { month: '2개월차', title: '스마트팩토리/PLC 공정 개선 실전 포트폴리오 1편 완성', done: false },
                { month: '3개월차', title: '타겟 5개사 맞춤형 자기소개서 완성 및 실전 모의면접 통과', done: false }
              ]).map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleRoadmapItem('milestone', m.month)}
                  className={`p-4 rounded-xl border text-xs space-y-2 cursor-pointer transition-all ${
                    m.done ? 'bg-emerald-50/50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{m.month}</span>
                    {m.done && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Certs, Courses, Projects & Checklist */}
        <div className="lg:col-span-4 space-y-6">
          {/* Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Target className="w-4 h-4 text-blue-600" />
              <span>취업 준비 필수 체크리스트</span>
            </h3>

            <div className="space-y-2 text-xs">
              {(roadmap?.checklist || [
                { id: 'chk-1', text: '기본 프로필 및 3D CAD/공학 툴 포트폴리오 등록', done: true },
                { id: 'chk-2', text: '목표 3개 기업(현대차, 모비스 등) 최신 산업 뉴스 스크랩', done: false },
                { id: 'chk-3', text: 'STAR 기법 기반 맞춤형 자기소개서 초안 작성', done: false },
                { id: 'chk-4', text: 'AI 모의면접으로 공차 트러블슈팅 답변 연습', done: false }
              ]).map(c => (
                <div
                  key={c.id}
                  onClick={() => toggleRoadmapItem('checklist', c.id)}
                  className="flex items-start gap-2 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  {c.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" />
                  )}
                  <span className={c.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Certifications & Courses */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                추천 자격증
              </h4>
              <div className="space-y-1.5">
                {(roadmap?.recommendedCertifications || [
                  '일반기계기사 / 생산자동화산업기사',
                  '품질경영기사 (또는 6시그마 GB)',
                  'ADsP (데이터분석 준전문가)',
                  'CATIA / SolidWorks 공식 인증자격'
                ]).map((cert, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 font-medium text-slate-800">
                    • {cert}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                추천 국비 / 기업 연계 교육과정
              </h4>
              <div className="space-y-1.5">
                {(roadmap?.recommendedCourses || [
                  '현대차그룹 H-Mobility 클래스 (미래차 인재양성)',
                  '대한상공회의소 스마트팩토리 PLC 및 로봇 제어',
                  '국가인적자원개발컨소시엄(CHAMP) 부품 공정 실습'
                ]).map((course, i) => (
                  <div key={i} className="p-2 rounded-lg bg-blue-50/50 border border-blue-100 text-blue-950 font-medium">
                    • {course}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-purple-600" />
                추천 프로젝트 주제
              </h4>
              <div className="space-y-1.5">
                {(roadmap?.suggestedProjects || [
                  '컨베이어 및 공압 실린더 연동 스마트 분류 공정 PLC 시뮬레이션',
                  '오픈소스 공정 센서 데이터를 활용한 라인 병목 현상(Bottleneck) 개선'
                ]).map((proj, i) => (
                  <div key={i} className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 leading-snug">
                    💡 {proj}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
