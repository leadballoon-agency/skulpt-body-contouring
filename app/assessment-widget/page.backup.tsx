'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'

const ConfettiExplosion = dynamic(() => import('react-confetti-explosion'), { ssr: false })

export default function AssessmentWidget() {
  const searchParams = useSearchParams()
  const partnerId = searchParams?.get('partner') || 'direct'
  const mode = searchParams?.get('mode') || 'popup'
  
  // Generate alias function
  const generateAlias = () => {
    const adjectives = ['Brave', 'Radiant', 'Phoenix', 'Stellar', 'Golden', 'Diamond', 'Fierce', 'Brilliant']
    const nouns = ['Butterfly', 'Star', 'Warrior', 'Champion', 'Tiger', 'Eagle', 'Phoenix', 'Lion']
    const number = Math.floor(Math.random() * 999)
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    return `${adj}${noun}_${number}`
  }
  
  const [step, setStep] = useState(1)
  const [alias, setAlias] = useState('GoldenPhoenix_565')
  const [showConfetti, setShowConfetti] = useState(false)
  const [data, setData] = useState({
    realName: '',
    name: '',
    aliasName: 'GoldenPhoenix_565',
    email: '',
    phone: '',
    percentageLost: 0,
    timeframe: '',
    method: '',
    struggle: ''
  })
  
  // Generate alias on mount
  useEffect(() => {
    const newAlias = generateAlias()
    setAlias(newAlias)
    setData(prev => ({ ...prev, aliasName: newAlias }))
  }, [])

  const getWeightResponse = (percentage: number) => {
    if (percentage >= 20) {
      return {
        title: "INCREDIBLE TRANSFORMATION! 🎉",
        message: `Losing ${percentage}% of your body weight is absolutely phenomenal! You're a true champion!`,
        color: "text-amber-500",
        confetti: true
      }
    } else if (percentage >= 15) {
      return {
        title: "Amazing Achievement! 🌟",
        message: `A ${percentage}% weight loss is extraordinary! You've shown incredible dedication!`,
        color: "text-amber-500",
        confetti: true
      }
    } else if (percentage >= 10) {
      return {
        title: "Excellent Progress!",
        message: `A ${percentage}% weight loss is significant. Well done!`,
        color: "text-amber-500",
        confetti: false
      }
    } else {
      return {
        title: "Good Start!",
        message: "Every journey begins with a single step. Let's help you reach your goals.",
        color: "text-gray-300",
        confetti: false
      }
    }
  }

  const handleNext = () => {
    if (step === 1 && data.realName) {
      // Save both real name and alias when moving from step 1 to 2
      setData(prev => ({ ...prev, name: prev.realName }))
    }
    setStep(step + 1)
  }

  return (
    <div className="bg-black text-white p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Trust Badge */}
        {step === 1 && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-green-400">HIPAA Compliant • 2,847 Success Stories</span>
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs text-amber-400 font-medium">{Math.round((step / 8) * 100)}% Complete</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-500 relative"
              style={{ width: `${(step / 8) * 100}%` }}
            >
              <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <div className="inline-block mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/10 rounded-full flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Let's Start Your Journey
                </h2>
                <p className="text-gray-400">
                  First, what should we call you?
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Your first name</label>
                  <input
                    type="text"
                    value={data.realName || ''}
                    onChange={(e) => setData(prev => ({ ...prev, realName: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-amber-500 focus:outline-none transition-colors text-white"
                    placeholder="Enter your first name..."
                  />
                </div>
                
                {data.realName && data.realName.length > 1 && (
                  <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-lg animate-fadeIn">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">🎭</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-amber-400 mb-2">
                          Welcome {data.realName}! For your journey, you'll be known as:
                        </p>
                        <p className="text-2xl font-bold text-white mb-3">{alias}</p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          <strong className="text-amber-400">Why a journey name?</strong> Just like Disney characters transform through their adventures, 
                          this name represents your transformation story. It protects your privacy while making you the hero of your own journey. 
                          Every superhero needs a name that inspires them! 🦸‍♀️
                        </p>
                        <button 
                          onClick={() => {
                            const newAlias = generateAlias()
                            setAlias(newAlias)
                            setData(prev => ({ ...prev, aliasName: newAlias }))
                          }}
                          className="mt-3 text-xs text-gray-500 hover:text-amber-400 transition-colors"
                        >
                          ✨ Try a different journey name
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Hello, {data.aliasName}! 👋
                </h2>
                <p className="text-gray-400">
                  How long ago did you start losing weight?
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: '3months', label: 'Less than 3 months ago', emoji: '🌱' },
                  { value: '6months', label: '3-6 months ago', emoji: '📈' },
                  { value: '1year', label: '6-12 months ago', emoji: '💪' },
                  { value: 'over1year', label: 'Over a year ago', emoji: '🏆' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setData(prev => ({ ...prev, timeframe: option.value }))
                      setTimeout(() => setStep(3), 300)
                    }}
                    className={`w-full p-4 rounded-lg border transition-all text-left flex items-center gap-3 ${
                      data.timeframe === option.value
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  What method helped you lose weight?
                </h2>
                <p className="text-gray-400">
                  This helps us customize your skin tightening approach
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'ozempic', label: 'GLP-1 Medications (Ozempic, Wegovy, etc.)', hot: true },
                  { value: 'diet', label: 'Diet & Exercise' },
                  { value: 'surgery', label: 'Bariatric Surgery' },
                  { value: 'other', label: 'Other Methods' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setData(prev => ({ ...prev, method: option.value }))
                      setTimeout(() => setStep(4), 300)
                    }}
                    className={`w-full p-4 rounded-lg border transition-all text-left relative ${
                      data.method === option.value
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-300'
                    }`}
                  >
                    {option.hot && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">
                        POPULAR
                      </span>
                    )}
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-400">
                  💡 <strong>Did you know?</strong> 68% of our clients used GLP-1 medications
                </p>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  What percentage of your body weight did you lose?
                </h2>
                <p className="text-gray-400">
                  Most people lose between 10-30% with GLP-1 medications
                </p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 5, label: 'Less than 10%', emoji: '📉' },
                  { value: 12, label: '10-15%', emoji: '💪' },
                  { value: 18, label: '15-20%', emoji: '🔥' },
                  { value: 25, label: '20-30%', emoji: '🚀' },
                  { value: 35, label: 'Over 30%', emoji: '🏆' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setData(prev => ({ ...prev, percentageLost: option.value }))
                      setTimeout(() => {
                        setStep(5)
                        if (option.value >= 15) {
                          setShowConfetti(true)
                          setTimeout(() => setShowConfetti(false), 3000)
                        }
                      }, 300)
                    }}
                    className={`w-full p-4 rounded-lg border transition-all text-left flex items-center gap-3 ${
                      data.percentageLost === option.value
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{option.emoji}</span>
                    <div>
                      <span className="font-medium">{option.label}</span>
                      {option.value >= 15 && (
                        <p className="text-xs text-gray-500 mt-1">Significant transformation!</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <p className="text-xs text-gray-600">
                  💡 Not sure? If you went from 200lbs to 160lbs, that's 20%
                </p>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="text-center mb-6 relative">
                {showConfetti && (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                    <ConfettiExplosion 
                      force={0.8}
                      duration={3000}
                      particleCount={200}
                      width={1000}
                      colors={['#FCD34D', '#F59E0B', '#D97706', '#FFD700', '#FFA500', '#FF6B6B']}
                    />
                  </div>
                )}
                <div className={`text-5xl font-bold mb-4 ${getWeightResponse(data.percentageLost).color} ${showConfetti ? 'animate-bounce' : ''}`}>
                  {data.percentageLost}% Lost
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {getWeightResponse(data.percentageLost).title}
                </h2>
                <p className="text-gray-400">
                  {getWeightResponse(data.percentageLost).message}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-center text-sm text-gray-400 mb-4">
                  How are you feeling about your body now?
                </p>
                <div className="space-y-3">
                  {[
                    { value: 'frustrated', label: 'Proud but frustrated with loose skin', emoji: '😔' },
                    { value: 'excited', label: 'Excited but need help with the final step', emoji: '🎯' },
                    { value: 'confident', label: 'More confident but want to look my best', emoji: '💪' },
                    { value: 'happy', label: 'Happy but self-conscious about saggy areas', emoji: '🤔' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setData(prev => ({ ...prev, struggle: option.value }))
                        setTimeout(() => setStep(6), 300)
                      }}
                      className={`w-full p-4 rounded-lg border transition-all text-left flex items-center gap-3 ${
                        data.struggle === option.value
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-gray-900 border-gray-800 hover:border-gray-700 text-gray-300'
                      }`}
                    >
                      <span className="text-2xl">{option.emoji}</span>
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  {data.aliasName}, Your Personalized Treatment Plan 🌟
                </h2>
                <p className="text-gray-400">
                  Based on your {data.percentageLost}% weight loss journey
                </p>
              </div>

              <div className="space-y-4">
                {/* Qualification Status */}
                <div className="p-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg animate-pulse">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-amber-400">✨ VIP Qualified!</span>
                    <span className="text-xs bg-amber-500/20 px-2 py-1 rounded-full text-amber-300">TOP 5%</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    You're among the elite who've achieved {data.percentageLost >= 20 ? 'extraordinary' : 'significant'} weight loss
                  </p>
                </div>

                {/* Treatment Recommendation */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-400 mb-3">Your Recommended Treatment</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Treatment:</span>
                      <span className="text-sm font-medium">ProMax Lipo Skin Tightening</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Areas:</span>
                      <span className="text-sm font-medium">{data.percentageLost >= 20 ? 'Full Body' : 'Core + Arms'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Sessions:</span>
                      <span className="text-sm font-medium">{data.percentageLost >= 15 ? '6-8' : '4-6'} sessions</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Timeline:</span>
                      <span className="text-sm font-medium">Results in 4-6 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Preview */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-amber-500/20 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-amber-400">Investment Range</h3>
                      <p className="text-xs text-gray-500 mt-1">Personalized for your transformation</p>
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Limited Time</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    £{data.percentageLost >= 20 ? '2,997' : '1,997'} - £{data.percentageLost >= 20 ? '4,997' : '3,497'}
                  </div>
                  <p className="text-xs text-gray-500">
                    💳 Flexible payment plans available • 0% finance options
                  </p>
                </div>

                {/* Urgency Factor */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400">⏰</span>
                    <span className="text-sm font-medium text-amber-300">Why timing matters:</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Your skin is most responsive to treatment within 12-18 months of weight loss. 
                    {data.percentageLost >= 15 && " You're in the optimal window right now!"}
                  </p>
                </div>

                {/* Social Proof */}
                <div className="text-center py-3">
                  <p className="text-xs text-gray-500 mb-2">Join 2,847+ successful transformations</p>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-amber-400">⭐</span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">4.9/5 from verified patients</p>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => setStep(7)}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  See Your Transformation Timeline →
                </button>
              </div>
            </>
          )}

          {step === 7 && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">
                  Your 90-Day Transformation Timeline 📅
                </h2>
                <p className="text-gray-400">
                  Here's exactly what to expect, {data.aliasName}
                </p>
              </div>

              <div className="space-y-4">
                {/* Timeline */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold shrink-0">1</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Week 1-2: Initial Consultation</p>
                      <p className="text-xs text-gray-500">3D body scan, personalized plan, first treatment</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-500/70 rounded-full flex items-center justify-center text-black font-bold shrink-0">2</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Week 3-6: Active Treatment</p>
                      <p className="text-xs text-gray-500">Weekly sessions, visible tightening begins</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-500/50 rounded-full flex items-center justify-center text-black font-bold shrink-0">3</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Week 7-12: Transformation</p>
                      <p className="text-xs text-gray-500">Dramatic results, final sculpting sessions</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-amber-500/30 rounded-full flex items-center justify-center text-black font-bold shrink-0">4</div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">Day 90: Your New Body</p>
                      <p className="text-xs text-gray-500">Final reveal, maintenance plan, lifetime support</p>
                    </div>
                  </div>
                </div>

                {/* Success Stats */}
                <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-400 mb-3">Expected Results</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-2xl font-bold text-amber-400">89%</span>
                      <p className="text-xs text-gray-500">Report firmer skin</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-amber-400">3-5"</span>
                      <p className="text-xs text-gray-500">Average reduction</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-amber-400">94%</span>
                      <p className="text-xs text-gray-500">Would recommend</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-amber-400">4 wks</span>
                      <p className="text-xs text-gray-500">To visible results</p>
                    </div>
                  </div>
                </div>

                {/* Risk-Free Guarantee */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                  <p className="text-sm font-medium text-green-400 mb-1">✅ 100% Satisfaction Guarantee</p>
                  <p className="text-xs text-gray-500">
                    If you don't see results after 3 sessions, we'll refund your investment
                  </p>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => setStep(8)}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  Unlock Your Transformation Dashboard →
                </button>

                <p className="text-center text-xs text-gray-600">
                  No payment required • Instant access to your plan
                </p>
              </div>
            </>
          )}

          {step === 8 && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full mb-4">
                  <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-amber-400 font-medium">FINAL STEP - SECURE ACCESS</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {data.aliasName}, Your Dashboard is Ready!
                </h2>
                <p className="text-gray-400">
                  Enter your email to create your secure account and access everything
                </p>
              </div>

              <div className="space-y-4">
                {/* What's Waiting For You */}
                <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-amber-400 mb-3">🎆 What's waiting for you inside:</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">Your treatment plan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">Pricing calculator</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">Before/after gallery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">Book consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">Progress tracker</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">✓</span>
                      <span className="text-gray-400">VIP support chat</span>
                    </div>
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-amber-500 focus:outline-none transition-colors text-white"
                    placeholder="your@email.com"
                    autoFocus
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    🔒 Your email creates your secure account and is never shared
                  </p>
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Phone Number 
                    <span className="text-xs text-gray-600 ml-2">(Optional - for VIP perks)</span>
                  </label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg focus:border-amber-500 focus:outline-none transition-colors text-white"
                    placeholder="(555) 123-4567"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    📱 Get text updates, priority booking, and exclusive offers
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-6 py-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>HIPAA Compliant</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    // Here we would actually create the account
                    console.log('Creating account for:', data.email)
                    setStep(9)
                  }}
                  disabled={!data.email}
                  className={`w-full py-4 font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg ${
                    data.email 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500'
                      : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Create My Account & Access Dashboard →
                </button>

                <p className="text-center text-xs text-gray-600">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </>
          )}
        </div>

        {step === 9 && (
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Account Created Successfully!</h2>
              <p className="text-gray-400 mb-2">
                Welcome to the Skulpt family, {data.aliasName}!
              </p>
              <p className="text-sm text-amber-400">
                Check your email for your login credentials
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-4 text-left mb-6">
              <h3 className="font-semibold mb-2">Your account includes:</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">👤</span>
                  <span>Personal dashboard as {data.aliasName}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">📊</span>
                  <span>Your {data.percentageLost}% weight loss treatment plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">📅</span>
                  <span>Priority consultation booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">🎆</span>
                  <span>VIP member benefits</span>
                </li>
              </ul>
            </div>

            <button 
              className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-200 transform hover:scale-105"
              onClick={() => {
                // Would redirect to dashboard
                console.log('Redirecting to dashboard...')
              }}
            >
              Enter Your Dashboard →
            </button>
            
            <p className="text-xs text-gray-600 mt-4">
              📧 We've sent your login details to {data.email}
            </p>
          </div>
        )}

        {/* Action Button */}
        {(step < 8 && step !== 2 && step !== 3 && step !== 4 && step !== 5 && step !== 6 && step !== 7) && (
          <button
            onClick={handleNext}
            disabled={
              (step === 1 && !data.realName)
            }
            className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {step === 1 ? 'Continue to Journey Name' : 'Continue'}
          </button>
        )}

        {/* Partner Attribution */}
        {partnerId !== 'direct' && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Powered by Skulpt • Partner: {partnerId}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}