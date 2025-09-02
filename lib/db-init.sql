-- Skulpt Body Contouring Database Schema
-- PostgreSQL database initialization for production deployment

-- Users table - stores all platform users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  postcode VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assessments table - stores transformation assessments
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Assessment answers
  weight_loss_method VARCHAR(50),
  amount_lost VARCHAR(50),
  area VARCHAR(50),
  timeline VARCHAR(50),
  feeling_about VARCHAR(100),
  motivation VARCHAR(100),
  
  -- Calculated scores
  match_score INTEGER DEFAULT 95,
  qualification_status VARCHAR(50) DEFAULT 'qualified',
  recommended_sessions INTEGER DEFAULT 6,
  
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Progress photos table
CREATE TABLE IF NOT EXISTS progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  cloudinary_url TEXT NOT NULL,
  cloudinary_public_id VARCHAR(255),
  week_number INTEGER,
  photo_type VARCHAR(50), -- 'before', 'during', 'after'
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Platform analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL, -- page_view, assessment_start, assessment_complete, etc
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  session_id VARCHAR(255),
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback/Bug reports table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(50), -- bug, feature, general
  priority VARCHAR(20), -- low, medium, high, critical
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, in_progress, resolved, closed
  page_url TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- WhatsApp messages log
CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  phone_number VARCHAR(50),
  message_type VARCHAR(50), -- sent, received
  message_content TEXT,
  status VARCHAR(50), -- pending, sent, delivered, failed
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assessments_user_id ON assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_photos_user_id ON progress_photos(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Initial data / example for Control Center
INSERT INTO feedback (category, priority, title, description, status)
VALUES (
  'feature',
  'high',
  'Example: AI Body Transformation Predictor',
  'Use machine learning to show users their predicted results based on similar journeys.',
  'new'
) ON CONFLICT DO NOTHING;