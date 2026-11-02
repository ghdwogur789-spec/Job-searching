import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { CoverLetterDoc, MockInterviewTurn } from '../../types';
import {
  Sparkles,
  FileText,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  RotateCcw,
  Building2,
  Briefcase,
  Layers,
  Sparkle,
  Loader2,
  Trash2,
  BookOpen,
  Award
} from 'lucide-react';

export const AICoachView: React.FC = () => {
  const {
    profile,
    jobPostings,
    coverLetters,
    saveCoverLetter,
    deleteCoverLetter,
    coachCoverLetterAI,
    mockInterviewHistory,
    addMockInterviewTurn,
    clearMockInterviewHistory,
    generateInterviewQuestionAI,
    evaluateInterviewAnswerAI
  } = useMobility();

  // Subtabs: 'cover-letter' | 'job-tailored' | 'mock-interview'
  const [subTab, setSubTab] = useState<'cover-letter' | 'job-tailored' | 'mock-interview'>('cover-letter');

  // --- Cover Letter State ---
  const [targetCompany, setTargetCompany] = useState('현대자동차');
  const [targetRole, setTargetRole] = useState('생산기술');
  const [questionText, setQuestionText] = useState(
    '지원 직무와 관련된 본인의 차별화된 경험과 이를 통해 달성한 성과를 구체적으로 기술하시오. (1000자 이내)'
  );
  const [draftText, setDraftText] = useState(profile.coverLetter || '');
  const [isCoaching, setIsCoaching] = useState(false);
  const [coachingResult, setCoachingResult] = useState<any>(null);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // --- Mock Interview State ---
  const [interviewType, setInterviewType] = useState('직무 면접');
  const [interviewCompany, setInterviewCompany] = useState('현대자동차');
  const [interviewRole, setInterviewRole] = useState('생산기술');
  const [currentQuestion, setCurrentQuestion] = useState(
    '양산 라인에서 설계 도면과 실제 가공품 간의 공차 불일치로 조립 불량이 발생한다면 생산기술 엔지니어로서 어떤 절차로 조치하시겠습니까?'
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isGeneratingQ, setIsGeneratingQ] = useState(false);
  const [latestEval, setLatestEval] = useState<any>(null);

  // --- Job Tailored Guide State ---
  const [selectedJobId, setSelectedJobId] = useState<string>(jobPostings[0]?.id || '');
  const selectedJob = jobPostings.find(j => j.id === selectedJobId) || jobPostings[0];

  // Character & Byte Counter
  const charCount = draftText.length;
  const charCountNoSpace = draftText.replace(/\s/g, '').length;
  const byteCount = new TextEncoder().encode(draftText).length;

  const handleRunCoverLetterCoach = async () => {
    if (!draftText.trim()) {
      alert('자기소개서 초안이나 메모를 입력해주세요.');
      return;
    }
    setIsCoaching(true);
    const result = await coachCoverLetterAI({
      question: questionText,
      draft: draftText,
      targetCompany,
      targetRole
    });
    setCoachingResult(result);
    setIsCoaching(false);

    if (result) {
      // Auto-save to library
      const newDoc: CoverLetterDoc = {
        id: `cl-${Date.now()}`,
        targetCompany,
        targetRole,
        question: questionText,
        userDraft: draftText,
        improvedDraft: result.improvedDraft,
        starAnalysis: result.starAnalysis,
        expressionImprovements: result.expressionImprovements,
        companyAlignment: result.companyAlignment,
        strengthsHighlight: result.strengthsHighlight,
        updatedAt: new Date().toLocaleDateString('ko-KR')
      };
      saveCoverLetter(newDoc);
    }
  };

  const handleCopyImprovedText = () => {
    if (coachingResult?.improvedDraft) {
      navigator.clipboard.writeText(coachingResult.improvedDraft);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 2000);
    }
  };

  // Mock Interview Handlers
  const handleGenerateNextQuestion = async () => {
    setIsGeneratingQ(true);
    const res = await generateInterviewQuestionAI({
      questionType: interviewType,
      targetRole: interviewRole,
      targetCompany: interviewCompany
    });
    if (res?.question) {
      setCurrentQuestion(res.question);
      setUserAnswer('');
      setLatestEval(null);
    }
    setIsGeneratingQ(false);
  };

  const handleSubmitInterviewAnswer = async () => {
    if (!userAnswer.trim()) {
      alert('답변을 입력해주세요.');
      return;
    }
    setIsEvaluating(true);
    const evalData = await evaluateInterviewAnswerAI({
      currentQuestion,
      userAnswer,
      targetRole: interviewRole,
      targetCompany: interviewCompany
    });

    setLatestEval(evalData);
    setIsEvaluating(false);

    // Save to history
    const turn: MockInterviewTurn = {
      id: `turn-${Date.now()}`,
      question: currentQuestion,
      questionType: interviewType,
      userAnswer,
      evaluation: evalData,
      createdAt: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };
    addMockInterviewTurn(turn);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            AI 자소서 & 면접 코치
          </h2>
        </div>

        {/* Sub-tab Switcher */}
        <div className="p-1 bg-slate-100 rounded-xl flex w-full md:w-auto text-xs font-bold">
          <button
            onClick={() => setSubTab('cover-letter')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer ${
              subTab === 'cover-letter' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            AI 자소서 첨삭기
          </button>
          <button
            onClick={() => setSubTab('job-tailored')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer ${
              subTab === 'job-tailored' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            공고 맞춤 가이드
          </button>
          <button
            onClick={() => setSubTab('mock-interview')}
            className={`flex-1 md:flex-initial px-4 py-2 rounded-lg transition-all cursor-pointer ${
              subTab === 'mock-interview' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            AI 실전 모의면접
          </button>
        </div>
      </div>

      {/* SUBTAB 1: AI COVER LETTER COACH */}
      {subTab === 'cover-letter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Input & Editor) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>자기소개서 작성 및 첨삭</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  ※ 사용자의 실제 경험 기반 진실성 원칙 준수
                </span>
              </div>

              {/* Target Company & Role */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">지원 기업</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="현대자동차"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">지원 직무</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="생산기술"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Question */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">자기소개서 문항</label>
                <input
                  type="text"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="자기소개서 문항을 입력하세요..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-medium"
                />
              </div>

              {/* Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700">본문 초안 또는 경험 메모</label>
                  <div className="text-[11px] text-slate-400 font-mono">
                    공백포함 <strong>{charCount}</strong>자 | 공백제외 {charCountNoSpace}자 | {byteCount} Byte
                  </div>
                </div>
                <textarea
                  rows={12}
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  placeholder="본인의 프로젝트 경험, 문제 상황, 해결 과정, 정량적 성과를 자유롭게 작성하세요..."
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden leading-relaxed font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setDraftText(profile.coverLetter)}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  프로필 자소서 불러오기
                </button>

                <button
                  onClick={handleRunCoverLetterCoach}
                  disabled={isCoaching}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isCoaching ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>STAR 첨삭 분석 중...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>STAR 기법 AI 첨삭 실행</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (AI Coaching Results) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>AI 첨삭 및 STAR 구조화 결과</span>
                </h3>
                {coachingResult?.improvedDraft && (
                  <button
                    onClick={handleCopyImprovedText}
                    className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedDraft ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedDraft ? '복사 완료!' : '개선문 복사'}
                  </button>
                )}
              </div>

              {!coachingResult ? (
                <div className="py-20 text-center text-slate-400 text-xs">
                  <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
                  <p className="font-semibold text-slate-600">좌측에 초안을 입력하고 AI 첨삭을 실행하세요.</p>
                  <p className="mt-1">STAR(상황-과제-행동-결과) 기법으로 재구성된 완성도 높은 자기소개서가 생성됩니다.</p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  {/* Improved Draft Box */}
                  <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-cyan-300 font-bold">
                      <span>개선된 추천 자기소개서 본문</span>
                      <span className="text-[10px] text-slate-400">
                        {coachingResult.improvedDraft?.length || 0}자
                      </span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap font-sans text-xs text-slate-200">
                      {coachingResult.improvedDraft}
                    </p>
                  </div>

                  {/* STAR Breakdown */}
                  {coachingResult.starAnalysis && (
                    <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2 text-xs">
                      <span className="font-bold text-blue-900 block">STAR 구조화 분석:</span>
                      <div className="grid grid-cols-1 gap-1.5 text-slate-700">
                        <p><strong className="text-blue-700">S (Situation):</strong> {coachingResult.starAnalysis.situation}</p>
                        <p><strong className="text-blue-700">T (Task):</strong> {coachingResult.starAnalysis.task}</p>
                        <p><strong className="text-blue-700">A (Action):</strong> {coachingResult.starAnalysis.action}</p>
                        <p><strong className="text-blue-700">R (Result):</strong> {coachingResult.starAnalysis.result}</p>
                      </div>
                    </div>
                  )}

                  {/* Expression Improvements */}
                  {coachingResult.expressionImprovements && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <span className="font-bold text-slate-900 block">문장 및 표현 개선 포인트:</span>
                      <ul className="space-y-1 text-slate-600">
                        {coachingResult.expressionImprovements.map((imp: string, i: number) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Company Culture Alignment */}
                  {coachingResult.companyAlignment && (
                    <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-900">
                      <span className="font-bold block mb-1">기업 인재상 및 직무 부합성:</span>
                      <p className="leading-relaxed">{coachingResult.companyAlignment}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: JOB TAILORED GUIDE */}
      {subTab === 'job-tailored' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">관심 채용공고 맞춤 자기소개서 작성 가이드</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                지원하고자 하는 공고를 선택하면 요구 역량과 지원자의 경험을 결합한 최적의 자소서 구성안을 제시합니다.
              </p>
            </div>

            {/* Select Job */}
            <select
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              className="text-xs p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-blue-700 cursor-pointer"
            >
              {jobPostings.map(j => (
                <option key={j.id} value={j.id}>
                  [{j.companyName}] {j.title.slice(0, 25)}...
                </option>
              ))}
            </select>
          </div>

          {selectedJob && (
            <div className="space-y-6">
              {/* Job Summary Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{selectedJob.companyName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 font-bold">
                      {selectedJob.role}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1">{selectedJob.title}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                    적합도 {selectedJob.fitScore || 90}%
                  </span>
                </div>
              </div>

              {/* 4 Pillars of Job-Tailored Cover Letter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h4 className="font-bold text-blue-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    공고 핵심 요구 역량과 어필 포인트
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {selectedJob.requirements.replace(/\n/g, ' ')}
                  </p>
                  <div className="mt-3 p-3 rounded-lg bg-blue-50/50 text-blue-900 text-[11px] font-medium">
                    💡 추천 강조점: 3D CAD 정밀 모델링 역량과 치공구 개선을 통한 조립 불량률 저감 성과
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
                  <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    사용자 경험 중 최우선 강조할 프로젝트
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
                    {profile.projects[0]?.title || '친환경 하이브리드 포뮬러 섀시 브래킷 설계 및 조립 공차 0.012mm 최적화'}
                  </p>
                  <div className="mt-3 p-3 rounded-lg bg-emerald-50/50 text-emerald-900 text-[11px] font-medium">
                    💡 추천 연결: 단순 가공이 아닌 3차원 측정 데이터 50회를 분석하여 수립한 표준 체결 시퀀스 사례
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setTargetCompany(selectedJob.companyName);
                    setTargetRole(selectedJob.role);
                    setSubTab('cover-letter');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  이 공고 타겟으로 자소서 첨삭기 이동 →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 3: AI INTERACTIVE MOCK INTERVIEW */}
      {subTab === 'mock-interview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Question & Answer Form) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>실전 1:1 AI 모의 면접</span>
                </h3>

                {/* Interview Settings */}
                <div className="flex items-center gap-2 text-xs">
                  <select
                    value={interviewType}
                    onChange={(e) => setInterviewType(e.target.value)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="직무 면접">직무 면접</option>
                    <option value="전공 면접">전공 기술 면접</option>
                    <option value="인성 면접">기본 인성 면접</option>
                    <option value="기업별 예상 질문">기업별 빈출 질문</option>
                    <option value="산업 이슈 토론">산업 이슈 압박 면접</option>
                  </select>

                  <select
                    value={interviewCompany}
                    onChange={(e) => setInterviewCompany(e.target.value)}
                    className="p-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
                  >
                    <option value="현대자동차">현대자동차</option>
                    <option value="기아">기아</option>
                    <option value="현대모비스">현대모비스</option>
                    <option value="LG에너지솔루션">LG에너지솔루션</option>
                    <option value="HL만도">HL만도</option>
                  </select>
                </div>
              </div>

              {/* Current Question Box */}
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded bg-blue-600 font-bold text-[10px]">
                    면접 질문 ({interviewType})
                  </span>
                  <button
                    onClick={handleGenerateNextQuestion}
                    disabled={isGeneratingQ}
                    className="text-cyan-300 hover:text-white font-semibold text-[11px] underline cursor-pointer"
                  >
                    {isGeneratingQ ? '새 질문 생성 중...' : '다른 질문 받기'}
                  </button>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                  "{currentQuestion}"
                </h4>
              </div>

              {/* User Answer Textarea */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  나의 답변 (실제 면접관에게 말하듯 입력하세요)
                </label>
                <textarea
                  rows={6}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="예: 네, 생산기술 엔지니어로서 라인의 공차 불일치 발생 시 즉각적인 1차 조치와 영구 방지책을 분리하여 대응하겠습니다. 우선 3D 측정 데이터를 통해 불량 범위를 격리한 후..."
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden leading-relaxed font-sans"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setUserAnswer('네, 생산기술 엔지니어로서 조립 공차 불일치 발생 시 임시 조치와 근본 원인 해결로 나누어 대응하겠습니다. 먼저 측정 데이터를 기반으로 0.05mm 유격의 원인을 추적하고, 긴급 방열 지그 보정과 볼트 체결 시퀀스 표준화를 통해 공차를 ±0.012mm로 즉시 안정화하겠습니다.')}
                  className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  예시 답변 채우기
                </button>

                <button
                  onClick={handleSubmitInterviewAnswer}
                  disabled={isEvaluating}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>5대 역량 심층 평가 중...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>답변 제출 및 피드백 받기</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Turn History */}
            {mockInterviewHistory.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                  <span className="font-bold text-slate-700">이전 모의면접 질답 기록 ({mockInterviewHistory.length}회)</span>
                  <button
                    onClick={clearMockInterviewHistory}
                    className="text-red-500 hover:underline text-[11px] cursor-pointer"
                  >
                    기록 비우기
                  </button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {mockInterviewHistory.map(turn => (
                    <div key={turn.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                        <span className="font-semibold text-blue-600">{turn.questionType}</span>
                        <span>{turn.createdAt}</span>
                      </div>
                      <p className="font-bold text-slate-800 line-clamp-1">Q. {turn.question}</p>
                      <p className="text-slate-500 line-clamp-1 mt-0.5">A. {turn.userAnswer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Evaluation & 5-Score Card) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>면접관 5대 역량 평가표</span>
                </h3>
                {latestEval && (
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-xs">
                    종합 {latestEval.totalScore}점
                  </span>
                )}
              </div>

              {!latestEval ? (
                <div className="py-20 text-center text-slate-400 text-xs">
                  <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="font-semibold text-slate-600">답변을 제출하면 5대 항목 평가가 출력됩니다.</p>
                  <p className="mt-1">논리성, 직무 연관성, 구체성, 문제해결력, 전달력 정밀 진단</p>
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  {/* 5-Axis Score Bars */}
                  <div className="space-y-2 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    {[
                      { label: '논리성 (Logic)', score: latestEval.scores?.logic || 88 },
                      { label: '직무 연관성 (Job Relevance)', score: latestEval.scores?.jobRelevance || 92 },
                      { label: '구체성 (Specificity)', score: latestEval.scores?.specificity || 85 },
                      { label: '문제 해결력 (Problem Solving)', score: latestEval.scores?.problemSolving || 90 },
                      { label: '전달력 (Clarity & Delivery)', score: latestEval.scores?.delivery || 86 }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-semibold text-slate-700">{item.label}</span>
                          <span className="font-bold text-blue-600">{item.score}점</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Feedback Text */}
                  <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 text-slate-700 leading-relaxed">
                    <span className="font-bold text-blue-900 block mb-1">총평 피드백:</span>
                    <p>{latestEval.feedback}</p>
                  </div>

                  {/* Positive & Improvement */}
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-emerald-900">
                      <span className="font-bold block mb-1">우수한 점:</span>
                      <ul className="space-y-0.5 text-[11px]">
                        {(latestEval.positivePoints || []).map((p: string, i: number) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 text-amber-900">
                      <span className="font-bold block mb-1">개선할 점:</span>
                      <ul className="space-y-0.5 text-[11px]">
                        {(latestEval.improvementPoints || []).map((p: string, i: number) => (
                          <li key={i}>• {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Follow-up Question */}
                  {latestEval.followUpQuestion && (
                    <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950">
                      <span className="font-bold block mb-1">압박 꼬리 질문 (Follow-up):</span>
                      <p className="font-medium text-xs leading-snug">"{latestEval.followUpQuestion}"</p>
                      <button
                        onClick={() => {
                          setCurrentQuestion(latestEval.followUpQuestion);
                          setUserAnswer('');
                          setLatestEval(null);
                        }}
                        className="mt-2 text-[11px] text-purple-700 font-bold hover:underline cursor-pointer"
                      >
                        이 꼬리 질문으로 모의면접 이어하기 →
                      </button>
                    </div>
                  )}

                  {/* Model Answer Tip */}
                  {latestEval.exemplaryAnswerKey && (
                    <div className="p-3.5 rounded-xl bg-slate-900 text-slate-200">
                      <span className="font-bold text-cyan-300 block mb-1">모범 답변 가이드:</span>
                      <p className="leading-relaxed text-[11px] text-slate-300">{latestEval.exemplaryAnswerKey}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
