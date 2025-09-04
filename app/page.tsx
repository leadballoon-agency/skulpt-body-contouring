'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import StealthAssessment from '@/components/StealthAssessment'
import FAQ from '@/components/FAQ'

export default function HomePage() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  
  useEffect(() => {
    // Force scroll to top on page load/refresh
    window.scrollTo(0, 0)
    // Also handle browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center overflow-hidden relative" id="home">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: `url('/images/background for hero section /3.png')`,
            }}
          />
          {/* Dark overlay for elegance */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/85 to-black/80" />
          
          {/* Subtle animated gold accents */}
          <div className="absolute inset-0">
            <div className="absolute top-20 -right-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-block bg-amber-500/10 backdrop-blur-md border border-amber-500/30 text-amber-400 px-6 py-2 rounded-full text-sm font-semibold mb-8 fade-in-up">
            ⚠️ The Truth About Weight Loss Injections
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
            Lost Weight?<br />
            Let's Fix That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Loose Skin</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 drop-shadow-lg">
            Professional non-surgical treatment for your post-weight loss transformation. 
            Find out if you're suitable in just 2 minutes.
          </p>
          
          <button 
            onClick={() => {
              // Find and click the assessment button to open modal
              const assessmentBtn = document.querySelector('[data-assessment-trigger]') as HTMLButtonElement
              if (assessmentBtn) assessmentBtn.click()
            }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-black px-10 py-5 rounded-lg text-lg font-bold hover:from-amber-400 hover:to-amber-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-amber-500/25 mb-12 transform hover:scale-105"
          >
            Start Free Assessment →
          </button>
          
          <div className="flex flex-wrap justify-center gap-6 text-gray-300">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">5,000+ Transformations</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">2 Minute Assessment</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Truth Section */}
      <section className="py-20 bg-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light mb-8">
            The Medical Reality of Rapid Weight Loss
          </h2>
          <div className="space-y-8 text-lg md:text-xl leading-relaxed">
            <p>
              <strong className="font-semibold">The past two years changed everything.</strong> Suddenly, everyone's on Ozempic, Wegovy, or Mounjaro. 
              The weight melts off - 2-3 stone in months. Instagram celebrates. Your doctor's thrilled.
            </p>
            <p className="text-red-300">
              But then you look in the mirror... and there it is. The saggy, loose, hanging skin that nobody warned you about.
            </p>
            <p>
              <strong>You're not alone.</strong> Thousands across the UK are discovering that skinny jabs solve one problem 
              but create another. The pharmaceutical companies won't tell you. Your GP might not know. 
              But we see it every day in Peterborough - and we have the solution.
            </p>
          </div>
        </div>
      </section>

      {/* About Skulpt Section */}
      <section className="py-20 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-primary-500 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider mb-6">
              About Skulpt
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-dark mb-4">
              Peterborough's Premier Body Contouring Clinic
            </h2>
            <p className="text-xl text-gray-600">
              Specialists in treating loose skin from skinny jab weight loss
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-light-gray rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-3">5+ Years of Excellence</h3>
              <p className="text-gray-600">Pioneering non-surgical body contouring treatments with over 5,000 successful transformations</p>
            </div>
            
            <div className="text-center p-6 bg-light-gray rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">👩‍⚕️</div>
              <h3 className="text-xl font-semibold mb-3">Medical Professionals</h3>
              <p className="text-gray-600">Certified practitioners trained in advanced body contouring technologies and techniques</p>
            </div>
            
            <div className="text-center p-6 bg-light-gray rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-semibold mb-3">ProMax Lipo by Lynton</h3>
              <p className="text-gray-600">Exclusive access to Lynton's medical-grade ProMax Lipo - the gold standard in non-surgical body contouring</p>
            </div>
            
            <div className="text-center p-6 bg-light-gray rounded-2xl hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3">Loose Skin Specialists</h3>
              <p className="text-gray-600">Treating loose skin from ALL causes - including the new wave of Ozempic/Wegovy users</p>
            </div>
          </div>
        </div>
      </section>

      {/* ProMax Lipo Section */}
      <section className="py-20 bg-gradient-to-b from-light-gray to-white" id="treatment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-primary-500 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider mb-6">
              The Solution
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-dark mb-4">
              ProMax Lipo: Where Science Meets Results
            </h2>
            <p className="text-xl text-gray-600">
              The UK's most advanced non-surgical body contouring system
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-12">
            <h3 className="text-3xl font-light text-center mb-12">How ProMax Lipo Works Its Magic</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl border-l-4 border-primary-500">
                <h4 className="text-xl font-semibold text-primary-500 mb-3">Stage 1: Fat Disruption</h4>
                <p className="text-gray-600 leading-relaxed">Ultrasonic waves penetrate deep to break down fat cells permanently - they're naturally eliminated by your body over the following weeks.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border-l-4 border-primary-500">
                <h4 className="text-xl font-semibold text-primary-500 mb-3">Stage 2: Skin Tightening</h4>
                <p className="text-gray-600 leading-relaxed">Radio frequency heats the dermis to 40-45°C, triggering immediate collagen contraction and long-term collagen remodeling.</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border-l-4 border-primary-500">
                <h4 className="text-xl font-semibold text-primary-500 mb-3">Stage 3: Contouring</h4>
                <p className="text-gray-600 leading-relaxed">Vacuum massage improves circulation, accelerates lymphatic drainage, and smooths skin texture for that sculpted finish.</p>
              </div>
            </div>
            
            <div className="bg-dark text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-light text-center mb-8 text-primary-400">Why ProMax Lipo Beats Everything Else</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <strong className="text-primary-400">vs Surgery:</strong>
                  <p className="text-sm mt-2">No scars, no anesthesia, no 6-week recovery. Walk in, walk out, live your life.</p>
                </div>
                <div>
                  <strong className="text-primary-400">vs Cool Sculpting:</strong>
                  <p className="text-sm mt-2">Tightens skin while removing fat. No risk of loose skin or uneven results.</p>
                </div>
                <div>
                  <strong className="text-primary-400">vs HIFU:</strong>
                  <p className="text-sm mt-2">Treats fat AND skin in one session. More comfortable, faster results.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-light mb-8">Real People. Real Results. Real Fast.</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-light-gray p-6 rounded-xl">
                <div className="text-3xl font-bold text-primary-500">89%</div>
                <p className="text-sm text-gray-600">See results after first session</p>
              </div>
              <div className="bg-light-gray p-6 rounded-xl">
                <div className="text-3xl font-bold text-primary-500">0</div>
                <p className="text-sm text-gray-600">Days downtime needed</p>
              </div>
              <div className="bg-light-gray p-6 rounded-xl">
                <div className="text-3xl font-bold text-primary-500">6</div>
                <p className="text-sm text-gray-600">Sessions for full transformation</p>
              </div>
              <div className="bg-light-gray p-6 rounded-xl">
                <div className="text-3xl font-bold text-primary-500">98%</div>
                <p className="text-sm text-gray-600">Client satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Areas Section */}
      <section className="py-20 bg-black text-white" id="areas">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-500/10 text-amber-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Treatment Areas
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Professional Results for Every Area
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See real transformations from our ProMax Lipo treatments. Select an area to view before & after results.
            </p>
          </div>

          {!selectedArea ? (
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { 
                    id: 'stomach', 
                    label: 'Stomach', 
                    icon: '🎯',
                    description: 'Tighten loose abdominal skin',
                    severity: 'Most Popular'
                  },
                  { 
                    id: 'thighs', 
                    label: 'Thighs', 
                    icon: '🦵',
                    description: 'Smooth inner thigh contouring',
                    severity: 'High Demand'
                  },
                  { 
                    id: 'bum', 
                    label: 'Bum', 
                    icon: '🍑',
                    description: 'Lift and restore volume',
                    severity: 'Popular'
                  },
                  { 
                    id: 'arms', 
                    label: 'Arms', 
                    icon: '💪',
                    description: 'Tone and sculpt upper arms',
                    severity: 'Common'
                  },
                  { 
                    id: 'bingo-wings', 
                    label: 'Bingo Wings', 
                    icon: '🦋',
                    description: 'Eliminate under-arm hanging',
                    severity: 'Very Popular'
                  }
                ].map((area) => (
                  <button
                    key={area.id}
                    onClick={() => {
                      setSelectedArea(area.id)
                      console.log(`User viewing ${area.label} results - engaged visitor`)
                    }}
                    className="group text-left bg-gray-900/50 border border-gray-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-gray-900/80 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{area.icon}</div>
                      <span className="text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full font-semibold">
                        {area.severity}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{area.label}</h3>
                    <p className="text-gray-300 text-sm mb-4">{area.description}</p>
                    <div className="text-amber-400 text-sm font-semibold group-hover:text-amber-300 transition-colors">
                      View Results →
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-400 text-sm">Click any area to see real patient transformations</p>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fadeIn">
              {selectedArea === 'stomach' && (
                <div>
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-6 text-center">Abdominal Transformation</p>
                  <div className="bg-gray-900 rounded-3xl p-4 mb-8">
                    <img 
                      src="/images/Before and After/stomach.png" 
                      alt="Stomach transformation results" 
                      className="w-full h-auto object-contain rounded-2xl"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Dramatic Abdominal Tightening</h3>
                    <p className="text-gray-300 text-lg mb-6">Complete transformation of loose abdominal skin using our advanced ProMax Lipo system</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">6-8</div>
                          <p className="text-sm text-gray-300">Sessions</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">0</div>
                          <p className="text-sm text-gray-300">Downtime</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Permanent</div>
                          <p className="text-sm text-gray-300">Results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArea === 'thighs' && (
                <div>
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-6 text-center">Thigh Contouring</p>
                  <div className="bg-gray-900 rounded-3xl p-4 mb-8">
                    <img 
                      src="/images/Before and After/legs.jpg" 
                      alt="Thigh transformation results" 
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Smooth Thigh Contouring</h3>
                    <p className="text-gray-300 text-lg mb-6">Inner and outer thigh sculpting for a confident, smooth silhouette</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">8-10</div>
                          <p className="text-sm text-gray-300">Sessions</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">None</div>
                          <p className="text-sm text-gray-300">Pain</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">2 Weeks</div>
                          <p className="text-sm text-gray-300">First Results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArea === 'bum' && (
                <div>
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-6 text-center">Bum Lifting</p>
                  <div className="bg-gray-900 rounded-3xl p-4 mb-8">
                    <img 
                      src="/images/Before and After/bum.jpg" 
                      alt="Bum transformation results" 
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Natural Lift & Volume</h3>
                    <p className="text-gray-300 text-lg mb-6">Restore lost volume and achieve a natural lift without surgery</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">6-8</div>
                          <p className="text-sm text-gray-300">Sessions</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Comfortable</div>
                          <p className="text-sm text-gray-300">Treatment</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Natural</div>
                          <p className="text-sm text-gray-300">Look</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArea === 'arms' && (
                <div>
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-6 text-center">Arm Contouring</p>
                  <div className="bg-gray-900 rounded-3xl p-4 mb-8">
                    <img 
                      src="/images/Before and After/arms.jpg" 
                      alt="Arm transformation results" 
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Sculpted Upper Arms</h3>
                    <p className="text-gray-300 text-lg mb-6">Dramatic improvement in arm definition and skin tightness</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">8</div>
                          <p className="text-sm text-gray-300">Sessions</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Painless</div>
                          <p className="text-sm text-gray-300">Process</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Visible</div>
                          <p className="text-sm text-gray-300">Week 2</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedArea === 'bingo-wings' && (
                <div>
                  <p className="text-amber-400 text-sm uppercase tracking-wider mb-6 text-center">Bingo Wings Treatment</p>
                  <div className="bg-gray-900 rounded-3xl p-4 mb-8">
                    <img 
                      src="/images/Before and After/bingo wings.jpg" 
                      alt="Bingo wings transformation results" 
                      className="w-full h-auto object-cover rounded-2xl"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <h3 className="text-3xl font-bold text-white mb-4">Eliminate Bingo Wings</h3>
                    <p className="text-gray-300 text-lg mb-6">Complete elimination of hanging under-arm skin for confident arm movement</p>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">6-10</div>
                          <p className="text-sm text-gray-300">Sessions</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">98%</div>
                          <p className="text-sm text-gray-300">Success Rate</p>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-amber-400">Long-term</div>
                          <p className="text-sm text-gray-300">Results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex gap-4 justify-center mt-12">
                <button
                  onClick={() => {
                    setSelectedArea(null)
                    console.log('User browsing more areas - high engagement')
                  }}
                  className="px-8 py-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all font-semibold"
                >
                  ← View All Areas
                </button>
                <button
                  onClick={() => {
                    console.log(`User interested in ${selectedArea} treatment - HOT LEAD`)
                    // Find and click the assessment button to open modal
                    const assessmentBtn = document.querySelector('[data-assessment-trigger]') as HTMLButtonElement
                    if (assessmentBtn) assessmentBtn.click()
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all"
                >
                  Start Free Assessment →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white" id="process">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-50 text-primary-500 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider mb-6">
              The Process
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-dark mb-4">
              Your Journey to Tighter Skin
            </h2>
            <p className="text-xl text-gray-600">
              Simple, effective, and tailored to you
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
            
            <div className="space-y-12">
              {[
                {
                  step: 1,
                  title: "Free Assessment",
                  description: "Our smart tool quickly determines if you're a candidate for this proven treatment"
                },
                {
                  step: 2,
                  title: "Consultation",
                  description: "Meet with our specialists for a personalized treatment plan, body analysis, and realistic expectations setting"
                },
                {
                  step: 3,
                  title: "Treatment Sessions",
                  description: "Relax during 45-60 minute sessions. Most clients need 6 sessions, spaced 1-2 weeks apart"
                },
                {
                  step: 4,
                  title: "See Results",
                  description: "Notice improvements after session 1, with dramatic results by session 6. We track your progress with photos"
                },
                {
                  step: 5,
                  title: "Maintenance",
                  description: "Keep your results with our maintenance plans and lifestyle guidance from our nutrition experts"
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-dark mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* CTA Section */}
      <section className="py-20 bg-primary-500 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Ready to Complete Your Transformation?</h2>
          <p className="text-xl mb-8">Weight loss was step one. Tight skin is step two. Let's finish what you started.</p>
          <button 
            onClick={() => {
              // Find and click the assessment button to open modal
              const assessmentBtn = document.querySelector('[data-assessment-trigger]') as HTMLButtonElement
              if (assessmentBtn) assessmentBtn.click()
            }}
            className="bg-white text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Assessment Now
          </button>
          <p className="text-primary-100 mt-6">✓ 60-second assessment ✓ Personalized results ✓ Book consultation after qualifying</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-8 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2">&copy; 2025 Skulpt Body Contouring. All rights reserved.</p>
          <p className="text-gray-400">This is not medical advice. Results vary. Consult your doctor before any treatment.</p>
        </div>
      </footer>
      
      {/* Assessment Modal Component - Hidden until triggered */}
      <StealthAssessment />
    </main>
  )
}