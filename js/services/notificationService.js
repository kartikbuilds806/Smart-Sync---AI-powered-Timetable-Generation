/**
 * Notification Service
 * Simulates REST API endpoints for Notifications
 */
const notificationService = {
  async getNotifications() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.notifications]), 50));
  },
  async markAsRead(id) {
    return new Promise(resolve => {
      const item = window.SMARTSYNC_DATA.notifications.find(n => n.id === id);
      if (item) item.status = "Read";
      setTimeout(() => resolve(true), 50);
    });
  }
};

window.notificationService = notificationService;
