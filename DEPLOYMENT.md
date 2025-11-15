# Deployment Guide - Omoola Pharmacy & Stores

## Quick Start (No Configuration Needed)

The site works perfectly in **demo mode** without any configuration. Simply:

1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

All features work with demo data stored in JavaScript arrays.

## Production Deployment

### Option 1: GitHub Pages (Free)

1. Go to repository Settings > Pages
2. Select source branch (e.g., `main`)
3. Save
4. Your site will be live at: `https://akinwale10.github.io/Omoola1/`

### Option 2: Netlify (Free)

1. Connect GitHub repository to Netlify
2. Deploy settings:
   - Build command: (none needed)
   - Publish directory: `/`
3. Deploy

### Option 3: Vercel (Free)

1. Import GitHub repository
2. Deploy with default settings
3. Site goes live automatically

## Firebase Setup (Optional for Backend)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: "Omoola Pharmacy"
3. Enable Google Analytics (optional)

### 2. Enable Firestore Database

1. In Firebase Console, go to Firestore Database
2. Create database in production mode
3. Set security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{product} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       match /orders/{order} {
         allow read, write: if request.auth != null;
       }
       match /users/{user} {
         allow read, write: if request.auth != null;
       }
       match /newsletter/{entry} {
         allow create: if true;
       }
       match /messages/{message} {
         allow create: if true;
       }
     }
   }
   ```

### 3. Enable Authentication

1. Go to Authentication > Sign-in method
2. Enable Email/Password
3. Add first admin user manually

### 4. Configure Admin Access

1. After user signs up, go to Firestore
2. Create document in `users` collection:
   ```
   Document ID: [user's auth UID]
   Fields:
   - email: "admin@omoola.com"
   - role: "admin"
   - createdAt: [timestamp]
   ```

### 5. Update Configuration

Edit `js/config.js`:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Cloudinary Setup (Optional for Image Uploads)

### 1. Create Cloudinary Account

1. Sign up at [Cloudinary](https://cloudinary.com)
2. Go to Settings > Upload
3. Create unsigned upload preset

### 2. Update Configuration

Edit `js/config.js`:
```javascript
const cloudinaryConfig = {
    cloudName: "YOUR_CLOUD_NAME",
    uploadPreset: "YOUR_UPLOAD_PRESET"
};
```

## Environment Variables (Production)

For production, use environment variables instead of hardcoding:

### Using Netlify/Vercel

1. Add environment variables in dashboard:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - etc.

2. Update config to read from environment:
   ```javascript
   const firebaseConfig = {
       apiKey: process.env.FIREBASE_API_KEY || "demo",
       // ... other configs
   };
   ```

## Custom Domain Setup

### GitHub Pages
1. Add CNAME file with your domain
2. Configure DNS A records to GitHub Pages IPs

### Netlify/Vercel
1. Add custom domain in dashboard
2. Update DNS records as instructed
3. SSL certificate is automatic

## Performance Optimization

### 1. Image Optimization
- Use Cloudinary auto-format and quality settings
- Implement lazy loading for images below fold

### 2. Code Minification
```bash
# Install tools
npm install -g terser clean-css-cli html-minifier

# Minify files
terser js/main.js -o js/main.min.js -c -m
cleancss css/styles.css -o css/styles.min.css
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html
```

### 3. Enable Caching
Add to your hosting provider:
- Cache static assets (CSS, JS, images) for 1 year
- Cache HTML for 1 hour

## Security Checklist

- [ ] Firebase security rules properly configured
- [ ] Admin authentication enabled
- [ ] API keys stored in environment variables (not in code)
- [ ] HTTPS enabled (automatic on most hosting)
- [ ] CSP headers configured
- [ ] Rate limiting on forms

## Monitoring & Analytics

### Google Analytics
Add to all HTML files before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Firebase Analytics
Already included in Firebase SDK if enabled during setup.

## Backup Strategy

### Regular Backups
1. Export Firestore data monthly
2. Backup using Firebase CLI:
   ```bash
   firebase firestore:export gs://your-bucket/backups/$(date +%Y-%m-%d)
   ```

## Troubleshooting

### Images Not Loading
- Check if external domains are allowed
- Verify Unsplash URLs are accessible
- Use Cloudinary as fallback

### Firebase Not Connecting
- Verify API keys are correct
- Check browser console for errors
- Ensure Firestore is enabled
- Check security rules

### Admin Access Denied
- Verify user has role: "admin" in Firestore
- Check Firebase Authentication is enabled
- Ensure user is logged in

## Support

For issues or questions:
- GitHub Issues: https://github.com/Akinwale10/Omoola1/issues
- Email: info@omoola.com

## License

MIT License - See LICENSE file for details
