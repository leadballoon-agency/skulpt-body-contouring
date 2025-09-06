'use client'

import React, { useState, useEffect } from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function AnalyzeStep({ config, updateConfig }: Props) {
  const [url, setUrl] = useState(config.websiteUrl || '')
  const [facebookPage, setFacebookPage] = useState(config.facebookPage || '')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [analysisStep, setAnalysisStep] = useState('')
  const [detectedIndustry, setDetectedIndustry] = useState<string>('')
  const [showIndustryConfirm, setShowIndustryConfirm] = useState(false)
  const [communityOffers, setCommunityOffers] = useState<any[]>([])
  const [showCommunityOffers, setShowCommunityOffers] = useState(false)

  // Detect industry from URL
  const detectIndustryFromUrl = (url: string): string => {
    const lowerUrl = url.toLowerCase()
    
    if (lowerUrl.includes('sculpt') || lowerUrl.includes('contour') || lowerUrl.includes('lipo')) {
      return 'Body Contouring & Fat Reduction'
    }
    if (lowerUrl.includes('dental') || lowerUrl.includes('smile') || lowerUrl.includes('teeth')) {
      return 'Dental & Cosmetic Dentistry'
    }
    if (lowerUrl.includes('aesthetic') || lowerUrl.includes('botox') || lowerUrl.includes('filler')) {
      return 'Medical Aesthetics & Anti-Aging'
    }
    if (lowerUrl.includes('hair') || lowerUrl.includes('transplant')) {
      return 'Hair Restoration & Transplants'
    }
    if (lowerUrl.includes('fitness') || lowerUrl.includes('gym') || lowerUrl.includes('training')) {
      return 'Fitness & Personal Training'
    }
    
    return 'Professional Services' // Default
  }

  const handleInitialAnalysis = () => {
    if (!url) return
    
    const detected = detectIndustryFromUrl(url)
    setDetectedIndustry(detected)
    setShowIndustryConfirm(true)
  }

  const analyzeWebsite = async (confirmedIndustry?: string) => {
    setIsAnalyzing(true)
    setShowIndustryConfirm(false)
    setAnalysisStep('🔍 Scanning website structure...')
    
    // Simulate progress steps
    const steps = [
      `🕵️ Finding top performers in ${confirmedIndustry || detectedIndustry}...`,
      '📊 Analyzing proven Facebook ads (3+ months)...',
      '🎯 Identifying market gaps & opportunities...',
      '🤖 AI generating superior offer...',
      '✨ Optimizing value stack for conversions...'
    ]
    
    let stepIndex = 0
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setAnalysisStep(steps[stepIndex])
        stepIndex++
      }
    }, 2000)
    
    try {
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          url,
          industry: confirmedIndustry || detectedIndustry 
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        const analysisData = data.analysis
        
        // Store analysis with notice if AI was offline
        setAnalysisResult({
          ...analysisData,
          aiOfflineNotice: data.notice
        })
        
        updateConfig({ 
          websiteUrl: url,
          analysisData: analysisData,
          dreamOutcome: analysisData.suggestedOffer.dreamOutcome,
          valueStack: analysisData.suggestedOffer.valueStack
        })
      } else if (data.error) {
        // Show error if AI is offline
        setAnalysisResult({
          error: data.error,
          details: data.details
        })
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      clearInterval(stepInterval)
      setIsAnalyzing(false)
      setAnalysisStep('')
    }
  }

  const exampleSites = [
    { type: 'Your Site', url: 'https://skintight.uk', icon: '🏢' },
    { type: 'Competitor', url: 'https://coolsculpting.com', icon: '🔍' },
    { type: 'Top Performer', url: 'https://idealimage.com', icon: '🏆' }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Let's Analyze Your Market
        </h3>
        <p className="text-gray-600">
          Enter your website or a competitor's to auto-generate the perfect offer using AI
        </p>
        
        {/* Community Intelligence Banner */}
        <div className="mt-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <div>
                <p className="text-sm font-semibold text-purple-900">
                  Skip the Research: Use Proven Offers
                </p>
                <p className="text-xs text-purple-700">
                  47 businesses already cracked this market. Use their proven offers (3.8%+ conversion)
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                // Temporarily disabled - will re-enable when we fix the import
                // const offers = await getTopOffers('Body Contouring & Fat Reduction')
                // setCommunityOffers(offers)
                setShowCommunityOffers(true)
              }}
              className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
            >
              Browse Offers →
            </button>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Website URL
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
          <button
            onClick={handleInitialAnalysis}
            disabled={!url || isAnalyzing}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              url && !isAnalyzing
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⚙️</span> Analyzing...
              </span>
            ) : (
              '🤖 Analyze'
            )}
          </button>
        </div>
      </div>

      {/* Community Offers Display */}
      {showCommunityOffers && communityOffers.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              🏆 Top Performing Offers in Your Industry
            </h3>
            <button
              onClick={() => setShowCommunityOffers(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            {communityOffers.slice(0, 2).map((offer, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{offer.subNiche}</p>
                    <p className="text-xs text-gray-600">{offer.insights.targetAudience}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{offer.stats.conversionRate}%</p>
                    <p className="text-xs text-gray-500">conversion</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3 italic">
                  "{offer.offer.dreamOutcome}"
                </p>
                
                <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                  <div className="bg-gray-50 rounded p-2">
                    <span className="text-gray-500">Revenue:</span>
                    <span className="block font-semibold">£{offer.stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <span className="text-gray-500">Price:</span>
                    <span className="block font-semibold">£{offer.offer.pricing.offerPrice}</span>
                  </div>
                  <div className="bg-gray-50 rounded p-2">
                    <span className="text-gray-500">Used by:</span>
                    <span className="block font-semibold">{offer.timesUsed} businesses</span>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    // Load this offer into the configurator
                    updateConfig({
                      dreamOutcome: offer.offer.dreamOutcome,
                      valueStack: offer.offer.valueStack,
                      communityOfferId: offer.id
                    })
                    setShowCommunityOffers(false)
                    alert('✅ Offer loaded! Customize it to match your business.')
                  }}
                  className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 font-medium text-sm"
                >
                  Use This Proven Offer →
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-600 mt-4 text-center">
            💡 These offers are from real businesses achieving 3%+ conversions. 
            Fork and customize to your brand.
          </p>
        </div>
      )}

      {/* Industry Confirmation Dialog */}
      {showIndustryConfirm && !isAnalyzing && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            🎯 Confirm Your Industry
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            We detected your industry to find the right top performers and proven Facebook ads:
          </p>
          
          <div className="bg-white rounded-lg p-4 mb-4 border-2 border-purple-300">
            <p className="font-semibold text-purple-700">{detectedIndustry}</p>
          </div>
          
          <p className="text-xs text-gray-500 mb-4">
            This helps us find ads that have been running 3-6+ months (proven winners) in your specific market.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={() => analyzeWebsite(detectedIndustry)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 font-medium"
            >
              ✅ Yes, that's correct
            </button>
            <select
              onChange={(e) => {
                if (e.target.value) {
                  analyzeWebsite(e.target.value)
                }
              }}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Change industry...</option>
              <option value="Body Contouring & Fat Reduction">Body Contouring & Fat Reduction</option>
              <option value="Medical Aesthetics & Anti-Aging">Medical Aesthetics & Anti-Aging</option>
              <option value="Dental & Cosmetic Dentistry">Dental & Cosmetic Dentistry</option>
              <option value="Hair Restoration & Transplants">Hair Restoration & Transplants</option>
              <option value="Fitness & Personal Training">Fitness & Personal Training</option>
              <option value="Weight Loss & Nutrition">Weight Loss & Nutrition</option>
              <option value="Med Spa & Wellness">Med Spa & Wellness</option>
              <option value="Plastic Surgery">Plastic Surgery</option>
              <option value="Professional Services">Other Professional Services</option>
            </select>
          </div>
        </div>
      )}

      {/* Analyzing Animation Overlay */}
      {isAnalyzing && (
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200 overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -inset-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl animate-pulse" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg animate-bounce">
                <span className="text-4xl animate-pulse">🤖</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              AI Intelligence Extraction in Progress
            </h3>
            
            <div className="h-12 flex items-center justify-center">
              <p className="text-sm text-purple-700 font-medium animate-pulse">
                {analysisStep}
              </p>
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-purple-400 animate-pulse`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Extracting £10,000+ worth of agency intelligence...
            </p>
          </div>
        </div>
      )}

      {/* Quick Examples */}
      <div className="grid grid-cols-3 gap-3">
        {exampleSites.map((site) => (
          <button
            key={site.url}
            onClick={() => setUrl(site.url)}
            className="p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="text-2xl mb-1">{site.icon}</div>
            <div className="text-xs font-medium text-gray-700">{site.type}</div>
            <div className="text-xs text-gray-500 truncate">{site.url}</div>
          </button>
        ))}
      </div>

      {/* Error Display */}
      {analysisResult && analysisResult.error && (
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h4 className="font-semibold text-red-900 mb-1">{analysisResult.error}</h4>
              <p className="text-sm text-red-600">{analysisResult.details}</p>
              <p className="text-xs text-gray-600 mt-2">
                The system will use pre-configured templates as a fallback.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {analysisResult && !analysisResult.error && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">✨</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">AI Analysis Complete!</h4>
              <p className="text-sm text-gray-600">
                Found: {analysisResult.businessType} targeting {analysisResult.targetAudience}
              </p>
              {analysisResult.aiOfflineNotice && (
                <p className="text-xs text-orange-600 mt-1">{analysisResult.aiOfflineNotice}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">💰 Competitor Pricing</p>
              {analysisResult.competitors.map((comp: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600">
                  <span>{comp.name}</span>
                  <span>{comp.price}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">🎯 Suggested Offer</p>
              <p className="text-xs text-gray-600">{analysisResult.suggestedOffer.dreamOutcome}</p>
              <p className="text-xs text-green-600 mt-1">
                Value: £{analysisResult.suggestedOffer.totalValue} → Price: £{analysisResult.suggestedOffer.offerPrice}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-green-600 font-medium">
                ✓ Offer data loaded - Continue to customize →
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Intelligence Note */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">🧠 How Our AI Works</p>
        <div className="space-y-1 text-xs text-gray-600">
          <p>• Analyzes your site structure, copy, and offerings</p>
          <p>• Scans competitor Facebook ads and landing pages</p>
          <p>• Uses proven conversion formulas from top marketers</p>
          <p>• Learns from $10M+ in collective ad spend data</p>
          <p>• Generates offers that convert 3-5x better</p>
        </div>
      </div>

      {/* Why This Matters */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">💡 Pro Tip</p>
        <p className="text-xs text-gray-700">
          Analyzing competitors reveals their pricing, positioning, and gaps in the market. 
          Our AI finds the "blue ocean" opportunity where you can charge premium prices with less competition.
        </p>
      </div>
    </div>
  )
}