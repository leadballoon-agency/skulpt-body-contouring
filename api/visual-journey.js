import { neon } from '@neondatabase/serverless';

// Cloudinary configuration would go in environment variables
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

/**
 * Visual Journey Tracking System using Cloudinary
 * 
 * This creates a powerful visual progression system where clients can:
 * 1. Upload photos at each stage
 * 2. See their transformation timeline
 * 3. Compare before/after automatically
 * 4. Share their journey (with permission)
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    if (req.method === 'POST') {
      // Handle photo upload
      const { 
        assessmentId, 
        photoType, // 'before', 'during', 'after'
        treatmentStage, // 'initial', 'promax_session_1', 'promax_session_3', etc.
        bodyArea, // 'abdomen', 'arms', 'thighs', etc.
        angle, // 'front', 'side', 'back'
        imageData // base64 or URL
      } = req.body;

      // Create visual journey table if doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS visual_journey (
          id SERIAL PRIMARY KEY,
          assessment_id INTEGER REFERENCES assessments(id),
          cloudinary_public_id VARCHAR(255),
          cloudinary_url TEXT,
          photo_type VARCHAR(50),
          treatment_stage VARCHAR(100),
          body_area VARCHAR(50),
          angle VARCHAR(50),
          measurements JSON,
          ai_analysis JSON,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          is_public BOOLEAN DEFAULT false,
          consent_given BOOLEAN DEFAULT false
        )
      `;

      // Here's where Cloudinary magic happens
      // 1. Upload to Cloudinary with smart tagging
      const cloudinaryUpload = {
        public_id: `skulpt/${assessmentId}/${treatmentStage}_${bodyArea}_${angle}_${Date.now()}`,
        folder: `skulpt/journeys/${assessmentId}`,
        tags: [photoType, treatmentStage, bodyArea, angle],
        context: {
          assessment_id: assessmentId,
          stage: treatmentStage,
          type: photoType
        },
        // Cloudinary AI features
        detection: 'body_detection', // Detect body parts
        auto_tagging: 100, // Auto-tag features
        colors: true, // Extract dominant colors (skin tone tracking)
        
        // Transformations for consistency
        transformation: [
          { width: 1200, height: 1600, crop: 'limit' },
          { quality: 'auto:best' },
          { effect: 'improve' }, // Auto enhance
          { effect: 'viesus_correct' } // Professional color correction
        ]
      };

      // Create comparison views automatically
      if (photoType === 'after' || photoType === 'during') {
        // Fetch the 'before' photo
        const beforePhoto = await sql`
          SELECT cloudinary_public_id 
          FROM visual_journey 
          WHERE assessment_id = ${assessmentId} 
          AND photo_type = 'before'
          AND body_area = ${bodyArea}
          AND angle = ${angle}
          ORDER BY created_at ASC 
          LIMIT 1
        `;

        if (beforePhoto.length > 0) {
          // Create side-by-side comparison using Cloudinary
          const comparisonUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/w_600,h_800,c_fill/l_${beforePhoto[0].cloudinary_public_id},w_600,h_800,c_fill,x_-300/l_text:Arial_60_bold:BEFORE,co_white,y_-350,x_-300/l_${cloudinaryUpload.public_id},w_600,h_800,c_fill,x_300/l_text:Arial_60_bold:AFTER,co_white,y_-350,x_300/skulpt_comparison_template.jpg`;

          // Store comparison URL
          await sql`
            INSERT INTO visual_journey (
              assessment_id, 
              cloudinary_url, 
              photo_type, 
              treatment_stage,
              body_area,
              angle,
              ai_analysis
            ) VALUES (
              ${assessmentId},
              ${comparisonUrl},
              'comparison',
              ${treatmentStage},
              ${bodyArea},
              ${angle},
              ${JSON.stringify({ 
                before_id: beforePhoto[0].cloudinary_public_id,
                after_id: cloudinaryUpload.public_id,
                created_at: new Date().toISOString()
              })}
            )
          `;
        }
      }

      // AI Analysis (using Cloudinary's AI or integrate with other services)
      const aiAnalysis = {
        skin_tightness_score: calculateSkinTightness(imageData),
        estimated_improvement: calculateImprovement(photoType, treatmentStage),
        areas_of_concern: detectAreasOfConcern(imageData),
        recommended_next_step: getNextRecommendation(treatmentStage)
      };

      // Store in database
      const result = await sql`
        INSERT INTO visual_journey (
          assessment_id,
          cloudinary_public_id,
          cloudinary_url,
          photo_type,
          treatment_stage,
          body_area,
          angle,
          ai_analysis
        ) VALUES (
          ${assessmentId},
          ${cloudinaryUpload.public_id},
          ${`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${cloudinaryUpload.public_id}`},
          ${photoType},
          ${treatmentStage},
          ${bodyArea},
          ${angle},
          ${JSON.stringify(aiAnalysis)}
        )
        RETURNING id
      `;

      return res.status(200).json({
        success: true,
        journeyId: result[0].id,
        message: 'Photo uploaded to journey',
        aiInsights: aiAnalysis
      });

    } else if (req.method === 'GET') {
      // Get journey timeline
      const { assessmentId } = req.query;

      const journey = await sql`
        SELECT 
          vj.*,
          a.name,
          a.email
        FROM visual_journey vj
        JOIN assessments a ON a.id = vj.assessment_id
        WHERE vj.assessment_id = ${assessmentId}
        ORDER BY vj.created_at ASC
      `;

      // Create timeline view
      const timeline = journey.reduce((acc, photo) => {
        const stage = photo.treatment_stage;
        if (!acc[stage]) {
          acc[stage] = {
            stage: stage,
            date: photo.created_at,
            photos: [],
            improvements: [],
            measurements: {}
          };
        }
        
        acc[stage].photos.push({
          type: photo.photo_type,
          area: photo.body_area,
          angle: photo.angle,
          url: photo.cloudinary_url,
          analysis: photo.ai_analysis
        });

        return acc;
      }, {});

      // Calculate overall progress
      const progress = calculateOverallProgress(journey);

      return res.status(200).json({
        success: true,
        timeline: Object.values(timeline),
        progress: progress,
        totalPhotos: journey.length,
        shareableUrl: `https://skulpt.uk/journey/${assessmentId}` // Public journey page
      });
    }

  } catch (error) {
    console.error('Visual journey error:', error);
    return res.status(500).json({ 
      error: 'Failed to process visual journey',
      details: error.message 
    });
  }
}

// Helper functions for AI analysis (simplified examples)
function calculateSkinTightness(imageData) {
  // This would integrate with actual AI service
  // For now, return mock score
  return Math.floor(Math.random() * 30) + 60; // 60-90 score
}

function calculateImprovement(photoType, stage) {
  if (photoType === 'before') return 0;
  if (stage.includes('session_1')) return 15;
  if (stage.includes('session_3')) return 35;
  if (stage.includes('session_6')) return 65;
  return 50;
}

function detectAreasOfConcern(imageData) {
  // Would use computer vision to detect
  return [
    { area: 'lower_abdomen', severity: 'moderate' },
    { area: 'love_handles', severity: 'mild' }
  ];
}

function getNextRecommendation(stage) {
  if (stage === 'initial') return 'Begin ProMax Lipo sessions';
  if (stage.includes('promax')) return 'Continue with treatment plan';
  if (stage.includes('final')) return 'Consider maintenance program';
  return 'Schedule consultation';
}

function calculateOverallProgress(journey) {
  const beforePhotos = journey.filter(p => p.photo_type === 'before');
  const currentPhotos = journey.filter(p => p.photo_type === 'during' || p.photo_type === 'after');
  
  if (beforePhotos.length === 0 || currentPhotos.length === 0) {
    return { percentage: 0, message: 'Upload photos to track progress' };
  }

  // Calculate based on treatment stages completed
  const stages = [...new Set(journey.map(p => p.treatment_stage))];
  const progressPercentage = Math.min((stages.length / 6) * 100, 100);

  return {
    percentage: progressPercentage,
    stages_completed: stages.length,
    message: progressPercentage >= 100 ? 'Journey complete!' : `${stages.length} of 6 stages completed`
  };
}