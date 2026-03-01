# All-in-One Online Document Toolkit

A comprehensive free online tools website with 100+ working tools for PDF, Image, Audio, Video, Text, Business, Social Media, and Calculators. Includes AI Chat powered by Groq API.

## 📱 Overview

- **App Name:** All-in-One Online Document Toolkit
- **Owner:** Muhammad Hussain Shakir
- **Version:** 1.0.0
- **Build Time:** 30 Days
- **Platform:** Web (PWA - Installable)
- **Deployment:** Vercel / Netlify

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables for theming
- **JavaScript (ES6+)** - Vanilla JS for all functionality
- **No frameworks** - Pure vanilla JS for performance

### Libraries Used
| Library | Purpose | CDN |
|---------|---------|-----|
| pdf-lib | PDF manipulation | unpkg.com |
| pdf.js | PDF rendering/parsing | cdnjs.cloudflare.com |
| jszip | ZIP file handling | cdnjs.cloudflare.com |
| jsQR | QR code scanning | jsdelivr.net |
| qrcode.js | QR code generation | cdnjs.cloudflare.com |
| JsBarcode | Barcode generation | cdnjs.cloudflare.com |

### AI Integration
- **Groq API** - For AI Chat feature
- API Key: User-configurable (stored in localStorage)

### Storage
- **localStorage** - For theme preferences, settings, chat history
- **No backend required** - All processing happens in browser

## 📂 Project Structure

```
F:\Tools Project\
├── index.html              # Homepage with all tools catalog
├── pdf-tools.html          # 20+ PDF tools
├── image-tools.html        # 18 Image tools
├── text-tools.html         # 17 Text utilities
├── audio-tools.html        # 8 Audio tools
├── video-tools.html        # 5 Video tools
├── business-tools.html     # 16 Business tools
├── social-tools.html       # 6 Social media tools
├── calculators.html        # 6 Calculator tools
├── chat.html               # AI Chat (Groq API)
├── blog.html              # Blog section
├── about.html             # About page
├── privacy.html           # Privacy policy
├── terms.html             # Terms of service
├── contact.html           # Contact form
├── settings.html          # Theme & settings
├── pdf-editor.html        # Advanced PDF editor
├── popular-tools.html     # Popular tools page
├── 404.html              # Error page
├── manifest.json          # PWA manifest
├── service-worker.js      # PWA service worker
├── firebase-analytics.js  # Analytics
├── simple-affiliate.js    # Affiliate system
├── version-check.js       # Version checker
└── icon.svg              # App icon
```

## 🔧 Features

### PDF Tools (20+)
- Merge, Split, Compress
- PDF to Word/Excel/PPT/Image
- Image/Word/Excel/PPT to PDF
- Rotate, Delete, Reorder pages
- Add/Remove watermark
- Protect/Unlock with password
- Extract text
- Add page numbers
- And more...

### Image Tools (18)
- Resize, Compress, Crop
- Rotate, Flip
- JPG/PNG/WebP conversion
- Background Remover (API)
- OCR - Text from image
- Blur, Black & White filters
- Watermark
- Text to Image
- DPI changer

### Audio Tools (8)
- Converter (MP3, WAV, OGG)
- Trimmer, Cutter
- Volume Changer
- Speed Control
- Audio Joiner
- Audio Reverse

### Video Tools (5)
- Converter
- Compressor
- GIF Maker
- Trimmer
- Speed Changer

### Text Tools (17)
- Word Counter, Character Counter
- Case Converter
- JSON Formatter, HTML Formatter
- Base64 Encoder/Decoder
- URL Encoder
- QR Code Generator/Scanner
- Barcode Generator
- Password Generator
- Password Strength Checker
- Color Picker
- Text to PDF

### Business Tools (16)
- ZIP/RAR/7Z/TAR Extractor
- Create ZIP
- File Size Calculator
- File Type Detector
- Invoice Generator
- Resume Builder (PDF)
- Business Card Generator
- ID Card Generator
- E-Signature
- Digital Signature
- Currency Converter
- EMI Calculator
- GST Calculator

### Social Media Tools (6)
- Instagram Resizer
- YouTube Thumbnail
- Profile Picture Maker
- Facebook Cover
- Twitter Header
- LinkedIn Banner

### Calculators (6)
- Loan Calculator (EMI)
- BMI Calculator
- Age Calculator
- Percentage Calculator
- Unit Converter
- GST Calculator

### AI Chat 🤖
- Powered by Groq API
- Free to use
- No login required
- Context-aware responses about app tools

## 🎨 Theme System

The app supports multiple themes stored in localStorage:
- Dark (default)
- Light
- Ocean
- Forest
- Sunset
- Royal
- Midnight
- Amber
- Rose
- Emerald

Each page can have its own theme preference.

## 📱 Mobile Features

- **PWA** - Installable on mobile
- **Touch-friendly** - 48px+ tap targets
- **Camera access** - For QR scanning and image capture
- **Share API** - Native mobile sharing
- **File picker** - Camera/gallery access
- **Responsive** - Works on all screen sizes

## 🔒 Privacy

- **100% Client-side** - No files uploaded to server
- All processing happens in browser
- No user accounts required
- No data collection (except analytics)

## ⏱️ Build Information

- **Development Time:** 30 days
- **Tools Created:** 100+
- **Pages:** 18+
- **Lines of Code:** ~50,000+ (combined HTML/CSS/JS)

## 🚀 How to Deploy

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy with default settings
4. Custom domain can be added

### Netlify
1. Drag and drop project folder
2. Or connect GitHub repo
3. Deploy

## 🔧 For Developers

### Adding New Tools

#### For Modal-based tools (Business, Text, Image):
1. Add tool ID to tools object
2. Create render function
3. Add tool title
4. Add icon and description in HTML

#### For Standalone tools (PDF, Video, Audio):
1. Add tool card HTML
2. Create tool function
3. Add event listeners

### Theme Customization
```css
:root {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --accent: #6366f1;
  /* Add more variables */
}
```

### Adding API Keys
- Groq API: User enters in chat settings
- Stored in localStorage

## 📄 License

Copyright © 2026 Muhammad Hussain Shakir. All rights reserved.

## 👨‍💻 Owner

**Muhammad Hussain Shakir**
- Email: shakirmhussain28@gmail.com

## 🤖 AI Assistant

The app includes an AI chat feature powered by Groq API. Users can ask questions about the app, get help with tools, or general questions.

---

**Note:** This README was created to help developers understand and maintain the application. All tools work entirely in the browser - no server-side processing required.
