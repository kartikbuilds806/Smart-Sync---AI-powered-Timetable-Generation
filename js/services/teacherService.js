/**
 * Teacher Service
 * Simulates REST API endpoints for Faculty members
 */
const teacherService = {
  async getTeachers() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.teachers]), 50));
  },
  async getTeacherById(id) {
    return new Promise(resolve => {
      const teacher = window.SMARTSYNC_DATA.teachers.find(t => t.id === id);
      setTimeout(() => resolve(teacher || null), 50);
    });
  }
};

window.teacherService = teacherService;
