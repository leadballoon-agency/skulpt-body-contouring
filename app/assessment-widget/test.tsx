'use client'

import { useState } from 'react'

export default function TestWidget() {
  const [step, setStep] = useState(1)
  
  return (
    <div className="bg-black text-white p-4">
      <div className="w-full max-w-md mx-auto">
        <h1>Test Step {step}</h1>
        <button onClick={() => setStep(step + 1)}>Next</button>
      </div>
    </div>
  )
}