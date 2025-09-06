'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function TrackingStep({ config, updateConfig }: Props) {
  const updateTracking = (field: string, value: string) => {
    updateConfig({
      tracking: { ...config.tracking, [field]: value }
    })
  }

  const isValidPixel = (pixelId: string, type: string) => {
    if (!pixelId) return true // Empty is valid (optional)
    
    switch(type) {
      case 'facebook':
        return /^\d{15,16}$/.test(pixelId)
      case 'google':
        return /^(UA-\d{4,10}-\d{1,4}|G-[A-Z0-9]{10}|AW-[A-Z0-9]{9})$/.test(pixelId)
      case 'tiktok':
        return /^[A-Z0-9]{20}$/.test(pixelId)
      default:
        return true
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Setup Tracking Pixels
        </h3>
        <p className="text-gray-600">
          Track conversions and optimize your ads. You can't improve what you don't measure.
        </p>
      </div>

      {/* Tracking Benefits */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">🎯 Why Add Tracking?</p>
        <div className="grid md:grid-cols-2 gap-2 text-xs text-gray-700">
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Track ROI on every ad dollar spent</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Build retargeting audiences automatically</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Let AI optimize for conversions</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>See which ads drive real revenue</span>
          </div>
        </div>
      </div>

      {/* Facebook Pixel */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">📘</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Facebook/Meta Pixel</p>
            <p className="text-xs text-gray-500">Track Facebook & Instagram ads</p>
          </div>
        </div>
        
        <input
          type="text"
          value={config.tracking?.facebookPixel || ''}
          onChange={(e) => updateTracking('facebookPixel', e.target.value)}
          placeholder="e.g., 123456789012345"
          className={`w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            isValidPixel(config.tracking?.facebookPixel || '', 'facebook')
              ? 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'
              : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          }`}
        />
        
        {config.tracking?.facebookPixel && !isValidPixel(config.tracking.facebookPixel, 'facebook') && (
          <p className="text-xs text-red-500 mt-1">Invalid format. Should be 15-16 digits.</p>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Find in Events Manager → Data Sources → Your Pixel → Settings
        </p>
      </div>

      {/* Google Analytics */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">Google Analytics</p>
            <p className="text-xs text-gray-500">Track Google Ads & organic traffic</p>
          </div>
        </div>
        
        <input
          type="text"
          value={config.tracking?.googleAnalytics || ''}
          onChange={(e) => updateTracking('googleAnalytics', e.target.value)}
          placeholder="e.g., G-XXXXXXXXXX or UA-XXXXXX-X"
          className={`w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            isValidPixel(config.tracking?.googleAnalytics || '', 'google')
              ? 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'
              : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          }`}
        />
        
        {config.tracking?.googleAnalytics && !isValidPixel(config.tracking.googleAnalytics, 'google') && (
          <p className="text-xs text-red-500 mt-1">Invalid format. Use GA4 (G-XXX) or Universal (UA-XXX) format.</p>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Find in Google Analytics → Admin → Data Streams → Your Stream
        </p>
      </div>

      {/* TikTok Pixel */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
            <span className="text-lg">🎵</span>
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">TikTok Pixel</p>
            <p className="text-xs text-gray-500">Track TikTok ad performance</p>
          </div>
        </div>
        
        <input
          type="text"
          value={config.tracking?.tiktokPixel || ''}
          onChange={(e) => updateTracking('tiktokPixel', e.target.value)}
          placeholder="e.g., CXXXXXXXXXXXXXXXX"
          className={`w-full px-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-all ${
            isValidPixel(config.tracking?.tiktokPixel || '', 'tiktok')
              ? 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20'
              : 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          }`}
        />
        
        {config.tracking?.tiktokPixel && !isValidPixel(config.tracking.tiktokPixel, 'tiktok') && (
          <p className="text-xs text-red-500 mt-1">Invalid format. Should be 20 characters starting with C.</p>
        )}
        
        <p className="text-xs text-gray-500 mt-2">
          Find in TikTok Ads Manager → Assets → Events → Web Events
        </p>
      </div>

      {/* Tracking Summary */}
      {(config.tracking?.facebookPixel || config.tracking?.googleAnalytics || config.tracking?.tiktokPixel) && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-green-900 mb-2">✅ Active Tracking</p>
          <div className="space-y-1">
            {config.tracking?.facebookPixel && (
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Facebook Pixel configured</span>
              </div>
            )}
            {config.tracking?.googleAnalytics && (
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <span className="text-green-500">✓</span>
                <span>Google Analytics configured</span>
              </div>
            )}
            {config.tracking?.tiktokPixel && (
              <div className="flex items-center gap-2 text-xs text-gray-700">
                <span className="text-green-500">✓</span>
                <span>TikTok Pixel configured</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LeadBalloon Intelligence Note */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">LeadBalloon AI Intelligence</p>
            <p className="text-xs text-gray-600">
              When you add tracking pixels, LeadBalloon AI learns from your actual conversion data. 
              Our collective intelligence engine analyzes patterns across all clients to optimize your 
              offers, pricing, and messaging automatically. The more data we collect, the smarter your 
              widgets become!
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">🔒 Privacy & Compliance</p>
        <p className="text-xs text-gray-700">
          Tracking is optional but recommended. All tracking follows GDPR/CCPA guidelines. 
          Users will be notified about tracking per your privacy policy. We never share your 
          data with other clients - only aggregated insights are used for AI optimization.
        </p>
      </div>

      {/* Launch Button Preview */}
      <div className="text-center pt-6">
        <div className="inline-flex flex-col items-center">
          <p className="text-sm text-gray-500 mb-3">Ready to go live?</p>
          <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            🚀 Launch Your Widgets
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Your configuration will be saved and widgets activated
          </p>
        </div>
      </div>
    </div>
  )
}