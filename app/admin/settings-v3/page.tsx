'use client'

import { useState } from 'react'
import SimpleStep from '../settings-v2/steps/SimpleStep'

export default function MinimalConfigurator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState({})
  
  const steps = [
    { name: 'Step 1', id: 'step1' },
    { name: 'Step 2', id: 'step2' },
    { name: 'Step 3', id: 'step3' }
  ]
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Settings V3 - Minimal Test</h1>
        
        <div className="bg-white rounded-lg p-8 shadow">
          <h2 className="text-xl font-semibold mb-4">
            {steps[currentStep].name}
          </h2>
          
          <div className="space-y-4">
            <p>Current step: {currentStep + 1} of {steps.length}</p>
            
            {currentStep === 0 && (
              <SimpleStep config={config} updateConfig={(updates: any) => setConfig({...config, ...updates})} />
            )}
            
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Back
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                disabled={currentStep === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}