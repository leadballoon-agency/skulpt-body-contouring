'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Phase = 'research' | 'planning' | 'development' | 'testing' | 'launched' | 'complete'
type Priority = 'critical' | 'high' | 'medium' | 'low'

interface RoadmapItem {
  id: string
  title: string
  description: string
  phase: Phase
  priority: Priority
  quarter: string
  category: string
  metrics?: string[]
  dependencies?: string[]
}

const roadmapData: RoadmapItem[] = [
  // Q1 2025 - Foundation
  {
    id: 'launch-v1',
    title: '🚀 Platform Launch v1.0',
    description: 'Launch core assessment tool and dashboard for direct users',
    phase: 'development',
    priority: 'critical',
    quarter: 'Q1 2025',
    category: 'Platform',
    metrics: ['100+ assessments/week', '30% conversion rate', '£10k MRR']
  },
  {
    id: 'mobile-optimization',
    title: '📱 Mobile-First Optimization',
    description: 'Perfect mobile experience for 90% mobile traffic',
    phase: 'development',
    priority: 'critical',
    quarter: 'Q1 2025',
    category: 'Platform',
    metrics: ['<2s load time', '95+ Lighthouse score', 'Touch-optimized UI']
  },
  {
    id: 'analytics-dashboard',
    title: '📊 Analytics & Tracking',
    description: 'Comprehensive analytics for user behavior and conversions',
    phase: 'planning',
    priority: 'high',
    quarter: 'Q1 2025',
    category: 'Analytics',
    metrics: ['GA4 integration', 'Custom events', 'Attribution tracking']
  },

  // Q2 2025 - Partner Ecosystem
  {
    id: 'embed-widget',
    title: '🔌 Embeddable Assessment Widget',
    description: 'One-line code embed for partners to add assessment to their sites. Like Calendly but for body transformation qualification.',
    phase: 'research',
    priority: 'high',
    quarter: 'Q2 2025',
    category: 'Partner System',
    metrics: ['<5min implementation', '10+ customization options', '99.9% uptime'],
    dependencies: ['launch-v1']
  },
  {
    id: 'partner-dashboard',
    title: '🤝 Partner Management Dashboard',
    description: 'Portal for partners to track leads, commissions, and customize their widget',
    phase: 'research',
    priority: 'high',
    quarter: 'Q2 2025',
    category: 'Partner System',
    metrics: ['Real-time lead tracking', '30% recurring commission', 'Automated payouts'],
    dependencies: ['embed-widget']
  },
  {
    id: 'white-label',
    title: '🏷️ White-Label Options',
    description: 'Allow partners to fully brand the assessment as their own',
    phase: 'research',
    priority: 'medium',
    quarter: 'Q2 2025',
    category: 'Partner System',
    metrics: ['Custom domains', 'Full CSS control', 'Logo replacement'],
    dependencies: ['partner-dashboard']
  },

  // Q3 2025 - AI Enhancement
  {
    id: 'ai-photo-analysis',
    title: '🤖 AI Photo Analysis',
    description: 'Computer vision to analyze progress photos and provide insights',
    phase: 'research',
    priority: 'high',
    quarter: 'Q3 2025',
    category: 'AI Features',
    metrics: ['Body measurement extraction', 'Progress tracking', 'Transformation predictions']
  },
  {
    id: 'ai-coach',
    title: '💬 AI Transformation Coach',
    description: 'Personalized AI assistant that guides users through their journey',
    phase: 'research',
    priority: 'medium',
    quarter: 'Q3 2025',
    category: 'AI Features',
    metrics: ['24/7 availability', 'Personalized advice', 'Motivation tracking'],
    dependencies: ['ai-photo-analysis']
  },
  {
    id: 'predictive-results',
    title: '🔮 AI Results Predictor',
    description: 'Show users their predicted transformation based on similar journeys',
    phase: 'research',
    priority: 'medium',
    quarter: 'Q3 2025',
    category: 'AI Features',
    metrics: ['Visual predictions', '85% accuracy', 'Personalized timelines'],
    dependencies: ['ai-photo-analysis']
  },

  // Q4 2025 - Scale
  {
    id: 'mobile-app',
    title: '📲 Native Mobile Apps',
    description: 'iOS and Android apps for better photo capture and engagement',
    phase: 'research',
    priority: 'medium',
    quarter: 'Q4 2025',
    category: 'Mobile',
    metrics: ['Push notifications', 'Offline mode', 'Camera integration']
  },
  {
    id: 'marketplace',
    title: '🏪 Treatment Provider Marketplace',
    description: 'Connect qualified users with certified ProMax Lipo providers',
    phase: 'research',
    priority: 'low',
    quarter: 'Q4 2025',
    category: 'Marketplace',
    metrics: ['100+ providers', 'Instant booking', 'Reviews system']
  },
  {
    id: 'international',
    title: '🌍 International Expansion',
    description: 'Multi-language support and international partner network',
    phase: 'research',
    priority: 'low',
    quarter: 'Q4 2025',
    category: 'Expansion',
    metrics: ['5 languages', '10 countries', 'Local payment methods']
  }
]

export default function RoadmapPage() {
  const router = useRouter()
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const quarters = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']
  const categories = Array.from(new Set(roadmapData.map(item => item.category)))

  const filteredItems = roadmapData.filter(item => {
    const quarterMatch = selectedQuarter === 'all' || item.quarter === selectedQuarter
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    return quarterMatch && categoryMatch
  })

  const phaseColors = {
    research: 'bg-gray-100 text-gray-700 border-gray-300',
    planning: 'bg-blue-100 text-blue-700 border-blue-300',
    development: 'bg-purple-100 text-purple-700 border-purple-300',
    testing: 'bg-orange-100 text-orange-700 border-orange-300',
    launched: 'bg-green-100 text-green-700 border-green-300',
    complete: 'bg-gray-100 text-gray-500 border-gray-300'
  }

  const priorityColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-gray-400'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-500 rounded-full opacity-10 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500 rounded-full opacity-10 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <button
            onClick={() => router.push('/control-center')}
            className="mb-4 text-purple-200 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back to Control Center
          </button>
          
          <h1 className="text-4xl font-bold mb-2">🚀 Product Roadmap</h1>
          <p className="text-purple-200 text-lg">Strategic vision for disrupting the body transformation industry</p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm text-purple-200">Total Features</span>
              <p className="text-2xl font-bold">{roadmapData.length}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm text-purple-200">In Development</span>
              <p className="text-2xl font-bold">{roadmapData.filter(i => i.phase === 'development').length}</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg px-4 py-2">
              <span className="text-sm text-purple-200">Q2 Focus</span>
              <p className="text-xl font-bold">Partner Ecosystem 🤝</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm sticky top-0 z-10 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Quarter:</label>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Quarters</option>
              {quarters.map(q => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Roadmap Items */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          {quarters.map(quarter => {
            const quarterItems = filteredItems.filter(item => item.quarter === quarter)
            if (quarterItems.length === 0) return null
            
            return (
              <div key={quarter} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm">
                    {quarter}
                  </span>
                  <span className="text-gray-500 text-base font-normal">
                    {quarterItems.length} initiatives
                  </span>
                </h2>
                
                <div className="grid gap-4">
                  {quarterItems.map(item => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-6 border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${phaseColors[item.phase]}`}>
                              {item.phase}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${priorityColors[item.priority]}`} 
                                 title={`${item.priority} priority`}></div>
                          </div>
                          <p className="text-gray-600 mb-4">{item.description}</p>
                          
                          <div className="flex flex-wrap gap-4">
                            {item.metrics && (
                              <div className="flex-1">
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Success Metrics</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.metrics.map((metric, i) => (
                                    <span key={i} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                                      {metric}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {item.dependencies && (
                              <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Dependencies</h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.dependencies.map((dep, i) => (
                                    <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                                      {dep}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <span className="ml-4 bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Partner Embed Widget Deep Dive */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">🔌 Partner Embed Widget - Strategic Deep Dive</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Why This Changes Everything</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Each partner site becomes a lead generation engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Zero CAC (Customer Acquisition Cost) for embedded leads</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Network effects - more partners = more data = better AI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Trust transfer from established clinics to Skulpt</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3">Implementation Strategy</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>One-line JavaScript embed (like Intercom)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Iframe with postMessage for security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>30% recurring commission (industry leading)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>White-label option for premium partners</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 bg-white bg-opacity-20 backdrop-blur rounded-xl p-4">
            <p className="text-sm">
              <strong>Revenue Projection:</strong> Based on industry benchmarks, partner channels typically contribute 
              10-30% of total revenue within 12 months. With 50 active partners averaging 20 assessments/month at 30% 
              conversion, this could generate £150k+ MRR.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}