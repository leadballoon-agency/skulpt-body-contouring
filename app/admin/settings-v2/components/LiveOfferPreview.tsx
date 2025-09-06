'use client'

import React from 'react'

interface Props {
  config: {
    dreamOutcome: string
    valueStack: Array<{
      item: string
      value: string
      description: string
    }>
    pricing: {
      totalValue: number | string
      offerPrice: number | string
      hasPaymentPlan: boolean
      paymentPlanPrice?: number | string
    }
    guarantee: {
      type: string
      text: string
    }
    urgency: {
      spots: number
      timerHours: number
      timerMinutes: number
    }
  }
}

export default function LiveOfferPreview({ config }: Props) {
  const getCurrencySymbol = (value: string | number) => {
    const str = String(value)
    return str.includes('$') ? '$' : '£'
  }

  const getNumericValue = (value: string | number) => {
    return String(value).replace(/[£$,]/g, '')
  }

  const formatPrice = (value: string | number) => {
    const symbol = getCurrencySymbol(value)
    const numeric = getNumericValue(value)
    return `${symbol}${numeric}`
  }

  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">
          {config.dreamOutcome || "Your Transformation Awaits"}
        </h2>
        {config.urgency.spots > 0 && (
          <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
            <span className="animate-pulse">🔥</span>
            <span className="font-semibold">Only {config.urgency.spots} Spots Left!</span>
          </div>
        )}
      </div>

      {/* Value Stack */}
      {config.valueStack.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Here's Everything You Get:</h3>
          <div className="space-y-3">
            {config.valueStack.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start bg-white/10 rounded-lg p-4">
                <div className="flex-1">
                  <div className="font-semibold">{item.item}</div>
                  <div className="text-sm text-white/80">{item.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through text-white/60">
                    {formatPrice(item.value)}
                  </div>
                  <div className="text-green-300 font-semibold">Included</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pricing */}
      {config.pricing.offerPrice && (
        <div className="bg-white text-gray-900 rounded-xl p-6 mb-6">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-600 mb-2">
              Total Value: <span className="line-through">{formatPrice(config.pricing.totalValue)}</span>
            </div>
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {formatPrice(config.pricing.offerPrice)}
            </div>
            {config.pricing.hasPaymentPlan && config.pricing.paymentPlanPrice && (
              <div className="text-sm text-gray-600">
                or 3 payments of {formatPrice(config.pricing.paymentPlanPrice)}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Guarantee */}
      {config.guarantee.text && (
        <div className="bg-green-500/20 border-2 border-green-400 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold mb-1">
                {config.guarantee.type === 'refund' && '100% Money-Back Guarantee'}
                {config.guarantee.type === 'double' && 'Double Your Money Back'}
                {config.guarantee.type === 'pay-after' && 'Pay Only After Results'}
              </div>
              <div className="text-sm text-white/90">{config.guarantee.text}</div>
            </div>
          </div>
        </div>
      )}

      {/* Countdown Timer */}
      {(config.urgency.timerHours > 0 || config.urgency.timerMinutes > 0) && (
        <div className="bg-red-500/20 border-2 border-red-400 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-sm font-semibold mb-2">Offer Expires In:</div>
            <div className="text-3xl font-bold">
              {String(config.urgency.timerHours).padStart(2, '0')}:
              {String(config.urgency.timerMinutes).padStart(2, '0')}:00
            </div>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white text-xl font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all">
        Claim Your Spot Now →
      </button>
    </div>
  )
}