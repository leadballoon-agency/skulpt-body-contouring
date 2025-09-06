'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function ThresholdsStep({ config, updateConfig }: Props) {
  const updateThresholds = (field: string, value: any) => {
    updateConfig({
      thresholds: { ...config.thresholds, [field]: value }
    })
  }

  const updateAutoDisqualify = (field: string, value: boolean) => {
    updateConfig({
      thresholds: { 
        ...config.thresholds, 
        autoDisqualify: {
          ...config.thresholds?.autoDisqualify,
          [field]: value
        }
      }
    })
  }

  const maxPossibleScore = (config.qualification?.questions || []).length * 10

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Set Qualification Thresholds
        </h3>
        <p className="text-gray-600">
          Determine who qualifies for your offer. Set high enough to filter tire-kickers but not so high you lose good leads.
        </p>
      </div>

      {/* Current Questions Summary */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-700">Assessment Overview</p>
            <p className="text-xs text-gray-500 mt-1">
              {config.qualification?.questions?.length || 0} questions configured
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{maxPossibleScore}</p>
            <p className="text-xs text-gray-500">Max Score</p>
          </div>
        </div>
      </div>

      {/* Minimum Score Slider */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Minimum Score to Qualify
        </label>
        
        <div className="relative">
          <input
            type="range"
            min="0"
            max={maxPossibleScore}
            value={config.thresholds?.minimumScore || 0}
            onChange={(e) => updateThresholds('minimumScore', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #10b981 0%, #10b981 ${((config.thresholds?.minimumScore || 0) / maxPossibleScore) * 100}%, #e5e7eb ${((config.thresholds?.minimumScore || 0) / maxPossibleScore) * 100}%, #e5e7eb 100%)`
            }}
          />
          
          {/* Score Display */}
          <div className="flex justify-between mt-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{config.thresholds?.minimumScore || 0}</p>
              <p className="text-xs text-gray-500">Minimum to Qualify</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-400">
                {maxPossibleScore > 0 ? Math.round(((config.thresholds?.minimumScore || 0) / maxPossibleScore) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-500">of Max Score</p>
            </div>
          </div>
        </div>

        {/* Visual Zones */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
            <p className="text-xs font-semibold text-red-900">Not Qualified</p>
            <p className="text-xs text-gray-600 mt-1">0 - {(config.thresholds?.minimumScore || 1) - 1}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
            <p className="text-xs font-semibold text-yellow-900">Borderline</p>
            <p className="text-xs text-gray-600 mt-1">
              {config.thresholds?.minimumScore || 0} - {Math.round((config.thresholds?.minimumScore || 0) * 1.3)}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
            <p className="text-xs font-semibold text-green-900">Highly Qualified</p>
            <p className="text-xs text-gray-600 mt-1">
              {Math.round((config.thresholds?.minimumScore || 0) * 1.3) + 1}+
            </p>
          </div>
        </div>
      </div>

      {/* Auto-Disqualify Rules */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Instant Disqualifiers
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Automatically disqualify leads who select these options (saves everyone time)
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="font-medium text-sm text-gray-900">Low Budget</p>
              <p className="text-xs text-gray-500">Disqualify if budget is lowest option</p>
            </div>
            <button
              onClick={() => updateAutoDisqualify('lowBudget', !config.thresholds?.autoDisqualify?.lowBudget)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.thresholds?.autoDisqualify?.lowBudget ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                config.thresholds?.autoDisqualify?.lowBudget ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="font-medium text-sm text-gray-900">Not Urgent</p>
              <p className="text-xs text-gray-500">Disqualify if timeline is "no rush"</p>
            </div>
            <button
              onClick={() => updateAutoDisqualify('notUrgent', !config.thresholds?.autoDisqualify?.notUrgent)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.thresholds?.autoDisqualify?.notUrgent ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                config.thresholds?.autoDisqualify?.notUrgent ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <p className="font-medium text-sm text-gray-900">Can't Commit</p>
              <p className="text-xs text-gray-500">Disqualify if commitment is "just exploring"</p>
            </div>
            <button
              onClick={() => updateAutoDisqualify('cantCommit', !config.thresholds?.autoDisqualify?.cantCommit)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                config.thresholds?.autoDisqualify?.cantCommit ? 'bg-primary-500' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                config.thresholds?.autoDisqualify?.cantCommit ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Thresholds */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          🎯 Recommended Thresholds by Business Type
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateConfig({
              thresholds: {
                minimumScore: Math.round(maxPossibleScore * 0.7),
                autoDisqualify: { lowBudget: true, notUrgent: true, cantCommit: true }
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">High-Ticket</div>
            <div className="text-xs text-gray-500">70% threshold</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              thresholds: {
                minimumScore: Math.round(maxPossibleScore * 0.5),
                autoDisqualify: { lowBudget: false, notUrgent: false, cantCommit: true }
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">Mid-Ticket</div>
            <div className="text-xs text-gray-500">50% threshold</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              thresholds: {
                minimumScore: Math.round(maxPossibleScore * 0.3),
                autoDisqualify: { lowBudget: false, notUrgent: false, cantCommit: false }
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">Low-Ticket</div>
            <div className="text-xs text-gray-500">30% threshold</div>
          </button>
          
          <button
            onClick={() => updateConfig({
              thresholds: {
                minimumScore: Math.round(maxPossibleScore * 0.8),
                autoDisqualify: { lowBudget: true, notUrgent: true, cantCommit: true }
              }
            })}
            className="px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="font-medium text-xs text-gray-700">Enterprise</div>
            <div className="text-xs text-gray-500">80% threshold</div>
          </button>
        </div>
      </div>

      {/* Psychology Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Psychology Tip</p>
        <p className="text-xs text-gray-700">
          Higher thresholds create exclusivity and increase desire. People want what they might not qualify for. 
          But set it too high and you'll miss good customers who just need a little nurturing.
        </p>
      </div>
    </div>
  )
}