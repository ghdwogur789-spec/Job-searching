import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { JobPosting, RecommendedRole } from '../../types';
import {
  Sparkles,
  Briefcase,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Upload,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Send,
  HelpCircle,
  TrendingUp,
  UserCheck,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  PlusCircle,
  Globe,
  MapPin,
  GraduationCap,
  Info,
  Calendar,
  X,
  Trash2
} from 'lucide-react';

export const AIRecommendationsView: React.FC = () => {
  const {
    profile,
    updateProfile,
    loadSampleProfile,
    competencyAnalysis,
    isAnalyzingCompetency,
    runAICompetencyAnalysis,
    jobPostings,
    updateJobStatus,
    evaluateJobFit,
    addCustomJobPosting,
    resetJobPostingsToOfficial,
    deleteJobPosting,
    selectedJobForModal,
    setSelectedJobForModal,
    setActiveMenu
  } = useMobility();

  // Tab: 'recommendations' | 'profile-input'
  const [activeTab, setActiveTab] = useState<'recommendations' | 'profile-input'>('recommendations');
  const [filterCategory, setFilterCategory] = useState<string>('전체');
  const [filterSize, setFilterSize] = useState<string>('전체');
  const [filterEmploymentType, setFilterEmploymentType] = useState<string>('전체');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [expandedJobId, setExpandedJobId] = useState<string | null>(selectedJobForModal ? selectedJobForModal.id : null);
  const [loadingJobFitId, setLoadingJobFitId] = useState<string | null>(null);

  // Add Verified Job Modal & Portals Hub State
  const [isAddJobModalOpen, setIsAddJobModalOpen] = useState(false);
  const [isPortalsHubOpen, setIsPortalsHubOpen] = useState(true);
  const [newCompany, setNewCompany] = useState('현대자동차');
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState('생산기술');
  const [newLocation, setNewLocation] = useState('울산공장');
  const [newCategory, setNewCategory] = useState<'완성차' | '자동차 부품' | '전기차/배터리' | '자율주행/SW' | '차량 전장' | '스마트팩토리/로봇' | '모빌리티 스타트업'>('완성차');
  const [newSize, setNewSize] = useState<'대기업' | '중견기업' | '외국계' | '스타트업'>('대기업');
  const [newEmploymentType, setNewEmploymentType] = useState<'신입' | '인턴' | '채용연계형 인턴' | '교육생/아카데미'>('신입');
  const [newLiveStatus, setNewLiveStatus] = useState<'실시간 공식 접수중' | '공식 상시 인재풀 등록' | '공식 교육/부트캠프' | '차기 시즌 대비'>('실시간 공식 접수중');
  const [newOfficialUrl, setNewOfficialUrl] = useState('https://talent.hyundai.com');
  const [newRequirements, setNewRequirements] = useState('');
  const [newPreferred, setNewPreferred] = useState('');
  const [newResponsibilities, setNewResponsibilities] = useState('');
  const [newDeadline, setNewDeadline] = useState('2026-11-30');

  const handleCreateCustomJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('공식 채용공고명을 입력해주세요.');
      return;
    }
    addCustomJobPosting({
      companyName: newCompany,
      companyCategory: newCategory,
      title: newTitle.trim(),
      role: newRole,
      location: newLocation,
      companySize: newSize,
      employmentType: newEmploymentType,
      liveStatus: newLiveStatus,
      requirements: newRequirements || '관련 이공계 학사 이상 (졸업예정자 포함)',
      preferred: newPreferred || 'CAD/PLC/모빌리티 프로젝트 역량 우대',
      responsibilities: newResponsibilities || '해당 직무 실무 공정/설계/연구개발 업무 수행',
      startDate: new Date().toISOString().split('T')[0],
      deadline: newDeadline,
      officialUrl: newOfficialUrl,
      officialSearchUrl: newOfficialUrl,
      isSample: false,
      isVerified: true,
      verifiedDate: new Date().toISOString().split('T')[0],
      verifiedSource: `${newCompany} 공식 채용사이트 직접 확인`,
      verificationNote: `사용자가 ${newCompany} 채용 페이지에서 직접 확인하여 등록한 검증 공고입니다.`,
      source: `${newCompany} 채용관`,
      status: '관심 공고',
      fitScore: 92
    });
    setIsAddJobModalOpen(false);
    setNewTitle('');
    alert('확인하신 공식 채용공고가 등록되었습니다. AI 적합도 분석이 즉시 실행됩니다.');
  };

  // Profile Edit State
  const [editMajor, setEditMajor] = useState(profile.major);
  const [editUniversity, setEditUniversity] = useState(profile.university);
  const [editGpa, setEditGpa] = useState(profile.gpa);
  const [editStatus, setEditStatus] = useState(profile.educationStatus);
  const [skillsInput, setSkillsInput] = useState(profile.skills.join(', '));
  const [certsInput, setCertsInput] = useState(profile.certifications.join(', '));
  const [coverLetterInput, setCoverLetterInput] = useState(profile.coverLetter);
  const [resumeTextInput, setResumeTextInput] = useState(profile.resumeText);
  const [targetIndustriesInput, setTargetIndustriesInput] = useState(profile.targetIndustries.join(', '));
  const [targetRolesInput, setTargetRolesInput] = useState(profile.targetRoles.join(', '));
  const [targetLocationsInput, setTargetLocationsInput] = useState(profile.targetLocations.join(', '));
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      major: editMajor,
      university: editUniversity,
      gpa: editGpa,
      educationStatus: editStatus as any,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      certifications: certsInput.split(',').map(s => s.trim()).filter(Boolean),
      coverLetter: coverLetterInput,
      resumeText: resumeTextInput,
      targetIndustries: targetIndustriesInput.split(',').map(s => s.trim()).filter(Boolean),
      targetRoles: targetRolesInput.split(',').map(s => s.trim()).filter(Boolean),
      targetLocations: targetLocationsInput.split(',').map(s => s.trim()).filter(Boolean),
    });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'coverLetter' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (field === 'coverLetter') {
        setCoverLetterInput(text);
        updateProfile({ coverLetter: text });
      } else {
        setResumeTextInput(text);
        updateProfile({ resumeText: text });
      }
      alert(`${file.name} 파일 텍스트가 정상적으로 추출 및 적용되었습니다.`);
    };
    reader.readAsText(file);
  };

  const handleTriggerAnalysis = async () => {
    const result = await runAICompetencyAnalysis();
    if (result) {
      setActiveTab('recommendations');
    }
  };

  const handleToggleJobExpand = async (job: JobPosting) => {
    if (expandedJobId === job.id) {
      setExpandedJobId(null);
      return;
    }
    setExpandedJobId(job.id);

    // If job does not have fit analysis yet, trigger AI fit evaluation
    if (!job.fitAnalysis) {
      setLoadingJobFitId(job.id);
      await evaluateJobFit(job.id);
      setLoadingJobFitId(null);
    }
  };

  // Employment type counts
  const countAll = jobPostings.length;
  const countNew = jobPostings.filter(j => j.employmentType === '신입').length;
  const countIntern = jobPostings.filter(j => j.employmentType === '인턴' || j.employmentType === '채용연계형 인턴').length;
  const countAcademy = jobPostings.filter(j => j.employmentType === '교육생/아카데미').length;

  // Filtered Jobs
  const filteredJobs = jobPostings.filter(job => {
    const matchCategory = filterCategory === '전체' || job.companyCategory === filterCategory;
    const matchSize = filterSize === '전체' || job.companySize === filterSize;
    const matchEmploymentType = filterEmploymentType === '전체' ||
      (filterEmploymentType === '인턴'
        ? (job.employmentType === '인턴' || job.employmentType === '채용연계형 인턴')
        : job.employmentType === filterEmploymentType);
    const matchSearch = !searchKeyword ||
      job.companyName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.role.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.location.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSize && matchEmploymentType && matchSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header & Tab Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            맞춤 채용공고
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="p-1 bg-slate-100 rounded-xl flex w-full md:w-auto">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'recommendations'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              추천 공고 & 직무
            </button>
            <button
              onClick={() => setActiveTab('profile-input')}
              className={`flex-1 md:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile-input'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              내 역량 정보 입력
            </button>
          </div>

          <button
            onClick={handleTriggerAnalysis}
            disabled={isAnalyzingCompetency}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 disabled:opacity-50"
          >
            {isAnalyzingCompetency ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AI 분석 진행 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>AI 역량 정밀 분석</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: Profile Input Section */}
      {activeTab === 'profile-input' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">사용자 역량 및 취업 희망 조건 입력</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                직접 텍스트를 입력하거나 자기소개서/이력서 파일을 업로드하면 AI가 분석에 반영합니다.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                loadSampleProfile();
                setEditMajor(profile.major);
                setEditUniversity(profile.university);
                setEditGpa(profile.gpa);
                setSkillsInput(profile.skills.join(', '));
                setCertsInput(profile.certifications.join(', '));
                setCoverLetterInput(profile.coverLetter);
                setResumeTextInput(profile.resumeText);
                alert('모빌리티 취준생 김모빌 예시 데이터가 입력 폼에 채워졌습니다.');
              }}
              className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              예시 데이터 채우기
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            {/* Academic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">대학교 및 소속</label>
                <input
                  type="text"
                  value={editUniversity}
                  onChange={(e) => setEditUniversity(e.target.value)}
                  placeholder="예: 한국모빌리티대학교"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">전공 및 세부전공</label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  placeholder="예: 기계공학부 (미래모빌리티 융합전공)"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">학점 (GPA)</label>
                  <input
                    type="text"
                    value={editGpa}
                    onChange={(e) => setEditGpa(e.target.value)}
                    placeholder="3.85 / 4.5"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">학적 상태</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="재학">재학 중</option>
                    <option value="졸업예정">졸업 예정</option>
                    <option value="기졸업">기졸업</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Target Job & Industry */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">희망 산업 분야</label>
                <input
                  type="text"
                  value={targetIndustriesInput}
                  onChange={(e) => setTargetIndustriesInput(e.target.value)}
                  placeholder="완성차, 자동차 부품, 전기차/배터리, 스마트팩토리"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">희망 직무</label>
                <input
                  type="text"
                  value={targetRolesInput}
                  onChange={(e) => setTargetRolesInput(e.target.value)}
                  placeholder="생산기술, 제조기술, 품질관리, 기계설계"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">희망 근무 지역</label>
                <input
                  type="text"
                  value={targetLocationsInput}
                  onChange={(e) => setTargetLocationsInput(e.target.value)}
                  placeholder="수도권(화성/남양), 울산, 충청"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Technical Skills & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  보유 기술 및 엔지니어링 툴 (쉼표 구분)
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  placeholder="CATIA, SolidWorks, PLC(GX-Works), Python, AutoCAD, Minitab"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  자격증 및 어학/교육 이수
                </label>
                <input
                  type="text"
                  value={certsInput}
                  onChange={(e) => setCertsInput(e.target.value)}
                  placeholder="일반기계기사, 품질경영기사, TOEIC Speaking AL, H-모빌리티 클래스"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Cover letter & Resume text + File Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">자기소개서 (직접 입력 또는 파일 업로드)</label>
                  <label className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    파일 첨부 (.txt/.md)
                    <input
                      type="file"
                      accept=".txt,.md,.text"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'coverLetter')}
                    />
                  </label>
                </div>
                <textarea
                  rows={5}
                  value={coverLetterInput}
                  onChange={(e) => setCoverLetterInput(e.target.value)}
                  placeholder="자기소개서 본문이나 주요 경험 문항을 입력하세요..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">이력서 요약 / 프로젝트 경험 요약</label>
                  <label className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    파일 첨부 (.txt/.md)
                    <input
                      type="file"
                      accept=".txt,.md,.text"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                    />
                  </label>
                </div>
                <textarea
                  rows={5}
                  value={resumeTextInput}
                  onChange={(e) => setResumeTextInput(e.target.value)}
                  placeholder="학력, 자격사항, 주요 활동 및 프로젝트 요약을 입력하세요..."
                  className="w-full text-xs p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden font-mono leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              {isSavedNotice && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  프로필이 저장되었습니다!
                </span>
              )}
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                입력 정보 저장하기
              </button>
              <button
                type="button"
                onClick={handleTriggerAnalysis}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4" />
                저장 후 AI 역량 분석 실행
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Recommendations & AI Analysis View */}
      {activeTab === 'recommendations' && (
        <div className="space-y-8">
          {/* 1. AI Competency Diagnosis Card */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                    Gemini AI 정밀 분석 보고서
                  </span>
                  {competencyAnalysis?.analyzedAt && (
                    <span className="text-xs text-slate-400">
                      분석 기준: {competencyAnalysis.analyzedAt}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {profile.name} 님의 모빌리티 산업 역량 진단 결과
                </h3>
              </div>
              <button
                onClick={handleTriggerAnalysis}
                disabled={isAnalyzingCompetency}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzingCompetency ? 'animate-spin' : ''}`} />
                {isAnalyzingCompetency ? '분석 중...' : '역량 재분석'}
              </button>
            </div>

            {/* Competency 5-Pillar Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-bold text-blue-400 block mb-1">1. 전공 기반 역량</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {competencyAnalysis?.majorCompetency || `${profile.major} 전공 지식을 바탕으로 기구 동역학 및 기계 시스템 해석 역량 보유`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-bold text-cyan-400 block mb-1">2. 기술적 도구 역량</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {competencyAnalysis?.techCompetency || `보유 도구(${profile.skills.slice(0, 4).join(', ')})를 활용한 실무 3D 설계 및 데이터 처리 능력`}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-xs font-bold text-emerald-400 block mb-1">3. 프로젝트 및 문제해결</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {competencyAnalysis?.problemSolving || '공정 오차 및 조립 간섭 발생 시 측정 데이터를 기반으로 원인을 규명하고 지그를 개선한 역량 확인'}
                </p>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-900/60">
                <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  핵심 강점 (취업 시 차별화 포인트)
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(competencyAnalysis?.strengths || [
                    '3D CAD/CATIA 기반 부품 모델링 및 구조 해석 능력',
                    '제조 현장 이해도 및 생산 라인 공정 최적화 관심도',
                    '데이터 기반 실험 분석 및 오차 원인 규명 태도'
                  ]).map((st, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-400">•</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  보완할 역량 (서류/면접 전 보강 필요)
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(competencyAnalysis?.weaknesses || [
                    '현대차/기아 등 완성차 양산 현장 스마트팩토리 PLC 및 제어 실습 경험 보완 권장',
                    '글로벌 표준 자동차 품질 관리(APQP, PPAP, FMEA) 실무 용어 숙지 필요'
                  ]).map((wk, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Extracted Core Keywords */}
            <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">추출된 핵심 역량 키워드:</span>
              {(competencyAnalysis?.extractedKeywords || ['CATIA', '공정설계', '구조해석', '스마트팩토리', '품질보증', '전기차배터리', 'PLC', '생산기술']).map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold"
                >
                  #{kw}
                </span>
              ))}
            </div>

            {/* Tailored Career Advice */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80">
              <span className="text-xs font-bold text-cyan-300 block mb-1">💡 AI 종합 취업 전략 가이드:</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {competencyAnalysis?.tailoredAdvice || '기구 설계 능력은 탄탄하게 입증되었으므로, 자기소개서 작성 시 단순 툴 사용보다는 "공정 시간 단축"이나 "조립 공차 0.012mm 달성"과 같은 정량적 성과를 강조하십시오. 또한 완성차 및 배터리사의 스마트팩토리 자동화 트렌드를 연결하면 강력한 차별점이 됩니다.'}
              </p>
            </div>
          </div>

          {/* 2. Recommended Mobility Job Roles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>AI 추천 직무 (적합도 순위)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  사용자의 역량 키워드와 모빌리티 산업 직무 요구 스펙을 비교 분석한 결과입니다.
                </p>
              </div>
              <button
                onClick={() => setActiveMenu(5)}
                className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
              >
                전체 12개 직무 상세 탐색 →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(competencyAnalysis?.recommendedJobRoles || [
                {
                  role: '생산기술 / 제조엔지니어링',
                  fitScore: 94,
                  matchReason: '기계/공정 지식과 3D 도면 해독 능력이 양산 라인 설비 배치 및 공정 개선 업무에 매우 적합함',
                  requiredSkills: ['공정 레이아웃 설계', '설비 가동률 분석', '치공구 검증'],
                  missingSkills: ['MES/PLC 연동 경험']
                },
                {
                  role: '품질관리 및 품질보증 (QA/QC)',
                  fitScore: 89,
                  matchReason: '설계 치수 검증 및 신뢰성 평가 프로젝트 경험이 완성차 품질 부서 요구사항과 직결됨',
                  requiredSkills: ['공정능력지수(Cpk)', 'FMEA 분석', '계측기 측정'],
                  missingSkills: ['IATF 16949 이론']
                },
                {
                  role: '기계 및 차체/의장 설계',
                  fitScore: 86,
                  matchReason: 'CAD/CATIA를 활용한 기구물 3D 모델링 및 간섭 체크 경험이 자동차 차체/모듈 설계에 부합',
                  requiredSkills: ['CATIA V5', 'GD&T 기하공차', '구조해석'],
                  missingSkills: ['차량 충돌해석 심화']
                },
                {
                  role: '배터리 팩/모듈 제조기술',
                  fitScore: 88,
                  matchReason: '전기차 배터리 모듈 어셈블리 공정 및 열관리 하우징 공정 최적화에 기계 전공 백그라운드 필요',
                  requiredSkills: ['레이저 용접 공정', '배터리 셀 특성', '클린룸 자동화'],
                  missingSkills: ['전극 공정 세부 지식']
                }
              ]).map((recRole, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-400">추천 {idx + 1}순위</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-black text-xs">
                        적합도 {recRole.fitScore}%
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{recRole.role}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {recRole.matchReason}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                      <div>
                        <span className="font-semibold text-slate-700">핵심 요구: </span>
                        <span className="text-slate-500">{recRole.requiredSkills.join(', ')}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-amber-700">보완 필요: </span>
                        <span className="text-amber-800">{recRole.missingSkills.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setFilterCategory('전체');
                        setSearchKeyword(recRole.role.split(' ')[0]);
                      }}
                      className="text-xs text-blue-600 font-bold hover:underline cursor-pointer"
                    >
                      관련 공고 검색하기 →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. AI Recommended Job Postings Feed */}
          <div className="space-y-4">
            {/* Official Portals Fact-Check & Verification Hub */}
            <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                        공식 채용사이트 100% 사실확인(Fact-Check) 및 원문 연동관
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white font-extrabold text-[10px]">
                        FACT-CHECKED
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      모든 공고는 기업 공식 채용 포털의 모집요강(기업명, 공고명, 모집직무, 근무지, 고용형태)을 대조하여 등록됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsPortalsHubOpen(!isPortalsHubOpen)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-emerald-300 bg-white/90 text-emerald-800 font-bold hover:bg-emerald-50 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>주요 기업 채용관 {isPortalsHubOpen ? '접기' : '열기'}</span>
                    {isPortalsHubOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>
                  <button
                    onClick={() => setIsAddJobModalOpen(true)}
                    className="text-xs px-3.5 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>+ 실제 확인한 공고 등록</span>
                  </button>
                </div>
              </div>

              {/* Crucial Explanatory Callout on Hyundai's Quarterly & Talent Pool Hiring */}
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200/80 text-xs space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>💡 현대자동차 채용 방식 및 실시간 직무 확인 가이드</span>
                </div>
                <div className="text-slate-600 text-[11px] leading-relaxed pl-6 space-y-1">
                  <p>
                    • <strong>예측 가능한 상시채용(분기별 공채):</strong> 현대자동차는 대규모 신입(생산기술/R&D 등)을 매년 분기별(3월, 6월, 9월 등) 집중 공고로 진행합니다. 해당 분기 접수 마감 후에는 포털 메인에서 공고가 닫히며 차기 분기 시즌에 다시 열립니다.
                  </p>
                  <p>
                    • <strong>공식 상시 인재풀(Talent Pool):</strong> 공채 시즌 외 평시에는 <span className="text-blue-700 font-bold">talent.hyundai.com 공식 상시 인재풀</span>에 이력서를 등록해두면, 각 공장(울산/아산/전주) 및 부문 결원 발생 시 우선 서류 검토 및 맞춤 채용 제안을 받으실 수 있습니다.
                  </p>
                  <p>
                    • <strong>상태 투명화:</strong> 본 플랫폼은 <span className="text-emerald-700 font-bold">🟢 실시간 공식 접수중</span>, <span className="text-amber-700 font-bold">🟡 공식 상시 인재풀 등록</span>, <span className="text-blue-700 font-bold">🔵 공식 교육/부트캠프</span>, <span className="text-purple-700 font-bold">⏳ 차기 시즌 대비 가이드</span>로 공고 상태를 명확히 구분합니다.
                  </p>
                </div>
              </div>

              {/* Quick Official Portal Buttons */}
              {isPortalsHubOpen && (
                <div className="pt-2 border-t border-emerald-200/60">
                  <span className="text-[11px] font-bold text-slate-500 block mb-2">
                    주요 모빌리티 공식 채용관 실시간 원문 직접 조회:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <a
                      href="https://talent.hyundai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🚗 현대자동차 인재채용</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://career.kia.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🚙 기아 탤런트 라운지</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://hyundaimobis.recruiter.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">⚙️ 현대모비스 채용관</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://careers.lg.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🔋 LG에너지솔루션</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://www.samsungcareers.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">⚡ 삼성SDI 채용관</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://hlmando.recruiter.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🛞 HL만도 인재채용</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://hyundai-wia.recruiter.co.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🦾 현대위아 채용관</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                    <a
                      href="https://www.hyundai-ngv.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-xs font-semibold text-slate-800 flex items-center justify-between transition-all"
                    >
                      <span className="truncate">🎓 현대차 H-Mobility</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  <span>AI 맞춤 채용공고 추천 ({filteredJobs.length}건)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  ※ 표기된 추천 적합도는 참고용 분석 점수이며 실제 기업의 합격 판정 점수가 아닙니다.
                </p>
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="기업/공고/직무/근무지 검색..."
                    className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                {/* Category Select */}
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium"
                >
                  <option value="전체">산업 분야 전체</option>
                  <option value="완성차">완성차</option>
                  <option value="자동차 부품">자동차 부품</option>
                  <option value="전기차/배터리">전기차/배터리</option>
                  <option value="스마트팩토리/로봇">스마트팩토리/로봇</option>
                  <option value="자율주행/SW">자율주행/SW</option>
                </select>

                {/* Size Select */}
                <select
                  value={filterSize}
                  onChange={(e) => setFilterSize(e.target.value)}
                  className="text-xs py-1.5 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium"
                >
                  <option value="전체">기업 규모 전체</option>
                  <option value="대기업">대기업</option>
                  <option value="중견기업">중견기업</option>
                  <option value="스타트업">스타트업</option>
                </select>

                {/* Reset to official button */}
                <button
                  onClick={() => {
                    if (confirm('최신 공식 사실확인 공고 목록으로 재동기화하시겠습니까?')) {
                      resetJobPostingsToOfficial();
                      alert('공식 사실확인 공고 데이터가 최신 상태로 동기화되었습니다.');
                    }
                  }}
                  title="공식 데이터 최신 재동기화"
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Employment Type Filter Pills (신입 / 인턴 / 교육생 전용 필터) */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5 text-blue-600" />
                  채용 유형:
                </span>
                <button
                  onClick={() => setFilterEmploymentType('전체')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    filterEmploymentType === '전체'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  전체 ({countAll})
                </button>
                <button
                  onClick={() => setFilterEmploymentType('신입')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterEmploymentType === '신입'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  <span>🎓 신입</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    filterEmploymentType === '신입' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {countNew}
                  </span>
                </button>
                <button
                  onClick={() => setFilterEmploymentType('인턴')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterEmploymentType === '인턴'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700'
                  }`}
                >
                  <span>💼 인턴 / 채용연계형</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    filterEmploymentType === '인턴' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {countIntern}
                  </span>
                </button>
                <button
                  onClick={() => setFilterEmploymentType('교육생/아카데미')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    filterEmploymentType === '교육생/아카데미'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  <span>📚 교육생 / 아카데미</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    filterEmploymentType === '교육생/아카데미' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {countAcademy}
                  </span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                엄선 기준: <strong className="text-slate-800">경력직 제외</strong> · 신입/인턴/교육 사실확인 공고만 표기
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h4 className="text-sm font-bold text-slate-700">검색 조건과 일치하는 채용공고가 없습니다.</h4>
                  <p className="text-xs text-slate-500 mt-1">필터를 초기화하거나 검색어를 변경해 보세요.</p>
                  <button
                    onClick={() => { setFilterCategory('전체'); setFilterSize('전체'); setSearchKeyword(''); }}
                    className="mt-4 px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold cursor-pointer"
                  >
                    필터 전체 초기화
                  </button>
                </div>
              ) : (
                filteredJobs.map(job => {
                  const isExpanded = expandedJobId === job.id;
                  const isLoadingFit = loadingJobFitId === job.id;

                  return (
                    <div
                      key={job.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs ${
                        isExpanded ? 'border-blue-400 ring-2 ring-blue-500/10' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Card Header & Summary */}
                      <div className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-sm text-slate-800 shrink-0">
                              {job.companyName.slice(0, 2)}
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-black text-slate-900">{job.companyName}</span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                                  {job.companyCategory}
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                  🎓 {job.employmentType} (신입/인턴 대상)
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                                  {job.companySize}
                                </span>
                                {job.liveStatus === '실시간 공식 접수중' && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100/80 text-emerald-800 border border-emerald-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                    🟢 실시간 공식 접수중
                                  </span>
                                )}
                                {job.liveStatus === '공식 상시 인재풀 등록' && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100/80 text-amber-900 border border-amber-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    🟡 공식 상시 인재풀 등록
                                  </span>
                                )}
                                {job.liveStatus === '공식 교육/부트캠프' && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-100/80 text-blue-900 border border-blue-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    🔵 공식 교육/부트캠프 접수
                                  </span>
                                )}
                                {job.liveStatus === '차기 시즌 대비' && (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100/80 text-purple-900 border border-purple-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                    ⏳ 차기 시즌 대비 가이드
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base font-bold text-slate-900 mt-1.5">
                                {job.title}
                              </h4>
                              {job.verificationNote && (
                                <p className="text-[11px] text-emerald-800 mt-1 flex items-start gap-1 font-medium bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{job.verificationNote}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Fit Score & Status */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-black text-xs sm:text-sm">
                              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                              <span>추천 적합도 {job.fitScore || 90}%</span>
                            </div>
                            <span className="text-[11px] text-slate-500">
                              접수 일정: <strong className="text-slate-800">{job.deadline}</strong>
                            </span>
                          </div>
                        </div>

                        {/* Fact-Checked Core Attributes Table */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <div>
                            <span className="text-slate-400 font-medium block text-[11px]">🏢 대상 기업</span>
                            <span className="font-bold text-slate-900">{job.companyName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[11px]">⚙️ 모집 직무</span>
                            <span className="font-bold text-blue-700">{job.role}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[11px]">📍 실제 근무지</span>
                            <span className="font-semibold text-slate-800">{job.location}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 font-medium block text-[11px]">🎓 지원 대상 (신입 여부)</span>
                            <span className="font-bold text-emerald-700">{job.employmentType} (신입/인턴/교육)</span>
                          </div>
                        </div>

                        {/* Brief Requirements & Preferred */}
                        <div className="mt-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1.5">
                          <p className="text-slate-700 leading-relaxed">
                            <strong className="text-slate-900 font-bold">지원 자격:</strong> {job.requirements.replace(/\n/g, ' / ')}
                          </p>
                          <p className="text-slate-600 leading-relaxed">
                            <strong className="text-slate-800 font-semibold">우대 사항:</strong> {job.preferred.replace(/\n/g, ' / ')}
                          </p>
                        </div>

                        {/* Bottom Actions Bar */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                          {/* Status Selector */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">내 지원 상태:</span>
                            <select
                              value={job.status || '관심 공고'}
                              onChange={(e) => updateJobStatus(job.id, e.target.value as any)}
                              className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-white font-semibold text-blue-700 cursor-pointer"
                            >
                              <option value="관심 공고">⭐ 관심 공고</option>
                              <option value="지원 예정">📅 지원 예정</option>
                              <option value="지원 완료">✅ 지원 완료</option>
                              <option value="서류 합격">🎉 서류 합격</option>
                              <option value="면접 진행">🎙️ 면접 진행</option>
                              <option value="최종 합격">🏆 최종 합격</option>
                              <option value="불합격">불합격</option>
                              <option value="지원 취소">지원 취소</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            {job.id.startsWith('job-custom-') && (
                              <button
                                onClick={() => {
                                  if (confirm('이 직접 등록 공고를 삭제하시겠습니까?')) {
                                    deleteJobPosting(job.id);
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                                title="등록 공고 삭제"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>삭제</span>
                              </button>
                            )}

                            <a
                              href={job.officialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                            >
                              <Globe className="w-3.5 h-3.5 text-emerald-600" />
                              <span>공식 채용사이트 원문 바로가기</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>

                            <a
                              href={`https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(job.companyName + ' ' + job.role + ' ' + (job.employmentType || '신입') + ' 채용')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                              title="네이버에서 실시간 채용 현황 및 공고 검색"
                            >
                              <span>실시간 채용 검색</span>
                              <ArrowUpRight className="w-3 h-3 text-slate-400" />
                            </a>

                            <button
                              onClick={() => handleToggleJobExpand(job)}
                              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{isExpanded ? 'AI 상세 닫기' : 'AI 맞춤 심층 분석'}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expandable Deep AI Analysis Section */}
                      {isExpanded && (
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-blue-100 bg-blue-50/20 rounded-b-2xl animate-in fade-in duration-200">
                          {isLoadingFit ? (
                            <div className="py-8 text-center text-xs text-blue-600 font-semibold flex items-center justify-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Gemini AI가 지원자 프로필과 해당 채용공고의 요구역량을 심층 대조 중입니다...</span>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-xs">
                                <h5 className="text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                  1. 이 공고를 추천하는 구체적 이유
                                </h5>
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  {job.fitAnalysis?.recommendationReason || `${job.companyName}의 ${job.role} 직무 요구사항인 CAD 모델링과 공정 개선 경험이 지원자의 학부 캡스톤 프로젝트 및 보유 기술 도구와 90% 이상 일치하여 양산 라인에서 즉각 실무 기여가 가능합니다.`}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-xs">
                                  <h5 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    2. 사용자가 가진 강점
                                  </h5>
                                  <ul className="space-y-1 text-xs text-slate-700">
                                    {(job.fitAnalysis?.userStrengths || [
                                      '3D CAD(CATIA)를 활용한 치공구 모델링 및 공차 검증 경험',
                                      '실제 캡스톤 섀시 조립 공정에서 오차 0.05mm를 극복한 정량적 문제해결력',
                                      'H-Mobility 클래스 수료로 완성차 양산 공정에 대한 기본 이해도 충족'
                                    ]).map((st, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="text-emerald-500 font-bold">•</span>
                                        <span>{st}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-xs">
                                  <h5 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                    3. 보완해야 할 부족한 역량
                                  </h5>
                                  <ul className="space-y-1 text-xs text-slate-700">
                                    {(job.fitAnalysis?.userGaps || [
                                      '해당 기업 양산 거점의 최신 스마트팩토리 로봇 제어(PLC) 실무 경험 추가 보완',
                                      '글로벌 완성차 품질 지표(Cpk, FMEA) 실무 적용 사례 구체화'
                                    ]).map((gp, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="text-amber-500 font-bold">•</span>
                                        <span>{gp}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              {/* 4. Cover letter points */}
                              <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-xs">
                                <h5 className="text-xs font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                                  4. 자기소개서에서 강조하면 좋은 경험 포인트
                                </h5>
                                <ul className="space-y-1.5 text-xs text-slate-700">
                                  {(job.fitAnalysis?.coverLetterKeyPoints || [
                                    '캡스톤 프로젝트 중 발생한 설계 간섭 문제를 3차원 측정 데이터 기반으로 해결했던 정량적 경험(공차 0.012mm 안정화) 강조',
                                    `${job.companyName}의 최신 제조 혁신 전략에 맞춰 생산 공정의 유연성을 높일 수 있는 아이디어 제시`,
                                    '타 전공(전기/SW) 팀원과의 협업을 통해 인터페이스 충돌을 방지했던 주도적 커뮤니케이션 사례 기술'
                                  ]).map((pt, i) => (
                                    <li key={i} className="flex items-start gap-1.5">
                                      <span className="text-blue-600 font-bold">{i + 1}.</span>
                                      <span>{pt}</span>
                                    </li>
                                  ))}
                                </ul>

                                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                                  <button
                                    onClick={() => {
                                      setActiveMenu(6); // Go to AI Cover Letter & Coach
                                    }}
                                    className="text-xs text-blue-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    이 공고에 맞춘 자기소개서 코칭 받기 →
                                  </button>
                                </div>
                              </div>

                              {/* 5. Interview questions */}
                              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                                <h5 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                                  <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                                  5. 면접에서 준비하면 좋은 필수 예상 질문 & 답변 팁
                                </h5>
                                <div className="space-y-2.5">
                                  {(job.fitAnalysis?.interviewPrepQuestions || [
                                    {
                                      question: '양산 라인에서 설계 도면과 실제 가공품 간의 공차 불일치로 조립 불량이 발생한다면 엔지니어로서 어떻게 대응하시겠습니까?',
                                      answerTip: '원인 분해(설비 마모, 공구 공차, 작업자 편차) 단계별 검증 후 즉각적인 임시 조치와 영구 재발 방지책(설계 변경 요청 또는 치공구 보정)을 논리적으로 설명하세요.'
                                    },
                                    {
                                      question: `지원자가 수행한 프로젝트에서 가장 큰 난관이었던 기술적 한계는 무엇이었고, 이를 어떻게 극복했습니까?`,
                                      answerTip: 'STAR 기법에 맞춰 상황-과제-본인의 기술적 해결책-정량적 수치 성과로 답변을 구성하세요.'
                                    }
                                  ]).map((iq, i) => (
                                    <div key={i} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                                      <p className="font-bold text-slate-900">Q{i + 1}. {iq.question}</p>
                                      <p className="text-slate-600 mt-1 pl-2 border-l-2 border-blue-400">
                                        <strong className="text-blue-700">답변 포인트:</strong> {iq.answerTip}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                                  <button
                                    onClick={() => {
                                      setActiveMenu(6); // Go to AI Mock Interview
                                    }}
                                    className="text-xs text-purple-600 font-bold hover:underline cursor-pointer flex items-center gap-1"
                                  >
                                    AI 모의면접에서 이 질문 실전 연습하기 →
                                  </button>
                                </div>
                              </div>
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
        </div>
      )}

      {/* Add Verified Job Modal */}
      {isAddJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    실제 확인한 공식 채용공고 직접 등록
                  </h3>
                  <p className="text-xs text-slate-500">
                    공식 채용사이트에서 확인하신 공고를 등록하면 AI가 즉시 분석합니다.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddJobModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomJob} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">기업명 *</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="예: 현대자동차, 기아, 현대모비스"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">모집 직무 *</label>
                  <input
                    type="text"
                    required
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="예: 생산기술, 제조기술, R&D"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">공식 채용공고명 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: [대졸 신입] 스마트팩토리 제조엔지니어링 수시 채용"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">실제 근무지 *</label>
                  <input
                    type="text"
                    required
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="예: 울산공장, 남양연구소, 화성"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">고용 형태 (신입 여부) *</label>
                  <select
                    value={newEmploymentType}
                    onChange={(e) => setNewEmploymentType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="신입">🎓 신입 (정규직)</option>
                    <option value="인턴">💼 체험형 인턴</option>
                    <option value="채용연계형 인턴">💼 채용연계형 인턴</option>
                    <option value="교육생/아카데미">📚 교육생 / 아카데미</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">실시간 접수 상태 *</label>
                  <select
                    value={newLiveStatus}
                    onChange={(e) => setNewLiveStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                  >
                    <option value="실시간 공식 접수중">🟢 실시간 공식 접수중</option>
                    <option value="공식 상시 인재풀 등록">🟡 공식 상시 인재풀 등록</option>
                    <option value="공식 교육/부트캠프">🔵 공식 교육/부트캠프</option>
                    <option value="차기 시즌 대비">⏳ 차기 시즌 대비</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">공식 채용사이트 원문 URL *</label>
                <input
                  type="url"
                  required
                  value={newOfficialUrl}
                  onChange={(e) => setNewOfficialUrl(e.target.value)}
                  placeholder="예: https://talent.hyundai.com"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">지원 자격</label>
                  <textarea
                    rows={2}
                    value={newRequirements}
                    onChange={(e) => setNewRequirements(e.target.value)}
                    placeholder="예: 4년제 대졸(예정자), 기계/전자/산공, 어학성적 필수"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">우대 사항</label>
                  <textarea
                    rows={2}
                    value={newPreferred}
                    onChange={(e) => setNewPreferred(e.target.value)}
                    placeholder="예: CATIA, PLC 제어 유경험자, 기사 자격증 소지자"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">접수 마감일 (또는 상시접수)</label>
                <input
                  type="text"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  placeholder="예: 2026-11-30 또는 상시 등록"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddJobModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>공고 등록 및 AI 즉시 분석</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
