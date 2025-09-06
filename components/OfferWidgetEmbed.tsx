'use client'

import { useState, useEffect } from 'react'

export default function OfferWidgetEmbed() {
  const [config, setConfig] = useState<any>(null)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })
  const [spotsLeft, setSpotsLeft] = useState(5)

  // Load configuration
  useEffect(() => {
    const loadConfig = () => {
      const savedConfig = localStorage.getItem('widgetConfig')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        setConfig(parsed)
        
        // Set initial timer values
        if (parsed.urgency) {
          setTimeLeft({
            hours: parsed.urgency.timerHours || 23,
            minutes: parsed.urgency.timerMinutes || 59,
            seconds: 59
          })
          setSpotsLeft(parsed.urgency.spots || 5)
        }
      } else {
        // Default Skulpt offer
        setConfig({
          dreamOutcome: "Finally love your body after weight loss - tight, toned skin that matches your hard work",
          valueStack: [
            {
              item: "ProMax Lipo Skin Tightening (6 sessions)",
              value: "£2400",
              description: "Medical-grade technology that actually works"
            },
            {
              item: "Custom Body Transformation Plan",
              value: "£497",
              description: "Targets YOUR specific problem areas"
            },
            {
              item: "3D Body Scanning & Progress Tracking",
              value: "£297",
              description: "SEE your transformation happening"
            },
            {
              item: "Nutrition & Collagen Building Program",
              value: "£197",
              description: "Enhance and maintain your results"
            },
            {
              item: "VIP Concierge Support (6 months)",
              value: "£397",
              description: "We're with you every step"
            }
          ],
          pricing: {
            totalValue: 3788,
            offerPrice: 697,
            hasPaymentPlan: true,
            paymentPlanPrice: 265
          },
          guarantee: {
            type: 'refund',
            text: "See visible skin tightening in 30 days or 100% money back - zero risk to you"
          },
          urgency: {
            spots: 5,
            timerHours: 23,
            timerMinutes: 59
          }
        })
      }
    }
    
    loadConfig()
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!config) {
    return <div className="p-8 text-center">Loading offer...</div>
  }

  const totalValue = config.pricing?.totalValue || config.valueStack?.reduce((sum: number, item: any) => {
    const value = parseInt(item.value.replace(/[^0-9]/g, ''))
    return sum + value
  }, 0) || 3788

  return (
    <div className="bg-white text-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-200">
      {/* Urgency Timer */}
      <div className="bg-red-50 border-2 border-red-500 text-red-700 rounded-lg p-3 mb-6 text-center">
        <p className="text-sm mb-1 font-semibold">⏰ LIMITED TIME OFFER EXPIRES IN:</p>
        <div className="flex justify-center gap-3 text-2xl font-bold">
          <div className="bg-white border border-red-500 rounded px-3 py-1 text-red-600">
            {String(timeLeft.hours).padStart(2, '0')}h
          </div>
          <div className="bg-white border border-red-500 rounded px-3 py-1 text-red-600">
            {String(timeLeft.minutes).padStart(2, '0')}m
          </div>
          <div className="bg-white border border-red-500 rounded px-3 py-1 text-red-600">
            {String(timeLeft.seconds).padStart(2, '0')}s
          </div>
        </div>
        <p className="text-xs mt-2 text-red-600 font-medium">
          Only {spotsLeft} spots remaining - {spotsLeft <= 2 ? 'Almost gone!' : 'Going fast!'}
        </p>
      </div>

      {/* Dream Outcome */}
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        {config.dreamOutcome}
      </h2>

      {/* Value Stack */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Here's Everything You Get:</h3>
        <div className="space-y-3">
          {config.valueStack?.map((item: any, idx: number) => (
            <div key={idx} className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">✅ {item.item}</p>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{item.value}</p>
                <p className="text-xs text-gray-500">value</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total Value */}
        <div className="border-t border-gray-300 mt-4 pt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg text-gray-700">Total Value:</p>
            <p className="text-2xl font-bold text-gray-900">£{totalValue}</p>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-6 text-center">
        <p className="text-sm mb-2 text-green-700 font-semibold">TODAY ONLY - SPECIAL PRICE:</p>
        <div className="flex items-center justify-center gap-4">
          <p className="text-3xl line-through text-gray-500">£{totalValue}</p>
          <p className="text-5xl font-bold text-green-600">£{config.pricing?.offerPrice || 697}</p>
        </div>
        {config.pricing?.hasPaymentPlan && (
          <p className="mt-3 text-sm text-gray-700">
            Or just 3 payments of £{config.pricing.paymentPlanPrice || 265}
          </p>
        )}
        <p className="mt-2 text-xs text-green-600">
          You save £{totalValue - (config.pricing?.offerPrice || 697)} (
          {Math.round(((totalValue - (config.pricing?.offerPrice || 697)) / totalValue) * 100)}% OFF)
        </p>
      </div>

      {/* Guarantee */}
      <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-4 mb-6">
        <p className="text-center font-semibold text-blue-700">
          🛡️ {config.guarantee?.text || "100% Money-Back Guarantee"}
        </p>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-5 rounded-xl text-xl font-bold hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all shadow-lg">
        YES! CLAIM MY SPOT NOW →
      </button>

      {/* Trust Elements */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>🔒 Secure Checkout • 💳 All Cards Accepted</p>
        <p className="mt-2">⭐⭐⭐⭐⭐ Rated 4.9/5 by 2,847 UK Clients</p>
      </div>
    </div>
  )
}