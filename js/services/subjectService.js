/**
 * Subject Service
 * Simulates REST API endpoints for Subjects
 */
const subjectService = {
  async getSubjects() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.subjects]), 50));
  },
  async getSubjectById(id) {
    return new Promise(resolve => {
      const subject = window.SMARTSYNC_DATA.subjects.find(s => s.id === id);
      setTimeout(() => resolve(subject || null), 50);
    });
  }
};

window.subjectService = subjectService;
