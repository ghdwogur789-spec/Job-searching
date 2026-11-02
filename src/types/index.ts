export type CompanyCategory =
  | '완성차'
  | '자동차 부품'
  | '전기차/배터리'
  | '자율주행/SW'
  | '차량 전장'
  | '스마트팩토리/로봇'
  | '모빌리티 스타트업';

export type JobStatus =
  | '관심 공고'
  | '지원 예정'
  | '지원 완료'
  | '서류 합격'
  | '면접 진행'
  | '최종 합격'
  | '불합격'
  | '지원 취소';

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  role: string;
  tools: string;
  problem: string;
  solution: string;
  result: string;
  extractedCompetencies?: string[];
  coverLetterBullets?: string[];
  portfolioTips?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  major: string;
  gpa: string;
  educationStatus: '재학' | '졸업예정' | '기졸업';
  targetIndustries: string[];
  targetRoles: string[];
  targetCompanySizes: string[];
  skills: string[];
  certifications: string[];
  trainings: string[];
  projects: ProjectItem[];
  coverLetter: string;
  resumeText: string;
  targetLocations: string[];
}

export interface RecommendedRole {
  role: string;
  fitScore: number;
  matchReason: string;
  requiredSkills: string[];
  missingSkills: string[];
}

export interface AICompetencyAnalysis {
  majorCompetency: string;
  techCompetency: string;
  projectExperience: string;
  problemSolving: string;
  collaboration: string;
  strengths: string[];
  weaknesses: string[];
  extractedKeywords: string[];
  recommendedJobRoles: RecommendedRole[];
  tailoredAdvice: string;
  analyzedAt?: string;
  isAiGenerated?: boolean;
}

export interface JobFitAnalysis {
  fitScore: number;
  recommendationReason: string;
  userStrengths: string[];
  userGaps: string[];
  coverLetterKeyPoints: string[];
  interviewPrepQuestions: {
    question: string;
    answerTip: string;
  }[];
}

export interface JobPosting {
  id: string;
  companyName: string;
  companyCategory: CompanyCategory;
  title: string;
  role: string;
  location: string;
  companySize: '대기업' | '중견기업' | '외국계' | '스타트업';
  employmentType: '신입' | '인턴' | '채용연계형 인턴' | '교육생/아카데미';
  liveStatus?: '실시간 공식 접수중' | '공식 상시 인재풀 등록' | '공식 교육/부트캠프' | '차기 시즌 대비';
  requirements: string;
  preferred: string;
  responsibilities: string;
  startDate: string;
  deadline: string;
  officialUrl: string;
  officialSearchUrl?: string;
  isSample: boolean;
  isVerified: boolean;
  verifiedDate: string;
  verifiedSource: string;
  verificationNote?: string;
  source: string;
  fitScore?: number;
  fitAnalysis?: JobFitAnalysis;
  status?: JobStatus;
  userNotes?: string;
}

export interface CompanyAIAnalysis {
  coreCompetitiveness: string;
  industryPosition: string;
  futureGrowthAreas: string;
  mobilityStrategy: string;
  targetRolesAndSkills: {
    role: string;
    keySkill: string;
  }[];
  jobSeekerKeyIssues: string[];
}

export interface Company {
  id: string;
  name: string;
  category: CompanyCategory;
  size: '대기업' | '중견기업' | '외국계' | '스타트업';
  headquarters: string;
  majorPlants: string;
  revenue: string;
  operatingProfit: string;
  financialYear: string;
  financialSource: string;
  mainProducts: string;
  businessFocus: string;
  homepageUrl: string;
  careerUrl: string;
  logoColor: string;
  aiAnalysis?: CompanyAIAnalysis;
}

export interface NewsAIAnalysis {
  coreSummary: string;
  industryImpact: string;
  relatedCompanies: string[];
  relatedJobRoles: string[];
  importantCompetencies: string;
  studyGuide: string;
  expectedInterviewQuestions: {
    question: string;
    point: string;
  }[];
}

export interface IndustryNews {
  id: string;
  title: string;
  category: string;
  publishedDate: string;
  source: string;
  originalUrl: string;
  summary: string;
  content: string;
  relatedCompanies: string[];
  aiAnalysis?: NewsAIAnalysis;
}

export interface CalendarEvent {
  id: string;
  title: string;
  companyName?: string;
  jobPostingId?: string;
  type: '접수 시작' | '서류 마감' | '인적성/코테' | '면접' | '최종 발표' | '개인 일정';
  date: string; // YYYY-MM-DD
  time?: string;
  status?: JobStatus;
  notes?: string;
  isPersonal?: boolean;
  completed?: boolean;
}

export interface JobRoleDetail {
  id: string;
  name: string;
  category: string;
  summary: string;
  duties: string[];
  requiredMajors: string[];
  coreSkills: { name: string; importance: number; levelDesc: string }[];
  tools: string[];
  certifications: string[];
  preferredExperience: string[];
  targetCompanies: string[];
  careerPath: string[];
}

export interface CoverLetterDoc {
  id: string;
  targetCompany: string;
  targetRole: string;
  question: string;
  userDraft: string;
  improvedDraft?: string;
  starAnalysis?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  expressionImprovements?: string[];
  companyAlignment?: string;
  strengthsHighlight?: string;
  updatedAt: string;
}

export interface MockInterviewTurn {
  id: string;
  question: string;
  questionType: string;
  userAnswer: string;
  evaluation?: {
    scores: {
      logic: number;
      jobRelevance: number;
      specificity: number;
      problemSolving: number;
      delivery: number;
    };
    totalScore: number;
    feedback: string;
    positivePoints: string[];
    improvementPoints: string[];
    followUpQuestion?: string;
    exemplaryAnswerKey?: string;
  };
  createdAt: string;
}

export interface RoadmapGoal {
  id: string;
  week: string;
  goal: string;
  done: boolean;
}

export interface RoadmapMilestone {
  month: string;
  title: string;
  done: boolean;
}

export interface RoadmapPlan {
  targetRole: string;
  gapAnalysis: string;
  weeklyGoals: RoadmapGoal[];
  monthlyMilestones: RoadmapMilestone[];
  recommendedCertifications: string[];
  recommendedCourses: string[];
  suggestedProjects: string[];
  checklist: { id: string; text: string; done: boolean }[];
}
