# 🚀 Quick Start: Enable Google Sign-In

## ⏱️ Time Required: ~15-20 minutes

Follow these steps to enable Google authentication on your website.

---

## Step 1: Enable Google Sign-In in Firebase (5 min)

1. Open [Firebase Console](https://console.firebase.google.com)
2. Click on your project: **omoola**
3. Click **Authentication** in the left menu
4. Click **Sign-in method** tab
5. Find **Google** in the list
6. Click on **Google**
7. Toggle the switch to **Enable**
8. Enter a support email (your email address)
9. Click **Save**

✅ **Done!** Google Sign-In is now enabled.

---

## Step 2: Add Your Website Domain (2 min)

1. Still in Firebase Console → **Authentication**
2. Click **Settings** tab
3. Scroll to **Authorized domains**
4. Click **Add domain**
5. Enter your website domain (e.g., `yoursite.com`)
6. Click **Add**
7. Repeat for www version if needed (e.g., `www.yoursite.com`)

**Common domains to add:**
- `localhost` (already there for testing)
- `yoursite.com` (your main domain)
- `www.yoursite.com` (www version)
- `yoursite.netlify.app` (if using Netlify)
- `yoursite.vercel.app` (if using Vercel)

✅ **Done!** Your domain is authorized.

---

## Step 3: Configure OAuth Consent Screen (10 min)

1. Open [Google Cloud Console](https://console.cloud.google.com)
2. Select your project (same as Firebase project)
3. Click **☰** menu → **APIs & Services** → **OAuth consent screen**
4. Fill in the required fields:

   **User Type:** External
   
   **App Information:**
   - App name: `Omoola Pharmacy & Stores`
   - User support email: Your email
   - App logo: Upload your logo (optional)

   **App Domain (optional but recommended):**
   - Application home page: `https://yoursite.com`
   - Privacy policy: `https://yoursite.com/privacy.html`
   - Terms of service: `https://yoursite.com/terms.html`

   **Authorized Domains:**
   - Add your domain: `yoursite.com`

   **Developer Contact:**
   - Email: Your email

5. Click **Save and Continue**
6. Click **Add or Remove Scopes**
   - Select: `email`
   - Select: `profile`
   - Select: `openid`
7. Click **Update**
8. Click **Save and Continue**
9. Add test users (your email) if app is in testing mode
10. Click **Save and Continue**
11. Review and click **Back to Dashboard**

✅ **Done!** OAuth is configured.

---

## Step 4: Test Your Setup (3 min)

1. Open your website
2. Go to: `https://yoursite.com/auth-diagnostics.html`
3. Review the automatic checks:
   - ✅ All green = Perfect!
   - ❌ Any red = Check `TROUBLESHOOTING.md`
4. Click **Test Google Sign-In (Popup)**
5. Select your Google account
6. Verify you're signed in

✅ **Done!** Google Sign-In is working!

---

## Common Issues & Quick Fixes

### "This domain is not authorized"
→ Go back to **Step 2** and add your domain

### "This app is blocked"
→ Complete **Step 3** or add yourself as a test user

### "Popup blocked"
→ Don't worry! The code automatically switches to redirect method

### Still not working?
→ Open `TROUBLESHOOTING.md` for detailed solutions

---

## Production Checklist

Before going live:

- [ ] Google Sign-In enabled in Firebase
- [ ] Production domain added to Authorized Domains
- [ ] OAuth consent screen completed
- [ ] Website uses HTTPS (required!)
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Tested on mobile devices

---

## Need Help?

1. **Diagnostics Tool:** Open `auth-diagnostics.html`
2. **Troubleshooting:** Read `TROUBLESHOOTING.md`
3. **Setup Guide:** Read `FIREBASE_SETUP.md`
4. **Support:** Contact Firebase Support in console

---

## Important Notes

⚠️ **HTTPS Required:** Google Sign-In only works on HTTPS in production (localhost works with HTTP)

⚠️ **Wait Time:** After changes, wait 2-3 minutes for Firebase to update

⚠️ **Clear Cache:** Clear browser cache after making changes

✅ **The Code is Ready:** No code changes needed, just configuration!

---

## Success Indicators

You'll know it's working when:
- ✅ Clicking "Google" opens Google sign-in
- ✅ After signing in, redirects to shop page
- ✅ Welcome message appears
- ✅ No console errors
- ✅ Works on different browsers

---

**Last Updated:** 2024-11-20  
**Version:** 1.0  
**Status:** Ready for Production ✅
