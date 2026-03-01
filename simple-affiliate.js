// AFFILIATE LINKS - fetches from JSON file
let affiliateLinks = { pdf: '', image: '', video: '', business: '', general: '' };

async function loadAffiliateLinks() {
  try {
    const response = await fetch('affiliate-links.json');
    const data = await response.json();
    affiliateLinks = {
      pdf: data.pdf || '',
      image: data.image || '',
      video: data.video || '',
      business: data.business || '',
      general: data.general || ''
    };
    console.log('✓ Links loaded:', affiliateLinks);
  } catch(e) {
    console.log('Using default links');
  }
}

function getAffiliateLink(category) {
  switch(category) {
    case 'pdf': return affiliateLinks.pdf || affiliateLinks.general || '';
    case 'image': return affiliateLinks.image || affiliateLinks.general || '';
    case 'video': return affiliateLinks.video || affiliateLinks.general || '';
    case 'audio': return affiliateLinks.video || affiliateLinks.general || '';
    case 'business': return affiliateLinks.business || affiliateLinks.general || '';
    default: return affiliateLinks.general || '';
  }
}

function getToolName(category) {
  const names = {
    pdf: 'PDF Tool',
    image: 'Image Tool',
    video: 'Video Tool',
    audio: 'Audio Tool',
    business: 'Business Tool'
  };
  return names[category] || 'Free Tool';
}

function shareOnWhatsApp(category) {
  const toolName = getToolName(category);
  const messages = [
    `Check out this free ${toolName}! 🔥`,
    `Just used this amazing free ${toolName} ✨`,
    `Found this awesome free ${toolName} tool 🎯`
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const text = `${msg}\n\nFree online tools: PDF, Image, Video, Audio & more!\n100+ tools - completely free!\n\nhttps://jovial-pudding-aba321.netlify.app/`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

function showAffiliatePopup(category) {
  const link = getAffiliateLink(category);
  console.log('Popup:', category, link);
  
  const old = document.getElementById('affiliate-popup');
  if (old) old.remove();
  
  const popup = document.createElement('div');
  popup.id = 'affiliate-popup';
  popup.innerHTML = `
    <div style="position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;display:flex;align-items:center;justify-content:center;padding:20px;">
      <div style="background:#1e293b;border-radius:20px;padding:32px;max-width:420px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.5);">
        <div style="font-size:56px;margin-bottom:16px;">🎉</div>
        <h3 style="margin-bottom:12px;color:#fff;font-size:22px;">Download Complete!</h3>
        <p style="color:#94a3b8;margin-bottom:24px;font-size:15px;">Your file is ready!</p>
        
        ${link ? `
        <a href="${link}" target="_blank" style="display:block;padding:16px;background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;text-decoration:none;border-radius:12px;font-weight:600;font-size:16px;margin-bottom:16px;">
          📥 Download Related Software
        </a>
        ` : ''}
        
        <button onclick="this.closest('#affiliate-popup').remove()" style="width:100%;padding:14px;background:transparent;border:1px solid #475569;color:#94a3b8;border-radius:12px;cursor:pointer;font-size:14px;">
          ✕ Close
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(popup);
}

function onDownloadComplete(category) {
  setTimeout(() => showAffiliatePopup(category), 1500);
}

loadAffiliateLinks();
console.log('Affiliate system ready');
