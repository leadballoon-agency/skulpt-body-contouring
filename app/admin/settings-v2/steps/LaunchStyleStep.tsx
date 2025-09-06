'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function LaunchStyleStep({ config, updateConfig }: Props) {
  const updateLaunchStyle = (field: string, value: any) => {
    updateConfig({
      launchStyle: { ...config.launchStyle, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Launch Style
        </h3>
        <p className="text-gray-600">
          How and when should your widget appear? Different triggers work better for different audiences.
        </p>
      </div>

      {/* Trigger Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          When to Show Widget
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateLaunchStyle('trigger', 'time')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.trigger === 'time'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⏱️</span>
              <span className="font-semibold text-sm text-gray-900">Time Delay</span>
            </div>
            <p className="text-xs text-gray-500">
              Show after X seconds on page
            </p>
            <p className="text-xs text-green-600 mt-1">
              Least intrusive • Good for content
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('trigger', 'scroll')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.trigger === 'scroll'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📜</span>
              <span className="font-semibold text-sm text-gray-900">Scroll Depth</span>
            </div>
            <p className="text-xs text-gray-500">
              Show after scrolling 50%
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Engaged visitors • Medium convert
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('trigger', 'exit')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.trigger === 'exit'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🚪</span>
              <span className="font-semibold text-sm text-gray-900">Exit Intent</span>
            </div>
            <p className="text-xs text-gray-500">
              Show when leaving page
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Highest converting • Last chance
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('trigger', 'button')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.trigger === 'button'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🔘</span>
              <span className="font-semibold text-sm text-gray-900">Button Click</span>
            </div>
            <p className="text-xs text-gray-500">
              User triggers manually
            </p>
            <p className="text-xs text-orange-600 mt-1">
              User initiated • High intent
            </p>
          </button>
        </div>
      </div>

      {/* Display Style Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          How to Display Widget
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateLaunchStyle('display', 'fullscreen')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.display === 'fullscreen'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">🖥️</span>
              <span className="font-semibold text-sm text-gray-900">Fullscreen Overlay</span>
            </div>
            <p className="text-xs text-gray-500">
              Takes over entire screen
            </p>
            <p className="text-xs text-green-600 mt-1">
              Maximum focus • Can't ignore
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('display', 'slide')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.display === 'slide'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📱</span>
              <span className="font-semibold text-sm text-gray-900">Slide-in Panel</span>
            </div>
            <p className="text-xs text-gray-500">
              Slides from side/bottom
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Less intrusive • Mobile friendly
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('display', 'bar')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.display === 'bar'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📊</span>
              <span className="font-semibold text-sm text-gray-900">Top/Bottom Bar</span>
            </div>
            <p className="text-xs text-gray-500">
              Sticky bar with CTA
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Always visible • Persistent
            </p>
          </button>
          
          <button
            onClick={() => updateLaunchStyle('display', 'embedded')}
            className={`p-4 rounded-xl border-2 text-left transition-all ${
              config.launchStyle?.display === 'embedded'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📄</span>
              <span className="font-semibold text-sm text-gray-900">Embedded</span>
            </div>
            <p className="text-xs text-gray-500">
              Part of page content
            </p>
            <p className="text-xs text-orange-600 mt-1">
              Natural flow • No popup
            </p>
          </button>
        </div>
      </div>

      {/* Preview of Settings */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-3">Current Configuration:</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">
              Widget will appear via <strong>{config.launchStyle?.trigger || 'time'} trigger</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span className="text-sm text-gray-700">
              Display as <strong>{config.launchStyle?.display || 'fullscreen'} overlay</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Best Practice Combinations */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          🏆 Winning Combinations
        </p>
        <div className="grid gap-2">
          <button
            onClick={() => updateConfig({
              launchStyle: { trigger: 'exit', display: 'fullscreen' }
            })}
            className="flex items-center justify-between px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="text-left">
              <div className="font-medium text-xs text-gray-700">Exit + Fullscreen</div>
              <div className="text-xs text-gray-500">Highest converting combo</div>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Best</span>
          </button>
          
          <button
            onClick={() => updateConfig({
              launchStyle: { trigger: 'scroll', display: 'slide' }
            })}
            className="flex items-center justify-between px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="text-left">
              <div className="font-medium text-xs text-gray-700">Scroll + Slide</div>
              <div className="text-xs text-gray-500">Balanced engagement</div>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Popular</span>
          </button>
          
          <button
            onClick={() => updateConfig({
              launchStyle: { trigger: 'time', display: 'bar' }
            })}
            className="flex items-center justify-between px-3 py-2 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="text-left">
              <div className="font-medium text-xs text-gray-700">Time + Bar</div>
              <div className="text-xs text-gray-500">Subtle persistence</div>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Safe</span>
          </button>
        </div>
      </div>

      {/* Mobile Consideration */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">📱 Mobile Consideration</p>
        <p className="text-xs text-gray-700">
          {config.launchStyle?.display === 'fullscreen' 
            ? "Fullscreen works great on mobile but ensure your widget is responsive."
            : config.launchStyle?.display === 'slide'
            ? "Slide-in is mobile-optimized. Consider sliding from bottom on mobile devices."
            : config.launchStyle?.display === 'bar'
            ? "Bars can feel cramped on mobile. Consider switching to slide-in for mobile users."
            : "Embedded widgets need responsive design to work well on all screen sizes."
          }
        </p>
      </div>
    </div>
  )
}