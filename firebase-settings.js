// Firebase Settings Loader
// This file loads affiliate links and settings from Firebase Cloud
// Use this in all pages to get shared settings

// Firebase Configuration - NEW PROJECT
const firebaseConfig = {
  apiKey: "AIzaSyA5hqbHcuPuev9MwmJn0ZpdYppxyljCN-E",
  authDomain: "elite-docs-admin-28310.firebaseapp.com",
  projectId: "elite-docs-admin-28310",
  storageBucket: "elite-docs-admin-28310.firebasestorage.app",
  messagingSenderId: "605421627453",
  appId: "1:605421627453:web:f4a3c58f47baf3e6f7a254"
};

// Initialize Firebase
let app, db;
try {
  app = firebase.initializeApp(firebaseConfig);
  db = firebase.firestore(app);
  console.log('Firebase settings loader connected');
} catch(e) {
  console.log('Firebase init error in settings:', e);
}

// Global settings object
let appSettings = {
  affiliate: {
    pdf: '',
    image: '',
    business: '',
    general: ''
  },
  analytics: '',
  showAds: 'no'
};

// Load settings from Firebase
function loadAppSettings() {
  return new Promise((resolve, reject) => {
    if (db) {
      db.collection('settings').doc('appSettings').get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            appSettings = {
              affiliate: data.affiliate || appSettings.affiliate,
              analytics: data.analytics || '',
              showAds: data.showAds || 'no'
            };
            console.log('Settings loaded from cloud:', appSettings);
          } else {
            console.log('No cloud settings found, using defaults');
          }
          
          // Also check localStorage as fallback
          const localAffiliate = JSON.parse(localStorage.getItem('eds-affiliate') || '{}');
          if (localAffiliate.pdf || localAffiliate.image) {
            appSettings.affiliate = { ...appSettings.affiliate, ...localAffiliate };
          }
          
          resolve(appSettings);
        })
        .catch(err => {
          console.log('Error loading cloud settings:', err);
          // Load from localStorage as fallback
          loadFromLocalStorage();
          resolve(appSettings);
        });
    } else {
      loadFromLocalStorage();
      resolve(appSettings);
    }
  });
}

function loadFromLocalStorage() {
  const localAffiliate = JSON.parse(localStorage.getItem('eds-affiliate') || '{}');
  if (localAffiliate.pdf || localAffiliate.image) {
    appSettings.affiliate = localAffiliate;
  }
  appSettings.analytics = localStorage.getItem('eds-analytics') || '';
  appSettings.showAds = localStorage.getItem('eds-show-ads') || 'no';
}

// Get affiliate link by category
function getAffiliateLink(category) {
  return appSettings.affiliate[category] || '';
}

// Get analytics ID
function getAnalyticsId() {
  return appSettings.analytics;
}

// Check if ads should be shown
function shouldShowAds() {
  return appSettings.showAds === 'yes';
}

// Auto-load settings when this file is included
if (typeof window !== 'undefined') {
  loadAppSettings();
}
