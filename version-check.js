const APP_VERSION = '1.0.1';
const UPDATE_GRACE_DAYS = 3;

function checkForUpdate() {
  const storedVersion = localStorage.getItem('eds-app-version');
  
  if (!storedVersion) {
    localStorage.setItem('eds-app-version', APP_VERSION);
    return;
  }
  
  if (compareVersions(APP_VERSION, storedVersion) > 0) {
    const updateAvailableDate = localStorage.getItem('eds-update-available-date');
    
    if (!updateAvailableDate) {
      localStorage.setItem('eds-update-available-date', new Date().toISOString());
      showUpdateNotification();
    } else {
      const daysSinceUpdate = Math.floor((Date.now() - new Date(updateAvailableDate).getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceUpdate >= UPDATE_GRACE_DAYS) {
        showUpdateBlocked();
      } else if (daysSinceUpdate >= 1) {
        showUpdateReminder(UPDATE_GRACE_DAYS - daysSinceUpdate);
      }
    }
  } else {
    localStorage.setItem('eds-app-version', APP_VERSION);
    localStorage.removeItem('eds-update-available-date');
  }
}

function compareVersions(v1, v2) {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

function showUpdateNotification() {
  const existing = document.getElementById('update-notification');
  if (existing) return;
  
  const notif = document.createElement('div');
  notif.id = 'update-notification';
  notif.innerHTML = `
    <div style="position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#6366f1,#818cf8);color:white;padding:16px 20px;z-index:99999;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 20px rgba(99,102,241,0.4);">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:24px;">⚠️</span>
        <div>
          <strong>New Update Available!</strong>
          <p style="font-size:12px;opacity:0.9;margin:0;">Version 1.0.1 is ready. Update within 3 days.</p>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="location.reload()" style="padding:8px 16px;border:none;border-radius:8px;background:rgba(255,255,255,0.2);color:white;cursor:pointer;font-weight:600;">Update Now</button>
        <button onclick="this.parentElement.parentElement.remove()" style="padding:8px 12px;border:none;border-radius:8px;background:rgba(255,255,255,0.1);color:white;cursor:pointer;">✕</button>
      </div>
    </div>
  `;
  document.body.appendChild(notif);
}

function showUpdateReminder(daysLeft) {
  const existing = document.getElementById('update-notification');
  if (existing) return;
  
  const notif = document.createElement('div');
  notif.id = 'update-notification';
  notif.innerHTML = `
    <div style="position:fixed;top:0;left:0;right:0;background:linear-gradient(135deg,#f59e0b,#fbbf24);color:#1e293b;padding:16px 20px;z-index:99999;display:flex;align-items:center;justify-content:space-between;box-shadow:0 4px 20px rgba(245,158,11,0.4);">
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:24px;">⏰</span>
        <div>
          <strong>Update Required!</strong>
          <p style="font-size:12px;margin:0;opacity:0.8;">${daysLeft} day(s) left to update.</p>
        </div>
      </div>
      <div style="display:flex;gap:8px;">
        <button onclick="location.reload()" style="padding:8px 16px;border:none;border-radius:8px;background:#1e293b;color:white;cursor:pointer;font-weight:600;">Update Now</button>
        <button onclick="this.parentElement.parentElement.remove()" style="padding:8px 12px;border:none;border-radius:8px;rgba(0,0,0,0.1);color:#1e293b;cursor:pointer;">✕</button>
      </div>
    </div>
  `;
  document.body.appendChild(notif);
}

function showUpdateBlocked() {
  const notif = document.createElement('div');
  notif.id = 'update-notification';
  notif.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.95);color:white;z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px;">
      <span style="font-size:64px;margin-bottom:20px;">🔒</span>
      <h2 style="font-size:28px;margin-bottom:16px;">Update Required</h2>
      <p style="font-size:16px;opacity:0.7;max-width:400px;margin-bottom:30px;">Your app version is outdated. Please update to continue using Elite Document Suite.</p>
      <button onclick="location.reload()" style="padding:16px 32px;font-size:18px;border:none;border-radius:12px;background:linear-gradient(135deg,#6366f1,#818cf8);color:white;cursor:pointer;font-weight:600;">Update Now</button>
      <p style="font-size:12px;opacity:0.5;margin-top:20px;">If problem persists, clear browser cache</p>
    </div>
  `;
  document.body.appendChild(notif);
  document.body.style.overflow = 'hidden';
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(() => {
    setTimeout(checkForUpdate, 2000);
  });
} else {
  setTimeout(checkForUpdate, 2000);
}
