'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function RecoveryDetoxPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const packages = [
    {
      id: 'essential',
      name: 'Essential Recovery',
      duration: '30 Days',
      price: '£197',
      originalPrice: '£297',
      features: [
        'Probiotic restoration protocol',
        'Digestive enzyme support',
        'Basic meal planning guide',
        'Weekly check-in calls',
        'Access to support community'
      ],
      popular: false
    },
    {
      id: 'complete',
      name: 'Complete Restoration',
      duration: '60 Days',
      price: '£347',
      originalPrice: '£497',
      features: [
        'Advanced probiotic & prebiotic protocol',
        'Full digestive enzyme complex',
        'Personalized meal plans',
        'Liver detox support',
        'Metabolic reset supplements',
        'Bi-weekly 1-on-1 consultations',
        'Private WhatsApp support',
        'Blood work interpretation'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Transformation',
      duration: '90 Days',
      price: '£597',
      originalPrice: '£897',
      features: [
        'Everything in Complete Restoration',
        'IV vitamin therapy sessions (3x)',
        'Collagen & skin repair protocol',
        'Hormone balancing support',
        'Cellular detox program',
        'Weekly 1-on-1 consultations',
        'Direct access to nutritionist',
        'Lifetime maintenance plan'
      ],
      popular: false
    }
  ]

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 -right-20 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-block bg-green-500/10 border border-green-500/30 text-green-400 px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            🌿 NEW: Post-Weight Loss Recovery Program
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-amber-400">Ozempic Recovery</span>
            <br />
            <span className="text-3xl md:text-5xl">Restore Your Body's Natural Balance</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            GLP-1 medications changed your weight. Now restore what they depleted. 
            Our medical-grade recovery program rebuilds your gut health, hormones, and metabolism.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-105 transition-all"
            >
              Start Your Recovery →
            </button>
            <button 
              onClick={() => document.getElementById('science')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-700 transition-all"
            >
              Learn The Science
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Medical-Grade Supplements
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> Nutritionist Designed
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span> 500+ Success Stories
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white" id="science">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Ozempic & Mounjaro Don't Tell You
            </h2>
            <p className="text-xl text-gray-600">
              The hidden side effects that need addressing after rapid weight loss
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-3xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-900 mb-3">What Gets Depleted</h3>
              <ul className="space-y-2 text-red-800">
                <li>• Beneficial gut bacteria destroyed</li>
                <li>• B12 & essential vitamins drained</li>
                <li>• Digestive enzymes compromised</li>
                <li>• Muscle mass significantly reduced</li>
                <li>• Hormone production disrupted</li>
                <li>• Metabolic rate slowed down</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-green-900 mb-3">What We Restore</h3>
              <ul className="space-y-2 text-green-800">
                <li>• Rebuild healthy gut microbiome</li>
                <li>• Replenish vitamin & mineral stores</li>
                <li>• Restore digestive function</li>
                <li>• Preserve & build lean muscle</li>
                <li>• Balance hormones naturally</li>
                <li>• Boost metabolic efficiency</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <p className="text-lg text-gray-700 font-medium">
              "After 6 months on Ozempic, I lost 3 stone but felt exhausted and my digestion was ruined. 
              This recovery program gave me my energy back and fixed issues I didn't even know were related!"
            </p>
            <p className="text-gray-600 mt-4">— Sarah M., Completed 60-Day Program</p>
          </div>
        </div>
      </section>

      {/* The Science Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Science-Backed Recovery Protocol
            </h2>
            <p className="text-xl text-gray-600">
              Developed with leading nutritionists and functional medicine doctors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Gut Restoration</h3>
              <p className="text-gray-600">
                Medical-grade probiotics with 50+ billion CFUs, targeted prebiotics, 
                and digestive enzymes to rebuild your microbiome from the ground up.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Metabolic Reset</h3>
              <p className="text-gray-600">
                Strategic supplementation with B-complex, magnesium, vitamin D3, 
                omega-3s, and adaptogens to restore cellular energy production.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Hormone Balance</h3>
              <p className="text-gray-600">
                Natural hormone support through targeted nutrition, stress management, 
                and supplements that help regulate cortisol, thyroid, and sex hormones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Your Recovery Timeline
            </h2>
            <p className="text-xl text-gray-400">
              What to expect on your journey back to optimal health
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center font-bold">
                Week 1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Immediate Relief</h3>
                <p className="text-gray-400">
                  Digestive symptoms begin improving. Energy starts returning. 
                  Bloating and discomfort reduce noticeably.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center font-bold">
                Week 2-4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Restoration Begins</h3>
                <p className="text-gray-400">
                  Gut health improving daily. Sleep quality enhanced. 
                  Mental clarity and mood stabilizing. Cravings under control.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center font-bold">
                Day 30-60
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Transformation</h3>
                <p className="text-gray-400">
                  Metabolism optimized. Hormones balanced. Sustained energy all day. 
                  Skin, hair, and nails visibly healthier.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center font-bold">
                Day 60+
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Long-term Health</h3>
                <p className="text-gray-400">
                  Full system reset complete. Weight maintained naturally. 
                  Vibrant health without medication dependence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-white" id="packages">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Recovery Program
            </h2>
            <p className="text-xl text-gray-600">
              Medical-grade supplements included in every package
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative rounded-2xl p-8 ${
                  pkg.popular 
                    ? 'bg-gradient-to-br from-green-50 to-amber-50 border-2 border-green-500 transform scale-105' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-4">{pkg.duration}</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-xl text-gray-500 line-through">{pkg.originalPrice}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedPackage(pkg.id)
                    setShowBookingModal(true)
                  }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">100% Money-Back Guarantee</span> • 
              Cancel anytime • Free shipping on all supplements
            </p>
            <p className="text-sm text-gray-500">
              *Results vary by individual. Supplements are not intended to diagnose, treat, or cure any disease.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-2">When should I start this program?</h3>
              <p className="text-gray-600">
                Ideally, start within 2-4 weeks of stopping GLP-1 medications. However, 
                the program benefits anyone who has used these medications in the past year.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-2">Can I do this while still on Ozempic/Mounjaro?</h3>
              <p className="text-gray-600">
                Yes! Many clients use our program alongside their medication to minimize 
                side effects and maintain better overall health during treatment.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-2">What's included in the supplement package?</h3>
              <p className="text-gray-600">
                Medical-grade probiotics, digestive enzymes, vitamin complexes, omega-3s, 
                and targeted supplements based on your specific program. All third-party tested.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-2">How is this different from regular vitamins?</h3>
              <p className="text-gray-600">
                This is a complete restoration protocol specifically designed to address 
                GLP-1 medication depletion, not generic supplementation. Every element targets 
                specific deficiencies caused by rapid weight loss.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6">
              <h3 className="font-bold mb-2">Will I regain weight on this program?</h3>
              <p className="text-gray-600">
                No - the program is designed to optimize your metabolism and hormones to 
                maintain your weight loss naturally while restoring your health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Your Recovery Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500+ people who've successfully restored their health after GLP-1 weight loss
          </p>
          <button 
            onClick={() => setShowBookingModal(true)}
            className="px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all text-lg"
          >
            Begin Your Recovery Journey →
          </button>
          <p className="mt-6 text-sm opacity-75">
            Free consultation included • Start feeling better in days
          </p>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Complete Your Recovery Package Order</h3>
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              {selectedPackage && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold">Selected Package:</p>
                  <p className="text-lg">
                    {packages.find(p => p.id === selectedPackage)?.name} - 
                    {packages.find(p => p.id === selectedPackage)?.price}
                  </p>
                </div>
              )}

              <iframe 
                src="https://link.skintight.uk/widget/booking/BkV9yMGSHFDGj6RV4cAI" 
                style={{ 
                  width: '100%', 
                  minHeight: '500px',
                  border: 'none',
                  borderRadius: '0.5rem'
                }} 
                scrolling="no" 
                id="recovery_booking"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}