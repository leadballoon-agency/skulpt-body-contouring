import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      image, // base64 image data
      assessmentId,
      photoType, // 'before', 'during', 'after'
      sessionNumber,
      bodyArea,
      angle 
    } = req.body;

    // Create unique public_id for organization
    const publicId = `skulpt/journeys/${assessmentId}/${photoType}_session${sessionNumber}_${bodyArea}_${angle}_${Date.now()}`;

    // Upload to Cloudinary with transformations
    const result = await cloudinary.v2.uploader.upload(image, {
      public_id: publicId,
      folder: `skulpt/journeys/${assessmentId}`,
      upload_preset: 'skulpt_journeys', // Uses your preset
      tags: [
        `assessment_${assessmentId}`,
        photoType,
        `session_${sessionNumber}`,
        bodyArea,
        angle,
        'skulpt_journey'
      ],
      context: {
        assessment_id: assessmentId,
        photo_type: photoType,
        session: sessionNumber,
        area: bodyArea,
        angle: angle,
        captured_at: new Date().toISOString()
      },
      // Eager transformations (create these versions immediately)
      eager: [
        // Thumbnail for timeline
        { width: 300, height: 400, crop: 'fill', quality: 'auto' },
        // Medium for comparisons
        { width: 600, height: 800, crop: 'fill', quality: 'auto:best' },
        // Full size optimized
        { width: 1200, height: 1600, crop: 'limit', quality: 'auto:best' }
      ],
      eager_async: true
    });

    // If this is an 'after' or 'during' photo, create comparison
    let comparisonUrl = null;
    if (photoType === 'after' || photoType === 'during') {
      comparisonUrl = await createComparison(assessmentId, bodyArea, angle, result.public_id);
    }

    return res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      thumbnailUrl: result.eager[0]?.secure_url,
      comparisonUrl: comparisonUrl,
      cloudinaryData: {
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes
      }
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload image',
      details: error.message 
    });
  }
}

async function createComparison(assessmentId, bodyArea, angle, currentPhotoId) {
  try {
    // Find the 'before' photo for this area and angle
    // You would query your database here to get the before photo public_id
    // For now, we'll construct the comparison URL
    
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    // Create side-by-side comparison URL using Cloudinary transformations
    const comparisonUrl = `https://res.cloudinary.com/${cloudName}/image/upload/` +
      `w_1200,h_800,c_fill/` +
      `l_${currentPhotoId.replace(/\//g, ':')},w_600,h_800,c_fill,g_west/` +
      `l_text:Arial_60_bold:AFTER,co_white,g_south_west,x_50,y_50/` +
      `skulpt_comparison_template.jpg`;
    
    return comparisonUrl;
  } catch (error) {
    console.error('Failed to create comparison:', error);
    return null;
  }
}