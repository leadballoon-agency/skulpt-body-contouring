-- Skulpt Body Contouring Database Schema
-- PostgreSQL with Neon for serverless, secure, GDPR-compliant storage

-- Users table (core account data)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    postcode VARCHAR(10),
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    account_status VARCHAR(20) DEFAULT 'active', -- active, paused, completed
    gdpr_consent BOOLEAN DEFAULT true,
    gdpr_consent_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Security
    password_hash VARCHAR(255), -- bcrypt hashed
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret VARCHAR(255),
    
    -- Indexes for performance
    INDEX idx_email (email),
    INDEX idx_phone (phone),
    INDEX idx_postcode (postcode)
);

-- Assessment results (their initial qualification)
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    assessment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Weight loss journey
    weight_loss_method VARCHAR(50), -- ozempic, mounjaro, natural, surgery
    weight_lost_kg DECIMAL(5,2),
    weight_loss_timeframe_months INTEGER,
    
    -- Skin assessment
    skin_laxity_score INTEGER, -- 0-100 scale
    primary_concern VARCHAR(50),
    problem_areas JSONB, -- ["abdomen", "arms", "thighs"]
    
    -- Treatment recommendation
    recommended_treatment VARCHAR(50),
    match_score INTEGER,
    qualification_status VARCHAR(20), -- qualified, needs_consultation, refer_partner
    
    -- AI insights
    ai_insights JSONB,
    conversation_log JSONB,
    
    INDEX idx_user_id (user_id),
    INDEX idx_assessment_date (assessment_date)
);

-- Visual journey (Cloudinary integrated)
CREATE TABLE progress_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cloudinary_public_id VARCHAR(255) UNIQUE NOT NULL,
    cloudinary_url VARCHAR(500) NOT NULL,
    cloudinary_secure_url VARCHAR(500) NOT NULL,
    
    photo_type VARCHAR(20), -- before, during, after
    session_number INTEGER,
    body_area VARCHAR(50),
    angle VARCHAR(20), -- front, side, back
    
    upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Measurements at time of photo
    measurements JSONB, -- {"waist": 32, "hips": 40, etc}
    weight_kg DECIMAL(5,2),
    
    -- Privacy
    visibility VARCHAR(20) DEFAULT 'private', -- private, practitioner, testimonial
    consent_for_marketing BOOLEAN DEFAULT false,
    
    -- AI analysis
    ai_analysis JSONB, -- skin texture score, improvement percentage, etc
    
    INDEX idx_user_photos (user_id, upload_date),
    INDEX idx_photo_type (photo_type)
);

-- Treatment sessions
CREATE TABLE treatment_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    session_number INTEGER NOT NULL,
    session_date TIMESTAMP WITH TIME ZONE,
    session_type VARCHAR(50), -- promax_lipo, morpheus8, hifu
    
    -- Treatment details
    areas_treated JSONB,
    duration_minutes INTEGER,
    settings_used JSONB, -- machine settings for record
    
    -- Practitioner notes
    practitioner_id UUID,
    practitioner_notes TEXT,
    
    -- Client feedback
    pain_level INTEGER, -- 1-10 scale
    satisfaction_level INTEGER, -- 1-10 scale
    side_effects JSONB,
    
    -- Results tracking
    immediate_results TEXT,
    photos_taken BOOLEAN DEFAULT false,
    
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, completed, cancelled, no_show
    
    INDEX idx_user_sessions (user_id, session_date),
    INDEX idx_session_status (status)
);

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    appointment_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
    appointment_type VARCHAR(50), -- consultation, treatment, follow_up
    duration_minutes INTEGER DEFAULT 60,
    
    status VARCHAR(20) DEFAULT 'confirmed', -- confirmed, cancelled, completed, no_show
    
    -- Reminders
    reminder_sent BOOLEAN DEFAULT false,
    reminder_sent_at TIMESTAMP WITH TIME ZONE,
    
    -- Integration with calendar
    calendar_event_id VARCHAR(255),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    INDEX idx_user_appointments (user_id, appointment_datetime),
    INDEX idx_appointment_status (status)
);

-- Measurements tracking
CREATE TABLE body_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    measurement_date DATE NOT NULL,
    
    -- Key measurements in cm
    weight_kg DECIMAL(5,2),
    waist_cm DECIMAL(5,2),
    hips_cm DECIMAL(5,2),
    chest_cm DECIMAL(5,2),
    arms_cm DECIMAL(5,2),
    thighs_cm DECIMAL(5,2),
    
    -- Body composition
    body_fat_percentage DECIMAL(4,2),
    muscle_mass_kg DECIMAL(5,2),
    
    -- Skin measurements
    skin_fold_measurements JSONB,
    skin_elasticity_score INTEGER, -- 1-10
    
    notes TEXT,
    measured_by VARCHAR(100), -- self, practitioner
    
    INDEX idx_user_measurements (user_id, measurement_date)
);

-- Client communications
CREATE TABLE communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    communication_type VARCHAR(20), -- email, sms, whatsapp, in_app
    direction VARCHAR(10), -- inbound, outbound
    
    subject VARCHAR(255),
    message TEXT,
    
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE,
    
    -- For automated messages
    template_id VARCHAR(100),
    trigger_event VARCHAR(100), -- appointment_reminder, session_follow_up, etc
    
    INDEX idx_user_communications (user_id, sent_at)
);

-- Payment records
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    amount_gbp DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(50), -- card, cash, finance
    
    -- Package details
    package_type VARCHAR(100),
    sessions_included INTEGER,
    sessions_used INTEGER DEFAULT 0,
    
    -- Stripe/payment processor
    stripe_payment_id VARCHAR(255),
    stripe_customer_id VARCHAR(255),
    
    status VARCHAR(20) DEFAULT 'completed', -- pending, completed, refunded, failed
    
    INDEX idx_user_payments (user_id, payment_date)
);

-- Testimonials and reviews
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review TEXT,
    
    -- Before/after photos
    before_photo_id UUID REFERENCES progress_photos(id),
    after_photo_id UUID REFERENCES progress_photos(id),
    
    -- Consent
    consent_to_publish BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT false,
    published_date DATE,
    
    -- Display options
    display_name VARCHAR(100), -- "Sarah B." or "Anonymous"
    verified_purchase BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_published_testimonials (published, rating)
);

-- Audit log for GDPR compliance
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    action VARCHAR(100) NOT NULL, -- login, logout, data_export, data_deletion, etc
    entity_type VARCHAR(50), -- user, photo, appointment, etc
    entity_id UUID,
    
    ip_address INET,
    user_agent TEXT,
    
    occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional context
    metadata JSONB,
    
    INDEX idx_audit_user (user_id, occurred_at),
    INDEX idx_audit_action (action, occurred_at)
);

-- Partner clinics for referrals
CREATE TABLE partner_clinics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    clinic_name VARCHAR(255) NOT NULL,
    
    -- Contact details
    address TEXT,
    postcode VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    
    -- Specializations
    treatments_offered JSONB, -- ["morpheus8", "hifu", "surgery"]
    
    -- Referral tracking
    referral_commission_percentage DECIMAL(5,2),
    total_referrals_sent INTEGER DEFAULT 0,
    total_referrals_converted INTEGER DEFAULT 0,
    
    active BOOLEAN DEFAULT true,
    
    INDEX idx_partner_postcode (postcode)
);

-- Functions for data integrity

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- GDPR data export function
CREATE OR REPLACE FUNCTION export_user_data(user_email VARCHAR)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'user', row_to_json(u.*),
        'assessments', json_agg(DISTINCT a.*),
        'photos', json_agg(DISTINCT p.*),
        'sessions', json_agg(DISTINCT s.*),
        'measurements', json_agg(DISTINCT m.*)
    ) INTO result
    FROM users u
    LEFT JOIN assessments a ON u.id = a.user_id
    LEFT JOIN progress_photos p ON u.id = p.user_id
    LEFT JOIN treatment_sessions s ON u.id = s.user_id
    LEFT JOIN body_measurements m ON u.id = m.user_id
    WHERE u.email = user_email
    GROUP BY u.id;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- GDPR right to be forgotten
CREATE OR REPLACE FUNCTION delete_user_data(user_email VARCHAR)
RETURNS BOOLEAN AS $$
BEGIN
    -- Log the deletion request first
    INSERT INTO audit_log (action, entity_type, metadata)
    SELECT 'gdpr_deletion_requested', 'user', 
           json_build_object('email', user_email, 'timestamp', CURRENT_TIMESTAMP)
    FROM users WHERE email = user_email;
    
    -- Delete all user data (cascades through foreign keys)
    DELETE FROM users WHERE email = user_email;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Indexes for performance
CREATE INDEX idx_users_created ON users(created_at DESC);
CREATE INDEX idx_photos_recent ON progress_photos(upload_date DESC);
CREATE INDEX idx_sessions_upcoming ON treatment_sessions(session_date) 
    WHERE status = 'scheduled' AND session_date > CURRENT_TIMESTAMP;