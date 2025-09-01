import { sql } from '@vercel/postgres';

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      assessmentId,
      eventType,
      eventData
    } = req.body;

    // Validate required fields
    if (!assessmentId || !eventType) {
      return res.status(400).json({ 
        error: 'Missing required fields: assessmentId and eventType' 
      });
    }

    // Insert journey event
    await sql`
      INSERT INTO client_journey (assessment_id, event_type, event_data)
      VALUES (
        ${assessmentId},
        ${eventType},
        ${JSON.stringify(eventData || {})}
      )
    `;

    // Track specific events
    switch(eventType) {
      case 'whatsapp_clicked':
        // Track WhatsApp engagement
        await sql`
          UPDATE assessments 
          SET updated_at = CURRENT_TIMESTAMP
          WHERE id = ${assessmentId}
        `;
        break;
        
      case 'booking_opened':
        // Track booking modal interaction
        await sql`
          UPDATE assessments 
          SET updated_at = CURRENT_TIMESTAMP
          WHERE id = ${assessmentId}
        `;
        break;
        
      case 'booking_completed':
        // Mark as converted
        await sql`
          UPDATE assessments 
          SET updated_at = CURRENT_TIMESTAMP
          WHERE id = ${assessmentId}
        `;
        break;
    }

    return res.status(200).json({ 
      success: true,
      message: `Event '${eventType}' tracked successfully`
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      error: 'Failed to track event',
      details: error.message 
    });
  }
}