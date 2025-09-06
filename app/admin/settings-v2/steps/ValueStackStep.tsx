'use client'
import React from 'react'

interface ValueItem {
  item: string
  value: string
  description: string
}

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function ValueStackStep({ config, updateConfig }: Props) {
  const addValueItem = () => {
    const newItem: ValueItem = {
      item: '',
      value: '',
      description: ''
    }
    updateConfig({ 
      valueStack: [...(config.valueStack || []), newItem] 
    })
  }

  const updateValueItem = (index: number, field: keyof ValueItem, value: string) => {
    const updated = [...(config.valueStack || [])]
    updated[index] = { ...updated[index], [field]: value }
    updateConfig({ valueStack: updated })
  }

  const removeValueItem = (index: number) => {
    const updated = (config.valueStack || []).filter((_: any, i: number) => i !== index)
    updateConfig({ valueStack: updated })
  }

  const calculateTotalValue = () => {
    return (config.valueStack || []).reduce((sum: number, item: ValueItem) => {
      const value = parseFloat(item.value) || 0
      return sum + value
    }, 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Build Your Value Stack
        </h3>
        <p className="text-gray-600">
          Add each component of your offer with its value. Stack value until the price becomes irrelevant.
        </p>
      </div>

      {/* Value Items */}
      <div className="space-y-4">
        {(config.valueStack || []).map((item: ValueItem, index: number) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Component #{index + 1}</span>
              <button
                onClick={() => removeValueItem(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            
            <div className="grid gap-3">
              <input
                type="text"
                value={item.item}
                onChange={(e) => updateValueItem(index, 'item', e.target.value)}
                placeholder="Item name (e.g., 'Personalized Meal Plan')"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              
              <input
                type="text"
                value={item.value}
                onChange={(e) => updateValueItem(index, 'value', e.target.value)}
                placeholder="Value (e.g., '497')"
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
              
              <textarea
                value={item.description}
                onChange={(e) => updateValueItem(index, 'description', e.target.value)}
                placeholder="Brief description of what this includes..."
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button
        onClick={addValueItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl text-gray-600 hover:text-primary-600 font-medium transition-all"
      >
        + Add Value Component
      </button>

      {/* Total Value Display */}
      {config.valueStack?.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">Total Value:</span>
            <span className="text-2xl font-bold text-green-600">
              ${calculateTotalValue().toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          🤖 High-Value Components to Consider
        </p>
        <div className="grid gap-2">
          {[
            { item: "1-on-1 Coaching Calls", value: "2000", desc: "Weekly personal coaching sessions" },
            { item: "Done-For-You Templates", value: "997", desc: "Pre-built systems ready to deploy" },
            { item: "Private Community Access", value: "497", desc: "Exclusive mastermind group" },
            { item: "Lifetime Updates", value: "297", desc: "All future improvements included" },
            { item: "Quick Start Bonus", value: "197", desc: "Implementation sprint in first 7 days" }
          ].map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => {
                const newItem: ValueItem = {
                  item: suggestion.item,
                  value: suggestion.value,
                  description: suggestion.desc
                }
                updateConfig({ 
                  valueStack: [...(config.valueStack || []), newItem] 
                })
              }}
              className="text-left px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
            >
              <div className="font-medium text-sm text-gray-700">{suggestion.item}</div>
              <div className="text-xs text-gray-500">${suggestion.value} - {suggestion.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}