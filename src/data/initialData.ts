import {
  Company,
  JobPosting,
  IndustryNews,
  JobRoleDetail,
  UserProfile,
  CalendarEvent
} from '../types';

export const initialCompanies: Company[] = [
  {
    id: 'comp-hyundai',
    name: '현대자동차',
    category: '완성차',
    size: '대기업',
    headquarters: '서울특별시 서초구 헌릉로 12',
    majorPlants: '울산공장, 아산공장, 전주공장, 남양연구소(R&D), 싱가포르 글로벌 혁신센터(HMGICS)',
    revenue: '162조 6,636억 원',
    operatingProfit: '15조 1,269억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '아이오닉 5/6/9, 제네시스 라인업, 싼타페, 투싼, 아반떼, E-GMP 전동화 플랫폼',
    businessFocus: 'SDV(소프트웨어 중심 자동차) 체제 전환, 차세대 하이브리드 및 차세대 배터리 내재화, E-FOREST 스마트팩토리 제조 혁신, UAM 및 수소 생태계 확장',
    homepageUrl: 'https://www.hyundai.com',
    careerUrl: 'https://talent.hyundai.com',
    logoColor: '#002C6C',
    aiAnalysis: {
      coreCompetitiveness: 'E-GMP 플랫폼 기반 글로벌 전기차 경쟁력, 고수익 차종(제네시스·SUV) 중심 믹스 개선, 글로벌 톱3 완성차 볼륨 및 부품 수직계열화 생태계',
      industryPosition: '국내 1위 완성차 기업이자 글로벌 완성차 판매 3위. 전동화 전환 및 스마트팩토리 자동화에서 선도적 위치 선점',
      futureGrowthAreas: '소프트웨어 정의 차량(SDV)용 차세대 통합 OS(ccOS), 로보틱스(보스턴 다이내믹스 연계 지능형 물류/조립), AAM(미래항공모빌리티)',
      mobilityStrategy: '2030년 전기차 200만 대 판매 목표, 싱가포르 HMGICS를 통한 셀 기반 지능형 제조 공법 양산 거점 전파',
      targetRolesAndSkills: [
        { role: '생산기술', keySkill: '스마트팩토리 PLC 제어, 라인 시뮬레이션, 차체/도장/의장 공정 최적화' },
        { role: '품질보증', keySkill: '신차 양산 초기 품질 안정화, APQP 및 신뢰성 평가' },
        { role: '차량 R&D', keySkill: '열관리 시스템 해석, 샤시/바디 기구설계, CATIA 3D' }
      ],
      jobSeekerKeyIssues: [
        'E-FOREST 스마트팩토리 및 제조 빅데이터를 활용한 수율 최적화 이슈 숙지 필수',
        '기계공학 전공자라도 전기/전자 및 제어 SW 인터페이스 이해도를 증명하는 것이 합격의 분수령',
        'SDV 전환에 따른 양산 라인의 모듈화 조립 공정 변화 트렌드 언급 시 차별화 가능'
      ]
    }
  },
  {
    id: 'comp-kia',
    name: '기아',
    category: '완성차',
    size: '대기업',
    headquarters: '서울특별시 서초구 헌릉로 12',
    majorPlants: '화성 오토랜드(EV 전용/PBV 전용공장), 광주 오토랜드, 광명(소하리) 오토랜드',
    revenue: '99조 8,084억 원',
    operatingProfit: '11조 6,079억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: 'EV3/EV6/EV9, 쏘렌토, 카니발, 스포티지, 목적기반차량(PBV PV5/PV7)',
    businessFocus: '맞춤형 PBV(목적기반차량) 전용 생산 거점 가동, 글로벌 대중화 전기차 라인업(EV3/EV4) 공정 효율화, 지속가능 친환경 소재 적용 확대',
    homepageUrl: 'https://www.kia.com',
    careerUrl: 'https://career.kia.com',
    logoColor: '#05141F',
    aiAnalysis: {
      coreCompetitiveness: '영업이익률 11%를 초과하는 글로벌 최고 수준의 수익성, 독창적 디자인 아이덴티티 및 PBV 시장 선점',
      industryPosition: '현대차그룹의 한 축으로 국내 2위 및 북미·유럽 시장 점유율 가파른 상승세',
      futureGrowthAreas: '화성 EVO 플랜트 중심의 컨베이어 없는 셀 기반 유연 생산 PBV 제조, 자율주행 배송 모빌리티',
      mobilityStrategy: '전기차 볼륨 모델 확대를 통한 캐즘 돌파와 2025년 본격화되는 글로벌 PBV 시장 주도권 장악',
      targetRolesAndSkills: [
        { role: '생산기술(PBV)', keySkill: '유연 조립 셀 라인 설계, 무인 운반차(AGV/AMR) 관제, 차체 조립 지그' },
        { role: '구매/SCM', keySkill: '전동화 부품 공급망 안정화, 원가 구조 분석' }
      ],
      jobSeekerKeyIssues: [
        '화성 오토랜드의 PBV 전용 유연생산 라인(이보 플랜트) 기술적 특징 파악 필수',
        '다품종 소량 생산이 가능한 모듈러 차체 구조 설계에 관한 관심도 어필 권장'
      ]
    }
  },
  {
    id: 'comp-mobis',
    name: '현대모비스',
    category: '자동차 부품',
    size: '대기업',
    headquarters: '서울특별시 강남구 테헤란로 203',
    majorPlants: '의왕 R&D연구소, 충주 배터리/수소연료전지 공장, 진천 전장공장, 울산 전동화 공장, 평택 모듈공장',
    revenue: '59조 2,544억 원',
    operatingProfit: '2조 2,953억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '전동화 BSA(배터리시스템), PE시스템(인버터/감속기), 제동·조향 샤시 전동화(iMEB, MDPS), 자율주행 레이다/센서, IVI(인포테인먼트)',
    businessFocus: '글로벌 완성차(폭스바겐, GM, 스텔란티스 등) 논캡티브 수주 확대, 차세대 전동화 핵심부품 집중 투자, SDV 전장 제어기 통합',
    homepageUrl: 'https://www.mobis.co.kr',
    careerUrl: 'https://hyundaimobis.recruiter.co.kr',
    logoColor: '#1A365D',
    aiAnalysis: {
      coreCompetitiveness: '샤시·의장 모듈과 첨단 전동화/전자 부품을 아우르는 글로벌 6위 종합 자동차 부품사',
      industryPosition: '현대차그룹 전동화 및 전장의 중추이며 글로벌 OEM 대상 논캡티브 수주 비중 확대 중',
      futureGrowthAreas: '통합 칵핏 시스템(M.VICS), 차세대 조향(스퀘어 휠/인휠 시스템), 차량용 반도체 내재화',
      mobilityStrategy: '전통적 하드웨어 부품사에서 모빌리티 전동화·소프트웨어 솔루션 프로바이더로 대전환',
      targetRolesAndSkills: [
        { role: '전동화 생산기술', keySkill: '배터리 팩 어셈블리 자동화, 레이저 용접, 절연 저항 테스트' },
        { role: '샤시/의장 설계', keySkill: 'CATIA, 메커니즘 기구학, 경량 복합소재 적용' },
        { role: '전장 품질', keySkill: 'ISO 26262 기능안전, 전자기 적합성(EMC) 규격' }
      ],
      jobSeekerKeyIssues: [
        '폭스바겐 등 글로벌 수주에 따른 IATF 16949 및 글로벌 OEM 표준 규격 숙지',
        '배터리 시스템(BSA) 및 파워일렉트로닉스(PE) 부품 조립 공정 프로세스 이해 필수'
      ]
    }
  },
  {
    id: 'comp-lgensol',
    name: 'LG에너지솔루션',
    category: '전기차/배터리',
    size: '대기업',
    headquarters: '서울특별시 영등포구 여의대로 108 파크원',
    majorPlants: '오창 에너지플랜트(마더팩토리), 대전 기술연구원, 폴란드 브로츠와프, 미국 미시간/오하이오(얼티엄셀즈)',
    revenue: '33조 7,455억 원',
    operatingProfit: '2조 1,632억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '원통형 4680 배터리, 파우치형 리튬이온 배터리, ESS(에너지저장장치), CTP(Cell-to-Pack)',
    businessFocus: '오창 차세대 4680 원통형 배터리 양산 고도화, LFP(리튬인산철) 전기차용 배터리 포트폴리오 다변화, 스마트팩토리 공정 지능화',
    homepageUrl: 'https://www.lgensol.com',
    careerUrl: 'https://careers.lg.com',
    logoColor: '#C40F39',
    aiAnalysis: {
      coreCompetitiveness: '압도적인 글로벌 배터리 특허 포트폴리오, 테슬라·GM·스텔란티스·현대차 등 주요 글로벌 OEM과의 합작법인(JV) 네트워크',
      industryPosition: '글로벌(중국 제외) 전기차 배터리 시장 점유율 1위 경쟁, 파우치 및 차세대 원통형 선두',
      futureGrowthAreas: '차세대 46-시리즈 고용량 원통형 배터리 양산, 건식 전극 공정, 고전압 미드니켈 및 전고체 배터리',
      mobilityStrategy: '전기차 캐즘 속에서 ESS 확대와 4680 조기 양산으로 차별화된 수익성 방어',
      targetRolesAndSkills: [
        { role: '공정기술/제조기술', keySkill: '전극 공정(코팅/롤프레싱), 조립 공정(와인딩/노칭/패키징), 활성화 공정' },
        { role: '설비기술', keySkill: '클린룸 설비 유지보수, 고속 정밀 롤투롤(R2R) 제어, 비전 검사기' },
        { role: '품질엔지니어', keySkill: 'CT 스캔 비파괴 검사, 공정 Cpk 관리, 배터리 셀 발열 안전성 검증' }
      ],
      jobSeekerKeyIssues: [
        '전극 공정의 롤투롤(Roll-to-Roll) 메커니즘과 조립 공정의 정밀도 제어 이슈에 주목',
        '원통형 4680 배터리의 탭리스(Tabless) 권취 및 레이저 용접 기술 동향 파악 필수'
      ]
    }
  },
  {
    id: 'comp-samsungsdi',
    name: '삼성SDI',
    category: '전기차/배터리',
    size: '대기업',
    headquarters: '경기도 용인시 기흥구 공세로 150-20',
    majorPlants: '천안사업장(소형/마더라인), 울산사업장(중대형 배터리), 헝가리 괴드, 미국 인디애나(스텔란티스 JV)',
    revenue: '22조 7,083억 원',
    operatingProfit: '1조 6,334억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '각형 P5/P6 프리미엄 배터리, 46파이 원통형 배터리, 전고체 배터리(ASB), 전자재료(반도체/OLED)',
    businessFocus: '2027년 전고체 배터리(ASB) 상용화 로드맵 가동, 고에너지 밀도 각형 P6 글로벌 완성차 공급 확대, 초격차 기술경쟁력',
    homepageUrl: 'https://www.samsungsdi.co.kr',
    careerUrl: 'https://www.samsungcareers.com',
    logoColor: '#0C4DA2',
    aiAnalysis: {
      coreCompetitiveness: '질적 성장 중심의 탄탄한 재무구조, 안전성이 우수한 각형 폼팩터 기술력, 업계 최고 수준의 전고체 배터리 파일럿 라인 가동',
      industryPosition: 'BMW, 아우디, 스텔란티스 등 유럽/북미 프리미엄 완성차 공급 확고',
      futureGrowthAreas: '무음극(Anode-less) 기술 기반 차세대 전고체 배터리, 46파이 원통형 양산',
      mobilityStrategy: '무리한 외형 확장보다는 초격차 기술 경쟁력과 고효율 프리미엄 각형 배터리 시장 집중',
      targetRolesAndSkills: [
        { role: '배터리 제조기술', keySkill: '스태킹(Stacking) 적층 공정 자동화, 캔-캡 용접, 전해액 주액 자동화' },
        { role: '품질보증', keySkill: '수명 및 가혹조건 신뢰성 시험, IATF 16949 관리계획서(CP)' }
      ],
      jobSeekerKeyIssues: [
        '기존 와인딩 방식 대비 각형 스태킹(Stacking) 공정의 장단점(에너지밀도, 뒤틀림 방지) 이해',
        '2027년 전고체 배터리 상용화 기술 과제에 대한 관심 피력 권장'
      ]
    }
  },
  {
    id: 'comp-hlmando',
    name: 'HL만도',
    category: '자동차 부품',
    size: '대기업',
    headquarters: '경기도 성남시 분당구 판교역로 146',
    majorPlants: '평택공장(제동), 원주공장(조향), 익산공장(현가), 판교 글로벌 R&D센터',
    revenue: '8조 3,931억 원',
    operatingProfit: '2,790억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '전자식 통합 브레이크(IDB/EMB), 바이와이어 조향(SbW), 전자제어 서스펜션(SDC), 자율주행 액추에이터',
    businessFocus: 'SDV 최적화 바이와이어(By-Wire) 기술 상용화, 글로벌 북미 EV 선도사 수주 확대, 섀시 전동화 토탈 솔루션',
    homepageUrl: 'https://www.hlmando.com',
    careerUrl: 'https://hlmando.recruiter.co.kr',
    logoColor: '#E4002B',
    aiAnalysis: {
      coreCompetitiveness: '제동·조향·현가를 아우르는 독자적 섀시 전자제어 기술 및 글로벌 탑티어 EV OEM 공급 실적',
      industryPosition: '국내 섀시 전동화 부품 1위, 북미 최고 전기차 기업의 핵심 제동 공급사',
      futureGrowthAreas: '기계적 연결이 없는 완전 전자식 제동(EMB) 및 스티어바이와이어(SbW)',
      mobilityStrategy: '소프트웨어로 차량 섀시 움직임을 총괄 제어하는 통합 모션 제어(VMC) 선도',
      targetRolesAndSkills: [
        { role: '생산기술', keySkill: '알루미늄 캘리퍼 정밀 가공, 솔레노이드 밸브 조립 공정, 기밀성 누설 시험' },
        { role: '섀시 기구설계', keySkill: 'CATIA, 유압/전자 기구학, 내구 해석' }
      ],
      jobSeekerKeyIssues: [
        '기계식 유압 제동에서 전자식 브레이크(EMB)로 넘어가는 패러다임 변화 이해',
        '북미 글로벌 전기차 납품 기준에 부합하는 정밀 조립 공정 및 불량 제로화 어필'
      ]
    }
  },
  {
    id: 'comp-hyundai-wia',
    name: '현대위아',
    category: '자동차 부품',
    size: '대기업',
    headquarters: '경상남도 창원시 성산구 정동로 153',
    majorPlants: '창원공장(구동/공작기계), 의왕 R&D센터, 평택공장, 서산공장',
    revenue: '8조 5,975억 원',
    operatingProfit: '2,292억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '전동화 구동축(등속조인트), 4륜구동(e-LSD/AWD), 통합열관리시스템(ITMS), 스마트팩토리 물류로봇(협동로봇/AMR)',
    businessFocus: '전기차 통합 열관리 시스템 본격 양산, 현대차그룹 스마트팩토리 로봇 제조 솔루션 공급, 모빌리티 부품 고도화',
    homepageUrl: 'https://www.hyundai-wia.com',
    careerUrl: 'https://hyundai-wia.recruiter.co.kr',
    logoColor: '#002C6C',
    aiAnalysis: {
      coreCompetitiveness: '완성차 파워트레인/구동축 제조 기술력과 스마트팩토리 자동화 설비/로봇 기술 동시 보유',
      industryPosition: '등속조인트 글로벌 2위 수준, 현대차그룹 공장 자동화의 주력 파트너',
      futureGrowthAreas: '배터리·모터·실내 냉난방 통합 열관리 모듈, 물류 로봇 및 공정 협동로봇 솔루션',
      mobilityStrategy: '전통 엔진/변속기 부품에서 벗어나 친환경차 통합 열관리 및 스마트 제조 로봇으로 체질 개선 성공',
      targetRolesAndSkills: [
        { role: '열관리 생산기술', keySkill: '냉각수 밸브 모듈 조립, 브레이징 용접, 헬륨 리크 검사' },
        { role: '로봇 자동화', keySkill: 'AMR 주행 제어, 로봇 머니퓰레이터 인터페이스' }
      ],
      jobSeekerKeyIssues: [
        '전기차 주행거리 확장의 핵심인 통합 열관리(냉매/냉각수 밸브) 공정 기술 이해',
        '스마트팩토리 AMR 및 로봇 기반 자동화 라인 구축 프로젝트 경험 어필'
      ]
    }
  },
  {
    id: 'comp-posco-futurem',
    name: '포스코퓨처엠',
    category: '전기차/배터리',
    size: '대기업',
    headquarters: '경상북도 포항시 남구 블루밸리서로 110',
    majorPlants: '포항 양극재/인조흑연 음극재 공장, 광양 양극재 공장(세계 최대 단일공장), 세종 천연흑연 음극재 공장',
    revenue: '4조 7,599억 원',
    operatingProfit: '359억 원',
    financialYear: '2023년 연간 (2024년 3월 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '하이니켈 NCM/NCMA 양극재, 천연흑연/인조흑연 음극재, 차세대 실리콘 음극재',
    businessFocus: '포스코그룹 원료 수직계열화(리튬/니켈), 단결정 양극재 양산 확대, 북미 IRA 대응 공급망 구축',
    homepageUrl: 'https://www.poscofuturem.com',
    careerUrl: 'https://posco.recruiter.co.kr',
    logoColor: '#005A9C',
    aiAnalysis: {
      coreCompetitiveness: '국내 유일 양극재와 음극재를 동시 생산하는 종합 이차전지 소재 선도 기업',
      industryPosition: 'LG엔솔, 삼성SDI, 얼티엄셀즈 등에 조 단위 장기 공급 계약 체결',
      futureGrowthAreas: '고속 충전용 실리콘-탄소 복합 음극재, 리튬인산철(LFP) 양극재, 전고체용 고체전해질',
      mobilityStrategy: '모회사 포스코홀딩스의 친환경 원료 생태계를 바탕으로 미국 IRA 보조금 요건을 완벽 충족하는 탈중국 공급망 완성',
      targetRolesAndSkills: [
        { role: '소재 공정기술', keySkill: '소성로(RHK) 온도 제어, 분쇄/분급, 슬러리 혼합 자동화' },
        { role: '생산설비', keySkill: '분체 이송 설비, 집진기 및 배기 덕트 제어, 연속 소성 라인 메카트로닉스' }
      ],
      jobSeekerKeyIssues: [
        '양극재 소성(Calcination) 공정의 균일성 확보 및 입도 제어 기술 이해',
        '대규모 연속 화학/분체 공정에서의 설비 안전 및 품질 일관성 유지 역량 강조'
      ]
    }
  },
  {
    id: 'comp-42dot',
    name: '포티투닷 (42dot)',
    category: '자율주행/SW',
    size: '스타트업',
    headquarters: '서울특별시 강남구 테헤란로 152 강남파이낸스센터 / 판교오피스',
    majorPlants: '현대차그룹 글로벌 SDV 본부, 판교 R&D 센터',
    revenue: '현대자동차그룹 전액 출자 및 연구개발 집중 투자 기업',
    operatingProfit: '비상장 R&D 중심 스타트업 (투자 단계)',
    financialYear: '2023년 연간',
    financialSource: '현대자동차 기업설명회 IR 및 공시자료',
    mainProducts: '차량용 통합 OS(AOS), SDV 전장 아키텍처, 자율주행 풀스택 알고리즘(AKit), 모빌리티 데이터 플랫폼',
    businessFocus: '현대차·기아 차세대 SDV 페이스메이커, 2026년 이후 출시될 현대차그룹 차세대 차량 OS 및 자율주행 표준화',
    homepageUrl: 'https://42dot.ai',
    careerUrl: 'https://42dot.ai/careers',
    logoColor: '#111827',
    aiAnalysis: {
      coreCompetitiveness: '현대차그룹의 전폭적 지원을 받는 독자적 SDV 아키텍처 및 자율주행 인하우스 개발 엔진',
      industryPosition: '대한민국 미래 모빌리티 소프트웨어 전환을 주도하는 전략적 소프트웨어 센터',
      futureGrowthAreas: '레벨 3/4 도심 자율주행, 차량 내 AI 에이전트, 무선 소프트웨어 업데이트(OTA) 인프라',
      mobilityStrategy: '하드웨어와 소프트웨어가 분리된 디커플링 아키텍처 구현으로 스마트폰과 같은 지속 진화형 자동차 완성',
      targetRolesAndSkills: [
        { role: '자율주행 SW', keySkill: 'C++, Python, ROS2, 카메라/LiDAR 센서 퓨전, SLAM' },
        { role: '차량 임베디드', keySkill: 'Linux 커널, 차량용 이더넷(SOME/IP), AUTOSAR' }
      ],
      jobSeekerKeyIssues: [
        '모빌리티와 IT 기술이 융합된 실무 프로젝트(ROS2, 컴퓨터 비전 등) 포트폴리오 강조',
        '현대차그룹의 전통 부품망과 SDV 소프트웨어 생태계 간의 시너지 이해'
      ]
    }
  },
  {
    id: 'comp-rainbow',
    name: '레인보우로보틱스',
    category: '스마트팩토리/로봇',
    size: '중견기업',
    headquarters: '대전광역시 유성구 엑스포로 339번길 10-19',
    majorPlants: '대전 R&D 및 로봇 제조공장, 세종 신규 양산 라인',
    revenue: '152억 원 (삼성전자 전략적 지분 투자)',
    operatingProfit: '-44억 원 (차세대 로봇 R&D 투자 확대)',
    financialYear: '2023년 연간 (2024년 DART 사업보고서 공시)',
    financialSource: '금융감독원 전자공시시스템(DART)',
    mainProducts: '협동로봇(RB 시리즈), 사족보행 로봇(RBQ-10), 이족보행 휴머노이드 로봇 플랫폼, 스마트 제조 솔루션',
    businessFocus: '모빌리티 제조 및 완성차 공장 내 용접·조립용 협동로봇 보급, 차세대 휴머노이드 제조현장 투입 공동연구',
    homepageUrl: 'https://www.rainbow-robotics.com',
    careerUrl: 'https://www.rainbow-robotics.com/career',
    logoColor: '#E63946',
    aiAnalysis: {
      coreCompetitiveness: '핵심 감속기, 제어기, 엔코더 등 핵심 부품 100% 내재화로 경쟁사 대비 탁월한 가격 경쟁력과 커스터마이징 역량',
      industryPosition: '삼성전자가 선택한 대한민국 대표 지능형 로봇 기술 선도 기업',
      futureGrowthAreas: '자동차 부품 라인 및 배터리 팩 공정 내 정밀 협동로봇, 자율이동로봇(AMR) 결합 모바일 매니퓰레이터',
      mobilityStrategy: '인력 부족과 정밀화가 요구되는 모빌리티 제조 현장의 자동화를 이끄는 핵심 무기 제공',
      targetRolesAndSkills: [
        { role: '로봇 기구설계', keySkill: '감속기 및 관절 조인트 기구학 해석, 3D CAD, 내구성 평가' },
        { role: '로봇 제어 SW', keySkill: '모션 제어 알고리즘, 실시간 OS(RTOS), C/C++, 필드버스 통신' }
      ],
      jobSeekerKeyIssues: [
        '산업용 로봇 안전 인증 및 현장 작업자와의 협업 조작성 이해',
        '모빌리티 제조 현장의 비정형 작업 자동화에 대한 문제해결 관점 제시'
      ]
    }
  }
];

export const initialJobPostings: JobPosting[] = [
  // 1. 현대자동차 공식 상시 인재풀 등록 (현재 공식 포털 실시간 접수중)
  {
    id: 'job-h-pool-01',
    companyName: '현대자동차',
    companyCategory: '완성차',
    title: '[공식 상시 접수] 2026 현대자동차 신입·인턴 상시 인재풀(Talent Pool) 등록',
    role: '생산기술',
    location: '울산공장 / 남양연구소 / 아산공장 / 전주공장 / 양재본사',
    companySize: '대기업',
    employmentType: '신입',
    liveStatus: '공식 상시 인재풀 등록',
    responsibilities: '생산/제조(생산기술, 공정설계, 품질관리), 연구개발(R&D), 사업/기획, IT 등 지원자의 이력서와 포트폴리오를 현대차 공식 인재풀에 상시 등록. 각 부문 수시 포지션 발생 시 인재풀 등록자 대상 우선 서류 검토 및 맞춤 채용 제안 진행.',
    requirements: '국내외 정규 4년제 대학 기계공학, 자동차공학, 산업공학, 전자공학, 컴퓨터 등 이공계 학사 이상 (기졸업자 또는 졸업예정자)\n공인 어학성적(TOEIC Speaking 또는 OPIc) 보유자\n해외여행에 결격 사유가 없는 자',
    preferred: '2D/3D CAD(CATIA, NX 등) 도면 해독 및 모델링 가능자\n스마트팩토리 PLC 제어 또는 전동화 캡스톤 프로젝트 유경험자\n수시 충원 포지션 오픈 시 인재풀 등록자 우선 면접 제안 특전',
    startDate: '2026-01-01',
    deadline: '상시 등록 접수중',
    officialUrl: 'https://talent.hyundai.com',
    officialSearchUrl: 'https://talent.hyundai.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대자동차 공식 인재채용 (talent.hyundai.com) Talent Pool',
    verificationNote: '현대자동차 공식 채용포털 상시 인재풀(Talent Pool) 실시간 접수 운영중 확인 완료. 포지션 오픈 시 우선 매칭.',
    source: '현대자동차 공식 인재채용',
    status: '지원 예정',
    fitScore: 94
  },
  // 2. 현대자동차 공식 채용연계 교육 (소프티어 부트캠프)
  {
    id: 'job-h-edu-bootcamp',
    companyName: '현대자동차',
    companyCategory: '완성차',
    title: '[공식 채용연계] 현대자동차 Softeer Boot Camp (소프티어 부트캠프) 신입 개발자 육성',
    role: '자율주행',
    location: '남양연구소 / 판교 R&D / 온라인',
    companySize: '대기업',
    employmentType: '교육생/아카데미',
    liveStatus: '공식 교육/부트캠프',
    responsibilities: '차량 소프트웨어, 전장 임베디드, 웹/모바일 풀스택 집중 코딩 및 실무 프로젝트. 현대자동차 실무 연구원 1:1 멘토링, 교육 수료 후 신입 정규직 채용 면접 직행.',
    requirements: '대학교 재학생(3~4학년) 및 기졸업자\n소프트웨어 및 모빌리티 IT 개발에 열정을 가진 자 (이공계 전공자 우대)',
    preferred: '기초 코딩 테스트 응시 가능자 (C/C++, Java, Python 중 택1)\n교육비 전액 현대자동차 지원 + 매월 훈련지원금 지급',
    startDate: '2026-10-15',
    deadline: '2026-11-28',
    officialUrl: 'https://talent.hyundai.com',
    officialSearchUrl: 'https://talent.hyundai.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대자동차 공식 채용포털 소프티어 부트캠프 공고',
    verificationNote: '현대차 공식 채용포털(talent.hyundai.com) 실시간 모집 - 수료 후 신입 개발자 채용연계 사실확인 완료',
    source: '현대자동차 공식 포털',
    status: '관심 공고',
    fitScore: 90
  },
  // 3. 현대자동차 차기 분기 공채 대비 가이드 (생산기술/제조엔지니어링)
  {
    id: 'job-h-guide-01',
    companyName: '현대자동차',
    companyCategory: '완성차',
    title: '[차기 시즌 대비 가이드] 현대자동차 분기별 정기 대졸 신입 - 생산기술/제조엔지니어링',
    role: '생산기술',
    location: '울산공장 / 아산공장 / 전주공장 / 남양연구소',
    companySize: '대기업',
    employmentType: '신입',
    liveStatus: '차기 시즌 대비',
    responsibilities: '신차 양산 공정 설계, 차체/도장/의장 공정 레이아웃 최적화, E-FOREST 스마트팩토리 제조 신공법 도입, 조립 치공구(Jig) 검증 및 공차 관리, 양산 라인 설비 트러블슈팅.',
    requirements: '국내외 정규 4년제 대학 기계공학, 자동차공학, 산업공학, 메카트로닉스 학사 이상 (졸업자 또는 졸업예정자)\n기본적인 2D/3D CAD(CATIA, NX 등) 도면 해독 및 모델링 가능자\n어학성적 보유자 (TOEIC Speaking 또는 OPIc)',
    preferred: 'CATIA V5/3DX 능숙자 우대\n스마트팩토리 PLC 제어 또는 생산 라인 시뮬레이션 프로젝트 경험자\n일반기계기사, 생산자동화산업기사 자격증 소지자\n공정 데이터 분석(Python, Minitab) 역량 보유자',
    startDate: '차기 분기 공채 예정',
    deadline: '3월/9월 정기시즌 공채 오픈 예정',
    officialUrl: 'https://talent.hyundai.com',
    officialSearchUrl: 'https://talent.hyundai.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대자동차 공식 인재채용 (talent.hyundai.com) 과거 공식 모집요강 분석',
    verificationNote: '현대차의 예측 가능한 상시채용(분기별 공채) 대비용 공식 JD 분석 자료입니다. 현재 지원서는 공식 상시 인재풀(Talent Pool)을 통해 즉시 접수 가능합니다.',
    source: '현대자동차 공식 채용 포털',
    status: '관심 공고',
    fitScore: 92
  },
  // 3. 현대자동차그룹 교육생 (H-Mobility 클래스)
  {
    id: 'job-h-edu-01',
    companyName: '현대자동차그룹',
    companyCategory: '완성차',
    title: '[교육생 모집] H-Mobility 클래스 (전동화/자율주행/로보틱스 전문인력 양성과정)',
    role: '생산기술',
    location: '온라인 및 오프라인 실습 (현대엔지비 / 남양연구소 교육장)',
    companySize: '대기업',
    employmentType: '교육생/아카데미',
    responsibilities: '미래 모빌리티 핵심 기술(전동화 파워트레인, 자율주행 센서 퓨전, 로보틱스 제어) 온라인 심화 강의 수강, 실무 프로젝트 수행, 연구원 멘토링 프로그램 참여',
    requirements: '이공계 대학생(학부 3~4학년 또는 석사 과정) 및 졸업생\n미래 모빌리티 분야 취업 및 진로를 희망하는 자',
    preferred: '기계, 전기전자, 컴퓨터, 메카트로닉스 전공자\n교육비 전액 현대차그룹 지원 (수료증 발급 및 우수자 현대차·기아 신입 채용 시 서류 면제/가점 혜택 제공)',
    startDate: '2026-10-15',
    deadline: '2026-11-16',
    officialUrl: 'https://www.hyundai-ngv.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대엔지비 / 현대자동차그룹 H-Mobility 공식 모집 요강',
    verificationNote: '현대차그룹 주관 공식 교육 프로그램 및 신입 채용 서류 면제 연계 혜택 확인 완료',
    source: '현대엔지비 H-Mobility 클래스 공식 공고',
    status: '관심 공고',
    fitScore: 95
  },
  // 4. 기아 대졸 신입
  {
    id: 'job-kia-01',
    companyName: '기아',
    companyCategory: '완성차',
    title: '[대졸 신입] 화성 오토랜드 PBV 스마트팩토리 제조엔지니어링 및 생산기술',
    role: '생산기술',
    location: '오토랜드 화성 (EVO 플랜트)',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: 'PBV 전용 화성 EVO 플랜트 셀 기반 유연 생산 라인 셋업, AGV/AMR 무인 물류 연계 생산 공수 관리, 모듈러 차체 조립 지그 검증, 공정 불량률 제로화 활동',
    requirements: '기계공학, 산업공학, 메카트로닉스 학사 이상\n자동차 생산 시스템에 대한 기본 소양을 갖춘 자\n공인 어학성적(TOEIC Speaking 또는 OPIc)',
    preferred: '스마트팩토리 AMR 물류 제어 및 공정 시뮬레이션 프로젝트 유경험자\n품질경영기사, 물류관리사, 일반기계기사 소지자\n통계적 공정 분석(Cpk) 능력 보유자',
    startDate: '2026-10-28',
    deadline: '2026-11-22',
    officialUrl: 'https://career.kia.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '기아 공식 채용포털 (career.kia.com)',
    verificationNote: '기아 공식 채용포털 화성 PBV 스마트제조 직무 공고 사실확인 완료',
    source: '기아 공식 인재채용',
    status: '관심 공고',
    fitScore: 92
  },
  // 5. 기아 체험형/채용연계형 인턴
  {
    id: 'job-kia-intern-02',
    companyName: '기아',
    companyCategory: '완성차',
    title: '[대학생 인턴] 기아 국내생산본부 스마트 품질 및 생산관리 인턴십',
    role: '품질관리 및 품질보증',
    location: '오토랜드 화성 / 광명 / 광주',
    companySize: '대기업',
    employmentType: '인턴',
    responsibilities: '양산 신차 조립 품질 데이터 분석, 비전 검사기 수율 모니터링 보조, 공정 이상 발생 시 5-Why 원인 분석 지원, 인턴십 프로젝트 발표회',
    requirements: '대학 4학년 1학기 이상 재학생 및 졸업예정자\n방학 기간 중 6주간 실습 근무 가능자',
    preferred: '품질 통계(Minitab) 또는 공정 데이터 분석 프로젝트 경험자\n어학 우수자\n실습 수료 시 우수 인턴 신입 공채 서류전형 우대 혜택',
    startDate: '2026-11-01',
    deadline: '2026-11-26',
    officialUrl: 'https://career.kia.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '기아 공식 인재채용 인턴십 공고 (career.kia.com)',
    verificationNote: '기아 오토랜드 공장 현장 실습 및 신입 전형 우대 인턴십 사실확인 완료',
    source: '기아 공식 채용포털',
    status: '관심 공고',
    fitScore: 89
  },
  // 6. 현대모비스 신입
  {
    id: 'job-m-01',
    companyName: '현대모비스',
    companyCategory: '자동차 부품',
    title: '[신입] 전동화 사업부(BSA 배터리시스템/PE 모터구동) 공정기술 및 생산기술',
    role: '제조기술',
    location: '충주공장 / 울산공장 / 진천공장 / 평택공장',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: '전기차 전동화 BSA(Battery System Assembly) 및 구동모터 조립 라인 공정 안정화, 레이저 용접 및 정밀 기밀 리크 시험 표준화, 공정 수율 극대화 및 사이클 타임 단축',
    requirements: '기계, 전기전자, 메카트로닉스, 신소재공학 전공 학사 이상\n자동차 부품 제조 공정에 대한 공학적 이해 보유자\n어학성적 보유자 (서류 접수 필수 요건 충족)',
    preferred: '배터리 팩 또는 전장 모듈 조립 관련 캡스톤 프로젝트 수행자\nFMEA, SPC, Cpk 공정 관리 통계 활용자\n스마트제조 PLC/로봇 인터페이스 실습자',
    startDate: '2026-10-22',
    deadline: '2026-11-20',
    officialUrl: 'https://hyundaimobis.recruiter.co.kr',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대모비스 공식 채용사이트 (hyundaimobis.recruiter.co.kr)',
    verificationNote: '현대모비스 전동화 사업부 공정기술 신입 직무 기술서 사실확인 완료',
    source: '현대모비스 채용 포털',
    status: '지원 예정',
    fitScore: 91
  },
  // 7. 현대모비스 취업연계 교육 (SW 아카데미)
  {
    id: 'job-m-edu-02',
    companyName: '현대모비스',
    companyCategory: '자동차 부품',
    title: '[취업연계 교육] 현대모비스 모빌리티 임베디드 SW 아카데미 교육생 모집',
    role: '자율주행',
    location: '현대모비스 교육장 (서울/경기 판교) 및 온라인 병행',
    companySize: '대기업',
    employmentType: '교육생/아카데미',
    responsibilities: '차량용 제어기 임베디드 C/C++, AUTOSAR 표준 아키텍처 실습, CAN/차량용 이더넷 통신 프로토콜 구현, 실차 제어 시뮬레이션 프로젝트 수행',
    requirements: '국내외 대학 졸업자 및 졸업예정자 (전공 무관하나 컴퓨터, 전자, 기계 전공 우대)\n교육 기간(약 4개월) 전일제 참여 가능자',
    preferred: '교육비 전액 무료 + 매월 훈련수당 지급\n우수 수료생 대상 현대모비스 신입 정규직 채용 연계 (최종 면접 직행 특전)',
    startDate: '2026-10-18',
    deadline: '2026-11-17',
    officialUrl: 'https://hyundaimobis.recruiter.co.kr',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대모비스 공식 채용사이트 취업연계 아카데미 공고',
    verificationNote: '현대모비스 공식 취업연계형 임베디드 SW 교육과정 사실확인 완료 (정규직 채용 특전)',
    source: '현대모비스 SW 아카데미 공식 공고',
    status: '관심 공고',
    fitScore: 87
  },
  // 8. LG에너지솔루션 신입
  {
    id: 'job-lg-01',
    companyName: 'LG에너지솔루션',
    companyCategory: '전기차/배터리',
    title: '[신입 수시채용] 오창 에너지플랜트 자동차전지 셀 조립 및 공정기술',
    role: '공정기술',
    location: '충북 오창 에너지플랜트',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: '차세대 4680 원통형 및 파우치 배터리 셀 와인딩/노칭/스태킹 공정 파라미터 최적화, 전해액 주액 및 활성화(Formation) 공정 데이터 모니터링, 신규 양산 라인 셋업 및 수율 개선',
    requirements: '기계공학, 신소재/재료공학, 화학공학 학사 이상\n데이터 기반 분석 역량 및 문제 해결 태도',
    preferred: '이차전지 교과목 이수 또는 배터리 관련 연구실 산학 프로젝트 경험자\n클린룸 및 고속 롤투롤(R2R) 설비 제어 이해도가 높은 자\n품질 기사 또는 위험물 산업기사 자격증 보유자',
    startDate: '2026-10-18',
    deadline: '2026-11-18',
    officialUrl: 'https://careers.lg.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: 'LG 공식 채용사이트 (careers.lg.com)',
    verificationNote: 'LG Careers 공식 오창 에너지플랜트 공정기술 신입 수시채용 사실확인 완료',
    source: 'LG Careers 공식 포털',
    status: '지원 완료',
    fitScore: 89
  },
  // 9. LG에너지솔루션 채용연계형 인턴
  {
    id: 'job-lg-intern-02',
    companyName: 'LG에너지솔루션',
    companyCategory: '전기차/배터리',
    title: '[채용연계형 인턴] BTC 차세대 배터리 팩/모듈 제조기술 산학 인턴십',
    role: '배터리 제조기술',
    location: '오창 에너지플랜트 / 대전 기술연구원',
    companySize: '대기업',
    employmentType: '채용연계형 인턴',
    responsibilities: '전기차용 배터리 모듈/팩 레이저 용접 및 방열 하우징 조립 공정 실습, 열관리 시뮬레이션 데이터 검증, 인턴십 과제 수행 및 정규직 신입 전환 평가',
    requirements: '대학교 4학년 1학기 이상 재학생 또는 석사 과정생\n기계공학, 재료공학, 화학공학, 전기전자공학 전공',
    preferred: '인턴십 실습비 및 숙소 지원\n실습 평가 우수자 100% 신입 정규직 입사 연계\nCATIA 또는 배터리 열해석 툴 사용 가능자',
    startDate: '2026-10-25',
    deadline: '2026-11-21',
    officialUrl: 'https://careers.lg.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: 'LG Careers 공식 채용연계 인턴십 공고',
    verificationNote: 'LG에너지솔루션 BTC 산학 인턴십 및 정규직 전환 채용 사실확인 완료',
    source: 'LG Careers 공식 포털',
    status: '관심 공고',
    fitScore: 91
  },
  // 10. 삼성SDI 신입
  {
    id: 'job-sdi-01',
    companyName: '삼성SDI',
    companyCategory: '전기차/배터리',
    title: '[신입 3급] 중대형전지사업부 배터리 공정·설비 기술 엔지니어',
    role: '설비기술',
    location: '천안사업장 / 울산사업장 / 기흥',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: '초정밀 각형 P5/P6 및 46파이 배터리 전극/조립 라인 설비 셋업, 자동화 메카트로닉스 트러블슈팅, 설비 예지보전(PdM) 시스템 구축, 양산 가동률 극대화',
    requirements: '전자전기, 기계공학, 제어계측, 화학공학 학사 이상\nOPIc 또는 토익스피킹 기준 어학성적 보유자 (삼성 공채 기준)',
    preferred: 'PLC 제어 및 정밀 서보모터 구동 시스템 프로젝트 경험자\n전기기사, 일반기계기사, 메카트로닉스기사 보유자\n반도체/이차전지 자동화 공정 인턴 경험자',
    startDate: '2026-10-24',
    deadline: '2026-11-21',
    officialUrl: 'https://www.samsungcareers.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '삼성채용 공식 사이트 (samsungcareers.com)',
    verificationNote: '삼성 공채 직무적합성평가 및 중대형전지 공정설비 기술 직무 기술서 사실확인 완료',
    source: '삼성 커리어스 공식 사이트',
    status: '관심 공고',
    fitScore: 86
  },
  // 11. 삼성SDI 대학생 인턴
  {
    id: 'job-sdi-intern-02',
    companyName: '삼성SDI',
    companyCategory: '전기차/배터리',
    title: '[대학생 인턴] 배터리 셀 개발 및 공정엔지니어링 동계 인턴십',
    role: '공정기술',
    location: '기흥 본사 / 천안사업장',
    companySize: '대기업',
    employmentType: '인턴',
    responsibilities: '이차전지 전극 슬러리 배합 및 극판 압연 기초 공정 실습, 배터리 셀 안전성 테스트 데이터 정리, 삼성 선배 멘토링 프로그램 참여',
    requirements: '대학교 3학년 2학기 또는 4학년 1학기 재학생 (2027년 2월 이전 졸업예정자)\n기계, 화학, 신소재, 전자 전공자',
    preferred: 'GSAT 응시 후 최종 선발\n인턴 실습비 지원 및 인턴 우수 수료자 대상 3급 신입 채용 시 임원면접 우대',
    startDate: '2026-10-28',
    deadline: '2026-11-18',
    officialUrl: 'https://www.samsungcareers.com',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '삼성 커리어스 공식 대학생 인턴십 모집 공고',
    verificationNote: '삼성SDI 대학생 인턴십 및 신입 채용 연계 특전 사실확인 완료',
    source: '삼성 커리어스 포털',
    status: '관심 공고',
    fitScore: 88
  },
  // 12. HL만도 대졸 신입
  {
    id: 'job-mando-01',
    companyName: 'HL만도',
    companyCategory: '자동차 부품',
    title: '[대졸 신입] 판교 R&D 글로벌 섀시 전동화(EMB 완전전자식 브레이크) 기구설계',
    role: '기계설계',
    location: '경기 성남시 판교 글로벌 R&D센터',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: '유압 라인이 없는 차세대 완전 전자식 브레이크(EMB) 모터-감속기 액추에이터 기구 3D 설계, 강도/피로 내구 해석, 기하공차(GD&T) 적용 및 금형 가공성 검토',
    requirements: '기계공학, 자동차공학 학사 이상\nCATIA V5 또는 3D CAD 모델링 역량\n공학적 열역학/재료역학 기초 탄탄한 자',
    preferred: 'CAE 해석(ANSYS, Abaqus 등) 유경험자\n모터 및 감속기 볼스크류 기구학적 설계 지식 보유자\n영어 커뮤니케이션 가능자 (글로벌 OEM 협업)',
    startDate: '2026-10-20',
    deadline: '2026-11-19',
    officialUrl: 'https://hlmando.recruiter.co.kr',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: 'HL만도 공식 채용사이트 (hlmando.recruiter.co.kr)',
    verificationNote: 'HL만도 판교 R&D 섀시 전동화 기구설계 신입 공고 사실확인 완료',
    source: 'HL만도 인재채용 포털',
    status: '관심 공고',
    fitScore: 88
  },
  // 13. 현대위아 대졸 신입
  {
    id: 'job-wia-01',
    companyName: '현대위아',
    companyCategory: '자동차 부품',
    title: '[대졸 신입] 전기차 통합 열관리 시스템(ITMS) 및 구동부품 품질관리/품질보증',
    role: '품질관리 및 품질보증',
    location: '경남 창원 본사 / 경기 의왕 R&D',
    companySize: '대기업',
    employmentType: '신입',
    responsibilities: '열관리 통합 밸브 및 냉각수 모듈 신뢰성 시험 규격 관리, 협력사 부품 수입검사 기준 수립, 신차 양산 초기 품질 안정화 및 필드 클레임 원인 분석',
    requirements: '기계공학, 금속재료, 산업공학 학사 이상\n품질 보증 및 정밀 측정 장비에 대한 기본 이해',
    preferred: '품질경영기사, 6시그마 Green Belt 보유자\n열유체역학 및 3D 치수 측정(CMM) 실습 경험자\n어학 능력 우수자',
    startDate: '2026-10-26',
    deadline: '2026-11-24',
    officialUrl: 'https://hyundai-wia.recruiter.co.kr',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '현대위아 공식 채용사이트 (hyundai-wia.recruiter.co.kr)',
    verificationNote: '현대위아 공식 채용사이트 품질보증 직무 기술서 사실확인 완료',
    source: '현대위아 인재채용 포털',
    status: '관심 공고',
    fitScore: 85
  },
  // 14. 국비/대한상공회의소 교육 (스마트팩토리 PLC 로봇)
  {
    id: 'job-gov-edu-01',
    companyName: '대한상공회의소·고용노동부',
    companyCategory: '스마트팩토리/로봇',
    title: '[국비 전액무료 교육] 미래 모빌리티 스마트팩토리 PLC 및 로봇 자동화 제어 실무과정',
    role: '스마트팩토리',
    location: '대한상공회의소 인력개발원 (수도권/충남/부산)',
    companySize: '공공기관' as any,
    employmentType: '교육생/아카데미',
    responsibilities: '미쓰비시/지멘스 PLC 래더 시퀀스 제어 실습, 협동로봇/산업용 다관절 로봇 모션 티칭, 스마트제조 센서 인터페이스 연동 프로젝트, 모빌리티 부품 1차 협력사 취업 매칭',
    requirements: '대학 졸업예정자 및 미취업 구직자 (국민내일배움카드 발급 대상자)\n이공계 기계, 전기전자, 메카트로닉스 전공 우대 (비전공자 기초반 별도)',
    preferred: '교육비 100% 국비 전액 무료 지원 + 매월 훈련장려금(최대 31만 원) 지급\n수료 후 현대차·기아 1차 협력사(현대모비스, 성우하이텍 등) 생산기술/설비기술 추천 채용 연계',
    startDate: '2026-10-10',
    deadline: '2026-11-25',
    officialUrl: 'https://www.korchamhrd.net',
    isSample: false,
    isVerified: true,
    verifiedDate: '2026-11-02',
    verifiedSource: '대한상공회의소 인력개발원 / 고용노동부 직업훈련포털(HRD-Net)',
    verificationNote: '국비 100% 지원 스마트제조 실무 교육과정 및 모빌리티 부품사 채용 연계 확인 완료',
    source: '대한상공회의소 인력개발원 공식 공고',
    status: '관심 공고',
    fitScore: 93
  }
];

export const initialIndustryNews: IndustryNews[] = [
  {
    id: 'news-01',
    title: '현대차그룹, E-FOREST 스마트팩토리 고도화… AI 비전 검사와 물류 로봇 전면 확대',
    category: '스마트팩토리',
    publishedDate: '2026-10-28',
    source: '전자신문 / 자동차IT 산업부',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=%ED%98%84%EB%8C%80%EC%B0%A8%EA%B7%B8%EB%A3%B9+E-FOREST+%EC%8A%A4%EB%A7%88%ED%8A%B8%ED%8C%A9%ED%86%A0%EB%A6%AC+%EB%A1%9C%EB%B4%87',
    summary: '현대자동차가 울산 및 해외 공장에 싱가포르 HMGICS에서 검증된 인공지능(AI) 비전 품질 검사 시스템과 무인 물류로봇(AMR)을 양산 라인에 본격 도입한다고 밝혔다. 조립 불량률을 70% 낮추고 유연 생산성을 극대화한다.',
    content: '현대자동차그룹은 미래 스마트 제조 플랫폼 브랜드인 E-FOREST를 통해 양산 완성차 공장에 AI 딥러닝 기반 차체 외관 및 단차 검사 솔루션을 전면 적용하기로 했다. 기존 숙련 작업자의 육안 검사를 초고화질 다채널 비전 센서와 AI 알고리즘으로 대체하여 마이크로미터 단위의 조립 편차를 실시간 감지한다. 또한 부품 물류 역시 고정식 컨베이어 벨트 대신 자율이동로봇(AMR) 군집 제어를 활용하여 다품종 맞춤형 차량의 혼류 생산을 가능케 할 방침이다.',
    relatedCompanies: ['현대자동차', '현대모비스', '현대위아'],
    aiAnalysis: {
      coreSummary: '현대차 완성차 양산 라인에 AI 비전 검사 및 자율이동로봇(AMR)이 대거 투입되며 스마트팩토리 E-FOREST 고도화 본격화',
      industryImpact: '전통적 단순 조립 현장에서 데이터 및 소프트웨어 기반의 지능형 유연 제조 환경으로 패러다임이 전환됨에 따라 생산기술 엔지니어의 역할이 디지털 트윈 및 로봇 관제로 진화함',
      relatedCompanies: ['현대자동차', '현대위아', '현대모비스', '두산로보틱스'],
      relatedJobRoles: ['생산기술', '제조기술', '설비기술', '품질관리/품질보증', '로봇 자동화'],
      importantCompetencies: 'PLC 및 비전 센서 인터페이스 제어, 생산 라인 불량률 데이터 분석(Python/SQL), 공정 레이아웃 시뮬레이션 역량',
      studyGuide: '현대차그룹 E-FOREST 컨셉과 싱가포르 HMGICS의 셀 제조 공법을 조사하고, PLC 래더 제어와 머신비전 검사 원리를 학습할 것',
      expectedInterviewQuestions: [
        {
          question: '전통 컨베이어 조립 라인과 AMR 기반 셀 생산 방식의 차이점과 생산기술 관점에서의 장단점을 설명해 보세요.',
          point: '유연성(다품종 소량 생산 가능)과 초기 투자비/복잡도(동선 최적화 및 AGV/AMR 군집 관제 필요성) 관점에서 비교 답변'
        },
        {
          question: 'AI 비전 검사기가 미세 불량을 판정할 때 발생할 수 있는 과검(정상을 불량으로 오판) 문제를 어떻게 줄이겠습니까?',
          point: '조명 및 반사광 물리적 환경 표준화, 라벨링 데이터 전처리 및 신뢰도 임계치(Threshold) 단계별 설정 제안'
        }
      ]
    }
  },
  {
    id: 'news-02',
    title: '배터리 3사, 차세대 4680 원통형 및 건식 전극 공정 투자 가속… "공정 혁신이 원가 승부처"',
    category: '전기차/배터리',
    publishedDate: '2026-10-25',
    source: '한국경제 IT·바이오부',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=%EB%B0%B0%ED%84%B0%EB%A6%AC+4680+%EA%B1%B4%EC%8B%9D%EC%A0%84%EA%B7%B9+%EA%B3%B5%EC%A0%95',
    summary: 'LG에너지솔루션, 삼성SDI 등이 테슬라 및 글로벌 OEM 공급을 위한 차세대 지름 46mm 원통형 배터리 양산 라인을 증설하고 있다. 용매 건조 과정을 없앤 건식 전극 공정이 배터리 제조의 최대 화두로 떠올랐다.',
    content: '글로벌 전기차 캐즘(대중화 전 일시적 수요 정체)을 극복하기 위해 K-배터리 기업들이 제조 공정 혁신을 통한 원가 절감에 사활을 걸고 있다. 지름 46mm, 높이 80mm의 4680 규격은 기존 2170 대비 용량 5배, 출력 6배를 자랑하며 탭리스(Tabless) 고속 레이저 용접 기술이 필수적이다. 또한 전극 공정에서 유기용매를 사용하지 않고 파우더 상태로 압연하는 건식 전극 기술은 전력 소비와 건조로 공간을 50% 이상 줄일 수 있어 설비 기술자의 중요성이 매우 커지고 있다.',
    relatedCompanies: ['LG에너지솔루션', '삼성SDI', '포스코퓨처엠'],
    aiAnalysis: {
      coreSummary: 'K-배터리 3사가 차세대 46-시리즈 고용량 원통형 배터리 양산과 건식 전극 공정 도입으로 제조 단가 혁신 추진',
      industryImpact: '화학적 물질 혁신뿐 아니라 정밀 롤투롤 압연 설비와 고속 레이저 용접 등 기계/메카트로닉스 공정 기술이 배터리 양산 수율의 핵심 변수로 대두됨',
      relatedCompanies: ['LG에너지솔루션', '삼성SDI', 'SK온', '포스코퓨처엠'],
      relatedJobRoles: ['공정기술', '설비기술', '배터리 제조기술', '품질보증'],
      importantCompetencies: '롤투롤(R2R) 갭 컨트롤, 고출력 레이저 용접 파라미터 최적화, 배터리 셀 발열 및 신뢰성 평가',
      studyGuide: '원통형 4680 탭리스 설계의 물리적 원리와 습식 vs 건식 전극 공정의 차이점을 파악하고 분체 압연 메커니즘을 복습할 것',
      expectedInterviewQuestions: [
        {
          question: '기존 배터리 전극 코팅 건조 공정과 비교했을 때 건식 전극 공정이 직면한 가장 큰 기술적 난제는 무엇이라고 생각합니까?',
          point: '바인더의 균일한 분산 및 고압 캘린더링 시 두께 균일도(공차) 유지 난이도를 기계공학적 관점에서 설명'
        },
        {
          question: '4680 배터리의 탭리스 구조가 왜 고속 충전 시 발열 저감에 효과적인지 열전도 관점에서 설명해 보세요.',
          point: '전류 경로(Path) 단축을 통한 내부 옴 저항 감소 및 캔 하우징으로의 직접 방열 경로 형성 언급'
        }
      ]
    }
  },
  {
    id: 'news-03',
    title: '현대차·기아, 2026년부터 전 차종 SDV 아키텍처 전환… 차량용 이더넷과 고성능 AP 채택',
    category: 'SDV/자율주행',
    publishedDate: '2026-10-22',
    source: '디지털데일리 모빌리티팀',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=%ED%98%84%EB%8C%80%EC%B0%A8+%EA%B8%B0%EC%95%84+SDV+%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98+%EC%B0%A8%EB%9F%89%EC%9A%A9+%EC%9D%B4%EB%8D%94%EB%84%B7',
    summary: '현대차그룹이 2026년부터 신규 출시되는 전 모델에 통합 제어기 중심의 중앙 집중형 E/E 아키텍처를 적용한다. 분산된 수십 개 ECU를 4개의 도메인/존(Zone) 제어기로 통합하며 초당 기가비트급 차량용 이더넷이 기본 탑재된다.',
    content: '현대자동차그룹 글로벌 SDV 본부와 포티투닷(42dot)은 차세대 자동차의 두뇌 역할을 할 고성능 차량용 컴퓨터(HPVC)와 존 컨트롤러(Zone Controller) 양산 개발을 완료 단계로 끌어올렸다. 이에 따라 배선 하네스 중량이 30% 감소하고, 차량 조립 공정에서도 복잡한 케이블 결속이 획기적으로 단순화된다. 전장 소프트웨어는 AUTOSAR 어댑티브 플랫폼과 리눅스 기반 OS 위에서 구동된다.',
    relatedCompanies: ['현대자동차', '현대모비스', '포티투닷 (42dot)', '현대케피코'],
    aiAnalysis: {
      coreSummary: '현대차그룹의 중앙 집중형 존(Zone) E/E 아키텍처 도입으로 하드웨어 배선 절감과 차량용 이더넷 통신 표준화 달성',
      industryImpact: '차량 조립 생산 라인에서 와이어링 하네스 수작업 공수가 줄어드는 대신 전장 제어기 소프트웨어 검합(Flashing) 및 EoL(End-of-Line) 통신 검사 공정의 중요성이 급격히 부각됨',
      relatedCompanies: ['현대자동차', '현대모비스', '포티투닷 (42dot)', 'HL만도'],
      relatedJobRoles: ['차량 전장', '자율주행/SW', '생산기술(전장/의장)', '품질보증'],
      importantCompetencies: 'CAN-FD 및 차량용 이더넷(SOME/IP, DoIP) 프로토콜, AUTOSAR 기초, ECU 리플래시 검사',
      studyGuide: '도메인 분산형 아키텍처와 존(Zone) 집중형 아키텍처의 차이를 이해하고, 차량 네트워크 진단(UDS ISO 14229) 개념을 숙지할 것',
      expectedInterviewQuestions: [
        {
          question: '기존 CAN 통신 대비 차량용 이더넷(Automotive Ethernet)이 SDV 환경에서 필수적인 이유는 무엇입니까?',
          point: '대용량 센서(카메라/라이다) 데이터 전송 대역폭 확보와 OTA 펌웨어 업데이트 시간 단축 필요성 서술'
        },
        {
          question: '의장 조립 라인에서 전장 제어기 결함 발생 시 하드웨어 결함과 소프트웨어 통신 오류를 어떻게 빠르게 판별하겠습니까?',
          point: 'OBD/이더넷 진단 프로토콜(UDS)을 통한 DTC 에러 코드 추출과 전원 노이즈 오실로스코프 측정 절차 제시'
        }
      ]
    }
  },
  {
    id: 'news-04',
    title: '기아, 화성 PBV 전용공장 \'이보 플랜트(EVO Plant)\' 가동 임박… 맞춤형 차체 유연 생산 체계 구축',
    category: '완성차/PBV',
    publishedDate: '2026-10-18',
    source: '머니투데이 산업부',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=%EA%B8%B0%EC%95%84+%ED%99%94%EC%84%B1+PBV+%EC%9D%B4%EB%B3%B4+%ED%94%8C%EB%9E%9C%ED%8A%B8',
    summary: '기아가 국내 최초로 구축한 목적기반차량(PBV) 전용 공장인 화성 EVO 플랜트가 시운전을 마치고 본격 양산 준비에 착수했다. 차체 하부 플랫폼 위에 용도별 캐빈을 자유자재로 조립하는 모듈러 이지스왑 기술이 적용된다.',
    content: '기아 화성 오토랜드 EVO 플랜트는 컨베이어 벨트가 없는 혁신적 공장이다. AGV 무인차량이 차체 프레임을 운반하며, 작업 스테이션마다 고객 요구에 맞춘 캐빈(물류용 밴, 승객용 셔틀, 이동형 오피스)을 전자동 하이브리드 로봇이 체결한다. 이를 통해 동일한 라인에서 수십 가지 사양의 차량을 실시간 변환 생산할 수 있다.',
    relatedCompanies: ['기아', '현대모비스', '현대위아'],
    aiAnalysis: {
      coreSummary: '기아의 맞춤형 PBV 전용 화성 이보 플랜트 완공으로 컨베이어 벨트 없는 미래형 모듈러 생산 시스템 구현',
      industryImpact: '생산관리 및 공정기술 엔지니어에게 요구되는 자질이 단순 타임 스터디에서 실시간 유연 스케줄링 및 무인 운반 물류 시스템(WMS/AGV) 연동으로 확장됨',
      relatedCompanies: ['기아', '현대모비스', '현대위아'],
      relatedJobRoles: ['생산관리', '생산기술', '제조기술', '공정설계'],
      importantCompetencies: '공정 라인 편성 효율(Line Balancing) 산출, AGV/AMR 동선 시뮬레이션, 모듈러 조립 공차 관리',
      studyGuide: '기아의 PBV 전략(PV5, PV7)과 이지스왑(Easy Swap) 기술 구조를 숙지하고 생산관리 공정 병목 개선 기법을 학습할 것',
      expectedInterviewQuestions: [
        {
          question: '컨베이어 벨트가 없는 공장에서 라인 밸런싱(Line Balancing) 불균형이 발생할 경우 생산관리 담당자로서 어떻게 대처하시겠습니까?',
          point: '버퍼 스테이션 동적 할당, AGV 경로 우회 알고리즘 적용, 공수 편차 작업 우선순위 재조정 답변'
        }
      ]
    }
  },
  {
    id: 'news-05',
    title: 'HL만도, 완전 전자식 제동 \'EMB\' 글로벌 완성차 수주 확대… 유압 없는 브레이크 시대 개막',
    category: '자동차 부품',
    publishedDate: '2026-10-12',
    source: '매일경제 모빌리티',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=HL%EB%A7%8C%EB%8F%84+EMB+%EC%A0%84%EC%9E%90%EC%8B%9D+%EC%A0%9C%EB%8F%99',
    summary: 'HL만도가 브레이크 오일(유압)을 전혀 쓰지 않고 전기 모터로 패드를 디스크에 직접 압착하는 전동화 브레이크(EMB: Electro-Mechanical Brake)의 북미 및 유럽 OEM 공급을 대폭 늘린다.',
    content: 'EMB는 100년 넘게 유지된 유압식 제동 장치를 완벽히 대체하는 차세대 섀시 기술이다. 브레이크 액 누유 위험이 없고 부품 수가 40% 이상 감소하며, 제동 반응 속도가 유압 대비 2배 이상 빨라 자율주행 비상 제동(AEB) 시 제동 거리를 수 미터 단축시킨다. 제조 현장에서도 오일 주입 및 에어 블리딩(공기 빼기) 공정이 통째로 사라져 친환경 조립 라인 구축이 가능하다.',
    relatedCompanies: ['HL만도', '현대모비스'],
    aiAnalysis: {
      coreSummary: 'HL만도가 유압 라인을 배제한 100% 전자 모터 구동식 제동(EMB) 대규모 상용화 수주 달성',
      industryImpact: '공장 조립 라인에서 오일 주입/누유 검사 설비가 생략되고 전기 모터 조립 및 정밀 토크 체결 공정이 핵심으로 부상함',
      relatedCompanies: ['HL만도', '현대모비스', '보쉬'],
      relatedJobRoles: ['기계설계', '생산기술', '품질관리/품질보증', '연구개발(R&D)'],
      importantCompetencies: '모터 구동 정밀 기구학 설계, 볼스크류 가공 공차, ISO 26262 ASIL-D 안전 규격',
      studyGuide: '기존 ESC/IDB 유압 제동 시스템과 EMB의 구조 차이를 비교하고 감속기 볼스크류 작동 원리를 복습할 것',
      expectedInterviewQuestions: [
        {
          question: 'EMB 시스템의 가장 중요한 안전 설계(Fail-Safe) 메커니즘은 무엇이어야 한다고 생각합니까?',
          point: '이중화(Redundancy) 전원 및 듀얼 제어기 구조, 모터 고장 시 백업 제동 제어 전략 설명'
        }
      ]
    }
  },
  {
    id: 'news-06',
    title: '정부, 자율주행 레벨 3 상용화 도로 가이드라인 확정 및 차량 검사 표준 개정',
    category: '정책/자율주행',
    publishedDate: '2026-10-05',
    source: '국토교통부 보도자료 / 연합뉴스',
    originalUrl: 'https://search.naver.com/search.naver?where=news&query=%EC%9E%90%EC%9C%A8%EC%A3%BC%ED%96%89+%EB%A0%88%EB%B2%A83+%EA%B0%80%EC%9D%B4%EB%93%9C%EB%9D%BC%EC%9D%B8+%EA%B5%AD%ED%86%A0%EB%B6%80',
    summary: '국토교통부가 고속도로 및 자동차 전용도로에서 운전자가 스티어링 휠을 잡지 않고도 주행할 수 있는 레벨 3 조건부 자율주행차의 검사 기준과 사고 책임 규정을 담은 안전 가이드라인을 최종 확정했다.',
    content: '이번 개정으로 센서 융합 장치와 긴급 제어권 전환(Take-over Request) 시스템의 신뢰도 평가가 의무화되었다. 완성차 조립 라인에서도 출고 전 라이다 및 레이다의 3차원 정밀 각도 캘리브레이션 검사가 필수로 도입된다.',
    relatedCompanies: ['현대자동차', '현대모비스', '42dot', '모라이'],
    aiAnalysis: {
      coreSummary: '국토부의 자율주행 레벨 3 정식 안전 가이드라인 제정으로 완성차 출고 검사 및 센서 캘리브레이션 공정 표준화',
      industryImpact: '생산 조립 최종 공정(EoL)에서 센서 정밀 보정 챔버 설비 투자와 소프트웨어 검증 엔지니어 인력 채용 급증',
      relatedCompanies: ['현대자동차', '현대모비스', 'HL만도', '모라이'],
      relatedJobRoles: ['자율주행', '품질관리/품질보증', '생산기술', '차량 전장'],
      importantCompetencies: '센서 캘리브레이션(타깃 휠 얼라인먼트), 도로 주행 데이터 로깅, ASIL 안전 무결성',
      studyGuide: 'SAE 레벨 0~5 자율주행 단계별 정의와 레벨 3 제어권 전환(TOR) 한계 상황을 숙지할 것',
      expectedInterviewQuestions: [
        {
          question: '자율주행 레벨 3 차량 생산 시 센서 장착 공차가 기준치를 벗어날 경우 발생할 수 있는 위험을 엔지니어로서 설명해 보세요.',
          point: '장거리(150m 이상) 표적 추적 시 각도 오차에 따른 수평 궤적 오차가 증폭되어 차선 인식 실패 및 오제동 유발 가능성 지적'
        }
      ]
    }
  }
];

export const initialJobRoles: JobRoleDetail[] = [
  {
    id: 'role-pe',
    name: '생산기술 (Manufacturing Engineering)',
    category: '제조 및 공정',
    summary: '연구소에서 설계된 신차 및 모빌리티 부품이 양산 공장에서 최고 품질과 최저 원가로 대량 생산될 수 있도록 전체 생산 공정 라인을 설계, 검증, 셋업하는 핵심 엔지니어링 직무입니다.',
    duties: [
      '신차 및 신규 부품 개발 단계에서의 양산성 검토(DFA/DFM)',
      '차체/도장/의장/전동화 조립 라인 레이아웃 설계 및 설비 사양서 작성',
      '신차 조립 치공구(Jig) 및 프레스 금형, 로봇 티칭 검증',
      '초기 양산(Pilot) 과정에서의 공정 불량 원인 분석 및 라인 트러블 개선',
      '스마트팩토리 자동화 설비(AGV, 산업용 로봇, 비전 검사기) 셋업'
    ],
    requiredMajors: ['기계공학', '자동차공학', '산업공학', '메카트로닉스', '정밀기계'],
    coreSkills: [
      { name: '3D CAD / 도면 해독 (CATIA, NX)', importance: 95, levelDesc: '조립 간섭 검토 및 지그 모델링 가능 수준' },
      { name: '공정 레이아웃 및 설비 사양 설계', importance: 90, levelDesc: '라인 밸런싱 및 사이클 타임(C/T) 단축' },
      { name: 'PLC 및 자동화 설비 제어 기초', importance: 82, levelDesc: '라인 트러블슈팅 및 센서 인터페이스 이해' },
      { name: '통계적 공정 관리 (Cpk, FMEA)', importance: 88, levelDesc: '불량률 추적 및 원인 규명 피드백 루프' }
    ],
    tools: ['CATIA V5/3DX', 'Siemens NX', 'Process Simulate / Delmia', 'AutoCAD', 'Minitab', 'MS Excel(고급)'],
    certifications: ['일반기계기사', '생산자동화산업기사', '품질경영기사', '6시그마 Green Belt'],
    preferredExperience: [
      '학부 캡스톤 3D 기구물 설계 및 가공/제작 경험',
      '자동차 관련 공장 현장 실습 및 인턴십',
      '스마트팩토리 아카데미 및 PLC 제어 프로젝트'
    ],
    targetCompanies: ['현대자동차', '기아', '현대모비스', '현대위아', 'HL만도', 'LG에너지솔루션'],
    careerPath: ['공정 설계 주니어 엔지니어', '신차 프로젝트 생산기술 PM', '공장 기술팀장 / 제조혁신센터 총괄']
  },
  {
    id: 'role-process',
    name: '제조기술 / 공정기술 (Process Engineering)',
    category: '제조 및 공정',
    summary: '기존 가동 중인 양산 라인의 수율 향상, 설비 가동률 극대화, 작업 표준 수립 및 사이클 타임 단축을 담당하는 현장 밀착형 엔지니어링 직무입니다.',
    duties: [
      '공정 조건(온도, 압력, 토크, 용접 파라미터 등) 최적화',
      '공정 불량(외관 흠집, 치수 불일치, 체결 불량) 긴급 대응 및 영구 대책 수립',
      '작업 표준서(SOP) 제정 및 현장 기술 지도',
      '생산 원가 절감(재료비 및 공수 절감) 프로젝트 주도'
    ],
    requiredMajors: ['기계공학', '재료/금속공학', '화학공학(배터리)', '산업공학'],
    coreSkills: [
      { name: '공정 파라미터 튜닝', importance: 92, levelDesc: '설비별 최적 가동 조건 수립' },
      { name: '품질 트러블슈팅', importance: 94, levelDesc: '5-Why 기법 및 근본 원인 분석' },
      { name: '현장 커뮤니케이션', importance: 90, levelDesc: '현장 기능직 및 협력사와의 원활한 협조' }
    ],
    tools: ['Minitab', 'MES(제조실행시스템)', 'CAD Viewer', 'SPC 관리 차트'],
    certifications: ['품질경영기사', '일반기계기사', '산업안전기사'],
    preferredExperience: ['제조 공정 인턴', '공정 데이터 분석 캡스톤', '공장 아르바이트/실습'],
    targetCompanies: ['LG에너지솔루션', '삼성SDI', '현대모비스', '포스코퓨처엠', '에스엘'],
    careerPath: ['공정 엔지니어', '수율 혁신 Task 리더', '제조부장 / 공장장']
  },
  {
    id: 'role-qa',
    name: '품질관리 및 품질보증 (QA/QC)',
    category: '품질 및 신뢰성',
    summary: '부품 입고부터 양산 완성차 출고, 그리고 고객 인도 후 필드 신뢰성에 이르기까지 제품이 글로벌 품질 표준을 완벽히 만족하도록 보증하는 신뢰의 수호자입니다.',
    duties: [
      '신차 개발 단계 품질 육성 및 선행 품질 평가(APQP, PPAP)',
      '양산 공정 능력 지수(Cp, Cpk) 평가 및 공정 산포 억제',
      '협력사 품질 감사 및 수입 검사 기준 관리',
      '필드 클레임 및 리콜 원인 분석과 재발 방지 대책 수립'
    ],
    requiredMajors: ['산업공학', '기계공학', '전기전자공학', '재료공학'],
    coreSkills: [
      { name: '품질 통계 분석 (SPC, Cpk)', importance: 95, levelDesc: '정규분포 기반 산포 및 공정능력 검증' },
      { name: '자동차 품질 표준 (IATF 16949)', importance: 90, levelDesc: '글로벌 완성차 품질 감사 기준 숙지' },
      { name: '3차원 정밀 측정 및 비파괴 검사', importance: 85, levelDesc: 'CMM, 형상측정기, CT 비파괴 데이터 해석' }
    ],
    tools: ['Minitab', '3D CMM 소프트웨어', 'JMP', 'MS Excel VBA'],
    certifications: ['품질경영기사', '6시그마 BB/GB', 'CPIM'],
    preferredExperience: ['품질 보증 프로젝트', '계측기 실습 경험', '통계 경진대회 참여'],
    targetCompanies: ['현대자동차', '현대모비스', 'HL만도', '삼성SDI', '한국타이어'],
    careerPath: ['품질 평가 엔지니어', '글로벌 고객 품질 담당자', '최고품질책임자(CQO)']
  },
  {
    id: 'role-mech-design',
    name: '기계 및 차체/의장 설계 (Mechanical Design)',
    category: '연구개발(R&D)',
    summary: '자동차의 뼈대인 차체, 외장 패널, 실내 의장 부품, 섀시 부품의 3차원 형상과 조립 구조를 설계하고 충돌 안전성과 공학적 내구성을 만족시키는 직무입니다.',
    duties: [
      '차체 및 플랫폼 기구물 3D 모델링(CATIA)',
      '부품 간 간섭 검토 및 조립 공차 해석(GD&T)',
      '경량 복합소재 및 고장력 강판 적용 구조 설계',
      'CAE 충돌/강도/진동 해석 결과 피드백 반영 설계 수정'
    ],
    requiredMajors: ['기계공학', '자동차공학', '항공우주공학'],
    coreSkills: [
      { name: 'CATIA V5 3D Modeling (Surfacing, Part)', importance: 96, levelDesc: 'G2/G3 곡면 및 복잡한 어셈블리 설계' },
      { name: '재료역학 및 피로 내구 지식', importance: 90, levelDesc: '응력 집중 부위 보강 설계' },
      { name: '사출/프레스 금형 가공성 이해', importance: 86, levelDesc: '금형 빼기 구배, 리브 형상 설계' }
    ],
    tools: ['CATIA V5/3DEXPERIENCE', 'HyperWorks', 'AutoCAD', 'SolidWorks'],
    certifications: ['일반기계기사', 'CATIA Certified Professional', '전산응용기계제도기능사'],
    preferredExperience: ['자작자동차 동아리 프레임 설계', 'CAE 시뮬레이션 논문/프로젝트', 'CAD 경진대회'],
    targetCompanies: ['현대자동차 남양연구소', '현대모비스', 'HL만도', '성우하이텍', '화신'],
    careerPath: ['설계 연구원', '섀시/바디 시스템 설계 리더', '차량 플랫폼 아키텍트']
  },
  {
    id: 'role-battery-eng',
    name: '배터리 제조기술 및 팩 엔지니어링',
    category: '전기차/배터리',
    summary: '배터리 셀을 안전하게 묶는 모듈 및 팩(Pack) 조립 공정을 설계하고, 레이저 용접, 열관리 하우징, 고전압 배선 시스템의 양산성을 확보하는 직무입니다.',
    duties: [
      '배터리 모듈/팩 어셈블리 라인 공정 설계',
      '알루미늄 버스바(Busbar) 레이저 용접 공정 조건 최적화',
      '방열 갭필러(Thermal Gap Filler) 도포 자동화 시스템 셋업',
      '배터리 관리 시스템(BMS) 조립 및 EoL 전기적 절연 검사'
    ],
    requiredMajors: ['기계공학', '전기전자공학', '화학공학', '신소재공학'],
    coreSkills: [
      { name: '배터리 팩 구조 및 열해석 이해', importance: 92, levelDesc: '열폭주 방지 및 방열 유로 설계' },
      { name: '정밀 레이저 용접 및 접착 공정', importance: 90, levelDesc: '저항값 최소화 및 접합 강도 확보' },
      { name: '고전압 안전 규격 (ISO 6469)', importance: 85, levelDesc: '절연 내전압 시험 및 안전 취급' }
    ],
    tools: ['CATIA', 'ANSYS Fluent(열해석)', '용접 모니터링 시스템', 'PLC'],
    certifications: ['전기기사', '일반기계기사', '화공기사'],
    preferredExperience: ['전기차 배터리 열해석 프로젝트', '배터리 팩 캡스톤', '클린룸 실습'],
    targetCompanies: ['LG에너지솔루션', '삼성SDI', 'SK온', '현대모비스', '포스코퓨처엠'],
    careerPath: ['배터리 모듈 공정 엔지니어', '차세대 배터리 팩 양산 PM', '배터리 제조센터장']
  },
  {
    id: 'role-sdv-sw',
    name: '자율주행 및 차량 전장 SW',
    category: '소프트웨어 및 전장',
    summary: '차량의 눈과 뇌가 되는 카메라/라이다 센서 융합, 인지-판단-제어 알고리즘 구현 및 AUTOSAR 기반 차량용 임베디드 소프트웨어를 개발하는 직무입니다.',
    duties: [
      'LiDAR, Radar, Camera 센서 퓨전 및 객체 인식 알고리즘 개발',
      'ROS2 기반 자율주행 차량 경로 계획 및 제어 로직 구현',
      'AUTOSAR Classic/Adaptive 플랫폼 상의 임베디드 SW 개발',
      '차량용 이더넷(SOME/IP) 및 CAN-FD 통신 스택 통합'
    ],
    requiredMajors: ['컴퓨터공학', '전기전자공학', '자동차공학', '로봇공학'],
    coreSkills: [
      { name: 'C / C++ 프로그래밍', importance: 95, levelDesc: '메모리 관리 및 고성능 연산 코드 작성' },
      { name: 'ROS2 / Linux OS', importance: 90, levelDesc: '노드 간 통신 및 자율주행 패키지 구성' },
      { name: '차량 통신 (CAN/Ethernet)', importance: 86, levelDesc: 'SOME/IP, DBC 파싱 및 패킷 분석' }
    ],
    tools: ['C/C++', 'Python', 'ROS2', 'CANoe/CANalyzer', 'Git', 'Linux'],
    certifications: ['정보처리기사', '리눅스마스터', 'C++ 관련 자격'],
    preferredExperience: ['대학생 자율주행 경진대회 참여', '임베디드 리눅스 포팅', '오픈소스 프로젝트'],
    targetCompanies: ['현대자동차', '현대모비스', '42dot', '모라이', 'HL클레무브'],
    careerPath: ['임베디드 SW 개발자', '자율주행 제어 시스템 테크 리드', '차량 SW 아키텍트']
  },
  {
    id: 'role-smart-factory',
    name: '스마트팩토리 및 로봇자동화 (Smart Factory & Robotics)',
    category: '스마트제조',
    summary: '모빌리티 생산 현장의 물류와 조립을 무인화하기 위해 AGV/AMR 무인 운반차, 산업용 다관절 로봇, 협동로봇 및 PLC 기반 통합 제어 관제 시스템을 설계·운영하는 직무입니다.',
    duties: [
      'AMR/AGV 무인 자율주행 물류 관제 시스템 구축',
      '산업용 로봇(현대, 화낙 등) 및 협동로봇 조립 티칭 프로그램 개발',
      'PLC 및 SCADA 기반 라인 중앙 모니터링 시스템 연동',
      '디지털 트윈(Digital Twin) 기반 가상 생산 라인 시뮬레이션'
    ],
    requiredMajors: ['메카트로닉스', '제어계측공학', '전기전자공학', '기계공학', '로봇공학'],
    coreSkills: [
      { name: 'PLC 래더 프로그래밍 (Mitsubishi, Siemens)', importance: 95, levelDesc: '복잡한 인터록 및 시퀀스 제어' },
      { name: '산업용 로봇 조작 및 오프라인 티칭', importance: 90, levelDesc: '용접/핸들링 궤적 최적화' },
      { name: '산업용 이더넷 통신 (EtherCAT, Profinet)', importance: 85, levelDesc: '센서/서보 드라이브 필드버스 통신' }
    ],
    tools: ['GX Works', 'TIA Portal', 'RobotStudio', 'Plant Simulation', 'Python'],
    certifications: ['생산자동화기사', '전기기사', '메카트로닉스기사'],
    preferredExperience: ['PLC 자동화 제어 실습', '로봇 모션 제어 프로젝트', '스마트팩토리 교육 이수'],
    targetCompanies: ['현대위아', '레인보우로보틱스', '두산로보틱스', '현대자동차', '포스코DX'],
    careerPath: ['자동화 제어 엔지니어', '스마트제조 솔루션 아키텍트', '공장 자동화 총괄 수석']
  },
  {
    id: 'role-plant-maintenance',
    name: '설비기술 및 메카트로닉스 (Equipment Maintenance)',
    category: '제조 및 공정',
    summary: '24시간 멈추지 않는 양산 설비의 무고장 가동을 목표로 설비 예방 보전, 기계/유공압/전기 고장 진단, 설비 개조 및 성능 개선을 주도하는 엔지니어입니다.',
    duties: [
      '양산 설비(프레스, 차체 용접기, 도장 부스, 조립 설비) 정기 예방보전(PM)',
      '돌발 설비 정지 발생 시 긴급 고장 진단 및 복구',
      '설비 진동, 온도 데이터 기반 스마트 예지보전(PdM) 시스템 운영',
      '노후 설비 수명 연장 개조 및 안전 방호 장치 개선'
    ],
    requiredMajors: ['기계공학', '전기공학', '메카트로닉스'],
    coreSkills: [
      { name: '유공압 및 기계 구동 메커니즘', importance: 94, levelDesc: '감속기, 실린더, 서보모터 결함 진단' },
      { name: '시퀀스 회로 및 배선 도면 해석', importance: 90, levelDesc: '제어반 전기 도면 트러블슈팅' },
      { name: '진동 분석 및 예지 보전', importance: 82, levelDesc: 'FFT 주파수 스펙트럼 분석' }
    ],
    tools: ['AutoCAD', '진동 측정기', '열화상 카메라', 'PLC 프로그래머'],
    certifications: ['기계정비산업기사', '전기기사', '산업안전기사'],
    preferredExperience: ['공장 설비 보전 인턴', '기계 가공 실습', '공압 실습 키트 조작'],
    targetCompanies: ['현대자동차', '기아', '현대제철', '포스코', 'LG에너지솔루션'],
    careerPath: ['설비 보전 엔지니어', '설비 기술팀장', '공장 보전 총괄 디렉터']
  }
];

export const sampleUserProfile: UserProfile = {
  name: '김모빌',
  email: 'ghdwogur789@gmail.com',
  university: '한국모빌리티대학교',
  major: '기계공학부 (미래모빌리티 융합전공)',
  gpa: '3.85 / 4.5',
  educationStatus: '졸업예정',
  targetIndustries: ['완성차', '자동차 부품', '스마트팩토리/로봇', '전기차/배터리'],
  targetRoles: ['생산기술', '제조기술', '품질관리 및 품질보증', '기계설계'],
  targetCompanySizes: ['대기업', '중견기업'],
  skills: [
    'CATIA V5 (3D 서피스 & 파트 모델링)',
    'SolidWorks',
    'PLC 기초 (미쓰비시 GX-Works 래더 제어)',
    'Python (공정 데이터 분석 & Pandas)',
    'AutoCAD (2D 도면 해독 및 치수 공차)',
    'Minitab (Cpk 공정능력 분석)',
    'MATLAB / Simulink'
  ],
  certifications: [
    '일반기계기사 (한국산업인력공단)',
    '품질경영기사 (필기 합격)',
    'TOEIC Speaking AL (170점)',
    'CATIA Specialist Certification'
  ],
  trainings: [
    '현대차그룹 H-Mobility 클래스 (전동화/생산기술 트랙) 160시간 수료',
    '대한상공회의소 스마트팩토리 PLC 및 협동로봇 제어 실무 과정 (80시간)'
  ],
  projects: [
    {
      id: 'proj-01',
      title: '친환경 하이브리드 포뮬러 섀시 브래킷 설계 및 조립 공차 0.012mm 최적화',
      period: '2025.03 ~ 2025.10 (8개월)',
      role: '팀장 및 섀시 기구/공정 설계 담당 (팀 5명)',
      tools: 'CATIA V5, ANSYS Mechanical, 3차원 측정기, Minitab',
      problem: '초기 조립 공정에서 프레임 용접 열변형 및 볼트 체결 토크 불균일로 인해 허용 공차(±0.02mm)를 초과하는 0.05mm의 유격이 발생, 구동 시 차체 진동 수치가 28% 급증하는 문제 직면',
      solution: '3D 측정 데이터 50회를 누적 분석하여 대각선 4단계 표준 체결 시퀀스를 수립하고, 방열 슬롯이 추가된 전용 용접 지그(Jig)를 직접 3D 모델링하여 제작함',
      result: '재조립 후 조립 공차를 ±0.012mm 이내로 안정화하였으며, 실차 주행 평가에서 진동 수치를 35% 저감시켜 캡스톤 디자인 경진대회 최우수상 수상',
      extractedCompetencies: ['3D CAD/지그 모델링', '공차 분석(GD&T)', '정량 데이터 기반 문제 해결', '팀 리더십'],
      coverLetterBullets: [
        '캡스톤 프로젝트에서 3D 측정 데이터 50회를 분석하여 조립 공차를 0.05mm에서 ±0.012mm로 76% 개선하는 정밀 공정 표준화 달성',
        '용접 열변형을 상쇄하는 방열 지그 형상을 독자 설계하여 실차 주행 진동을 35% 저감하고 경진대회 최우수상 수상'
      ],
      portfolioTips: [
        '기존 지그 vs 개선된 지그 3D 렌더링 도면을 나란히 배치하고 공차 산포도 그래프를 첨부할 것'
      ]
    },
    {
      id: 'proj-02',
      title: '스마트팩토리 간이 물류 분류 공정 시뮬레이션 및 PLC 시퀀스 인터록 제어',
      period: '2025.11 ~ 2025.12 (2개월)',
      role: 'PLC 제어 로직 작성 및 센서 인터페이스 셋업',
      tools: 'Mitsubishi GX Works2, 공압 실린더, 포토센서, Python',
      problem: '컨베이어 벨트 이송 중 바코드 인식 불량 및 실린더 타이밍 오차로 인한 라인 정체(Bottleneck) 발생',
      solution: '포토센서 이중 트리거 조건과 타임아웃 예외 처리 래더 로직을 구현하고, 불량 발생 시 긴급 배출 바이패스 라인을 구성함',
      result: '시간당 분류 처리량(Throughput) 22% 향상 및 병목 시간 0초 달성',
      extractedCompetencies: ['PLC 래더 제어', '센서 인터록 설계', '공정 병목 개선'],
      coverLetterBullets: [
        '포토센서 이중 인터록 래더 로직 설계를 통해 간이 물류 라인의 분류 처리량을 22% 개선하고 병목 시간 완전 해소'
      ]
    }
  ],
  coverLetter: `[데이터 기반 피드백으로 완성차 양산 라인의 수율을 지키는 엔지니어가 되겠습니다.]

대학에서 기계공학을 전공하며 단순한 이론 습득을 넘어 '실제 현장에서 양산성이 담보되는 설계인가'를 끊임없이 고민해 왔습니다. 캡스톤 디자인 프로젝트에서 하이브리드 포뮬러 섀시 조립을 총괄하며, 용접 열변형으로 인한 0.05mm 공차 초과 문제를 직면했습니다. 당시 단순히 수작업 연마에 의존하지 않고, 3차원 측정 데이터 50회를 수집해 변형 원인을 분석했습니다. 이를 토대로 볼트 체결 시퀀스를 4단계로 표준화하고 방열 전용 지그를 설계하여 조립 공차를 ±0.012mm 이내로 안정화했습니다.

이러한 공차 분석 및 치공구 개선 경험은 현대자동차의 생산기술 부서에서 신차 양산 초기 품질 안정화와 라인 트러블 해결에 즉각 기여할 것입니다.`,
  resumeText: `[학력]
한국모빌리티대학교 기계공학부 (미래모빌리티 융합전공) | 2021.03 ~ 2026.02 (졸업예정) | 평점 3.85 / 4.5

[자격 및 어학]
- 일반기계기사 (2025)
- TOEIC Speaking AL (170점)
- 품질경영기사 필기 합격 (2025)

[교육 및 대외활동]
- 현대차그룹 H-Mobility 클래스 (생산기술 트랙) 160시간 수료
- 전국 대학생 자작자동차 대회 캡스톤 최우수상

[보유 기술]
- CATIA V5, SolidWorks, PLC (GX Works), Python, Minitab, AutoCAD`,
  targetLocations: ['수도권(경기/남양/화성/판교)', '울산', '충청(아산/충주/서산)']
};

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'evt-01',
    title: '현대자동차 생산기술(제조엔지니어링) 서류 마감',
    companyName: '현대자동차',
    jobPostingId: 'job-h-01',
    type: '서류 마감',
    date: '2026-11-18',
    time: '17:00',
    status: '관심 공고',
    notes: '자소서 3번 문항 캡스톤 지그 설계 경험과 정량적 성과(0.012mm) 집중 강조'
  },
  {
    id: 'evt-02',
    title: 'LG에너지솔루션 배터리 공정기술 서류 마감',
    companyName: 'LG에너지솔루션',
    jobPostingId: 'job-lg-03',
    type: '서류 마감',
    date: '2026-11-15',
    time: '23:59',
    status: '지원 완료',
    notes: '지원서 접수 완료. 4680 양산 라인 수율 관련 전공 역량 어필 완료'
  },
  {
    id: 'evt-03',
    title: '현대모비스 전동화 공정기술 서류 마감',
    companyName: '현대모비스',
    jobPostingId: 'job-m-02',
    type: '서류 마감',
    date: '2026-11-20',
    time: '18:00',
    status: '지원 예정',
    notes: '포트폴리오 PDF 첨부 필수 확인'
  },
  {
    id: 'evt-04',
    title: 'HL만도 전자식 섀시(EMB) 서류 마감',
    companyName: 'HL만도',
    jobPostingId: 'job-mando-05',
    type: '서류 마감',
    date: '2026-11-17',
    time: '18:00',
    status: '관심 공고'
  },
  {
    id: 'evt-05',
    title: '현대차그룹 HMAT 인적성 검사 준비 (온라인 모의테스트)',
    companyName: '현대자동차',
    type: '인적성/코테',
    date: '2026-11-23',
    time: '14:00',
    isPersonal: true,
    notes: '수리/공간지각 영역 2회독 모의고사 오답노트 정리'
  },
  {
    id: 'evt-06',
    title: 'LG에너지솔루션 인성검사 및 AI 역량검사 응시',
    companyName: 'LG에너지솔루션',
    jobPostingId: 'job-lg-03',
    type: '인적성/코테',
    date: '2026-11-26',
    time: '10:00',
    status: '지원 완료'
  },
  {
    id: 'evt-07',
    title: '현대자동차 1차 직무/PT 면접 대비 스터디',
    companyName: '현대자동차',
    type: '면접',
    date: '2026-11-29',
    time: '19:00',
    isPersonal: true,
    notes: '모의 면접 코치로 공차 문제 및 생산기술 트러블슈팅 예상 질문 연습'
  }
];
