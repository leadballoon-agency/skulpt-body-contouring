'use client'

import { useState, useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function SkinTitePage() {
  const [showVideo, setShowVideo] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingArea, setBookingArea] = useState<string>('')
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Load widget configuration from localStorage
  const [config, setConfig] = useState<any>({
    general: { spotsRemaining: 7 },
    copy: { ctaButton: 'Start Your Free Assessment' },
    values: { 
      consultationValue: '£150',
      todayPrice: 'FREE'
    }
  })
  
  // Load saved config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('widget_config')
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig))
    }
  }, [])

  const handlePlayVideo = () => {
    setShowVideo(true)
    // Auto-play video after state change
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 100)
  }

  // Load GHL Calendar Script
  useEffect(() => {
    if (showBookingModal) {
      const script = document.createElement('script')
      script.src = 'https://link.skintight.uk/js/form_embed.js'
      script.type = 'text/javascript'
      script.async = true
      document.body.appendChild(script)
      
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [showBookingModal])

  // Force scroll to top on page load/refresh
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)
    
    // Also set history scroll restoration to manual to prevent browser from restoring scroll position
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white overflow-hidden">
        {/* Background image - same as main page */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url('/images/background for hero section /3.png')`,
            }}
          />
          {/* Dark overlay for elegance */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/80" />
        </div>
        
        {/* Animated background circles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-20">
            <div>
              <h3 className="text-amber-400 font-light text-sm tracking-widest mb-1">EXCLUSIVE TREATMENT</h3>
              <h2 className="text-2xl font-bold">Advanced Skin Tightening</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Transform your body</p>
              <p className="text-amber-400 font-semibold">No Surgery Required</p>
            </div>
          </div>

          {/* Main Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full mb-8">
                <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-amber-400 text-sm font-medium">Limited Time: {config.values?.todayPrice || 'Free'} Consultation</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Tighten Loose Skin
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  After Weight Loss
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Lost weight with Ozempic, Wegovy, or Mounjaro? 
                <span className="text-amber-400 font-semibold">We'll fix your loose skin</span> without surgery.
                <br/><span className="text-2xl font-bold text-white">2 Areas for Just £149</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => {
                    setBookingArea('consultation')
                    setShowBookingModal(true)
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all shadow-xl"
                >
                  Book Your £149 Treatment →
                </button>
                <button 
                  onClick={() => {
                    // Scroll to treatment section
                    const treatmentSection = document.getElementById('treatments');
                    if (treatmentSection) {
                      treatmentSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-8 py-4 border border-amber-500/50 text-amber-400 font-semibold rounded-lg hover:bg-amber-500/10 transition-all">
                  Watch Treatment Video
                </button>
              </div>

              <div className="flex gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Surgery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>No Downtime</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Proven Results</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-amber-900/20 to-amber-950/40 h-[600px] p-6">
                {/* Backend System Preview - Coming Soon */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 rounded-full mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-amber-400 font-medium">LIVE SYSTEM PREVIEW</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Your Future Treatment Portal</h3>
                    <p className="text-gray-400 text-xs">Coming Q1 2025 - Be the first to access</p>
                  </div>
                  
                  {/* Mock Dashboard Interface */}
                  <div className="flex-1 bg-black/50 rounded-lg border border-amber-500/20 overflow-hidden">
                    {/* Top Bar */}
                    <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 px-4 py-2 border-b border-amber-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-xs text-amber-400">Welcome back,</div>
                          <div className="text-sm font-bold text-white">GoldenPhoenix_565</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-xs text-gray-400">System Active</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Dashboard Grid */}
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {/* Treatment Progress Card */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 group hover:border-amber-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Treatment Progress</span>
                          <span className="text-xs text-amber-400">LIVE</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">73%</div>
                        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-amber-500 to-amber-400 animate-pulse"></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Session 4 of 6</p>
                      </div>
                      
                      {/* Body Metrics Card */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 group hover:border-amber-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Skin Tightness</span>
                          <span className="text-xs text-green-400">↑ 12%</span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">8.4/10</div>
                        <div className="flex gap-1 mt-2">
                          {[1,2,3,4,5].map((i) => (
                            <div key={i} className={`h-3 w-1 ${i <= 4 ? 'bg-amber-500' : 'bg-gray-700'} rounded-full`}></div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Elasticity Score</p>
                      </div>
                      
                      {/* Next Appointment */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 group hover:border-amber-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">Next Session</span>
                          <span className="text-xs text-amber-400">Confirmed</span>
                        </div>
                        <div className="text-lg font-bold text-white">Dec 15</div>
                        <p className="text-xs text-gray-500">2:30 PM</p>
                        <button 
                          onClick={() => {
                            const assessmentSection = document.getElementById('free-assessment');
                            if (assessmentSection) {
                              assessmentSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="mt-2 text-xs text-amber-400 hover:text-amber-300">
                          Book Now →
                        </button>
                      </div>
                      
                      {/* AI Recommendations */}
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800 group hover:border-amber-500/50 transition-all cursor-pointer">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400">AI Analysis</span>
                          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-sm font-medium text-white mb-1">Optimal Progress</div>
                        <p className="text-xs text-gray-500">+2 zones recommended</p>
                        <div className="mt-2 text-xs text-amber-400">View Details →</div>
                      </div>
                    </div>
                    
                    {/* Photo Timeline Preview */}
                    <div className="px-4 pb-3">
                      <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
                        <div className="text-xs text-gray-400 mb-2">Your Transformation Timeline</div>
                        <div className="flex gap-2">
                          {['Week 0', 'Week 2', 'Week 4', 'Week 6'].map((week, i) => (
                            <div key={week} className="flex-1">
                              <div className={`h-16 bg-gradient-to-b ${i === 0 ? 'from-gray-700 to-gray-600' : i === 3 ? 'from-amber-900/40 to-amber-800/30' : 'from-gray-800 to-gray-700'} rounded-lg mb-1`}></div>
                              <p className="text-xs text-gray-500 text-center">{week}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Live Activity Feed */}
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <span>247 clients active now</span>
                        <span className="text-gray-600">•</span>
                        <span>12 completing treatment today</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Beta Access - triggers assessment */}
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => {
                        const assessmentSection = document.getElementById('free-assessment');
                        if (assessmentSection) {
                          assessmentSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-lg hover:border-amber-500/50 transition-all"
                    >
                      <span className="text-sm text-amber-400 font-medium">Join Beta Access List →</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">First 100 clients get lifetime premium features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">89%</div>
              <div className="text-sm opacity-90">Skin Tightening Success</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-sm opacity-90">Sessions Average</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">0</div>
              <div className="text-sm opacity-90">Days Downtime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2,847</div>
              <div className="text-sm opacity-90">Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section id="treatments" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                The Weight Loss Dilemma Nobody Talks About
              </h2>
              <div className="space-y-4 text-gray-600">
                <p className="text-lg">
                  You've done the hard work. The weight is gone. But now you're left with 
                  <span className="text-amber-600 font-semibold"> loose, sagging skin</span> that 
                  makes you feel like you're still hiding your body.
                </p>
                <p>
                  Whether you used Ozempic, Wegovy, Mounjaro, or lost weight through diet and exercise, 
                  rapid weight loss often leaves skin that can't bounce back on its own.
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
                  <p className="font-semibold text-amber-900 mb-2">The Science:</p>
                  <p className="text-sm">
                    When you lose weight quickly, your skin's collagen and elastin fibers 
                    can't contract fast enough. Our treatment stimulates new collagen production 
                    while tightening existing fibers.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">😔</div>
                  <h3 className="font-semibold mb-2">Loose Stomach</h3>
                  <p className="text-sm text-gray-600">Apron belly or mummy tummy affecting confidence</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">💪</div>
                  <h3 className="font-semibold mb-2">Saggy Arms</h3>
                  <p className="text-sm text-gray-600">Bat wings that won't go away with exercise</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">🦵</div>
                  <h3 className="font-semibold mb-2">Droopy Thighs</h3>
                  <p className="text-sm text-gray-600">Inner thigh sagging causing discomfort</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-3xl mb-2">😰</div>
                  <h3 className="font-semibold mb-2">Neck & Face</h3>
                  <p className="text-sm text-gray-600">Turkey neck and jowls aging your appearance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Areas - Visual Results with Reveal */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Real Results Across All Areas</h2>
            <p className="text-xl text-gray-400 mb-8">Actual transformations from our Ozempic skin tightening treatments</p>
            
            {!selectedArea ? (
              <div className="space-y-6">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-amber-500/20">
                    <h3 className="text-2xl text-white mb-4 font-bold">After Ozempic Weight Loss...</h3>
                    <p className="text-amber-400 text-lg font-bold mb-2">
                      OZEMPIC/MOUNJARO PATIENTS: £149 Special
                    </p>
                    <p className="text-gray-300 mb-6">
                      Fix 2 areas of loose skin in 1 hour - Save £301 (Usually £450)
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {[
                        { 
                          id: 'stomach', 
                          label: 'Stomach', 
                          description: 'Apron belly, loose skin',
                          severity: 'Most Common Area'
                        },
                        { 
                          id: 'thighs', 
                          label: 'Thighs', 
                          description: 'Inner thigh sagging',
                          severity: 'Very Common'
                        },
                        { 
                          id: 'bum', 
                          label: 'Bum', 
                          description: 'Lost volume & sagging',
                          severity: 'Common Issue'
                        },
                        { 
                          id: 'arms', 
                          label: 'Arms', 
                          description: 'Deflated appearance',
                          severity: 'Frequent Concern'
                        },
                        { 
                          id: 'bingo-wings', 
                          label: 'Bingo Wings', 
                          description: 'Hanging underneath',
                          severity: 'Very Common'
                        }
                      ].map((area) => (
                        <button
                          key={area.id}
                          onClick={() => {
                            setSelectedArea(area.id)
                            console.log(`Ozempic patient selected ${area.label} - HIGH INTENT for skin tightening`)
                          }}
                          className="group text-left bg-black/50 border border-gray-700 rounded-xl p-4 hover:border-amber-500 hover:bg-black/70 transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-semibold">{area.label}</h4>
                            <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full">
                              {area.severity}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm">{area.description}</p>
                        </button>
                      ))}
                    </div>
                    
                    <p className="text-gray-500 text-xs text-center">
                      Select your problem area to see actual patient results
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-fadeIn max-w-4xl mx-auto">
                {/* Show selected area results */}
                {selectedArea === 'stomach' && (
                  <div>
                    <p className="text-amber-400 text-sm uppercase tracking-wider mb-4">Post-Ozempic Transformation</p>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/stomach.png" 
                        alt="Stomach tightening after Ozempic weight loss" 
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Abdominal Skin Tightening</h3>
                    <p className="text-gray-300 mb-4">This patient lost 45 lbs with Ozempic and tightened the loose skin with our advanced treatment</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 text-sm">
                        <strong>Treatment Time:</strong> 6 sessions over 4 weeks • <strong>Recovery:</strong> None • <strong>Results:</strong> Permanent with maintenance
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedArea === 'arms' && (
                  <div>
                    <p className="text-amber-400 text-sm uppercase tracking-wider mb-4">Upper Arm Transformation</p>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/arms.jpg" 
                        alt="Upper arm tightening after weight loss" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Upper Arm Contouring</h3>
                    <p className="text-gray-300 mb-4">Dramatic improvement in arm definition and skin tightness after Ozempic weight loss</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 text-sm">
                        <strong>Sessions:</strong> 8 treatments • <strong>Pain Level:</strong> None • <strong>First Results:</strong> 2 weeks
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedArea === 'bum' && (
                  <div>
                    <p className="text-amber-400 text-sm uppercase tracking-wider mb-4">Bum Transformation</p>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/bum.jpg" 
                        alt="Bum lifting and contouring results" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Bum Lifting & Contouring</h3>
                    <p className="text-gray-300 mb-4">Restore volume and lift after weight loss with skin tightening treatment</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 text-sm">
                        <strong>Treatment:</strong> Lifting & tightening • <strong>Sessions:</strong> 8-10 treatments • <strong>Results:</strong> Natural lift
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedArea === 'bingo-wings' && (
                  <div>
                    <p className="text-amber-400 text-sm uppercase tracking-wider mb-4">Bingo Wings Treatment</p>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/bingo wings.jpg" 
                        alt="Under arm (bingo wings) tightening" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Under Arm Transformation</h3>
                    <p className="text-gray-300 mb-4">Complete elimination of hanging under-arm skin after significant weight loss</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 text-sm">
                        <strong>Problem:</strong> Bingo wings from rapid weight loss • <strong>Solution:</strong> Advanced skin tightening • <strong>Satisfaction:</strong> 98%
                      </p>
                    </div>
                  </div>
                )}
                
                {selectedArea === 'thighs' && (
                  <div>
                    <p className="text-amber-400 text-sm uppercase tracking-wider mb-4">Leg & Thigh Results</p>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/legs.jpg" 
                        alt="Leg and thigh contouring results" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">Thigh Contouring</h3>
                    <p className="text-gray-300 mb-4">Inner thigh tightening and contouring after Ozempic-assisted weight loss</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
                      <p className="text-amber-400 text-sm">
                        <strong>Areas:</strong> Inner & outer thighs • <strong>Sessions:</strong> 10 treatments • <strong>Downtime:</strong> Zero
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSelectedArea(null)
                      console.log('Ozempic patient exploring other areas - multiple problem areas likely')
                    }}
                    className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all"
                  >
                    ← See Other Areas
                  </button>
                  <button
                    onClick={() => {
                      console.log(`OZEMPIC HOT LEAD: Ready for ${selectedArea} treatment consultation`)
                      setBookingArea(selectedArea || '')
                      setShowBookingModal(true)
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all"
                  >
                    Fix My Loose Skin →
                  </button>
                </div>
                
                <p className="text-gray-500 text-sm italic text-center mt-8">
                  *Individual results may vary. All photos are real patients treated at our clinic.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How Our Treatment Works</h2>
            <p className="text-xl text-gray-600">Three technologies. One treatment. Amazing results.</p>
          </div>

          {/* Video Section */}
          <div className="mb-16">
            <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
              {!showVideo ? (
                /* Video Thumbnail/Splash Screen */
                <div 
                  className="relative w-full aspect-video bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/background for hero section /3.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Pulsing ring animation */}
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping animation-delay-200"></div>
                      
                      {/* Main play button */}
                      <button 
                        onClick={handlePlayVideo}
                        className="relative w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white transition-all duration-300 group-hover:scale-110 shadow-2xl"
                      >
                        <svg className="w-8 h-8 text-amber-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Video Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <span className="text-white text-sm font-medium">2:45</span>
                  </div>
                  
                  {/* Video Title Overlay */}
                  <div className="absolute bottom-4 left-4 max-w-md">
                    <h3 className="text-white text-lg font-bold mb-1">See The Skulpt Difference</h3>
                    <p className="text-white/80 text-sm">Watch how we transform loose skin without surgery</p>
                  </div>
                  
                  {/* Decorative corner badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                      NEW
                    </span>
                    <span className="bg-white/90 backdrop-blur-sm text-amber-600 text-xs px-3 py-1.5 rounded-full font-semibold">
                      HD Quality
                    </span>
                  </div>
                </div>
              ) : (
                /* Actual Video Player */
                <div className="relative w-full aspect-video bg-black">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    controls
                    controlsList="nodownload"
                    src="https://storage.googleapis.com/msgsndr/dVD6QbgqAF7fiHM3MCrz/media/68bbda681ff6ea68881525c1.mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Close button to return to splash screen */}
                  <button
                    onClick={() => setShowVideo(false)}
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/90 transition-colors"
                    title="Close video"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Video CTA text */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                <span className="font-semibold">Click to watch</span> how our treatment can transform your body
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Ultrasound Cavitation</h3>
              <p className="text-gray-600 mb-4">
                Breaks down stubborn fat cells that remain after weight loss, 
                sculpting your new body shape.
              </p>
              <div className="text-sm text-amber-600 font-semibold">
                → Removes residual fat pockets
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Radio Frequency</h3>
              <p className="text-gray-600 mb-4">
                Heats deep skin layers to stimulate collagen production and 
                contract existing fibers for immediate tightening.
              </p>
              <div className="text-sm text-amber-600 font-semibold">
                → Tightens loose skin
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Vacuum Massage</h3>
              <p className="text-gray-600 mb-4">
                Improves lymphatic drainage and blood circulation while 
                smoothing skin texture and reducing cellulite.
              </p>
              <div className="text-sm text-amber-600 font-semibold">
                → Smooths & contours
              </div>
            </div>
          </div>

          <div className="mt-12 bg-amber-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose Non-Surgical Treatment?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>No Scars:</strong> Unlike tummy tucks or arm lifts
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>No Recovery:</strong> Return to work immediately
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>No Risks:</strong> No anesthesia or surgical complications
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <strong>Affordable:</strong> Fraction of surgery cost
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold mb-4">Typical Treatment Plan:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Initial consultation:</span>
                    <span className="font-semibold">{config.values?.todayPrice || 'FREE'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sessions needed:</span>
                    <span className="font-semibold">6-8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Session duration:</span>
                    <span className="font-semibold">45-60 mins</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span className="font-semibold">Weekly</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Results visible:</span>
                    <span className="font-semibold">After 1st session</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment widget section hidden for deployment */}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Real People. Real Results.</h2>
            <p className="text-xl text-gray-600">From Ozempic weight loss to tight, toned skin</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Lost 4 stone on Ozempic but was devastated by the loose skin. 
                The treatment gave me the body I worked so hard for. No surgery needed!"
              </p>
              <div className="font-semibold">Sarah M.</div>
              <div className="text-sm text-gray-500">Lost 56 lbs • Stomach & arms treated</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "After Wegovy, I had the 'deflated balloon' look. 6 sessions later, 
                my skin is tight and I finally feel confident in fitted clothes!"
              </p>
              <div className="font-semibold">Emma T.</div>
              <div className="text-sm text-gray-500">Lost 42 lbs • Full body treatment</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "Mounjaro helped me lose weight but left me with bat wings. 
                The skin tightening treatment fixed everything. Worth every penny!"
              </p>
              <div className="font-semibold">Lisa K.</div>
              <div className="text-sm text-gray-500">Lost 38 lbs • Arms & thighs treated</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Love Your New Body?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            You've lost the weight. Now let's perfect the results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                setBookingArea('consultation')
                setShowBookingModal(true)
              }}
              className="px-8 py-4 bg-white text-amber-600 font-bold rounded-lg hover:bg-gray-100 transform hover:scale-105 transition-all shadow-xl"
            >
              Book Your Treatment
            </button>
            <a 
              href="tel:01234567890" 
              className="inline-block px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all text-center">
              Call: 01234 567 890
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75">
            Limited appointments available • Book today for treatment within 7 days
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-amber-400 mb-4">SkinTite Clinic</h3>
              <p className="text-sm text-gray-400">
                Specialist skin tightening clinic using advanced medical technology. 
                Helping post-weight loss clients achieve their dream body.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-amber-400 mb-4">Treatments</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><button onClick={() => { const el = document.getElementById('treatments'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">Stomach Tightening</button></li>
                <li><button onClick={() => { const el = document.getElementById('treatments'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">Arm Lift (Non-Surgical)</button></li>
                <li><button onClick={() => { const el = document.getElementById('treatments'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">Thigh Contouring</button></li>
                <li><button onClick={() => { const el = document.getElementById('treatments'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors">Face & Neck Tightening</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-400 mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📍 <a href="https://maps.google.com/?q=High+Street+Peterborough" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">High Street, Peterborough</a></li>
                <li>📞 <a href="tel:01234567890" className="hover:text-amber-400 transition-colors">01234 567 890</a></li>
                <li>✉️ <a href="mailto:info@skintite.uk" className="hover:text-amber-400 transition-colors">info@skintite.uk</a></li>
                <li>🕐 Mon-Sat: 9am-7pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 SkinTite Clinic. All rights reserved. | Powered by Skulpt Assessment Technology</p>
          </div>
        </div>
      </footer>

      {/* GHL Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowBookingModal(false)}
        />
        
        {/* Modal */}
        <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl max-w-md w-full p-8 border border-amber-500/20 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={() => setShowBookingModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content */}
          <div className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Fix Your Ozempic Loose Skin - £149 for 2 Areas
            </h3>
            
            <p className="text-gray-300 mb-6">
              Area selected: <span className="text-amber-400 font-semibold">
                {bookingArea === 'stomach' && 'Stomach'}
                {bookingArea === 'thighs' && 'Thighs'}
                {bookingArea === 'bum' && 'Bum'}
                {bookingArea === 'arms' && 'Arms'}
                {bookingArea === 'bingo-wings' && 'Bingo Wings'}
              </span>
              <br/>
              <span className="text-sm text-gray-400">Choose 1 more area at your appointment</span>
            </p>
            
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
              <p className="text-amber-400 text-sm font-semibold mb-2">Ozempic Special Offer</p>
              <p className="text-white text-lg">1 Hour Treatment - 2 Body Areas</p>
              <p className="text-gray-400 text-xs mt-1">Worth £450 • Special Price £149 • Perfect for post-weight loss</p>
            </div>
            
            {/* Beautiful GHL Calendar - Mobile Optimized */}
            <div className="relative w-full">
              {/* Loading State */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 animate-pulse rounded-xl pointer-events-none" 
                   style={{ display: 'block' }}
                   id="calendar-loader-skintite">
                <div className="flex items-center justify-center h-full">
                  <div className="text-amber-400 text-sm">Loading booking calendar...</div>
                </div>
              </div>
              
              {/* Calendar Container with Glass Effect */}
              <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-1 md:p-2 border border-amber-500/20 shadow-2xl">
                <iframe 
                  src="https://link.skintight.uk/widget/booking/BkV9yMGSHFDGj6RV4cAI" 
                  style={{ 
                    width: '100%', 
                    minHeight: '450px',
                    height: '55vh',
                    maxHeight: '600px',
                    border: 'none',
                    borderRadius: '0.5rem',
                    background: 'white'
                  }} 
                  scrolling="no" 
                  id="BkV9yMGSHFDGj6RV4cAI_skintite"
                  onLoad={() => {
                    const loader = document.getElementById('calendar-loader-skintite')
                    if (loader) loader.style.display = 'none'
                  }}
                />
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mt-4">
              Specializing in post-weight loss skin tightening
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  )
}