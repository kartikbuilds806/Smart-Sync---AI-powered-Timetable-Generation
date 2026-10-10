/**
 * SmartSync Real University Dataset
 * Formatted directly from "Courses details" PDFs & verified counts:
 * - 4 Unique Courses (BCA, MCA, B.Sc IT, B.Sc CS)
 * - 40 Active Sections
 * - 38 Unique Faculty Members
 * - 33 Classrooms & Computer Laboratories
 * - Enrolled Student Registry (Minimum 6 Student Records)
 */

window.SMARTSYNC_COURSES = [
  { "id": "CRS-BCA", "code": "BCA", "name": "Bachelor of Computer Applications", "degree": "Undergraduate", "durationYears": 3, "totalSections": 31, "description": "3-Year undergraduate program focusing on computer science, programming, software engineering, AI/DS, and Cyber Security." },
  { "id": "CRS-MCA", "code": "MCA", "name": "Master of Computer Applications", "degree": "Postgraduate", "durationYears": 2, "totalSections": 9, "description": "2-Year postgraduate program specializing in advanced software development, AI/ML, Cloud Computing, and Full-Stack Engineering." },
  { "id": "CRS-BSCIT", "code": "BSc(IT)", "name": "Bachelor of Science in Information Technology", "degree": "Undergraduate", "durationYears": 3, "totalSections": 2, "description": "3-Year undergraduate program covering IT infrastructure, networking, and system administration." },
  { "id": "CRS-BSCCS", "code": "BSc(CS)", "name": "Bachelor of Science in Computer Science", "degree": "Undergraduate", "durationYears": 3, "totalSections": 2, "description": "3-Year undergraduate program focusing on core computer science theory, algorithms, and computational mathematics." }
];

window.SMARTSYNC_STUDENTS = [
  { "id": "STD-001", "studentId": "20261001", "name": "Kartik Sharma", "rollNo": "26BCA001", "course": "BCA", "section": "BCA III G1", "semester": "Semester 3", "email": "kartik.20261001@gehu.ac.in", "status": "Active" },
  { "id": "STD-002", "studentId": "20261002", "name": "Ananya Roy", "rollNo": "26BCA002", "course": "BCA", "section": "BCA III G2", "semester": "Semester 3", "email": "ananya.20261002@gehu.ac.in", "status": "Active" },
  { "id": "STD-003", "studentId": "20261003", "name": "Rahul Verma", "rollNo": "26BCA003", "course": "BCA", "section": "BCA I G1", "semester": "Semester 1", "email": "rahul.20261003@gehu.ac.in", "status": "Active" },
  { "id": "STD-004", "studentId": "20261004", "name": "Sneha Kapoor", "rollNo": "26BCA004", "course": "BCA", "section": "BCA I G2", "semester": "Semester 1", "email": "sneha.20261004@gehu.ac.in", "status": "Active" },
  { "id": "STD-005", "studentId": "20261005", "name": "Rohan Joshi", "rollNo": "26MCA001", "course": "MCA", "section": "MCA IIIrd SEC G1", "semester": "Semester 3", "email": "rohan.20261005@gehu.ac.in", "status": "Active" },
  { "id": "STD-006", "studentId": "20261006", "name": "Pooja Bisht", "rollNo": "26MCA002", "course": "MCA", "section": "MCA IIIrd SEC G2", "semester": "Semester 3", "email": "pooja.20261006@gehu.ac.in", "status": "Active" }
];

window.SMARTSYNC_TEACHERS = [
  { "id": "TCH-001", "name": "Mrs. Geetika Sharma", "department": "Computer Applications", "email": "geetika.sharma@gehu.ac.in", "phone": "+91 8171768899", "designation": "Assistant Professor" },
  { "id": "TCH-002", "name": "Mr. Abhishek Thapa", "department": "Computer Applications", "email": "abhishek.thapa@gehu.ac.in", "phone": "+91 9876543201", "designation": "Assistant Professor" },
  { "id": "TCH-003", "name": "Ms. Ritu Barthwal", "department": "Mathematics / CS", "email": "ritu.barthwal@gehu.ac.in", "phone": "+91 9876543202", "designation": "Assistant Professor" },
  { "id": "TCH-004", "name": "Mr. Vibhakar Ghosh", "department": "English & Humanities", "email": "vibhakar.ghosh@gehu.ac.in", "phone": "+91 9876543203", "designation": "Assistant Professor" },
  { "id": "TCH-005", "name": "Ms. Shiwani Bhaskar", "department": "Computer Applications", "email": "shiwani.bhaskar@gehu.ac.in", "phone": "+91 8445159744", "designation": "Assistant Professor" },
  { "id": "TCH-006", "name": "Ms. Anukriti", "department": "Mathematics", "email": "anukriti@gehu.ac.in", "phone": "+91 9876543205", "designation": "Assistant Professor" },
  { "id": "TCH-007", "name": "Mr. Vikas Kumar", "department": "Computer Applications", "email": "vikas.kumar@gehu.ac.in", "phone": "+91 8678813350", "designation": "Assistant Professor" },
  { "id": "TCH-008", "name": "Mr. Abhishek Chauhan", "department": "Mathematics / AI", "email": "abhishek.chauhan@gehu.ac.in", "phone": "+91 9876543207", "designation": "Assistant Professor" },
  { "id": "TCH-009", "name": "Dr. Ovais Bashir", "department": "Computer Applications", "email": "ovais.bashir@gehu.ac.in", "phone": "+91 9876543208", "designation": "Associate Professor" },
  { "id": "TCH-010", "name": "Ms. Ayushi Rana", "department": "Computer Applications", "email": "ayushi.rana@gehu.ac.in", "phone": "+91 9876543209", "designation": "Assistant Professor" },
  { "id": "TCH-011", "name": "Ms. Afsar Jahan", "department": "Computer Applications", "email": "afsar.jahan@gehu.ac.in", "phone": "+91 9876543210", "designation": "Assistant Professor" },
  { "id": "TCH-012", "name": "Ms. Deepanshi", "department": "AI & Data Science", "email": "deepanshi@gehu.ac.in", "phone": "+91 9876543211", "designation": "Assistant Professor" },
  { "id": "TCH-013", "name": "Ms. Gauri Takiyar", "department": "English & Soft Skills", "email": "gauri.takiyar@gehu.ac.in", "phone": "+91 9876543212", "designation": "Assistant Professor" },
  { "id": "TCH-014", "name": "Ms. Sangamitra", "department": "Management & Venture", "email": "sangamitra@gehu.ac.in", "phone": "+91 9876543213", "designation": "Assistant Professor" },
  { "id": "TCH-015", "name": "Ms. Aakriti Singh", "department": "Computer Applications", "email": "aakriti.singh@gehu.ac.in", "phone": "+91 9876543214", "designation": "Assistant Professor" },
  { "id": "TCH-016", "name": "Mr. Anuj Rawat", "department": "Computer Applications", "email": "anuj.rawat@gehu.ac.in", "phone": "+91 9876543215", "designation": "Assistant Professor" },
  { "id": "TCH-017", "name": "Dr. Ravi Sharma", "department": "Computer Applications", "email": "ravi.sharma@gehu.ac.in", "phone": "+91 9876543216", "designation": "Associate Professor" },
  { "id": "TCH-018", "name": "Dr. Vartika Agarwal", "department": "Computer Applications", "email": "vartika.agarwal@gehu.ac.in", "phone": "+91 7701994248", "designation": "Associate Professor" },
  { "id": "TCH-019", "name": "Dr. Sanjay Roka", "department": "Computer Science", "email": "sanjay.roka@gehu.ac.in", "phone": "+91 9876543218", "designation": "Professor" },
  { "id": "TCH-020", "name": "Dr. Deepak Gaur", "department": "Computer Applications", "email": "deepak.gaur@gehu.ac.in", "phone": "+91 9876543219", "designation": "Professor & HOD" },
  { "id": "TCH-021", "name": "Ms. Gunjan Mehra", "department": "Computer Applications", "email": "gunjan.mehra@gehu.ac.in", "phone": "+91 7088316631", "designation": "Assistant Professor" },
  { "id": "TCH-022", "name": "Mr. Abhinav Sharma", "department": "Career Success", "email": "abhinav.sharma@gehu.ac.in", "phone": "+91 9876543221", "designation": "Assistant Professor" },
  { "id": "TCH-023", "name": "Mr. Krishna Kumar", "department": "Computer Applications", "email": "krishna.kumar@gehu.ac.in", "phone": "+91 6201645675", "designation": "Assistant Professor" },
  { "id": "TCH-024", "name": "Dr. Siddhant Thapliyal", "department": "Computer Science", "email": "siddhant.thapliyal@gehu.ac.in", "phone": "+91 9876543223", "designation": "Associate Professor" },
  { "id": "TCH-025", "name": "Dr. Ankur Choudhary", "department": "Computer Applications", "email": "ankur.choudhary@gehu.ac.in", "phone": "+91 9876543224", "designation": "Associate Professor" },
  { "id": "TCH-026", "name": "Dr. Vandana Rawat", "department": "Computer Science", "email": "vandana.rawat@gehu.ac.in", "phone": "+91 7055001712", "designation": "Associate Professor" },
  { "id": "TCH-027", "name": "Mr. H. S. Negi", "department": "Computer Applications", "email": "harendra.negi@gehu.ac.in", "phone": "+91 8126475013", "designation": "Assistant Professor" },
  { "id": "TCH-028", "name": "Dr. Aditya Joshi", "department": "Computer Applications", "email": "aditya.joshi@gehu.ac.in", "phone": "+91 9557004416", "designation": "Associate Professor" },
  { "id": "TCH-029", "name": "Ms. Alankrita Joshi", "department": "Electronics / CS", "email": "alankrita.joshi@gehu.ac.in", "phone": "+91 9876543228", "designation": "Assistant Professor" },
  { "id": "TCH-030", "name": "Mr. Priyansh Kumar", "department": "Computer Applications", "email": "priyansh.kumar@gehu.ac.in", "phone": "+91 7500068057", "designation": "Assistant Professor" },
  { "id": "TCH-031", "name": "Mohd. Shuaib", "department": "Computer Applications", "email": "mohd.shuaib@gehu.ac.in", "phone": "+91 9876543230", "designation": "Assistant Professor" },
  { "id": "TCH-032", "name": "Dr. Bhawnesh Kumar", "department": "Computer Applications", "email": "teacher@geu.ac.in", "phone": "+91 9897680354", "designation": "Associate Professor" },
  { "id": "TCH-033", "name": "Ms. Rashmi Kanyal", "department": "Computer Applications", "email": "rashmi.kanyal@gehu.ac.in", "phone": "+91 6397154208", "designation": "Assistant Professor" },
  { "id": "TCH-034", "name": "Ms. Swati Pant", "department": "Computer Applications", "email": "swati.pant@gehu.ac.in", "phone": "+91 7500057411", "designation": "Assistant Professor" },
  { "id": "TCH-035", "name": "Mr. Utsav Kumar", "department": "Computer Applications", "email": "utsav.kumar@gehu.ac.in", "phone": "+91 9576685689", "designation": "Assistant Professor" },
  { "id": "TCH-036", "name": "Dr. Amit Kumar", "department": "Computer Applications", "email": "amit.kumar@gehu.ac.in", "phone": "+91 9876543235", "designation": "Associate Professor" },
  { "id": "TCH-037", "name": "Dr. Varsha Mittal", "department": "Computer Applications", "email": "varsha.mittal@gehu.ac.in", "phone": "+91 9634435387", "designation": "Associate Professor" },
  { "id": "TCH-038", "name": "Mr. Gagandeep Singh", "department": "Computer Applications", "email": "gagandeep.singh@gehu.ac.in", "phone": "+91 9927035279", "designation": "Assistant Professor" }
];

window.SMARTSYNC_ROOMS = [
  { "id": "RM-NCR1", "code": "NCR1", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-NCR2", "code": "NCR2", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-NCR3", "code": "NCR3", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-NCR4", "code": "NCR4", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-NCR5", "code": "NCR5", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-NCR6", "code": "NCR6", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "New Academic Block" },
  { "id": "RM-CR1", "code": "CR1", "type": "Classroom", "category": "Hall", "capacity": 65, "building": "Main Block" },
  { "id": "RM-CR4", "code": "CR4", "type": "Classroom", "category": "Hall", "capacity": 65, "building": "Main Block" },
  { "id": "RM-CR5", "code": "CR5", "type": "Classroom", "category": "Hall", "capacity": 65, "building": "Main Block" },
  { "id": "RM-CR8", "code": "CR8", "type": "Classroom", "category": "Hall", "capacity": 65, "building": "Main Block" },
  { "id": "RM-CR25", "code": "CR25 (Civil)", "type": "Classroom", "category": "Hall", "capacity": 70, "building": "Engineering Block" },
  { "id": "RM-LT3", "code": "LT3", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT4", "code": "LT4", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT5", "code": "LT5", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT6", "code": "LT6", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT7", "code": "LT7", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT8", "code": "LT8", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT9", "code": "LT9", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT13", "code": "LT13", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-LT15", "code": "LT15", "type": "Lecture Theater", "category": "Hall", "capacity": 80, "building": "Central Lecture Complex" },
  { "id": "RM-PARAB", "code": "PARA B", "type": "Classroom", "category": "Hall", "capacity": 60, "building": "Para Medical Block" },
  { "id": "RM-LAB3", "code": "LAB3", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "IT Building 2nd Fl" },
  { "id": "RM-LAB6", "code": "LAB6", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "IT Building 3rd Fl" },
  { "id": "RM-LAB7", "code": "LAB7", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "IT Building 3rd Fl" },
  { "id": "RM-DL1", "code": "DL1 (Digital Lab 1)", "type": "Computer Lab", "category": "Lab", "capacity": 55, "building": "Digital Technology Block" },
  { "id": "RM-DL2", "code": "DL2 (Digital Lab 2)", "type": "Computer Lab", "category": "Lab", "capacity": 55, "building": "Digital Technology Block" },
  { "id": "RM-IBMLAB", "code": "IBM LAB", "type": "Specialized Lab", "category": "Lab", "capacity": 60, "building": "Innovation Center" },
  { "id": "RM-CAADLAB", "code": "CAAD LAB", "type": "Specialized Lab", "category": "Lab", "capacity": 60, "building": "Engineering Block" },
  { "id": "RM-NEWLAB1", "code": "NEW LAB 1", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "IT Building 1st Fl" },
  { "id": "RM-PARAMGF", "code": "PARAM GF", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "Param Academic Block" },
  { "id": "RM-PARAMSF", "code": "PARAM SF", "type": "Computer Lab", "category": "Lab", "capacity": 60, "building": "Param Academic Block" },
  { "id": "RM-ABFF", "code": "AB FF", "type": "Computer Lab", "category": "Lab", "capacity": 50, "building": "Academic Block First Fl" },
  { "id": "RM-ABGF", "code": "AB GF", "type": "Computer Lab", "category": "Lab", "capacity": 50, "building": "Academic Block Ground Fl" }
];

window.SMARTSYNC_SECTIONS = [
  { "id": "SEC-BCA1-G1", "name": "BCA I G1", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Mrs. Geetika Sharma" },
  { "id": "SEC-BCA1-G2", "name": "BCA I G2", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR6", "coordinator": "Mr. Abhishek Thapa" },
  { "id": "SEC-BCA1-G3", "name": "BCA I G3", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Ritu Barthwal" },
  { "id": "SEC-BCA1-G4", "name": "BCA I G4", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Mr. Vibhakar Ghosh" },
  { "id": "SEC-BCA1-A1", "name": "BCA I A1 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Deepanshi" },
  { "id": "SEC-BCA1-A2", "name": "BCA I A2 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Deepanshi" },
  { "id": "SEC-BCA1-A3", "name": "BCA I A3 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A4", "name": "BCA I A4 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A5", "name": "BCA I A5 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A6", "name": "BCA I A6 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A7", "name": "BCA I A7 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A8", "name": "BCA I A8 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-A9", "name": "BCA I A9 AI/DS", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR1", "coordinator": "Ms. Shiwani Bhaskar" },
  { "id": "SEC-BCA1-C1", "name": "BCA I C1 CYBER", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR2", "coordinator": "Ms. Swati Pant" },
  { "id": "SEC-BCA1-C2", "name": "BCA I C2 CYBER", "courseCode": "BCA", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR2", "coordinator": "Ms. Swati Pant" },
  { "id": "SEC-BSCIT1", "name": "BSc(IT) I", "courseCode": "BSc(IT)", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR3", "coordinator": "Ms. Swati Pant" },
  { "id": "SEC-BSCCS1", "name": "BSc(CS) I", "courseCode": "BSc(CS)", "semester": 1, "semesterLabel": "Semester 1", "room": "NCR3", "coordinator": "Ms. Swati Pant" },

  { "id": "SEC-BCA3-G1", "name": "BCA III G1", "courseCode": "BCA", "semester": 3, "semesterLabel": "Semester 3", "room": "CR1", "coordinator": "Ms. Shikha Thakur" },
  { "id": "SEC-BCA3-G2", "name": "BCA III G2", "courseCode": "BCA", "semester": 3, "semesterLabel": "Semester 3", "room": "CR4", "coordinator": "Dr. Vartika Agarwal" },
  { "id": "SEC-BCA3-G3", "name": "BCA III G3", "courseCode": "BCA", "semester": 3, "semesterLabel": "Semester 3", "room": "CR5", "coordinator": "Mr. Jaishankar Bhatt" },

  { "id": "SEC-BCA5-C", "name": "BCA V SEC C", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "Room 302", "coordinator": "Dr. Bhawnesh Kumar" },
  { "id": "SEC-BCA5-D", "name": "BCA V SEC D", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "Room 302", "coordinator": "Dr. Bhawnesh Kumar" },
  { "id": "SEC-BCA5-H", "name": "BCA V SEC H", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT8", "coordinator": "Dr. Aditya Joshi" },
  { "id": "SEC-BCA5-E", "name": "BCA (AI/DS) V SEC E", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT6", "coordinator": "Mr. Priyansh Kumar" },
  { "id": "SEC-BCA5-F", "name": "BCA (AI/DS) V SEC F", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT6", "coordinator": "Mr. Priyansh Kumar" },
  { "id": "SEC-BCA5-G", "name": "BCA (AI/DS) V SEC G", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT7", "coordinator": "Mr. Pratik Kumar" },
  { "id": "SEC-BCA5-J1", "name": "BCA V SEC J1 (Para Medical)", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "PARA B", "coordinator": "Dr. Aditya Joshi" },
  { "id": "SEC-BCA5-J2", "name": "BCA (AI/DS) V SEC J2", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT7", "coordinator": "Mr. Pratik Kumar" },
  { "id": "SEC-BCA5-I", "name": "BCA (CS/CL) V SEC I", "courseCode": "BCA", "semester": 5, "semesterLabel": "Semester 5", "room": "LT9", "coordinator": "Ms. Swati Pant" },
  { "id": "SEC-BSCIT5", "name": "BSc IT V (Para Medical)", "courseCode": "BSc(IT)", "semester": 5, "semesterLabel": "Semester 5", "room": "PARA B", "coordinator": "Ms. Swati Pant" },
  { "id": "SEC-BSCCS5", "name": "BSc CS V (Para Medical)", "courseCode": "BSc(CS)", "semester": 5, "semesterLabel": "Semester 5", "room": "PARA B", "coordinator": "Ms. Swati Pant" },

  { "id": "SEC-MCA1-G1", "name": "MCA I SEC G1", "courseCode": "MCA", "semester": 1, "semesterLabel": "Semester 1", "room": "LT3", "coordinator": "Mr. Gagandeep Singh" },
  { "id": "SEC-MCA1-G2", "name": "MCA I SEC G2", "courseCode": "MCA", "semester": 1, "semesterLabel": "Semester 1", "room": "LT3", "coordinator": "Mr. Gagandeep Singh" },
  { "id": "SEC-MCA1-G3", "name": "MCA I SEC G3", "courseCode": "MCA", "semester": 1, "semesterLabel": "Semester 1", "room": "LT3", "coordinator": "Mr. Vikash Kumar" },
  { "id": "SEC-MCA1-A1", "name": "MCA I SEC A1 AI/DS", "courseCode": "MCA", "semester": 1, "semesterLabel": "Semester 1", "room": "LT4", "coordinator": "Dr. Varsha Mittal" },
  { "id": "SEC-MCA1-A2", "name": "MCA I SEC A2 AI/DS", "courseCode": "MCA", "semester": 1, "semesterLabel": "Semester 1", "room": "LT4", "coordinator": "Dr. Varsha Mittal" },

  { "id": "SEC-MCA3-G1", "name": "MCA IIIrd SEC G1", "courseCode": "MCA", "semester": 3, "semesterLabel": "Semester 3", "room": "LT-4", "coordinator": "Mr. Gagandeep Singh" },
  { "id": "SEC-MCA3-G2", "name": "MCA IIIrd SEC G2", "courseCode": "MCA", "semester": 3, "semesterLabel": "Semester 3", "room": "LT-4", "coordinator": "Mr. Gagandeep Singh" },
  { "id": "SEC-MCA3-G3", "name": "MCA IIIrd SEC G3", "courseCode": "MCA", "semester": 3, "semesterLabel": "Semester 3", "room": "LT-3", "coordinator": "Mr. Vikash Kumar" },
  { "id": "SEC-MCA3-A1", "name": "MCA IIIrd SEC A1", "courseCode": "MCA", "semester": 3, "semesterLabel": "Semester 3", "room": "LT-3", "coordinator": "Dr. Varsha Mittal" }
];

window.SMARTSYNC_SUBJECTS = [
  { "id": "SUB-TBC101", "code": "TBC101", "name": "Computational Thinking & Fundamentals of IT", "course": "BCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TBC102", "code": "TBC102", "name": "Foundations of Computer Programming", "course": "BCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TBC103", "code": "TBC103", "name": "Mathematical Foundation of Computer Science", "course": "BCA", "type": "Theory", "classesPerWeek": 3, "department": "Mathematics / CS" },
  { "id": "SUB-TBC104", "code": "TBC104", "name": "Professional English Skills", "course": "BCA", "type": "Theory", "classesPerWeek": 3, "department": "English & Humanities" },
  { "id": "SUB-BBC111", "code": "BBC111", "name": "Basic Mathematics - I", "course": "BCA", "type": "Theory", "classesPerWeek": 3, "department": "Mathematics" },
  { "id": "SUB-PBC101", "code": "PBC101", "name": "Digital Productivity Tools Laboratory", "course": "BCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },
  { "id": "SUB-PBC102", "code": "PBC102", "name": "Computer Programming Laboratory", "course": "BCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },

  { "id": "SUB-TMC301", "code": "TMC301", "name": "Design & Analysis of Algorithms", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC302", "code": "TMC302", "name": "Mobile Application Development", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC303", "code": "TMC303", "name": "Advanced Java Programming", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC311", "code": "TMC311", "name": "Machine Learning - II", "course": "MCA", "type": "Theory", "classesPerWeek": 3, "department": "AI & Data Science" },
  { "id": "SUB-TMC312", "code": "TMC312", "name": "DevOps on Cloud", "course": "MCA", "type": "Theory", "classesPerWeek": 3, "department": "Computer Applications" },
  { "id": "SUB-TMD301", "code": "TMD301", "name": "Data Analytics & Visualization", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "AI & Data Science" },
  { "id": "SUB-PMC301", "code": "PMC301", "name": "DAA Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },
  { "id": "SUB-PMC302", "code": "PMC302", "name": "MAD Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },
  { "id": "SUB-PMC303", "code": "PMC303", "name": "Advanced Java Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },

  { "id": "SUB-TMC101", "code": "TMC101", "name": "Full Stack Development", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC102", "code": "TMC102", "name": "Operating Systems", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC103", "code": "TMC103", "name": "Computer Networks", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-TMC104", "code": "TMC104", "name": "Software Engineering", "course": "MCA", "type": "Theory", "classesPerWeek": 3, "department": "Computer Applications" },
  { "id": "SUB-TMC105", "code": "TMC105", "name": "Data Structures", "course": "MCA", "type": "Theory", "classesPerWeek": 4, "department": "Computer Applications" },
  { "id": "SUB-PMC101", "code": "PMC101", "name": "Full Stack Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },
  { "id": "SUB-PMC102", "code": "PMC102", "name": "Data Structures Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" },
  { "id": "SUB-PMC103", "code": "PMC103", "name": "Operating Systems Laboratory", "course": "MCA", "type": "Lab", "classesPerWeek": 2, "department": "Computer Applications" }
];

window.SMARTSYNC_STUDENTS = [
  { "id": "STD-001", "studentId": "20261001", "name": "Kartik Sharma", "rollNo": "26BCA001", "course": "BCA", "section": "BCA III G1", "semester": "Semester 3", "email": "kartik.20261001@gehu.ac.in", "status": "Active" },
  { "id": "STD-002", "studentId": "20261002", "name": "Ananya Roy", "rollNo": "26BCA002", "course": "BCA", "section": "BCA III G2", "semester": "Semester 3", "email": "ananya.20261002@gehu.ac.in", "status": "Active" },
  { "id": "STD-003", "studentId": "20261003", "name": "Rahul Verma", "rollNo": "26BCA003", "course": "BCA", "section": "BCA I G1", "semester": "Semester 1", "email": "rahul.20261003@gehu.ac.in", "status": "Active" },
  { "id": "STD-004", "studentId": "20261004", "name": "Sneha Kapoor", "rollNo": "26BCA004", "course": "BCA", "section": "BCA I G2", "semester": "Semester 1", "email": "sneha.20261004@gehu.ac.in", "status": "Active" },
  { "id": "STD-005", "studentId": "20261005", "name": "Rohan Joshi", "rollNo": "26MCA001", "course": "MCA", "section": "MCA IIIrd SEC G1", "semester": "Semester 3", "email": "rohan.20261005@gehu.ac.in", "status": "Active" },
  { "id": "STD-006", "studentId": "20261006", "name": "Pooja Bisht", "rollNo": "26MCA002", "course": "MCA", "section": "MCA IIIrd SEC G2", "semester": "Semester 3", "email": "pooja.20261006@gehu.ac.in", "status": "Active" }
];

