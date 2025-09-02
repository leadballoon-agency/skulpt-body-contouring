# Skulpt Body Contouring Platform

AI-ready body transformation platform for ProMax Lipo treatments.

## 🚀 Quick Deploy to Vercel

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables in Vercel:**
   - Go to your Vercel project settings
   - Add these environment variables:
     - `DATABASE_URL` - Your Neon database connection string
     - `CLOUDINARY_CLOUD_NAME` - ddxptienb
     - `CLOUDINARY_API_KEY` - Your Cloudinary API key
     - `CLOUDINARY_API_SECRET` - Your Cloudinary secret
     - `CLOUDINARY_UPLOAD_PRESET` - skulpt_journeys
     - `WHATSAPP_NUMBER` - 447700173390
     - `GHL_WEBHOOK_URL` - Your GoHighLevel webhook URL

3. **Deploy:**
```bash
npx vercel
```

Follow the prompts:
- Link to existing project or create new
- Select the current directory
- Deploy!

## 🗄️ Database Setup

Run the database initialization once:
```bash
node init-database.js
```

This creates all necessary tables in your Neon database.

## 🎯 Key Pages

- `/` - Main landing page with assessment tool
- `/dashboard-reveal.html` - User dashboard after assessment
- `/admin-dashboard.html` - Admin feedback management
- `/platform-control-center.html` - Complete platform management
- `/enhanced-analytics.html` - Analytics and AI readiness

## 📱 Mobile Optimized

90% of traffic is mobile - the platform is fully responsive and optimized for iOS/Android.

## 🤖 AI Ready

Infrastructure prepared for:
- Photo analysis with computer vision
- Personal AI coach avatar
- Predictive analytics
- Smart recommendations

## 🔐 Security Notes

- Never commit `.env.local` file
- Keep API keys secure in Vercel environment variables
- GDPR compliant data handling

## 📧 Support

Report issues at: https://github.com/anthropics/claude-code/issues