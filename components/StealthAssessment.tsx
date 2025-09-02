'use client'

import React, { useState, useEffect } from 'react'

interface AssessmentData {
  name?: string
  method?: string
  amount?: string
  area?: string
  timeline?: string
  email?: string
  phone?: string
  feelingAbout?: string
  motivation?: string
}

export default function StealthAssessment() {
  const [currentStep, setCurrentStep] = useState(0) // 0 = not active
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const totalSteps = 10
  const progressPercentage = currentStep === 0 ? 0 : (currentStep / totalSteps) * 100
  
  const openAssessment = () => {
    setIsAssessmentOpen(true)
    // If never started, start at step 1
    if (currentStep === 0) {
      setCurrentStep(1)
    }
    // Otherwise continue where left off
  }
  
  const closeAssessment = () => {
    setIsAssessmentOpen(false)
    // Progress is saved in state
  }
  
  const restartAssessment = () => {
    setCurrentStep(1)
    setAssessmentData({})
  }

  const assessmentNext = (step: number) => {
    if (step === 1) {
      const nameInput = document.getElementById('firstName') as HTMLInputElement
      const name = nameInput?.value
      if (!name) return
      
      setAssessmentData(prev => ({ ...prev, name }))
      
      // Trigger celebration
      setShowEmoji(true)
      setTimeout(() => setShowEmoji(false), 2000)
    }
    
    setCurrentStep(step + 1)
  }

  const selectOption = (field: keyof AssessmentData, value: string, nextStep: number) => {
    setAssessmentData(prev => ({ ...prev, [field]: value }))
    setCurrentStep(nextStep + 1)
  }

  const assessmentComplete = async () => {
    const emailInput = document.getElementById('userEmail') as HTMLInputElement
    const email = emailInput?.value

    if (!email) {
      alert('Please enter your email to unlock your platform access')
      return
    }

    const finalData = {
      ...assessmentData,
      email
    }

    setAssessmentData(finalData)
    setCurrentStep(10)

    // Send to GHL webhook
    setIsSubmitting(true)
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/dVD6QbgqAF7fiHM3MCrz/webhook-trigger/355171e7-7010-42a9-b0b8-3dee211db694', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      })
    } catch (error) {
      console.error('Webhook error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const bookConsultation = () => {
    window.open('https://link.skintight.uk/widget/booking/85AnUNYWb63J1DyMo1g9', '_blank')
  }

  const getWhatsApp = () => {
    const message = `Hi! I'm ${assessmentData.name}, I just completed my assessment and would love to see ProMax Lipo before/after photos for ${assessmentData.area}.`
    window.open(`https://wa.me/447700173390?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <div>
      {/* Assessment Modal - Shows when open */}
      {isAssessmentOpen && (
        <div>
          {/* Backdrop - Click to close */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 transition-opacity duration-300"
            onClick={closeAssessment}
          />
          
          {/* Modal Container - Mobile Optimized */}
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 pointer-events-none">
            <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-4xl h-[85vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col transform transition-all duration-300 slide-up sm:scale-100 pointer-events-auto">
              
              {/* Modal Header - Gorgeous Design */}
              <div className="flex-shrink-0 bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-5">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-white rounded-full opacity-10 animate-pulse"></div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse animation-delay-1000"></div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                    {currentStep > 0 && currentStep <= totalSteps && (
                      <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1.5 rounded-full">
                        <span className="text-white text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                      </div>
                    )}
                  </div>
                  {currentStep > 0 && currentStep < totalSteps && (
                    <button
                      onClick={restartAssessment}
                      className="text-xs sm:text-sm text-white opacity-70 hover:opacity-100 transition-opacity"
                    >
                      Start Over
                    </button>
                  )}
                </div>
                <button
                  onClick={closeAssessment}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center transition-all relative z-10"
                  aria-label="Close assessment"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Gorgeous Progress Bar */}
              {currentStep > 0 && (
                <div className="flex-shrink-0 bg-gradient-to-r from-gray-100 to-gray-200 h-2 overflow-hidden relative">
                  <div 
                    className="bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 h-full transition-all duration-700 ease-out relative shadow-sm"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                  </div>
                </div>
              )}
              
              {/* Assessment Content - Scrollable on mobile */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
          
          {/* Step 1: Name - Beautiful Welcome */}
          {currentStep === 1 && (
            <div className="fade-in-up text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-6 flex items-center justify-center animate-bounce-slow">
                  <span className="text-3xl">👋</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-3">
                  Welcome to Your Transformation
                </h3>
                <p className="text-gray-600 text-lg">Let's start with something simple...</p>
              </div>
              
              <div className="max-w-md mx-auto">
                <label className="block text-left text-sm font-medium text-gray-700 mb-2">What should we call you?</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Enter your first name"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg mb-6 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && assessmentNext(1)}
                  autoFocus
                />
                <button 
                  onClick={() => assessmentNext(1)}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Let's Begin →
                </button>
              </div>
              
              {showEmoji && (
                <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
                  <div className="text-6xl animate-ping-once">🎉</div>
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Weight Loss Method - Trust Building */}
          {currentStep === 2 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <span>💚</span> Safe Space - No Judgment Here
                </div>
                <h3 className="text-3xl font-bold text-dark mb-3">
                  Amazing work <span className="text-primary-500">{assessmentData.name}</span>! 🎊
                </h3>
                <p className="text-gray-600 text-lg">You've already done the hard part. How did you achieve your weight loss?</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  { value: 'ozempic', icon: '💉', title: 'Ozempic/Wegovy', subtitle: 'GLP-1 medication', popular: true },
                  { value: 'mounjaro', icon: '💊', title: 'Mounjaro', subtitle: 'Tirzepatide', popular: true },
                  { value: 'diet', icon: '🏃‍♀️', title: 'Diet & Exercise', subtitle: 'Natural approach' },
                  { value: 'surgery', icon: '🏥', title: 'Surgery', subtitle: 'Medical procedure' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('method', option.value, 2)}
                    className="relative p-6 border-2 border-gray-200 rounded-2xl text-center hover:border-primary-500 hover:shadow-xl transition-all duration-200 ease-out group bg-white transform hover:scale-[1.02] hover:-translate-y-0.5"
                  >
                    {option.popular && (
                      <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-semibold">Popular</span>
                    )}
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <div className="font-semibold text-dark group-hover:text-primary-500 transition-colors">
                      {option.title}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">{option.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 3: How They Feel - Emotional Connection */}
          {currentStep === 3 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-dark mb-3">
                  How are you feeling about your body now?
                </h3>
                <p className="text-gray-600 text-lg">It's completely normal to have mixed feelings...</p>
              </div>
              
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { value: 'proud-frustrated', emoji: '😊😔', text: 'Proud but frustrated with loose skin' },
                  { value: 'excited-worried', emoji: '🎉😟', text: 'Excited but worried it won\'t tighten' },
                  { value: 'confident-hiding', emoji: '💪🫣', text: 'More confident but still hiding my body' },
                  { value: 'happy-incomplete', emoji: '😄🤷', text: 'Happy but journey feels incomplete' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('feelingAbout', option.value, 3)}
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl text-left hover:border-primary-500 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-200 ease-out group flex items-center gap-4 transform hover:scale-[1.01]"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="flex-1 font-medium text-gray-800 group-hover:text-primary-600">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 4: Amount Lost - Celebration */}
          {currentStep === 4 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-3xl font-bold text-dark mb-3">
                  Incredible! How much did you lose?
                </h3>
                <p className="text-gray-600 text-lg">Every pound is an achievement worth celebrating</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {[
                  { value: '1-2stone', title: '1-2 stone', emoji: '⭐' },
                  { value: '2-4stone', title: '2-4 stone', emoji: '⭐⭐' },
                  { value: '4-6stone', title: '4-6 stone', emoji: '⭐⭐⭐' },
                  { value: '6plus', title: '6+ stone', emoji: '🌟' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('amount', option.value, 4)}
                    className="p-6 border-2 border-gray-200 rounded-2xl hover:border-primary-500 hover:shadow-xl transition-all group bg-white text-center"
                  >
                    <div className="text-2xl mb-2">{option.emoji}</div>
                    <div className="font-bold text-lg text-dark group-hover:text-primary-500 transition-colors">
                      {option.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 5: Problem Area - Visual */}
          {currentStep === 5 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-dark mb-3">
                  Which area bothers you most?
                </h3>
                <p className="text-gray-600 text-lg">Don't worry, we can address multiple areas</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                {[
                  { value: 'tummy', icon: '🤰', title: 'Tummy', desc: 'Most common' },
                  { value: 'arms', icon: '💪', title: 'Arms', desc: 'Bat wings' },
                  { value: 'thighs', icon: '🦵', title: 'Thighs', desc: 'Inner/outer' },
                  { value: 'multiple', icon: '🙋', title: 'Multiple', desc: 'Everywhere' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('area', option.value, 5)}
                    className="p-6 border-2 border-gray-200 rounded-2xl hover:border-primary-500 hover:shadow-xl hover:scale-105 transition-all group bg-white text-center"
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <div className="font-bold text-dark group-hover:text-primary-500 transition-colors">
                      {option.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 6: Motivation - Deep Connection */}
          {currentStep === 6 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-dark mb-3">
                  What's driving you to make this change?
                </h3>
                <p className="text-gray-600 text-lg">Your 'why' is what will make this journey successful</p>
              </div>
              
              <div className="space-y-3 max-w-xl mx-auto">
                {[
                  { value: 'confidence', emoji: '✨', text: 'Want to feel confident in my new body' },
                  { value: 'clothes', emoji: '👗', text: 'Wear the clothes I\'ve been dreaming of' },
                  { value: 'beach', emoji: '🏖️', text: 'Feel amazing on holiday/at the beach' },
                  { value: 'complete', emoji: '🎯', text: 'Complete my transformation journey' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('motivation', option.value, 6)}
                    className="w-full p-5 border-2 border-gray-200 rounded-2xl text-left hover:border-primary-500 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-200 ease-out group flex items-center gap-4 transform hover:scale-[1.01]"
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="flex-1 font-medium text-gray-800 group-hover:text-primary-600">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Timeline - Urgency */}
          {currentStep === 7 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <span>⏰</span> Limited Availability
                </div>
                <h3 className="text-3xl font-bold text-dark mb-3">
                  When would you like to see results?
                </h3>
                <p className="text-gray-600 text-lg">We currently have openings for new clients</p>
              </div>
              
              <div className="space-y-3 max-w-lg mx-auto">
                {[
                  { value: 'asap', emoji: '🚀', title: 'As soon as possible', desc: 'I\'m ready now!', highlight: true },
                  { value: '1month', emoji: '📅', title: 'Within a month', desc: 'Need to arrange time' },
                  { value: '3months', emoji: '🗺️', title: 'Next few months', desc: 'Planning ahead' },
                  { value: 'researching', emoji: '🔍', title: 'Just researching', desc: 'Exploring options' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => selectOption('timeline', option.value, 7)}
                    className={`w-full p-5 border-2 rounded-2xl text-left transition-all group flex items-center gap-4 ${
                      option.highlight 
                        ? 'border-accent-400 bg-gradient-to-r from-accent-50 to-primary-50 hover:shadow-xl' 
                        : 'border-gray-200 hover:border-primary-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-dark group-hover:text-primary-600">{option.title}</div>
                      <div className="text-sm text-gray-500">{option.desc}</div>
                    </div>
                    {option.highlight && (
                      <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full">Best Value</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 8: Results Preview - Build Excitement */}
          {currentStep === 8 && (
            <div className="fade-in-up text-center">
              <div className="mb-6">
                <div className="inline-block animate-bounce-slow">
                  <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-2">95%</div>
                  <div className="text-xl font-semibold text-gray-700">Perfect Match!</div>
                </div>
              </div>
              
              <h3 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
                {assessmentData.name}, You're IDEAL for ProMax Lipo!
              </h3>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mb-6 text-left max-w-lg mx-auto">
                <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✅</span> Why you're perfect:
                </h4>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Your {assessmentData.method === 'ozempic' ? 'Ozempic' : assessmentData.method === 'mounjaro' ? 'Mounjaro' : 'weight loss'} journey makes you an ideal candidate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Your {assessmentData.area === 'multiple' ? 'areas' : assessmentData.area} can be successfully treated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Results typically visible in 6-12 weeks</span>
                  </li>
                </ul>
              </div>
              
              <button 
                onClick={() => setCurrentStep(9)}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-[1.02] shadow-lg"
              >
                Access My Personalized Platform →
              </button>
            </div>
          )}

          {/* Step 9: Email to Unlock Platform */}
          {currentStep === 9 && (
            <div className="fade-in-up">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <span className="text-3xl">🔐</span>
                </div>
                <h3 className="text-3xl font-bold text-dark mb-3">
                  Your Personal Transformation Platform is Ready!
                </h3>
                <p className="text-gray-600 text-lg mb-2">Get instant access to:</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto mb-8">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 rounded-xl">
                  <span className="text-2xl mb-2 block">📸</span>
                  <span className="text-sm font-medium text-primary-900">Photo Journey Tracker</span>
                </div>
                <div className="bg-gradient-to-br from-accent-50 to-accent-100 p-4 rounded-xl">
                  <span className="text-2xl mb-2 block">📊</span>
                  <span className="text-sm font-medium text-accent-900">Progress Dashboard</span>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                  <span className="text-2xl mb-2 block">💬</span>
                  <span className="text-sm font-medium text-green-900">WhatsApp Support</span>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                  <span className="text-2xl mb-2 block">🎯</span>
                  <span className="text-sm font-medium text-purple-900">Treatment Plan</span>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
                  <p className="text-amber-900 text-sm font-medium flex items-center gap-2">
                    <span>⚡</span> Limited time: £500 discount automatically applied
                  </p>
                </div>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter your email to unlock access:</label>
                <input
                  type="email"
                  id="userEmail"
                  placeholder="your@email.com"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg mb-3 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all"
                  required
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && assessmentComplete()}
                />
                <p className="text-xs text-gray-500 mb-6 text-center">Your account will be created instantly • No payment required</p>
                
                <button 
                  onClick={assessmentComplete}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-2xl text-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating Your Account...' : 'Unlock My Platform Access 🚀'}
                </button>
              </div>
            </div>
          )}
          
          {/* Step 10: Platform Unlocked - The Big Reveal */}
          {currentStep === 10 && (
            <div className="fade-in-up text-center">
              <div className="mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 via-green-500 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                  <span className="text-5xl">🎊</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-dark mb-3">
                  Welcome to Your Transformation Platform!
                </h3>
                <p className="text-lg text-gray-600 mb-2">Account created for {assessmentData.email}</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-6 mb-6 max-w-lg mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl">✓</div>
                  <div className="text-left">
                    <p className="font-semibold text-green-900">Platform Access Granted!</p>
                    <p className="text-sm text-green-700">Your journey starts now</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    // Store email for dashboard
                    sessionStorage.setItem('assessmentEmail', assessmentData.email || '')
                    sessionStorage.setItem('userName', assessmentData.name || '')
                    // Redirect to dashboard for wow moment
                    window.location.href = '/dashboard'
                  }}
                  className="w-full bg-primary-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  🚀 Start Your Journey →
                </button>
                
                <div className="text-gray-500 text-sm">or</div>
                
                <button 
                  onClick={bookConsultation}
                  className="w-full bg-white border-2 border-primary-500 text-primary-500 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Book Free Consultation First
                </button>
                
                <button 
                  onClick={getWhatsApp}
                  className="text-gray-600 underline text-sm hover:text-gray-800"
                >
                  💬 Get Before/After Photos via WhatsApp
                </button>
              </div>
            </div>
          )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hidden trigger button for programmatic access */}
      <button 
        onClick={openAssessment}
        data-assessment-trigger
        className="hidden"
        aria-hidden="true"
      >
        Open Assessment
      </button>
    </div>
  )
}