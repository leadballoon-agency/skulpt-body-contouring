// Journey Recommendation Engine - Background Testing
// This runs alongside current system without affecting it

const TREATMENT_CATALOG = {
  // Your treatments
  'promax_lipo': {
    name: 'ProMax Lipo',
    provider: 'Skulpt',
    type: 'skin_tightening',
    best_for: ['loose_skin', 'post_weight_loss', 'cellulite'],
    sessions_needed: 6,
    price_per_session: 400,
    total_price: 2400,
    duration_weeks: 6,
    downtime: 'none',
    effectiveness: 0.92
  },
  
  // Partner treatments
  'morpheus8': {
    name: 'Morpheus8',
    provider: 'partner',
    type: 'rf_microneedling',
    best_for: ['texture', 'stretch_marks', 'deep_wrinkles'],
    sessions_needed: 3,
    price_per_session: 600,
    total_price: 1800,
    duration_weeks: 12,
    downtime: '2-3 days',
    effectiveness: 0.88,
    commission_rate: 0.15
  },
  
  'sylfirm_x': {
    name: 'Sylfirm X',
    provider: 'partner',
    type: 'rf_microneedling',
    best_for: ['pigmentation', 'melasma', 'rosacea'],
    sessions_needed: 4,
    price_per_session: 450,
    total_price: 1800,
    duration_weeks: 16,
    downtime: 'minimal',
    effectiveness: 0.85,
    commission_rate: 0.15
  },
  
  'emsculpt_neo': {
    name: 'EmSculpt Neo',
    provider: 'partner',
    type: 'muscle_building',
    best_for: ['muscle_definition', 'abs', 'buttocks'],
    sessions_needed: 4,
    price_per_session: 500,
    total_price: 2000,
    duration_weeks: 4,
    downtime: 'none',
    effectiveness: 0.83,
    commission_rate: 0.20
  },
  
  'coolsculpting': {
    name: 'CoolSculpting',
    provider: 'partner',
    type: 'fat_reduction',
    best_for: ['stubborn_fat', 'double_chin', 'love_handles'],
    sessions_needed: 2,
    price_per_session: 700,
    total_price: 1400,
    duration_weeks: 12,
    downtime: 'none',
    effectiveness: 0.75,
    commission_rate: 0.18
  },
  
  'prp_hair': {
    name: 'PRP Hair Restoration',
    provider: 'partner',
    type: 'hair_restoration',
    best_for: ['hair_loss', 'thinning'],
    sessions_needed: 6,
    price_per_session: 350,
    total_price: 2100,
    duration_weeks: 24,
    downtime: 'none',
    effectiveness: 0.70,
    commission_rate: 0.20
  }
};

// Journey Templates based on client profiles
const JOURNEY_TEMPLATES = {
  'glp1_transformation': {
    name: 'GLP-1 Weight Loss Recovery',
    description: 'Complete transformation after Ozempic/Mounjaro weight loss',
    stages: [
      {
        order: 1,
        name: 'Skin Tightening Phase',
        treatments: ['promax_lipo'],
        duration_weeks: 6,
        goals: ['tighten_loose_skin', 'improve_elasticity']
      },
      {
        order: 2,
        name: 'Texture Refinement',
        treatments: ['morpheus8'],
        duration_weeks: 12,
        goals: ['smooth_texture', 'reduce_stretch_marks']
      },
      {
        order: 3,
        name: 'Muscle Definition',
        treatments: ['emsculpt_neo'],
        duration_weeks: 4,
        goals: ['build_muscle', 'enhance_contours']
      }
    ],
    total_investment: 6200,
    total_duration_weeks: 22,
    expected_satisfaction: 0.94
  },
  
  'mommy_makeover_non_surgical': {
    name: 'Non-Surgical Mommy Makeover',
    description: 'Restore your pre-baby body without surgery',
    stages: [
      {
        order: 1,
        name: 'Abdomen Restoration',
        treatments: ['promax_lipo', 'emsculpt_neo'],
        duration_weeks: 10,
        goals: ['tighten_abdomen', 'rebuild_core']
      },
      {
        order: 2,
        name: 'Skin Quality',
        treatments: ['morpheus8'],
        duration_weeks: 12,
        goals: ['reduce_stretch_marks', 'improve_texture']
      }
    ],
    total_investment: 6200,
    total_duration_weeks: 22,
    expected_satisfaction: 0.91
  },
  
  'executive_refresh': {
    name: 'Executive Refresh Package',
    description: 'Look as sharp as your business acumen',
    stages: [
      {
        order: 1,
        name: 'Body Contouring',
        treatments: ['coolsculpting', 'promax_lipo'],
        duration_weeks: 12,
        goals: ['reduce_stubborn_fat', 'tighten_skin']
      },
      {
        order: 2,
        name: 'Optional: Hair Restoration',
        treatments: ['prp_hair'],
        duration_weeks: 24,
        goals: ['restore_hairline', 'increase_density']
      }
    ],
    total_investment: 3800,
    total_duration_weeks: 36,
    expected_satisfaction: 0.88
  }
};

// Intelligent Journey Builder
export function buildPersonalizedJourney(assessment) {
  const journey = {
    client_name: assessment.name,
    client_id: assessment.email,
    created_at: new Date().toISOString(),
    assessment_data: assessment,
    recommended_journey: null,
    custom_stages: [],
    total_investment: 0,
    potential_commission: 0,
    timeline_weeks: 0,
    priority_level: 'standard',
    follow_up_strategy: 'standard_nurture'
  };

  // Determine journey type based on assessment
  if ((assessment.method === 'ozempic' || assessment.method === 'mounjaro') && 
      assessment.skinFeel === 'loose') {
    journey.recommended_journey = JOURNEY_TEMPLATES.glp1_transformation;
    journey.priority_level = 'high';
    journey.follow_up_strategy = 'aggressive_glp1';
  } else if (assessment.concern === 'post_pregnancy') {
    journey.recommended_journey = JOURNEY_TEMPLATES.mommy_makeover_non_surgical;
    journey.priority_level = 'high';
    journey.follow_up_strategy = 'empathetic_mommy';
  } else {
    // Build custom journey based on specific needs
    journey.custom_stages = buildCustomStages(assessment);
  }

  // Calculate totals
  if (journey.recommended_journey) {
    journey.total_investment = journey.recommended_journey.total_investment;
    journey.timeline_weeks = journey.recommended_journey.total_duration_weeks;
    
    // Calculate potential commission from partner treatments
    journey.recommended_journey.stages.forEach(stage => {
      stage.treatments.forEach(treatmentId => {
        const treatment = TREATMENT_CATALOG[treatmentId];
        if (treatment.provider === 'partner' && treatment.commission_rate) {
          journey.potential_commission += treatment.total_price * treatment.commission_rate;
        }
      });
    });
  }

  // Add journey scoring
  journey.client_lifetime_value = calculateCLV(journey);
  journey.conversion_probability = calculateConversionProbability(assessment);
  journey.urgency_score = calculateUrgencyScore(assessment);

  return journey;
}

// Build custom journey stages based on specific assessment
function buildCustomStages(assessment) {
  const stages = [];
  let stageOrder = 1;

  // Primary concern determines first stage
  if (assessment.skinFeel === 'loose') {
    stages.push({
      order: stageOrder++,
      name: 'Initial Skin Tightening',
      treatments: ['promax_lipo'],
      duration_weeks: 6,
      investment: 2400
    });
  }

  if (assessment.goal === 'spots') {
    stages.push({
      order: stageOrder++,
      name: 'Pigmentation Treatment',
      treatments: ['sylfirm_x'],
      duration_weeks: 16,
      investment: 1800
    });
  }

  if (assessment.hasStretchMarks) {
    stages.push({
      order: stageOrder++,
      name: 'Stretch Mark Reduction',
      treatments: ['morpheus8'],
      duration_weeks: 12,
      investment: 1800
    });
  }

  // Add muscle building for those ready for next level
  if (assessment.commitment === 'ready' && assessment.goal === 'tone') {
    stages.push({
      order: stageOrder++,
      name: 'Muscle Enhancement',
      treatments: ['emsculpt_neo'],
      duration_weeks: 4,
      investment: 2000
    });
  }

  return stages;
}

// Calculate Customer Lifetime Value
function calculateCLV(journey) {
  const baseValue = journey.total_investment;
  const maintenanceValue = 150 * 12; // Monthly maintenance for a year
  const referralValue = 500 * 2; // Average 2 referrals
  const repeatTreatmentValue = baseValue * 0.3; // 30% come back for more
  
  return baseValue + maintenanceValue + referralValue + repeatTreatmentValue;
}

// Calculate conversion probability based on assessment
function calculateConversionProbability(assessment) {
  let probability = 0.3; // Base probability
  
  // Factors that increase conversion
  if (assessment.method === 'ozempic' || assessment.method === 'mounjaro') {
    probability += 0.25; // GLP-1 users are highly motivated
  }
  
  if (assessment.commitment === 'ready') {
    probability += 0.2;
  }
  
  if (assessment.skinFeel === 'loose') {
    probability += 0.15; // Perfect fit for our services
  }
  
  if (assessment.timeline === 'asap') {
    probability += 0.1; // Urgent need
  }
  
  return Math.min(probability, 0.95); // Cap at 95%
}

// Calculate urgency score for follow-up prioritization
function calculateUrgencyScore(assessment) {
  let score = 0;
  
  if (assessment.timeline === 'asap') score += 40;
  else if (assessment.timeline === 'soon') score += 25;
  else score += 10;
  
  if (assessment.commitment === 'ready') score += 30;
  else if (assessment.commitment === 'price') score += 20;
  else score += 10;
  
  if (assessment.method === 'ozempic' || assessment.method === 'mounjaro') {
    score += 20; // High-value segment
  }
  
  return score;
}

// Export for API use
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const assessment = req.body;
    const journey = buildPersonalizedJourney(assessment);
    
    // Store journey in database (hidden from current system)
    // This allows you to analyze journey recommendations without affecting current flow
    
    return res.status(200).json({
      success: true,
      journey: journey,
      debug: {
        total_treatments: Object.keys(TREATMENT_CATALOG).length,
        journey_templates: Object.keys(JOURNEY_TEMPLATES).length,
        estimated_clv: journey.client_lifetime_value,
        conversion_probability: journey.conversion_probability
      }
    });
  } catch (error) {
    console.error('Journey engine error:', error);
    return res.status(500).json({ error: 'Failed to build journey' });
  }
}