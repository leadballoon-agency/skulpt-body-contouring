'use client'

import { useState, useEffect } from 'react'

// Import directly instead of dynamic to avoid webpack issues
import LiveOfferPreview from './components/LiveOfferPreview'

// Preview widgets - temporarily disabled to fix runtime error
// const OfferWidget = dynamic(() => import('../../offer-widget/page'), { 
//   ssr: false,
//   loading: () => <div className="p-8 text-center text-gray-400">Loading offer widget...</div>
// })
// const AssessmentWidget = dynamic(() => import('../../assessment-widget/page'), { 
//   ssr: false,
//   loading: () => <div className="p-8 text-center text-gray-400">Loading assessment widget...</div>
// })

interface ConfigData {
  dreamOutcome: string
  valueStack: Array<{
    item: string
    value: string
    description: string
  }>
  pricing: {
    totalValue: number
    offerPrice: number
    hasPaymentPlan: boolean
    paymentPlanPrice?: number
  }
  guarantee: {
    type: 'refund' | 'double' | 'pay-after'
    text: string
  }
  urgency: {
    spots: number
    timerHours: number
    timerMinutes: number
    expiryAction: 'price-increase' | 'bonuses-expire' | 'enrollment-closes'
  }
  qualification: {
    questions: Array<{
      question: string
      options: string[]
      scores: number[]
    }>
  }
  thresholds: {
    minimumScore: number
    autoDisqualify: {
      lowBudget: boolean
      notUrgent: boolean
      cantCommit: boolean
    }
  }
  launchStyle: {
    trigger: 'time' | 'scroll' | 'exit' | 'button'
    display: 'fullscreen' | 'slide' | 'bar' | 'embedded'
  }
  tracking: {
    facebookPixel?: string
    googleAnalytics?: string
    tiktokPixel?: string
  }
}

const STEPS = [
  { id: 'analyze', name: 'Analyze', group: 'research' },
  { id: 'dream-outcome', name: 'Dream Outcome', group: 'offer' },
  { id: 'value-stack', name: 'Value Stack', group: 'offer' },
  { id: 'pricing', name: 'Set Price', group: 'offer' },
  { id: 'guarantee', name: 'Guarantee', group: 'offer' },
  { id: 'urgency', name: 'Urgency', group: 'offer' },
  { id: 'preview-offer', name: 'Preview Offer', group: 'offer' },
  { id: 'qualification', name: 'Qualification', group: 'assessment' },
  { id: 'thresholds', name: 'Thresholds', group: 'assessment' },
  { id: 'launch-style', name: 'Launch Style', group: 'launch' },
  { id: 'tracking', name: 'Tracking', group: 'launch' },
  { id: 'deploy', name: 'Deploy', group: 'launch' }
]

export default function ElegantConfigurator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<ConfigData>({
    dreamOutcome: '',
    valueStack: [],
    pricing: {
      totalValue: 0,
      offerPrice: 0,
      hasPaymentPlan: false
    },
    guarantee: {
      type: 'refund',
      text: ''
    },
    urgency: {
      spots: 7,
      timerHours: 23,
      timerMinutes: 59,
      expiryAction: 'enrollment-closes'
    },
    qualification: {
      questions: []
    },
    thresholds: {
      minimumScore: 7,
      autoDisqualify: {
        lowBudget: true,
        notUrgent: false,
        cantCommit: false
      }
    },
    launchStyle: {
      trigger: 'time',
      display: 'fullscreen'
    },
    tracking: {}
  })

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('leadballoon_config', JSON.stringify(config))
    }, 1000)
    return () => clearTimeout(timer)
  }, [config])

  // Load saved config on mount
  useEffect(() => {
    const saved = localStorage.getItem('leadballoon_config')
    if (saved) {
      setConfig(JSON.parse(saved))
    }
  }, [])

  // Import step components dynamically to avoid circular dependencies
  const [CurrentStepComponent, setCurrentStepComponent] = useState<any>(null)
  
  useEffect(() => {
    const loadStepComponent = async () => {
      let component = null
      
      switch(currentStep) {
        case 0:
          const { default: AnalyzeStep } = await import('./steps/AnalyzeStep')
          component = AnalyzeStep
          break
        case 1:
          const { default: DreamOutcomeStep } = await import('./steps/DreamOutcomeStep')
          component = DreamOutcomeStep
          break
        case 2:
          const { default: ValueStackStep } = await import('./steps/ValueStackStep')
          component = ValueStackStep
          break
        case 3:
          const { default: PricingStep } = await import('./steps/PricingStep')
          component = PricingStep
          break
        case 4:
          const { default: GuaranteeStep } = await import('./steps/GuaranteeStep')
          component = GuaranteeStep
          break
        case 5:
          const { default: UrgencyStep } = await import('./steps/UrgencyStep')
          component = UrgencyStep
          break
        case 6:
          const { default: PreviewOfferStep } = await import('./steps/PreviewOfferStep')
          component = PreviewOfferStep
          break
        case 7:
          const { default: QualificationStep } = await import('./steps/QualificationStep')
          component = QualificationStep
          break
        case 8:
          const { default: ThresholdsStep } = await import('./steps/ThresholdsStep')
          component = ThresholdsStep
          break
        case 9:
          const { default: LaunchStyleStep } = await import('./steps/LaunchStyleStep')
          component = LaunchStyleStep
          break
        case 10:
          const { default: TrackingStep } = await import('./steps/TrackingStep')
          component = TrackingStep
          break
        case 11:
          const { default: DeployStep } = await import('./steps/DeployStep')
          component = DeployStep
          break
        default:
          const { default: DefaultStep } = await import('./steps/AnalyzeStep')
          component = DefaultStep
      }
      
      setCurrentStepComponent(() => component)
    }
    
    loadStepComponent()
  }, [currentStep])

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true // Analyze is optional - can skip
      case 1: return config.dreamOutcome.length > 10
      case 2: return config.valueStack.length >= 3
      case 3: return config.pricing.offerPrice > 0
      case 4: return config.guarantee.text.length > 10
      case 5: return true // Urgency has defaults
      case 6: return true // Preview, just continue
      case 7: return config.qualification.questions.length >= 2
      case 8: return true // Thresholds have defaults
      case 9: return true // Launch style has defaults
      case 10: return true // Tracking is optional
      default: return false
    }
  }

  const updateConfig = (updates: Partial<ConfigData>) => {
    setConfig(prev => ({ ...prev, ...updates }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Clean Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">LeadBalloon AI</h1>
                <p className="text-sm text-gray-500">Build Your Perfect Offer</p>
              </div>
            </div>
            
            {/* Progress Indicator - Simplified */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (confirm('Reset all settings and start fresh?')) {
                    localStorage.removeItem('widgetConfig')
                    window.location.reload()
                  }
                }}
                className="text-sm text-gray-500 hover:text-red-600 font-medium"
              >
                🔄 Reset
              </button>
              <span className="text-sm font-medium text-gray-700">
                {currentStep === 0 ? 'Analyzing Market' : 
                 currentStep <= 6 ? 'Building Offer' : 
                 currentStep <= 8 ? 'Setting Qualification' : 
                 'Ready to Launch'}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Step Content */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Step Header */}
              <div className="bg-gradient-to-r from-primary-50 to-white p-6 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold">{currentStep + 1}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {STEPS[currentStep].name}
                  </h2>
                </div>
              </div>

              {/* Step Content */}
              <div className="p-8">
                {CurrentStepComponent ? (
                  <CurrentStepComponent 
                    config={config}
                    updateConfig={updateConfig}
                  />
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="px-8 pb-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  ← Back
                </button>

                <button
                  onClick={() => setCurrentStep(Math.min(STEPS.length - 1, currentStep + 1))}
                  disabled={!canProceed()}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    canProceed()
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentStep === STEPS.length - 1 ? 'Launch 🚀' : 'Next →'}
                </button>
              </div>
            </div>

            {/* Step Hints */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-900 font-medium mb-1">💡 Pro Tip</p>
              <p className="text-xs text-gray-700">
                {currentStep === 0 && "Focus on the transformation, not the features. What will their life look like after?"}
                {currentStep === 1 && "Stack value until the price becomes irrelevant. Each component should solve a specific problem."}
                {currentStep === 2 && "Price at 10-20% of total value for maximum perceived value."}
                {currentStep === 3 && "Make your guarantee so strong that NOT buying feels risky."}
                {currentStep === 4 && "Urgency without a reason is manipulation. Always explain WHY it's limited."}
                {currentStep === 5 && "This is exactly what your visitors will see. Make sure it's irresistible!"}
                {currentStep === 6 && "Qualify for commitment and budget. You want buyers, not browsers."}
                {currentStep === 7 && "Set thresholds high enough to filter tire-kickers but not so high you lose good leads."}
                {currentStep === 8 && "Exit intent is highest converting. Time-based is least intrusive."}
                {currentStep === 9 && "Tracking is optional but recommended. You can't improve what you don't measure."}
              </p>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-white p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="text-xl">👁️</span>
                  Live Preview
                </h3>
                <p className="text-sm text-gray-500 mt-1">See your changes in real-time</p>
              </div>

              <div className="bg-gray-900 max-h-[600px] overflow-y-auto p-4">
                {currentStep <= 6 ? (
                  <LiveOfferPreview config={config} />
                ) : (
                  <div className="bg-gray-800 rounded-xl p-8 text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">
                      Assessment Widget Preview
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Qualification questions will appear here
                    </p>
                    {config.qualification.questions.length > 0 && (
                      <div className="mt-4 text-xs text-gray-500">
                        {config.qualification.questions.length} questions configured
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Preview Info */}
              <div className="p-4 bg-gray-50 border-t text-center">
                <p className="text-sm text-gray-600">
                  {currentStep <= 5 ? 'Offer Widget Preview' : 'Assessment Widget Preview'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Timeline (Bottom) - Simplified */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {[
              { id: 'research', label: '🔍 Research', steps: [0] },
              { id: 'offer', label: '🎯 Build Offer', steps: [1, 2, 3, 4, 5, 6] },
              { id: 'assessment', label: '✅ Qualify', steps: [7, 8] },
              { id: 'launch', label: '🚀 Launch', steps: [9, 10] }
            ].map((group, idx) => (
              <div
                key={group.id}
                className={`flex items-center ${idx < 3 ? 'flex-1' : ''}`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    group.steps.every(s => s < currentStep)
                      ? 'bg-green-500 text-white'
                      : group.steps.includes(currentStep)
                      ? 'bg-primary-500 text-white ring-4 ring-primary-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {group.steps.every(s => s < currentStep) ? '✓' : idx + 1}
                  </div>
                  <span className={`ml-3 text-sm hidden md:block ${
                    group.steps.includes(currentStep) ? 'text-gray-900 font-semibold' : 'text-gray-500'
                  }`}>
                    {group.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    group.steps.every(s => s < currentStep) ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}