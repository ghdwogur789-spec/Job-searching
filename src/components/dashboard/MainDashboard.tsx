import React from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Sparkles,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  ChevronRight,
  ExternalLink,
  Target,
  Zap,
  BookOpen,
  Award,
  Layers,
  Flame,
  ArrowUpRight
} from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const {
    setActiveMenu,
    profile,
    competencyAnalysis,
    jobPostings,
    companies,
    news,
    calendarEvents,
    setSelectedJobForModal,
    setSelectedCompanyForModal,
    setSelectedNewsForModal,
    loadSampleProfile
  } = useMobility();

  // Stats calculation
  const totalRecommendedJobs = jobPostings.filter(j => (j.fitScore || 0) >= 80).length;
  const bookmarkedJobsCount = jobPostings.filter(j => j.status === '관심 공고' || j.status === '지원 예정').length;
  const appliedJobsCount = jobPostings.filter(j => j.status === '지원 완료' || j.status === '서류 합격' || j.status === '면접 진행').length;

  const today = new Date('2026-11-02');
  const urgentEvents = calendarEvents.filter(evt => {
    const diff = Math.ceil((new Date(evt.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 10;
  });

  const topJobs = [...jobPostings].sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0)).slice(0, 4);
  const featuredCompanies = companies.slice(0, 4);
  const latestNews = news.slice(0, 3);

  const hasProfile = Boolean(profile.name && profile.major);

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      {/* 1. Hero Main Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            나에게 맞는 모빌리티 취업, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">한곳에서</span>
          </h1>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            완성차, 배터리, 전장부품, 스마트팩토리 로봇까지 모빌리티 전 산업의 실제 채용공고와 역량 분석을 제공합니다.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveMenu(1)}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI 맞춤 취업 추천 시작하기</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>
            <button
              onClick={() => setActiveMenu(1)}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4 text-blue-300" />
              <span>채용공고 둘러보기</span>
            </button>

            {!hasProfile && (
              <button
                onClick={loadSampleProfile}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 text-xs font-medium cursor-pointer"
              >
                예시 취준생 프로필로 둘러보기
              </button>
            )}
          </div>
        </div>

        {/* Quick Mobility Tech Tags */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold mr-1">주요 타겟 분야:</span>
          {['현대차·기아 완성차', '현대모비스·HL만도 전장/섀시', 'LG엔솔·삼성SDI 배터리', '포스코퓨처엠 소재', '스마트팩토리·PLC', 'SDV·자율주행'].map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800 text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 2. Personalized Metrics Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveMenu(1)}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">AI 추천 채용공고</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{totalRecommendedJobs}</span>
            <span className="text-xs text-blue-600 font-bold">건 적합도 80%+</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">사용자 보유 역량 일치 기반</p>
        </div>

        <div
          onClick={() => setActiveMenu(3)}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">관심/추천 기업</span>
            <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600 group-hover:scale-110 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{companies.length}</span>
            <span className="text-xs text-cyan-600 font-bold">개 사 분석 완료</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">DART 공시 재무 & 전략 분석</p>
        </div>

        <div
          onClick={() => setActiveMenu(2)}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">지원 현황 관리</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{appliedJobsCount}</span>
            <span className="text-xs text-emerald-600 font-bold">건 접수 완료</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">관심 {bookmarkedJobsCount}건 진행 중</p>
        </div>

        <div
          onClick={() => setActiveMenu(2)}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs hover:border-red-400 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold text-slate-600">마감 임박 일정</span>
            <div className="p-2 rounded-lg bg-red-50 text-red-600 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-red-600">{urgentEvents.length}</span>
            <span className="text-xs text-red-600 font-bold">건 D-10 이내</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">서류 마감 및 인적성 대비</p>
        </div>
      </section>

      {/* 3. User Competency Snapshot Banner */}
      <section className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white rounded-xl p-5 border border-blue-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-blue-900 uppercase">
              {profile.name ? `${profile.name} 님의 모빌리티 역량 프로필` : '나의 모빌리티 역량 요약'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-semibold">
              {profile.major || '전공 정보 미입력'}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {competencyAnalysis
              ? competencyAnalysis.majorCompetency
              : '보유 기술(CATIA, PLC, Python 등)과 캡스톤 프로젝트 경험을 AI로 분석하여 맞춤 직무와 공고를 제안합니다.'}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(profile.skills || []).slice(0, 5).map((sk, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded bg-white border border-blue-200 text-blue-900 text-[11px] font-medium">
                #{sk.split(' ')[0]}
              </span>
            ))}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveMenu(1)}
            className="w-full md:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {competencyAnalysis ? '역량 재분석하기' : 'AI 역량 분석 시작'}
          </button>
          <button
            onClick={() => setActiveMenu(8)}
            className="w-full md:w-auto px-3.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            로드맵 확인
          </button>
        </div>
      </section>

      {/* 4. Two-Column Core Feeds: Recommended Jobs & Urgent Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols): Recommended Job Postings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>나에게 적합한 AI 추천 채용공고</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                전공 적합성, 보유 기술 도구, 프로젝트 경험을 종합 대조한 추천 공고입니다.
              </p>
            </div>
            <button
              onClick={() => setActiveMenu(1)}
              className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              전체 공고 ({jobPostings.length}건) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {topJobs.map(job => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-800 shrink-0">
                      {job.companyName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-700">{job.companyName}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 text-slate-600 font-medium">
                          {job.companyCategory}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-blue-50 text-blue-700 font-medium">
                          {job.employmentType}
                        </span>
                        {job.isVerified ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-300">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                            사실확인 완료
                          </span>
                        ) : job.isSample ? (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                            예시 데이터
                          </span>
                        ) : null}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        직무: <span className="font-semibold text-slate-700">{job.role}</span> | 근무지: {job.location}
                      </p>
                    </div>
                  </div>

                  {/* Fit Score Badge */}
                  <div className="text-right shrink-0">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>적합도 {job.fitScore || 90}%</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">
                      마감: {job.deadline}
                    </div>
                  </div>
                </div>

                {/* Quick Action Footer */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-500">
                    {job.status ? (
                      <span className="font-semibold text-blue-600">상태: {job.status}</span>
                    ) : (
                      <span>관심 공고 미등록</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedJobForModal(job);
                        setActiveMenu(1);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-medium transition-colors cursor-pointer text-xs"
                    >
                      AI 상세 분석 보기
                    </button>
                    <a
                      href={job.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer text-xs flex items-center gap-1"
                    >
                      공식 채용관
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (1 Col): Urgent Recruitment Deadlines & Quick Targets */}
        <div className="space-y-6">
          {/* Urgent Deadlines Widget */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-600" />
                <span>마감 임박 채용 캘린더</span>
              </h3>
              <button
                onClick={() => setActiveMenu(2)}
                className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
              >
                캘린더 보기
              </button>
            </div>

            <div className="space-y-2.5">
              {urgentEvents.slice(0, 4).map(evt => {
                const diff = Math.ceil((new Date(evt.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div
                    key={evt.id}
                    onClick={() => setActiveMenu(2)}
                    className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-100 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 truncate pr-2">
                        {evt.companyName || '취업 일정'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        diff <= 3 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {diff === 0 ? 'D-Day 오늘' : `D-${diff}일`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">{evt.title}</p>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                      <span>{evt.type}</span>
                      <span>{evt.date} {evt.time || ''}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Learning & Career Goals */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-xl p-5 shadow-xs border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">이번 주 취업 준비 목표</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              모빌리티 기업 합격을 위해 이번 주 집중해야 할 로드맵 체크포인트입니다.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 p-2 rounded bg-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-slate-200">현대차 생산기술 공차 최적화 자소서 STAR 재작성</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded bg-white/10">
                <Target className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span className="text-slate-200">LG엔솔 4680 배터리 공정 기술 이슈 분석 확인</span>
              </div>
              <div className="flex items-start gap-2 p-2 rounded bg-white/10">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-slate-200">AI 모의 면접으로 직무 트러블슈팅 답변 2회 연습</span>
              </div>
            </div>

            <button
              onClick={() => setActiveMenu(8)}
              className="mt-4 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer text-center"
            >
              전체 역량 개발 계획 보기
            </button>
          </div>
        </div>
      </div>

      {/* 5. Recommended Mobility Companies Showcase */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>추천 모빌리티 기업 & 재무 분석</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              전자공시시스템(DART) 기준 공시 재무 정보와 Gemini AI의 모빌리티 전략 분석을 제공합니다.
            </p>
          </div>
          <button
            onClick={() => setActiveMenu(3)}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            기업 전체 보기 ({companies.length}개사) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCompanies.map(comp => (
            <div
              key={comp.id}
              onClick={() => {
                setSelectedCompanyForModal(comp);
                setActiveMenu(3);
              }}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {comp.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{comp.size}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {comp.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {comp.businessFocus}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] text-slate-600 flex justify-between">
                  <span>매출액:</span>
                  <span className="font-bold text-slate-800">{comp.revenue}</span>
                </div>
                <div className="text-[11px] text-slate-600 flex justify-between mt-1">
                  <span>영업이익:</span>
                  <span className="font-bold text-blue-600">{comp.operatingProfit}</span>
                </div>
                <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>DART 공시 기준</span>
                  <span className="text-blue-600 font-medium group-hover:underline">분석 상세 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Today's Mobility Industry News & Career Connection */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>산업 뉴스 & 직무 분석</span>
            </h3>
          </div>
          <button
            onClick={() => setActiveMenu(4)}
            className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            뉴스 전체 보기 ({news.length}건) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {latestNews.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedNewsForModal(item);
                setActiveMenu(4);
              }}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold text-[10px]">
                    {item.category}
                  </span>
                  <span>{item.publishedDate}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{item.source}</span>
                <span className="text-blue-600 font-semibold text-xs flex items-center gap-1 group-hover:underline">
                  AI 직무 영향 분석 보기 →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
