import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Initialize GoogleGenAI
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Helper for safe Gemini call with timeout & JSON parsing
async function callGemini(systemPrompt: string, userPrompt: string, fallbackJson: any) {
  const ai = getAIClient();
  if (!ai) {
    return { data: fallbackJson, isAiGenerated: false, note: 'Default analysis profile' };
  }

  try {
    const apiPromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt + "\nOutput MUST be valid JSON only without markdown code blocks, backticks, or other text outside the JSON.",
        responseMimeType: 'application/json',
      },
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API request timed out (4000ms)')), 4000)
    );

    const response: any = await Promise.race([apiPromise, timeoutPromise]);
    const raw = response.text || '';
    const cleaned = raw.replace(/^```json/m, '').replace(/```$/m, '').trim();
    const parsed = JSON.parse(cleaned);
    return { data: parsed, isAiGenerated: true };
  } catch (err: any) {
    console.warn('Gemini API call failed or timed out, serving structured domain profile:', err?.message || err);
    return { data: fallbackJson, isAiGenerated: false, error: err?.message };
  }
}

// 1. Analyze Competency & Recommend Roles
app.post('/api/gemini/analyze-competency', async (req, res) => {
  const { profile } = req.body;
  const major = profile?.major || '기계공학/미래모빌리티';
  const skills = (profile?.skills || []).join(', ');
  const projects = (profile?.projects || []).map((p: any) => `${p.title}: ${p.description || p.problem}`).join(' / ');
  const coverLetter = profile?.coverLetter || '';

  const fallback = {
    majorCompetency: `${major} 전공 지식을 기반으로 한 차량 동역학 및 기계 시스템 해석 역량 우수`,
    techCompetency: `보유 도구(${skills || 'CAD/CATIA, PLC, Python'})를 활용한 실무 설계 및 데이터 처리 능력 보유`,
    projectExperience: '모빌리티 관련 캡스톤 및 팀 프로젝트를 통한 실차 부품 해석 및 공정 개선 경험',
    problemSolving: '설계 공차 불일치 및 공정 오차 발생 시 원인 분석과 피드백 루프를 통한 문제 해결 역량 확인',
    collaboration: '다학제 팀 프로젝트에서 기계-전기-SW 파트 간 인터페이스 조율 및 문서화 능력',
    strengths: [
      '3D CAD/CAE 기반 부품 모델링 및 구조 해석 능력',
      '제조 현장 이해도 및 생산 라인 공정 최적화 관심도',
      '데이터 기반 실험 분석 및 원인 규명 태도',
      '모빌리티 전동화/자율주행 트렌드에 대한 높은 이해'
    ],
    weaknesses: [
      '현대차/기아 등 양산 현장 스마트팩토리 PLC 및 제어 실습 경험 보완 필요',
      '글로벌 표준 품질 관리(APQP, PPAP, FMEA) 실무 용어 및 절차 습득 권장'
    ],
    extractedKeywords: ['CATIA', '공정설계', '구조해석', '스마트팩토리', '품질보증', '전기차배터리', 'PLC', '생산기술'],
    recommendedJobRoles: [
      {
        role: '생산기술 / 제조기술',
        fitScore: 94,
        matchReason: '기계/공정 지식과 3D 도면 해독 능력이 양산 라인 설비 배치 및 공정 개선 업무에 매우 적합함',
        requiredSkills: ['공정 레이아웃 설계', '설비 가동률 분석', 'PLC 기초', '품질 규격 대응'],
        missingSkills: ['MES/PLC 라인 연동 경험', '설비 보전 실무']
      },
      {
        role: '품질관리 및 품질보증 (QA/QC)',
        fitScore: 89,
        matchReason: '설계 치수 검증 및 신뢰성 평가 프로젝트 경험이 완성차/부품사 품질 부서 요구사항과 직결됨',
        requiredSkills: ['공정 능력 지수(Cpk)', 'FMEA 분석', '계측기 측정 실무', '불량 원인 분석'],
        missingSkills: ['자동차 품질 표준(IATF 16949) 이론']
      },
      {
        role: '기계 및 차체/의장 설계',
        fitScore: 86,
        matchReason: 'CAD/CATIA를 활용한 기구물 3D 모델링 및 간섭 체크 경험이 자동차 차체 및 모듈 설계에 부합함',
        requiredSkills: ['CATIA V5/3DX', 'GD&T 기하공차', '구조/진동 해석', '금형 및 사출 이해'],
        missingSkills: ['차량 충돌 해석(CAE) 심화']
      },
      {
        role: '배터리 팩/모듈 제조기술',
        fitScore: 88,
        matchReason: '전기차 배터리 모듈 어셈블리 공정 및 열관리 하우징 공정 최적화에 기계 전공 백그라운드 필요',
        requiredSkills: ['레이저 용접/접착 공정', '배터리 셀 특성 이해', '클린룸 자동화', '열해석'],
        missingSkills: ['이차전지 전극 공정 세부 지식']
      }
    ],
    tailoredAdvice: '기구 설계 능력은 탄탄하게 입증되었으므로, 자기소개서 작성 시 단순 툴 사용보다는 "공정 시간 단축"이나 "불량률 0% 달성"과 같은 정량적 성과를 강조하십시오. 또한 현대모비스, 현대자동차 등 주요 완성차의 스마트팩토리/SDV 전환 이슈를 연결하면 강력한 차별점이 됩니다.'
  };

  const systemPrompt = `You are an expert HR recruiter & mobility industry career advisor in South Korea.
Analyze the candidate's profile (major, skills, projects, cover letter) and return a comprehensive JSON evaluation.
The output MUST be in Korean and strictly follow this JSON format:
{
  "majorCompetency": "string",
  "techCompetency": "string",
  "projectExperience": "string",
  "problemSolving": "string",
  "collaboration": "string",
  "strengths": ["string", "string", "string", "string"],
  "weaknesses": ["string", "string"],
  "extractedKeywords": ["string", "string", ...],
  "recommendedJobRoles": [
    {
      "role": "string",
      "fitScore": number (70-98),
      "matchReason": "string",
      "requiredSkills": ["string"],
      "missingSkills": ["string"]
    }
  ],
  "tailoredAdvice": "string"
}`;

  const userPrompt = `지원자 프로필 데이터:
전공: ${major}
희망 직무: ${profile?.targetRoles || '미지정'}
보유 기술 및 툴: ${skills}
프로젝트 및 활동: ${projects}
자기소개서 발췌:
${coverLetter.slice(0, 1500)}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 2. Evaluate Specific Job Fit
app.post('/api/gemini/evaluate-job-fit', async (req, res) => {
  const { profile, job } = req.body;
  const fallback = {
    fitScore: 92,
    recommendationReason: `${job?.companyName || '목표 기업'}의 ${job?.role || '해당 직무'} 채용 요건인 기계/전장 설계 기초와 공정 문제 해결 경험이 지원자의 학부 캡스톤 프로젝트 및 보유 툴 역량과 90% 이상 일치합니다.`,
    userStrengths: [
      '요구 자격 요건인 CAD/공학 툴 숙련도 충족',
      '실무 중심 팀 프로젝트를 통한 제품 개선 경험 보유',
      '전동화/모빌리티 신기술 습득에 대한 높은 열의'
    ],
    userGaps: [
      '해당 기업의 주력 양산 공법(예: 고진공 다이캐스팅, 고전압 배터리 실링)에 대한 심층적 지식 보완 필요',
      '품질 관리 지표(Cp, Cpk) 적용 실무 예시 추가 권장'
    ],
    coverLetterKeyPoints: [
      '캡스톤 프로젝트 중 발생한 설계 간섭 문제를 구조 시뮬레이션으로 해결했던 정량적 경험 강조',
      '해당 기업의 최신 SDV 및 전동화 전환 전략에 발맞춰 생산 공정 유연성을 높일 수 있는 아이디어 제시',
      '타 전공 팀원과의 협업을 통해 일정 지연을 방지했던 주도적 커뮤니케이션 사례 기술'
    ],
    interviewPrepQuestions: [
      {
        question: '양산 라인에서 설계 도면과 실제 가공품 간의 공차 불일치로 조립 불량이 발생한다면 생산기술 엔지니어로서 어떻게 대응하시겠습니까?',
        answerTip: '원인 분해(설비 마모, 공구 공차, 작업자 편차) 단계별 검증 후 즉각적인 임시 조치와 영구 재발 방지책(설계 변경 요청 또는 치공구 보정)을 논리적으로 설명하세요.'
      },
      {
        question: '지원자가 진행한 프로젝트에서 가장 큰 난관이었던 기술적 한계는 무엇이었고, 이를 어떻게 극복했습니까?',
        answerTip: 'STAR 기법에 맞춰 Situation(상황), Task(과제), Action(본인의 기술적 해결책), Result(정량적 수치 성과)로 답변을 구성하세요.'
      },
      {
        question: '우리 회사가 최근 추진 중인 신규 모빌리티 플랫폼/배터리 제조 공정에 본인의 역량이 어떻게 기여할 수 있습니까?',
        answerTip: '기업의 최근 뉴스나 투자 공시를 인용하고, 본인이 다룰 수 있는 툴과 학습 민첩성을 연계하여 입사 후 즉각적인 실무 기여도를 어필하세요.'
      }
    ]
  };

  const systemPrompt = `You are an expert career consultant specializing in South Korean mobility enterprises (Hyundai Motor Group, LG Energy Solution, Samsung SDI, HL Mando, Hyundai Mobis, etc.).
Evaluate the fit between the candidate's profile and the specified job posting.
Provide:
{
  "fitScore": number (70-98, reference fit indicator),
  "recommendationReason": "string",
  "userStrengths": ["string", "string", "string"],
  "userGaps": ["string", "string"],
  "coverLetterKeyPoints": ["string", "string", "string"],
  "interviewPrepQuestions": [
    {
      "question": "string",
      "answerTip": "string"
    }
  ]
}
Output valid JSON in Korean only.`;

  const userPrompt = `지원자 정보:
전공: ${profile?.major || '공학계열'}
보유 역량: ${(profile?.skills || []).join(', ')}
경험 요약: ${(profile?.projects || []).map((p: any) => p.title).join(', ')}

채용 공고:
기업명: ${job?.companyName}
공고명: ${job?.title}
직무: ${job?.role}
지원자격 및 우대사항: ${job?.requirements || ''} / ${job?.preferred || ''}
담당업무: ${job?.responsibilities || ''}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 3. In-depth Company Analysis
app.post('/api/gemini/analyze-company', async (req, res) => {
  const { company } = req.body;
  const companyName = company?.name || '현대자동차';

  const fallback = {
    coreCompetitiveness: `${companyName}은(는) 전동화 전용 플랫폼과 글로벌 공급망 수직계열화를 구축하여 제조 효율성과 원가 경쟁력을 극대화하고 있습니다.`,
    industryPosition: `국내 1위 완성차 및 글로벌 탑 3 지위를 확고히 하고 있으며, SDV(소프트웨어 중심 자동차) 및 수소 모빌리티 분야에서 독자 생태계를 조성 중입니다.`,
    futureGrowthAreas: '차세대 전고체/LFP 배터리 팩 양산 기술, 자율주행 레벨 3 상용화, UAM(AAM) 기체 개발 및 로보틱스 기반 스마트 팩토리(E-FOREST)',
    mobilityStrategy: '전통적 내연기관 중심 제조에서 벗어나 데이터 기반 스마트 제조와 소프트웨어 중심 차량(SDV) 표준 아키텍처로의 전환 가속화',
    targetRolesAndSkills: [
      { role: '생산기술', keySkill: '스마트팩토리 로봇 자동화, 신차 양산 품질 조기 안정화, 디지털 트윈' },
      { role: '연구개발(R&D)', keySkill: '열관리 시스템 설계, 전동화 파워트레인 제어기, CATIA/HyperMesh' },
      { role: '차량 SW/전장', keySkill: 'AUTOSAR, 임베디드 C/C++, 차량 이더넷 통신, 제어 로직' }
    ],
    jobSeekerKeyIssues: [
      `${companyName}의 최신 양산 거점 자동화 기술(E-FOREST 등) 키워드를 자기소개서에 적극 반영할 것`,
      '단순 설계 능력뿐 아니라 공정 효율 개선 및 양산성 검증 경험이 면접 통과의 핵심 열쇠',
      '최근 글로벌 ESG 및 탄소중립 배터리 재활용 트렌드와 본인의 전공 기술을 연결하여 답변 준비'
    ]
  };

  const systemPrompt = `You are a top mobility equity research analyst and corporate recruiter in South Korea.
Provide an in-depth strategic analysis for job seekers targeting: ${companyName}.
Return JSON only:
{
  "coreCompetitiveness": "string",
  "industryPosition": "string",
  "futureGrowthAreas": "string",
  "mobilityStrategy": "string",
  "targetRolesAndSkills": [
    { "role": "string", "keySkill": "string" }
  ],
  "jobSeekerKeyIssues": ["string", "string", "string"]
}`;

  const userPrompt = `기업 정보:
기업명: ${company?.name}
사업분야: ${company?.category}
주요 제품/기술: ${company?.mainProducts}
최근 사업 방향: ${company?.businessFocus || ''}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 4. Analyze Mobility Industry News & Career Impact
app.post('/api/gemini/analyze-news', async (req, res) => {
  const { news } = req.body;
  const title = news?.title || '모빌리티 산업 최신 동향';

  const fallback = {
    coreSummary: news?.summary || `${title}을 통해 모빌리티 산업 전반의 기술적 패러다임 변화와 공급망 재편이 본격화되고 있음을 보여줍니다.`,
    industryImpact: '생산 단가 절감 및 제조 공정의 지능화(AI) 요구가 급격히 증가하며, 기존 협력사 생태계의 소프트웨어 및 자동화 역량 검증이 강화되고 있습니다.',
    relatedCompanies: news?.relatedCompanies || ['현대자동차', '현대모비스', 'LG에너지솔루션', 'HL만도'],
    relatedJobRoles: ['생산기술', '제조기술', '공정설계', '차량 전장SW', '품질보증'],
    importantCompetencies: 'PLC/로봇 자동화 제어, 공정 데이터 분석(Python/SQL), 모빌리티 표준 규격 이해, 스마트팩토리 공정 모니터링',
    studyGuide: '스마트제조 공정 시뮬레이션(디지털 트윈) 개념과 실제 PLC 제어 로직 기초를 학습하고, 기계공학도는 전기전자 기초 인터페이스를 습득할 것을 권장합니다.',
    expectedInterviewQuestions: [
      {
        question: `최근 ${title} 이슈와 관련하여 우리 회사 생산/개발 현장에 발생할 수 있는 가장 큰 기술적 도전 과제는 무엇이라 생각합니까?`,
        point: '공정 수율 안정화, 설비 투자 대비 가동 효율, 작업자 안전 및 자동화 설비 간의 인터페이스 최적화 관점에서 답변할 것'
      },
      {
        question: '이러한 기술 변화 속에서 지원자가 대학 시절 쌓은 경험 중 즉시 적용할 수 있는 강점은 무엇입니까?',
        point: '학부 프로젝트에서 데이터 기반으로 문제를 도출하고 하드웨어-소프트웨어를 연계해 성과를 낸 실전 경험을 연결할 것'
      }
    ]
  };

  const systemPrompt = `You are a senior tech reporter and mobility career mentor.
Analyze the following mobility industry news article and connect it directly to university graduates / job seekers.
Format JSON only:
{
  "coreSummary": "string",
  "industryImpact": "string",
  "relatedCompanies": ["string", ...],
  "relatedJobRoles": ["string", ...],
  "importantCompetencies": "string",
  "studyGuide": "string",
  "expectedInterviewQuestions": [
    { "question": "string", "point": "string" }
  ]
}`;

  const userPrompt = `뉴스 제목: ${title}
카테고리: ${news?.category || '전기차/스마트팩토리'}
원문 요약: ${news?.summary || ''}
본문/내용: ${news?.content || ''}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 5. Coach Cover Letter (STAR restructuring, expression polish, alignment)
app.post('/api/gemini/coach-cover-letter', async (req, res) => {
  const { question, userDraft, targetCompany, targetRole, userExperience } = req.body;

  const fallback = {
    improvedDraft: `[공정 오차 0.05mm 극복: 데이터 기반 피드백으로 조립 정밀도를 확보하다]\n\n대학 시절 친환경 하이브리드 모빌리티 캡스톤 프로젝트에서 차체 지그 및 구동축 브래킷 설계를 담당했습니다. 당시 초기 조립 공정에서 허용 공차(±0.02mm)를 초과하는 0.05mm의 유격이 발생해 구동 시 진동 불량이 발생하는 문제를 겪었습니다.\n\n이를 해결하기 위해 단순 재가공에 머물지 않고 3차원 측정 데이터를 50회 누적 수집하여 오차의 주원인이 볼트 체결 토크의 불균일과 용접 열변형에 있음을 정량적으로 규명했습니다. 이에 따라 체결 순서를 대각선 4단계로 표준화하고 방열 지그 형상을 개선하는 설계를 적용했습니다. 그 결과 재조립 후 공차를 ±0.012mm 이내로 안정화하였으며, 최종 실차 주행 평가에서 진동 수치를 35% 저감시키는 성과를 거두었습니다.\n\n이러한 공정 데이터 분석과 치공구 개선 역량은 ${targetCompany || '귀사'}의 ${targetRole || '생산기술'} 부서에서 양산 라인의 조기 품질 안정화에 즉각 기여할 것입니다.`,
    starAnalysis: {
      situation: '하이브리드 모빌리티 캡스톤 프로젝트 중 구동축 브래킷 조립 공차 초과(0.05mm) 및 진동 불량 직면',
      task: '단순 재가공이 아닌 근본적인 오차 원인 분석 및 재조립 공차 ±0.02mm 이내 확보',
      action: '3차원 측정 데이터 50회 분석, 열변형 및 볼트 체결 토크 원인 규명, 체결 순서 표준화 및 지그 형상 재설계',
      result: '공차 ±0.012mm 안정화 및 실차 주행 진동 수치 35% 대폭 저감 달성'
    },
    expressionImprovements: [
      '추상적인 "열심히 노력했습니다"를 "3차원 측정 데이터 50회 누적 수집"과 같이 수치화된 구체적 행동으로 수정',
      '문단 서두에 직무 역량과 정량적 성과를 압축한 소제목 배치로 인사담당자의 시선 집중 유도',
      '입사 후 포부를 기업의 양산 현장 목표(품질 조기 안정화)와 직접 연결하여 설득력 강화'
    ],
    companyAlignment: `${targetCompany || '목표 기업'}의 '현장 중심', '도전적 실행' 인재상과 긴밀히 부합하며, 실제 양산 현장에서 마주치는 공차 불일치 문제를 해결할 수 있는 즉시 전력감임을 어필함`,
    strengthsHighlight: '정량적 측정 데이터 활용 능력, 기구학적 원인 규명 논리, 공정 표준화 실행력'
  };

  const systemPrompt = `You are a premier executive resume and cover letter coach for South Korea's top automotive & mobility manufacturers.
Guidelines:
1. STRICTLY use the user's authentic facts and experiences. DO NOT invent or hallucinate fake credentials.
2. Structure the experience using the STAR (Situation, Task, Action, Result) methodology with measurable outcomes.
3. Align with target company core values and target job role competencies.
4. Output JSON only:
{
  "improvedDraft": "string (complete polished essay in Korean with compelling headline)",
  "starAnalysis": {
    "situation": "string",
    "task": "string",
    "action": "string",
    "result": "string"
  },
  "expressionImprovements": ["string", "string", "string"],
  "companyAlignment": "string",
  "strengthsHighlight": "string"
}`;

  const userPrompt = `목표 기업: ${targetCompany || '현대자동차'}
목표 직무: ${targetRole || '생산기술'}
자기소개서 문항: ${question || '지원 직무와 관련된 본인의 차별화된 경험과 이를 통해 달성한 성과를 구체적으로 기술하시오.'}
지원자 원본 초안 / 메모:
${userDraft || ''}
지원자 추가 경험 정보:
${userExperience || ''}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 6. AI Mock Interview (Question generation & Evaluation)
app.post('/api/gemini/mock-interview', async (req, res) => {
  const { action, questionType, targetRole, targetCompany, currentQuestion, userAnswer, history } = req.body;

  if (action === 'generate-question') {
    const fallbackQ = {
      question: `지원하신 ${targetRole || '직무'} 현장에서는 품질 불량이 발생했을 때 빠른 라인 가동과 완벽한 원인 규명 사이에서 우선순위 갈등이 발생할 수 있습니다. 지원자라면 엔지니어로서 어떠한 기준과 절차로 의사결정을 내리시겠습니까?`,
      questionType: questionType || '직무 역량',
      evaluationCriteria: ['안전 및 품질 원칙 준수 여부', '임시 조치와 근본 대책 분리 논리', '현장 작업자와의 소통 태도'],
      intent: '위기 상황에서의 우선순위 판단력과 현장 공학 윤리 검증'
    };

    const systemPrompt = `You are an interview examiner for Korean mobility corporations (Hyundai, Kia, Mobis, LG Ensol, Mando, etc.).
Generate a realistic, insightful interview question for the candidate based on target company, target role, and question type.
Return JSON only:
{
  "question": "string",
  "questionType": "string",
  "evaluationCriteria": ["string", "string", "string"],
  "intent": "string"
}`;

    const userPrompt = `기업: ${targetCompany || '현대자동차'}
직무: ${targetRole || '생산기술'}
유형: ${questionType || '직무 면접'}`;

    const result = await callGemini(systemPrompt, userPrompt, fallbackQ);
    return res.json(result);
  }

  // action === 'evaluate-answer'
  const fallbackEval = {
    scores: {
      logic: 88,
      jobRelevance: 92,
      specificity: 85,
      problemSolving: 90,
      delivery: 86
    },
    totalScore: 88,
    feedback: '현장 품질 문제에 대해 임시 조치(격리 및 라인 재가동)와 근본 조치(원인 분석 및 방지책 수립)를 훌륭하게 분리하여 답변했습니다. 엔지니어다운 논리적 사고가 돋보입니다.',
    positivePoints: [
      '문제를 단계별(현상 파악 → 원인 추적 → 재발 방지)로 체계화하여 전달함',
      '관련 학부 프로젝트의 구체적 측정 데이터 사례를 적절히 인용함'
    ],
    improvementPoints: [
      '결론을 먼저 제시하는 두괄식 답변 구조를 더 명확히 다듬으면 전달력이 배가됩니다.',
      '타 부서(품질, 생산관리)와의 협의 절차를 1문장 추가하면 협업 역량이 더욱 돋보일 것입니다.'
    ],
    followUpQuestion: '방금 말씀하신 임시 조치 진행 중 타 부서 관리자가 생산성 저하를 이유로 강하게 라인 가동을 재촉한다면 어떻게 설득하시겠습니까?',
    exemplaryAnswerKey: '데이터 기반 리스크 비용 환산(불량 유출 시 리콜 비용 vs 30분 라인 정지 비용 비교)을 근거로 제시하고, 품질팀과의 핫라인을 통해 신속한 검증 일정을 약속하는 방식으로 신뢰를 확보하는 답변이 우수합니다.'
  };

  const systemPrompt = `You are a strict yet constructive interview evaluator for South Korean automotive manufacturers.
Evaluate the candidate's interview answer on:
- logic (1-100)
- jobRelevance (1-100)
- specificity (1-100)
- problemSolving (1-100)
- delivery (1-100)
Provide specific, actionable feedback, follow-up pressure question, and exemplary answer tips.
Return JSON only:
{
  "scores": { "logic": number, "jobRelevance": number, "specificity": number, "problemSolving": number, "delivery": number },
  "totalScore": number,
  "feedback": "string",
  "positivePoints": ["string", "string"],
  "improvementPoints": ["string", "string"],
  "followUpQuestion": "string",
  "exemplaryAnswerKey": "string"
}`;

  const userPrompt = `면접 질문: ${currentQuestion}
지원자 답변: ${userAnswer}
목표 기업 및 직무: ${targetCompany} - ${targetRole}`;

  const result = await callGemini(systemPrompt, userPrompt, fallbackEval);
  res.json(result);
});

// 7. Analyze Project for Portfolio & Resume
app.post('/api/gemini/analyze-project', async (req, res) => {
  const { project } = req.body;
  const title = project?.title || '모빌리티 프로젝트';

  const fallback = {
    extractedCompetencies: ['3D CAD/CAE 구조 해석', '공차 분석 및 간섭 검증', '데이터 기반 공정 최적화', '다학제 팀 프로젝트 리더십'],
    jobRelevance: '생산기술 및 기계설계 직무의 핵심 요구 역량인 도면 검증 능력과 실물 제작 피드백 사이클을 직접 수행한 실전성 높은 프로젝트임',
    coverLetterBullets: [
      `${title} 수행 중 3D 측정 데이터 분석을 통해 가공 오차 0.05mm의 원인을 규명하고 지그 설계를 개선하여 공차를 ±0.012mm로 안정화함`,
      '유한요소해석(FEA)을 선행 적용하여 구조 취약 부위를 사전에 20% 보강하고 부품 중량을 8% 경량화하는 최적화 달성',
      '설계-가공-조립 전 과정의 일정 체크리스트를 주도적으로 운영하여 프로젝트 기한 내 납기 준수율 100% 달성'
    ],
    portfolioTips: [
      '단순 완성품 사진만 나열하지 말고 "문제 발생 지점 도면 vs 개선 지점 도면"을 나란히 비교하는 비포/애프터 슬라이드를 구성하세요.',
      '본인이 직접 작성한 계산 수식이나 CAE 응력 분포도 이미지를 캡션과 함께 추가하면 기술적 신뢰도가 대폭 상승합니다.'
    ]
  };

  const systemPrompt = `You are a technical recruiter for mobility companies.
Analyze the project description and extract resume bullet points and portfolio structuring advice.
Return JSON only:
{
  "extractedCompetencies": ["string", ...],
  "jobRelevance": "string",
  "coverLetterBullets": ["string", "string", "string"],
  "portfolioTips": ["string", "string"]
}`;

  const userPrompt = `프로젝트명: ${title}
기간: ${project?.period || ''}
본인 역할: ${project?.role || ''}
사용 기술/툴: ${project?.tools || ''}
문제 상황: ${project?.problem || ''}
해결 과정: ${project?.solution || ''}
결과 및 성과: ${project?.result || ''}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// 8. Generate Skill Roadmap
app.post('/api/gemini/generate-roadmap', async (req, res) => {
  const { targetRole, currentSkills, major } = req.body;
  const roleName = targetRole || '생산기술';

  const fallback = {
    roleName,
    gapAnalysis: `현재 보유 중인 기계/설계 기초 역량은 우수하나, ${roleName} 현장에서 즉시 요구되는 스마트팩토리 PLC 제어와 공정 품질 규격(Cpk, FMEA) 실무 적용 경험이 보완 과제입니다.`,
    weeklyGoals: [
      { week: '1주차', goal: '현대차 E-FOREST 등 최신 모빌리티 생산기술 공법 및 라인 구조 분석' },
      { week: '2주차', goal: 'PLC 래더 다이어그램 기초 및 센서/액추에이터 인터페이스 제어 실습' },
      { week: '3주차', goal: '미니 캡스톤: 공정 불량률 데이터를 활용한 Cpk 산출 및 가동률 분석 프로젝트' },
      { week: '4주차', goal: '목표 기업별(현대차, 모비스 등) 생산기술 기출 면접 질문 20선 스크립트 작성' }
    ],
    monthlyMilestones: [
      { month: '1개월차', title: '직무 핵심 이론 및 기사 자격증 필기/실기 마스터' },
      { month: '2개월차', title: '스마트팩토리/PLC 공정 개선 실전 포트폴리오 1편 완성' },
      { month: '3개월차', title: '타겟 5개사 맞춤형 자기소개서 완성 및 실전 모의면접 통과' }
    ],
    recommendedCertifications: ['일반기계기사 / 생산자동화산업기사', '품질경영기사 (또는 6시그마 GB)', 'ADsP (데이터분석 준전문가)', 'CATIA / SolidWorks 공식 인증자격'],
    recommendedCourses: [
      '현대차그룹 H-Mobility 클래스 / 미래차 인재양성 사업',
      '대한상공회의소 스마트팩토리 기반 PLC 및 로봇 제어 실무 과정',
      '국가인적자원개발컨소시엄(CHAMP) 완성차 부품 제조 공정 실습'
    ],
    suggestedProjects: [
      '컨베이어 및 공압 실린더 연동 간이 스마트 분류 공정 PLC 시뮬레이션',
      '오픈소스 공정 센서 데이터를 활용한 라인 병목 현상(Bottleneck) 개선 최적화'
    ]
  };

  const systemPrompt = `You are a senior vocational counselor in the mobility engineering field.
Generate a structured, actionable, 3-month competence development roadmap for the target role.
Return JSON only:
{
  "roleName": "string",
  "gapAnalysis": "string",
  "weeklyGoals": [{ "week": "string", "goal": "string" }],
  "monthlyMilestones": [{ "month": "string", "title": "string" }],
  "recommendedCertifications": ["string", ...],
  "recommendedCourses": ["string", ...],
  "suggestedProjects": ["string", ...]
}`;

  const userPrompt = `목표 직무: ${roleName}
현재 전공: ${major || '공학계열'}
현재 보유 기술: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}`;

  const result = await callGemini(systemPrompt, userPrompt, fallback);
  res.json(result);
});

// Configure Vite or Static server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[MOBILITY CAREER] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
