// =====================
// FIREBASE CONFIG
// =====================
// Add this to your HTML files

// Example Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// =====================
// FIRESTORE COLLECTION STRUCTURE
// =====================

/*

COLLECTION: admins
├── {adminId}
│   ├── email: "admin@example.com"
│   ├── role: "admin"
│   ├── createdAt: timestamp
│   └── lastLogin: timestamp

COLLECTION: settings
├── general
│   ├── siteName: "Elite Document Suite"
│   ├── tagline: "Free Online Tools"
│   └── theme: "dark"
├── ads
│   ├── enabled: false
│   ├── adSenseId: ""
│   └── showBanners: true
└── affiliate
    ├── pdf: "https://affiliate-link.com/pdf"
    ├── image: "https://affiliate-link.com/image"
    ├── business: "https://affiliate-link.com/business"
    └── general: "https://affiliate-link.com"

COLLECTION: analytics
├── {autoId}
│   ├── page: "index.html"
│   ├── tool: "pdf-merge"
│   ├── userId: "user-uid-or-anonymous"
│   ├── timestamp: timestamp
│   └── duration: 5000 (ms)

COLLECTION: feedback
├── {autoId}
│   ├── name: "John Doe"
│   ├── email: "john@example.com"
│   ├── subject: "Bug report"
│   ├── message: "..."
│   ├── status: "pending" | "reviewed" | "resolved"
│   ├── createdAt: timestamp
│   └── adminReply: "..."

COLLECTION: users
├── {userId}
│   ├── email: "user@example.com"
│   ├── displayName: "John"
│   ├── createdAt: timestamp
│   └── settings
│       ├── theme: "dark"
│       └── notifications: true

COLLECTION: tool_usage
├── {autoId}
│   ├── toolName: "PDF Merge"
│   ├── category: "pdf"
│   ├── userId: "anonymous"
│   ├── timestamp: timestamp
│   └── success: true

COLLECTION: public
├── version
│   ├── current: "1.0.0"
│   └── latest: "1.0.0"
└── features
    ├── pdfTools: true
    ├── imageTools: true
    └── textTools: true

*/

// =====================
// HOW TO USE
// =====================

/*

1. Include Firebase SDK in your HTML:
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js"></script>

2. Initialize Firebase in your JS:
   const app = firebase.initializeApp(firebaseConfig);
   const db = firebase.firestore(app);
   const auth = firebase.auth(app);

3. Example: Save feedback
   db.collection('feedback').add({
     name: 'John',
     email: 'john@example.com',
     subject: 'Feedback',
     message: 'Great tool!',
     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
     status: 'pending'
   });

4. Example: Get settings
   db.collection('settings').doc('affiliate').get()
     .then(doc => {
       if (doc.exists) {
         console.log(doc.data());
       }
     });

5. Example: Track tool usage
   db.collection('tool_usage').add({
     toolName: 'PDF Merge',
     category: 'pdf',
     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
     success: true
   });

*/

// =====================
// FIRESTORE INDEXES (for complex queries)
// =====================

/*

Create these indexes in Firebase Console > Firestore > Indexes:

Collection: tool_usage
- Field: toolName (Ascending), timestamp (Descending)
- Query scope: Collection

Collection: feedback
- Field: status (Ascending), createdAt (Descending)
- Query scope: Collection

Collection: analytics
- Field: userId (Ascending), timestamp (Descending)
- Query scope: Collection

*/

// =====================
// DEPLOY COMMANDS
// =====================

/*

# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Firestore indexes
firebase deploy --only firestore:indexes

# Deploy everything
firebase deploy

*/
