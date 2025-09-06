// Database Initialization Script for Neon
// Run this once to set up all tables and functions

import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function initializeDatabase() {
    console.log('🚀 Initializing Skulpt database...');
    
    try {
        // Create users table
        await sql`
            CREATE TABLE IF NOT EXISTS users (
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
                account_status VARCHAR(20) DEFAULT 'active',
                gdpr_consent BOOLEAN DEFAULT true,
                gdpr_consent_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Users table created');
        
        // Create assessments table
        await sql`
            CREATE TABLE IF NOT EXISTS assessments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                assessment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                weight_loss_method VARCHAR(50),
                weight_lost_kg DECIMAL(5,2),
                weight_loss_timeframe_months INTEGER,
                skin_laxity_score INTEGER,
                primary_concern VARCHAR(50),
                problem_areas JSONB,
                recommended_treatment VARCHAR(50),
                match_score INTEGER,
                qualification_status VARCHAR(20),
                ai_insights JSONB,
                conversation_log JSONB
            )
        `;
        console.log('✅ Assessments table created');
        
        // Create progress_photos table
        await sql`
            CREATE TABLE IF NOT EXISTS progress_photos (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                cloudinary_public_id VARCHAR(255) UNIQUE NOT NULL,
                cloudinary_url VARCHAR(500) NOT NULL,
                cloudinary_secure_url VARCHAR(500) NOT NULL,
                photo_type VARCHAR(20),
                session_number INTEGER,
                body_area VARCHAR(50),
                angle VARCHAR(20),
                upload_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                measurements JSONB,
                weight_kg DECIMAL(5,2),
                visibility VARCHAR(20) DEFAULT 'private',
                consent_for_marketing BOOLEAN DEFAULT false,
                ai_analysis JSONB
            )
        `;
        console.log('✅ Progress photos table created');
        
        // Create treatment_sessions table
        await sql`
            CREATE TABLE IF NOT EXISTS treatment_sessions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                session_number INTEGER NOT NULL,
                session_date TIMESTAMP WITH TIME ZONE,
                session_type VARCHAR(50),
                areas_treated JSONB,
                duration_minutes INTEGER,
                settings_used JSONB,
                practitioner_id UUID,
                practitioner_notes TEXT,
                pain_level INTEGER,
                satisfaction_level INTEGER,
                side_effects JSONB,
                immediate_results TEXT,
                photos_taken BOOLEAN DEFAULT false,
                status VARCHAR(20) DEFAULT 'scheduled'
            )
        `;
        console.log('✅ Treatment sessions table created');
        
        // Create appointments table
        await sql`
            CREATE TABLE IF NOT EXISTS appointments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                appointment_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
                appointment_type VARCHAR(50),
                duration_minutes INTEGER DEFAULT 60,
                status VARCHAR(20) DEFAULT 'confirmed',
                reminder_sent BOOLEAN DEFAULT false,
                reminder_sent_at TIMESTAMP WITH TIME ZONE,
                calendar_event_id VARCHAR(255),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                cancelled_at TIMESTAMP WITH TIME ZONE,
                cancellation_reason TEXT
            )
        `;
        console.log('✅ Appointments table created');
        
        // Create body_measurements table
        await sql`
            CREATE TABLE IF NOT EXISTS body_measurements (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE CASCADE,
                measurement_date DATE NOT NULL,
                weight_kg DECIMAL(5,2),
                waist_cm DECIMAL(5,2),
                hips_cm DECIMAL(5,2),
                chest_cm DECIMAL(5,2),
                arms_cm DECIMAL(5,2),
                thighs_cm DECIMAL(5,2),
                body_fat_percentage DECIMAL(4,2),
                muscle_mass_kg DECIMAL(5,2),
                skin_fold_measurements JSONB,
                skin_elasticity_score INTEGER,
                notes TEXT,
                measured_by VARCHAR(100)
            )
        `;
        console.log('✅ Body measurements table created');
        
        // Create feedback table
        await sql`
            CREATE TYPE feedback_category AS ENUM (
                'bug', 'feature_request', 'improvement', 'ui_ux', 
                'performance', 'content', 'assessment_tool', 
                'photo_analysis', 'treatment_experience', 'general'
            )
        `.catch(() => console.log('Feedback category type already exists'));
        
        await sql`
            CREATE TYPE feedback_status AS ENUM (
                'new', 'acknowledged', 'in_review', 'planned', 
                'in_development', 'testing', 'deployed', 'rejected', 'duplicate'
            )
        `.catch(() => console.log('Feedback status type already exists'));
        
        await sql`
            CREATE TYPE priority_level AS ENUM ('critical', 'high', 'medium', 'low')
        `.catch(() => console.log('Priority level type already exists'));
        
        await sql`
            CREATE TABLE IF NOT EXISTS feedback (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID REFERENCES users(id) ON DELETE SET NULL,
                category feedback_category NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                page_url VARCHAR(500),
                user_agent TEXT,
                device_info JSONB,
                session_id VARCHAR(255),
                attachments JSONB,
                status feedback_status DEFAULT 'new',
                priority priority_level DEFAULT 'medium',
                sentiment_score DECIMAL(3,2),
                emotion_tags JSONB,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                acknowledged_at TIMESTAMP WITH TIME ZONE,
                resolved_at TIMESTAMP WITH TIME ZONE,
                assigned_to VARCHAR(100),
                team_notes TEXT,
                user_notified BOOLEAN DEFAULT false,
                response_sent TEXT,
                response_sent_at TIMESTAMP WITH TIME ZONE
            )
        `;
        console.log('✅ Feedback table created');
        
        // Create indexes for performance
        await sql`
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
            CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone);
            CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id);
            CREATE INDEX IF NOT EXISTS idx_photos_user ON progress_photos(user_id, upload_date);
            CREATE INDEX IF NOT EXISTS idx_sessions_user ON treatment_sessions(user_id, session_date);
            CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id, appointment_datetime);
        `;
        console.log('✅ Indexes created');
        
        // Create update trigger function
        await sql`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        `;
        
        await sql`
            CREATE TRIGGER update_users_updated_at 
            BEFORE UPDATE ON users
            FOR EACH ROW 
            EXECUTE FUNCTION update_updated_at_column();
        `.catch(() => console.log('Trigger already exists'));
        
        console.log('✅ Triggers created');
        
        // Insert sample data (optional)
        const createSampleData = false; // Set to true to create sample data
        
        if (createSampleData) {
            const [user] = await sql`
                INSERT INTO users (email, first_name, last_name, phone, postcode)
                VALUES ('test@skintight.uk', 'Test', 'User', '07700000000', 'PE1 1AA')
                RETURNING id
            `;
            
            await sql`
                INSERT INTO assessments (
                    user_id, 
                    weight_loss_method, 
                    weight_lost_kg, 
                    skin_laxity_score,
                    recommended_treatment,
                    match_score
                )
                VALUES (
                    ${user.id},
                    'ozempic',
                    25,
                    65,
                    'ProMax Lipo',
                    92
                )
            `;
            
            console.log('✅ Sample data created');
        }
        
        console.log('\n🎉 Database initialization complete!');
        console.log('Your Skulpt database is ready to use.');
        
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
}

// Run initialization
initializeDatabase();