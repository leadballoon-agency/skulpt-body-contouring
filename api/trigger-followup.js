import { neon } from '@neondatabase/serverless';

// GHL Webhook for automated follow-ups
const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/dVD6QbgqAF7fiHM3MCrz/webhook-trigger/355171e7-7010-42a9-b0b8-3dee211db694';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Get assessments that need follow-up
    const pendingFollowups = await sql`
      SELECT 
        a.*,
        CASE 
          WHEN a.qualified = true AND a.score >= 85 THEN 'hot_lead'
          WHEN a.qualified = true AND a.score >= 70 THEN 'warm_lead'
          WHEN a.qualified = true THEN 'cool_lead'
          ELSE 'alternative_treatment'
        END as lead_temperature,
        CASE
          WHEN NOT EXISTS (
            SELECT 1 FROM client_journey 
            WHERE assessment_id = a.id 
            AND event_type = 'followup_1_sent'
          ) THEN 1
          WHEN NOT EXISTS (
            SELECT 1 FROM client_journey 
            WHERE assessment_id = a.id 
            AND event_type = 'followup_2_sent'
          ) AND a.created_at < NOW() - INTERVAL '1 day' THEN 2
          WHEN NOT EXISTS (
            SELECT 1 FROM client_journey 
            WHERE assessment_id = a.id 
            AND event_type = 'followup_3_sent'
          ) AND a.created_at < NOW() - INTERVAL '3 days' THEN 3
          WHEN NOT EXISTS (
            SELECT 1 FROM client_journey 
            WHERE assessment_id = a.id 
            AND event_type = 'followup_7_sent'
          ) AND a.created_at < NOW() - INTERVAL '7 days' THEN 7
          ELSE 0
        END as followup_stage
      FROM assessments a
      WHERE a.email IS NOT NULL
      AND a.created_at > NOW() - INTERVAL '30 days'
      HAVING followup_stage > 0
      LIMIT 50
    `;

    // Process each follow-up
    for (const lead of pendingFollowups) {
      const followupData = {
        email: lead.email,
        phone: lead.phone,
        name: lead.name,
        lead_temperature: lead.lead_temperature,
        followup_stage: lead.followup_stage,
        score: lead.score,
        qualified: lead.qualified,
        method: lead.method,
        goal: lead.goal,
        area: lead.area,
        trigger_type: `followup_${lead.followup_stage}`,
        
        // Custom fields for GHL
        custom_fields: {
          assessment_score: lead.score,
          weight_loss_method: lead.method,
          skin_concern: lead.goal,
          treatment_area: lead.area,
          commitment_level: lead.commitment,
          alternative_recommendation: lead.alternative_recommendation
        }
      };

      // Determine follow-up sequence based on qualification
      if (lead.lead_temperature === 'hot_lead') {
        followupData.sequence = 'hot_lead_nurture';
        followupData.urgency = 'high';
        followupData.offer = 'free_consultation_48hr';
      } else if (lead.lead_temperature === 'warm_lead') {
        followupData.sequence = 'warm_lead_education';
        followupData.urgency = 'medium';
        followupData.offer = 'before_after_gallery';
      } else if (lead.lead_temperature === 'cool_lead') {
        followupData.sequence = 'cool_lead_nurture';
        followupData.urgency = 'low';
        followupData.offer = 'educational_content';
      } else {
        followupData.sequence = 'alternative_treatment';
        followupData.urgency = 'low';
        followupData.offer = 'other_services';
      }

      // Send to GHL
      try {
        await fetch(GHL_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(followupData)
        });

        // Log the follow-up
        await sql`
          INSERT INTO client_journey (assessment_id, event_type, event_data)
          VALUES (
            ${lead.id},
            ${`followup_${lead.followup_stage}_sent`},
            ${JSON.stringify(followupData)}
          )
        `;
      } catch (error) {
        console.error(`Failed to send follow-up for ${lead.email}:`, error);
      }
    }

    return res.status(200).json({ 
      success: true,
      processed: pendingFollowups.length,
      message: `Processed ${pendingFollowups.length} follow-ups`
    });

  } catch (error) {
    console.error('Follow-up processing error:', error);
    return res.status(500).json({ 
      error: 'Failed to process follow-ups',
      details: error.message 
    });
  }
}