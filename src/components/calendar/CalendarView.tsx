import React, { useState } from 'react';
import { useMobility } from '../../context/MobilityContext';
import { CalendarEvent, JobStatus } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Building2,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Filter,
  Check,
  CalendarCheck
} from 'lucide-react';

export const CalendarView: React.FC = () => {
  const {
    calendarEvents,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
    jobPostings,
    notificationPermissionGranted,
    requestNotificationPermission
  } = useMobility();

  const [currentDate, setCurrentDate] = useState(new Date('2026-11-01'));
  const [viewMode, setViewMode] = useState<'monthly' | 'weekly' | 'daily'>('monthly');
  const [filterType, setFilterType] = useState<string>('전체');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Event Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newType, setNewType] = useState<CalendarEvent['type']>('서류 마감');
  const [newDate, setNewDate] = useState('2026-11-15');
  const [newTime, setNewTime] = useState('18:00');
  const [newStatus, setNewStatus] = useState<JobStatus>('관심 공고');
  const [newNotes, setNewNotes] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation
  const prevPeriod = () => {
    if (viewMode === 'monthly') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else if (viewMode === 'weekly') {
      const next = new Date(currentDate);
      next.setDate(next.getDate() - 7);
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate);
      next.setDate(next.getDate() - 1);
      setCurrentDate(next);
    }
  };

  const nextPeriod = () => {
    if (viewMode === 'monthly') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else if (viewMode === 'weekly') {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 7);
      setCurrentDate(next);
    } else {
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 1);
      setCurrentDate(next);
    }
  };

  const todayStr = '2026-11-02';

  // Filter events
  const filteredEvents = calendarEvents.filter(evt => {
    if (filterType === '전체') return true;
    if (filterType === '개인 일정') return evt.isPersonal;
    return evt.type === filterType;
  });

  // Helper for monthly calendar days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarDays = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  const getEventsForDay = (day: number) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return filteredEvents.filter(evt => evt.date === formatted);
  };

  const getEventBadgeClass = (evt: CalendarEvent) => {
    if (evt.isPersonal) return 'bg-purple-100 text-purple-800 border-purple-200';
    switch (evt.type) {
      case '서류 마감':
        return 'bg-red-100 text-red-800 border-red-200 font-bold';
      case '접수 시작':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '인적성/코테':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '면접':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 font-bold';
      case '최종 발표':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addCalendarEvent({
      title: newTitle,
      companyName: newCompany || undefined,
      type: newType,
      date: newDate,
      time: newTime || undefined,
      status: newStatus,
      notes: newNotes,
      isPersonal: newType === '개인 일정'
    });
    setShowAddModal(false);
    setNewTitle('');
    setNewCompany('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">
            채용 캘린더
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {!notificationPermissionGranted && (
            <button
              onClick={requestNotificationPermission}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-blue-600" />
              <span>D-Day 마감 알림 켜기</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>개인 취업 일정 추가</span>
          </button>
        </div>
      </div>

      {/* Calendar Controls & Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Date Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={prevPeriod}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPeriod}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {year}년 {month + 1}월
          </h3>

          <button
            onClick={() => setCurrentDate(new Date('2026-11-01'))}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 cursor-pointer"
          >
            오늘
          </button>
        </div>

        {/* View Mode & Type Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Type Filter */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-slate-200 bg-white font-medium text-slate-700"
            >
              <option value="전체">전체 일정</option>
              <option value="서류 마감">서류 마감</option>
              <option value="인적성/코테">인적성/코테</option>
              <option value="면접">면접 전형</option>
              <option value="접수 시작">접수 시작</option>
              <option value="개인 일정">개인 일정만</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="p-1 bg-slate-100 rounded-lg flex text-xs">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'monthly' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              월간
            </button>
            <button
              onClick={() => setViewMode('weekly')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'weekly' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              주간
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                viewMode === 'daily' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              일간
            </button>
          </div>
        </div>
      </div>

      {/* MONTHLY CALENDAR VIEW */}
      {viewMode === 'monthly' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Day of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center py-2.5 text-xs font-bold text-slate-600">
            <span className="text-red-600">일</span>
            <span>월</span>
            <span>화</span>
            <span>수</span>
            <span>목</span>
            <span>금</span>
            <span className="text-blue-600">토</span>
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100">
            {calendarDays.map((day, idx) => {
              if (day === null) {
                return <div key={`empty-${idx}`} className="min-h-[110px] bg-slate-50/50 p-2" />;
              }

              const dayEvents = getEventsForDay(day);
              const isToday =
                year === 2026 && month === 10 && day === 2; // baseline: 2026-11-02
              const dayStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[110px] sm:min-h-[125px] p-1.5 sm:p-2 flex flex-col justify-between hover:bg-slate-50/80 transition-colors ${
                    isToday ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ${
                        isToday
                          ? 'bg-blue-600 text-white shadow-xs'
                          : idx % 7 === 0
                          ? 'text-red-600'
                          : idx % 7 === 6
                          ? 'text-blue-600'
                          : 'text-slate-800'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {dayEvents.length}건
                      </span>
                    )}
                  </div>

                  {/* Day Events Stack */}
                  <div className="space-y-1 overflow-y-auto max-h-[85px] scrollbar-none flex-1">
                    {dayEvents.map(evt => (
                      <div
                        key={evt.id}
                        onClick={() => setSelectedEvent(evt)}
                        className={`text-[10px] p-1 rounded-md border truncate cursor-pointer transition-all hover:scale-[1.02] shadow-2xs ${getEventBadgeClass(
                          evt
                        )}`}
                      >
                        <span className="font-bold mr-1">
                          {evt.companyName ? `[${evt.companyName.slice(0, 3)}]` : ''}
                        </span>
                        {evt.title}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setNewDate(dayStr);
                      setShowAddModal(true);
                    }}
                    className="opacity-0 hover:opacity-100 text-[10px] text-slate-400 hover:text-blue-600 text-right mt-1 cursor-pointer transition-opacity"
                  >
                    + 일정
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* WEEKLY & DAILY FALLBACK VIEW (Rich Schedule List) */}
      {(viewMode === 'weekly' || viewMode === 'daily') && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-800">
              {viewMode === 'weekly' ? '이번 주 상세 일정표' : `${currentDate.toLocaleDateString()} 일정 상세`}
            </h4>
            <span className="text-xs text-slate-400">총 {filteredEvents.length}개 일정 등록됨</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredEvents.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                해당 기간에 등록된 일정이 없습니다.
              </div>
            ) : (
              filteredEvents.map(evt => (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border shrink-0 ${getEventBadgeClass(evt)}`}>
                      {evt.type}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        {evt.companyName && (
                          <span className="text-xs font-bold text-slate-900">{evt.companyName}</span>
                        )}
                        <span className="text-xs font-semibold text-slate-800">{evt.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        일자: <strong className="text-slate-700">{evt.date} {evt.time || ''}</strong>
                        {evt.notes && ` | 메모: ${evt.notes}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {evt.status && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {evt.status}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${getEventBadgeClass(selectedEvent)}`}>
                  {selectedEvent.type}
                </span>
                {selectedEvent.isPersonal && (
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                    개인 작성 일정
                  </span>
                )}
              </div>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {selectedEvent.companyName && (
                <div className="flex items-center gap-2 text-xs text-blue-600 font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{selectedEvent.companyName}</span>
                </div>
              )}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {selectedEvent.title}
              </h3>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">일정 일자:</span>
                  <span className="font-bold text-slate-800">{selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">시간/마감시각:</span>
                    <span className="font-bold text-slate-800">{selectedEvent.time}</span>
                  </div>
                )}
                {selectedEvent.status && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">전형 상태:</span>
                    <span className="font-bold text-blue-700">{selectedEvent.status}</span>
                  </div>
                )}
              </div>

              {selectedEvent.notes && (
                <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100 text-xs">
                  <span className="font-bold text-blue-900 block mb-1">메모 및 대비 사항:</span>
                  <p className="text-slate-700 leading-relaxed">{selectedEvent.notes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  if (confirm('이 일정을 삭제하시겠습니까?')) {
                    deleteCalendarEvent(selectedEvent.id);
                    setSelectedEvent(null);
                  }
                }}
                className="text-xs text-red-600 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                일정 삭제
              </button>

              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                확인 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD PERSONAL EVENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>개인 취업 일정 추가</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">일정 제목 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="예: 현대차 자소서 3번 문항 작성 완료 / HMAT 모의고사"
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">대상 기업 (선택)</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="예: 현대자동차"
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">일정 구분</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="개인 일정">개인 일정</option>
                    <option value="서류 마감">서류 마감</option>
                    <option value="인적성/코테">인적성/코테</option>
                    <option value="면접">면접 전형</option>
                    <option value="최종 발표">최종 발표</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">날짜 *</label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">시간</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">메모 및 할 일</label>
                <textarea
                  rows={3}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="강조할 프로젝트 경험, 면접 복장, 제출 서류 체크리스트 등..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                >
                  일정 등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
