import React, { useState } from 'react';
import {
  LogOut,
  GraduationCap,
  Megaphone,
  BookOpen,
  CheckSquare,
  MessageSquareQuote,
  Folder,
  PlayCircle,
  HelpCircle,
  Video,
  FileText,
  Award,
  CalendarDays,
  BookmarkCheck,
  Clock,
  Trophy,
  IndianRupee,
  FilePlus,
  Images,
  Library,
  User,
  Bell,
  Settings,
  Smartphone,
  Monitor,
  Search,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { ModuleDetailModal } from './ModuleDetailModal';
import {
  MOCK_NOTICES,
  MOCK_HOMEWORK,
  MOCK_ATTENDANCE,
  MOCK_REMARKS,
  MOCK_STUDY_MATERIALS,
  MOCK_VIDEOS,
  MOCK_QUERIES,
  MOCK_LIVE_CLASSES,
  MOCK_EXAMS,
  MOCK_CERTIFICATES,
  MOCK_CALENDAR_EVENTS,
  MOCK_SYLLABUS,
  MOCK_TIMETABLE,
  MOCK_RESULT,
  MOCK_FEES,
  MOCK_LEAVES,
  MOCK_GALLERY,
  MOCK_LIBRARY,
  MOCK_NOTIFICATIONS,
  DEFAULT_USERS
} from '../mockData';

interface HomePageProps {
  userName: string;
  role: UserRole;
  onLogout: () => void;
  showSnackBar: (msg: string) => void;
}

interface MenuItem {
  name: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  userName,
  role,
  onLogout,
  showSnackBar
}) => {
  // Current user profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(
    DEFAULT_USERS[role] || {
      id: 'ASH-USER-01',
      name: userName,
      role: role
    }
  );

  // App data state for rich interactivity
  const [notices, setNotices] = useState(MOCK_NOTICES);
  const [homework, setHomework] = useState(MOCK_HOMEWORK);
  const [attendance, setAttendance] = useState(MOCK_ATTENDANCE);
  const [queries, setQueries] = useState(MOCK_QUERIES);
  const [fees, setFees] = useState(MOCK_FEES);
  const [leaves, setLeaves] = useState(MOCK_LEAVES);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  // Active module modal
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Device display mode: 'mobile' simulator frame vs 'web' full layout
  const [viewMode, setViewMode] = useState<'mobile' | 'web'>('mobile');

  // Search filter for menus
  const [searchQuery, setSearchQuery] = useState('');

  // 21 menus matching the Flutter app exactly
  const menus: MenuItem[] = [
    { name: 'Noticeboard', icon: Megaphone, badge: 'New', badgeColor: 'bg-red-500' },
    { name: 'Homework', icon: BookOpen, badge: `${homework.filter(h => h.status === 'Pending').length} Due`, badgeColor: 'bg-amber-500' },
    { name: 'Attendance', icon: CheckSquare, badge: '92.4%', badgeColor: 'bg-emerald-500' },
    { name: 'Remark', icon: MessageSquareQuote },
    { name: 'Study Material', icon: Folder },
    { name: 'Video Tutorial', icon: PlayCircle },
    { name: 'Query', icon: HelpCircle, badge: `${queries.filter(q => q.status === 'Answered').length} Reply`, badgeColor: 'bg-blue-600' },
    { name: 'Live Class', icon: Video, badge: 'LIVE', badgeColor: 'bg-red-600 animate-pulse' },
    { name: 'Exam', icon: FileText, badge: 'Nov 18', badgeColor: 'bg-purple-600' },
    { name: 'Certificate', icon: Award },
    { name: 'Calendar', icon: CalendarDays },
    { name: 'Syllabus', icon: BookmarkCheck },
    { name: 'Timetable', icon: Clock },
    { name: 'Result', icon: Trophy, badge: '92.4%', badgeColor: 'bg-emerald-600' },
    { name: 'Fees', icon: IndianRupee, badge: '1 Due', badgeColor: 'bg-amber-600' },
    { name: 'Leave Application', icon: FilePlus },
    { name: 'Gallery', icon: Images },
    { name: 'Library', icon: Library },
    { name: 'Profile', icon: User },
    { name: 'Notifications', icon: Bell, badge: `${notifications.filter(n => !n.read).length}`, badgeColor: 'bg-red-500' },
    { name: 'Settings', icon: Settings },
  ];

  const handleMenuClick = (item: MenuItem) => {
    // Show Flutter SnackBar exactly like user code:
    // ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('${item['name']} selected')));
    showSnackBar(`${item.name} selected`);
    // And open interactive module view
    setActiveModule(item.name);
  };

  const handleQuickRoleSwitch = (newRole: UserRole) => {
    setCurrentUser(DEFAULT_USERS[newRole]);
    showSnackBar(`Switched view to ${newRole}: ${DEFAULT_USERS[newRole].name}`);
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const filteredMenus = menus.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#E5EDF7] flex flex-col items-center justify-start p-0 md:py-6 md:px-4 font-sans select-none antialiased">
      {/* Top Device View Mode Toolbar (Desktop / Tablet aid) */}
      <div className="w-full max-w-4xl mb-3 px-4 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-neutral-200 shadow-xs text-xs font-semibold text-neutral-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Ashadeep Flutter Portal
          </div>
          {/* Quick Role Switcher */}
          <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-full border border-neutral-200 shadow-xs text-xs">
            <span className="text-[11px] font-bold text-neutral-400 px-2">Role:</span>
            {(['Student', 'Teacher', 'Admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleQuickRoleSwitch(r)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold transition-all ${
                  currentUser.role === r
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode Toggle: Mobile Phone Frame vs Expanded Web View */}
        <div className="flex items-center gap-1 bg-white/80 backdrop-blur-xs p-1 rounded-full border border-neutral-200 shadow-xs text-xs font-medium text-neutral-600">
          <button
            type="button"
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === 'mobile'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'hover:bg-neutral-100'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('web')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
              viewMode === 'web'
                ? 'bg-blue-600 text-white font-bold shadow-xs'
                : 'hover:bg-neutral-100'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Expanded Layout
          </button>
        </div>
      </div>

      {/* Main Container - either Smartphone Mockup Frame or Responsive Full Web View */}
      <div
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-[420px] bg-[#F3F6FC] md:rounded-[36px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] md:border-[10px] md:border-neutral-900 overflow-hidden flex flex-col min-h-screen md:min-h-[820px] md:max-h-[90vh]'
            : 'max-w-4xl bg-[#F3F6FC] rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden flex flex-col min-h-[85vh]'
        }`}
      >
        {/* Phone Speaker & Camera Notch (Only in Mobile Frame) */}
        {viewMode === 'mobile' && (
          <div className="hidden md:flex w-full bg-neutral-900 py-1.5 items-center justify-center relative">
            <div className="w-20 h-4 bg-neutral-950 rounded-full flex items-center justify-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
            </div>
          </div>
        )}

        {/* Flutter Scaffold AppBar */}
        <div className="bg-[#1E88E5] text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-white" />
            <h1 className="text-lg font-bold tracking-tight">
              Ashadeep School App
            </h1>
          </div>
          <div className="flex items-center gap-1">
            {/* Notifications quick button */}
            <button
              type="button"
              onClick={() => handleMenuClick(menus.find(m => m.name === 'Notifications')!)}
              className="p-2 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-white" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-400 ring-2 ring-blue-600 animate-pulse" />
              )}
            </button>

            {/* Logout button from Flutter AppBar actions */}
            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors cursor-pointer"
              aria-label="Logout"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Body Container (matching Flutter Column with header banner + GridView) */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Top Blue Welcome Header Banner */}
          <div className="w-full bg-[#1E88E5] px-5 pt-3 pb-6 text-white text-center shadow-inner shrink-0">
            {/* Circle Avatar with school icon */}
            <div className="w-16 h-16 rounded-full bg-white text-[#1E88E5] flex items-center justify-center mx-auto shadow-md mb-2.5">
              <GraduationCap className="w-9 h-9" strokeWidth={2.2} />
            </div>

            <h2 className="text-[21px] font-bold leading-tight">
              Welcome {currentUser.name || userName}!
            </h2>
            <p className="text-sm text-blue-100 font-medium mt-0.5">
              {currentUser.role} Dashboard
            </p>

            {/* Sub-info badge */}
            <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold">
              <span>{currentUser.grade || 'Class 10th-A'}</span>
              <span>•</span>
              <span>ID: {currentUser.id}</span>
            </div>
          </div>

          {/* Quick Notice Ticker */}
          <div
            onClick={() => setActiveModule('Noticeboard')}
            className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between text-xs text-amber-900 cursor-pointer hover:bg-amber-100/70 transition-colors"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Megaphone className="w-3.5 h-3.5 text-amber-600 shrink-0 animate-bounce" />
              <span className="truncate font-semibold">
                Notice: {notices[0]?.title}
              </span>
            </div>
            <span className="text-[10px] font-bold text-amber-700 uppercase shrink-0 pl-2">
              View
            </span>
          </div>

          {/* Search box to quickly find menu features */}
          <div className="px-3.5 pt-3 pb-1">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menus (e.g. Attendance, Fees, Result)..."
                className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200/80 text-xs text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-xs"
              />
            </div>
          </div>

          {/* Grid View: 3-column grid matching Flutter SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, childAspectRatio: 0.90) */}
          <div className="flex-1 p-3">
            <div
              className={`grid gap-2.5 ${
                viewMode === 'mobile'
                  ? 'grid-cols-3'
                  : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6'
              }`}
            >
              {filteredMenus.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => handleMenuClick(item)}
                    className="relative bg-white rounded-[16px] aspect-[0.92] flex flex-col items-center justify-center p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md active:scale-95 transition-all border border-neutral-100 hover:border-blue-200 cursor-pointer group text-neutral-800"
                  >
                    {/* Badge if present */}
                    {item.badge && (
                      <span
                        className={`absolute top-1.5 right-1.5 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-full shadow-xs ${
                          item.badgeColor || 'bg-blue-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Flutter icon: 35 size, Colors.blue */}
                    <div className="mb-2 text-[#1E88E5] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-[35px] h-[35px]" strokeWidth={2} />
                    </div>

                    {/* Menu item name: 11px font-semibold text-center */}
                    <span className="text-[11px] font-semibold text-center leading-tight text-neutral-800 line-clamp-2 px-0.5">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom School Footer Signature */}
          <div className="py-3 text-center text-xs text-neutral-400 font-medium">
            Ashadeep Educational Trust • Surat
          </div>
        </div>
      </div>

      {/* Module Detail Modal for all 21 Modules */}
      {activeModule && (
        <ModuleDetailModal
          moduleName={activeModule}
          user={currentUser}
          onClose={() => setActiveModule(null)}
          showSnackBar={showSnackBar}
          notices={notices}
          setNotices={setNotices}
          homework={homework}
          setHomework={setHomework}
          attendance={attendance}
          setAttendance={setAttendance}
          remarks={MOCK_REMARKS}
          studyMaterials={MOCK_STUDY_MATERIALS}
          videos={MOCK_VIDEOS}
          queries={queries}
          setQueries={setQueries}
          liveClasses={MOCK_LIVE_CLASSES}
          exams={MOCK_EXAMS}
          certificates={MOCK_CERTIFICATES}
          calendarEvents={MOCK_CALENDAR_EVENTS}
          syllabus={MOCK_SYLLABUS}
          timetable={MOCK_TIMETABLE}
          result={MOCK_RESULT}
          fees={fees}
          setFees={setFees}
          leaves={leaves}
          setLeaves={setLeaves}
          gallery={MOCK_GALLERY}
          library={MOCK_LIBRARY}
          notifications={notifications}
          setNotifications={setNotifications}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};
