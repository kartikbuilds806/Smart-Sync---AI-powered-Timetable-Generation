/**
 * Room Service
 * Simulates REST API endpoints for Rooms & Labs
 */
const roomService = {
  async getRooms() {
    return new Promise(resolve => setTimeout(() => resolve([...window.SMARTSYNC_DATA.rooms]), 50));
  },
  async getRoomById(id) {
    return new Promise(resolve => {
      const room = window.SMARTSYNC_DATA.rooms.find(r => r.id === id);
      setTimeout(() => resolve(room || null), 50);
    });
  }
};

window.roomService = roomService;
