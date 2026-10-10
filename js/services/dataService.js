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
    this.timetable = this.getOrStorage('timetable', []);
    this.conflicts = this.getOrStorage('conflicts', []);
    this.notifications = this.getOrStorage('notifications', []);
    this.versions = this.getOrStorage('versions', []);
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

  async addCourse(course) {
    await this.initData();
    course.id = `CRS-${course.code.toUpperCase()}`;
    this.courses.push(course);
    this.saveStorage('courses', this.courses);
    return course;
  }

  // --- Sections ---
  async getSections() {
    await this.initData();
    return [...this.sections];
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
    section.id = `SEC-${Date.now()}`;
    this.sections.push(section);
    this.saveStorage('sections', this.sections);
    return section;
  }

  // --- Teachers ---
  async getTeachers() {
    await this.initData();
    return [...this.teachers];
  }

  async addTeacher(teacher) {
    await this.initData();
    teacher.id = `TCH-${Date.now()}`;
    this.teachers.push(teacher);
    this.saveStorage('teachers', this.teachers);
    return teacher;
  }

  // --- Students ---
  async getStudents() {
    await this.initData();
    return [...this.students];
  }

  async addStudent(student) {
    await this.initData();
    student.id = `STD-${Date.now()}`;
    this.students.push(student);
    this.saveStorage('students', this.students);
    return student;
  }

  // --- Rooms ---
  async getRooms() {
    await this.initData();
    return [...this.rooms];
  }

  async addRoom(room) {
    await this.initData();
    room.id = `RM-${Date.now()}`;
    this.rooms.push(room);
    this.saveStorage('rooms', this.rooms);
    return room;
  }

  // --- Subjects ---
  async getSubjects() {
    await this.initData();
    return [...this.subjects];
  }

  async addSubject(subject) {
    await this.initData();
    subject.id = `SUB-${subject.code.toUpperCase()}`;
    this.subjects.push(subject);
    this.saveStorage('subjects', this.subjects);
    return subject;
  }

  // --- Timetable & Engine ---
  async getTimetable() {
    await this.initData();
    return [...this.timetable];
  }

  async clearTimetable() {
    await this.initData();
    this.timetable = [];
    this.saveStorage('timetable', this.timetable);
  }
}

window.dataService = new SmartDataService();
