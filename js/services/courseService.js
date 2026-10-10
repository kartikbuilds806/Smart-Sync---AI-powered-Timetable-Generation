/**
 * Course Service
 * Simulates REST API endpoints for Courses & Sections
 */
const courseService = {
  async getCourses() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.courses]), 50));
  },
  async getCourseById(id) {
    return new Promise(resolve => {
      const course = window.SMARTSYNC_DATA.courses.find(c => c.id === id);
      setTimeout(() => resolve(course || null), 50);
    });
  },
  async getSections() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.sections]), 50));
  }
};

window.courseService = courseService;
