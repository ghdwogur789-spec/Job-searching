import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  AICompetencyAnalysis,
  JobPosting,
  Company,
  IndustryNews,
  JobRoleDetail,
  CalendarEvent,
  CoverLetterDoc,
  MockInterviewTurn,
  RoadmapPlan,
  JobStatus,
  ProjectItem
} from '../types';
import {
  initialCompanies,
  initialJobPostings,
  initialIndustryNews,
  initialJobRoles,
  sampleUserProfile,
  initialCalendarEvents
} from '../data/initialData';

interface MobilityContextType {
  activeMenu: number;
  setActiveMenu: (menu: number) => void;
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  loadSampleProfile: () => void;
  resetProfile: () => void;
  competencyAnalysis: AICompetencyAnalysis | null;
  isAnalyzingCompetency: boolean;
  runAICompetencyAnalysis: () => Promise<AICompetencyAnalysis | null>;
  jobPostings: JobPosting[];
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  updateJobNotes: (jobId: string, notes: string) => void;
  evaluateJobFit: (jobId: string) => Promise<any>;
  addCustomJobPosting: (job: Omit<JobPosting, 'id'>) => void;
  resetJobPostingsToOfficial: () => void;
  deleteJobPosting: (jobId: string) => void;
  companies: Company[];
  analyzeCompanyAI: (companyId: string) => Promise<any>;
  news: IndustryNews[];
  analyzeNewsAI: (newsId: string) => Promise<any>;
  jobRoles: JobRoleDetail[];
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;
  coverLetters: CoverLetterDoc[];
  saveCoverLetter: (doc: CoverLetterDoc) => void;
  deleteCoverLetter: (id: string) => void;
  coachCoverLetterAI: (params: { question: string; draft: string; targetCompany: string; targetRole: string }) => Promise<any>;
  mockInterviewHistory: MockInterviewTurn[];
  addMockInterviewTurn: (turn: MockInterviewTurn) => void;
  clearMockInterviewHistory: () => void;
  generateInterviewQuestionAI: (params: { questionType: string; targetRole: string; targetCompany: string }) => Promise<any>;
  evaluateInterviewAnswerAI: (params: { currentQuestion: string; userAnswer: string; targetRole: string; targetCompany: string }) => Promise<any>;
  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  analyzeProjectAI: (projectId: string) => Promise<any>;
  roadmap: RoadmapPlan | null;
  generateRoadmapAI: (targetRole?: string) => Promise<any>;
  toggleRoadmapItem: (type: 'weekly' | 'milestone' | 'checklist', id: string) => void;
  selectedJobForModal: JobPosting | null;
  setSelectedJobForModal: (job: JobPosting | null) => void;
  selectedCompanyForModal: Company | null;
  setSelectedCompanyForModal: (comp: Company | null) => void;
  selectedNewsForModal: IndustryNews | null;
  setSelectedNewsForModal: (news: IndustryNews | null) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  notifications: { id: string; title: string; message: string; date: string; isUrgent: boolean }[];
  notificationPermissionGranted: boolean;
  requestNotificationPermission: () => Promise<void>;
}

const MobilityContext = createContext<MobilityContextType | undefined>(undefined);

const emptyProfile: UserProfile = {
  name: '',
  email: '',
  university: '',
  major: '',
  gpa: '',
  educationStatus: '재학',
  targetIndustries: [],
  targetRoles: [],
  targetCompanySizes: [],
  skills: [],
  certifications: [],
  trainings: [],
  projects: [],
  coverLetter: '',
  resumeText: '',
  targetLocations: []
};

export const MobilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0: Main Dashboard, 1-8: Specific Menus
  const [activeMenu, setActiveMenu] = useState<number>(() => {
    const saved = localStorage.getItem('mobility_active_menu');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('mobility_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return sampleUserProfile; }
    }
    return sampleUserProfile; // Default with rich realistic sample profile for smooth evaluation
  });

  const [competencyAnalysis, setCompetencyAnalysis] = useState<AICompetencyAnalysis | null>(() => {
    const saved = localStorage.getItem('mobility_competency_analysis');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isAnalyzingCompetency, setIsAnalyzingCompetency] = useState(false);

  const [jobPostings, setJobPostings] = useState<JobPosting[]>(() => {
    const saved = localStorage.getItem('mobility_job_postings_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && parsed[0].isVerified === true) {
          return parsed;
        }
      } catch (e) {
        return initialJobPostings;
      }
    }
    return initialJobPostings;
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    const saved = localStorage.getItem('mobility_companies');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialCompanies; }
    }
    return initialCompanies;
  });

  const [news, setNews] = useState<IndustryNews[]>(() => {
    const saved = localStorage.getItem('mobility_news_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialIndustryNews; }
    }
    return initialIndustryNews;
  });

  const [jobRoles] = useState<JobRoleDetail[]>(initialJobRoles);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('mobility_calendar_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialCalendarEvents; }
    }
    return initialCalendarEvents;
  });

  const [coverLetters, setCoverLetters] = useState<CoverLetterDoc[]>(() => {
    const saved = localStorage.getItem('mobility_cover_letters');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [mockInterviewHistory, setMockInterviewHistory] = useState<MockInterviewTurn[]>(() => {
    const saved = localStorage.getItem('mobility_mock_interview_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [roadmap, setRoadmap] = useState<RoadmapPlan | null>(() => {
    const saved = localStorage.getItem('mobility_roadmap');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  // Modal selections
  const [selectedJobForModal, setSelectedJobForModal] = useState<JobPosting | null>(null);
  const [selectedCompanyForModal, setSelectedCompanyForModal] = useState<Company | null>(null);
  const [selectedNewsForModal, setSelectedNewsForModal] = useState<IndustryNews | null>(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('mobility_active_menu', activeMenu.toString());
  }, [activeMenu]);

  useEffect(() => {
    localStorage.setItem('mobility_user_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (competencyAnalysis) {
      localStorage.setItem('mobility_competency_analysis', JSON.stringify(competencyAnalysis));
    }
  }, [competencyAnalysis]);

  useEffect(() => {
    localStorage.setItem('mobility_job_postings_v4', JSON.stringify(jobPostings));
  }, [jobPostings]);

  useEffect(() => {
    localStorage.setItem('mobility_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('mobility_news_v2', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('mobility_calendar_events', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('mobility_cover_letters', JSON.stringify(coverLetters));
  }, [coverLetters]);

  useEffect(() => {
    localStorage.setItem('mobility_mock_interview_history', JSON.stringify(mockInterviewHistory));
  }, [mockInterviewHistory]);

  useEffect(() => {
    if (roadmap) {
      localStorage.setItem('mobility_roadmap', JSON.stringify(roadmap));
    }
  }, [roadmap]);

  // Request browser notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
          setNotificationPermissionGranted(true);
        }
      } catch (err) {
        console.warn('Browser notifications not supported or denied');
      }
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const loadSampleProfile = () => {
    setProfile(sampleUserProfile);
  };

  const resetProfile = () => {
    setProfile(emptyProfile);
    setCompetencyAnalysis(null);
  };

  // Run AI Competency Analysis via server endpoint
  const runAICompetencyAnalysis = async (): Promise<AICompetencyAnalysis | null> => {
    setIsAnalyzingCompetency(true);
    try {
      const res = await fetch('/api/gemini/analyze-competency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      const json = await res.json();
      const analysis: AICompetencyAnalysis = {
        ...json.data,
        analyzedAt: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: json.isAiGenerated
      };
      setCompetencyAnalysis(analysis);
      return analysis;
    } catch (err) {
      console.error('Failed to run AI competency analysis:', err);
      return null;
    } finally {
      setIsAnalyzingCompetency(false);
    }
  };

  // Update job posting bookmark or status
  const updateJobStatus = (jobId: string, status: JobStatus) => {
    setJobPostings(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, status };
      }
      return job;
    }));

    // Also sync with calendar events
    setCalendarEvents(prev => prev.map(evt => {
      if (evt.jobPostingId === jobId) {
        return { ...evt, status };
      }
      return evt;
    }));
  };

  const updateJobNotes = (jobId: string, notes: string) => {
    setJobPostings(prev => prev.map(job => {
      if (job.id === jobId) {
        return { ...job, userNotes: notes };
      }
      return job;
    }));
  };

  // Evaluate Job Fit AI
  const evaluateJobFit = async (jobId: string) => {
    const job = jobPostings.find(j => j.id === jobId);
    if (!job) return null;

    try {
      const res = await fetch('/api/gemini/evaluate-job-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, job }),
      });
      const json = await res.json();
      const fitData = json.data;

      setJobPostings(prev => prev.map(j => {
        if (j.id === jobId) {
          return {
            ...j,
            fitScore: fitData.fitScore,
            fitAnalysis: fitData
          };
        }
        return j;
      }));

      return fitData;
    } catch (err) {
      console.error('Failed to evaluate job fit:', err);
      return null;
    }
  };

  // Add custom verified job posting
  const addCustomJobPosting = (newJob: Omit<JobPosting, 'id'>) => {
    const jobWithId: JobPosting = {
      ...newJob,
      id: `job-custom-${Date.now()}`,
      isVerified: true,
      verifiedDate: new Date().toISOString().split('T')[0],
      verifiedSource: newJob.verifiedSource || '사용자 공식 사이트 직접 확인 등록',
      fitScore: 90
    };
    setJobPostings(prev => [jobWithId, ...prev]);
    // Evaluate fit automatically
    setTimeout(() => {
      evaluateJobFit(jobWithId.id);
    }, 100);
  };

  // Reset to fact-checked official postings
  const resetJobPostingsToOfficial = () => {
    setJobPostings(initialJobPostings);
    localStorage.removeItem('mobility_job_postings_v4');
  };

  // Delete job posting
  const deleteJobPosting = (jobId: string) => {
    setJobPostings(prev => prev.filter(j => j.id !== jobId));
  };

  // Analyze Company AI
  const analyzeCompanyAI = async (companyId: string) => {
    const comp = companies.find(c => c.id === companyId);
    if (!comp) return null;

    try {
      const res = await fetch('/api/gemini/analyze-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company: comp }),
      });
      const json = await res.json();
      const analysisData = json.data;

      setCompanies(prev => prev.map(c => {
        if (c.id === companyId) {
          return { ...c, aiAnalysis: analysisData };
        }
        return c;
      }));

      return analysisData;
    } catch (err) {
      console.error('Failed to analyze company:', err);
      return null;
    }
  };

  // Analyze News AI
  const analyzeNewsAI = async (newsId: string) => {
    const n = news.find(item => item.id === newsId);
    if (!n) return null;

    try {
      const res = await fetch('/api/gemini/analyze-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ news: n }),
      });
      const json = await res.json();
      const analysisData = json.data;

      setNews(prev => prev.map(item => {
        if (item.id === newsId) {
          return { ...item, aiAnalysis: analysisData };
        }
        return item;
      }));

      return analysisData;
    } catch (err) {
      console.error('Failed to analyze news:', err);
      return null;
    }
  };

  // Calendar CRUD
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `evt-${Date.now()}`
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  const updateCalendarEvent = (id: string, updates: Partial<CalendarEvent>) => {
    setCalendarEvents(prev => prev.map(evt => evt.id === id ? { ...evt, ...updates } : evt));
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(prev => prev.filter(evt => evt.id !== id));
  };

  // Cover letter CRUD & AI Coach
  const saveCoverLetter = (doc: CoverLetterDoc) => {
    setCoverLetters(prev => {
      const exists = prev.some(item => item.id === doc.id);
      if (exists) {
        return prev.map(item => item.id === doc.id ? doc : item);
      }
      return [doc, ...prev];
    });
  };

  const deleteCoverLetter = (id: string) => {
    setCoverLetters(prev => prev.filter(item => item.id !== id));
  };

  const coachCoverLetterAI = async (params: { question: string; draft: string; targetCompany: string; targetRole: string }) => {
    try {
      const res = await fetch('/api/gemini/coach-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: params.question,
          userDraft: params.draft,
          targetCompany: params.targetCompany,
          targetRole: params.targetRole,
          userExperience: (profile.projects || []).map(p => `${p.title}: ${p.solution} -> ${p.result}`).join('\n')
        }),
      });
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('Failed to coach cover letter:', err);
      return null;
    }
  };

  // Mock Interview
  const addMockInterviewTurn = (turn: MockInterviewTurn) => {
    setMockInterviewHistory(prev => [...prev, turn]);
  };

  const clearMockInterviewHistory = () => {
    setMockInterviewHistory([]);
  };

  const generateInterviewQuestionAI = async (params: { questionType: string; targetRole: string; targetCompany: string }) => {
    try {
      const res = await fetch('/api/gemini/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-question',
          questionType: params.questionType,
          targetRole: params.targetRole,
          targetCompany: params.targetCompany
        }),
      });
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('Failed to generate interview question:', err);
      return null;
    }
  };

  const evaluateInterviewAnswerAI = async (params: { currentQuestion: string; userAnswer: string; targetRole: string; targetCompany: string }) => {
    try {
      const res = await fetch('/api/gemini/mock-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate-answer',
          currentQuestion: params.currentQuestion,
          userAnswer: params.userAnswer,
          targetRole: params.targetRole,
          targetCompany: params.targetCompany
        }),
      });
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('Failed to evaluate interview answer:', err);
      return null;
    }
  };

  // Projects CRUD & AI
  const addProject = (proj: Omit<ProjectItem, 'id'>) => {
    const newProj: ProjectItem = {
      ...proj,
      id: `proj-${Date.now()}`
    };
    setProfile(prev => ({
      ...prev,
      projects: [...(prev.projects || []), newProj]
    }));
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProfile(prev => ({
      ...prev,
      projects: (prev.projects || []).map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setProfile(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(p => p.id !== id)
    }));
  };

  const analyzeProjectAI = async (projectId: string) => {
    const proj = (profile.projects || []).find(p => p.id === projectId);
    if (!proj) return null;

    try {
      const res = await fetch('/api/gemini/analyze-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project: proj }),
      });
      const json = await res.json();
      const analysis = json.data;

      updateProject(projectId, {
        extractedCompetencies: analysis.extractedCompetencies,
        coverLetterBullets: analysis.coverLetterBullets,
        portfolioTips: analysis.portfolioTips
      });

      return analysis;
    } catch (err) {
      console.error('Failed to analyze project:', err);
      return null;
    }
  };

  // Roadmap AI
  const generateRoadmapAI = async (targetRole?: string) => {
    const roleToUse = targetRole || profile.targetRoles[0] || '생산기술';
    try {
      const res = await fetch('/api/gemini/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: roleToUse,
          currentSkills: profile.skills,
          major: profile.major
        }),
      });
      const json = await res.json();
      const data = json.data;

      const newPlan: RoadmapPlan = {
        targetRole: roleToUse,
        gapAnalysis: data.gapAnalysis,
        weeklyGoals: (data.weeklyGoals || []).map((g: any, idx: number) => ({
          id: `wg-${idx}`,
          week: g.week,
          goal: g.goal,
          done: false
        })),
        monthlyMilestones: (data.monthlyMilestones || []).map((m: any) => ({
          month: m.month,
          title: m.title,
          done: false
        })),
        recommendedCertifications: data.recommendedCertifications || [],
        recommendedCourses: data.recommendedCourses || [],
        suggestedProjects: data.suggestedProjects || [],
        checklist: [
          { id: 'chk-1', text: '기본 프로필 및 3D CAD/공학 툴 포트폴리오 등록', done: true },
          { id: 'chk-2', text: '목표 3개 기업(현대차, 모비스, 기아 등) 최신 산업 뉴스 및 공법 스크랩', done: false },
          { id: 'chk-3', text: 'STAR 기법 기반 직무 맞춤형 자기소개서 초안 2종 작성', done: false },
          { id: 'chk-4', text: 'AI 모의면접을 통한 직무 역량 및 공차 트러블슈팅 답변 연습 (3회 이상)', done: false },
          { id: 'chk-5', text: 'PLC 및 스마트팩토리 실무 교육 과정 신청 또는 수료', done: false }
        ]
      };

      setRoadmap(newPlan);
      return newPlan;
    } catch (err) {
      console.error('Failed to generate roadmap:', err);
      return null;
    }
  };

  const toggleRoadmapItem = (type: 'weekly' | 'milestone' | 'checklist', id: string) => {
    if (!roadmap) return;
    setRoadmap(prev => {
      if (!prev) return null;
      if (type === 'weekly') {
        return {
          ...prev,
          weeklyGoals: prev.weeklyGoals.map(g => g.id === id ? { ...g, done: !g.done } : g)
        };
      } else if (type === 'milestone') {
        return {
          ...prev,
          monthlyMilestones: prev.monthlyMilestones.map(m => m.month === id ? { ...m, done: !m.done } : m)
        };
      } else {
        return {
          ...prev,
          checklist: prev.checklist.map(c => c.id === id ? { ...c, done: !c.done } : c)
        };
      }
    });
  };

  // Compute urgent notifications from calendar events
  const todayStr = '2026-11-02'; // baseline
  const notifications = calendarEvents
    .filter(evt => evt.type === '서류 마감' || evt.type === '면접')
    .map(evt => {
      const eventDate = new Date(evt.date);
      const baseDate = new Date(todayStr);
      const diffDays = Math.ceil((eventDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
      const isUrgent = diffDays <= 7 && diffDays >= 0;
      return {
        id: evt.id,
        title: evt.title,
        message: diffDays < 0 ? '마감됨' : diffDays === 0 ? '오늘 마감 (D-Day)' : `마감 D-${diffDays}일 전`,
        date: evt.date,
        isUrgent
      };
    })
    .sort((a, b) => (a.isUrgent === b.isUrgent ? 0 : a.isUrgent ? -1 : 1));

  return (
    <MobilityContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        profile,
        updateProfile,
        loadSampleProfile,
        resetProfile,
        competencyAnalysis,
        isAnalyzingCompetency,
        runAICompetencyAnalysis,
        jobPostings,
        updateJobStatus,
        updateJobNotes,
        evaluateJobFit,
        addCustomJobPosting,
        resetJobPostingsToOfficial,
        deleteJobPosting,
        companies,
        analyzeCompanyAI,
        news,
        analyzeNewsAI,
        jobRoles,
        calendarEvents,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        coverLetters,
        saveCoverLetter,
        deleteCoverLetter,
        coachCoverLetterAI,
        mockInterviewHistory,
        addMockInterviewTurn,
        clearMockInterviewHistory,
        generateInterviewQuestionAI,
        evaluateInterviewAnswerAI,
        projects: profile.projects || [],
        addProject,
        updateProject,
        deleteProject,
        analyzeProjectAI,
        roadmap,
        generateRoadmapAI,
        toggleRoadmapItem,
        selectedJobForModal,
        setSelectedJobForModal,
        selectedCompanyForModal,
        setSelectedCompanyForModal,
        selectedNewsForModal,
        setSelectedNewsForModal,
        globalSearchQuery,
        setGlobalSearchQuery,
        notifications,
        notificationPermissionGranted,
        requestNotificationPermission
      }}
    >
      {children}
    </MobilityContext.Provider>
  );
};

export const useMobility = () => {
  const context = useContext(MobilityContext);
  if (!context) {
    throw new Error('useMobility must be used within a MobilityProvider');
  }
  return context;
};
