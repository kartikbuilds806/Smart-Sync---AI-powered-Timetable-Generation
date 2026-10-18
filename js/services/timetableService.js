/**
 * Timetable Service
 * Simulates REST API endpoints for Timetables, Schedule Changes, Conflicts & Versions
 */
const timetableService = {
  async getTimetable(filter = {}) {
    if (window.dataService) {
      return window.dataService.getTimetable(filter);
    }
    return new Promise(resolve => {
      let data = window.SMARTSYNC_TIMETABLE || (window.SMARTSYNC_DATA && window.SMARTSYNC_DATA.timetable) || [];
      if (filter.day) {
        data = data.filter(item => item.day.toLowerCase() === filter.day.toLowerCase());
      }
      if (filter.section) {
        data = data.filter(item => item.section.toLowerCase() === filter.section.toLowerCase());
      }
      if (filter.teacher) {
        data = data.filter(item => item.teacher.toLowerCase().includes(filter.teacher.toLowerCase()));
      }
      if (filter.room) {
        data = data.filter(item => item.room.toLowerCase() === filter.room.toLowerCase());
      }
      setTimeout(() => resolve(data), 50);
    });
  },
  async getScheduleChanges() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.scheduleChanges]), 50));
  },
  async getConflicts() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.conflicts]), 50));
  },
  async getVersions() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.versions]), 50));
  }
};

window.timetableService = timetableService;
