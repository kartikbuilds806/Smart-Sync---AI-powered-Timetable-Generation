/**
 * SmartSync Core UI Utilities
 */

// Safe HTML Escape
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Global Toast Notification Helper
function showToast(message, type = 'info') {
  let container = document.getElementById('smart-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'smart-toast-container';
    container.className = 'smart-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `smart-toast toast-${type}`;
  
  const iconMap = {
    info: 'info',
    success: 'check-circle',
    warning: 'alert-triangle',
    danger: 'alert-circle'
  };

  toast.innerHTML = `
    <i data-lucide="${iconMap[type] || 'info'}" style="width: 20px; height: 20px; color: var(--${type === 'danger' ? 'danger-text' : type === 'warning' ? 'warning-text' : type === 'success' ? 'success-text' : 'primary-600'})"></i>
    <div style="flex: 1; font-size: 0.875rem; font-weight: 500; color: var(--text-primary);">${escapeHTML(message)}</div>
    <button type="button" style="background: none; border: none; cursor: pointer; color: var(--text-muted);" onclick="this.parentElement.remove()">
      <i data-lucide="x" style="width: 16px; height: 16px;"></i>
    </button>
  `;

  container.appendChild(toast);
  if (window.lucide) {
    lucide.createIcons({ props: { search: toast } });
  }

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 300ms ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Generate Semantic Badge HTML
function renderStatusBadge(status) {
  const statusLower = String(status).toLowerCase();
  let badgeClass = 'status-normal';
  let iconName = 'info';

  if (statusLower.includes('published') || statusLower.includes('success') || statusLower.includes('active')) {
    badgeClass = 'status-published';
    iconName = 'check-circle';
  } else if (statusLower.includes('changed') || statusLower.includes('warning') || statusLower.includes('draft')) {
    badgeClass = 'status-changed';
    iconName = 'alert-triangle';
  } else if (statusLower.includes('conflict') || statusLower.includes('danger') || statusLower.includes('high')) {
    badgeClass = 'status-conflict';
    iconName = 'alert-circle';
  } else if (statusLower.includes('lab')) {
    badgeClass = 'status-lab';
    iconName = 'flask-conical';
  }

  return `
    <span class="badge-pill ${badgeClass}">
      <i data-lucide="${iconName}" style="width: 12px; height: 12px;"></i>
      ${escapeHTML(status)}
    </span>
  `;
}

window.SmartUtils = {
  escapeHTML,
  showToast,
  renderStatusBadge
};
