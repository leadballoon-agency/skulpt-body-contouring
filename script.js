// Treatment Database
const treatments = {
    promaxlipo: {
        name: "ProMax Lipo",
        description: "Triple-action fat reduction & skin tightening",
        bestFor: ["glp1", "ozempic", "moderate", "severe", "abdomen", "flanks", "stubborn"],
        effectiveness: 96,
        sessions: 6,
        downtime: "None",
        celebrity: "Danielle Lloyd's choice",
        highlights: ["Ultrasound Cavitation", "RF Skin Tightening", "Lymphatic Drainage"]
    },
    morpheus8: {
        name: "Morpheus8",
        description: "Fractional RF microneedling",
        bestFor: ["severe", "cellulite", "crepey"],
        effectiveness: 95,
        sessions: 3,
        downtime: "2-3 days"
    },
    hifu: {
        name: "HIFU",
        description: "High-Intensity Focused Ultrasound",
        bestFor: ["moderate", "sagging", "flanks"],
        effectiveness: 88,
        sessions: 2,
        downtime: "None"
    },
    rf: {
        name: "Radio Frequency",
        description: "Deep tissue heating",
        bestFor: ["mild", "tightening", "arms"],
        effectiveness: 82,
        sessions: 6,
        downtime: "None"
    },
    cavitation: {
        name: "Fat Cavitation",
        description: "Ultrasound fat breakdown",
        bestFor: ["stubborn", "abdomen", "thighs"],
        effectiveness: 85,
        sessions: 8,
        downtime: "None"
    },
    co2laser: {
        name: "CO2 Laser",
        description: "Ablative skin resurfacing",
        bestFor: ["stretch", "scarring", "severe"],
        effectiveness: 92,
        sessions: 2,
        downtime: "5-7 days"
    },
    sylfirm: {
        name: "Sylfirm X",
        description: "Pulsed wave & continuous wave RF",
        bestFor: ["pigmentation", "melasma", "rosacea"],
        effectiveness: 87,
        sessions: 4,
        downtime: "1 day"
    }
};

// Assessment data
let assessmentData = {
    weightLoss: 15,
    timeframe: '',
    method: '',
    areas: [],
    severity: 'moderate',
    concerns: [],
    score: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    setupScrollEffects();
    animateStats();
});

// Navbar scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// Initialize animations
function initializeAnimations() {
    // Animate hero stats on load
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stat-card').forEach(stat => {
        observer.observe(stat);
    });
}

// Setup scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax for molecules
        document.querySelectorAll('.molecule').forEach((molecule, index) => {
            const speed = 0.5 + (index * 0.1);
            molecule.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Animate stats
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseFloat(stat.dataset.value);
        if (!target) return;
        
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.dataset.value.includes('.')) {
                stat.textContent = current.toFixed(1);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Start assessment
function startAssessment() {
    document.getElementById('assessment').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
    
    // Reset assessment
    resetAssessment();
}

// Reset assessment
function resetAssessment() {
    assessmentData = {
        weightLoss: 15,
        timeframe: '',
        method: '',
        areas: [],
        severity: 'moderate',
        concerns: [],
        score: 0
    };
    
    // Show first step
    showStep(1);
    updateProgress(20);
}

// Show specific step
function showStep(stepNumber) {
    document.querySelectorAll('.assessment-step').forEach(step => {
        step.classList.remove('active');
    });
    
    const targetStep = document.querySelector(`[data-step="${stepNumber}"]`);
    if (targetStep) {
        targetStep.classList.add('active');
    }
}

// Update progress bar
function updateProgress(percentage) {
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = `${percentage}%`;
}

// Update weight loss
function updateWeightLoss(value) {
    assessmentData.weightLoss = parseInt(value);
    document.getElementById('weightValue').textContent = value;
    
    // Update insights
    const insights = document.getElementById('weightInsights');
    let message = '';
    
    if (value < 10) {
        message = 'Mild weight loss - preventive treatment recommended';
    } else if (value < 20) {
        message = 'Significant weight loss - skin tightening highly recommended';
    } else if (value < 30) {
        message = 'Major weight loss - comprehensive treatment protocol needed';
    } else {
        message = 'Dramatic transformation - multi-modality approach essential';
    }
    
    insights.innerHTML = `<i class="fas fa-info-circle"></i><span>${message}</span>`;
}

// Select timeframe
function selectTimeframe(timeframe) {
    assessmentData.timeframe = timeframe;
    
    // Update UI
    document.querySelectorAll('.timeframe-option').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.timeframe-option').classList.add('selected');
}

// Next assessment step
function nextAssessmentStep() {
    if (assessmentData.weightLoss && assessmentData.timeframe) {
        showStep(2);
        updateProgress(40);
    }
}

// Select method
function selectMethod(method) {
    assessmentData.method = method;
    
    // Update UI
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.method-card').classList.add('selected');
    
    // Update insight
    const insight = document.getElementById('methodInsight');
    let insightHTML = '';
    
    switch(method) {
        case 'glp1':
            insightHTML = `
                <div class="insight-icon"><i class="fas fa-exclamation-circle"></i></div>
                <div class="insight-content">
                    <strong>GLP-1 Rapid Weight Loss Protocol</strong>
                    <p>Your skin needs extra support after GLP-1 medication. We'll focus on collagen stimulation and deep tissue tightening.</p>
                </div>
            `;
            break;
        case 'surgery':
            insightHTML = `
                <div class="insight-icon"><i class="fas fa-user-md"></i></div>
                <div class="insight-content">
                    <strong>Post-Bariatric Skin Recovery</strong>
                    <p>After surgical weight loss, we'll use our most powerful technologies for maximum skin retraction.</p>
                </div>
            `;
            break;
        case 'natural':
            insightHTML = `
                <div class="insight-icon"><i class="fas fa-leaf"></i></div>
                <div class="insight-content">
                    <strong>Natural Weight Loss Support</strong>
                    <p>Your gradual weight loss means better skin elasticity. We'll enhance and accelerate your natural tightening.</p>
                </div>
            `;
            break;
    }
    
    insight.innerHTML = insightHTML;
    
    // Auto-advance
    setTimeout(() => {
        showStep(3);
        updateProgress(60);
    }, 1500);
}

// Toggle body area
function toggleArea(area) {
    const index = assessmentData.areas.indexOf(area);
    
    if (index > -1) {
        assessmentData.areas.splice(index, 1);
    } else {
        assessmentData.areas.push(area);
    }
    
    // Update visual state
    updateAreaVisuals();
    
    // Enable/disable continue button
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = assessmentData.areas.length === 0;
}

// Update area visuals
function updateAreaVisuals() {
    // Update SVG zones
    document.querySelectorAll('.body-zone').forEach(zone => {
        const area = zone.dataset.area;
        if (assessmentData.areas.includes(area)) {
            zone.classList.add('selected');
        } else {
            zone.classList.remove('selected');
        }
    });
    
    // Update selected areas list
    const listElement = document.getElementById('selectedAreasList');
    if (assessmentData.areas.length === 0) {
        listElement.innerHTML = '<span class="no-selection">Click body areas above</span>';
    } else {
        listElement.innerHTML = assessmentData.areas.map(area => 
            `<span class="area-chip">${area.charAt(0).toUpperCase() + area.slice(1)}</span>`
        ).join('');
    }
}

// Set severity
function setSeverity(severity) {
    assessmentData.severity = severity;
    
    // Update UI
    document.querySelectorAll('.severity-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.severity-btn').classList.add('active');
}

// Next step from areas
function nextStep() {
    if (assessmentData.areas.length > 0) {
        showStep(4);
        updateProgress(80);
    }
}

// Toggle concern
function toggleConcern(concern) {
    const index = assessmentData.concerns.indexOf(concern);
    
    if (index > -1) {
        assessmentData.concerns.splice(index, 1);
    } else {
        assessmentData.concerns.push(concern);
    }
    
    // Update UI
    const card = document.querySelector(`[data-concern="${concern}"]`);
    card.classList.toggle('selected');
}

// Calculate results
function calculateResults() {
    // Show loading animation
    const btn = event.target.closest('.btn-analyze');
    btn.classList.add('loading');
    
    // Calculate qualification score
    calculateQualificationScore();
    
    // Simulate processing
    setTimeout(() => {
        btn.classList.remove('loading');
        showStep('results');
        updateProgress(100);
        
        // Generate recommendations
        generateRecommendations();
        
        // Animate results
        animateResults();
    }, 2000);
}

// Calculate qualification score
function calculateQualificationScore() {
    let score = 70; // Base score
    
    // Weight loss factor
    if (assessmentData.weightLoss > 20) score += 15;
    else if (assessmentData.weightLoss > 10) score += 10;
    else score += 5;
    
    // Method factor
    if (assessmentData.method === 'glp1') score += 10;
    else if (assessmentData.method === 'surgery') score += 8;
    
    // Timeframe factor
    if (assessmentData.timeframe === '3months') score += 5;
    
    // Areas factor
    score += Math.min(assessmentData.areas.length * 2, 10);
    
    // Severity factor
    if (assessmentData.severity === 'severe') score += 5;
    
    // Cap at 98
    assessmentData.score = Math.min(score, 98);
}

// Generate recommendations
function generateRecommendations() {
    const container = document.getElementById('recommendedTreatments');
    let recommendations = [];
    
    // Smart matching algorithm - ProMax Lipo priority for GLP-1 patients
    if (assessmentData.method === 'glp1') {
        recommendations.push(treatments.promaxlipo); // Top priority for Ozempic/Mounjaro patients
        recommendations.push(treatments.morpheus8);
        recommendations.push(treatments.hifu);
    } else if (assessmentData.method === 'surgery') {
        recommendations.push(treatments.morpheus8);
        recommendations.push(treatments.promaxlipo);
        recommendations.push(treatments.hifu);
    }
    
    if (assessmentData.concerns.includes('cellulite')) {
        recommendations.push(treatments.morpheus8);
        recommendations.push(treatments.promaxlipo);
    }
    
    if (assessmentData.concerns.includes('stretch')) {
        recommendations.push(treatments.co2laser);
    }
    
    if (assessmentData.concerns.includes('stubborn')) {
        recommendations.push(treatments.promaxlipo); // ProMax Lipo excellent for stubborn fat
        recommendations.push(treatments.cavitation);
    }
    
    if (assessmentData.areas.includes('abdomen') || assessmentData.areas.includes('flanks')) {
        recommendations.push(treatments.promaxlipo); // ProMax Lipo ideal for these areas
        recommendations.push(treatments.hifu);
    }
    
    // Remove duplicates
    recommendations = [...new Map(recommendations.map(item => [item.name, item])).values()];
    
    // Limit to top 3
    recommendations = recommendations.slice(0, 3);
    
    // Generate HTML
    container.innerHTML = recommendations.map(treatment => `
        <div class="treatment-recommendation">
            <div class="treatment-name">${treatment.name}</div>
            <div class="treatment-desc">${treatment.description}</div>
            <div class="treatment-stats">
                <span>${treatment.effectiveness}% effective</span>
                <span>${treatment.sessions} sessions</span>
            </div>
        </div>
    `).join('');
    
    // Update pricing based on recommendations
    if (recommendations.length > 0) {
        document.getElementById('primaryTreatment').textContent = recommendations[0].name;
        if (recommendations.length > 1) {
            document.getElementById('secondaryTreatment').textContent = recommendations[1].name;
        }
    }
}

// Animate results
function animateResults() {
    // Animate score circle
    const scoreCircle = document.querySelector('.score-progress');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (assessmentData.score / 100) * circumference;
    
    scoreCircle.style.strokeDashoffset = offset;
    
    // Animate score number
    const scoreElement = document.querySelector('.score-number');
    let currentScore = 0;
    const increment = assessmentData.score / 50;
    
    const scoreTimer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= assessmentData.score) {
            currentScore = assessmentData.score;
            clearInterval(scoreTimer);
        }
        scoreElement.textContent = Math.floor(currentScore);
    }, 30);
    
    // Update score title based on score
    const scoreTitle = document.querySelector('.score-title');
    if (assessmentData.score >= 90) {
        scoreTitle.textContent = "Perfect Candidate for Treatment";
    } else if (assessmentData.score >= 80) {
        scoreTitle.textContent = "Excellent Candidate for Treatment";
    } else if (assessmentData.score >= 70) {
        scoreTitle.textContent = "Good Candidate for Treatment";
    }
}

// Open premium booking
function openPremiumBooking() {
    const modal = document.getElementById('bookingModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Pre-fill with assessment data
    populateBookingForm();
}

// Open booking modal
function openBooking() {
    openPremiumBooking();
}

// Close booking
function closeBooking() {
    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Populate booking form with assessment data
function populateBookingForm() {
    // This would normally pre-fill form fields based on assessment
    console.log('Assessment data for booking:', assessmentData);
}

// Handle booking form submission
document.getElementById('bookingForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(this);
    const bookingData = {};
    formData.forEach((value, key) => {
        bookingData[key] = value;
    });
    
    // Combine with assessment data
    const fullData = {
        ...bookingData,
        assessment: assessmentData,
        timestamp: new Date().toISOString(),
        qualificationScore: assessmentData.score
    };
    
    // Here you would normally send to backend
    console.log('Booking submission:', fullData);
    
    // Show success message
    showBookingSuccess();
});

// Show booking success
function showBookingSuccess() {
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="width: 80px; height: 80px; background: var(--gradient-luxury); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                <i class="fas fa-check" style="color: white; font-size: 2rem;"></i>
            </div>
            <h2 style="font-family: var(--font-heading); color: var(--charcoal); margin-bottom: 1rem;">Consultation Confirmed!</h2>
            <p style="color: var(--gray-medium); margin-bottom: 1.5rem;">
                Your personalized treatment plan has been created. Check your email for confirmation and preparation instructions.
            </p>
            <div style="background: linear-gradient(135deg, rgba(184, 134, 11, 0.05) 0%, rgba(232, 180, 184, 0.05) 100%); border-radius: 15px; padding: 1rem; margin-bottom: 1.5rem;">
                <p style="font-weight: 600; color: var(--gold); margin-bottom: 0.5rem;">Your Qualification Score: ${assessmentData.score}/100</p>
                <p style="font-size: 0.85rem; color: var(--gray-dark);">This exceptional score qualifies you for our premium treatment packages</p>
            </div>
            <button class="btn-luxury" onclick="location.reload()" style="margin: 0 auto;">
                <span class="btn-content">Complete</span>
            </button>
        </div>
    `;
}

// Add smooth hover effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.method-card, .concern-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            card.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg) translateZ(10px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// Add micro-interactions
document.querySelectorAll('button, .btn-luxury, .btn-next, .btn-analyze').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Initialize on load
window.addEventListener('load', () => {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Start animations
    setTimeout(() => {
        document.querySelectorAll('.hero-content > *').forEach((element, index) => {
            element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            element.style.opacity = '0';
        });
    }, 100);
});