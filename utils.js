// Elite Document Suite - Utility Functions
// Loading states, error handling, accessibility helpers

const EDS = {
  // Show loading spinner
  showLoading: (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = `<div class="eds-loading" role="status" aria-label="Loading">
        <div class="eds-spinner"></div>
        <span>Processing...</span>
      </div>`;
    }
  },

  // Hide loading spinner
  hideLoading: (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      const loader = el.querySelector('.eds-loading');
      if (loader) loader.remove();
    }
  },

  // Show error message
  showError: (elementId, message) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = `<div class="eds-error" role="alert" aria-live="assertive">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close">&times;</button>
      </div>`;
    }
  },

  // Show success message
  showSuccess: (elementId, message) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = `<div class="eds-success" role="status" aria-live="polite">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" aria-label="Close">&times;</button>
      </div>`;
      setTimeout(() => el.querySelector('.eds-success')?.remove(), 5000);
    }
  },

  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Format file size
  formatSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Generate unique ID
  generateId: () => 'eds-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),

  // Check file type
  getFileType: (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const types = {
      pdf: ['pdf'], images: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'],
      videos: ['mp4', 'webm', 'ogg', 'avi', 'mov'], audio: ['mp3', 'wav', 'ogg', 'm4a', 'aac'],
      documents: ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt']
    };
    for (const [type, exts] of Object.entries(types)) {
      if (exts.includes(ext)) return type;
    }
    return 'unknown';
  },

  // Accessibility: Focus trap for modals
  trapFocus: (modal) => {
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape') modal.close?.();
    };
    
    modal.addEventListener('keydown', handleKeyDown);
    first?.focus();
    return () => modal.removeEventListener('keydown', handleKeyDown);
  },

  // Accessibility: Announce to screen readers
  announce: (message, priority = 'polite') => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', priority);
    el.setAttribute('aria-atomic', 'true');
    el.className = 'sr-only';
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
};

// Add CSS for loading, errors, success
const edsUtilsCSS = `
  .eds-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 20px; color: var(--text-secondary); }
  .eds-spinner { width: 24px; height: 24px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: eds-spin 1s linear infinite; }
  @keyframes eds-spin { to { transform: rotate(360deg); } }
  .eds-error, .eds-success { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border-radius: 10px; margin: 10px 0; font-size: 0.9rem; }
  .eds-error { background: rgba(239,68,68,0.15); color: #ef4444; border: 1px solid rgba(239,68,68,0.3); }
  .eds-success { background: rgba(34,197,94,0.15); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
  .eds-error button, .eds-success button { margin-left: auto; background: none; border: none; color: inherit; cursor: pointer; font-size: 1.2rem; padding: 0 4px; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = edsUtilsCSS;
  document.head.appendChild(style);
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EDS;
}
