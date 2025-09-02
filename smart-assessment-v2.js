// Smart Assessment Engine v2.0 - Adaptive, Intelligent, Visual
// This is the brain of our assessment - light years ahead of competition

class SmartAssessment {
    constructor() {
        this.userData = {
            timestamp: new Date().toISOString(),
            device: this.detectDevice(),
            concerns: [],
            photos: [],
            skinAnalysis: {}
        };
        
        this.treatmentScores = {
            promaxLipo: 0,
            hifu: 0,
            morpheus8: 0,
            coolSculpting: 0,
            surgery: 0
        };
        
        this.currentPath = [];
        this.cloudinaryWidget = null;
    }
    
    detectDevice() {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop';
    }
    
    // Adaptive Question Logic - Changes based on previous answers
    getNextQuestion() {
        const path = this.currentPath.join('-');
        
        // Intelligent routing based on answers
        const questionTree = {
            'start': {
                question: "What brings you to Skulpt today?",
                options: [
                    { value: 'loose-skin', label: 'Loose skin after weight loss', path: 'weight-loss-journey' },
                    { value: 'face-concerns', label: 'Facial concerns', path: 'facial-analysis' },
                    { value: 'body-contouring', label: 'Body shaping', path: 'body-goals' },
                    { value: 'not-sure', label: 'Not sure - need guidance', path: 'discovery' }
                ]
            },
            
            'weight-loss-journey': {
                question: "That's amazing! How did you lose the weight?",
                options: [
                    { value: 'glp1', label: 'Weight loss injections (Ozempic/Wegovy/Mounjaro)', score: { promaxLipo: 30 }, path: 'glp1-timeline' },
                    { value: 'surgery', label: 'Bariatric surgery', score: { surgery: 20, promaxLipo: 15 }, path: 'surgery-timeline' },
                    { value: 'natural', label: 'Diet and exercise', score: { promaxLipo: 20 }, path: 'natural-timeline' },
                    { value: 'medical', label: 'Medical condition', score: { promaxLipo: 10 }, path: 'medical-assessment' }
                ]
            },
            
            'glp1-timeline': {
                question: "How quickly did you lose the weight?",
                subtitle: "GLP-1 medications often cause rapid weight loss",
                options: [
                    { value: 'very-fast', label: 'Less than 3 months', score: { promaxLipo: 25 }, path: 'skin-severity' },
                    { value: 'fast', label: '3-6 months', score: { promaxLipo: 20 }, path: 'skin-severity' },
                    { value: 'moderate', label: '6-12 months', score: { promaxLipo: 15 }, path: 'skin-severity' },
                    { value: 'slow', label: 'Over a year', score: { promaxLipo: 10 }, path: 'skin-severity' }
                ]
            },
            
            'facial-analysis': {
                question: "What specific facial concerns do you have?",
                options: [
                    { value: 'sagging', label: 'Sagging skin / jowls', score: { hifu: 30, morpheus8: 20 }, path: 'facial-age' },
                    { value: 'wrinkles', label: 'Fine lines and wrinkles', score: { morpheus8: 25, hifu: 15 }, path: 'facial-age' },
                    { value: 'scarring', label: 'Acne scars or scarring', score: { morpheus8: 35, hifu: 5 }, path: 'scar-type' },
                    { value: 'pigmentation', label: 'Dark spots / pigmentation', score: { morpheus8: 30 }, path: 'pigment-type' },
                    { value: 'texture', label: 'Rough texture / large pores', score: { morpheus8: 25, hifu: 10 }, path: 'facial-age' }
                ]
            },
            
            'scar-type': {
                question: "What type of scarring are you dealing with?",
                options: [
                    { value: 'acne-ice', label: 'Ice pick acne scars', score: { morpheus8: 40 }, path: 'scar-severity' },
                    { value: 'acne-box', label: 'Boxcar acne scars', score: { morpheus8: 35 }, path: 'scar-severity' },
                    { value: 'surgical', label: 'Surgical scars', score: { morpheus8: 30 }, path: 'scar-age' },
                    { value: 'injury', label: 'Injury/trauma scars', score: { morpheus8: 25 }, path: 'scar-age' }
                ]
            },
            
            'skin-severity': {
                question: "Let's assess your skin. Can you pinch and pull the loose skin?",
                visual: true, // Triggers photo upload option
                options: [
                    { value: 'mild', label: 'Slightly loose, snaps back quickly', score: { promaxLipo: 20, coolSculpting: 10 }, path: 'area-assessment' },
                    { value: 'moderate', label: 'Loose, takes time to return', score: { promaxLipo: 30 }, path: 'area-assessment' },
                    { value: 'severe', label: 'Very loose, doesn't snap back', score: { promaxLipo: 25, surgery: 15 }, path: 'area-assessment' },
                    { value: 'extreme', label: 'Hanging skin folds', score: { surgery: 35, promaxLipo: 5 }, path: 'surgery-consideration' }
                ]
            },
            
            'surgery-consideration': {
                question: "Have you considered surgical options?",
                subtitle: "Severe cases may benefit from surgery combined with non-surgical treatments",
                options: [
                    { value: 'no-surgery', label: 'Want to avoid surgery completely', score: { promaxLipo: 15 }, path: 'realistic-expectations' },
                    { value: 'maybe', label: 'Open to it if necessary', score: { surgery: 20 }, path: 'surgery-consultation' },
                    { value: 'planned', label: 'Already planning surgery', score: { surgery: 40 }, path: 'pre-surgery-prep' }
                ]
            }
        };
        
        const currentQuestion = questionTree[path] || questionTree['start'];
        return currentQuestion;
    }
    
    // Visual Assessment with Cloudinary
    initializePhotoUpload() {
        if (!this.cloudinaryWidget) {
            this.cloudinaryWidget = cloudinary.createUploadWidget({
                cloudName: 'ddxptienb',
                uploadPreset: 'skulpt_assessment',
                sources: ['local', 'camera'],
                multiple: false,
                cropping: true,
                croppingAspectRatio: 1,
                resourceType: 'image',
                clientAllowedFormats: ['png', 'jpg', 'jpeg'],
                maxFileSize: 10000000,
                showSkipCropButton: false,
                styles: {
                    palette: {
                        window: "#FFFFFF",
                        windowBorder: "#0066CC",
                        tabIcon: "#0066CC",
                        menuIcons: "#5A616A",
                        textDark: "#000000",
                        textLight: "#FFFFFF",
                        link: "#0066CC",
                        action: "#0066CC",
                        inactiveTabIcon: "#B0B0B0",
                        error: "#F44235",
                        inProgress: "#0066CC",
                        complete: "#20B832",
                        sourceBg: "#F8F9FA"
                    }
                }
            }, (error, result) => {
                if (!error && result && result.event === "success") {
                    this.analyzePhoto(result.info);
                }
            });
        }
        
        this.cloudinaryWidget.open();
    }
    
    // AI-Powered Photo Analysis (Simulated - would connect to real AI in production)
    async analyzePhoto(photoInfo) {
        this.userData.photos.push({
            url: photoInfo.secure_url,
            publicId: photoInfo.public_id,
            timestamp: new Date().toISOString()
        });
        
        // Simulate AI analysis
        const analysis = {
            skinLaxity: this.calculateSkinLaxity(photoInfo),
            recommendedTreatments: [],
            contraindications: [],
            estimatedSessions: 0
        };
        
        // Smart recommendation based on visual assessment
        if (analysis.skinLaxity > 70) {
            analysis.recommendedTreatments.push('surgery consultation');
            analysis.contraindications.push('Results may be limited without surgical intervention');
        } else if (analysis.skinLaxity > 40) {
            analysis.recommendedTreatments.push('ProMax Lipo');
            analysis.estimatedSessions = 8;
        } else {
            analysis.recommendedTreatments.push('ProMax Lipo');
            analysis.estimatedSessions = 6;
        }
        
        this.userData.skinAnalysis = analysis;
        return analysis;
    }
    
    calculateSkinLaxity(photoInfo) {
        // In production, this would use AI/ML models
        // For now, return a score based on metadata
        return Math.floor(Math.random() * 50) + 20;
    }
    
    // Generate Smart Recommendations
    generateRecommendation() {
        const scores = this.treatmentScores;
        const sortedTreatments = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .filter(([,score]) => score > 0);
        
        const primary = sortedTreatments[0];
        const secondary = sortedTreatments[1];
        
        let recommendation = {
            primary: null,
            secondary: null,
            confidence: 0,
            reasoning: [],
            contraindications: [],
            alternativePathways: []
        };
        
        // ProMax Lipo Path
        if (primary && primary[0] === 'promaxLipo' && primary[1] > 40) {
            recommendation.primary = {
                treatment: 'ProMax Lipo',
                confidence: Math.min(primary[1], 95),
                sessions: this.userData.skinAnalysis?.estimatedSessions || 6,
                timeline: '6-8 weeks',
                price: '£2,400 (package)',
                reasoning: 'Perfect for your loose skin from rapid weight loss'
            };
        }
        
        // Morpheus8 Path
        else if (primary && primary[0] === 'morpheus8' && primary[1] > 30) {
            recommendation.primary = {
                treatment: 'Morpheus8',
                confidence: Math.min(primary[1], 90),
                sessions: 3,
                timeline: '3-4 months',
                price: '£800 per session',
                reasoning: 'Ideal for your facial concerns and scarring'
            };
            
            // Suggest partner clinic for Morpheus8
            recommendation.alternativePathways.push({
                clinic: 'London Aesthetic Clinic',
                treatment: 'Morpheus8',
                reason: 'Specialist partner for advanced facial treatments'
            });
        }
        
        // HIFU Path
        else if (primary && primary[0] === 'hifu' && primary[1] > 25) {
            recommendation.primary = {
                treatment: 'HIFU',
                confidence: Math.min(primary[1], 85),
                sessions: 1,
                timeline: '3-6 months for full results',
                price: '£1,200',
                reasoning: 'Non-invasive lifting for facial sagging'
            };
        }
        
        // Surgery Required Path
        else if (primary && primary[0] === 'surgery' && primary[1] > 30) {
            recommendation.primary = {
                treatment: 'Surgical Consultation',
                confidence: primary[1],
                reasoning: 'Your level of skin laxity requires surgical assessment'
            };
            
            recommendation.secondary = {
                treatment: 'ProMax Lipo (Post-Surgery)',
                reasoning: 'Can refine results after surgery'
            };
        }
        
        return recommendation;
    }
    
    // Smart Follow-up Questions
    askClarifyingQuestion(concern) {
        const clarifications = {
            'loose-skin': [
                "Have you maintained your weight for at least 3 months?",
                "Is the loose skin causing any medical issues (rashes, infections)?",
                "Have you tried any treatments before?"
            ],
            'scarring': [
                "How old are the scars?",
                "Have you had any previous treatments?",
                "Are you prone to keloid scarring?"
            ],
            'pigmentation': [
                "Is this melasma, sun damage, or post-inflammatory?",
                "Are you currently using any skincare actives?",
                "Do you have any upcoming sun exposure plans?"
            ]
        };
        
        return clarifications[concern] || [];
    }
    
    // Integration with GoHighLevel
    async sendToGHL(recommendation) {
        const payload = {
            ...this.userData,
            recommendation: recommendation,
            leadScore: recommendation.confidence,
            treatmentPath: recommendation.primary.treatment,
            estimatedValue: this.calculateLeadValue(recommendation)
        };
        
        try {
            await fetch('https://services.leadconnectorhq.com/hooks/dVD6QbgqAF7fiHM3MCrz/webhook-trigger/355171e7-7010-42a9-b0b8-3dee211db694', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } catch (error) {
            console.error('GHL webhook failed:', error);
        }
    }
    
    calculateLeadValue(recommendation) {
        const values = {
            'ProMax Lipo': 2400,
            'Morpheus8': 2400,
            'HIFU': 1200,
            'Surgical Consultation': 5000,
            'CoolSculpting': 1800
        };
        
        return values[recommendation.primary?.treatment] || 0;
    }
}

// Initialize the smart assessment
const assessment = new SmartAssessment();

// Export for use in HTML
window.SmartAssessment = SmartAssessment;