import { neon } from '@neondatabase/serverless';

// Only initialize if DATABASE_URL is available
const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;

export interface User {
  id: string;
  email: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  postcode?: string;
  created_at: Date;
}

export interface Assessment {
  id: string;
  user_id: string;
  weight_loss_method?: string;
  weight_lost_kg?: number;
  skin_laxity_score?: number;
  recommended_treatment?: string;
  match_score?: number;
  qualification_status?: string;
}

export async function createUser(userData: Partial<User>) {
  if (!sql) {
    console.warn('Database not configured - skipping user creation');
    return null;
  }
  try {
    const [user] = await sql`
      INSERT INTO users (email, phone, first_name, last_name, postcode)
      VALUES (${userData.email}, ${userData.phone}, ${userData.first_name}, ${userData.last_name}, ${userData.postcode})
      RETURNING *
    `;
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function createAssessment(assessmentData: Partial<Assessment>) {
  if (!sql) {
    console.warn('Database not configured - skipping assessment creation');
    return null;
  }
  try {
    const [assessment] = await sql`
      INSERT INTO assessments (
        user_id,
        weight_loss_method,
        weight_lost_kg,
        skin_laxity_score,
        recommended_treatment,
        match_score,
        qualification_status
      )
      VALUES (
        ${assessmentData.user_id},
        ${assessmentData.weight_loss_method},
        ${assessmentData.weight_lost_kg},
        ${assessmentData.skin_laxity_score},
        ${assessmentData.recommended_treatment},
        ${assessmentData.match_score},
        ${assessmentData.qualification_status}
      )
      RETURNING *
    `;
    return assessment;
  } catch (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }
}

export async function saveFeedback(feedbackData: any) {
  if (!sql) {
    console.warn('Database not configured - skipping feedback save');
    return null;
  }
  try {
    const [feedback] = await sql`
      INSERT INTO feedback (
        user_id,
        category,
        title,
        description,
        page_url,
        user_agent
      )
      VALUES (
        ${feedbackData.user_id},
        ${feedbackData.category},
        ${feedbackData.title},
        ${feedbackData.description},
        ${feedbackData.page_url},
        ${feedbackData.user_agent}
      )
      RETURNING *
    `;
    return feedback;
  } catch (error) {
    console.error('Error saving feedback:', error);
    throw error;
  }
}

export default sql;