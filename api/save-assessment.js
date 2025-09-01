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
      name,
      email,
      phone,
      method,
      skinFeel,
      goal,
      focus,
      area,
      commitment,
      score,
      qualified,
      alternativeRecommendation
    } = req.body;

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS assessments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        method VARCHAR(50),
        skin_feel VARCHAR(50),
        goal VARCHAR(50),
        focus VARCHAR(50),
        area VARCHAR(50),
        commitment VARCHAR(50),
        score INTEGER,
        qualified BOOLEAN,
        alternative_recommendation TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert assessment data
    const result = await sql`
      INSERT INTO assessments (
        name, email, phone, method, skin_feel, goal, focus, area, 
        commitment, score, qualified, alternative_recommendation
      )
      VALUES (
        ${name}, ${email || null}, ${phone || null}, ${method}, ${skinFeel}, 
        ${goal}, ${focus}, ${area}, ${commitment}, ${score}, 
        ${qualified}, ${alternativeRecommendation || null}
      )
      RETURNING id
    `;

    // Create journey tracking table
    await sql`
      CREATE TABLE IF NOT EXISTS client_journey (
        id SERIAL PRIMARY KEY,
        assessment_id INTEGER REFERENCES assessments(id),
        event_type VARCHAR(100),
        event_data JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Log the assessment completion event
    await sql`
      INSERT INTO client_journey (assessment_id, event_type, event_data)
      VALUES (
        ${result.rows[0].id},
        'assessment_completed',
        ${JSON.stringify({ score, qualified })}
      )
    `;

    return res.status(200).json({ 
      success: true, 
      assessmentId: result.rows[0].id,
      message: 'Assessment saved successfully'
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      error: 'Failed to save assessment',
      details: error.message 
    });
  }
}