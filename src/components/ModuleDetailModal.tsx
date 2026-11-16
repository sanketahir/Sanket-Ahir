import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  Share2,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Search,
  Plus,
  Play,
  Maximize2,
  Send,
  Printer,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Heart,
  BookOpen,
  HelpCircle,
  Check,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  ShieldCheck,
  IndianRupee,
  CreditCard,
  Building
} from 'lucide-react';
import {
  UserProfile,
  UserRole,
  Notice,
  HomeworkItem,
  AttendanceRecord,
  RemarkItem,
  StudyMaterialItem,
  VideoTutorialItem,
  StudentQuery,
  LiveClassItem,
  ExamItem,
  CertificateItem,
  CalendarEvent,
  SyllabusItem,
  DayTimetable,
  ResultReport,
  FeeItem,
  LeaveRequest,
  GalleryPhoto,
  LibraryBook,
  AppNotification
} from '../types';

interface ModuleDetailModalProps {
  moduleName: string;
  user: UserProfile;
  onClose: () => void;
  showSnackBar: (msg: string) => void;
  // Shared state
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  homework: HomeworkItem[];
  setHomework: React.Dispatch<React.SetStateAction<HomeworkItem[]>>;
  attendance: AttendanceRecord[];
  setAttendance: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  remarks: RemarkItem[];
  studyMaterials: StudyMaterialItem[];
  videos: VideoTutorialItem[];
  queries: StudentQuery[];
  setQueries: React.Dispatch<React.SetStateAction<StudentQuery[]>>;
  liveClasses: LiveClassItem[];
  exams: ExamItem[];
  certificates: CertificateItem[];
  calendarEvents: CalendarEvent[];
  syllabus: SyllabusItem[];
  timetable: DayTimetable[];
  result: ResultReport;
  fees: FeeItem[];
  setFees: React.Dispatch<React.SetStateAction<FeeItem[]>>;
  leaves: LeaveRequest[];
  setLeaves: React.Dispatch<React.SetStateAction<LeaveRequest[]>>;
  gallery: GalleryPhoto[];
  library: LibraryBook[];
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
  onLogout: () => void;
}

export const ModuleDetailModal: React.FC<ModuleDetailModalProps> = ({
  moduleName,
  user,
  onClose,
  showSnackBar,
  notices,
  setNotices,
  homework,
  setHomework,
  attendance,
  setAttendance,
  remarks,
  studyMaterials,
  videos,
  queries,
  setQueries,
  liveClasses,
  exams,
  certificates,
  calendarEvents,
  syllabus,
  timetable,
  result,
  fees,
  setFees,
  leaves,
  setLeaves,
  gallery,
  library,
  notifications,
  setNotifications,
  onLogout
}) => {
  // Notice filter
  const [noticeFilter, setNoticeFilter] = useState<string>('All');
  const [noticeSearch, setNoticeSearch] = useState<string>('');
  const [newNoticeOpen, setNewNoticeOpen] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'Urgent' | 'Academic' | 'Sports' | 'Event' | 'Holiday'>('Academic');

  // Homework filter
  const [hwTab, setHwTab] = useState<'All' | 'Pending' | 'Submitted' | 'Reviewed'>('All');
  const [hwModalItem, setHwModalItem] = useState<HomeworkItem | null>(null);

  // Live class simulation
  const [activeLiveRoom, setActiveLiveRoom] = useState<LiveClassItem | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  // Certificate printable preview
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);

  // Video tutorial player modal
  const [activeVideo, setActiveVideo] = useState<VideoTutorialItem | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Timetable active day
  const [activeDay, setActiveDay] = useState<string>('Monday');

  // Queries
  const [querySubject, setQuerySubject] = useState('Mathematics');
  const [queryText, setQueryText] = useState('');
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);

  // Fees payment
  const [payingFeeItem, setPayingFeeItem] = useState<FeeItem | null>(null);
  const [payMethod, setPayMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [selectedReceipt, setSelectedReceipt] = useState<FeeItem | null>(null);

  // Leave application
  const [showApplyLeave, setShowApplyLeave] = useState(false);
  const [leaveType, setLeaveType] = useState<'Medical' | 'Casual' | 'Family Function'>('Medical');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');
  const [leaveReason, setLeaveReason] = useState('');

  // Library search
  const [librarySearch, setLibrarySearch] = useState('');
  const [libraryFilter, setLibraryFilter] = useState('All');

  // Settings
  const [appTheme, setAppTheme] = useState<'Light' | 'Dark'>('Light');
  const [appLang, setAppLang] = useState<'English' | 'Gujarati' | 'Hindi'>('English');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  // Notice submit
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeContent.trim()) {
      showSnackBar('Please fill in notice title and content');
      return;
    }
    const newNotice: Notice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle.trim(),
      content: newNoticeContent.trim(),
      category: newNoticeCategory,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      author: user.name,
      isImportant: newNoticeCategory === 'Urgent'
    };
    setNotices([newNotice, ...notices]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticeOpen(false);
    showSnackBar('Notice published successfully!');
  };

  // Submit Homework action
  const handleHwSubmit = (hwId: string) => {
    setHomework(prev => prev.map(item => item.id === hwId ? { ...item, status: 'Submitted' } : item));
    setHwModalItem(null);
    showSnackBar('Homework submitted to teacher for grading!');
  };

  // Submit Doubt Query
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) {
      showSnackBar('Please enter your question');
      return;
    }
    const newQ: StudentQuery = {
      id: `q-${Date.now()}`,
      subject: querySubject,
      question: queryText.trim(),
      studentName: user.name,
      askedDate: 'Just now',
      status: 'Pending'
    };
    setQueries([newQ, ...queries]);
    setQueryText('');
    setShowNewQueryForm(false);
    showSnackBar('Doubt submitted to subject teacher!');
  };

  // Fee payment complete simulation
  const handleCompletePayment = () => {
    if (!payingFeeItem) return;
    const receipt = `ASH-REC-${Math.floor(100000 + Math.random() * 900000)}`;
    setFees(prev => prev.map(f => f.id === payingFeeItem.id ? {
      ...f,
      status: 'Paid',
      receiptNo: receipt,
      paidDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    } : f));
    setPayingFeeItem(null);
    showSnackBar(`Payment of ₹${payingFeeItem.amount.toLocaleString('en-IN')} successful! Receipt #${receipt}`);
  };

  // Submit Leave request
  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveStart || !leaveEnd || !leaveReason.trim()) {
      showSnackBar('Please fill all leave fields');
      return;
    }
    const newLv: LeaveRequest = {
      id: `lv-${Date.now()}`,
      type: leaveType,
      startDate: leaveStart,
      endDate: leaveEnd,
      reason: leaveReason.trim(),
      status: 'Pending',
      appliedDate: 'Today'
    };
    setLeaves([newLv, ...leaves]);
    setShowApplyLeave(false);
    setLeaveReason('');
    showSnackBar('Leave application submitted for approval.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 md:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="w-full h-full md:h-[92vh] max-w-4xl bg-[#F3F6FC] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
      >
        {/* Flutter Style Module AppBar */}
        <div className="bg-[#1E88E5] text-white px-4 py-3.5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-bold leading-tight tracking-tight">
                {moduleName}
              </h2>
              <p className="text-[11px] text-blue-100 font-medium">
                Ashadeep School • {user.role} Portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {/* 1. NOTICEBOARD */}
          {moduleName === 'Noticeboard' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={noticeSearch}
                    onChange={(e) => setNoticeSearch(e.target.value)}
                    placeholder="Search circulars, exams, events..."
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {(user.role === 'Teacher' || user.role === 'Admin') && (
                  <button
                    type="button"
                    onClick={() => setNewNoticeOpen(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Post Notice
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {['All', 'Urgent', 'Academic', 'Sports', 'Holiday'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setNoticeFilter(cat)}
                    className={`px-3 py-1.5 rounded-full font-semibold transition-all shrink-0 ${
                      noticeFilter === cat
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Notice cards */}
              <div className="space-y-3">
                {notices
                  .filter(n => noticeFilter === 'All' || n.category === noticeFilter)
                  .filter(n => n.title.toLowerCase().includes(noticeSearch.toLowerCase()) || n.content.toLowerCase().includes(noticeSearch.toLowerCase()))
                  .map((notice) => (
                    <div
                      key={notice.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-neutral-200/80 hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                      {notice.isImportant && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-bl-lg">
                          Important
                        </div>
                      )}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          notice.category === 'Urgent'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : notice.category === 'Academic'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : notice.category === 'Sports'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {notice.category}
                        </span>
                        <span className="text-xs text-neutral-400">• {notice.date}</span>
                      </div>
                      <h3 className="font-bold text-neutral-900 text-base mb-1.5">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {notice.content}
                      </p>
                      <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                        <span>Issued by: <strong className="text-neutral-700">{notice.author}</strong></span>
                        <button
                          type="button"
                          onClick={() => showSnackBar(`Downloaded official circular: ${notice.title}`)}
                          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                        >
                          <Download className="w-3.5 h-3.5" /> Circular PDF
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* New Notice Modal */}
              {newNoticeOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900">Publish New Notice</h3>
                    <form onSubmit={handleAddNotice} className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-1">Notice Category</label>
                        <select
                          value={newNoticeCategory}
                          onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm"
                        >
                          <option value="Urgent">Urgent</option>
                          <option value="Academic">Academic</option>
                          <option value="Sports">Sports</option>
                          <option value="Event">Event</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-1">Title</label>
                        <input
                          type="text"
                          value={newNoticeTitle}
                          onChange={(e) => setNewNoticeTitle(e.target.value)}
                          placeholder="e.g. Science Exhibition Registration"
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-neutral-600 block mb-1">Notice Content</label>
                        <textarea
                          rows={3}
                          value={newNoticeContent}
                          onChange={(e) => setNewNoticeContent(e.target.value)}
                          placeholder="Write circular description here..."
                          className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setNewNoticeOpen(false)}
                          className="px-4 py-2 border rounded-lg text-sm text-neutral-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700"
                        >
                          Publish
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. HOMEWORK */}
          {moduleName === 'Homework' && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs">
                {(['All', 'Pending', 'Submitted', 'Reviewed'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setHwTab(tab)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      hwTab === tab
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {tab} ({homework.filter(h => tab === 'All' || h.status === tab).length})
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {homework
                  .filter(item => hwTab === 'All' || item.status === hwTab)
                  .map((hw) => (
                    <div
                      key={hw.id}
                      className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                            {hw.subject}
                          </span>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                            hw.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : hw.status === 'Submitted'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}>
                            {hw.status} {hw.submissionGrade && `(${hw.submissionGrade})`}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-900 text-base">
                          {hw.title}
                        </h4>
                        <p className="text-xs text-neutral-600 line-clamp-2">
                          {hw.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-neutral-400 pt-1">
                          <span>Assigned: {hw.assignedDate}</span>
                          <span className="font-medium text-red-600">Due: {hw.dueDate}</span>
                          <span>Teacher: {hw.teacher}</span>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        {hw.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => setHwModalItem(hw)}
                            className="w-full md:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                          >
                            Submit Homework
                          </button>
                        )}
                        {hw.status === 'Submitted' && (
                          <span className="text-xs font-semibold text-neutral-500 bg-neutral-100 px-3 py-1.5 rounded-xl flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-500" /> Under Evaluation
                          </span>
                        )}
                        {hw.status === 'Reviewed' && (
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5" /> Grade: {hw.submissionGrade}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Submit modal */}
              {hwModalItem && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                    <h3 className="text-base font-bold text-neutral-900">
                      Submit Assignment: {hwModalItem.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Upload your notebook scan photos or typed solution PDF.
                    </p>
                    <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-neutral-50 cursor-pointer">
                      <FileText className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-xs font-semibold text-neutral-700">Click to attach photo or PDF</p>
                      <p className="text-[11px] text-neutral-400 mt-1">PNG, JPG, PDF up to 15MB</p>
                    </div>
                    <textarea
                      placeholder="Add an optional comment for your teacher..."
                      rows={2}
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setHwModalItem(null)}
                        className="px-4 py-2 border rounded-xl text-xs font-semibold text-neutral-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHwSubmit(hwModalItem.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs"
                      >
                        Confirm Submission
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. ATTENDANCE */}
          {moduleName === 'Attendance' && (
            <div className="space-y-4">
              {/* Summary Stats Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full border-4 border-emerald-500 bg-emerald-50 flex flex-col items-center justify-center text-emerald-700 font-extrabold shadow-inner">
                    <span className="text-xl">92.4%</span>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-800">Present</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-neutral-900 text-lg">
                      Academic Year 2024-25
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Class 10th-A • Roll No 24 • Aarav Sharma
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Attendance Good & Eligible for Board Exams
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full md:w-auto text-center">
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                    <div className="text-xs text-neutral-400 font-medium">Present</div>
                    <div className="text-lg font-bold text-emerald-600">102 Days</div>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                    <div className="text-xs text-neutral-400 font-medium">Absent</div>
                    <div className="text-lg font-bold text-red-500">4 Days</div>
                  </div>
                  <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
                    <div className="text-xs text-neutral-400 font-medium">Approved Leave</div>
                    <div className="text-lg font-bold text-amber-500">4 Days</div>
                  </div>
                </div>
              </div>

              {/* Monthly Attendance Log */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-neutral-800 text-sm">
                    November 2024 Daily Log
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] font-medium text-neutral-500">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Absent</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Leave</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Holiday</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {attendance.map((rec) => (
                    <div
                      key={rec.date}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-transform hover:scale-[1.02] ${
                        rec.status === 'Present'
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-800'
                          : rec.status === 'Absent'
                          ? 'bg-red-50/60 border-red-200 text-red-800'
                          : rec.status === 'Leave'
                          ? 'bg-amber-50/60 border-amber-200 text-amber-800'
                          : 'bg-blue-50/60 border-blue-200 text-blue-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-neutral-800">{rec.date}</div>
                        <div className="text-[10px] opacity-75">{rec.remark || 'Regular Working Day'}</div>
                      </div>
                      <span className="font-bold text-xs uppercase">{rec.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. REMARK */}
          {moduleName === 'Remark' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200 text-xs text-neutral-500">
                Official teacher observations, appreciation stars, and behavior remarks recorded in the school ERP.
              </div>
              {remarks.map((rem) => (
                <div
                  key={rem.id}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-2 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      rem.type === 'Praise'
                        ? 'bg-emerald-100 text-emerald-800'
                        : rem.type === 'Improvement'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      ★ {rem.type}
                    </span>
                    <span className="text-xs text-neutral-400">{rem.date}</span>
                  </div>
                  <p className="text-sm font-medium text-neutral-800 italic">
                    "{rem.message}"
                  </p>
                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                    <span>Teacher: <strong className="text-neutral-700">{rem.teacherName}</strong></span>
                    <span>Subject: <strong className="text-neutral-700">{rem.subject}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 5. STUDY MATERIAL */}
          {moduleName === 'Study Material' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studyMaterials.map((mat) => (
                  <div
                    key={mat.id}
                    className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {mat.subject}
                        </span>
                        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          {mat.fileType} • {mat.fileSize}
                        </span>
                      </div>
                      <h4 className="font-bold text-neutral-900 text-sm mb-1 line-clamp-2">
                        {mat.title}
                      </h4>
                      <p className="text-xs text-neutral-500">
                        {mat.chapter} • Uploaded by {mat.teacher}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <span className="text-[11px] text-neutral-400">{mat.uploadDate}</span>
                      <button
                        type="button"
                        onClick={() => showSnackBar(`Downloaded ${mat.title} (${mat.fileSize})`)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. VIDEO TUTORIAL */}
          {moduleName === 'Video Tutorial' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setActiveVideo(vid);
                      setVideoPlaying(true);
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs border border-neutral-200/80 hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-5 h-5 ml-0.5 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {vid.duration}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {vid.subject}
                      </span>
                      <h4 className="font-bold text-neutral-800 text-xs mt-1.5 line-clamp-2">
                        {vid.title}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        By {vid.teacher} • {vid.views} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Video Player Modal */}
              {activeVideo && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl">
                    <div className="relative aspect-video bg-black flex items-center justify-center">
                      <img
                        src={activeVideo.thumbnailUrl}
                        alt="video thumbnail"
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2">
                        <div className="w-16 h-16 rounded-full bg-blue-600/90 flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 ml-1 fill-white" />
                        </div>
                        <p className="text-sm font-semibold">Lecture: {activeVideo.title}</p>
                        <p className="text-xs text-neutral-300">Length: {activeVideo.duration} • Full HD 1080p</p>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-base font-bold text-neutral-900">{activeVideo.title}</h3>
                          <p className="text-xs text-neutral-500 mt-0.5">Faculty: {activeVideo.teacher} • Ashadeep Digital Class</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveVideo(null)}
                          className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg text-xs font-semibold"
                        >
                          Close
                        </button>
                      </div>
                      <p className="text-xs text-neutral-600 mt-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                        {activeVideo.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. QUERY */}
          {moduleName === 'Query' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Ask Faculty a Question</h3>
                  <p className="text-xs text-neutral-500">Clarify homework doubts, concepts, or exam prep queries directly.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewQueryForm(!showNewQueryForm)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Ask Doubt
                </button>
              </div>

              {showNewQueryForm && (
                <form onSubmit={handleQuerySubmit} className="bg-white rounded-2xl p-5 shadow-xs border border-blue-200 space-y-3">
                  <h4 className="font-bold text-neutral-800 text-sm">New Doubt Form</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1">Subject</label>
                      <select
                        value={querySubject}
                        onChange={(e) => setQuerySubject(e.target.value)}
                        className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm"
                      >
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="Social Science">Social Science</option>
                        <option value="Computer">Computer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1">Your Question / Doubt Details</label>
                    <textarea
                      rows={3}
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      placeholder="Write exercise number, formula, or concept query..."
                      className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewQueryForm(false)}
                      className="px-3.5 py-1.5 border rounded-lg text-xs font-semibold text-neutral-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                    >
                      Submit Doubt
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {queries.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-3 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {q.subject}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        q.status === 'Answered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {q.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-400 font-medium">{q.studentName} • {q.askedDate}</p>
                      <p className="text-sm font-semibold text-neutral-800 mt-0.5">{q.question}</p>
                    </div>

                    {q.reply && (
                      <div className="bg-blue-50/70 rounded-xl p-3 border border-blue-100 text-xs space-y-1">
                        <div className="flex items-center justify-between text-blue-900 font-bold">
                          <span>Reply from {q.repliedBy}</span>
                          <span className="text-[10px] font-normal text-blue-600">{q.replyDate}</span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed">{q.reply}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. LIVE CLASS */}
          {moduleName === 'Live Class' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {liveClasses.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          item.status === 'Live Now'
                            ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse'
                            : item.status === 'Upcoming'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          ● {item.status}
                        </span>
                        <span className="text-xs font-semibold text-neutral-400">{item.subject}</span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900">{item.topic}</h4>
                      <p className="text-xs text-neutral-500">
                        Instructor: <strong className="text-neutral-700">{item.teacher}</strong> • Time: {item.time} ({item.date})
                      </p>
                    </div>

                    <div>
                      {item.status === 'Live Now' && (
                        <button
                          type="button"
                          onClick={() => setActiveLiveRoom(item)}
                          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md shadow-red-500/20 cursor-pointer animate-bounce"
                        >
                          <Video className="w-4 h-4" /> Join Class Now
                        </button>
                      )}
                      {item.status === 'Upcoming' && (
                        <button
                          type="button"
                          onClick={() => showSnackBar(`Reminder set for ${item.subject} class at ${item.time}`)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold"
                        >
                          Set Reminder
                        </button>
                      )}
                      {item.status === 'Completed' && (
                        <button
                          type="button"
                          onClick={() => showSnackBar('Opening recording replay...')}
                          className="px-4 py-2 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-xl text-xs font-medium"
                        >
                          View Recording
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Live Room Interface */}
              {activeLiveRoom && (
                <div className="fixed inset-0 z-50 bg-neutral-950 flex flex-col text-white">
                  {/* Top Live Bar */}
                  <div className="px-4 py-3 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        {activeLiveRoom.topic}
                      </h3>
                      <p className="text-[11px] text-neutral-400">Ashadeep Digital Class • {activeLiveRoom.teacher}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveLiveRoom(null)}
                      className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
                    >
                      Leave Class
                    </button>
                  </div>

                  {/* Main Classroom Grid */}
                  <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 overflow-hidden">
                    <div className="md:col-span-3 bg-neutral-900 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-neutral-800">
                      <div className="w-24 h-24 rounded-full bg-blue-600/30 border-2 border-blue-500 flex items-center justify-center text-blue-400 font-bold text-2xl mb-3">
                        {activeLiveRoom.teacher.substring(0, 2)}
                      </div>
                      <h4 className="text-base font-bold text-white">{activeLiveRoom.teacher} (Host)</h4>
                      <p className="text-xs text-neutral-400 mt-1">Screen sharing: "Trigonometric Proofs.pdf"</p>

                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> High Definition • 48 Students Attending
                      </div>
                    </div>

                    <div className="bg-neutral-900 rounded-2xl p-4 flex flex-col border border-neutral-800">
                      <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
                        Class Discussion
                      </h5>
                      <div className="flex-1 overflow-y-auto space-y-2 text-xs">
                        <div className="bg-neutral-800/80 p-2 rounded-lg">
                          <span className="font-bold text-blue-400">Mrs. Pooja Patel:</span> Welcome everyone! Turn to page 88.
                        </div>
                        <div className="bg-neutral-800/80 p-2 rounded-lg">
                          <span className="font-bold text-emerald-400">Aarav Sharma:</span> Good afternoon teacher! Audio is clear.
                        </div>
                        <div className="bg-neutral-800/80 p-2 rounded-lg">
                          <span className="font-bold text-amber-400">Devansh Joshi:</span> Yes mam, can we repeat step 3?
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-neutral-800 flex gap-2">
                        <input
                          type="text"
                          placeholder="Type doubt in class..."
                          className="flex-1 bg-neutral-800 px-3 py-1.5 rounded-lg text-xs text-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => showSnackBar('Message sent to teacher')}
                          className="p-2 bg-blue-600 rounded-lg text-white"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Controls */}
                  <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsMicOn(!isMicOn)}
                      className={`p-3 rounded-full transition-colors ${
                        isMicOn ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                      className={`p-3 rounded-full transition-colors ${
                        isVideoOn ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => showSnackBar('Hand raised in class')}
                      className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-semibold text-white"
                    >
                      ✋ Raise Hand
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 9. EXAM */}
          {moduleName === 'Exam' && (
            <div className="space-y-4">
              {exams.map((exam) => (
                <div key={exam.id} className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div>
                      <h3 className="font-extrabold text-neutral-900 text-base">{exam.title}</h3>
                      <p className="text-xs text-neutral-500">Period: {exam.startDate} to {exam.endDate}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showSnackBar('Downloaded Admit Card / Hall Ticket with barcode')}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" /> Download Hall Ticket
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold border-b border-neutral-200">
                        <tr>
                          <th className="py-2.5 px-3">Date & Day</th>
                          <th className="py-2.5 px-3">Subject</th>
                          <th className="py-2.5 px-3">Timing</th>
                          <th className="py-2.5 px-3 text-right">Max Marks</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {exam.timetable.map((row, i) => (
                          <tr key={i} className="hover:bg-neutral-50/70 font-medium text-neutral-700">
                            <td className="py-2.5 px-3">
                              <div className="font-bold text-neutral-900">{row.date}</div>
                              <div className="text-[10px] text-neutral-400">{row.day}</div>
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-blue-700">{row.subject}</td>
                            <td className="py-2.5 px-3">{row.time}</td>
                            <td className="py-2.5 px-3 text-right font-bold">{row.totalMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 10. CERTIFICATE */}
          {moduleName === 'Certificate' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                        {cert.certificateType} Certificate
                      </span>
                      <h4 className="font-bold text-neutral-900 text-sm mt-1">{cert.title}</h4>
                      <p className="text-xs text-neutral-500 mt-2 line-clamp-2">{cert.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-neutral-400">{cert.issueDate}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(cert)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        View & Print
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Certificate Preview Modal */}
              {selectedCertificate && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border-4 border-amber-300 relative text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedCertificate(null)}
                      className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <div className="border border-amber-400 p-6 rounded-xl bg-amber-50/20">
                      <div className="text-xs font-bold tracking-widest text-blue-700 uppercase">
                        Ashadeep Educational Trust
                      </div>
                      <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-neutral-900 mt-1">
                        ASHADEEP SCHOOL
                      </h2>
                      <div className="text-[11px] text-neutral-500 uppercase tracking-widest mt-1 mb-5">
                        Certificate of Excellence & Recognition
                      </div>
                      <p className="text-xs text-neutral-600">This is to officially certify that</p>
                      <h3 className="text-xl font-bold text-blue-800 my-2 underline decoration-amber-400 underline-offset-4">
                        {selectedCertificate.issuedTo}
                      </h3>
                      <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed">
                        {selectedCertificate.description}
                      </p>
                      <div className="mt-8 pt-6 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-200">
                        <div className="text-left">
                          <div>Date: <strong>{selectedCertificate.issueDate}</strong></div>
                          <div>Cert ID: #{selectedCertificate.id}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-serif italic text-blue-900 font-bold">Dr. K. N. Mehta</div>
                          <div className="text-[10px]">Principal & Director</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => showSnackBar('Sent to printer / saved as official PDF')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                      >
                        <Printer className="w-4 h-4" /> Print Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 11. CALENDAR */}
          {moduleName === 'Calendar' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80">
                <h3 className="font-bold text-neutral-900 text-base mb-1">
                  Academic Calendar 2024-2025
                </h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Important holidays, festival breaks, sports meets, and examination dates.
                </p>

                <div className="space-y-2.5">
                  {calendarEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-xl border border-neutral-100 bg-neutral-50 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex flex-col items-center justify-center font-bold">
                          <span>{ev.date.split('-')[2]}</span>
                          <span className="text-[9px] uppercase">Nov</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-neutral-900 text-sm">{ev.title}</h5>
                          <p className="text-neutral-500 text-xs">{ev.description}</p>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                        ev.category === 'Holiday'
                          ? 'bg-red-50 text-red-700'
                          : ev.category === 'Exam'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {ev.category}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 12. SYLLABUS */}
          {moduleName === 'Syllabus' && (
            <div className="space-y-4">
              {syllabus.map((syl) => {
                const percent = Math.round((syl.completedChapters / syl.totalChapters) * 100);
                return (
                  <div key={syl.id} className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-base">{syl.subject}</h4>
                        <p className="text-xs text-neutral-500">
                          {syl.completedChapters} of {syl.totalChapters} Units Completed
                        </p>
                      </div>
                      <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {percent}% Done
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    {/* Chapter list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      {syl.chapters.map((ch, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl border border-neutral-100 bg-neutral-50/60 flex items-center justify-between text-xs"
                        >
                          <span className="font-medium text-neutral-800">{ch.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            ch.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ch.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}>
                            {ch.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 13. TIMETABLE */}
          {moduleName === 'Timetable' && (
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDay(d)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                      activeDay === d ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                {(timetable.find(t => t.day === activeDay)?.slots || timetable[0].slots).map((slot, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs transition-transform hover:scale-[1.01] ${
                      slot.period === 0
                        ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                        : 'bg-white border-neutral-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex flex-col items-center justify-center font-bold">
                        <span className="text-[10px] text-neutral-400">P</span>
                        <span>{slot.period === 0 ? '☕' : slot.period}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 text-sm">{slot.subject}</h4>
                        <p className="text-neutral-500 text-xs">Teacher: {slot.teacher} • {slot.room}</p>
                      </div>
                    </div>
                    <div className="text-right font-semibold text-neutral-600">
                      {slot.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 14. RESULT */}
          {moduleName === 'Result' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-neutral-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Academic Marksheet
                    </span>
                    <h3 className="text-xl font-extrabold text-neutral-900">{result.term}</h3>
                    <p className="text-xs text-neutral-500">Student: Aarav Sharma • Class 10th-A • Roll No. 24</p>
                  </div>
                  <div className="flex items-center gap-4 text-center">
                    <div className="bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                      <div className="text-xs text-neutral-500 font-medium">Percentage</div>
                      <div className="text-xl font-extrabold text-blue-700">{result.percentage}%</div>
                    </div>
                    <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
                      <div className="text-xs text-neutral-500 font-medium">Rank</div>
                      <div className="text-xl font-extrabold text-emerald-700">#{result.rank} / {result.totalStudents}</div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-neutral-50 text-neutral-500 uppercase font-semibold border-b border-neutral-200">
                      <tr>
                        <th className="py-2.5 px-3">Subject</th>
                        <th className="py-2.5 px-3 text-center">Max Marks</th>
                        <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                        <th className="py-2.5 px-3 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 font-medium">
                      {result.subjects.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-neutral-50/70">
                          <td className="py-2.5 px-3 font-bold text-neutral-900">{sub.subject}</td>
                          <td className="py-2.5 px-3 text-center text-neutral-500">{sub.maxMarks}</td>
                          <td className="py-2.5 px-3 text-center font-bold text-blue-700">{sub.obtainedMarks}</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold">
                              {sub.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-neutral-50/80 font-bold text-neutral-900 border-t-2 border-neutral-200">
                      <tr>
                        <td className="py-3 px-3">Grand Total</td>
                        <td className="py-3 px-3 text-center">{result.totalMarks}</td>
                        <td className="py-3 px-3 text-center text-blue-700">{result.obtainedMarks}</td>
                        <td className="py-3 px-3 text-right text-emerald-700">{result.grade}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="bg-neutral-50 p-3.5 rounded-xl text-xs space-y-1 border border-neutral-200">
                  <span className="font-bold text-neutral-800">Class Teacher Remarks:</span>
                  <p className="text-neutral-600 italic">"{result.teacherRemark}"</p>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => showSnackBar('Exported official PDF report card')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-4 h-4" /> Export Report Card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 15. FEES */}
          {moduleName === 'Fees' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {fees.map((fee) => (
                  <div
                    key={fee.id}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-base">{fee.term}</h4>
                        <p className="text-xs text-neutral-500">Due Date: {fee.dueDate}</p>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        fee.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {fee.status}
                      </span>
                    </div>

                    {/* Breakdown */}
                    <div className="bg-neutral-50 rounded-xl p-3 divide-y divide-neutral-200 text-xs">
                      {fee.breakdown.map((b, i) => (
                        <div key={i} className="py-1.5 flex justify-between text-neutral-600">
                          <span>{b.label}</span>
                          <span className="font-semibold text-neutral-800">₹{b.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      <div className="pt-2 flex justify-between font-bold text-neutral-900 text-sm">
                        <span>Total Payable</span>
                        <span className="text-blue-700">₹{fee.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      {fee.status === 'Paid' ? (
                        <div className="text-xs text-neutral-500">
                          Receipt: <strong className="text-neutral-700">{fee.receiptNo}</strong> (Paid on {fee.paidDate})
                        </div>
                      ) : (
                        <div className="text-xs text-amber-600 font-medium">
                          No late fine applicable till due date.
                        </div>
                      )}

                      {fee.status === 'Paid' ? (
                        <button
                          type="button"
                          onClick={() => setSelectedReceipt(fee)}
                          className="px-3 py-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" /> View Receipt
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPayingFeeItem(fee)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
                        >
                          Pay Online Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Online Payment Simulator */}
              {payingFeeItem && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                    <h3 className="text-base font-bold text-neutral-900">
                      Fee Payment: {payingFeeItem.term}
                    </h3>
                    <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 flex justify-between items-center text-sm">
                      <span className="text-neutral-700 font-medium">Amount Due</span>
                      <span className="text-xl font-extrabold text-blue-700">₹{payingFeeItem.amount.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-neutral-600 block">Select Payment Method</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['upi', 'card', 'netbanking'] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setPayMethod(m)}
                            className={`p-2.5 rounded-xl border text-xs font-bold uppercase transition-all ${
                              payMethod === m ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-neutral-200 text-neutral-600'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {payMethod === 'upi' && (
                      <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 text-xs space-y-2">
                        <label className="block text-neutral-600 font-semibold">Enter UPI ID / VPA</label>
                        <input
                          type="text"
                          defaultValue="aarav.sharma@okaxis"
                          className="w-full p-2 bg-white border border-neutral-300 rounded-lg text-sm"
                        />
                        <p className="text-[10px] text-neutral-400">Supported: GPay, PhonePe, Paytm, BHIM</p>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setPayingFeeItem(null)}
                        className="px-4 py-2 border rounded-xl text-xs font-semibold text-neutral-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCompletePayment}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md"
                      >
                        Authorize & Pay ₹{payingFeeItem.amount.toLocaleString('en-IN')}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Receipt Modal */}
              {selectedReceipt && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-neutral-200 space-y-4">
                    <div className="text-center border-b border-neutral-200 pb-3">
                      <div className="text-xs font-bold text-blue-600 uppercase">Ashadeep School Surat</div>
                      <h3 className="text-base font-extrabold text-neutral-900 mt-0.5">OFFICIAL FEE RECEIPT</h3>
                      <p className="text-xs text-neutral-400">Receipt No: {selectedReceipt.receiptNo}</p>
                    </div>

                    <div className="text-xs space-y-1.5 text-neutral-700">
                      <div className="flex justify-between"><span>Student:</span> <strong className="text-neutral-900">Aarav Sharma (10-A)</strong></div>
                      <div className="flex justify-between"><span>Term:</span> <strong>{selectedReceipt.term}</strong></div>
                      <div className="flex justify-between"><span>Payment Date:</span> <strong>{selectedReceipt.paidDate}</strong></div>
                      <div className="flex justify-between"><span>Payment Mode:</span> <strong>Online UPI</strong></div>
                    </div>

                    <div className="border-t border-b border-dashed border-neutral-300 py-3 text-xs space-y-1">
                      {selectedReceipt.breakdown.map((b, i) => (
                        <div key={i} className="flex justify-between text-neutral-600">
                          <span>{b.label}</span>
                          <span>₹{b.amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                      <div className="pt-2 flex justify-between font-bold text-sm text-neutral-900">
                        <span>Total Paid</span>
                        <span className="text-emerald-700">₹{selectedReceipt.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] text-neutral-400">Computer generated receipt</span>
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(null)}
                        className="px-4 py-1.5 bg-neutral-800 text-white rounded-lg text-xs font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 16. LEAVE APPLICATION */}
          {moduleName === 'Leave Application' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Student Leave Applications</h3>
                  <p className="text-xs text-neutral-500">Apply for medical leave or planned absence with prior permission.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplyLeave(!showApplyLeave)}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Apply Leave
                </button>
              </div>

              {showApplyLeave && (
                <form onSubmit={handleApplyLeave} className="bg-white rounded-2xl p-5 shadow-xs border border-blue-200 space-y-3">
                  <h4 className="font-bold text-neutral-800 text-sm">New Leave Request</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1">Leave Type</label>
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value as any)}
                        className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                      >
                        <option value="Medical">Medical</option>
                        <option value="Casual">Casual</option>
                        <option value="Family Function">Family Function</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1">From Date</label>
                      <input
                        type="date"
                        value={leaveStart}
                        onChange={(e) => setLeaveStart(e.target.value)}
                        className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-neutral-600 block mb-1">To Date</label>
                      <input
                        type="date"
                        value={leaveEnd}
                        onChange={(e) => setLeaveEnd(e.target.value)}
                        className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-neutral-600 block mb-1">Reason for Leave</label>
                    <textarea
                      rows={2}
                      value={leaveReason}
                      onChange={(e) => setLeaveReason(e.target.value)}
                      placeholder="Specify clear medical or personal reason..."
                      className="w-full p-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowApplyLeave(false)}
                      className="px-3.5 py-1.5 border rounded-lg text-xs text-neutral-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700"
                    >
                      Submit Leave
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {leaves.map((lv) => (
                  <div
                    key={lv.id}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-2 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-700 bg-neutral-100 px-2.5 py-0.5 rounded-md">
                        {lv.type}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        lv.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : lv.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {lv.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-neutral-900">
                      Duration: {lv.startDate} to {lv.endDate}
                    </p>
                    <p className="text-xs text-neutral-600">{lv.reason}</p>
                    {lv.adminRemark && (
                      <p className="text-[11px] text-emerald-700 font-medium bg-emerald-50/50 p-2 rounded-lg border border-emerald-100">
                        {lv.adminRemark}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 17. GALLERY */}
          {moduleName === 'Gallery' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs border border-neutral-200/80 group"
                  >
                    <div className="aspect-video relative overflow-hidden bg-neutral-100">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {photo.category}
                      </span>
                    </div>
                    <div className="p-3.5 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-neutral-900 text-xs">{photo.title}</h4>
                        <span className="text-[10px] text-neutral-400">{photo.date}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => showSnackBar(`Liked ${photo.title}`)}
                        className="flex items-center gap-1 text-xs text-neutral-500 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                        <span>{photo.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 18. LIBRARY */}
          {moduleName === 'Library' && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={librarySearch}
                    onChange={(e) => setLibrarySearch(e.target.value)}
                    placeholder="Search books by title, author, or ISBN..."
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {library
                  .filter(b => b.title.toLowerCase().includes(librarySearch.toLowerCase()) || b.author.toLowerCase().includes(librarySearch.toLowerCase()))
                  .map((book) => (
                    <div
                      key={book.id}
                      className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200/80 flex items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                            {book.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            book.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {book.status}
                          </span>
                        </div>
                        <h4 className="font-bold text-neutral-900 text-sm">{book.title}</h4>
                        <p className="text-xs text-neutral-500">Author: {book.author} • ISBN: {book.isbn}</p>
                        {book.returnDate && (
                          <p className="text-[11px] text-amber-700 font-medium">Return due by: {book.returnDate}</p>
                        )}
                      </div>

                      <div>
                        {book.status === 'Available' ? (
                          <button
                            type="button"
                            onClick={() => showSnackBar(`Reserved "${book.title}". Collect from counter within 24h.`)}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                          >
                            Reserve Book
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => showSnackBar('You will be notified once returned by student.')}
                            className="px-3.5 py-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-600 rounded-xl text-xs font-medium"
                          >
                            Notify When Free
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 19. PROFILE */}
          {moduleName === 'Profile' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-neutral-200/80 max-w-xl mx-auto space-y-6">
                {/* ID Badge Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-5 text-white flex items-center gap-4 relative overflow-hidden shadow-lg">
                  <div className="w-16 h-16 rounded-full border-2 border-white/60 overflow-hidden bg-white/20 shrink-0">
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    <p className="text-xs text-blue-100">{user.role} • Ashadeep School</p>
                    <p className="text-[11px] font-mono text-blue-200 mt-1">ID: {user.id}</p>
                  </div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none" />
                </div>

                {/* Profile Details List */}
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                    <div>
                      <span className="text-neutral-400 block font-medium">Standard / Class:</span>
                      <strong className="text-neutral-800 text-sm">{user.grade || 'Class 10-A'}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-medium">Roll Number:</span>
                      <strong className="text-neutral-800 text-sm">{user.rollNumber || '24'}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-medium">Admission No:</span>
                      <strong className="text-neutral-800 text-sm">{user.admissionNo || 'AD-2018-892'}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block font-medium">Blood Group:</span>
                      <strong className="text-neutral-800 text-sm">{user.bloodGroup || 'B+'}</strong>
                    </div>
                  </div>

                  <div className="space-y-2 bg-neutral-50 p-3.5 rounded-xl border border-neutral-100">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <User className="w-4 h-4 text-blue-500" />
                      <span>Guardian: <strong>{user.guardianName || 'Rajesh Sharma (Father)'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Phone className="w-4 h-4 text-blue-500" />
                      <span>Phone: <strong>{user.phone || '+91 98765 43210'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span>Email: <strong>{user.email || 'aarav.sharma@ashadeep.edu.in'}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-700">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span>Address: <strong>{user.address || 'Ring Road, Surat, Gujarat'}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => showSnackBar('Contact update request sent to school office')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm"
                  >
                    Request Contact Update
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 20. NOTIFICATIONS */}
          {moduleName === 'Notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-neutral-900 text-base">Alerts & Messages</h3>
                  <p className="text-xs text-neutral-500">School announcements, reminders, and alerts</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                    showSnackBar('All notifications marked as read');
                  }}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>

              <div className="space-y-2.5">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      n.read ? 'bg-white border-neutral-200/80' : 'bg-blue-50/50 border-blue-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                        {!n.read && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                        {n.title}
                      </h4>
                      <span className="text-[11px] text-neutral-400">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-1 leading-relaxed">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 21. SETTINGS */}
          {moduleName === 'Settings' && (
            <div className="space-y-4 max-w-xl mx-auto">
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-4">
                <h3 className="font-bold text-neutral-900 text-base border-b border-neutral-100 pb-2">
                  Application Preferences
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-neutral-800">Interface Language</span>
                      <p className="text-neutral-400 text-[11px]">Primary language for app labels</p>
                    </div>
                    <select
                      value={appLang}
                      onChange={(e) => {
                        setAppLang(e.target.value as any);
                        showSnackBar(`Language switched to ${e.target.value}`);
                      }}
                      className="p-1.5 bg-neutral-50 border border-neutral-200 rounded-lg font-medium"
                    >
                      <option value="English">English</option>
                      <option value="Gujarati">ગુજરાતી (Gujarati)</option>
                      <option value="Hindi">हिंदी (Hindi)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div>
                      <span className="font-bold text-neutral-800">Push Notifications</span>
                      <p className="text-neutral-400 text-[11px]">Get live homework and class reminders</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setPushNotifs(!pushNotifs);
                        showSnackBar(pushNotifs ? 'Push notifications disabled' : 'Push notifications enabled');
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        pushNotifs ? 'bg-blue-600' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        pushNotifs ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
                    <div>
                      <span className="font-bold text-neutral-800">SMS Alerts</span>
                      <p className="text-neutral-400 text-[11px]">Receive fee reminders on registered mobile</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSmsAlerts(!smsAlerts);
                        showSnackBar(smsAlerts ? 'SMS alerts disabled' : 'SMS alerts enabled');
                      }}
                      className={`w-11 h-6 rounded-full transition-colors relative ${
                        smsAlerts ? 'bg-blue-600' : 'bg-neutral-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                        smsAlerts ? 'right-1' : 'left-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* School Contact Card */}
              <div className="bg-white rounded-2xl p-5 shadow-xs border border-neutral-200/80 space-y-3">
                <h3 className="font-bold text-neutral-900 text-sm">Ashadeep School Info</h3>
                <div className="text-xs space-y-1.5 text-neutral-600">
                  <p><strong>Campus:</strong> Ashadeep Educational Campus, Ring Road, Surat, Gujarat 395002</p>
                  <p><strong>Affiliation:</strong> CBSE / Gujarat Secondary Board (Affil # 430198)</p>
                  <p><strong>Principal:</strong> Dr. K. N. Mehta</p>
                  <p><strong>Office Contact:</strong> +91 261 245 8899 / 8800</p>
                </div>
              </div>

              {/* Logout button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs rounded-xl border border-red-200 transition-colors"
                >
                  Logout from Ashadeep School App
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
