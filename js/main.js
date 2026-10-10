/**
 * SmartSync Main Application Controller & Dynamic Router
 */

// Global Router Function attached to Window (Async to support dataService calls)
window.loadView = async function(viewName, clickedElement = null) {
  const activeRole = window.SmartNavigation ? window.SmartNavigation.getActiveRole() : (localStorage.getItem('smartsync_active_role') || 'admin');
  const mainContent = document.getElementById('main-app-content') || document.querySelector('.app-content');
  
  if (!mainContent) {
    console.error('❌ Could not find main application content container');
    return;
  }

  // Update Sidebar active styling
  document.querySelectorAll('#sidebar-nav-list .nav-item').forEach(el => el.classList.remove('active'));
  if (clickedElement && clickedElement.classList) {
    clickedElement.classList.add('active');
  }

  let html = '';
  switch (viewName) {
    case 'dashboard':
      if (activeRole === 'teacher') {
        html = await SmartViews.renderTeacherDashboard();
      } else if (activeRole === 'student') {
        html = await SmartViews.renderStudentDashboard();
      } else {
        html = await SmartViews.renderDashboard('admin');
      }
      break;
    case 'my-timetable':
      if (activeRole === 'teacher') {
        html = await SmartViews.renderTeacherSchedule();
      } else if (activeRole === 'student') {
        html = await SmartViews.renderStudentTimetable();
      } else {
        html = await SmartViews.renderDashboard('admin');
      }
      break;
    case 'courses':
      html = await SmartViews.renderCoursesView(activeRole);
      break;
    case 'sections':
      html = await SmartViews.renderSectionsView(activeRole);
      break;
    case 'subjects':
      html = await SmartViews.renderSubjectsView(activeRole);
      break;
    case 'teachers':
      html = await SmartViews.renderTeachersList(activeRole);
      break;
    case 'students':
      html = await SmartViews.renderStudentsList(activeRole);
      break;
    case 'rooms':
      html = await SmartViews.renderRoomsView(activeRole);
      break;
    case 'generator':
      html = await SmartViews.renderGeneratorView(activeRole);
      break;
    case 'conflicts':
      html = await SmartViews.renderConflictsView(activeRole);
      break;
    case 'versions':
      html = await SmartViews.renderVersionsView(activeRole);
      break;
    case 'profile':
      html = await SmartViews.renderProfile(activeRole);
      break;
    default:
      if (activeRole === 'teacher') {
        html = await SmartViews.renderTeacherDashboard();
      } else if (activeRole === 'student') {
        html = await SmartViews.renderStudentDashboard();
      } else {
        html = await SmartViews.renderDashboard('admin');
      }
  }

  mainContent.innerHTML = html;
  
  // Re-initialize Lucide Icons for injected DOM elements
  if (window.lucide) {
    lucide.createIcons();
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('⚡ SmartSync Main Router Ready');

  if (window.lucide) {
    lucide.createIcons();
  }

  // Listen for role switcher events
  window.addEventListener('smartRoleChange', (e) => {
    renderRoleSpecificView(e.detail.role);
  });

  // Initial render based on stored active role
  const activeRole = window.SmartNavigation ? window.SmartNavigation.getActiveRole() : (localStorage.getItem('smartsync_active_role') || 'admin');
  renderRoleSpecificView(activeRole);
});

async function renderRoleSpecificView(role) {
  const data = window.SMARTSYNC_DATA || {};
  const user = (data.users && data.users[role]) ? data.users[role] : { name: role === 'admin' ? 'Academic Administrator' : role === 'teacher' ? 'Dr. Bhawnesh Kumar' : 'Student', role: role, department: 'Computer Applications', avatarLetter: role.charAt(0).toUpperCase() };

  // Update Topbar User Profile Elements
  const userNameElem = document.getElementById('topbar-user-name');
  const userRoleElem = document.getElementById('topbar-user-role');
  const userAvatarElem = document.getElementById('topbar-user-avatar');

  if (userNameElem) userNameElem.textContent = user.name;
  if (userRoleElem) userRoleElem.textContent = `${user.role.toUpperCase()} • ${user.department}`;
  if (userAvatarElem) userAvatarElem.textContent = user.avatarLetter;

  // Render role-specific navigation menu items in sidebar
  renderSidebarNav(role);

  // Load default view for active role
  await window.loadView('dashboard');
}

function renderSidebarNav(role) {
  const navContainer = document.getElementById('sidebar-nav-list');
  if (!navContainer) return;

  let navHTML = '';

  if (role === 'admin') {
    navHTML = `
      <div class="nav-section-title">Academic & Programs</div>
      <a href="#" class="nav-item active" onclick="window.loadView('dashboard', this); return false;"><i data-lucide="layout-dashboard" class="nav-icon"></i> Dashboard</a>
      <a href="#" class="nav-item" onclick="window.loadView('courses', this); return false;"><i data-lucide="book-open" class="nav-icon"></i> Courses</a>
      <a href="#" class="nav-item" onclick="window.loadView('sections', this); return false;"><i data-lucide="users" class="nav-icon"></i> Sections</a>
      <a href="#" class="nav-item" onclick="window.loadView('subjects', this); return false;"><i data-lucide="grid" class="nav-icon"></i> Subjects</a>

      <div class="nav-section-title">Resources & Roster</div>
      <a href="#" class="nav-item" onclick="window.loadView('teachers', this); return false;"><i data-lucide="graduation-cap" class="nav-icon"></i> Faculty Roster</a>
      <a href="#" class="nav-item" onclick="window.loadView('students', this); return false;"><i data-lucide="id-card" class="nav-icon"></i> Student Registry</a>
      <a href="#" class="nav-item" onclick="window.loadView('rooms', this); return false;"><i data-lucide="building-2" class="nav-icon"></i> Rooms & Labs</a>

      <div class="nav-section-title">Scheduling Engine</div>
      <a href="#" class="nav-item" onclick="window.loadView('generator', this); return false;"><i data-lucide="wand-2" class="nav-icon"></i> Generate Timetable</a>
      <a href="#" class="nav-item" onclick="window.loadView('conflicts', this); return false;"><i data-lucide="alert-circle" class="nav-icon"></i> Conflicts</a>
      <a href="#" class="nav-item" onclick="window.loadView('versions', this); return false;"><i data-lucide="history" class="nav-icon"></i> Version History</a>
      <a href="#" class="nav-item" onclick="window.loadView('profile', this); return false;"><i data-lucide="user" class="nav-icon"></i> My Profile</a>
    `;
  } else if (role === 'teacher') {
    navHTML = `
      <div class="nav-section-title">Faculty Portal</div>
      <a href="#" class="nav-item active" onclick="window.loadView('dashboard', this); return false;"><i data-lucide="layout-dashboard" class="nav-icon"></i> Dashboard</a>
      <a href="#" class="nav-item" onclick="window.loadView('my-timetable', this); return false;"><i data-lucide="calendar-days" class="nav-icon"></i> My Schedule</a>
      <a href="#" class="nav-item" onclick="window.loadView('profile', this); return false;"><i data-lucide="user" class="nav-icon"></i> My Profile (teacher@geu.ac.in)</a>
    `;
  } else if (role === 'student') {
    navHTML = `
      <div class="nav-section-title">Student Portal</div>
      <a href="#" class="nav-item active" onclick="window.loadView('dashboard', this); return false;"><i data-lucide="layout-dashboard" class="nav-icon"></i> Dashboard</a>
      <a href="#" class="nav-item" onclick="window.loadView('my-timetable', this); return false;"><i data-lucide="calendar-days" class="nav-icon"></i> Section Timetable</a>
      <a href="#" class="nav-item" onclick="window.loadView('profile', this); return false;"><i data-lucide="id-card" class="nav-icon"></i> My Profile</a>
    `;
  }

  navContainer.innerHTML = navHTML;
  if (window.lucide) lucide.createIcons();
}
