import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { JobRoleDetail } from '../../types';
import {
  Briefcase,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  BookOpen,
  Award,
  Building2,
  Layers,
  ArrowRight
} from 'lucide-react';

export const JobExplorationView: React.FC = () => {
  const { jobRoles, profile, setActiveMenu, generateRoadmapAI } = useMobility();

  const [selectedRoleId, setSelectedRoleId] = useState<string>(jobRoles[0]?.id || 'role-pe');
  const selectedRole = jobRoles.find(r => r.id === selectedRoleId) || jobRoles[0];

  // User competency comparison
  const userSkillStr = profile.skills.join(' ').toLowerCase();
  const userMajorStr = profile.major.toLowerCase();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            직무 탐색 & 역량 비교
          </h2>
        </div>

        <button
          onClick={() => {
            generateRoadmapAI(selectedRole.name);
            setActiveMenu(8); // Go to Roadmap
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>이 직무 기준 로드맵 생성</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (4 cols): Roles List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            모빌리티 주요 직무 목록 ({jobRoles.length})
          </h3>
          <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
            {jobRoles.map(role => {
              const isSelected = role.id === selectedRoleId;
              return (
                <div
                  key={role.id}
                  onClick={() => setSelectedRoleId(role.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded mb-1 inline-block ${
                        isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {role.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold">{role.name}</h4>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-300'}`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Selected Role In-Depth Details & Competency Comparison */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Competency Gap Comparison Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-cyan-400">나의 보유 역량 VS 목표 직무 요구사항</span>
                <h3 className="text-xl font-black text-white mt-0.5">{selectedRole.name} 적합도 진단</h3>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                지원자: {profile.name || '김모빌'} ({profile.major || '기계/모빌리티'})
              </div>
            </div>

            {/* Visual Skill Meters */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-300 block mb-1">
                직무 핵심 기술 보유 수준 시각화:
              </span>
              {selectedRole.coreSkills.map((sk, idx) => {
                // Determine if user has skill
                const hasSkill =
                  userSkillStr.includes(sk.name.toLowerCase().split(' ')[0]) ||
                  (idx === 0 && profile.skills.length > 0);
                const score = hasSkill ? sk.importance : Math.max(35, sk.importance - 40);

                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{sk.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">{sk.levelDesc}</span>
                        <span
                          className={`font-black text-xs ${
                            hasSkill ? 'text-cyan-400' : 'text-amber-400'
                          }`}
                        >
                          {hasSkill ? '보유/우수' : '보완 필요'} ({score}%)
                        </span>
                      </div>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          hasSkill
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                            : 'bg-gradient-to-r from-amber-500 to-amber-400'
                        }`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User Strengths vs Gaps for this Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/60 text-xs">
                <span className="font-bold text-cyan-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  현재 충족된 역량
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {profile.skills.slice(0, 3).map((sk, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-cyan-400">•</span>
                      <span>{sk}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-1">
                    <span className="text-cyan-400">•</span>
                    <span>{profile.major} 전공 베이스 지식</span>
                  </li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs">
                <span className="font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  집중 보완할 역량
                </span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  <li>• {selectedRole.tools.slice(-2).join(', ')} 실무 적용 경험</li>
                  <li>• {selectedRole.certifications[0]} 취득 또는 이론 학습</li>
                  <li>• 해당 직무 중심 포트폴리오 프로젝트 정리</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Detailed Job Specification Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">직무 개요 & 상세 설명</h3>
              <p className="text-xs text-slate-600 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-100">
                {selectedRole.summary}
              </p>
            </div>

            {/* Major Duties */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                주요 업무 및 담당 과제 (Key Responsibilities)
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {selectedRole.duties.map((duty, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">관련 전공 & 소프트웨어 툴</span>
                <div>
                  <span className="text-slate-500 block text-[11px]">필요 전공:</span>
                  <span className="font-semibold text-slate-800">{selectedRole.requiredMajors.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">주요 프로그램:</span>
                  <span className="font-semibold text-blue-700">{selectedRole.tools.join(', ')}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">자격증 & 우대 경험</span>
                <div>
                  <span className="text-slate-500 block text-[11px]">추천 자격증:</span>
                  <span className="font-semibold text-slate-800">{selectedRole.certifications.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">우대 경험:</span>
                  <span className="font-semibold text-emerald-700">{selectedRole.preferredExperience.join(' / ')}</span>
                </div>
              </div>
            </div>

            {/* Target Companies & Career Path */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
              <div>
                <span className="font-bold text-slate-900 block mb-2">주요 채용 기업</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.targetCompanies.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200 font-medium text-[11px]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-2">직무별 커리어 성장 경로</span>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-700 font-medium">
                  {selectedRole.careerPath.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <span className="px-2 py-1 rounded bg-slate-100 text-slate-800">{step}</span>
                      {idx < selectedRole.careerPath.length - 1 && <span className="text-slate-400">→</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveMenu(1)}
                className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                이 직무의 맞춤 채용공고 보러가기 →
              </button>

              <button
                onClick={() => {
                  generateRoadmapAI(selectedRole.name);
                  setActiveMenu(8);
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                {selectedRole.name} 취업 준비 로드맵 세우기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
