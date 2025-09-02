'use client'

import { useState } from 'react'
import type { AssessmentData } from '@/app/api/assessment/route'

const initialFormData: Partial<AssessmentData> = {
  name: '',
  email: '',
  phone: '',
  age: 0,
  gender: 'female',
  height: 0,
  weight: 0,
  targetAreas: [],
  goals: [],
  medicalHistory: [],
  lifestyle: {
    exercise: 'moderate',
    diet: 'good',
    smoking: false,
    alcohol: 'none'
  },
  preferences: {
    treatmentType: 'any',
    budget: '5k-10k',
    timeline: 'flexible'
  }
}

const targetAreaOptions = [
  'abdomen', 'flanks', 'back', 'arms', 'thighs', 'buttocks', 'chin', 'neck', 'other'
]

const goalOptions = [
  'fat-reduction', 'skin-tightening', 'muscle-definition', 'cellulite-reduction', 
  'overall-contouring', 'post-pregnancy-restoration', 'weight-loss-maintenance'
]

const medicalHistoryOptions = [
  'diabetes', 'heart-disease', 'blood-clotting-disorders', 'skin-conditions',
  'previous-surgeries', 'allergies', 'medications', 'pregnancy', 'none'
]

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<AssessmentData>>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{success: boolean, message: string} | null>(null)

  const totalSteps = 5

  const updateFormData = (updates: Partial<AssessmentData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const handleArrayToggle = (field: keyof AssessmentData, value: string) => {
    const currentArray = (formData[field] as string[]) || []
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value]
    updateFormData({ [field]: newArray })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmitResult({ success: true, message: 'Assessment completed successfully!' })
      } else {
        setSubmitResult({ success: false, message: result.error || 'Something went wrong' })
      }
    } catch (error) {
      setSubmitResult({ success: false, message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              submitResult.success ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {submitResult.success ? (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {submitResult.success ? 'Assessment Complete!' : 'Submission Failed'}
            </h2>
            <p className="text-gray-600 mb-6">{submitResult.message}</p>
            {submitResult.success && (
              <p className="text-sm text-gray-500">
                Our team will review your assessment and contact you within 24 hours with personalized recommendations.
              </p>
            )}
            <button 
              onClick={() => {
                setSubmitResult(null)
                setCurrentStep(1)
                setFormData(initialFormData)
              }}
              className="btn btn-primary mt-4"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Free Body Contouring Assessment
          </h2>
          <p className="text-lg text-gray-600">
            Get personalized treatment recommendations based on your goals and body type
          </p>
          
          {/* Progress Bar */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={formData.age || ''}
                    onChange={(e) => updateFormData({ age: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <div className="flex gap-4">
                  {(['female', 'male', 'other'] as const).map(gender => (
                    <label key={gender} className="flex items-center">
                      <input
                        type="radio"
                        value={gender}
                        checked={formData.gender === gender}
                        onChange={(e) => updateFormData({ gender: e.target.value as any })}
                        className="mr-2"
                      />
                      <span className="capitalize">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Physical Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (cm) *
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="250"
                    value={formData.height || ''}
                    onChange={(e) => updateFormData({ height: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (kg) *
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={formData.weight || ''}
                    onChange={(e) => updateFormData({ weight: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Areas * (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {targetAreaOptions.map(area => (
                    <label key={area} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.targetAreas?.includes(area) || false}
                        onChange={() => handleArrayToggle('targetAreas', area)}
                        className="mr-2"
                      />
                      <span className="capitalize text-sm">{area.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Goals & Medical History</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Treatment Goals * (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {goalOptions.map(goal => (
                    <label key={goal} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.goals?.includes(goal) || false}
                        onChange={() => handleArrayToggle('goals', goal)}
                        className="mr-2"
                      />
                      <span className="capitalize text-sm">{goal.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical History (Select all that apply)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {medicalHistoryOptions.map(condition => (
                    <label key={condition} className="flex items-center p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.medicalHistory?.includes(condition) || false}
                        onChange={() => handleArrayToggle('medicalHistory', condition)}
                        className="mr-2"
                      />
                      <span className="capitalize text-sm">{condition.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Lifestyle Information</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Level
                  </label>
                  <select
                    value={formData.lifestyle?.exercise || 'moderate'}
                    onChange={(e) => updateFormData({
                      lifestyle: { ...formData.lifestyle, exercise: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="none">No exercise</option>
                    <option value="light">Light (1-2 times/week)</option>
                    <option value="moderate">Moderate (3-4 times/week)</option>
                    <option value="heavy">Heavy (5+ times/week)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Diet Quality
                  </label>
                  <select
                    value={formData.lifestyle?.diet || 'good'}
                    onChange={(e) => updateFormData({
                      lifestyle: { ...formData.lifestyle, diet: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="poor">Poor</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.lifestyle?.smoking || false}
                      onChange={(e) => updateFormData({
                        lifestyle: { ...formData.lifestyle, smoking: e.target.checked }
                      })}
                      className="mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">I smoke tobacco</span>
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alcohol Consumption
                  </label>
                  <select
                    value={formData.lifestyle?.alcohol || 'none'}
                    onChange={(e) => updateFormData({
                      lifestyle: { ...formData.lifestyle, alcohol: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Treatment Preferences</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Treatment Type
                  </label>
                  <select
                    value={formData.preferences?.treatmentType || 'any'}
                    onChange={(e) => updateFormData({
                      preferences: { ...formData.preferences, treatmentType: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="any">Any</option>
                    <option value="non-invasive">Non-invasive only</option>
                    <option value="minimally-invasive">Minimally invasive</option>
                    <option value="surgical">Surgical procedures</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    value={formData.preferences?.budget || '5k-10k'}
                    onChange={(e) => updateFormData({
                      preferences: { ...formData.preferences, budget: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-20k">$10,000 - $20,000</option>
                    <option value="over-20k">Over $20,000</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    value={formData.preferences?.timeline || 'flexible'}
                    onChange={(e) => updateFormData({
                      preferences: { ...formData.preferences, timeline: e.target.value as any }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="1-3months">1-3 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn btn-outline disabled:opacity-50"
            >
              Previous
            </button>
            
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}