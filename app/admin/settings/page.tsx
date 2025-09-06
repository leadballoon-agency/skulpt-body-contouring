'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the widgets for preview
const AssessmentWidget = dynamic(
  () => import('../../assessment-widget/page'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-amber-400">Loading assessment...</div>
      </div>
    )
  }
)

const OfferWidget = dynamic(
  () => import('../../offer-widget/page'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-amber-400">Loading offer...</div>
      </div>
    )
  }
)

export default function WidgetSettingsPage() {
  const [activeTab, setActiveTab] = useState<'offer' | 'assessment' | 'tracking' | 'embed' | 'settings' | 'values' | 'pixels'>('offer')
  const [hasChanges, setHasChanges] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [previewLayout, setPreviewLayout] = useState<'assessment' | 'offer' | 'both'>('offer')
  const [embedCopied, setEmbedCopied] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [setupStep, setSetupStep] = useState<'offer' | 'assessment' | 'complete'>('offer')
  
  // Load existing config or use defaults
  const [config, setConfig] = useState(() => {
    // Try to load from localStorage (in production, load from API)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('widget_config')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    
    // Default configuration
    return {
      general: {
        spotsRemaining: 7,
        timerHours: 23,
        timerMinutes: 59,
        enableConfetti: true,
        confettiThreshold: 15,
        totalSteps: 10,
        showProgressBar: true,
        showTrustBadge: true,
        layoutMode: '2-column',
        showValueStack: true
      },
      copy: {
        headline: 'Transform Your Appearance Today',
        subheadline: 'Join thousands of happy clients',
        trustBadge: '2,847 UK Residents Have Transformed',
        urgencyMessage: 'Only {spots} spots remaining this week',
        ctaButton: 'Start Your Free Assessment',
        journeyNameIntro: 'Welcome {name}! For your journey, you\'ll be known as:',
        completionMessage: 'Welcome to Skulpt, {aliasName}!',
        emailLabel: 'Email Address'
      },
      values: {
        consultationValue: '£150',
        bodyScanValue: '£200',
        treatmentPlanValue: '£150',
        totalValue: '£500',
        todayPrice: 'FREE',
        priceRangeMin: '£1,997',
        priceRangeMax: '£3,497',
        showPricing: true,
        currency: 'GBP'
      },
      pixels: {
        facebookPixelId: '',
        googleAnalyticsId: '',
        tiktokPixelId: '',
        enableTracking: true,
        trackPageView: true,
        trackLeadStart: true,
        trackLeadComplete: true
      }
    }
  })

  // Auto-save to localStorage when config changes
  useEffect(() => {
    if (hasChanges) {
      const timer = setTimeout(() => {
        // Save main config
        localStorage.setItem('widget_config', JSON.stringify(config))
        
        // Also save specific configs for each widget
        const assessmentConfig = {
          general: config.general,
          copy: config.copy,
          pixels: config.pixels
        }
        localStorage.setItem('assessment_widget_config', JSON.stringify(assessmentConfig))
        
        const offerConfig = {
          values: config.values,
          copy: {
            headline: config.copy.headline || 'What You\'ll Get',
            urgencyMessage: config.copy.urgencyMessage || 'Limited Time Offer'
          },
          general: {
            spotsRemaining: config.general.spotsRemaining,
            timerHours: config.general.timerHours,
            timerMinutes: config.general.timerMinutes
          }
        }
        localStorage.setItem('offer_widget_config', JSON.stringify(offerConfig))
        
        // In production, this would sync with the database
      }, 1000) // Debounce for 1 second
      
      return () => clearTimeout(timer)
    }
  }, [config, hasChanges])

  const updateConfig = (section: string, field: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Save main config
    localStorage.setItem('widget_config', JSON.stringify(config))
    
    // Save specific configs for each widget
    const assessmentConfig = {
      general: config.general,
      copy: config.copy,
      pixels: config.pixels
    }
    localStorage.setItem('assessment_widget_config', JSON.stringify(assessmentConfig))
    
    const offerConfig = {
      values: config.values,
      copy: {
        headline: config.copy.headline || 'What You\'ll Get',
        urgencyMessage: config.copy.urgencyMessage || 'Limited Time Offer'
      },
      general: {
        spotsRemaining: config.general.spotsRemaining,
        timerHours: config.general.timerHours,
        timerMinutes: config.general.timerMinutes
      }
    }
    localStorage.setItem('offer_widget_config', JSON.stringify(offerConfig))
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setHasChanges(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-white rounded-xl shadow-xl p-4 flex items-center gap-3 border border-green-100">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-900">Configuration Saved!</p>
              <p className="text-sm text-gray-500">Your widgets are now updated</p>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Elegant Header */}
        <div className="mb-10">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Widget Studio</h1>
                  <p className="text-sm text-gray-500">Design and configure your lead generation widgets</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {hasChanges && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-amber-700 font-medium">Unsaved changes</span>
                  </div>
                )}
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all transform ${
                    hasChanges && !isSaving
                      ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : 'Save Changes'}
                </button>
                <button
                  onClick={resetToDefaults}
                  className="p-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 rounded-xl transition-all"
                  title="Reset to defaults"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Setup Progress Indicator */}
            <div className="bg-gradient-to-r from-primary-50 to-white rounded-2xl shadow-sm border border-primary-100 p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-700">Setup Progress</h4>
                <span className="text-xs text-gray-500">Step {setupStep === 'offer' ? '1' : setupStep === 'assessment' ? '2' : '3'} of 3</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`flex-1 h-2 rounded-full ${setupStep !== 'offer' ? 'bg-green-500' : 'bg-primary-500 animate-pulse'}`}></div>
                <div className={`flex-1 h-2 rounded-full ${setupStep === 'complete' ? 'bg-green-500' : setupStep === 'assessment' ? 'bg-primary-500 animate-pulse' : 'bg-gray-200'}`}></div>
                <div className={`flex-1 h-2 rounded-full ${setupStep === 'complete' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-600">1. Build Offer</span>
                <span className="text-xs text-gray-600">2. Create Assessment</span>
                <span className="text-xs text-gray-600">3. Go Live</span>
              </div>
            </div>
            
            {/* Elegant Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
              <div className="grid grid-cols-5 gap-1">
                {[
                  { id: 'offer', label: 'Offer', icon: '💎', step: 1 },
                  { id: 'assessment', label: 'Assessment', icon: '📋', step: 2 },
                  { id: 'tracking', label: 'Tracking', icon: '📊', step: 3 },
                  { id: 'embed', label: 'Embed', icon: '🚀', step: 4 },
                  { id: 'settings', label: 'Settings', icon: '⚙️', step: 5 }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative py-3 px-2 rounded-xl font-medium transition-all text-sm ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg transform scale-105' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-lg">{tab.icon}</span>
                      <span className="text-xs">{tab.label}</span>
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                        <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary-500"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Offer Builder - Step 1 */}
              {activeTab === 'offer' && (
                <div>
                  <div className="bg-gradient-to-r from-amber-50 to-white p-6 border-b border-amber-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">💎</span>
                      Build Your Offer
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Define what you're selling and its value proposition</p>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Offer Headline */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Offer Headline</label>
                      <input
                        type="text"
                        value={config.copy?.headline || 'Transform Your Body Today'}
                        onChange={(e) => updateConfig('copy', 'headline', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="What's your main promise?"
                      />
                    </div>
                    
                    {/* Value Stack Builder */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Value Stack Builder</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="text-green-600">✓</span>
                          <input
                            type="text"
                            placeholder="Professional Consultation"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={config.values?.consultationValue || '£150'}
                            onChange={(e) => updateConfig('values', 'consultationValue', e.target.value)}
                            className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center"
                            placeholder="Value"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-green-600">✓</span>
                          <input
                            type="text"
                            placeholder="3D Body Scan & Analysis"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={config.values?.bodyScanValue || '£200'}
                            onChange={(e) => updateConfig('values', 'bodyScanValue', e.target.value)}
                            className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center"
                            placeholder="Value"
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-green-600">✓</span>
                          <input
                            type="text"
                            placeholder="Personalized Treatment Plan"
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                          />
                          <input
                            type="text"
                            value={config.values?.treatmentPlanValue || '£150'}
                            onChange={(e) => updateConfig('values', 'treatmentPlanValue', e.target.value)}
                            className="w-24 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-center"
                            placeholder="Value"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Total Value</label>
                        <input
                          type="text"
                          value={config.values?.totalValue || '£500'}
                          onChange={(e) => updateConfig('values', 'totalValue', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Price</label>
                        <input
                          type="text"
                          value={config.values?.todayPrice || 'FREE'}
                          onChange={(e) => updateConfig('values', 'todayPrice', e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                          placeholder="FREE, £97, 50% OFF"
                        />
                      </div>
                    </div>
                    
                    {/* Urgency Settings */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-4">Urgency & Scarcity</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Limited Spots</span>
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-bold">
                              {config.general?.spotsRemaining || 7} spots
                            </span>
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            value={config.general?.spotsRemaining || 7}
                            onChange={(e) => updateConfig('general', 'spotsRemaining', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Timer Hours</label>
                            <select
                              value={config.general?.timerHours || 23}
                              onChange={(e) => updateConfig('general', 'timerHours', parseInt(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                              {[...Array(24)].map((_, i) => (
                                <option key={i} value={i}>{i}h</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Timer Minutes</label>
                            <select
                              value={config.general?.timerMinutes || 59}
                              onChange={(e) => updateConfig('general', 'timerMinutes', parseInt(e.target.value))}
                              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                              {[0, 15, 30, 45, 59].map(min => (
                                <option key={min} value={min}>{min}m</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Next Step Button */}
                  <div className="pt-4 border-t">
                    <button
                      onClick={() => {
                        setActiveTab('assessment')
                        setSetupStep('assessment')
                      }}
                      className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-medium transition-all"
                    >
                      Next: Build Your Assessment →
                    </button>
                  </div>

                  </div>
                </div>
              )}

              {/* Assessment Builder - Step 2 */}
              {activeTab === 'assessment' && (
                <div>
                  <div className="bg-gradient-to-r from-blue-50 to-white p-6 border-b border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">📋</span>
                      Build Your Assessment
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Create qualification questions to identify ideal clients</p>
                  </div>
                  <div className="p-6 space-y-6">
                  
                    {/* Assessment Settings */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Message</label>
                      <input
                        type="text"
                        value={config.copy?.headline || 'Discover Your Transformation Path'}
                        onChange={(e) => updateConfig('copy', 'headline', e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                        placeholder="What message welcomes users to your assessment?"
                      />
                    </div>

                    {/* Qualification Settings */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-3">Qualification Thresholds</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Minimum Age</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">18+</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Target Weight Loss</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">10-30 lbs</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Budget Range</span>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                              {config.values?.priceRangeMin || '£1,997'} - {config.values?.priceRangeMax || '£3,497'}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Trust Badge Text</label>
                    <input
                      type="text"
                      value={config.copy.trustBadge}
                      onChange={(e) => updateConfig('copy', 'trustBadge', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Urgency Message
                      <span className="text-xs text-gray-500 ml-2">(Use {'{spots}'} for dynamic number)</span>
                    </label>
                    <input
                      type="text"
                      value={config.copy.urgencyMessage}
                      onChange={(e) => updateConfig('copy', 'urgencyMessage', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">CTA Button Text</label>
                    <input
                      type="text"
                      value={config.copy.ctaButton}
                      onChange={(e) => updateConfig('copy', 'ctaButton', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-medium mb-2">💡 Pro Tips</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Use action words: "Transform", "Discover", "Unlock"</li>
                      <li>• Create urgency: "Today only", "Limited spots"</li>
                      <li>• Build trust: "Join 2,000+ clients", "5-star rated"</li>
                      <li>• Be specific: "In 6 weeks" vs "quickly"</li>
                    </ul>
                  </div>
                  </div>
                </div>
              )}

              {/* Values/Pricing */}
              {activeTab === 'values' && (
                <div>
                  <div className="bg-gradient-to-r from-green-50 to-white p-6 border-b border-green-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">💰</span>
                      Values & Pricing
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Set your value proposition and pricing strategy</p>
                  </div>
                  <div className="p-6 space-y-6">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Consultation Value</label>
                      <input
                        type="text"
                        value={config.values.consultationValue}
                        onChange={(e) => updateConfig('values', 'consultationValue', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Body Scan Value</label>
                      <input
                        type="text"
                        value={config.values.bodyScanValue}
                        onChange={(e) => updateConfig('values', 'bodyScanValue', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Total Value (crossed out)
                    </label>
                    <input
                      type="text"
                      value={config.values.totalValue}
                      onChange={(e) => updateConfig('values', 'totalValue', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Today's Price (highlighted)
                    </label>
                    <input
                      type="text"
                      value={config.values.todayPrice}
                      onChange={(e) => updateConfig('values', 'todayPrice', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                      placeholder="e.g., FREE, £97, 50% OFF"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Treatment Price Range</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={config.values.priceRangeMin}
                        onChange={(e) => updateConfig('values', 'priceRangeMin', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                        placeholder="Min price"
                      />
                      <input
                        type="text"
                        value={config.values.priceRangeMax}
                        onChange={(e) => updateConfig('values', 'priceRangeMax', e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none"
                        placeholder="Max price"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={config.values.showPricing}
                      onChange={(e) => updateConfig('values', 'showPricing', e.target.checked)}
                      className="w-5 h-5 bg-black border-gray-700 rounded text-amber-500"
                    />
                    <span>Show pricing in assessment</span>
                  </label>
                  </div>
                </div>
              )}

              {/* Tracking Pixels */}
              {activeTab === 'pixels' && (
                <div>
                  <div className="bg-gradient-to-r from-purple-50 to-white p-6 border-b border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      Tracking & Analytics
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Connect your marketing pixels and tracking codes</p>
                  </div>
                  <div className="p-6 space-y-6">
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Facebook Pixel ID
                      <a href="https://business.facebook.com/events_manager" target="_blank" className="text-xs text-primary-600 ml-2">
                        Get your Pixel ID →
                      </a>
                    </label>
                    <input
                      type="text"
                      value={config.pixels.facebookPixelId}
                      onChange={(e) => updateConfig('pixels', 'facebookPixelId', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono text-sm"
                      placeholder="e.g., 1234567890123456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Google Analytics ID
                      <a href="https://analytics.google.com" target="_blank" className="text-xs text-primary-600 ml-2">
                        Get your GA ID →
                      </a>
                    </label>
                    <input
                      type="text"
                      value={config.pixels.googleAnalyticsId}
                      onChange={(e) => updateConfig('pixels', 'googleAnalyticsId', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono text-sm"
                      placeholder="e.g., G-XXXXXXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">TikTok Pixel ID</label>
                    <input
                      type="text"
                      value={config.pixels.tiktokPixelId}
                      onChange={(e) => updateConfig('pixels', 'tiktokPixelId', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none font-mono text-sm"
                      placeholder="Optional"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700">Events to Track</h4>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.pixels.trackPageView}
                        onChange={(e) => updateConfig('pixels', 'trackPageView', e.target.checked)}
                        className="w-5 h-5 bg-white border-gray-300 rounded text-primary-500"
                      />
                      <span>Page View (when widget loads)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.pixels.trackLeadStart}
                        onChange={(e) => updateConfig('pixels', 'trackLeadStart', e.target.checked)}
                        className="w-5 h-5 bg-white border-gray-300 rounded text-primary-500"
                      />
                      <span>Lead Start (begins assessment)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={config.pixels.trackLeadComplete}
                        onChange={(e) => updateConfig('pixels', 'trackLeadComplete', e.target.checked)}
                        className="w-5 h-5 bg-white border-gray-300 rounded text-primary-500"
                      />
                      <span>Lead Complete (submits email)</span>
                    </label>
                  </div>
                  </div>
                </div>
              )}

              {/* Embed Code */}
              {activeTab === 'embed' && (
                <div>
                  <div className="bg-gradient-to-r from-amber-50 to-white p-6 border-b border-amber-100">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <span className="text-2xl">🚀</span>
                      Embed Your Widgets
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Get the code to add widgets to any website</p>
                  </div>
                  <div className="p-6 space-y-6">
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-amber-900 font-medium mb-2">📋 Quick Setup Guide</p>
                    <ol className="text-xs text-gray-700 space-y-1 list-decimal list-inside">
                      <li>Choose which widget(s) you want to embed below</li>
                      <li>Copy the embed code for your chosen method</li>
                      <li>Paste it into your website's HTML</li>
                      <li>Your widgets will automatically use your saved configuration!</li>
                    </ol>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-3">Widget Type to Embed</label>
                    <select
                      value={previewLayout}
                      onChange={(e) => setPreviewLayout(e.target.value as any)}
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:border-primary-500 focus:outline-none mb-4"
                    >
                      <option value="assessment">Assessment Widget Only</option>
                      <option value="offer">Offer Widget Only</option>
                      <option value="both">Both Widgets (Side by Side)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      📦 Method 1: iFrame Embed
                      <span className="text-xs text-gray-500 ml-2">(Easiest - works anywhere)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        readOnly
                        value={`<iframe 
  src="${typeof window !== 'undefined' ? window.location.origin : ''}/embed/${previewLayout === 'both' ? 'widgets' : previewLayout}-widget?partner=skulpt" 
  width="100%" 
  height="${previewLayout === 'both' ? '800' : '600'}" 
  frameborder="0"
  style="border: none; max-width: ${previewLayout === 'both' ? '1200px' : '600px'};">
</iframe>`}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs"
                        rows={6}
                        onClick={(e) => {
                          (e.target as HTMLTextAreaElement).select()
                          document.execCommand('copy')
                          setEmbedCopied(true)
                          setTimeout(() => setEmbedCopied(false), 2000)
                        }}
                      />
                      {embedCopied && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-xs">
                          Copied! ✓
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      ⚡ Method 2: JavaScript Embed
                      <span className="text-xs text-gray-500 ml-2">(Advanced - more control)</span>
                    </label>
                    <div className="relative">
                      <textarea
                        readOnly
                        value={`<div id="leadballoon-widget"></div>
<script>
  (function() {
    const config = ${JSON.stringify({ 
      partnerId: 'skulpt',
      widgetType: previewLayout,
      apiEndpoint: typeof window !== 'undefined' ? window.location.origin : ''
    }, null, 2)};
    
    const script = document.createElement('script');
    script.src = config.apiEndpoint + '/widget.js';
    script.async = true;
    script.onload = function() {
      LeadBalloon.init('leadballoon-widget', config);
    };
    document.head.appendChild(script);
  })();
</script>`}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-mono text-xs"
                        rows={12}
                        onClick={(e) => {
                          (e.target as HTMLTextAreaElement).select()
                          document.execCommand('copy')
                          setEmbedCopied(true)
                          setTimeout(() => setEmbedCopied(false), 2000)
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900 font-medium mb-2">🎯 Pro Tips</p>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• The iframe method is best for quick installations</li>
                      <li>• JavaScript embed allows for custom event handling</li>
                      <li>• Both methods will use your saved configuration automatically</li>
                      <li>• Test on a staging site first before going live</li>
                      <li>• Contact support if you need custom integration help</li>
                    </ul>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">🔗 Direct Widget Links</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Assessment Widget</span>
                        <a 
                          href="/assessment-widget" 
                          target="_blank"
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          Open →
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Offer Widget</span>
                        <a 
                          href="/offer-widget" 
                          target="_blank"
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          Open →
                        </a>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-8 h-fit space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b border-indigo-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">👁️</span>
                    Live Preview
                  </h3>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all"
                  >
                    {showPreview ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {showPreview ? (
                <div className="p-6">
                  {/* Widget Preview Tabs */}
                  <div className="bg-gray-50 p-1.5 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'assessment', label: 'Assessment' },
                        { id: 'offer', label: 'Offer' },
                        { id: 'both', label: 'Both' }
                      ].map(view => (
                        <button
                          key={view.id}
                          onClick={() => setPreviewLayout(view.id as any)}
                          className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                            previewLayout === view.id
                              ? 'bg-white text-gray-900 shadow-sm'
                              : 'text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {view.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                    <div className="p-3 border-b border-gray-700 text-center">
                      <p className="text-xs text-gray-400">
                        {previewLayout === 'assessment' && 'Assessment Widget Only'}
                        {previewLayout === 'offer' && 'Offer Widget Only'}
                        {previewLayout === 'both' && 'Both Widgets (2-Column Layout)'}
                      </p>
                    </div>
                    <div className="hide-scrollbar max-h-[600px] overflow-y-auto">
                      {previewLayout === 'assessment' && (
                        <AssessmentWidget />
                      )}
                      {previewLayout === 'offer' && (
                        <OfferWidget />
                      )}
                      {previewLayout === 'both' && (
                        <div className="grid grid-cols-2 gap-4 p-4">
                          <OfferWidget />
                          <AssessmentWidget />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>This is exactly how your widget will appear to users</p>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <div className="text-6xl mb-4">👁️</div>
                  <p className="text-gray-600">Preview hidden</p>
                  <button
                    onClick={() => setShowPreview(true)}
                    className="mt-4 text-primary-600 hover:text-primary-700"
                  >
                    Show Preview
                  </button>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            {hasChanges && (
              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-900 font-medium mb-2">
                  ⚠️ Remember to Save
                </p>
                <p className="text-xs text-gray-600">
                  Your changes are not saved yet. Click "Save Changes" to apply them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}