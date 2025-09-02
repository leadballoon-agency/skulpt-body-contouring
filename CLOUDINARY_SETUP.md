# Cloudinary Setup Guide for Skulpt Body Contouring

## Step 1: Create Your Cloudinary Account
1. Go to https://cloudinary.com and sign up for a free account
2. Verify your email address

## Step 2: Get Your Credentials (New UI)
1. After logging in, click on your **avatar/profile icon** in the top right
2. Select **Account Settings** from the dropdown
3. Navigate to **API Keys** in the left sidebar
4. Click **"Generate New API Key"** button
5. Copy these values:
   - **Cloud Name**: (shown at the top of the dashboard)
   - **API Key**: (your new API key)
   - **API Secret**: (keep this secure!)

## Step 3: Create Upload Preset
1. Go to **Settings** (gear icon) in the left sidebar
2. Click on **Upload** tab
3. Scroll down to **Upload presets** section
4. Click **"Add upload preset"** button
5. Configure the preset:
   - **Preset name**: `skulpt_journeys`
   - **Signing Mode**: Unsigned (for client-side uploads)
   - **Folder**: `skulpt/journeys`
   - **Allowed formats**: jpg, png, webp
   - **Max file size**: 10MB
   - **Tags**: Add default tags: `skulpt`, `journey`, `progress`
6. Under **Upload transformations**, add:
   - **Eager transformations**: 
     - Thumbnail: w_300, h_400, c_fill, q_auto
     - Medium: w_600, h_800, c_fill, q_auto:best
     - Full: w_1200, h_1600, c_limit, q_auto:best
7. Click **Save**

## Step 4: Enable Required Features
1. In Settings, go to **Security** tab
2. Ensure **"Unsigned uploading"** is enabled for your preset
3. Add your domain to **"Allowed upload sources"**:
   - Add: `localhost:3000` (for development)
   - Add: `your-vercel-domain.vercel.app` (for production)

## Step 5: Update Your .env.local File
```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name_here"
CLOUDINARY_API_KEY="your_api_key_here"
CLOUDINARY_API_SECRET="your_api_secret_here"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="skulpt_journeys"
```

## Step 6: Test the Integration
1. Start your local server: `npm run dev`
2. Navigate to http://localhost:3000/photo-upload-widget.html
3. Try uploading a test image
4. Check your Cloudinary Media Library to confirm upload

## Step 7: Set Up Transformations (Optional)
For before/after comparisons, create a transformation:
1. Go to **Transformations** in the dashboard
2. Click **"Add Transformation"**
3. Name it: `before_after_comparison`
4. Add layers for side-by-side comparison
5. Save the transformation

## Troubleshooting

### "Upload preset not found"
- Ensure the preset name matches exactly
- Check that it's set to "Unsigned"

### "Cloud name not configured"
- Double-check your cloud name in the dashboard
- Make sure it's in your environment variables

### "CORS error"
- Add your domain to allowed origins in Cloudinary settings
- For local development, use http://localhost:3000 (not 127.0.0.1)

### Images not displaying
- Check that your cloud name is correct in the URLs
- Verify the images exist in your Media Library

## API Endpoints to Test
- `/api/cloudinary-upload` - Direct upload endpoint
- `/api/visual-journey` - Journey tracking endpoint

## Next Steps
1. Test photo uploads with the widget
2. Verify images appear in your Cloudinary dashboard
3. Test the comparison generation feature
4. Deploy to Vercel and update allowed domains