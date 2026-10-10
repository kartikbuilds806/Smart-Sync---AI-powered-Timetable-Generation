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
  const sidebar = document.querySelector('.app-sidebar');
  let backdrop = document.getElementById('sidebar-backdrop');

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'sidebar-backdrop';
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('show');
    backdrop.classList.add('show');
    document.body.classList.add('drawer-open');
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('show');
    backdrop.classList.remove('show');
    document.body.classList.remove('drawer-open');
  }

  // Toggle buttons (both topbar and mobile header)
  document.querySelectorAll('#sidebar-toggle-btn, #topbar-sidebar-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('show')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  });

  // Close button inside sidebar header if present
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  // Backdrop tap to close
  backdrop.addEventListener('click', closeSidebar);

  // Keyboard ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('show')) {
      closeSidebar();
    }
  });

  // Event delegation to close sidebar on link click (mobile/tablet)
  const navContainer = document.getElementById('sidebar-nav-list');
  if (navContainer) {
    navContainer.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (navItem && window.innerWidth < 992) {
        closeSidebar();
      }
    });
  }
}

window.SmartNavigation = {
  getActiveRole() {
    return localStorage.getItem('smartsync_active_role') || 'admin';
  }
};
