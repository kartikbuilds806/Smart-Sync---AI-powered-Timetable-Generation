/**
 * SmartSync Data Service Layer
 * Centralized data management reading real university datasets and providing CRUD operations.
 */

class SmartDataService {
  constructor() {
    this.storageKeyPrefix = 'smartsync_real_data_';
    this.initData();
  }

  async initData() {
    // Helper to get or init localStorage with defaults
    this.courses = this.getOrStorage('courses', window.SMARTSYNC_COURSES || []);
    this.sections = this.getOrStorage('sections', window.SMARTSYNC_SECTIONS || []);
    this.teachers = this.getOrStorage('teachers', window.SMARTSYNC_TEACHERS || []);
    this.rooms = this.getOrStorage('rooms', window.SMARTSYNC_ROOMS || []);
    this.subjects = this.getOrStorage('subjects', window.SMARTSYNC_SUBJECTS || []);
    this.students = this.getOrStorage('students', window.SMARTSYNC_STUDENTS || []);
    
    // Populate with real extracted university timetable baseline if empty
    let storedTimetable = this.getOrStorage('timetable', null);
    if (!storedTimetable || storedTimetable.length === 0) {
      this.timetable = window.SMARTSYNC_TIMETABLE || [];
      this.saveStorage('timetable', this.timetable);
    } else {
      this.timetable = storedTimetable;
    }

    this.conflicts = this.getOrStorage('conflicts', []);

    let storedNotifs = this.getOrStorage('notifications', null);
    if (!storedNotifs || storedNotifs.length === 0) {
      this.notifications = [
        {
          id: 'NOTIF-001',
          title: 'Master Timetable v1.1 Active',
          message: 'Odd Semester 2026 timetable published and active across all lecture theaters and computer labs.',
          timestamp: '15 mins ago',
          type: 'success',
          status: 'Unread'
        },
        {
          id: 'NOTIF-002',
          title: 'Room Allocation Optimized',
          message: 'MCA III G1 Period 2 relocated to LT-4 to maintain optimal lecture hall capacities.',
          timestamp: '1 hour ago',
          type: 'warning',
          status: 'Unread'
        },
        {
          id: 'NOTIF-003',
          title: 'Class Substitution Approved',
          message: 'Mrs. Geetika Sharma approved coverage for Dr. Bhawnesh Kumar (BCA-301, BCA III G1).',
          timestamp: '2 hours ago',
          type: 'info',
          status: 'Unread'
        },
        {
          id: 'NOTIF-004',
          title: 'Departmental Review Meeting',
          message: 'Faculty meeting with Head of Department scheduled for Friday at 4:00 PM in Conference Room 1.',
          timestamp: 'Yesterday',
          type: 'primary',
          status: 'Read'
        }
      ];
      this.saveStorage('notifications', this.notifications);
    } else {
      this.notifications = storedNotifs;
    }

    let storedVersions = this.getOrStorage('versions', null);
    if (!storedVersions || storedVersions.length === 0) {
      this.versions = [
        {
          id: 'VER-001',
          versionNumber: 'v1.0 - Initial Draft',
          title: 'Graphic Era University Timetable Baseline',
          scopeDescription: 'MCA & BCA Sections (Academic Grid extracted from PDFs)',
          timestamp: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
          formattedDate: 'Oct 12, 2026, 10:00 AM',
          sessionsCount: this.timetable.length,
          author: 'Academic Affairs Office',
          status: 'Archived',
          notes: 'Initial departmental baseline schedule extracted from university notices',
          timetableSnapshot: JSON.parse(JSON.stringify(this.timetable))
        },
        {
          id: 'VER-002',
          versionNumber: 'v1.1 - Post-Add/Drop Revised',
          title: 'Lab & Room Allocation Optimized',
          scopeDescription: 'All MCA & BCA Sections with Computer Lab allocations',
          timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
          formattedDate: 'Oct 17, 2026, 04:30 PM',
          sessionsCount: this.timetable.length,
          author: 'Dr. Bhawnesh Kumar (Coordinator)',
          status: 'Active Published',
          notes: 'Optimized laboratory double-slot allocations and balanced faculty contact hours',
          timetableSnapshot: JSON.parse(JSON.stringify(this.timetable))
        }
      ];
      this.saveStorage('versions', this.versions);
    } else {
      // Ensure all stored versions have a timetableSnapshot
      let modified = false;
      storedVersions.forEach(v => {
        if (!v.timetableSnapshot || v.timetableSnapshot.length === 0) {
          v.timetableSnapshot = JSON.parse(JSON.stringify(this.timetable));
          modified = true;
        }
      });
      if (modified) {
        this.saveStorage('versions', storedVersions);
      }
      this.versions = storedVersions;
    }
    this.substitutions = this.getOrStorage('substitutions', [
      {
        id: 'SUB-001',
        sessionId: 'TT-SAMPLE-1',
        requestingTeacher: 'Dr. Bhawnesh Kumar',
        coveringTeacher: 'Mrs. Geetika Sharma',
        section: 'BCA III G1',
        subjectCode: 'BCA-301',
        subject: 'Object Oriented Programming C++',
        day: 'Monday',
        periodIndex: 1,
        timeSlot: '8:55 AM – 9:50 AM',
        room: 'LT-3',
        reason: 'Faculty Development Program (FDP)',
        notes: 'Please cover Unit 3 Polymorphism and Virtual Functions lecture',
        date: new Date().toISOString().split('T')[0],
        status: 'Approved',
        createdAt: new Date().toISOString()
      }
    ]);
  }

  getOrStorage(key, defaultVal) {
    try {
      const stored = localStorage.getItem(this.storageKeyPrefix + key);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn(`Error reading ${key} from localStorage`, e);
    }
    return defaultVal;
  }

  saveStorage(key, val) {
    try {
      localStorage.setItem(this.storageKeyPrefix + key, JSON.stringify(val));
    } catch (e) {
      console.warn(`Error saving ${key} to localStorage`, e);
    }
  }

  // --- Dynamic Dashboard Stats ---
  async getDashboardStats() {
    await this.initData();
    return {
      totalCourses: this.courses.length,
      totalSections: this.sections.length,
      totalFaculty: this.teachers.length,
      totalRooms: this.rooms.length,
      totalStudents: this.students.length,
      timetableGenerated: this.timetable.length > 0,
      timetableEntriesCount: this.timetable.length,
      conflictsCount: this.conflicts.length,
      versionsCount: this.versions.length,
      unreadNotificationsCount: this.notifications.filter(n => n.status === 'Unread').length
    };
  }

  // --- Courses ---
  async getCourses() {
    await this.initData();
    return [...this.courses];
  }

  async getCourseById(id) {
    await this.initData();
    return this.courses.find(c => c.id === id || c.code === id) || null;
  }

  async addCourse(course) {
    await this.initData();
    course.id = course.id || `CRS-${course.code.toUpperCase()}`;
    course.totalSections = Number(course.totalSections) || 0;
    course.durationYears = Number(course.durationYears) || 3;
    this.courses.push(course);
    this.saveStorage('courses', this.courses);
    return course;
  }

  async updateCourse(id, updatedData) {
    await this.initData();
    const index = this.courses.findIndex(c => c.id === id || c.code === id);
    if (index !== -1) {
      if (updatedData.durationYears) updatedData.durationYears = Number(updatedData.durationYears);
      if (updatedData.totalSections) updatedData.totalSections = Number(updatedData.totalSections);
      this.courses[index] = { ...this.courses[index], ...updatedData };
      this.saveStorage('courses', this.courses);
      return this.courses[index];
    }
    return null;
  }

  async deleteCourse(id) {
    await this.initData();
    this.courses = this.courses.filter(c => c.id !== id && c.code !== id);
    this.saveStorage('courses', this.courses);
    return true;
  }

  // --- Sections ---
  async getSections() {
    await this.initData();
    return [...this.sections];
  }

  async getSectionById(id) {
    await this.initData();
    return this.sections.find(s => s.id === id) || null;
  }

  async getSectionsByCourseAndSemester(courseCode, semester) {
    await this.initData();
    return this.sections.filter(s => {
      const matchCourse = !courseCode || s.courseCode.toLowerCase() === courseCode.toLowerCase();
      const matchSem = !semester || String(s.semester) === String(semester);
      return matchCourse && matchSem;
    });
  }

  async addSection(section) {
    await this.initData();
    section.id = section.id || `SEC-${Date.now()}`;
    section.semester = Number(section.semester) || 1;
    section.semesterLabel = section.semesterLabel || `Semester ${section.semester}`;
    this.sections.push(section);
    this.saveStorage('sections', this.sections);
    return section;
  }

  async updateSection(id, updatedData) {
    await this.initData();
    const index = this.sections.findIndex(s => s.id === id);
    if (index !== -1) {
      if (updatedData.semester) {
        updatedData.semester = Number(updatedData.semester);
        if (!updatedData.semesterLabel) {
          updatedData.semesterLabel = `Semester ${updatedData.semester}`;
        }
      }
      this.sections[index] = { ...this.sections[index], ...updatedData };
      this.saveStorage('sections', this.sections);
      return this.sections[index];
    }
    return null;
  }

  async deleteSection(id) {
    await this.initData();
    this.sections = this.sections.filter(s => s.id !== id);
    this.saveStorage('sections', this.sections);
    return true;
  }

  // --- Teachers ---
  async getTeachers() {
    await this.initData();
    return [...this.teachers];
  }

  async getFaculty() {
    return this.getTeachers();
  }

  async getTeacherById(id) {
    await this.initData();
    return this.teachers.find(t => t.id === id) || null;
  }

  async addTeacher(teacher) {
    await this.initData();
    teacher.id = teacher.id || `TCH-${Date.now()}`;
    teacher.maxWorkloadHours = Number(teacher.maxWorkloadHours) || 16;
    teacher.designation = teacher.designation || 'Assistant Professor';
    this.teachers.push(teacher);
    this.saveStorage('teachers', this.teachers);
    return teacher;
  }

  async updateTeacher(id, updatedData) {
    await this.initData();
    const index = this.teachers.findIndex(t => t.id === id);
    if (index !== -1) {
      if (updatedData.maxWorkloadHours) updatedData.maxWorkloadHours = Number(updatedData.maxWorkloadHours);
      this.teachers[index] = { ...this.teachers[index], ...updatedData };
      this.saveStorage('teachers', this.teachers);
      return this.teachers[index];
    }
    return null;
  }

  async deleteTeacher(id) {
    await this.initData();
    this.teachers = this.teachers.filter(t => t.id !== id);
    this.saveStorage('teachers', this.teachers);
    return true;
  }

  // --- Students ---
  async getStudents() {
    await this.initData();
    return [...this.students];
  }

  async addStudent(student) {
    await this.initData();
    student.id = student.id || `STD-${Date.now()}`;
    this.students.push(student);
    this.saveStorage('students', this.students);
    return student;
  }

  // --- Rooms ---
  async getRooms() {
    await this.initData();
    return [...this.rooms];
  }

  async getRoomById(id) {
    await this.initData();
    return this.rooms.find(r => r.id === id || r.code === id) || null;
  }

  async addRoom(room) {
    await this.initData();
    room.id = room.id || `RM-${Date.now()}`;
    room.capacity = Number(room.capacity) || 60;
    this.rooms.push(room);
    this.saveStorage('rooms', this.rooms);
    return room;
  }

  async updateRoom(id, updatedData) {
    await this.initData();
    const index = this.rooms.findIndex(r => r.id === id || r.code === id);
    if (index !== -1) {
      if (updatedData.capacity) updatedData.capacity = Number(updatedData.capacity);
      this.rooms[index] = { ...this.rooms[index], ...updatedData };
      this.saveStorage('rooms', this.rooms);
      return this.rooms[index];
    }
    return null;
  }

  async deleteRoom(id) {
    await this.initData();
    this.rooms = this.rooms.filter(r => r.id !== id && r.code !== id);
    this.saveStorage('rooms', this.rooms);
    return true;
  }

  // --- Subjects ---
  async getSubjects() {
    await this.initData();
    return [...this.subjects];
  }

  async getSubjectById(id) {
    await this.initData();
    return this.subjects.find(s => s.id === id || s.code === id) || null;
  }

  async addSubject(subject) {
    await this.initData();
    subject.id = subject.id || `SUB-${subject.code.toUpperCase()}`;
    subject.classesPerWeek = Number(subject.classesPerWeek) || 3;
    this.subjects.push(subject);
    this.saveStorage('subjects', this.subjects);
    return subject;
  }

  async updateSubject(id, updatedData) {
    await this.initData();
    const index = this.subjects.findIndex(s => s.id === id || s.code === id);
    if (index !== -1) {
      if (updatedData.classesPerWeek) updatedData.classesPerWeek = Number(updatedData.classesPerWeek);
      this.subjects[index] = { ...this.subjects[index], ...updatedData };
      this.saveStorage('subjects', this.subjects);
      return this.subjects[index];
    }
    return null;
  }

  async deleteSubject(id) {
    await this.initData();
    this.subjects = this.subjects.filter(s => s.id !== id && s.code !== id);
    this.saveStorage('subjects', this.subjects);
    return true;
  }

  // --- Timetable & Engine ---
  async getTimetable(filter = {}) {
    await this.initData();
    let list = [...this.timetable];

    if (filter.course && filter.course !== 'ALL') {
      list = list.filter(item => item.course && item.course.toLowerCase() === filter.course.toLowerCase());
    }
    if (filter.section && filter.section !== 'ALL') {
      list = list.filter(item => item.section && item.section.toLowerCase() === filter.section.toLowerCase());
    }
    if (filter.teacher && filter.teacher !== 'ALL') {
      list = list.filter(item => item.teacher && item.teacher.toLowerCase().includes(filter.teacher.toLowerCase()));
    }
    if (filter.room && filter.room !== 'ALL') {
      list = list.filter(item => item.room && item.room.toLowerCase() === filter.room.toLowerCase());
    }
    if (filter.day && filter.day !== 'ALL') {
      list = list.filter(item => item.day && item.day.toLowerCase() === filter.day.toLowerCase());
    }
    if (filter.type && filter.type !== 'ALL') {
      list = list.filter(item => item.type && item.type.toLowerCase() === filter.type.toLowerCase());
    }
    if (filter.search) {
      const q = filter.search.toLowerCase().trim();
      list = list.filter(item => 
        (item.subject && item.subject.toLowerCase().includes(q)) ||
        (item.subjectCode && item.subjectCode.toLowerCase().includes(q)) ||
        (item.teacher && item.teacher.toLowerCase().includes(q)) ||
        (item.room && item.room.toLowerCase().includes(q)) ||
        (item.section && item.section.toLowerCase().includes(q))
      );
    }
    return list;
  }

  async getTimetableFilterOptions() {
    await this.initData();
    const courses = [...new Set(this.timetable.map(t => t.course).filter(Boolean))].sort();
    const sections = [...new Set(this.timetable.map(t => t.section).filter(Boolean))].sort();
    const teachers = [...new Set(this.timetable.map(t => t.teacher).filter(Boolean))].sort();
    const rooms = [...new Set(this.timetable.map(t => t.room).filter(Boolean))].sort();
    return { courses, sections, teachers, rooms };
  }

  async resetTimetableToDefault() {
    this.timetable = window.SMARTSYNC_TIMETABLE || [];
    this.saveStorage('timetable', this.timetable);
    return [...this.timetable];
  }

  async getSessionById(id) {
    await this.initData();
    return this.timetable.find(s => s.id === id) || null;
  }

  async updateSession(id, updatedFields) {
    await this.initData();
    const index = this.timetable.findIndex(s => s.id === id);
    if (index !== -1) {
      this.timetable[index] = { ...this.timetable[index], ...updatedFields };
      this.saveStorage('timetable', this.timetable);
      return this.timetable[index];
    }
    return null;
  }

  async deleteSession(id) {
    await this.initData();
    const initialLen = this.timetable.length;
    this.timetable = this.timetable.filter(s => s.id !== id);
    if (this.timetable.length !== initialLen) {
      this.saveStorage('timetable', this.timetable);
      return true;
    }
    return false;
  }

  async simulateConflictDemo() {
    await this.initData();
    
    // Remove any previous simulated test conflicts first
    this.timetable = this.timetable.filter(s => !s.id.startsWith('SIM-CONF-'));

    // 1. Hard Conflict: Double-booked Room 'LT-3' on Monday P2 (8:55 AM – 9:50 AM)
    const confRoom1 = {
      id: 'SIM-CONF-RM-1',
      section: 'BCA III G1',
      course: 'BCA',
      semester: 'Semester 3',
      day: 'Monday',
      periodIndex: 1, // P2
      timeSlot: '8:55 AM – 9:50 AM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'BCA-301',
      subject: 'Object Oriented Programming C++',
      teacher: 'Dr. Bhawnesh Kumar',
      room: 'LT-3',
      status: 'Conflict',
      isSimulated: true
    };

    const confRoom2 = {
      id: 'SIM-CONF-RM-2',
      section: 'MCA I G1',
      course: 'MCA',
      semester: 'Semester 1',
      day: 'Monday',
      periodIndex: 1, // P2 (Same slot, same room!)
      timeSlot: '8:55 AM – 9:50 AM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'MCA-102',
      subject: 'Advanced Java Frameworks',
      teacher: 'Mrs. Geetika Sharma',
      room: 'LT-3',
      status: 'Conflict',
      isSimulated: true
    };

    // 2. Hard Conflict: Double-booked Teacher 'Dr. Bhawnesh Kumar' on Tuesday P3 (10:10 AM – 11:05 AM)
    const confTch1 = {
      id: 'SIM-CONF-TCH-1',
      section: 'BCA III G1',
      course: 'BCA',
      semester: 'Semester 3',
      day: 'Tuesday',
      periodIndex: 2, // P3
      timeSlot: '10:10 AM – 11:05 AM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'BCA-302',
      subject: 'Data Structures & Algorithms',
      teacher: 'Dr. Bhawnesh Kumar',
      room: 'CR1',
      status: 'Conflict',
      isSimulated: true
    };

    const confTch2 = {
      id: 'SIM-CONF-TCH-2',
      section: 'MCA I G1',
      course: 'MCA',
      semester: 'Semester 1',
      day: 'Tuesday',
      periodIndex: 2, // P3 (Same slot, same teacher in different room!)
      timeSlot: '10:10 AM – 11:05 AM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'MCA-105',
      subject: 'Cloud Computing Architectures',
      teacher: 'Dr. Bhawnesh Kumar',
      room: 'NCR1',
      status: 'Conflict',
      isSimulated: true
    };

    // 3. Soft Conflict: Teacher Workload Limit Exceeded (Dr. Bhawnesh Kumar extra hours)
    const softWorkload = {
      id: 'SIM-CONF-SOFT-WL',
      section: 'BSc(IT) III',
      course: 'BSc(IT)',
      semester: 'Semester 3',
      day: 'Wednesday',
      periodIndex: 6, // P7
      timeSlot: '2:05 PM – 3:00 PM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'IT-304',
      subject: 'Network Security Fundamentals',
      teacher: 'Dr. Bhawnesh Kumar',
      room: 'LT-2',
      status: 'SoftWarning',
      isSimulated: true
    };

    // 4. Soft Conflict: Class scheduled in Lunch Window (Period 5: 1:10 PM – 2:05 PM)
    const softLunch = {
      id: 'SIM-CONF-SOFT-LUNCH',
      section: 'BCA III G2',
      course: 'BCA',
      semester: 'Semester 3',
      day: 'Thursday',
      periodIndex: 5, // P6 / Lunch window
      timeSlot: '1:10 PM – 2:05 PM',
      durationSlots: 1,
      type: 'Theory',
      subjectCode: 'BCA-305',
      subject: 'Software Engineering Methodologies',
      teacher: 'Mr. Abhishek Thapa',
      room: 'CR2',
      status: 'SoftWarning',
      isSimulated: true
    };

    this.timetable.unshift(confRoom1, confRoom2, confTch1, confTch2, softWorkload, softLunch);
    this.saveStorage('timetable', this.timetable);
    return { confRoom1, confRoom2, confTch1, confTch2, softWorkload, softLunch };
  }

  async resetConflictDemo() {
    await this.initData();
    this.timetable = this.timetable.filter(s => !s.id.startsWith('SIM-CONF-'));
    this.saveStorage('timetable', this.timetable);
    return true;
  }

  async clearTimetable() {
    await this.initData();
    this.timetable = [];
    this.saveStorage('timetable', this.timetable);
  }

  async commitGeneratedSchedule(newSessions, scopeInfo = {}) {
    await this.initData();
    if (!newSessions || newSessions.length === 0) return false;

    // Target sections in the generated batch
    const targetSectionNames = [...new Set(newSessions.map(s => s.section))];
    
    // Remove previous sessions for those sections to prevent duplicate stacking
    this.timetable = this.timetable.filter(s => !targetSectionNames.includes(s.section));
    
    // Append newly generated schedule entries
    this.timetable.push(...newSessions);
    this.saveStorage('timetable', this.timetable);

    // Record new Version in Version History
    const versionRecord = {
      id: `VER-${Date.now()}`,
      versionNumber: `v${(this.versions.length + 1)}.0`,
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      title: `${scopeInfo.courseCode || 'All'} Sem ${scopeInfo.semester || '1'} Master Schedule`,
      scopeDescription: scopeInfo.sectionChoice === 'ALL' ? `All ${scopeInfo.sectionsCount || targetSectionNames.length} Sections` : targetSectionNames.join(', '),
      sessionsCount: this.timetable.length,
      author: 'Constraint Engine (AI Solver)',
      status: 'Active Published',
      notes: `Automated schedule generation with ${newSessions.length} sessions committed.`,
      timetableSnapshot: JSON.parse(JSON.stringify(this.timetable))
    };

    // Mark previous active versions as Archived
    this.versions.forEach(v => {
      if (v.status === 'Active Published') v.status = 'Archived';
    });

    this.versions.unshift(versionRecord);
    this.saveStorage('versions', this.versions);

    // Add notification
    this.notifications.unshift({
      id: `NOTIF-${Date.now()}`,
      title: 'Academic Timetable Published',
      message: `Generated schedule for ${scopeInfo.courseCode} (${targetSectionNames.join(', ')}) with ${newSessions.length} sessions committed to master database.`,
      timestamp: 'Just now',
      status: 'Unread',
      type: 'success'
    });
    this.saveStorage('notifications', this.notifications);

    return versionRecord;
  }

  async getVersions() {
    await this.initData();
    return [...this.versions];
  }

  async getVersionById(id) {
    await this.initData();
    return this.versions.find(v => v.id === id) || null;
  }

  async saveVersionSnapshot(customData = {}) {
    await this.initData();
    const versionNum = customData.versionNumber || `v1.${this.versions.length}`;
    const newVersion = {
      id: `VER-${Date.now()}`,
      versionNumber: versionNum,
      title: customData.title || `Snapshot Revision ${versionNum}`,
      scopeDescription: customData.scopeDescription || 'Full Academic Timetable (Graphic Era Grid)',
      timestamp: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      sessionsCount: this.timetable.length,
      author: customData.author || 'Academic Coordinator',
      status: 'Active Published',
      notes: customData.notes || 'Manual snapshot saved by academic administrator',
      timetableSnapshot: JSON.parse(JSON.stringify(this.timetable))
    };

    // Mark previous active versions as Archived
    this.versions.forEach(v => {
      if (v.status === 'Active Published') v.status = 'Archived';
    });

    this.versions.unshift(newVersion);
    this.saveStorage('versions', this.versions);

    // Create notification
    this.notifications.unshift({
      id: `NOTIF-${Date.now()}`,
      title: `Snapshot ${newVersion.versionNumber} Created`,
      message: `Timetable snapshot "${newVersion.title}" recorded with ${newVersion.sessionsCount} sessions.`,
      timestamp: 'Just now',
      status: 'Unread',
      type: 'success'
    });
    this.saveStorage('notifications', this.notifications);

    return newVersion;
  }

  async revertToVersion(versionId) {
    await this.initData();
    const version = this.versions.find(v => v.id === versionId);
    if (!version || !version.timetableSnapshot || version.timetableSnapshot.length === 0) {
      return { success: false, message: 'Version snapshot data not found' };
    }

    // Restore master timetable
    this.timetable = JSON.parse(JSON.stringify(version.timetableSnapshot));
    this.saveStorage('timetable', this.timetable);

    // Update statuses
    this.versions.forEach(v => {
      v.status = (v.id === versionId) ? 'Active Published' : 'Archived';
    });
    this.saveStorage('versions', this.versions);

    // Add notification
    this.notifications.unshift({
      id: `NOTIF-${Date.now()}`,
      title: `Timetable Reverted to ${version.versionNumber}`,
      message: `Master timetable schedule successfully restored to snapshot "${version.title}" (${version.sessionsCount} sessions).`,
      timestamp: 'Just now',
      status: 'Unread',
      type: 'warning'
    });
    this.saveStorage('notifications', this.notifications);

    return { success: true, version };
  }

  async deleteVersion(versionId) {
    await this.initData();
    this.versions = this.versions.filter(v => v.id !== versionId);
    this.saveStorage('versions', this.versions);
    return true;
  }

  async exportTimetableToCSV(filterScope = {}) {
    await this.initData();
    let sessions = [...this.timetable];
    
    if (filterScope.section && filterScope.section !== 'ALL') {
      sessions = sessions.filter(s => s.section === filterScope.section);
    }
    if (filterScope.teacher && filterScope.teacher !== 'ALL') {
      sessions = sessions.filter(s => s.teacher && s.teacher.toLowerCase().includes(filterScope.teacher.toLowerCase()));
    }
    if (filterScope.course && filterScope.course !== 'ALL') {
      sessions = sessions.filter(s => s.course === filterScope.course);
    }
    if (filterScope.room && filterScope.room !== 'ALL') {
      sessions = sessions.filter(s => s.room === filterScope.room);
    }

    const dayOrder = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 };
    sessions.sort((a, b) => {
      if ((dayOrder[a.day] || 99) !== (dayOrder[b.day] || 99)) {
        return (dayOrder[a.day] || 99) - (dayOrder[b.day] || 99);
      }
      return Number(a.periodIndex) - Number(b.periodIndex);
    });

    const headers = [
      'Day',
      'Period',
      'Time Slot',
      'Course',
      'Semester',
      'Section',
      'Subject Code',
      'Subject Title',
      'Type',
      'Faculty / Teacher',
      'Room / Lab Location',
      'Duration (Periods)'
    ];

    const escapeCSV = (str) => {
      if (str === null || str === undefined) return '""';
      const s = String(str).replace(/"/g, '""');
      return `"${s}"`;
    };

    const rows = sessions.map(s => [
      escapeCSV(s.day),
      escapeCSV(`P${Number(s.periodIndex) + 1}`),
      escapeCSV(s.timeSlot),
      escapeCSV(s.course || 'BCA/MCA'),
      escapeCSV(s.semester || '3'),
      escapeCSV(s.section),
      escapeCSV(s.subjectCode),
      escapeCSV(s.subject),
      escapeCSV(s.type || 'Theory'),
      escapeCSV(s.teacher),
      escapeCSV(s.room),
      escapeCSV(s.durationSlots || 1)
    ].join(','));

    // UTF-8 BOM \uFEFF enables clean opening in Microsoft Excel without character encoding issues
    return '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  }

  // --- Notification Engine ---
  async getNotifications() {
    await this.initData();
    return [...this.notifications];
  }

  async markNotificationAsRead(id) {
    await this.initData();
    const notif = this.notifications.find(n => n.id === id);
    if (notif) {
      notif.status = 'Read';
      this.saveStorage('notifications', this.notifications);
      return notif;
    }
    return null;
  }

  async markAllNotificationsAsRead() {
    await this.initData();
    this.notifications.forEach(n => { n.status = 'Read'; });
    this.saveStorage('notifications', this.notifications);
    return true;
  }

  async clearAllNotifications() {
    await this.initData();
    this.notifications = [];
    this.saveStorage('notifications', this.notifications);
    return true;
  }

  async getConflicts() {
    await this.initData();
    return [...this.conflicts];
  }

  // --- Phase 6: Faculty & Student Operational Workflows ---

  async getSubstitutions() {
    await this.initData();
    return [...this.substitutions];
  }

  async createSubstitution(reqData) {
    await this.initData();
    const newReq = {
      id: `SUB-${Date.now()}`,
      sessionId: reqData.sessionId,
      requestingTeacher: reqData.requestingTeacher,
      coveringTeacher: reqData.coveringTeacher,
      section: reqData.section,
      subjectCode: reqData.subjectCode,
      subject: reqData.subject,
      day: reqData.day,
      periodIndex: reqData.periodIndex,
      timeSlot: reqData.timeSlot,
      room: reqData.room,
      reason: reqData.reason || 'Personal Leave',
      notes: reqData.notes || 'Please cover scheduled syllabus',
      date: reqData.date || new Date().toISOString().split('T')[0],
      status: 'Coverage Requested',
      createdAt: new Date().toISOString()
    };

    this.substitutions.unshift(newReq);
    this.saveStorage('substitutions', this.substitutions);

    // Add notification
    this.notifications.unshift({
      id: `NOTIF-${Date.now()}`,
      title: 'Class Substitution Requested',
      message: `${reqData.requestingTeacher} requested ${reqData.coveringTeacher} to cover ${reqData.subjectCode} (${reqData.section}) on ${reqData.day} (${reqData.timeSlot}).`,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Unread',
      type: 'info'
    });
    this.saveStorage('notifications', this.notifications);

    return newReq;
  }

  async updateSubstitutionStatus(id, newStatus) {
    await this.initData();
    const index = this.substitutions.findIndex(s => s.id === id);
    if (index !== -1) {
      this.substitutions[index].status = newStatus;
      this.saveStorage('substitutions', this.substitutions);
      return this.substitutions[index];
    }
    return null;
  }

  async getTodaySessionsForTeacher(teacherName, targetDay = null) {
    await this.initData();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = targetDay || days[new Date().getDay()];
    // Default to Monday if on weekend
    const activeDay = (currentDay === 'Sunday' || currentDay === 'Saturday') ? 'Monday' : currentDay;

    const tLower = (teacherName || '').toLowerCase().trim();
    const nameTokens = tLower.replace(/^(dr\.|mr\.|mrs\.|ms\.)\s*/, '').split(/\s+/).filter(t => t.length > 2);

    const teacherSessions = this.timetable.filter(s => {
      if (!s.teacher) return false;
      const sLower = s.teacher.toLowerCase();
      if (sLower.includes(tLower)) return true;
      if (nameTokens.some(tok => sLower.includes(tok))) return true;
      return false;
    }).filter(s => s.day.toLowerCase() === activeDay.toLowerCase())
      .sort((a, b) => Number(a.periodIndex) - Number(b.periodIndex));

    // Next class calculation
    let nextClass = null;
    let nextClassMessage = 'No further lectures scheduled for today.';
    let minutesUntilNext = null;

    if (teacherSessions.length > 0) {
      // Find the upcoming session
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentTotalMins = currentHours * 60 + currentMinutes;

      // Period start times mapped to minutes from midnight
      const periodStartMins = [
        480,  // P1: 08:00 AM
        535,  // P2: 08:55 AM
        610,  // P3: 10:10 AM
        665,  // P4: 11:05 AM
        720,  // P5: 12:00 PM
        790,  // P6: 01:10 PM
        845,  // P7: 02:05 PM
        910,  // P8: 03:10 PM
        965,  // P9: 04:05 PM
        1020  // P10: 05:00 PM
      ];

      for (const sess of teacherSessions) {
        const pMins = periodStartMins[sess.periodIndex] || 480;
        if (pMins >= currentTotalMins) {
          nextClass = sess;
          minutesUntilNext = pMins - currentTotalMins;
          break;
        }
      }

      if (!nextClass) {
        nextClass = teacherSessions[0]; // Next active class (e.g. tomorrow or upcoming)
        minutesUntilNext = 35; // Demo baseline
      }

      nextClassMessage = `Next class in ${minutesUntilNext || 35} mins at ${nextClass.room} for ${nextClass.section}`;
    }

    return {
      activeDay,
      sessions: teacherSessions,
      nextClass,
      nextClassMessage,
      minutesUntilNext: minutesUntilNext || 35
    };
  }

  async getTodaySessionsForSection(sectionName, targetDay = null) {
    await this.initData();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = targetDay || days[new Date().getDay()];
    const activeDay = (currentDay === 'Sunday' || currentDay === 'Saturday') ? 'Monday' : currentDay;

    const sectionSessions = this.timetable.filter(s => 
      s.section && s.section.toLowerCase() === sectionName.toLowerCase() &&
      s.day.toLowerCase() === activeDay.toLowerCase()
    ).sort((a, b) => Number(a.periodIndex) - Number(b.periodIndex));

    return {
      activeDay,
      sessions: sectionSessions
    };
  }

  async generateICalendar(sectionName) {
    await this.initData();
    const sessions = this.timetable.filter(s => s.section && s.section.toLowerCase() === sectionName.toLowerCase());

    const now = new Date();
    const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const dayMap = {
      'Monday': { byDay: 'MO', dayOffset: 0 },
      'Tuesday': { byDay: 'TU', dayOffset: 1 },
      'Wednesday': { byDay: 'WE', dayOffset: 2 },
      'Thursday': { byDay: 'TH', dayOffset: 3 },
      'Friday': { byDay: 'FR', dayOffset: 4 },
      'Saturday': { byDay: 'SA', dayOffset: 5 }
    };

    const periodTimes = [
      { start: '080000', end: '085500' }, // P1
      { start: '085500', end: '095000' }, // P2
      { start: '101000', end: '110500' }, // P3
      { start: '110500', end: '120000' }, // P4
      { start: '120000', end: '125500' }, // P5
      { start: '131000', end: '140500' }, // P6
      { start: '140500', end: '150000' }, // P7
      { start: '151000', end: '160500' }, // P8
      { start: '160500', end: '170000' }, // P9
      { start: '170000', end: '175500' }  // P10
    ];

    // Reference Monday: Oct 19, 2026
    const baseMonday = new Date(2026, 9, 19);

    const eventBlocks = [];
    sessions.forEach(sess => {
      const dayInfo = dayMap[sess.day] || { byDay: 'MO', dayOffset: 0 };
      const pIdx = Number(sess.periodIndex) || 0;
      const dur = Number(sess.durationSlots) || 1;
      
      const pTime = periodTimes[pIdx] || { start: '080000', end: '085500' };
      const endPTime = dur === 2 && periodTimes[pIdx + 1] ? periodTimes[pIdx + 1] : pTime;

      const eventDate = new Date(baseMonday);
      eventDate.setDate(baseMonday.getDate() + dayInfo.dayOffset);
      const yyyy = eventDate.getFullYear();
      const mm = String(eventDate.getMonth() + 1).padStart(2, '0');
      const dd = String(eventDate.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}${mm}${dd}`;

      const dtStart = `${dateStr}T${pTime.start}`;
      const dtEnd = `${dateStr}T${endPTime.end}`;

      eventBlocks.push(`BEGIN:VEVENT
UID:${sess.id}@smartsync.gehu.ac.in
DTSTAMP:${dtstamp}
DTSTART;TZID=Asia/Kolkata:${dtStart}
DTEND;TZID=Asia/Kolkata:${dtEnd}
RRULE:FREQ=WEEKLY;BYDAY=${dayInfo.byDay};UNTIL=20261231T235959Z
SUMMARY:${sess.subjectCode} - ${sess.subject}
LOCATION:${sess.room} (Campus Academic Block)
DESCRIPTION:Course: ${sess.course}\\nSection: ${sess.section}\\nFaculty: ${sess.teacher}\\nRoom: ${sess.room}\\nType: ${sess.type}
STATUS:CONFIRMED
END:VEVENT`);
    });

    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SmartSync College Timetable//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:SmartSync - ${sectionName} Timetable
X-WR-TIMEZONE:Asia/Kolkata
${eventBlocks.join('\n')}
END:VCALENDAR`;
  }
}


window.dataService = new SmartDataService();
