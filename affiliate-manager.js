// AFFILIATE LINK MANAGER
let affiliateLinks = { pdf: '', image: '', business: '', general: '' };

async function loadAffiliateLinks() {
  try {
    let attempts = 0;
    while (typeof firebase === 'undefined' && attempts < 15) {
      await new Promise(r => setTimeout(r, 100));
      attempts++;
    }
    
    if (typeof firebase === 'undefined') {
      console.log('Firebase not found');
      return;
    }
    
    const app = firebase.initializeApp({
      apiKey: "AIzaSyA5hqbHcuPuev9MwmJn0ZpdYppxyljCN-E",
      authDomain: "elite-docs-admin-28310.firebaseapp.com",
      projectId: "elite-docs-admin-28310",
      storageBucket: "elite-docs-admin-28310.firebasestorage.app",
      messagingSenderId: "605421627453",
      appId: "1:605421627453:web:f4a3c58f47baf3e6f7a254"
    });
    
    const db = firebase.firestore(app);
    const doc = await db.collection('settings').doc('appSettings').get();
    
    if (doc.exists && doc.data().affiliate) {
      const a = doc.data().affiliate;
      affiliateLinks = {
        pdf: a.pdf || '',
        image: a.image || '',
        business: a.business || '',
        general: a.general || ''
      };
      console.log('✓ Links loaded:', affiliateLinks);
      
      // Show floating button if links exist
      if (affiliateLinks.pdf || affiliateLinks.image || affiliateLinks.business || affiliateLinks.general) {
        showFloatingButton();
      }
    }
  } catch(e) {
    console.log('Error loading links:', e.message);
  }
}

function getLink(category) {
  return affiliateLinks[category] || affiliateLinks.general || '';
}

function showAffiliatePopup(category = 'general') {
  const link = getLink(category);
  console.log('Showing popup for:', category, 'Link:', link);
  
  const existing = document.getElementById('aff-popup');
  if (existing) existing.remove();
  
  if (!link) {
    console.log('No link for:', category);
    return;
  }
  
  const popup = document.createElement('div');
  popup.id = 'aff-popup';
  popup.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:#1e293b;border-radius:20px;padding:32px;max-width:400px;text-align:center;">
        <div style="font-size:50px;margin-bottom:16px;">🎉</div>
        <h3 style="color:#fff;margin-bottom:12px;font-size:22px;">Processing Complete!</h3>
        <p style="color:#94a3b8;margin-bottom:24px;">Your file is ready! Check related software below.</p>
        <a href="${link}" target="_blank" style="display:block;padding:16px;background:#6366f1;color:#fff;text-decoration:none;border-radius:12px;font-weight:600;margin-bottom:12px;">
          📥 Download Related Software
        </a>
        <button onclick="closeAffPopup()" style="width:100%;padding:12px;background:transparent;border:1px solid #475569;color:#94a3b8;border-radius:12px;cursor:pointer;">
          ✕ Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

function closeAffPopup() {
  const p = document.getElementById('aff-popup');
  if (p) p.remove();
}

// Floating button
function showFloatingButton() {
  const existing = document.getElementById('aff-float-btn');
  if (existing) return;
  
  const btn = document.createElement('button');
  btn.id = 'aff-float-btn';
  btn.innerHTML = '💰 Deals';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:9999;padding:12px 20px;background:#6366f1;color:#fff;border:none;border-radius:30px;font-weight:600;cursor:pointer;box-shadow:0 4px 20px rgba(99,102,241,0.4);';
  btn.onclick = () => showAffiliatePopup('general');
  document.body.appendChild(btn);
}

loadAffiliateLinks();
console.log('Affiliate system loaded');
