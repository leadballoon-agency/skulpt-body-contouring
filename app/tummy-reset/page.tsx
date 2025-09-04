'use client'

import { useState, useEffect, useRef } from 'react'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
// LeadBalloon widgets will be injected via script - no imports needed

export default function TummyResetPage() {
  const [showResults, setShowResults] = useState(false)
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingArea, setBookingArea] = useState<string>('')
  
  // Load widget configuration from localStorage
  const [config, setConfig] = useState<any>({
    general: { spotsRemaining: 7, timerHours: 23, timerMinutes: 59 },
    copy: { 
      headline: 'Transform Your Appearance Today',
      trustBadge: '2,847 UK Residents Have Transformed',
      urgencyMessage: 'Only {spots} spots remaining this week'
    },
    values: {
      consultationValue: '£150',
      bodyScanValue: '£200', 
      treatmentPlanValue: '£150',
      totalValue: '£500',
      todayPrice: 'FREE'
    }
  })
  
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })
  
  // Load saved config from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('widget_config')
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig)
      setConfig(parsed)
      setTimeLeft({
        hours: parsed.general?.timerHours || 23,
        minutes: parsed.general?.timerMinutes || 59,
        seconds: 59
      })
    }
  }, [])

  // Countdown timer - only run on client side
  useEffect(() => {
    // Only run timer on client side to avoid hydration mismatch
    if (typeof window === 'undefined') return
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

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
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Urgent Header Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-4 text-center sticky top-0 z-50">
        <p className="text-sm font-bold animate-pulse">
          ⚠️ LIMITED TIME: Special Pricing Ends In {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20">
          {/* Trust Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">2,847 UK Residents Have Transformed Their Bodies</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Ozempic Tummy Reset</span>
              <br />
              <span className="text-3xl md:text-5xl">Fix Your Loose Skin - 2 Areas Only £149</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Lost weight with Ozempic, Wegovy or Mounjaro? The loose skin nobody warned you about?
              We fix it. Non-surgical skin tightening that actually works.
            </p>

            {/* Subheadline with urgency */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-amber-400 font-semibold">
                Watch this short video to see how Sarah lost 3 stone with Ozempic 
                and finally got rid of her loose belly skin in just 6 weeks
              </p>
            </div>
          </div>

          {/* Video Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <video 
                className="w-full aspect-video"
                controls
                controlsList="nodownload"
                poster=""
                preload="metadata"
              >
                <source 
                  src="https://assets.cdn.filesafe.space/Zxwa5vR7uZAspoKrKMtY/media/688019a79a702ed17a0ba51f.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video CTA */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">93% of viewers</span> book a consultation after watching
              </p>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <button 
              onClick={() => {
                const bookingSection = document.getElementById('booking-section')
                if (bookingSection) {
                  bookingSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xl font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105 shadow-2xl animate-pulse"
            >
              YES! I Want To Fix My Loose Skin →
            </button>
            <p className="text-gray-500 text-sm mt-3">Limited spots available this week</p>
            <p className="text-xs text-gray-600 mt-2">Takes just 60 seconds to qualify</p>
          </div>
        </div>
      </section>

      {/* Problem/Agitation Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Does This Sound Like You?
          </h2>
          
          <div className="space-y-4">
            {[
              "You've lost amazing weight with Ozempic, Wegovy, or Mounjaro but now have loose, saggy skin",
              "You're self-conscious about your stomach even after all that weight loss",
              "You avoid certain clothes because they show your loose skin",
              "You're frustrated that after all your hard work, you still don't have the body you want",
              "Surgery seems too extreme, expensive, and risky"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4 bg-black/50 p-4 rounded-lg border border-red-500/20">
                <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl text-amber-400 font-bold mb-4">
              You're Not Alone - And There IS A Solution
            </p>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Over 2,847 people just like you have discovered the secret to finally achieving 
              the tight, toned body they deserve after weight loss - without surgery.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
            The ProMax Lipo Advantage
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Why thousands are choosing ProMax Lipo over surgery for their post-weight loss transformation
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎯",
                title: "No Surgery, No Scars",
                description: "Non-invasive treatment means no cutting, no scarring, and no recovery time"
              },
              {
                icon: "⚡",
                title: "See Results in 4 Weeks",
                description: "Visible skin tightening and body contouring in just 4-6 weeks"
              },
              {
                icon: "💰",
                title: "1/10th The Cost",
                description: "Fraction of the price of surgical alternatives with payment plans available"
              },
              {
                icon: "🔬",
                title: "Clinically Proven",
                description: "FDA-cleared technology with thousands of successful treatments"
              },
              {
                icon: "⏰",
                title: "Lunch Break Treatment",
                description: "45-minute sessions with zero downtime - return to work immediately"
              },
              {
                icon: "⭐",
                title: "5-Star Reviews Only",
                description: "59 verified Google reviews, all 5 stars - 100% client satisfaction"
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-amber-500/20 hover:border-amber-500/40 transition-all">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget sections hidden for deployment */}

      {/* Visual Results Gallery - Interactive Body Area Selector */}
      <section id="booking-section" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Your Transformation
            </h2>
            <p className="text-xl text-gray-400 mb-8">Professional skin tightening treatment</p>
            
            {!selectedArea ? (
              <div className="max-w-4xl mx-auto">
                <p className="text-amber-400 text-lg font-bold mb-2">OZEMPIC/MOUNJARO PATIENT SPECIAL: £149</p>
                <p className="text-gray-300 mb-8">Tighten 2 areas of loose skin in 1 hour - Save £301 (Usually £450)</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { id: 'stomach', label: 'Stomach', icon: '🎯', description: 'Flatten and tighten' },
                    { id: 'thighs', label: 'Thighs', icon: '🦵', description: 'Smooth and contour' },
                    { id: 'bum', label: 'Bum', icon: '🍑', description: 'Lift and shape' },
                    { id: 'arms', label: 'Arms', icon: '💪', description: 'Tone and sculpt' },
                    { id: 'bingo-wings', label: 'Bingo Wings', icon: '🦋', description: 'Eliminate loose skin' }
                  ].map((area) => (
                    <button
                      key={area.id}
                      onClick={() => {
                        setSelectedArea(area.id)
                        console.log(`User selected ${area.label} - high intent for ${area.id} treatment`)
                      }}
                      className="group bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-amber-500 hover:bg-gray-800 transition-all duration-300"
                    >
                      <div className="text-4xl mb-3">{area.icon}</div>
                      <h3 className="text-white font-bold mb-1">{area.label}</h3>
                      <p className="text-gray-500 text-sm">{area.description}</p>
                    </button>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mt-8">
                  Select an area to see real before & after results for your 2-area treatment
                </p>
              </div>
            ) : (
              <div className="animate-fadeIn max-w-4xl mx-auto">
                {/* Show selected area results */}
                {selectedArea === 'stomach' && (
                  <div>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/stomach.png" 
                        alt="Stomach transformation - complete before and after" 
                        className="w-full h-auto object-contain rounded-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Abdominal Transformation</h3>
                    <p className="text-gray-400 mb-6">Complete tummy tightening achieved in 4-6 weeks</p>
                  </div>
                )}
                
                {selectedArea === 'arms' && (
                  <div>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/arms.jpg" 
                        alt="Upper arms transformation" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Upper Arm Contouring</h3>
                    <p className="text-gray-400 mb-6">Dramatic tightening of loose upper arm skin</p>
                  </div>
                )}
                
                {selectedArea === 'bingo' && (
                  <div>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/bingo wings.jpg" 
                        alt="Under arms (bingo wings) transformation" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Under Arm Transformation</h3>
                    <p className="text-gray-400 mb-6">Say goodbye to bingo wings permanently</p>
                  </div>
                )}
                
                {selectedArea === 'legs' && (
                  <div>
                    <div className="bg-gray-900 rounded-2xl p-2 mb-6">
                      <img 
                        src="/images/Before and After/legs.jpg" 
                        alt="Legs and thighs transformation" 
                        className="w-full h-auto object-cover rounded-xl"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Leg & Thigh Contouring</h3>
                    <p className="text-gray-400 mb-6">Smooth, toned legs without surgery</p>
                  </div>
                )}
                
                <div className="flex gap-4 justify-center mt-8">
                  <button
                    onClick={() => {
                      setSelectedArea(null)
                      console.log('User viewing more areas - extended engagement')
                    }}
                    className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all"
                  >
                    ← View Other Areas
                  </button>
                  <button
                    onClick={() => {
                      console.log(`User ready to book after viewing ${selectedArea} - HOT LEAD`)
                      setBookingArea(selectedArea || '')
                      setShowBookingModal(true)
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/25 transform hover:scale-105 transition-all"
                  >
                    I Want This Result →
                  </button>
                </div>
                
                <p className="text-gray-500 text-sm italic mt-6">
                  *Individual results may vary. Photos show typical outcomes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials with 3D Glassmorphism */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
            Real Skulpt Clients. Real Results.
          </h2>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber-400 text-3xl drop-shadow-glow">⭐</span>
              ))}
            </div>
            <p className="text-gray-400 text-lg">5.0 average from 59 verified Google reviews</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {[
              {
                name: "Emma",
                timeAgo: "2 months ago",
                treatment: "ProMax Lipo Full Course",
                quote: "All I can say is Wow!! Even after my first ProMax Lipo session I could see a difference, I had a full course and I was so so pleased with the results. Skulpt is a lovely clinic with a great team!",
                rating: 5,
                verified: true
              },
              {
                name: "Melissa Baldwin",
                timeAgo: "5 months ago",
                treatment: "10 LipoMax Sessions",
                quote: "Just finished my 10 sessions and saw results after just 3! My problematic lower tummy following cesarean is now completely flat and skin tightened.",
                rating: 5,
                verified: true
              },
              {
                name: "Adila Robinson",
                timeAgo: "3 months ago",
                treatment: "ProMax Non-Invasive Lipo",
                quote: "I can honestly say what a difference it has made. Lost inches and noticeably tightened skin. If you're on the fence, just do it!",
                rating: 5,
                verified: true
              },
              {
                name: "Melanie Giddings",
                timeAgo: "7 months ago",
                treatment: "Weight Loss Journey",
                quote: "Had put on 4 stone due to health issues. The team has been amazing helping with my journey. Feel like myself again!",
                rating: 5,
                verified: true
              },
              {
                name: "Jessica Jones",
                timeAgo: "7 months ago",
                treatment: "Ongoing Treatment",
                quote: "Skulpt has been massive in helping me look and feel better. Michelle and Magda are so supportive. Results speak for themselves!",
                rating: 5,
                verified: true
              },
              {
                name: "Sarah M.",
                timeAgo: "1 month ago",
                treatment: "Tummy Reset Program",
                quote: "After losing weight with Ozempic, ProMax Lipo gave me the flat stomach I'd dreamed of. Finally confident in a bikini!",
                rating: 5,
                verified: true
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card relative transform-gpu transition-all duration-500 hover:scale-105"
                style={{
                  animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Glassmorphism card */}
                <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:rotate-y-5">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/0 to-amber-500/0 hover:from-amber-500/10 hover:to-transparent transition-all duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-bold text-white text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-300">{testimonial.timeAgo}</p>
                        <p className="text-sm text-amber-400 font-medium mt-1">{testimonial.treatment}</p>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="text-amber-400 drop-shadow-glow">⭐</span>
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-gray-200 leading-relaxed text-sm italic">
                      "{testimonial.quote}"
                    </p>
                    
                    {testimonial.verified && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <p className="text-xs text-amber-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Verified Google Review
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotateX(0deg) rotateY(0deg);
            }
            33% {
              transform: translateY(-10px) rotateX(2deg) rotateY(-2deg);
            }
            66% {
              transform: translateY(-5px) rotateX(-1deg) rotateY(1deg);
            }
          }

          .perspective-1000 {
            perspective: 1000px;
          }

          .testimonial-card:hover {
            transform: translateZ(20px) rotateY(5deg);
          }

          .hover\\:rotate-y-5:hover {
            transform: rotateY(5deg);
          }

          .drop-shadow-glow {
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.5));
          }
        `}</style>
      </section>

      {/* Scientific Backing */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-500/10 to-transparent p-8 rounded-2xl border border-amber-500/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              The Science Behind Your Transformation
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">89%</div>
                <p className="text-gray-400">Report firmer, tighter skin after treatment</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">3-5"</div>
                <p className="text-gray-400">Average inch reduction from treatment area</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-amber-400 mb-2">94%</div>
                <p className="text-gray-400">Would recommend to friends & family</p>
              </div>
            </div>

            <p className="text-center text-gray-300 mt-8">
              ProMax Lipo uses revolutionary ultrasound cavitation, radio frequency, and vacuum therapy 
              to tighten skin, reduce fat deposits, and contour your body - all without surgery.
            </p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8 text-center border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <p className="mb-4">© 2024 Skulpt Body Contouring. All rights reserved.</p>
          <p className="text-sm">
            This site is not a part of the Facebook website or Facebook Inc. Additionally, 
            this site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
          </p>
          <p className="text-xs mt-4">
            Medical Disclaimer: Results vary. Consult your doctor before any treatment.
          </p>
        </div>
      </footer>
    </div>

    {/* Beautiful Booking Modal */}
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
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Book Your 2 Area Transformation - £149
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
              <p className="text-amber-400 text-sm font-semibold mb-2">Limited Availability</p>
              <p className="text-white text-lg">Book Your FREE Consultation</p>
              <p className="text-gray-400 text-xs mt-1">Worth £450 • Special Price £149 • Only 3 Spots Left Today</p>
            </div>
            
            {/* Beautiful GHL Calendar - Mobile Optimized */}
            <div className="relative w-full">
              {/* Loading State */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50 animate-pulse rounded-xl pointer-events-none" 
                   style={{ display: 'block' }}
                   id="calendar-loader-tummy">
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
                  id="BkV9yMGSHFDGj6RV4cAI_tummy"
                  onLoad={() => {
                    const loader = document.getElementById('calendar-loader-tummy')
                    if (loader) loader.style.display = 'none'
                  }}
                />
              </div>
            </div>
            
            <p className="text-gray-500 text-xs mt-4">
              No obligation • Results guaranteed • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    )}
    </>
  )
}