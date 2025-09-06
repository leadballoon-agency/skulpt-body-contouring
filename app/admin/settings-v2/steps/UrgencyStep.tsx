'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function UrgencyStep({ config, updateConfig }: Props) {
  const updateUrgency = (field: string, value: any) => {
    updateConfig({
      urgency: { ...config.urgency, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Create Urgency
        </h3>
        <p className="text-gray-600">
          Give them a reason to buy NOW. Urgency without a reason is manipulation - always explain WHY it's limited.
        </p>
      </div>

      {/* Scarcity - Limited Spots */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          🔥 Limited Availability
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Only</span>
          <input
            type="number"
            value={config.urgency?.spots || ''}
            onChange={(e) => updateUrgency('spots', parseInt(e.target.value) || 0)}
            className="w-20 px-3 py-2 text-center font-bold text-lg bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <span className="text-sm text-gray-600">spots remaining</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Shows decreasing availability to create FOMO
        </p>
      </div>

      {/* Urgency - Countdown Timer */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ⏰ Countdown Timer
        </label>
        <div className="flex items-center gap-3">
          <div>
            <input
              type="number"
              value={config.urgency?.timerHours || ''}
              onChange={(e) => updateUrgency('timerHours', parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-2 text-center font-bold text-lg bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">Hours</p>
          </div>
          <span className="text-2xl text-gray-400">:</span>
          <div>
            <input
              type="number"
              value={config.urgency?.timerMinutes || ''}
              onChange={(e) => updateUrgency('timerMinutes', parseInt(e.target.value) || 0)}
              max="59"
              className="w-20 px-3 py-2 text-center font-bold text-lg bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">Minutes</p>
          </div>
        </div>
      </div>

      {/* What Happens When Timer Expires */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          What happens when the timer expires?
        </label>
        <div className="grid gap-3">
          <button
            onClick={() => updateUrgency('expiryAction', 'price-increase')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.urgency?.expiryAction === 'price-increase'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="font-semibold text-sm text-gray-900 mb-1">📈 Price Increases</div>
            <div className="text-xs text-gray-500">
              "After midnight, the price goes up to $1,497"
            </div>
          </button>
          
          <button
            onClick={() => updateUrgency('expiryAction', 'bonuses-expire')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.urgency?.expiryAction === 'bonuses-expire'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="font-semibold text-sm text-gray-900 mb-1">🎁 Bonuses Expire</div>
            <div className="text-xs text-gray-500">
              "Fast action bonuses worth $500 disappear forever"
            </div>
          </button>
          
          <button
            onClick={() => updateUrgency('expiryAction', 'enrollment-closes')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.urgency?.expiryAction === 'enrollment-closes'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="font-semibold text-sm text-gray-900 mb-1">🚪 Enrollment Closes</div>
            <div className="text-xs text-gray-500">
              "Doors close and won't open again for 6 months"
            </div>
          </button>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          ⚡ Quick Urgency Presets
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateConfig({
              urgency: {
                spots: 5,
                timerHours: 23,
                timerMinutes: 59,
                expiryAction: 'enrollment-closes'
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">24-Hour Launch</div>
            <div className="text-xs text-gray-500">Classic daily offer</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              urgency: {
                spots: 10,
                timerHours: 71,
                timerMinutes: 59,
                expiryAction: 'price-increase'
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">72-Hour Special</div>
            <div className="text-xs text-gray-500">Weekend promotion</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              urgency: {
                spots: 3,
                timerHours: 2,
                timerMinutes: 0,
                expiryAction: 'bonuses-expire'
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">Flash Sale</div>
            <div className="text-xs text-gray-500">2 hours only</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              urgency: {
                spots: 7,
                timerHours: 167,
                timerMinutes: 59,
                expiryAction: 'enrollment-closes'
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">Week Long</div>
            <div className="text-xs text-gray-500">7-day campaign</div>
          </button>
        </div>
      </div>

      {/* Ethical Urgency Note */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">💡 Ethical Urgency</p>
        <p className="text-xs text-gray-700">
          Always have a REAL reason for urgency: Limited seats in a cohort, bonus supplier limits, 
          your personal time constraints, seasonal relevance, or price testing periods. 
          Fake urgency destroys trust and creates refunds.
        </p>
      </div>
    </div>
  )
}