'use client'

import { useState } from 'react'
import { extractAgencyIntelligence, generateAgencyInsights, reverseEngineerFunnel } from '@/lib/agency-intelligence'

export default function AgencyIntelligenceDashboard() {
  const [competitor, setCompetitor] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [intelligence, setIntelligence] = useState<any>(null)
  const [costComparison, setCostComparison] = useState<any>(null)

  const analyzeCompetitor = async () => {
    setIsAnalyzing(true)
    
    try {
      // First, get their Facebook Ads
      const adsResponse = await fetch('/api/facebook-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm: competitor })
      })
      
      const adsData = await adsResponse.json()
      
      if (adsData.success && adsData.ads) {
        // Extract agency intelligence
        const intel = extractAgencyIntelligence(adsData.ads)
        const insights = generateAgencyInsights(intel)
        const funnel = reverseEngineerFunnel(intel)
        
        setIntelligence({
          raw: adsData,
          intel,
          insights,
          funnel
        })
        
        // Calculate cost comparison
        calculateCostSavings(intel)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const calculateCostSavings = (intel: any) => {
    const agencyCosts = {
      strategy: 2000,
      copywriting: 1500,
      design: 1000,
      adManagement: 1500,
      monthly: 6000
    }
    
    const leadBalloonCost = 497 // Our one-time fee
    
    const savings = {
      immediate: agencyCosts.monthly - leadBalloonCost,
      annual: (agencyCosts.monthly * 12) - leadBalloonCost,
      percentSaved: Math.round(((agencyCosts.monthly - leadBalloonCost) / agencyCosts.monthly) * 100)
    }
    
    setCostComparison({
      agencyCosts,
      leadBalloonCost,
      savings,
      timeToROI: 'Immediate - use their proven formulas today!'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🕵️ Agency Intelligence Extractor
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Extract £10,000+ worth of agency strategy for £0 using Facebook Ads Library
          </p>
          
          {/* Search */}
          <div className="flex gap-4">
            <input
              type="text"
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="Enter competitor name or Facebook page..."
              className="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button
              onClick={analyzeCompetitor}
              disabled={!competitor || isAnalyzing}
              className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold rounded-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50"
            >
              {isAnalyzing ? 'Extracting Intelligence...' : '🔍 Analyze'}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="mt-4 flex gap-2">
            <span className="text-sm text-gray-500">Try:</span>
            {['CoolSculpting', 'Sono Bello', 'Ideal Image'].map(name => (
              <button
                key={name}
                onClick={() => setCompetitor(name)}
                className="text-sm text-primary-600 hover:text-primary-700 underline"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Cost Comparison */}
        {costComparison && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              💰 The "Peanuts" Equation
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Traditional Agency</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Strategy:</span>
                    <span>£{costComparison.agencyCosts.strategy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Copywriting:</span>
                    <span>£{costComparison.agencyCosts.copywriting}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Design:</span>
                    <span>£{costComparison.agencyCosts.design}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Management:</span>
                    <span>£{costComparison.agencyCosts.adManagement}</span>
                  </div>
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>Monthly:</span>
                      <span className="text-red-600">£{costComparison.agencyCosts.monthly}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-green-600 mb-2">LeadBalloon AI</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>AI Analysis:</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Competitor Intel:</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Offer Generation:</span>
                    <span>Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Widget Creation:</span>
                    <span>Included</span>
                  </div>
                  <div className="border-t pt-2 font-bold">
                    <div className="flex justify-between">
                      <span>One-time:</span>
                      <span className="text-green-600">£{costComparison.leadBalloonCost}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4">You Save</h3>
                <div className="text-3xl font-bold mb-2">
                  {costComparison.savings.percentSaved}%
                </div>
                <div className="text-sm space-y-1">
                  <p>Immediate: £{costComparison.savings.immediate}</p>
                  <p>Annual: £{costComparison.savings.annual}</p>
                  <p className="text-xs mt-2">{costComparison.timeToROI}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intelligence Results */}
        {intelligence && (
          <>
            {/* Agency Insights */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🎯 Agency Intelligence Extracted
              </h2>
              
              {/* Spend Estimate */}
              <div className={`mb-6 p-4 rounded-lg ${
                intelligence.intel.estimatedSpend.level === 'high' ? 'bg-red-50 border border-red-200' :
                intelligence.intel.estimatedSpend.level === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-green-50 border border-green-200'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {intelligence.intel.estimatedSpend.level === 'high' ? '💸' :
                     intelligence.intel.estimatedSpend.level === 'medium' ? '💰' : '💵'}
                  </span>
                  <div>
                    <p className="font-semibold">
                      Estimated Spend: {intelligence.intel.estimatedSpend.level.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      {intelligence.intel.estimatedSpend.reasoning}
                    </p>
                  </div>
                </div>
              </div>

              {/* Copy Formulas */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">📝 Copy Formulas (Worth £1500+)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Proven Hooks:</h4>
                    <ul className="space-y-1">
                      {intelligence.intel.copyFormulas.hooks.slice(0, 3).map((hook: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600">• {hook}...</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-sm text-gray-700 mb-2">CTAs That Convert:</h4>
                    <ul className="space-y-1">
                      {intelligence.intel.copyFormulas.ctas.slice(0, 3).map((cta: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600">• {cta}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Offer Structure */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">🎁 Offer Architecture (Worth £2000+)</h3>
                <div className="space-y-2">
                  {intelligence.intel.offerStructure.guarantees.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>
                        <span className="font-medium">Guarantees Used:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {intelligence.intel.offerStructure.guarantees[0]}
                        </span>
                      </div>
                    </div>
                  )}
                  {intelligence.intel.offerStructure.leadMagnets.length > 0 && (
                    <div className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <div>
                        <span className="font-medium">Lead Magnets:</span>
                        <span className="text-sm text-gray-600 ml-2">
                          {intelligence.intel.offerStructure.leadMagnets.length} different offers found
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Creative Strategy */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">🎨 Creative Strategy (Worth £1000+)</h3>
                <div className="flex gap-4 flex-wrap">
                  {intelligence.intel.creativePatterns.hasVideo && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      🎥 Video Ads
                    </span>
                  )}
                  {intelligence.intel.creativePatterns.hasBeforeAfter && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      📸 Before/After
                    </span>
                  )}
                  {intelligence.intel.creativePatterns.hasSocialProof && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      ⭐ Social Proof
                    </span>
                  )}
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    Style: {intelligence.intel.creativePatterns.visualStyle}
                  </span>
                </div>
              </div>

              {/* Generated Insights */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">💡 AI Insights</h3>
                <div className="whitespace-pre-line text-sm text-gray-700">
                  {intelligence.insights}
                </div>
              </div>
            </div>

            {/* Reverse-Engineered Funnel */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                🔄 Reverse-Engineered Funnel
              </h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Stage 1: Awareness (Hooks)</h3>
                  <p className="text-sm text-gray-600">
                    {intelligence.funnel.stage1_awareness.length} different hooks tested
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Stage 2: Interest (Pain Points)</h3>
                  <p className="text-sm text-gray-600">
                    {intelligence.funnel.stage2_interest.length} pain points addressed
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Stage 3: Consideration (Core Offers)</h3>
                  <p className="text-sm text-gray-600">
                    {intelligence.funnel.stage3_consideration.length} offers presented
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Stage 4: Conversion</h3>
                  <p className="text-sm text-gray-600">
                    Guarantees: {intelligence.funnel.stage4_conversion.guarantees.length || 0} |
                    CTAs: {intelligence.funnel.stage4_conversion.urgency.length || 0}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 mt-6">
                  <h3 className="font-bold text-green-800 mb-2">🎯 How to Beat Them:</h3>
                  <p className="text-green-700">{intelligence.funnel.recommendedStrategy}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}