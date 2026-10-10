/**
 * SmartSync Navigation & Role Management Module
 */

document.addEventListener('DOMContentLoaded', () => {
  initRoleSwitcher();
  initSidebarToggle();
});

function initRoleSwitcher() {
  const roleSelect = document.getElementById('global-role-switcher');
  if (!roleSelect) return;

  // Read current saved role or default to admin
  const currentRole = localStorage.getItem('smartsync_active_role') || 'admin';
  roleSelect.value = currentRole;

  roleSelect.addEventListener('change', (e) => {
    const selectedRole = e.target.value;
    localStorage.setItem('smartsync_active_role', selectedRole);
    
    SmartUtils.showToast(`Switched active profile to ${selectedRole.toUpperCase()} mode`, 'info');
    
    // Dispatch global role change event for views to re-render
    const event = new CustomEvent('smartRoleChange', { detail: { role: selectedRole } });
    window.dispatchEvent(event);
  });
}

function initSidebarToggle() {
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebar = document.querySelector('.app-sidebar');
  
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }

  // Close sidebar on link click (mobile)
  document.querySelectorAll('.app-sidebar .nav-item').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && sidebar) {
        sidebar.classList.remove('show');
      }
    });
  });
}

window.SmartNavigation = {
  getActiveRole() {
    return localStorage.getItem('smartsync_active_role') || 'admin';
  }
};
