import {
  UserProfile,
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
} from './types';

export const DEFAULT_USERS: Record<string, UserProfile> = {
  Student: {
    id: 'ASH-2024-042',
    name: 'Aarav Sharma',
    role: 'Student',
    grade: 'Class 10',
    section: 'A',
    rollNumber: '24',
    phone: '+91 98765 43210',
    email: 'aarav.sharma@ashadeep.edu.in',
    address: 'B-402, Shivalik Residency, Ring Road, Surat',
    guardianName: 'Rajesh Sharma (Father)',
    bloodGroup: 'B+',
    admissionNo: 'AD-2018-892',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'
  },
  Teacher: {
    id: 'TCH-MAT-104',
    name: 'Pooja Patel',
    role: 'Teacher',
    department: 'Mathematics & Science',
    grade: 'Class 10 Coordinator',
    phone: '+91 94280 11223',
    email: 'pooja.patel@ashadeep.edu.in',
    address: 'Staff Quarters, Ashadeep School Campus',
    bloodGroup: 'O+',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80'
  },
  Admin: {
    id: 'ADM-PRIN-01',
    name: 'Dr. K. N. Mehta',
    role: 'Admin',
    department: 'Office of the Principal',
    phone: '+91 98250 99887',
    email: 'principal@ashadeep.edu.in',
    address: 'Ashadeep Educational Trust, Surat',
    bloodGroup: 'A+',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80'
  }
};

export const MOCK_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: 'Final Term Examination Schedule 2024-25',
    date: '12 Nov 2024',
    category: 'Urgent',
    isImportant: true,
    author: 'Examination Controller',
    content: 'The Annual Board Examination timetable for Class 9 & 10 has been published. Hall tickets will be issued starting Monday from the school office.'
  },
  {
    id: 'not-2',
    title: 'Annual Sports Day 2024 - Registration Open',
    date: '08 Nov 2024',
    category: 'Sports',
    author: 'Sports Committee',
    content: 'Ashadeep Inter-House Athletics, Badminton, Cricket, and Chess tournaments will take place from 22nd to 24th November. Register with your house captains.'
  },
  {
    id: 'not-3',
    title: 'Parent-Teacher Meeting (PTM) for Term 1',
    date: '02 Nov 2024',
    category: 'Academic',
    isImportant: true,
    author: 'Principal Desk',
    content: 'PTM for reviewing Mid-Term progress report cards will be held on Saturday, 16th November from 9:00 AM to 1:00 PM. Parents are requested to attend.'
  },
  {
    id: 'not-4',
    title: 'Diwali Vacation & School Reopening Notice',
    date: '28 Oct 2024',
    category: 'Holiday',
    author: 'Administration',
    content: 'The school will remain closed for Diwali festivities from Oct 30 to Nov 07. Normal classes will resume on Friday, Nov 08.'
  }
];

export const MOCK_HOMEWORK: HomeworkItem[] = [
  {
    id: 'hw-1',
    subject: 'Mathematics',
    title: 'Quadratic Equations & AP Problem Set',
    description: 'Solve Exercise 4.3 (Questions 1 to 10) from NCERT textbook in fair notebook.',
    assignedDate: '03 Nov 2024',
    dueDate: '05 Nov 2024',
    teacher: 'Mrs. Pooja Patel',
    status: 'Pending'
  },
  {
    id: 'hw-2',
    subject: 'Science (Physics)',
    title: 'Light - Reflection & Refraction Ray Diagrams',
    description: 'Draw ray diagrams for concave mirrors (all 6 positions of object) with labeled focal length and center of curvature.',
    assignedDate: '02 Nov 2024',
    dueDate: '04 Nov 2024',
    teacher: 'Mr. Ramesh Joshi',
    status: 'Submitted',
    submissionGrade: 'A+'
  },
  {
    id: 'hw-3',
    subject: 'English',
    title: 'Letter to Editor on Environmental Awareness',
    description: 'Draft a formal letter (120-150 words) to the editor of a local daily regarding the need for plastic-free campuses.',
    assignedDate: '01 Nov 2024',
    dueDate: '03 Nov 2024',
    teacher: 'Ms. Sunita Shah',
    status: 'Reviewed',
    submissionGrade: '9/10'
  },
  {
    id: 'hw-4',
    subject: 'Social Science',
    title: 'Map Work: Major Soil Types of India',
    description: 'Mark and shade Alluvial, Black, Red & Yellow, and Laterite soils on an outline map of India.',
    assignedDate: '30 Oct 2024',
    dueDate: '06 Nov 2024',
    teacher: 'Mr. Deepak Verma',
    status: 'Pending'
  }
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { date: '2024-11-01', status: 'Present' },
  { date: '2024-11-02', status: 'Present' },
  { date: '2024-11-03', status: 'Holiday', remark: 'Sunday' },
  { date: '2024-11-04', status: 'Present' },
  { date: '2024-11-05', status: 'Present' },
  { date: '2024-11-06', status: 'Absent', remark: 'Medical appointment' },
  { date: '2024-11-07', status: 'Present' },
  { date: '2024-11-08', status: 'Present' },
  { date: '2024-11-09', status: 'Leave', remark: 'Approved Casual Leave' },
  { date: '2024-11-10', status: 'Holiday', remark: 'Sunday' },
  { date: '2024-11-11', status: 'Present' },
  { date: '2024-11-12', status: 'Present' },
  { date: '2024-11-13', status: 'Present' }
];

export const MOCK_REMARKS: RemarkItem[] = [
  {
    id: 'rem-1',
    teacherName: 'Mrs. Pooja Patel',
    subject: 'Mathematics',
    date: '02 Nov 2024',
    type: 'Praise',
    message: 'Aarav scored full marks in the weekly speed-math quiz and demonstrated excellent algebraic problem-solving.'
  },
  {
    id: 'rem-2',
    teacherName: 'Ms. Sunita Shah',
    subject: 'English',
    date: '28 Oct 2024',
    type: 'Improvement',
    message: 'Good creative vocabulary in essays; please pay attention to punctuation and paragraph transitions.'
  },
  {
    id: 'rem-3',
    teacherName: 'Mr. Arvind Dave',
    subject: 'Discipline & Conduct',
    date: '20 Oct 2024',
    type: 'Behavior',
    message: 'Maintains disciplined decorum in school assemblies and actively assisted in organizing the library day.'
  }
];

export const MOCK_STUDY_MATERIALS: StudyMaterialItem[] = [
  {
    id: 'mat-1',
    title: 'Chapter 5: Arithmetic Progressions - Formula Sheet & Shortcuts',
    subject: 'Mathematics',
    chapter: 'Ch 5: AP',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    uploadDate: '01 Nov 2024',
    teacher: 'Mrs. Pooja Patel'
  },
  {
    id: 'mat-2',
    title: 'Chemical Reactions and Equations - Complete Revision Notes',
    subject: 'Science',
    chapter: 'Ch 1: Chemistry',
    fileType: 'PDF',
    fileSize: '4.1 MB',
    uploadDate: '29 Oct 2024',
    teacher: 'Mr. Ramesh Joshi'
  },
  {
    id: 'mat-3',
    title: 'Nationalism in India - Key Dates, Figures & Timeline Flowchart',
    subject: 'Social Science',
    chapter: 'History Ch 2',
    fileType: 'PPT',
    fileSize: '5.8 MB',
    uploadDate: '25 Oct 2024',
    teacher: 'Mr. Deepak Verma'
  },
  {
    id: 'mat-4',
    title: 'Computer Science: Python Loops and String Methods Cheat Sheet',
    subject: 'Computer',
    chapter: 'Unit 3: Python',
    fileType: 'DOC',
    fileSize: '1.2 MB',
    uploadDate: '20 Oct 2024',
    teacher: 'Ms. Neha Trivedi'
  }
];

export const MOCK_VIDEOS: VideoTutorialItem[] = [
  {
    id: 'vid-1',
    title: 'Quadratic Formula Derivation & Word Problems Explained',
    subject: 'Mathematics',
    duration: '24:15',
    teacher: 'Mrs. Pooja Patel',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    views: 342,
    description: 'Learn step-by-step how to solve discriminant questions and avoid common algebraic errors.'
  },
  {
    id: 'vid-2',
    title: 'Human Eye and the Colorful World - Dispersion & Spectrum',
    subject: 'Science',
    duration: '31:40',
    teacher: 'Mr. Ramesh Joshi',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
    views: 489,
    description: 'Prism refraction experiment, atmospheric refraction, and why the sky appears blue.'
  },
  {
    id: 'vid-3',
    title: 'Grammar Masterclass: Active & Passive Voice in Board Exams',
    subject: 'English',
    duration: '18:50',
    teacher: 'Ms. Sunita Shah',
    thumbnailUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    views: 295,
    description: 'Crucial rules, exceptions, and practice questions from previous year board papers.'
  }
];

export const MOCK_QUERIES: StudentQuery[] = [
  {
    id: 'q-1',
    subject: 'Mathematics',
    question: 'Mam, in Exercise 4.3 Q7, should we consider both positive and negative roots when calculating train speed?',
    studentName: 'Aarav Sharma',
    askedDate: '02 Nov 2024, 04:30 PM',
    status: 'Answered',
    reply: 'Speed cannot be negative in physical real-world contexts, so discard negative values and clearly mention the reason in your final step.',
    repliedBy: 'Mrs. Pooja Patel',
    replyDate: '02 Nov 2024, 06:15 PM'
  },
  {
    id: 'q-2',
    subject: 'Science',
    question: 'Sir, will question 5 from the sample paper on electric circuits require circuit diagram drawing?',
    studentName: 'Aarav Sharma',
    askedDate: '01 Nov 2024, 08:10 PM',
    status: 'Answered',
    reply: 'Yes, always draw the schematic diagram using standard resistor and voltmeter symbols to secure full step-marks.',
    repliedBy: 'Mr. Ramesh Joshi',
    replyDate: '02 Nov 2024, 09:00 AM'
  },
  {
    id: 'q-3',
    subject: 'Social Science',
    question: 'Sir, please clarify if the Simon Commission boycott question is part of the 5-mark syllabus.',
    studentName: 'Aarav Sharma',
    askedDate: '03 Nov 2024, 11:00 AM',
    status: 'Pending'
  }
];

export const MOCK_LIVE_CLASSES: LiveClassItem[] = [
  {
    id: 'live-1',
    subject: 'Mathematics',
    topic: 'Live Problem Solving: Trigonometric Identities & Heights & Distances',
    teacher: 'Mrs. Pooja Patel',
    time: '04:00 PM - 05:00 PM',
    date: 'Today',
    durationMinutes: 60,
    status: 'Live Now',
    meetingLink: 'https://meet.google.com/ash-math-live'
  },
  {
    id: 'live-2',
    subject: 'Science',
    topic: 'Metals & Non-Metals: Chemical Reactivity Series & Extraction',
    teacher: 'Mr. Ramesh Joshi',
    time: '05:30 PM - 06:30 PM',
    date: 'Today',
    durationMinutes: 60,
    status: 'Upcoming',
    meetingLink: 'https://meet.google.com/ash-sci-live'
  },
  {
    id: 'live-3',
    subject: 'English',
    topic: 'Board Exam Writing Skills: Formal Letter & Analytical Paragraph',
    teacher: 'Ms. Sunita Shah',
    time: '10:00 AM - 11:00 AM',
    date: 'Yesterday',
    durationMinutes: 60,
    status: 'Completed',
    meetingLink: 'https://meet.google.com/ash-eng-rec'
  }
];

export const MOCK_EXAMS: ExamItem[] = [
  {
    id: 'exam-1',
    title: 'Periodic Assessment Test - 2 (Class 10)',
    examType: 'Unit Test 2',
    startDate: '18 Nov 2024',
    endDate: '23 Nov 2024',
    timetable: [
      { date: '18 Nov 2024', day: 'Monday', subject: 'Mathematics', time: '09:00 AM - 11:00 AM', totalMarks: 50 },
      { date: '19 Nov 2024', day: 'Tuesday', subject: 'Science', time: '09:00 AM - 11:00 AM', totalMarks: 50 },
      { date: '20 Nov 2024', day: 'Wednesday', subject: 'English', time: '09:00 AM - 11:00 AM', totalMarks: 50 },
      { date: '21 Nov 2024', day: 'Thursday', subject: 'Social Science', time: '09:00 AM - 11:00 AM', totalMarks: 50 },
      { date: '22 Nov 2024', day: 'Friday', subject: 'Hindi / Gujarati', time: '09:00 AM - 11:00 AM', totalMarks: 50 },
      { date: '23 Nov 2024', day: 'Saturday', subject: 'Computer Applications', time: '09:00 AM - 11:00 AM', totalMarks: 50 }
    ]
  }
];

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'First Rank - Academic Excellence in Science & Math',
    issueDate: '15 Oct 2024',
    issuedTo: 'Aarav Sharma',
    description: 'Awarded for securing top percentile in Grade 9 Annual Examinations.',
    certificateType: 'Merit'
  },
  {
    id: 'cert-2',
    title: 'Ashadeep Bonafide Student Certificate',
    issueDate: '01 Aug 2024',
    issuedTo: 'Aarav Sharma',
    description: 'Certifying regular enrollment in Class 10th-A for academic year 2024-2025.',
    certificateType: 'Bonafide'
  },
  {
    id: 'cert-3',
    title: 'Inter-School Science Olympiad - Gold Medal',
    issueDate: '20 Sep 2024',
    issuedTo: 'Aarav Sharma',
    description: 'Honored for outstanding innovation project on Solar Powered Water Purifier.',
    certificateType: 'Sports'
  }
];

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'cal-1', date: '2024-11-14', title: "Children's Day Celebrations", category: 'Event', description: 'Cultural programs, sports contests, and fun carnival on school grounds.' },
  { id: 'cal-2', date: '2024-11-16', title: 'Parent-Teacher Meeting (PTM)', category: 'Meeting', description: 'Individual discussions regarding student academic progress.' },
  { id: 'cal-3', date: '2024-11-18', title: 'Periodic Test 2 Starts', category: 'Exam', description: 'First day of examinations for Class 9 and 10.' },
  { id: 'cal-4', date: '2024-11-26', title: 'Constitution Day (Samvidhan Diwas)', category: 'Holiday', description: 'Assembly presentation on Preamble and Fundamental Duties.' },
  { id: 'cal-5', date: '2024-12-25', title: 'Christmas Holiday', category: 'Holiday', description: 'School closed for Christmas festival.' }
];

export const MOCK_SYLLABUS: SyllabusItem[] = [
  {
    id: 'syl-1',
    subject: 'Mathematics',
    totalChapters: 14,
    completedChapters: 11,
    chapters: [
      { name: '1. Real Numbers', status: 'Completed', term: 'Term 1' },
      { name: '2. Polynomials', status: 'Completed', term: 'Term 1' },
      { name: '3. Pair of Linear Equations', status: 'Completed', term: 'Term 1' },
      { name: '4. Quadratic Equations', status: 'Completed', term: 'Term 1' },
      { name: '5. Arithmetic Progressions', status: 'Completed', term: 'Term 1' },
      { name: '6. Triangles', status: 'Completed', term: 'Term 1' },
      { name: '7. Coordinate Geometry', status: 'Completed', term: 'Term 2' },
      { name: '8. Introduction to Trigonometry', status: 'Completed', term: 'Term 2' },
      { name: '9. Some Applications of Trigonometry', status: 'Completed', term: 'Term 2' },
      { name: '10. Circles', status: 'Completed', term: 'Term 2' },
      { name: '11. Areas Related to Circles', status: 'Completed', term: 'Term 2' },
      { name: '12. Surface Areas and Volumes', status: 'In Progress', term: 'Term 2' },
      { name: '13. Statistics', status: 'Upcoming', term: 'Term 2' },
      { name: '14. Probability', status: 'Upcoming', term: 'Term 2' }
    ]
  },
  {
    id: 'syl-2',
    subject: 'Science',
    totalChapters: 13,
    completedChapters: 10,
    chapters: [
      { name: '1. Chemical Reactions & Equations', status: 'Completed', term: 'Term 1' },
      { name: '2. Acids, Bases and Salts', status: 'Completed', term: 'Term 1' },
      { name: '3. Metals and Non-Metals', status: 'Completed', term: 'Term 1' },
      { name: '4. Carbon and its Compounds', status: 'In Progress', term: 'Term 2' },
      { name: '5. Life Processes', status: 'Completed', term: 'Term 1' },
      { name: '6. Control and Coordination', status: 'Completed', term: 'Term 1' },
      { name: '7. How do Organisms Reproduce?', status: 'Completed', term: 'Term 2' },
      { name: '8. Heredity', status: 'Completed', term: 'Term 2' },
      { name: '9. Light - Reflection and Refraction', status: 'Completed', term: 'Term 1' },
      { name: '10. The Human Eye and Colorful World', status: 'Completed', term: 'Term 1' },
      { name: '11. Electricity', status: 'Completed', term: 'Term 2' },
      { name: '12. Magnetic Effects of Electric Current', status: 'In Progress', term: 'Term 2' },
      { name: '13. Our Environment', status: 'Upcoming', term: 'Term 2' }
    ]
  }
];

export const MOCK_TIMETABLE: DayTimetable[] = [
  {
    day: 'Monday',
    slots: [
      { time: '08:00 - 08:45 AM', period: 1, subject: 'Mathematics', teacher: 'Mrs. Pooja Patel', room: 'Room 204' },
      { time: '08:45 - 09:30 AM', period: 2, subject: 'Science (Physics)', teacher: 'Mr. Ramesh Joshi', room: 'Physics Lab' },
      { time: '09:30 - 10:15 AM', period: 3, subject: 'English', teacher: 'Ms. Sunita Shah', room: 'Room 204' },
      { time: '10:15 - 10:45 AM', period: 0, subject: 'Recess & Tiffin Break', teacher: 'Campus Ground', room: 'Cafeteria' },
      { time: '10:45 - 11:30 AM', period: 4, subject: 'Social Science', teacher: 'Mr. Deepak Verma', room: 'Room 204' },
      { time: '11:30 - 12:15 PM', period: 5, subject: 'Computer Lab', teacher: 'Ms. Neha Trivedi', room: 'IT Lab 2' },
      { time: '12:15 - 01:00 PM', period: 6, subject: 'Hindi / Sanskrit', teacher: 'Mr. Arvind Dave', room: 'Room 204' },
      { time: '01:00 - 01:45 PM', period: 7, subject: 'Physical Education / Games', teacher: 'Coach Rathod', room: 'Sports Complex' }
    ]
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '08:00 - 08:45 AM', period: 1, subject: 'Science (Chemistry)', teacher: 'Mr. Ramesh Joshi', room: 'Chem Lab' },
      { time: '08:45 - 09:30 AM', period: 2, subject: 'Mathematics', teacher: 'Mrs. Pooja Patel', room: 'Room 204' },
      { time: '09:30 - 10:15 AM', period: 3, subject: 'Social Science', teacher: 'Mr. Deepak Verma', room: 'Room 204' },
      { time: '10:15 - 10:45 AM', period: 0, subject: 'Recess & Tiffin Break', teacher: 'Campus Ground', room: 'Cafeteria' },
      { time: '10:45 - 11:30 AM', period: 4, subject: 'English Literature', teacher: 'Ms. Sunita Shah', room: 'Room 204' },
      { time: '11:30 - 12:15 PM', period: 5, subject: 'Library & Reading', teacher: 'Librarian Dave', room: 'Central Library' },
      { time: '12:15 - 01:00 PM', period: 6, subject: 'Mathematics Practice', teacher: 'Mrs. Pooja Patel', room: 'Room 204' },
      { time: '01:00 - 01:45 PM', period: 7, subject: 'Art & Craft', teacher: 'Ms. Anita Gohil', room: 'Art Studio' }
    ]
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '08:00 - 08:45 AM', period: 1, subject: 'Mathematics', teacher: 'Mrs. Pooja Patel', room: 'Room 204' },
      { time: '08:45 - 09:30 AM', period: 2, subject: 'Science (Biology)', teacher: 'Dr. Shruti Vyas', room: 'Bio Lab' },
      { time: '09:30 - 10:15 AM', period: 3, subject: 'English Grammar', teacher: 'Ms. Sunita Shah', room: 'Room 204' },
      { time: '10:15 - 10:45 AM', period: 0, subject: 'Recess & Tiffin Break', teacher: 'Campus Ground', room: 'Cafeteria' },
      { time: '10:45 - 11:30 AM', period: 4, subject: 'Social Science (Geography)', teacher: 'Mr. Deepak Verma', room: 'Room 204' },
      { time: '11:30 - 12:15 PM', period: 5, subject: 'Computer Programming', teacher: 'Ms. Neha Trivedi', room: 'IT Lab 2' },
      { time: '12:15 - 01:00 PM', period: 6, subject: 'Sanskrit / Gujarati', teacher: 'Mr. Arvind Dave', room: 'Room 204' },
      { time: '01:00 - 01:45 PM', period: 7, subject: 'Music / Debate Club', teacher: 'Staff', room: 'Auditorium' }
    ]
  }
];

export const MOCK_RESULT: ResultReport = {
  term: 'Mid-Term Assessment 2024-25',
  totalMarks: 500,
  obtainedMarks: 462,
  percentage: 92.4,
  grade: 'A1',
  rank: 3,
  totalStudents: 48,
  attendancePercent: 95.8,
  teacherRemark: 'Outstanding performance across Mathematics and Sciences. Well-disciplined, proactive student with great analytical aptitude.',
  subjects: [
    { subject: 'Mathematics', maxMarks: 100, obtainedMarks: 96, grade: 'A1' },
    { subject: 'Science (Phy/Chem/Bio)', maxMarks: 100, obtainedMarks: 94, grade: 'A1' },
    { subject: 'English Language & Lit', maxMarks: 100, obtainedMarks: 89, grade: 'A2' },
    { subject: 'Social Science', maxMarks: 100, obtainedMarks: 91, grade: 'A1' },
    { subject: 'Computer Applications', maxMarks: 100, obtainedMarks: 92, grade: 'A1' }
  ]
};

export const MOCK_FEES: FeeItem[] = [
  {
    id: 'fee-1',
    term: 'Term 1 (April - July 2024)',
    amount: 18500,
    dueDate: '15 Apr 2024',
    status: 'Paid',
    receiptNo: 'ASH-REC-2024-7891',
    paidDate: '10 Apr 2024',
    breakdown: [
      { label: 'Tuition Fee', amount: 12000 },
      { label: 'Computer & Science Lab', amount: 3500 },
      { label: 'Library & Sports Activity', amount: 2000 },
      { label: 'Exam & Tech Portal', amount: 1000 }
    ]
  },
  {
    id: 'fee-2',
    term: 'Term 2 (August - November 2024)',
    amount: 18500,
    dueDate: '15 Aug 2024',
    status: 'Paid',
    receiptNo: 'ASH-REC-2024-9124',
    paidDate: '12 Aug 2024',
    breakdown: [
      { label: 'Tuition Fee', amount: 12000 },
      { label: 'Computer & Science Lab', amount: 3500 },
      { label: 'Library & Sports Activity', amount: 2000 },
      { label: 'Exam & Tech Portal', amount: 1000 }
    ]
  },
  {
    id: 'fee-3',
    term: 'Term 3 (December 2024 - March 2025)',
    amount: 18500,
    dueDate: '15 Dec 2024',
    status: 'Pending',
    breakdown: [
      { label: 'Tuition Fee', amount: 12000 },
      { label: 'Computer & Science Lab', amount: 3500 },
      { label: 'Library & Sports Activity', amount: 2000 },
      { label: 'Exam & Tech Portal', amount: 1000 }
    ]
  }
];

export const MOCK_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-1',
    type: 'Medical',
    startDate: '06 Nov 2024',
    endDate: '06 Nov 2024',
    reason: 'Dental checkup and routine orthodontic procedure.',
    status: 'Approved',
    appliedDate: '04 Nov 2024',
    adminRemark: 'Approved by Class Teacher Mrs. Pooja Patel'
  },
  {
    id: 'lv-2',
    type: 'Family Function',
    startDate: '09 Nov 2024',
    endDate: '09 Nov 2024',
    reason: 'Attending cousin wedding in Ahmedabad with family.',
    status: 'Approved',
    appliedDate: '05 Nov 2024',
    adminRemark: 'Approved by Principal Desk'
  }
];

export const MOCK_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Annual Day Celebrations "Utkarsh 2024"',
    category: 'Cultural',
    date: '15 Oct 2024',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    likes: 142
  },
  {
    id: 'gal-2',
    title: 'Ashadeep Interschool Football Champions',
    category: 'Sports',
    date: '28 Sep 2024',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=600&q=80',
    likes: 98
  },
  {
    id: 'gal-3',
    title: 'Science Fair & Robotics Expo 2024',
    category: 'Science',
    date: '10 Sep 2024',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    likes: 125
  },
  {
    id: 'gal-4',
    title: 'Green Campus Tree Plantation Drive',
    category: 'Campus',
    date: '15 Aug 2024',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    likes: 84
  }
];

export const MOCK_LIBRARY: LibraryBook[] = [
  {
    id: 'bk-1',
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    category: 'Science & Cosmology',
    isbn: '978-0553380163',
    status: 'Issued',
    returnDate: '12 Nov 2024'
  },
  {
    id: 'bk-2',
    title: 'Wings of Fire: An Autobiography',
    author: 'Dr. A. P. J. Abdul Kalam',
    category: 'Biography',
    isbn: '978-8173711466',
    status: 'Available'
  },
  {
    id: 'bk-3',
    title: 'NCERT Exemplar Problems - Mathematics Class 10',
    author: 'NCERT Editorial Board',
    category: 'Academics',
    isbn: '978-9350070567',
    status: 'Available'
  },
  {
    id: 'bk-4',
    title: 'Ignited Minds: Unleashing the Power Within India',
    author: 'Dr. A. P. J. Abdul Kalam',
    category: 'Inspirational',
    isbn: '978-0143424123',
    status: 'Available'
  },
  {
    id: 'bk-5',
    title: 'The Discovery of India',
    author: 'Jawaharlal Nehru',
    category: 'History',
    isbn: '978-0143031031',
    status: 'Issued',
    returnDate: '18 Nov 2024'
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Live Class Starting Soon!',
    body: 'Mathematics live revision class on Trigonometric Identities starts in 15 minutes.',
    timestamp: '10 mins ago',
    read: false,
    type: 'notice'
  },
  {
    id: 'notif-2',
    title: 'Homework Graded',
    body: 'Physics Light Ray Diagrams graded: A+ by Mr. Ramesh Joshi.',
    timestamp: '2 hours ago',
    read: false,
    type: 'homework'
  },
  {
    id: 'notif-3',
    title: 'Exam Date Sheet Published',
    body: 'Periodic Assessment Test - 2 date sheet released for Class 10.',
    timestamp: 'Yesterday',
    read: true,
    type: 'exam'
  },
  {
    id: 'notif-4',
    title: 'Fee Reminder Term 3',
    body: 'Term 3 fee invoice is generated. Due date is 15th December 2024.',
    timestamp: '3 days ago',
    read: true,
    type: 'fee'
  }
];
