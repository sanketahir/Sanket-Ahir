export type UserRole = 'Student' | 'Teacher' | 'Admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  grade?: string;
  section?: string;
  rollNumber?: string;
  avatarUrl?: string;
  phone?: string;
  email?: string;
  address?: string;
  guardianName?: string;
  bloodGroup?: string;
  admissionNo?: string;
  department?: string; // For teacher/admin
}

export interface Notice {
  id: string;
  title: string;
  date: string;
  category: 'Urgent' | 'Academic' | 'Sports' | 'Event' | 'Holiday';
  content: string;
  author: string;
  isImportant?: boolean;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  teacher: string;
  status: 'Pending' | 'Submitted' | 'Reviewed';
  submissionGrade?: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'Present' | 'Absent' | 'Leave' | 'Holiday';
  remark?: string;
}

export interface RemarkItem {
  id: string;
  teacherName: string;
  subject: string;
  date: string;
  type: 'Praise' | 'Improvement' | 'Behavior' | 'General';
  message: string;
}

export interface StudyMaterialItem {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  fileType: 'PDF' | 'DOC' | 'PPT';
  fileSize: string;
  uploadDate: string;
  teacher: string;
}

export interface VideoTutorialItem {
  id: string;
  title: string;
  subject: string;
  duration: string;
  teacher: string;
  thumbnailUrl: string;
  views: number;
  description: string;
}

export interface StudentQuery {
  id: string;
  subject: string;
  question: string;
  studentName: string;
  askedDate: string;
  status: 'Pending' | 'Answered';
  reply?: string;
  repliedBy?: string;
  replyDate?: string;
}

export interface LiveClassItem {
  id: string;
  subject: string;
  topic: string;
  teacher: string;
  time: string;
  date: string;
  durationMinutes: number;
  status: 'Live Now' | 'Upcoming' | 'Completed';
  meetingLink: string;
}

export interface ExamItem {
  id: string;
  title: string;
  examType: 'Unit Test 1' | 'Mid-Term Exam' | 'Unit Test 2' | 'Annual Board Prep';
  startDate: string;
  endDate: string;
  timetable: {
    date: string;
    day: string;
    subject: string;
    time: string;
    totalMarks: number;
  }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issueDate: string;
  issuedTo: string;
  description: string;
  certificateType: 'Merit' | 'Bonafide' | 'Participation' | 'Sports';
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  category: 'Holiday' | 'Exam' | 'Event' | 'Meeting';
  description: string;
}

export interface SyllabusItem {
  id: string;
  subject: string;
  totalChapters: number;
  completedChapters: number;
  chapters: {
    name: string;
    status: 'Completed' | 'In Progress' | 'Upcoming';
    term: 'Term 1' | 'Term 2';
  }[];
}

export interface TimetableSlot {
  time: string;
  period: number;
  subject: string;
  teacher: string;
  room: string;
}

export interface DayTimetable {
  day: string;
  slots: TimetableSlot[];
}

export interface ResultSubject {
  subject: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
}

export interface ResultReport {
  term: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  totalStudents: number;
  attendancePercent: number;
  teacherRemark: string;
  subjects: ResultSubject[];
}

export interface FeeItem {
  id: string;
  term: string;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  receiptNo?: string;
  paidDate?: string;
  breakdown: { label: string; amount: number }[];
}

export interface LeaveRequest {
  id: string;
  type: 'Medical' | 'Casual' | 'Family Function';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  appliedDate: string;
  adminRemark?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Sports' | 'Cultural' | 'Science' | 'Campus';
  date: string;
  imageUrl: string;
  likes: number;
}

export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  status: 'Available' | 'Issued';
  returnDate?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: 'notice' | 'homework' | 'fee' | 'exam' | 'attendance';
}
