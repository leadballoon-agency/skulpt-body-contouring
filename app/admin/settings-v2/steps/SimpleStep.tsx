'use client'

import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function SimpleStep({ config, updateConfig }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Simple Test Step</h3>
      <p>This is a simple step component for testing.</p>
      <input 
        type="text" 
        placeholder="Enter something..."
        className="px-4 py-2 border rounded"
        onChange={(e) => updateConfig({ testValue: e.target.value })}
      />
    </div>
  )
}