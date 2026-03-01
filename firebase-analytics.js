// =====================
// FIREBASE & ANALYTICS SETUP
// Elite Document Suite
// =====================

// Firebase Configuration - NEW PROJECT
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA5hqbHcuPuev9MwmJn0ZpdYppxyljCN-E",
  authDomain: "elite-docs-admin-28310.firebaseapp.com",
  projectId: "elite-docs-admin-28310",
  storageBucket: "elite-docs-admin-28310.firebasestorage.app",
  messagingSenderId: "605421627453",
  appId: "1:605421627453:web:f4a3c58f47baf3e6f7a254"
};

// Global Firebase variables
let app, db, auth, analytics;

// Initialize Firebase
function initFirebase() {
  if (typeof firebase === 'undefined') {
    console.log('Firebase SDK not loaded');
    return false;
  }
  
  try {
    app = firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore(app);
    auth = firebase.auth(app);
    
    // Enable offline persistence
    db.enablePersistence({ synchronizeTabs: true })
      .catch(err => console.log('Persistence error:', err));
    
    console.log('Firebase initialized successfully');
    return true;
  } catch (err) {
    console.log('Firebase init error:', err);
    return false;
  }
}

// Track Tool Usage
function trackToolUsage(toolName, category) {
  if (!db) return;
  
  db.collection('tool_usage').add({
    toolName: toolName,
    category: category,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    userId: 'anonymous',
    success: true,
    page: window.location.pathname
  }).catch(err => console.log('Track error:', err));
}

// Track Page View
function trackPageView(pageName) {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
}

// Submit Feedback to Firestore
function submitFeedback(name, email, subject, message) {
  if (!db) return Promise.reject('Firebase not initialized');
  
  return db.collection('feedback').add({
    name: name,
    email: email,
    subject: subject,
    message: message,
    status: 'pending',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Get Settings from Firestore
async function getSettings() {
  if (!db) return null;
  
  try {
    const doc = await db.collection('settings').doc('affiliate').get();
    return doc.exists ? doc.data() : null;
  } catch (err) {
    console.log('Get settings error:', err);
    return null;
  }
}

// Check if user is admin
async function checkAdminStatus() {
  if (!auth || !db) return false;
  
  const user = auth.currentUser;
  if (!user) return false;
  
  try {
    const doc = await db.collection('admins').doc(user.uid).get();
    return doc.exists && doc.data().role === 'admin';
  } catch (err) {
    return false;
  }
}

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebase);
} else {
  initFirebase();
}

// Track page views on navigation
const originalPushState = history.pushState;
history.pushState = function() {
  originalPushState.apply(this, arguments);
  trackPageView(document.title);
};

window.addEventListener('popstate', function() {
  trackPageView(document.title);
});

// Track tool button clicks
document.addEventListener('click', function(e) {
  const toolBtn = e.target.closest('[data-tool]');
  if (toolBtn) {
    const toolName = toolBtn.getAttribute('data-tool');
    const category = toolBtn.closest('[data-category]')?.getAttribute('data-category') || 'general';
    trackToolUsage(toolName, category);
  }
});

console.log('Firebase Analytics Module Loaded');
