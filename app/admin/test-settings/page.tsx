'use client'

import { useState } from 'react'

export default function TestSettings() {
  const [step, setStep] = useState(0)
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-4">Test Settings Page</h1>
      <p>Current step: {step}</p>
      <button 
        onClick={() => setStep(step + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next Step
      </button>
    </div>
  )
}