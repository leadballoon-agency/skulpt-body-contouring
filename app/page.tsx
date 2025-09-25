'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function HomePage() {
  const [selectedArea, setSelectedArea] = useState<string | null>('stomach')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [medicationIndex, setMedicationIndex] = useState(0)
  const medications = ['Ozempic', 'Wegovy', 'Mounjaro']

  // Animate medication names
  useEffect(() => {
    const interval = setInterval(() => {
      setMedicationIndex((prev) => (prev + 1) % medications.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [medications.length])

  // Verify Facebook Pixel is loaded
  useEffect(() => {
    // Check if Facebook Pixel is loaded
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        if ((window as any).fbq) {
          console.log('Facebook Pixel is loaded and ready')
          // Track a test event to verify it's working
          ;(window as any).fbq('track', 'PageView')
        } else {
          console.warn('Facebook Pixel not loaded yet')
        }
      }, 2000)
    }
  }, [])

  // Scroll to top on page load and reset
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)
    
    // Also handle browser navigation (back/forward buttons)
    const handleScrollReset = () => {
      window.scrollTo(0, 0)
    }
    
    // Force scroll to top after page fully loads
    if (document.readyState === 'complete') {
      window.scrollTo(0, 0)
    } else {
      window.addEventListener('load', handleScrollReset)
    }
    
    // Handle browser navigation events
    window.addEventListener('popstate', handleScrollReset)
    
    return () => {
      window.removeEventListener('load', handleScrollReset)
      window.removeEventListener('popstate', handleScrollReset)
    }
  }, [])

  // Load GHL form embed script when booking modal is shown
  useEffect(() => {
    if (showBookingModal) {
      const script = document.createElement('script')
      script.src = 'https://link.skintight.uk/js/form_embed.js'
      script.type = 'text/javascript'
      script.async = true
      document.body.appendChild(script)

      return () => {
        // Cleanup script when modal closes
        if (document.body.contains(script)) {
          document.body.removeChild(script)
        }
      }
    }
  }, [showBookingModal])

  return (
    <>
      <Navbar />
      
      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-screen bg-black text-white flex items-center">
        {/* Gradient background with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
        
        {/* Animated accent circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-96 h-96 bg-[#967e15]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 -right-20 w-96 h-96 bg-[#967e15]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
          {/* Urgent Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#967e15]/20 border border-[#967e15] rounded-full mb-8">
            <span className="w-2 h-2 bg-[#967e15] rounded-full animate-pulse"></span>
            <span className="text-[#967e15] text-sm font-semibold">Limited Time: £50 Consultation & Treatment</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8">
            Lost Weight with
            <span className="block text-[#967e15] mt-2 relative h-[1.2em] overflow-hidden">
              <style jsx>{`
                @keyframes shimmer {
                  0% { background-position: -200% center; }
                  100% { background-position: 200% center; }
                }
                .shimmer-text {
                  background: linear-gradient(
                    90deg,
                    #967e15 40%,
                    #d4af37 50%,
                    #967e15 60%
                  );
                  background-size: 200% auto;
                  -webkit-background-clip: text;
                  background-clip: text;
                  -webkit-text-fill-color: transparent;
                  animation: shimmer 3s ease-in-out infinite;
                }
              `}</style>
              {medications.map((med, index) => (
                <span
                  key={med}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === medicationIndex 
                      ? 'opacity-100 transform translate-y-0 scale-100' 
                      : index < medicationIndex 
                        ? 'opacity-0 transform -translate-y-full scale-95'
                        : 'opacity-0 transform translate-y-full scale-95'
                  }`}
                >
                  <span className={index === medicationIndex ? 'shimmer-text' : ''}>
                    {med}?
                  </span>
                </span>
              ))}
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl mt-4 text-white">Fix Your Loose Skin</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
            Professional skin tightening treatment. No surgery. No downtime. 
            Professional consultation and treatment from just £50.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => {
                // Track Facebook Pixel conversion event
                if (typeof window !== 'undefined' && (window as any).fbq) {
                  (window as any).fbq('track', 'InitiateCheckout', {
                    value: 50.00,
                    currency: 'GBP',
                    content_name: 'Tummy Reset Treatment',
                    content_category: 'Body Contouring'
                  });
                }
                setShowBookingModal(true)
              }}
              className="px-10 py-5 bg-[#967e15] text-black text-lg font-bold rounded-lg hover:bg-[#b59518] transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              Book Your £50 Consultation →
            </button>
            <a 
              href="#results"
              className="px-10 py-5 border-2 border-[#967e15] text-[#967e15] text-lg font-semibold rounded-lg hover:bg-[#967e15]/10 transition-all text-center"
            >
              See Real Results
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex gap-6 mt-8 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>No Surgery</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>59 ⭐⭐⭐⭐⭐ Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-[#967e15]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Real Before & After Results</h2>
          <p className="text-center text-gray-600 mb-8">
            See actual transformations: stomach, arms, thighs and bottom
          </p>
          
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <video 
              className="w-full"
              controls
              controlsList="nodownload"
              poster="/images/thumbnail.png"
              preload="metadata"
            >
              <source 
                src="https://storage.googleapis.com/msgsndr/dVD6QbgqAF7fiHM3MCrz/media/68ccf6fc30c733533492d2e6.mp4" 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* IMPORTANT: Start During Your Journey Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-orange-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full opacity-20 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-full mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">DON'T WAIT - START NOW</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              The Biggest Mistake People Make?<br/>
              <span className="text-red-600">Waiting Until They've Lost All The Weight</span>
            </h2>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Your skin needs help <strong>during</strong> your weight loss journey, not after.
              Starting treatments while losing weight means your skin can adapt gradually,
              preventing severe sagging and excess skin.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="font-bold text-lg mb-2">Week 4-8 of Ozempic?</h3>
              <p className="text-gray-600">Perfect time to start! Your skin is beginning to lose elasticity. Early intervention = better results.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
              <div className="text-3xl mb-3">📉</div>
              <h3 className="font-bold text-lg mb-2">Lost 1-2 Stone Already?</h3>
              <p className="text-gray-600">Don't wait! Start tightening now while your skin still has some natural bounce-back ability.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-bold text-lg mb-2">Monthly Maintenance</h3>
              <p className="text-gray-600">Regular treatments during weight loss = tight skin when you reach your goal weight.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">The Smart Approach: Concurrent Treatment</h3>
                <p className="text-gray-700 mb-4">
                  Studies show that skin tightening treatments during weight loss are
                  <strong> 3x more effective</strong> than waiting until after. Your skin's collagen
                  production is still active, making it more responsive to treatment.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Prevents severe skin sagging
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Maintains skin elasticity throughout journey
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Achieve tight, toned results at goal weight
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Avoid costly surgery later
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-6 border-t">
              <p className="text-sm text-gray-500 mb-4">
                Most clients wish they'd started sooner. Don't make the same mistake.
              </p>
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:from-red-700 hover:to-orange-700 transform hover:scale-105 transition-all shadow-lg"
              >
                Start Your Treatments Today - £50 Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Areas Section */}
      <section id="results" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Problem Area
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Select the area you'd like to focus on during your consultation.
          </p>

          {/* Area Selection Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { id: 'stomach', label: 'Stomach', icon: '🎯', description: 'Flatten & tighten loose belly skin' },
              { id: 'arms', label: 'Arms', icon: '💪', description: 'Tone and tighten upper arms' },
              { id: 'bingo-wings', label: 'Bingo Wings', icon: '🦋', description: 'Eliminate underarm sagging' },
              { id: 'thighs', label: 'Thighs', icon: '🦵', description: 'Smooth and firm thigh skin' },
              { id: 'bum', label: 'Bum', icon: '🍑', description: 'Lift and tighten buttocks' },
              { id: 'back', label: 'Back', icon: '🎒', description: 'Reduce back rolls and bra bulge' }
            ].map((area) => (
              <button
                key={area.id}
                onClick={() => {
                  // Track area selection engagement
                  if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'ViewContent', {
                      content_name: `Selected Area: ${area.label}`,
                      content_category: 'Body Area Selection'
                    });
                  }
                  setSelectedArea(area.id)
                }}
                className={`p-6 rounded-lg border-2 transition-all ${
                  selectedArea === area.id 
                    ? 'border-[#967e15] bg-[#967e15]/10' 
                    : 'border-gray-200 bg-white hover:border-[#967e15]/50'
                }`}
              >
                <div className="text-3xl mb-2">{area.icon}</div>
                <h3 className="font-bold text-lg mb-1">{area.label}</h3>
                <p className="text-sm text-gray-600">{area.description}</p>
              </button>
            ))}
          </div>

          {/* Selected Area Results */}
          {selectedArea && (
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                {selectedArea.charAt(0).toUpperCase() + selectedArea.slice(1).replace('-', ' ')} Transformation
              </h3>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <img 
                  src={`/images/Before and After/${
                    selectedArea === 'bingo-wings' ? 'bingo wings' : 
                    selectedArea === 'thighs' ? 'legs' : 
                    selectedArea
                  }.${selectedArea === 'arms' || selectedArea === 'bingo-wings' || selectedArea === 'thighs' || selectedArea === 'bum' ? 'jpg' : 'png'}`}
                  alt={`${selectedArea} before and after`}
                  className="w-full rounded"
                  onError={(e) => {
                    console.error(`Failed to load image for ${selectedArea}`)
                    e.currentTarget.src = '/images/placeholder.jpg'
                  }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedArea(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
                >
                  ← View Other Areas
                </button>
                <button
                  onClick={() => {
                    // Track Facebook Pixel conversion event
                    if (typeof window !== 'undefined' && (window as any).fbq) {
                      (window as any).fbq('track', 'InitiateCheckout', {
                        value: 50.00,
                        currency: 'GBP',
                        content_name: 'Tummy Reset Treatment - ' + selectedArea,
                        content_category: 'Body Contouring'
                      });
                    }
                    setShowBookingModal(true)
                  }}
                  className="flex-1 px-6 py-3 bg-[#967e15] text-black font-bold rounded hover:bg-[#b59518] transition-colors"
                >
                  Book This Treatment →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Post-Pregnancy Recovery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            More Than Just Weight Loss
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Pregnancy, weight loss, or natural aging - we treat all causes of loose skin with the same professional expertise
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Post-pregnancy specific content */}
            <div>
              <h3 className="text-2xl font-bold mb-4">Post-Pregnancy Recovery</h3>
              <p className="text-gray-700 mb-6">
                Your body did something incredible. Now let us help restore your confidence
                with treatments specifically designed for post-pregnancy skin concerns.
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Safe to start 3 months postpartum</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Addresses both loose skin and stretch marks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>C-section scar and overhang treatment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Can help with diastasis recti appearance</span>
                </li>
              </ul>

              {/* Use existing testimonial as proof */}
              <div className="bg-white p-4 rounded-lg border-l-4 border-[#967e15]">
                <p className="text-sm italic text-gray-600 mb-2">
                  "My problematic lower tummy following cesarean is now completely flat
                  and skin tightened after just 3 sessions."
                </p>
                <p className="text-sm font-semibold">- Melissa B. ⭐⭐⭐⭐⭐</p>
              </div>
            </div>

            {/* Right: Professional statistics */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h4 className="font-bold text-lg mb-4">Common Post-Pregnancy Concerns We Treat:</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span>Loose abdominal skin</span>
                  <span className="text-[#967e15] font-bold">98% improvement</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span>C-section overhang</span>
                  <span className="text-[#967e15] font-bold">95% reduction</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span>Stretch mark appearance</span>
                  <span className="text-[#967e15] font-bold">70% improvement</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Overall tummy tightening</span>
                  <span className="text-[#967e15] font-bold">100% see results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Skulpt?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold text-xl mb-2">Instant Results</h3>
              <p className="text-gray-600">See visible skin tightening immediately after your first session</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏥</div>
              <h3 className="font-bold text-xl mb-2">Medical Grade</h3>
              <p className="text-gray-600">Advanced technology used by medical professionals worldwide</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-bold text-xl mb-2">Amazing Value</h3>
              <p className="text-gray-600">Just £50 for consultation and treatment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Real Results from Real Clients</h2>
          <div className="flex justify-center items-center gap-1 mb-8">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#967e15] text-2xl">⭐</span>
            ))}
            <span className="ml-2 text-gray-600">5.0 from 59 Google Reviews</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Emma",
                quote: "Even after my first session I could see a difference. My loose skin from Ozempic weight loss is completely gone!",
                rating: 5
              },
              {
                name: "Melissa B.",
                quote: "My problematic lower tummy following cesarean is now completely flat and skin tightened after just 3 sessions.",
                rating: 5
              },
              {
                name: "Sarah M.",
                quote: "After losing weight with Ozempic, Skulpt's treatment gave me the flat stomach I'd dreamed of. Finally confident!",
                rating: 5
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-[#967e15]">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-3">"{review.quote}"</p>
                <p className="font-semibold">- {review.name}</p>
                <p className="text-sm text-gray-500">Verified Google Review</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Ready to Love Your Body Again?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Limited time offer: £50 consultation & treatment
          </p>
          <button 
            onClick={() => {
              // Track Facebook Pixel conversion event
              if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout', {
                  value: 50.00,
                  currency: 'GBP',
                  content_name: 'Tummy Reset Treatment - CTA',
                  content_category: 'Body Contouring'
                });
              }
              setShowBookingModal(true)
            }}
            className="px-12 py-5 bg-[#967e15] text-black font-bold text-lg rounded hover:bg-[#b59518] transition-colors"
          >
            Book Your Treatment Now →
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Limited time offer - £50 for consultation and treatment
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p>© 2024 Skulpt Body Contouring. All rights reserved.</p>
        <p className="text-sm mt-2">Peterborough's Premier Skin Tightening Clinic</p>
      </footer>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowBookingModal(false)}
          ></div>
          
          <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Book Your £50 Consultation & Treatment</h2>
              <p className="text-gray-600 mb-6">Includes both consultation and your first treatment session:</p>
              
              {/* GHL Calendar */}
              <div className="relative bg-gray-50 rounded-lg p-2">
                <iframe 
                  src="https://link.skintight.uk/widget/booking/BkV9yMGSHFDGj6RV4cAI" 
                  style={{ width: '100%', height: '600px', border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  id="BkV9yMGSHFDGj6RV4cAI_1757157986836"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}