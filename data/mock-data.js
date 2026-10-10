/**
 * SmartSync Real University Dataset
 * Extracted directly from Courses details (BCA & MCA timetables & CC list PDFs)
 * Strictly frontend-only data structure simulating future Spring Boot API payloads.
 */

window.SMARTSYNC_DATA = {
  // University Info
  institution: {
    name: "Graphic Era Hill University / College of Computer Applications",
    academicYear: "2026-2027",
    currentSemester: "Odd Semester (2026)",
    currentWeek: "Week 3",
    lastUpdated: "Sat, 10 Oct 2026, 10:45 AM"
  },

  // Courses / Programs
  courses: [
    { id: "CRS-BCA", code: "BCA", name: "Bachelor of Computer Applications", degree: "Undergraduate", durationYears: 3, totalSections: 12, studentCount: 420 },
    { id: "CRS-MCA", code: "MCA", name: "Master of Computer Applications", degree: "Postgraduate", durationYears: 2, totalSections: 8, studentCount: 260 }
  ],

  // Active Sections
  sections: [
    { id: "SEC-BCA-1A", courseId: "CRS-BCA", name: "BCA UG-I (Sec A)", semester: "1st Sem", coordinator: "Dr. Priya Sharma", room: "Room 204", studentCount: 45 },
    { id: "SEC-BCA-1B", courseId: "CRS-BCA", name: "BCA UG-I (Sec B)", semester: "1st Sem", coordinator: "Mr. Kanishk Bhatt", room: "Room 205", studentCount: 42 },
    { id: "SEC-BCA-3A", courseId: "CRS-BCA", name: "BCA UG-III (Sec A)", semester: "3rd Sem", coordinator: "Dr. S. C. Dimri", room: "Room 301", studentCount: 48 },
    { id: "SEC-BCA-3C", courseId: "CRS-BCA", name: "BCA UG-III (Sec C)", semester: "3rd Sem", coordinator: "Mr. Bhawnesh Kumar", room: "Room 302", studentCount: 46 },
    { id: "SEC-BCA-5A", courseId: "CRS-BCA", name: "BCA UG-V (Sec A)", semester: "5th Sem", coordinator: "Mr. Gagandeep Singh", room: "Room 303", studentCount: 40 },
    { id: "SEC-MCA-3G3", courseId: "CRS-MCA", name: "MCA III (Sec G3)", semester: "3rd Sem", coordinator: "Dr. Varsha Mittal", room: "LT-3", studentCount: 38 },
    { id: "SEC-MCA-3G4", courseId: "CRS-MCA", name: "MCA III (Sec G4)", semester: "3rd Sem", coordinator: "Dr. Abhishek Sharma", room: "LT-4", studentCount: 36 },
    { id: "SEC-MCA-3A1", courseId: "CRS-MCA", name: "MCA III (Sec A1)", semester: "3rd Sem", coordinator: "Mr. Yogesh Lohumi", room: "LT-05", studentCount: 35 },
    { id: "SEC-MCA-3D2", courseId: "CRS-MCA", name: "MCA III (Sec D2)", semester: "3rd Sem", coordinator: "Dr. A. S. Shukla", room: "LT-3", studentCount: 36 }
  ],

  // Faculty Members
  teachers: [
    { id: "TCH-001", name: "Dr. Priya Sharma", designation: "Associate Professor", department: "Computer Science", email: "priya.sharma@gehu.edu.in", phone: "+91 9876543210", assignedSubjects: 4, weeklyClasses: 16 },
    { id: "TCH-002", name: "Dr. S. C. Dimri", designation: "Professor & HOD", department: "Computer Applications", email: "sc.dimri@gehu.edu.in", phone: "+91 9927011223", assignedSubjects: 3, weeklyClasses: 14 },
    { id: "TCH-003", name: "Mr. Kanishk Bhatt", designation: "Assistant Professor", department: "Computer Science", email: "kanishk.bhatt@gehu.edu.in", phone: "+91 9412055441", assignedSubjects: 3, weeklyClasses: 15 },
    { id: "TCH-004", name: "Mr. Gagandeep Singh", designation: "Assistant Professor", department: "Information Technology", email: "gagandeep.singh@gehu.edu.in", phone: "+91 9927035279", assignedSubjects: 3, weeklyClasses: 14 },
    { id: "TCH-005", name: "Dr. Varsha Mittal", designation: "Associate Professor", department: "Data Science", email: "varsha.mittal@gehu.edu.in", phone: "+91 9634435387", assignedSubjects: 3, weeklyClasses: 12 },
    { id: "TCH-006", name: "Mr. Yogesh Lohumi", designation: "Assistant Professor", department: "Cloud Computing", email: "yogesh.lohumi@gehu.edu.in", phone: "+91 9837012345", assignedSubjects: 2, weeklyClasses: 10 },
    { id: "TCH-007", name: "Dr. Abhishek Sharma", designation: "Associate Professor", department: "AI & ML", email: "abhishek.sharma@gehu.edu.in", phone: "+91 9760011223", assignedSubjects: 2, weeklyClasses: 12 },
    { id: "TCH-008", name: "Ms. Rashmi Kanyal", designation: "Assistant Professor", department: "Computer Science", email: "rashmi.kanyal@gehu.edu.in", phone: "+91 9193114289", assignedSubjects: 2, weeklyClasses: 10 },
    { id: "TCH-009", name: "Ms. Payal Karki", designation: "Assistant Professor", department: "Computer Applications", email: "payal.karki@gehu.edu.in", phone: "+91 9193114289", assignedSubjects: 3, weeklyClasses: 12 },
    { id: "TCH-010", name: "Mr. Shubham Kumar", designation: "Lab Instructor", department: "Computer Applications", email: "shubham.kumar@gehu.edu.in", phone: "+91 8873967322", assignedSubjects: 3, weeklyClasses: 14 },
    { id: "TCH-011", name: "Mr. Bhawnesh Kumar", designation: "Assistant Professor", department: "Computer Science & Engineering", email: "teacher@geu.ac.in", phone: "+91 9897123456", assignedSubjects: 3, weeklyClasses: 15 }
  ],

  // Registered Student Roster (8-Digit Student IDs, default password Moodle@123)
  students: [
    { studentId: "20261001", name: "Kartik Sharma", course: "BCA", section: "BCA UG-III (Sec C)", sectionCode: "BCA-C", semester: "3rd Sem", email: "kartik.20261001@gehu.edu.in", phone: "+91 9812345678", rollNo: "26BCA001", status: "Active" },
    { studentId: "20261002", name: "Ananya Roy", course: "BCA", section: "BCA UG-III (Sec C)", sectionCode: "BCA-C", semester: "3rd Sem", email: "ananya.20261002@gehu.edu.in", phone: "+91 9812345679", rollNo: "26BCA002", status: "Active" },
    { studentId: "20261003", name: "Rahul Verma", course: "BCA", section: "BCA UG-I (Sec A)", sectionCode: "BCA-A", semester: "1st Sem", email: "rahul.20261003@gehu.edu.in", phone: "+91 9812345680", rollNo: "26BCA003", status: "Active" },
    { studentId: "20261004", name: "Sneha Kapoor", course: "BCA", section: "BCA UG-I (Sec A)", sectionCode: "BCA-A", semester: "1st Sem", email: "sneha.20261004@gehu.edu.in", phone: "+91 9812345681", rollNo: "26BCA004", status: "Active" },
    { studentId: "20261005", name: "Rohan Joshi", course: "MCA", section: "MCA III (Sec G3)", sectionCode: "MCA-G3", semester: "3rd Sem", email: "rohan.20261005@gehu.edu.in", phone: "+91 9812345682", rollNo: "26MCA001", status: "Active" },
    { studentId: "20261006", name: "Pooja Bisht", course: "MCA", section: "MCA III (Sec G3)", sectionCode: "MCA-G3", semester: "3rd Sem", email: "pooja.20261006@gehu.edu.in", phone: "+91 9812345683", rollNo: "26MCA002", status: "Active" },
    { studentId: "20261007", name: "Aman Negi", course: "BCA", section: "BCA UG-III (Sec C)", sectionCode: "BCA-C", semester: "3rd Sem", email: "aman.20261007@gehu.edu.in", phone: "+91 9812345684", rollNo: "26BCA005", status: "Active" },
    { studentId: "20261008", name: "Divya Rawat", course: "BCA", section: "BCA UG-III (Sec C)", sectionCode: "BCA-C", semester: "3rd Sem", email: "divya.20261008@gehu.edu.in", phone: "+91 9812345685", rollNo: "26BCA006", status: "Active" }
  ],

  // Subjects / Courses
  subjects: [
    { id: "SUB-BCA101", code: "BCA101", name: "Java Programming", type: "Theory", classesPerWeek: 3, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA102", code: "BCA102", name: "DBMS", type: "Theory", classesPerWeek: 3, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA103", code: "BCA103", name: "Python", type: "Theory", classesPerWeek: 3, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA104", code: "BCA104", name: "Operating Systems", type: "Theory", classesPerWeek: 3, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA105", code: "BCA105", name: "Web Technologies", type: "Theory", classesPerWeek: 3, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA106", code: "BCA106", name: "Java Lab", type: "Lab", classesPerWeek: 2, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA107", code: "BCA107", name: "Python Lab", type: "Lab", classesPerWeek: 2, department: "Computer Science", course: "BCA" },
    { id: "SUB-BCA108", code: "BCA108", name: "DBMS Lab", type: "Lab", classesPerWeek: 2, department: "Computer Science", course: "BCA" },

    // MCA Subjects
    { id: "SUB-TMC301", code: "TMC301", name: "Design & Analysis of Algorithms", type: "Theory", classesPerWeek: 4, department: "Computer Applications", course: "MCA" },
    { id: "SUB-TMC302", code: "TMC302", name: "Mobile Application Development", type: "Theory", classesPerWeek: 4, department: "Computer Applications", course: "MCA" },
    { id: "SUB-TMC303", code: "TMC303", name: "Advanced Java Programming", type: "Theory", classesPerWeek: 4, department: "Computer Applications", course: "MCA" },
    { id: "SUB-TMC311", code: "TMC311", name: "Machine Learning - 2", type: "Theory", classesPerWeek: 3, department: "AI & ML", course: "MCA" },
    { id: "SUB-TMC312", code: "TMC312", name: "DevOps on Cloud", type: "Theory", classesPerWeek: 3, department: "Cloud Computing", course: "MCA" },
    { id: "SUB-TMD301", code: "TMD301", name: "Data Analytics & Visualization", type: "Theory", classesPerWeek: 4, department: "Data Science", course: "MCA" },
    { id: "SUB-PMC301", code: "PMC301", name: "DAA Laboratory", type: "Lab", classesPerWeek: 2, department: "Computer Applications", course: "MCA" },
    { id: "SUB-PMC302", code: "PMC302", name: "MAD Laboratory", type: "Lab", classesPerWeek: 2, department: "Computer Applications", course: "MCA" },
    { id: "SUB-PMC303", code: "PMC303", name: "Advanced Java Laboratory", type: "Lab", classesPerWeek: 2, department: "Computer Applications", course: "MCA" }
  ],

  // Rooms & Laboratories
  rooms: [
    { id: "RM-204", code: "Room 204", type: "Classroom", capacity: 60, building: "Academic Block A", status: "Active" },
    { id: "RM-205", code: "Room 205", type: "Classroom", capacity: 60, building: "Academic Block A", status: "Active" },
    { id: "RM-206", code: "Room 206", type: "Classroom", capacity: 60, building: "Academic Block A", status: "Active" },
    { id: "RM-301", code: "Room 301", type: "Classroom", capacity: 65, building: "Academic Block B", status: "Active" },
    { id: "RM-302", code: "Room 302", type: "Classroom", capacity: 60, building: "Academic Block B", status: "Active" },
    { id: "RM-LT3", code: "LT-3", type: "Lecture Theater", capacity: 120, building: "Main Block", status: "Active" },
    { id: "RM-LT4", code: "LT-4", type: "Lecture Theater", capacity: 120, building: "Main Block", status: "Active" },
    { id: "RM-LT05", code: "LT-05", type: "Lecture Theater", capacity: 100, building: "Main Block", status: "Active" },
    { id: "RM-LAB1", code: "Lab 1", type: "Computer Lab", capacity: 45, building: "IT Building 2nd Fl", status: "Active" },
    { id: "RM-LAB2", code: "Lab 2", type: "Computer Lab", capacity: 45, building: "IT Building 2nd Fl", status: "Active" },
    { id: "RM-LAB3", code: "Lab 3", type: "Computer Lab", capacity: 50, building: "IT Building 3rd Fl", status: "Active" },
    { id: "RM-IBMLAB", code: "IBM Lab", type: "Specialized Lab", capacity: 40, building: "Innovation Center", status: "Active" }
  ],

  // Master Weekly Timetable Entries (Includes BCA-A, BCA-C, MCA schedules & Mr. Bhawnesh Kumar's classes)
  timetable: [
    // BCA-A Schedule
    { id: "TT-101", day: "Monday", timeSlot: "9:00 AM - 10:00 AM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Dr. Priya Sharma", room: "Room 204", section: "BCA-A", status: "Normal" },
    { id: "TT-102", day: "Monday", timeSlot: "10:00 AM - 11:00 AM", subject: "DBMS", subjectCode: "BCA102", type: "Theory", teacher: "Dr. S. C. Dimri", room: "Room 301", section: "BCA-A", status: "Normal" },
    { id: "TT-103", day: "Monday", timeSlot: "11:00 AM - 12:00 PM", subject: "Python Lab", subjectCode: "BCA107", type: "Lab", teacher: "Ms. Payal Karki", room: "Lab 2", section: "BCA-A", status: "Changed" },
    { id: "TT-104", day: "Monday", timeSlot: "1:00 PM - 2:00 PM", subject: "Python", subjectCode: "BCA103", type: "Theory", teacher: "Mr. Kanishk Bhatt", room: "Room 205", section: "BCA-A", status: "Normal" },
    { id: "TT-105", day: "Monday", timeSlot: "2:00 PM - 3:00 PM", subject: "Operating Systems", subjectCode: "BCA104", type: "Theory", teacher: "Dr. Abhishek Sharma", room: "Room 206", section: "BCA-A", status: "Normal" },

    // BCA-C Schedule (Includes Mr. Bhawnesh Kumar 5:00 PM Java Class)
    { id: "TT-C101", day: "Monday", timeSlot: "10:00 AM - 11:00 AM", subject: "Web Technologies", subjectCode: "BCA105", type: "Theory", teacher: "Mr. Gagandeep Singh", room: "Room 302", section: "BCA-C", status: "Normal" },
    { id: "TT-C102", day: "Monday", timeSlot: "11:00 AM - 12:00 PM", subject: "DBMS", subjectCode: "BCA102", type: "Theory", teacher: "Dr. S. C. Dimri", room: "Room 302", section: "BCA-C", status: "Normal" },
    { id: "TT-C103", day: "Monday", timeSlot: "2:00 PM - 4:00 PM", subject: "Java Lab", subjectCode: "BCA106", type: "Lab", teacher: "Mr. Bhawnesh Kumar", room: "Lab 1", section: "BCA-C", status: "Normal" },
    { id: "TT-C104", day: "Monday", timeSlot: "5:00 PM - 6:00 PM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Mr. Bhawnesh Kumar", room: "Room 302", section: "BCA-C", status: "Normal" },

    // Tuesday Schedule
    { id: "TT-201", day: "Tuesday", timeSlot: "9:00 AM - 10:00 AM", subject: "DBMS", subjectCode: "BCA102", type: "Theory", teacher: "Dr. S. C. Dimri", room: "Room 301", section: "BCA-A", status: "Normal" },
    { id: "TT-202", day: "Tuesday", timeSlot: "10:00 AM - 11:00 AM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Dr. Priya Sharma", room: "Room 204", section: "BCA-A", status: "Normal" },
    { id: "TT-C203", day: "Tuesday", timeSlot: "1:00 PM - 2:00 PM", subject: "Operating Systems", subjectCode: "BCA104", type: "Theory", teacher: "Dr. Abhishek Sharma", room: "Room 302", section: "BCA-C", status: "Normal" },
    { id: "TT-C204", day: "Tuesday", timeSlot: "5:00 PM - 6:00 PM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Mr. Bhawnesh Kumar", room: "Room 302", section: "BCA-C", status: "Normal" },

    // Wednesday Schedule
    { id: "TT-301", day: "Wednesday", timeSlot: "9:00 AM - 10:00 AM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Dr. Priya Sharma", room: "Room 204", section: "BCA-A", status: "Normal" },
    { id: "TT-302", day: "Wednesday", timeSlot: "10:00 AM - 11:00 AM", subject: "Java Lab", subjectCode: "BCA106", type: "Lab", teacher: "Dr. Priya Sharma", room: "Lab 2", section: "BCA-A", status: "Normal" },
    { id: "TT-C303", day: "Wednesday", timeSlot: "5:00 PM - 6:00 PM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Mr. Bhawnesh Kumar", room: "Room 302", section: "BCA-C", status: "Normal" },

    // Thursday Schedule
    { id: "TT-401", day: "Thursday", timeSlot: "9:00 AM - 10:00 AM", subject: "Python", subjectCode: "BCA103", type: "Theory", teacher: "Mr. Kanishk Bhatt", room: "Room 205", section: "BCA-A", status: "Normal" },
    { id: "TT-402", day: "Thursday", timeSlot: "10:00 AM - 11:00 AM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Dr. Priya Sharma", room: "Room 204", section: "BCA-A", status: "Normal" },
    { id: "TT-C403", day: "Thursday", timeSlot: "5:00 PM - 6:00 PM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Mr. Bhawnesh Kumar", room: "Room 302", section: "BCA-C", status: "Normal" },

    // Friday Schedule
    { id: "TT-501", day: "Friday", timeSlot: "9:00 AM - 10:00 AM", subject: "Operating Systems", subjectCode: "BCA104", type: "Theory", teacher: "Dr. Abhishek Sharma", room: "Room 206", section: "BCA-A", status: "Normal" },
    { id: "TT-C502", day: "Friday", timeSlot: "5:00 PM - 6:00 PM", subject: "Java Programming", subjectCode: "BCA101", type: "Theory", teacher: "Mr. Bhawnesh Kumar", room: "Room 302", section: "BCA-C", status: "Normal" }
  ],

  // Class Cancellation Notices & Schedule Changes
  scheduleChanges: [
    {
      id: "CHG-001",
      title: "Class Cancellation Notice",
      description: "Mr. Bhawnesh Kumar has cancelled the 5:00 PM Java Programming class for BCA UG-III (Sec C) due to an urgent departmental faculty meeting.",
      oldValue: "Scheduled: 5:00 PM - 6:00 PM (Room 302)",
      newValue: "CANCELLED (Notified before 4:00 PM)",
      subject: "Java Programming (BCA-C)",
      changedBy: "Mr. Bhawnesh Kumar (Faculty)",
      timestamp: "Today, 3:15 PM (Notified prior to 4:00 PM cutoff)",
      affectedUsers: "BCA UG-III (Sec C) Students",
      status: "Cancelled",
      type: "Cancellation",
      noticeTime: "3:15 PM",
      isBefore4PM: true,
      reason: "Urgent Departmental Meeting"
    },
    {
      id: "CHG-002",
      title: "Room Allocation Adjustment",
      description: "Python Lab (BCA-D) moved due to maintenance in Room 205.",
      oldValue: "Room 205",
      newValue: "Room 206",
      subject: "Python Lab (BCA-D)",
      changedBy: "Dr. Priya Sharma",
      timestamp: "15 Sep 2026, 11:20 AM",
      affectedUsers: "BCA-D Students, Mr. Kanishk Bhatt",
      status: "Published",
      type: "Room Change"
    }
  ],

  // System Conflicts List
  conflicts: [
    {
      id: "CONF-001",
      title: "Teacher Overlap Conflict",
      description: "Dr. Abhishek Sharma is scheduled for two classes simultaneously on Thursday at 11:00 AM.",
      affectedTeacher: "Dr. Abhishek Sharma",
      affectedRoom: "Room 206 vs LT-4",
      affectedSections: "BCA-A & MCA-G4",
      timeSlot: "Thu, 11:00 AM - 12:00 PM",
      severity: "High",
      reason: "Double booking during automated slot assignment",
      status: "Pending Action"
    },
    {
      id: "CONF-002",
      title: "Room Capacity Mismatch",
      description: "MCA-G3 (38 students) assigned to Lab 1 which only has capacity for 30 active terminals.",
      affectedTeacher: "Ms. Payal Karki",
      affectedRoom: "Lab 1 (Cap 30)",
      affectedSections: "MCA III (Sec G3)",
      timeSlot: "Wed, 2:00 PM - 4:00 PM",
      severity: "Medium",
      reason: "Lab allocation exceeded terminal capacity",
      status: "Pending Action"
    }
  ],

  // Notifications List (Includes Cancellation Messages for Students)
  notifications: [
    {
      id: "NOTIF-CANC-001",
      title: "⚠️ CLASS CANCELLED: Java Programming at 5:00 PM",
      description: "Mr. Bhawnesh Kumar cancelled today's Java Programming class (5:00 PM - 6:00 PM, Room 302) for BCA UG-III Sec C. Reason: Urgent Departmental Meeting. Notice posted at 3:15 PM (Before 4:00 PM cutoff).",
      timestamp: "Today, 3:15 PM",
      status: "Unread",
      type: "Class Cancellation",
      icon: "calendar-x",
      color: "danger",
      targetSection: "BCA-C",
      targetRole: "student"
    },
    {
      id: "NOTIF-001",
      title: "Timetable updated (Version 4)",
      description: "Official timetable Version 4 has been published by the Academic Committee.",
      timestamp: "Today, 10:42 AM",
      status: "Unread",
      type: "System",
      icon: "check-circle",
      color: "success"
    },
    {
      id: "NOTIF-002",
      title: "Room 204 Scheduled Maintenance",
      description: "Room 204 projector replacement scheduled on 20 Sep. Classes temporarily relocated to Room 301.",
      timestamp: "Yesterday, 5:20 PM",
      status: "Unread",
      type: "Alert",
      icon: "alert-triangle",
      color: "warning"
    }
  ],

  // Versions History
  versions: [
    { version: "Version 4 (Current)", label: "Final Published", date: "15 Sep 2026, 10:42 AM", createdBy: "Admin", conflictsCount: 0, status: "Active" },
    { version: "Version 3", label: "Draft with Resolves", date: "12 Sep 2026, 3:15 PM", createdBy: "Dr. Priya Sharma", conflictsCount: 2, status: "Archived" },
    { version: "Version 2", label: "Initial Auto-Gen", date: "10 Sep 2026, 9:00 AM", createdBy: "System Mock", conflictsCount: 7, status: "Archived" }
  ],

  // Demo User Profiles
  users: {
    admin: {
      name: "Admin Coordinator",
      role: "Admin",
      title: "Timetable Coordinator",
      department: "Academic Affairs",
      avatarLetter: "A",
      email: "admin@gehu.edu.in"
    },
    teacher: {
      name: "Mr. Bhawnesh Kumar",
      role: "Teacher",
      title: "Assistant Professor",
      department: "Computer Science & Engineering",
      avatarLetter: "B",
      email: "teacher@geu.ac.in",
      teacherId: "TCH-011"
    },
    student: {
      name: "Kartik Sharma",
      role: "Student",
      title: "BCA - Section C (3rd Semester)",
      department: "Computer Applications",
      avatarLetter: "K",
      studentId: "20261001",
      section: "BCA-C"
    }
  }
};
