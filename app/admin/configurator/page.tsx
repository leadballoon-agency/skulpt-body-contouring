'use client'

import { useState, useEffect } from 'react'

export default function Configurator() {
  const [config, setConfig] = useState({
    businessName: 'Skulpt Body Contouring',
    offerTitle: 'Transform Your Body Without Surgery',
    originalPrice: '£2,997',
    offerPrice: '£497',
    urgencySpots: 7,
    timerHours: 23,
    timerMinutes: 59,
    guarantee: '100% money-back guarantee if you don\'t see results',
    valueStack: [
      { item: 'ProMax Lipo Treatment', value: '£1,500' },
      { item: 'Body Analysis', value: '£300' },
      { item: 'Follow-Up Program', value: '£497' },
      { item: 'Nutrition Guide', value: '£197' },
      { item: 'Lifetime Support', value: '£497' }
    ]
  })
  
  const [saved, setSaved] = useState(false)
  
  // Load saved config
  useEffect(() => {
    const savedConfig = localStorage.getItem('leadballoon_simple_config')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])
  
  // Save config
  const saveConfig = () => {
    // Save for the configurator
    localStorage.setItem('leadballoon_simple_config', JSON.stringify(config))
    
    // Save for the widgets to use
    const widgetConfig = {
      values: {
        totalValue: config.originalPrice,
        todayPrice: config.offerPrice
      },
      offer: {
        headline: config.offerTitle,
        guarantee: config.guarantee
      },
      urgency: {
        spots: config.urgencySpots,
        hours: config.timerHours,
        minutes: config.timerMinutes
      },
      valueStack: config.valueStack
    }
    
    localStorage.setItem('widgetConfig', JSON.stringify(widgetConfig))
    localStorage.setItem('widget_config', JSON.stringify(widgetConfig))
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }
  
  const getScriptTag = () => {
    return `<script src="${window.location.origin}/leadballoon.js" data-account="demo" data-position="bottom-right" data-trigger="scroll" data-delay="3000"></script>`
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 LeadBalloon AI Configurator
          </h1>
          <p className="text-xl text-gray-600">
            Configure your high-converting offer and get your one-line installation script
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Build Your Offer</h2>
            
            <div className="space-y-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={config.businessName}
                  onChange={(e) => setConfig({...config, businessName: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Offer Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Offer Headline
                </label>
                <input
                  type="text"
                  value={config.offerTitle}
                  onChange={(e) => setConfig({...config, offerTitle: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Pricing */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price
                  </label>
                  <input
                    type="text"
                    value={config.originalPrice}
                    onChange={(e) => setConfig({...config, originalPrice: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Price
                  </label>
                  <input
                    type="text"
                    value={config.offerPrice}
                    onChange={(e) => setConfig({...config, offerPrice: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Urgency */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spots Left
                  </label>
                  <input
                    type="number"
                    value={config.urgencySpots}
                    onChange={(e) => setConfig({...config, urgencySpots: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timer Hours
                  </label>
                  <input
                    type="number"
                    value={config.timerHours}
                    onChange={(e) => setConfig({...config, timerHours: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timer Minutes
                  </label>
                  <input
                    type="number"
                    value={config.timerMinutes}
                    onChange={(e) => setConfig({...config, timerMinutes: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              {/* Guarantee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guarantee Text
                </label>
                <textarea
                  value={config.guarantee}
                  onChange={(e) => setConfig({...config, guarantee: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              
              {/* Save Button */}
              <button
                onClick={saveConfig}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                {saved ? '✅ Saved!' : '💾 Save Configuration'}
              </button>
            </div>
          </div>
          
          {/* Installation & Preview */}
          <div className="space-y-6">
            {/* One-Line Script */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">🚀 One-Line Installation</h3>
              <p className="mb-4 text-purple-100">
                Add this ONE line before your &lt;/body&gt; tag:
              </p>
              <div className="bg-black/30 rounded-lg p-4">
                <code className="text-sm text-green-300 break-all">
                  {getScriptTag()}
                </code>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getScriptTag())
                  alert('Script copied to clipboard!')
                }}
                className="mt-4 px-6 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-50"
              >
                📋 Copy Script
              </button>
            </div>
            
            {/* Live Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-4">👁️ Live Preview</h3>
              
              {/* Offer Preview */}
              <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6">
                <h4 className="text-2xl font-bold mb-4">{config.offerTitle}</h4>
                
                {/* Value Stack */}
                <div className="space-y-2 mb-6">
                  {config.valueStack.map((item, idx) => (
                    <div key={idx} className="flex justify-between bg-white/10 rounded p-2">
                      <span>✓ {item.item}</span>
                      <span className="line-through opacity-70">{item.value}</span>
                    </div>
                  ))}
                </div>
                
                {/* Pricing */}
                <div className="text-center mb-4">
                  <div className="text-sm line-through opacity-70">Total Value: {config.originalPrice}</div>
                  <div className="text-3xl font-bold text-yellow-400">Today Only: {config.offerPrice}</div>
                </div>
                
                {/* Urgency */}
                <div className="bg-red-500/20 rounded-lg p-3 mb-4 text-center">
                  <p className="text-sm">⚡ Only {config.urgencySpots} spots remaining!</p>
                  <p className="text-xl font-bold">{config.timerHours}:{config.timerMinutes}:00</p>
                </div>
                
                {/* Guarantee */}
                <div className="bg-green-500/20 rounded-lg p-3 mb-4">
                  <p className="text-sm">✅ {config.guarantee}</p>
                </div>
                
                {/* CTA */}
                <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg">
                  Claim Your Spot Now →
                </button>
              </div>
            </div>
            
            {/* Test Links */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold mb-3">🧪 Test Your Widgets</h3>
              <div className="space-y-2">
                <a 
                  href="/demo-client-site" 
                  target="_blank"
                  className="block text-blue-600 hover:text-blue-700 font-medium"
                >
                  → Demo Site with Script Installed
                </a>
                <a 
                  href="/offer-widget" 
                  target="_blank"
                  className="block text-blue-600 hover:text-blue-700 font-medium"
                >
                  → Offer Widget Preview
                </a>
                <a 
                  href="/assessment-widget" 
                  target="_blank"
                  className="block text-blue-600 hover:text-blue-700 font-medium"
                >
                  → Assessment Widget Preview
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}