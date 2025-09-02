-- Skulpt Feedback & Feature Development System
-- This powers continuous improvement and innovation

-- Feedback categories and types
CREATE TYPE feedback_category AS ENUM (
    'bug',
    'feature_request', 
    'improvement',
    'ui_ux',
    'performance',
    'content',
    'assessment_tool',
    'photo_analysis',
    'treatment_experience',
    'general'
);

CREATE TYPE feedback_status AS ENUM (
    'new',
    'acknowledged',
    'in_review',
    'planned',
    'in_development',
    'testing',
    'deployed',
    'rejected',
    'duplicate'
);

CREATE TYPE priority_level AS ENUM (
    'critical',
    'high',
    'medium',
    'low'
);

-- Main feedback table
CREATE TABLE feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Feedback details
    category feedback_category NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    
    -- Context
    page_url VARCHAR(500),
    user_agent TEXT,
    device_info JSONB, -- screen size, OS, browser, etc
    session_id VARCHAR(255),
    
    -- Screenshots/attachments via Cloudinary
    attachments JSONB, -- Array of Cloudinary URLs
    
    -- Status tracking
    status feedback_status DEFAULT 'new',
    priority priority_level DEFAULT 'medium',
    
    -- Sentiment analysis (for future AI integration)
    sentiment_score DECIMAL(3,2), -- -1 to 1 scale
    emotion_tags JSONB, -- ["frustrated", "excited", "confused"]
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    
    -- Team handling
    assigned_to VARCHAR(100),
    team_notes TEXT,
    
    -- User communication
    user_notified BOOLEAN DEFAULT false,
    response_sent TEXT,
    response_sent_at TIMESTAMP WITH TIME ZONE,
    
    INDEX idx_feedback_status (status, priority),
    INDEX idx_feedback_user (user_id),
    INDEX idx_feedback_category (category),
    INDEX idx_feedback_created (created_at DESC)
);

-- Feature requests specific table
CREATE TABLE feature_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE,
    
    -- Feature details
    feature_name VARCHAR(255) NOT NULL,
    user_story TEXT, -- "As a user, I want to..."
    acceptance_criteria JSONB, -- Array of criteria
    
    -- Business case
    problem_statement TEXT,
    proposed_solution TEXT,
    expected_impact TEXT,
    
    -- Voting and popularity
    vote_count INTEGER DEFAULT 0,
    unique_requesters INTEGER DEFAULT 1,
    
    -- Implementation details
    estimated_effort VARCHAR(20), -- XS, S, M, L, XL
    technical_notes TEXT,
    design_required BOOLEAN DEFAULT false,
    
    -- Release planning
    target_release VARCHAR(20),
    actual_release VARCHAR(20),
    
    INDEX idx_feature_votes (vote_count DESC)
);

-- User votes for features
CREATE TABLE feature_votes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feature_request_id UUID REFERENCES feature_requests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    comment TEXT,
    
    UNIQUE(feature_request_id, user_id) -- One vote per user per feature
);

-- Bug reports specific table
CREATE TABLE bug_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feedback_id UUID REFERENCES feedback(id) ON DELETE CASCADE,
    
    -- Bug details
    severity priority_level NOT NULL,
    reproducible BOOLEAN,
    frequency VARCHAR(50), -- always, sometimes, once
    
    -- Steps to reproduce
    steps_to_reproduce JSONB, -- Array of steps
    expected_behavior TEXT,
    actual_behavior TEXT,
    
    -- Technical details
    error_message TEXT,
    stack_trace TEXT,
    console_logs JSONB,
    network_logs JSONB,
    
    -- Environment
    browser VARCHAR(100),
    browser_version VARCHAR(20),
    operating_system VARCHAR(100),
    screen_resolution VARCHAR(20),
    
    -- Fix details
    root_cause TEXT,
    fix_description TEXT,
    fixed_in_version VARCHAR(20),
    
    INDEX idx_bug_severity (severity, status)
);

-- AI Photo Analysis Feedback (preparing for future)
CREATE TABLE photo_analysis_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    photo_id UUID REFERENCES progress_photos(id) ON DELETE CASCADE,
    
    -- AI Analysis results
    ai_model_version VARCHAR(20),
    analysis_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Skin analysis scores
    skin_laxity_score DECIMAL(5,2), -- 0-100
    skin_texture_score DECIMAL(5,2), -- 0-100
    pigmentation_score DECIMAL(5,2), -- 0-100
    vascularity_score DECIMAL(5,2), -- 0-100
    
    -- Detected issues
    detected_conditions JSONB, -- ["mild_laxity", "stretch_marks", "cellulite"]
    confidence_scores JSONB, -- {"mild_laxity": 0.92, "stretch_marks": 0.78}
    
    -- Recommendations
    ai_recommended_treatments JSONB,
    estimated_sessions INTEGER,
    priority_areas JSONB,
    
    -- User feedback on AI analysis
    accuracy_rating INTEGER CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
    user_agrees BOOLEAN,
    user_comments TEXT,
    
    -- Practitioner validation
    practitioner_validated BOOLEAN DEFAULT false,
    practitioner_adjustments JSONB,
    validated_by VARCHAR(100),
    validated_at TIMESTAMP WITH TIME ZONE,
    
    INDEX idx_photo_analysis (photo_id),
    INDEX idx_ai_accuracy (accuracy_rating)
);

-- In-app feedback widget responses
CREATE TABLE feedback_widget (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Quick feedback
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    emoji VARCHAR(20), -- 😍, 😊, 😐, 😕, 😠
    
    -- Context
    page_url VARCHAR(500),
    feature_area VARCHAR(100), -- assessment, dashboard, booking, etc
    
    -- Optional comment
    comment TEXT,
    
    -- Follow-up
    wants_response BOOLEAN DEFAULT false,
    responded BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_widget_rating (rating, created_at DESC)
);

-- NPS (Net Promoter Score) surveys
CREATE TABLE nps_surveys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Core NPS question
    likelihood_score INTEGER CHECK (likelihood_score >= 0 AND likelihood_score <= 10),
    
    -- Follow-up questions
    what_went_well TEXT,
    what_could_improve TEXT,
    
    -- Categorization
    promoter_type VARCHAR(20), -- promoter (9-10), passive (7-8), detractor (0-6)
    
    -- Context
    survey_trigger VARCHAR(50), -- post_treatment, milestone, periodic
    sessions_completed INTEGER,
    
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP WITH TIME ZONE,
    
    INDEX idx_nps_score (likelihood_score),
    INDEX idx_nps_date (responded_at DESC)
);

-- Improvement suggestions from staff
CREATE TABLE staff_suggestions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    staff_name VARCHAR(100),
    staff_role VARCHAR(100),
    
    -- Suggestion details
    category VARCHAR(50),
    title VARCHAR(255),
    description TEXT,
    
    -- Impact assessment
    expected_benefit TEXT,
    implementation_complexity VARCHAR(20), -- simple, moderate, complex
    
    -- Status
    status feedback_status DEFAULT 'new',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_staff_suggestions (status, created_at DESC)
);

-- Analytics on feedback trends
CREATE TABLE feedback_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Time period
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    
    -- Metrics
    total_feedback_items INTEGER,
    avg_sentiment_score DECIMAL(3,2),
    
    -- By category
    bugs_reported INTEGER,
    features_requested INTEGER,
    improvements_suggested INTEGER,
    
    -- Resolution metrics
    avg_resolution_hours DECIMAL(10,2),
    resolution_rate DECIMAL(5,2), -- percentage
    
    -- User satisfaction
    avg_rating DECIMAL(3,2),
    nps_score INTEGER,
    
    -- Top issues
    top_issues JSONB, -- Array of most reported issues
    trending_features JSONB, -- Array of most requested features
    
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_analytics_period (period_start, period_end)
);

-- Changelog for users to see improvements
CREATE TABLE changelog (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    version VARCHAR(20) NOT NULL,
    release_date DATE NOT NULL,
    
    -- Changes
    new_features JSONB, -- Array of feature descriptions
    improvements JSONB, -- Array of improvements
    bug_fixes JSONB, -- Array of fixed bugs
    
    -- Related feedback items
    resolved_feedback_ids JSONB, -- Array of feedback IDs addressed
    
    -- Visibility
    published BOOLEAN DEFAULT false,
    announcement_sent BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_changelog_date (release_date DESC)
);

-- Functions for feedback management

-- Calculate NPS score
CREATE OR REPLACE FUNCTION calculate_nps(start_date DATE, end_date DATE)
RETURNS INTEGER AS $$
DECLARE
    promoters INTEGER;
    detractors INTEGER;
    total INTEGER;
BEGIN
    SELECT COUNT(*) INTO promoters
    FROM nps_surveys
    WHERE likelihood_score >= 9
    AND responded_at BETWEEN start_date AND end_date;
    
    SELECT COUNT(*) INTO detractors
    FROM nps_surveys
    WHERE likelihood_score <= 6
    AND responded_at BETWEEN start_date AND end_date;
    
    SELECT COUNT(*) INTO total
    FROM nps_surveys
    WHERE responded_at BETWEEN start_date AND end_date;
    
    IF total = 0 THEN
        RETURN 0;
    END IF;
    
    RETURN ((promoters - detractors) * 100 / total);
END;
$$ LANGUAGE plpgsql;

-- Get trending features
CREATE OR REPLACE FUNCTION get_trending_features(limit_count INTEGER DEFAULT 10)
RETURNS TABLE(
    feature_name VARCHAR,
    vote_count INTEGER,
    unique_requesters INTEGER,
    last_requested TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        fr.feature_name,
        fr.vote_count,
        fr.unique_requesters,
        MAX(f.created_at) as last_requested
    FROM feature_requests fr
    JOIN feedback f ON fr.feedback_id = f.id
    WHERE f.status NOT IN ('deployed', 'rejected')
    GROUP BY fr.id, fr.feature_name, fr.vote_count, fr.unique_requesters
    ORDER BY fr.vote_count DESC, fr.unique_requesters DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Auto-categorize feedback using keywords (preparation for AI)
CREATE OR REPLACE FUNCTION auto_categorize_feedback()
RETURNS TRIGGER AS $$
BEGIN
    -- Simple keyword matching (will be replaced with AI)
    IF NEW.description ILIKE '%crash%' OR NEW.description ILIKE '%error%' OR NEW.description ILIKE '%broken%' THEN
        NEW.category = 'bug';
        NEW.priority = 'high';
    ELSIF NEW.description ILIKE '%slow%' OR NEW.description ILIKE '%loading%' OR NEW.description ILIKE '%performance%' THEN
        NEW.category = 'performance';
    ELSIF NEW.description ILIKE '%add%' OR NEW.description ILIKE '%feature%' OR NEW.description ILIKE '%would be nice%' THEN
        NEW.category = 'feature_request';
    ELSIF NEW.description ILIKE '%photo%' OR NEW.description ILIKE '%upload%' OR NEW.description ILIKE '%image%' THEN
        NEW.category = 'photo_analysis';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_categorize_feedback_trigger
BEFORE INSERT ON feedback
FOR EACH ROW
EXECUTE FUNCTION auto_categorize_feedback();

-- Weekly feedback summary
CREATE OR REPLACE FUNCTION generate_weekly_feedback_summary()
RETURNS JSON AS $$
DECLARE
    summary JSON;
BEGIN
    SELECT json_build_object(
        'period', json_build_object(
            'start', CURRENT_DATE - INTERVAL '7 days',
            'end', CURRENT_DATE
        ),
        'total_feedback', COUNT(*),
        'by_category', json_object_agg(category, count),
        'avg_sentiment', AVG(sentiment_score),
        'top_features', (
            SELECT json_agg(feature_name)
            FROM (
                SELECT feature_name
                FROM feature_requests fr
                JOIN feedback f ON fr.feedback_id = f.id
                WHERE f.created_at > CURRENT_DATE - INTERVAL '7 days'
                ORDER BY fr.vote_count DESC
                LIMIT 5
            ) top
        ),
        'critical_bugs', (
            SELECT COUNT(*)
            FROM bug_reports br
            JOIN feedback f ON br.feedback_id = f.id
            WHERE br.severity = 'critical'
            AND f.status != 'resolved'
        ),
        'nps_score', calculate_nps(
            CURRENT_DATE - INTERVAL '7 days',
            CURRENT_DATE
        )
    ) INTO summary
    FROM feedback
    WHERE created_at > CURRENT_DATE - INTERVAL '7 days'
    GROUP BY category;
    
    RETURN summary;
END;
$$ LANGUAGE plpgsql;