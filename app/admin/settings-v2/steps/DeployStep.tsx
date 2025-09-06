'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function DeployStep({ config, updateConfig }: Props) {
  const saveAndDeploy = () => {
    // Save to localStorage for widgets to use
    const widgetConfig = {
      // For offer widget
      values: {
        consultationValue: config.valueStack[0]?.value || '£200',
        bodyScanValue: config.valueStack[1]?.value || '£300',
        treatmentPlanValue: config.valueStack[2]?.value || '£200',
        totalValue: config.pricing.totalValue || '£1500',
        todayPrice: config.pricing.offerPrice || '£497'
      },
      copy: {
        headline: config.dreamOutcome || 'Transform Your Body',
        urgencyMessage: config.urgency.expiryAction || 'Limited Time Offer'
      },
      general: {
        spotsRemaining: config.urgency.spots || 5,
        timerHours: config.urgency.timerHours || 23,
        timerMinutes: config.urgency.timerMinutes || 59
      },
      guarantee: config.guarantee,
      // For assessment widget
      questions: config.qualification.questions || []
    }
    
    // Save configurations
    localStorage.setItem('leadballoon_config', JSON.stringify(config))
    localStorage.setItem('widgetConfig', JSON.stringify(widgetConfig)) // Main config used by embedded widgets
    localStorage.setItem('widget_config', JSON.stringify(widgetConfig)) // Legacy support
    localStorage.setItem('offer_widget_config', JSON.stringify(widgetConfig))
    localStorage.setItem('assessment_widget_config', JSON.stringify(widgetConfig))
    
    alert('✅ Configuration saved and deployed to widgets!')
  }
  
  const getOneLineScript = () => {
    const baseUrl = window.location.origin
    const accountId = 'skulpt-' + Date.now() // Generate unique account ID
    return `<script src="${baseUrl}/leadballoon.js" data-account="${accountId}" data-position="bottom-right" data-trigger="scroll" data-delay="3000"></script>`
  }
  
  const getEmbedCode = (type: 'offer' | 'assessment') => {
    const baseUrl = window.location.origin
    return `<!-- LeadBalloon ${type === 'offer' ? 'Offer' : 'Assessment'} Widget -->
<iframe 
  src="${baseUrl}/${type === 'offer' ? 'offer' : 'assessment'}-widget"
  style="width: 100%; max-width: 500px; height: 700px; border: none;"
  scrolling="no">
</iframe>`
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Deploy Your Widgets 🚀
        </h3>
        <p className="text-gray-600">
          Save your configuration and get the embed codes for your website
        </p>
      </div>

      {/* Configuration Summary */}
      <div className="bg-gradient-to-r from-primary-50 to-white rounded-xl p-6 border border-primary-200">
        <h4 className="font-semibold text-gray-900 mb-4">Configuration Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Dream Outcome</p>
            <p className="font-medium">{config.dreamOutcome || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Offer Price</p>
            <p className="font-medium">{config.pricing.offerPrice || 'Not set'}</p>
          </div>
          <div>
            <p className="text-gray-500">Value Stack Items</p>
            <p className="font-medium">{config.valueStack.length} items</p>
          </div>
          <div>
            <p className="text-gray-500">Qualification Questions</p>
            <p className="font-medium">{config.qualification.questions.length} questions</p>
          </div>
        </div>
      </div>

      {/* Save & Deploy Button */}
      <div className="text-center">
        <button
          onClick={saveAndDeploy}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all"
        >
          💾 Save & Deploy Configuration
        </button>
      </div>

      {/* ONE LINE INSTALL - The Magic! */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">🚀</span>
          <div>
            <h4 className="text-xl font-bold mb-2">One Line Installation (Recommended)</h4>
            <p className="text-green-100">
              Just like ConvertBox! Add this ONE line before your &lt;/body&gt; tag and both widgets appear automatically.
            </p>
          </div>
        </div>
        
        <div className="bg-black/20 rounded-lg p-4">
          <label className="block text-xs font-medium text-green-200 mb-2">Copy & paste this script:</label>
          <textarea 
            readOnly
            value={getOneLineScript()}
            className="w-full text-xs bg-white/10 border border-green-300/30 rounded p-3 font-mono text-green-100"
            rows={2}
            onClick={(e) => {
              e.currentTarget.select()
              navigator.clipboard.writeText(e.currentTarget.value)
                .then(() => alert('✅ Script copied to clipboard!'))
            }}
          />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white/10 rounded p-3">
            <strong>✓ Auto-positions widgets</strong>
            <p className="text-xs mt-1 text-green-100">Corner bubble + modal assessment</p>
          </div>
          <div className="bg-white/10 rounded p-3">
            <strong>✓ Smart triggers</strong>
            <p className="text-xs mt-1 text-green-100">Time, scroll, or exit intent</p>
          </div>
        </div>
      </div>

      {/* Alternative: Individual Widget URLs */}
      <details className="bg-gray-50 rounded-xl p-6">
        <summary className="font-semibold text-gray-900 cursor-pointer mb-3">
          Alternative: Individual Widget Embeds (Advanced)
        </summary>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3">🎯 Offer Widget Only</h4>
            <p className="text-sm text-gray-600 mb-3">Embed just the offer widget</p>
            <a 
              href="/offer-widget" 
              target="_blank"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Preview →
            </a>
            <div className="mt-3">
              <textarea 
                readOnly
                value={getEmbedCode('offer')}
                className="w-full text-xs bg-white border border-gray-200 rounded p-2 font-mono"
                rows={3}
              />
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">📋 Assessment Widget Only</h4>
            <p className="text-sm text-gray-600 mb-3">Embed just the assessment</p>
            <a 
              href="/assessment-widget" 
              target="_blank"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              Preview →
            </a>
            <div className="mt-3">
              <textarea 
                readOnly
                value={getEmbedCode('assessment')}
                className="w-full text-xs bg-white border border-gray-200 rounded p-2 font-mono"
                rows={3}
              />
            </div>
          </div>
        </div>
      </details>

      {/* Integration Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h4 className="font-semibold text-yellow-900 mb-3">📚 Integration Guide</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Option 1: Embed on Your Site</strong></p>
          <p className="ml-4">Copy the embed code above and paste it into your website HTML</p>
          
          <p className="mt-3"><strong>Option 2: Popup Modal</strong></p>
          <p className="ml-4">Add ?mode=popup to the URL for a popup version</p>
          
          <p className="mt-3"><strong>Option 3: Direct Link</strong></p>
          <p className="ml-4">Share the widget URL directly with clients</p>
        </div>
      </div>

      {/* Tracking Setup */}
      {config.tracking && (config.tracking.facebookPixel || config.tracking.googleAnalytics) && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="font-semibold text-purple-900 mb-3">📊 Tracking Active</h4>
          <div className="space-y-1 text-sm text-gray-700">
            {config.tracking.facebookPixel && (
              <p>✅ Facebook Pixel: {config.tracking.facebookPixel}</p>
            )}
            {config.tracking.googleAnalytics && (
              <p>✅ Google Analytics: {config.tracking.googleAnalytics}</p>
            )}
            {config.tracking.tiktokPixel && (
              <p>✅ TikTok Pixel: {config.tracking.tiktokPixel}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}