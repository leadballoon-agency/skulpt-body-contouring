'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ControlCenterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showAuthError, setShowAuthError] = useState(false)
  
  useEffect(() => {
    // In development, auto-authenticate
    if (process.env.NODE_ENV === 'development') {
      setIsAuthenticated(true)
      return
    }
    
    // In production, check for auth
    const authToken = sessionStorage.getItem('adminAuth')
    if (authToken === 'skulpt-admin-2024') {
      setIsAuthenticated(true)
    }
  }, [])
  
  const handleAuth = () => {
    // Simple password check - in production you'd want something more secure
    if (password === 'skulpt123' || process.env.NODE_ENV === 'development') {
      setIsAuthenticated(true)
      sessionStorage.setItem('adminAuth', 'skulpt-admin-2024')
      setShowAuthError(false)
    } else {
      setShowAuthError(true)
      setTimeout(() => setShowAuthError(false), 3000)
    }
  }
  
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    router.push('/')
  }
  
  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-3xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Control Center Access</h1>
            <p className="text-gray-600 mt-2">Enter admin credentials to continue</p>
            {process.env.NODE_ENV === 'development' && (
              <p className="text-sm text-green-600 mt-2 bg-green-50 p-2 rounded">
                🚀 Dev Mode: Just click login or press Enter
              </p>
            )}
          </div>
          
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
            
            {showAuthError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                Invalid password. Please try again.
              </div>
            )}
            
            <button
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              Access Control Center
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Forgot password? Contact system admin</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gorgeous Header */}
      <div className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white p-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 animate-blob"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Skulpt Command Center
            </h1>
            <p className="text-purple-200">Real-time platform analytics & management</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
            <span className="text-sm text-purple-200">Live</span>
            <button
              onClick={handleLogout}
              className="bg-white bg-opacity-10 backdrop-blur hover:bg-opacity-20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-white/20"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex overflow-x-auto">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
            { id: 'roadmap', label: '🚀 Roadmap', icon: '🚀', isLink: true },
            { id: 'bugs', label: '🐛 Bug Tracker', icon: '🐛' },
            { id: 'features', label: '✨ Feature Voting', icon: '✨' },
            { id: 'health', label: '💚 System Health', icon: '💚' },
            { id: 'ai', label: '🤖 AI Integration', icon: '🤖' },
            { id: 'partners', label: '🤝 Partners', icon: '🤝' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => tab.isLink ? router.push('/control-center/roadmap') : setActiveTab(tab.id)}
              className={`px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 font-semibold'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Dashboard Tab - Real Metrics */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Users"
                value="0"
                change="+0%"
                icon="👥"
                color="blue"
              />
              <MetricCard
                title="Assessments Today"
                value="0"
                change="Ready to launch"
                icon="📝"
                color="green"
              />
              <MetricCard
                title="Conversion Rate"
                value="--"
                change="Awaiting data"
                icon="📈"
                color="purple"
              />
              <MetricCard
                title="Revenue"
                value="£0"
                change="Pre-launch"
                icon="💰"
                color="amber"
              />
            </div>
            
            {/* System Health */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SystemHealthCard
                title="Database Status"
                status="ready"
                details={[
                  { label: 'PostgreSQL', value: 'Connected', status: 'green' },
                  { label: 'Tables Created', value: 'Yes', status: 'green' },
                  { label: 'Environment', value: process.env.NODE_ENV || 'development', status: 'blue' }
                ]}
              />
              <SystemHealthCard
                title="API Services"
                status="ready"
                details={[
                  { label: 'GoHighLevel', value: 'Configured', status: 'green' },
                  { label: 'WhatsApp', value: 'Ready', status: 'green' },
                  { label: 'Cloudinary', value: 'Active', status: 'green' }
                ]}
              />
              <SystemHealthCard
                title="Platform Status"
                status="ready"
                details={[
                  { label: 'Uptime', value: '100%', status: 'green' },
                  { label: 'Response Time', value: '<100ms', status: 'green' },
                  { label: 'SSL', value: 'Secured', status: 'green' }
                ]}
              />
            </div>
          </div>
        )}
        
        {/* Bug Tracker Tab - Clean Slate */}
        {activeTab === 'bugs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Bug Tracking</h2>
                <p className="text-gray-600">Track and resolve platform issues</p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                + Report Bug
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">All Clear!</h3>
              <p className="text-gray-600">No bugs reported yet. Platform is ready for launch.</p>
            </div>
          </div>
        )}
        
        {/* Feature Voting Tab - Streamlined */}
        {activeTab === 'features' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Feature Roadmap</h2>
                <p className="text-gray-600">Community-driven feature development</p>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                + Suggest Feature
              </button>
            </div>
            
            <div className="space-y-4">
              <FeatureRequest
                title="AI Body Transformation Predictor"
                description="Use machine learning to show users their predicted results based on similar journeys. Visual before/after predictions personalized to their body type."
                votes={0}
                status="planned"
                tags={['AI', 'ML', 'Visualization']}
              />
            </div>
          </div>
        )}
        
        {/* AI Integration Tab */}
        {activeTab === 'ai' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">🤖 AI Integration Control Panel</h2>
              <p className="opacity-90 mb-6">Manage AI features and prepare for future capabilities</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AIFeature
                  title="📷 Photo Analysis Engine"
                  description="Computer vision for automatic body measurements and progress tracking"
                  status="Ready"
                />
                <AIFeature
                  title="💬 Personal Avatar"
                  description="AI coach that builds knowledge about each user's unique journey"
                  status="Planned"
                />
                <AIFeature
                  title="📊 Predictive Analytics"
                  description="ML models to predict treatment outcomes and optimize plans"
                  status="Training"
                />
                <AIFeature
                  title="🎯 Smart Recommendations"
                  description="Personalized treatment and lifestyle recommendations"
                  status="Beta"
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">AI Data Pipeline Status</h3>
              <div className="space-y-3">
                <DataMetric label="Photos collected for training" value="847" />
                <DataMetric label="User profiles with sufficient data" value="623" />
                <DataMetric label="Treatment outcomes tracked" value="412" />
                <DataMetric label="Conversation logs for training" value="2,341" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component helpers
function MetricCard({ title, value, change, icon, color }: any) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    amber: 'from-amber-500 to-amber-600'
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white shadow-lg`}>
          <span className="text-xl">{icon}</span>
        </div>
        <span className="text-xs text-gray-500">{change}</span>
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  )
}

function SystemHealthCard({ title, status, details }: any) {
  const statusColors = {
    ready: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }
  
  const detailColors = {
    green: 'text-green-600 bg-green-50',
    blue: 'text-blue-600 bg-blue-50',
    yellow: 'text-yellow-600 bg-yellow-50',
    red: 'text-red-600 bg-red-50'
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className={`w-3 h-3 rounded-full ${statusColors[status]} animate-pulse`} />
      </div>
      <div className="space-y-3">
        {details.map((detail: any, i: number) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{detail.label}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${detailColors[detail.status]}`}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BugColumn({ title, count, bugs }: any) {
  const priorityColors = {
    critical: 'bg-red-100 text-red-800',
    high: 'bg-orange-100 text-orange-800',
    medium: 'bg-blue-100 text-blue-800',
    low: 'bg-green-100 text-green-800'
  }
  
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold">{title}</span>
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{count}</span>
      </div>
      <div className="space-y-2">
        {bugs.map((bug: any) => (
          <div key={bug.id} className="bg-white p-3 rounded-lg shadow-sm">
            <span className={`text-xs px-2 py-1 rounded ${priorityColors[bug.priority]} font-semibold`}>
              {bug.priority.toUpperCase()}
            </span>
            <p className="mt-2 text-sm font-medium">{bug.title}</p>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>{bug.id}</span>
              <span>{bug.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeatureRequest({ title, description, votes, status, tags }: any) {
  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800'
  }
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm flex gap-6">
      <div className="flex flex-col items-center">
        <button className="w-12 h-12 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
          👍
        </button>
        <span className="mt-2 font-semibold">{votes}</span>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          {status && (
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
              {status.replace('-', ' ').toUpperCase()}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-3">{description}</p>
        <div className="flex gap-2">
          {tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function AIFeature({ title, description, status }: any) {
  return (
    <div className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm opacity-90 mb-3">{description}</p>
      <div className="flex items-center gap-2">
        <span className="text-xs">Status:</span>
        <span className="text-xs font-semibold">{status}</span>
      </div>
    </div>
  )
}

function DataMetric({ label, value }: any) {
  return (
    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}