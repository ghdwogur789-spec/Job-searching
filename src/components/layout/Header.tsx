import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import {
  Compass,
  Calendar,
  Building2,
  Newspaper,
  Briefcase,
  Sparkles,
  FolderKanban,
  Milestone,
  Bell,
  Search,
  User,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkle
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeMenu,
    setActiveMenu,
    profile,
    loadSampleProfile,
    resetProfile,
    notifications,
    notificationPermissionGranted,
    requestNotificationPermission,
    globalSearchQuery,
    setGlobalSearchQuery
  } = useMobility();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const urgentCount = notifications.filter(n => n.isUrgent).length;

  const menuItems = [
    { id: 1, label: 'AI 맞춤 채용추천', icon: Sparkles },
    { id: 2, label: '통합 채용 캘린더', icon: Calendar },
    { id: 3, label: '기업 정보 & 분석', icon: Building2 },
    { id: 4, label: '모빌리티 산업 뉴스', icon: Newspaper },
    { id: 5, label: '직무 탐색 & 역량', icon: Briefcase },
    { id: 6, label: 'AI 자소서 & 면접', icon: Sparkle },
    { id: 7, label: '프로젝트 포트폴리오', icon: FolderKanban },
    { id: 8, label: '역량 로드맵', icon: Milestone },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white">
              AI MOBILITY
            </span>
            <span className="hidden sm:inline text-slate-400">
              대한민국 모빌리티 산업(완성차·배터리·전장·스마트팩토리) 취업 준비 통합 플랫폼
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                loadSampleProfile();
                alert('모빌리티 취준생(김모빌: 기계/전장 융합전공) 예시 프로필이 로드되었습니다!');
              }}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              예시 프로필 불러오기
            </button>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              {profile.name ? `${profile.name} 님` : '게스트 모드'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button
            onClick={() => setActiveMenu(0)}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900">
                  MOBILITY<span className="text-blue-600">CAREER</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium -mt-0.5">
                모빌리티 맞춤 취업 솔루션
              </p>
            </div>
          </button>

          {/* Global Quick Search */}
          <div className="hidden lg:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              placeholder="기업, 채용직무, 기술스택 검색..."
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Right Action Icons & User Status */}
          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="알림"
              >
                <Bell className="w-5 h-5" />
                {urgentCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {urgentCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <h4 className="text-sm font-bold text-slate-800">채용 일정 알림</h4>
                    </div>
                    {!notificationPermissionGranted && (
                      <button
                        onClick={requestNotificationPermission}
                        className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium"
                      >
                        브라우저 알림 켜기
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        예정된 마감 일정이 없습니다.
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setActiveMenu(2); // Go to Calendar
                            setShowNotifications(false);
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                            n.isUrgent ? 'bg-amber-50/50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-slate-800 leading-snug line-clamp-1">
                              {n.title}
                            </span>
                            <span
                              className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold ${
                                n.isUrgent
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {n.message}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            일정일자: {n.date}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="px-4 pt-2 border-t border-slate-100 text-center">
                    <button
                      onClick={() => {
                        setActiveMenu(2);
                        setShowNotifications(false);
                      }}
                      className="text-xs text-blue-600 font-semibold hover:underline cursor-pointer"
                    >
                      전체 채용 캘린더 보기 →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Mini Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  {profile.name ? profile.name[0] : 'U'}
                </div>
                <div className="hidden sm:block text-left pr-1">
                  <div className="text-xs font-semibold text-slate-800">
                    {profile.name || '취업준비생'}
                  </div>
                  <div className="text-[10px] text-slate-500 -mt-0.5 truncate max-w-[100px]">
                    {profile.major ? profile.major.split(' ')[0] : '프로필 미입력'}
                  </div>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50">
                  <div className="pb-2 mb-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{profile.name || '김모빌'}</p>
                    <p className="text-[11px] text-slate-500">{profile.university} {profile.major}</p>
                    <p className="text-[10px] text-blue-600 font-medium mt-0.5">
                      학점: {profile.gpa || '3.85 / 4.5'} ({profile.educationStatus})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveMenu(1); // Go to Profile/Recs
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-100 rounded-md font-medium cursor-pointer"
                    >
                      내 프로필 & 역량 수정
                    </button>
                    <button
                      onClick={() => {
                        loadSampleProfile();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-md font-semibold cursor-pointer flex items-center justify-between"
                    >
                      <span>모빌리티 예시 프로필</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('프로필과 입력 데이터를 초기화하시겠습니까?')) {
                          resetProfile();
                        }
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-md cursor-pointer flex items-center justify-between"
                    >
                      <span>데이터 초기화</span>
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 8 Primary Navigation Menus */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none border-t border-slate-100">
          <button
            onClick={() => setActiveMenu(0)}
            className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeMenu === 0
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            대시보드
          </button>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-10 mt-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                M
              </div>
              <span className="text-base font-black text-white tracking-tight">
                MOBILITY CAREER
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              모빌리티 산업 취업 준비생을 위한 AI 기반 통합 지원 플랫폼입니다.
              단순 채용공고 나열을 넘어, 사용자 역량 정밀 분석부터 직무 추천, 기업 분석, 채용 캘린더, AI 자기소개서 첨삭 및 모의면접까지 한 곳에서 원스톱으로 지원합니다.
            </p>
            <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-500">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                완성차·부품·배터리·SDV·스마트팩토리 전 분야 지원
              </span>
            </div>
          </div>

          <div>
            <h5 className="text-slate-200 font-bold mb-3 text-xs uppercase tracking-wider">주요 기능</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>AI 역량 분석 & 맞춤 채용공고</li>
              <li>기업별 통합 채용 캘린더</li>
              <li>모빌리티 기업 심층 분석 & 비교</li>
              <li>산업 뉴스 & 직무 영향 분석</li>
              <li>AI 자기소개서 첨삭 & 모의면접 코치</li>
            </ul>
          </div>

          <div>
            <h5 className="text-slate-200 font-bold mb-3 text-xs uppercase tracking-wider">신뢰성 및 데이터 정책</h5>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              본 플랫폼의 기업 정보 및 재무 지표는 금융감독원 전자공시시스템(DART) 기준 자료를 바탕으로 제공됩니다.
              채용공고 샘플 데이터는 명확히 '예시'로 표기되며, AI 분석 점수는 합격 판정 점수가 아닌 참고용 적합도 분석입니다.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 MOBILITY CAREER. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>개인정보 처리방침</span>
            <span>이용약관</span>
            <span>채용공고 등록 제휴 문의</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
