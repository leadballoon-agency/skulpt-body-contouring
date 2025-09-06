'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function PricingStep({ config, updateConfig }: Props) {
  const totalValue = (config.valueStack || []).reduce((sum: number, item: any) => {
    return sum + (parseFloat(item.value) || 0)
  }, 0)

  const updatePricing = (field: string, value: any) => {
    updateConfig({
      pricing: { ...config.pricing, [field]: value }
    })
  }

  const discount = totalValue > 0 
    ? Math.round((1 - (config.pricing?.offerPrice || 0) / totalValue) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Set Your Price
        </h3>
        <p className="text-gray-600">
          Price at 10-20% of total value for maximum perceived value. The bigger the gap, the better the offer.
        </p>
      </div>

      {/* Value Reminder */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Value Stack:</span>
          <span className="text-xl font-bold text-gray-900">${totalValue.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-500">
          {config.valueStack?.length || 0} components included
        </div>
      </div>

      {/* Main Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Offer Price
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
          <input
            type="number"
            value={config.pricing?.offerPrice || ''}
            onChange={(e) => updatePricing('offerPrice', parseFloat(e.target.value) || 0)}
            placeholder="997"
            className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-white border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/20"
          />
        </div>
        {discount > 0 && (
          <p className="text-sm text-green-600 mt-2">
            {discount}% discount from total value
          </p>
        )}
      </div>

      {/* Payment Plan Option */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">
            Offer Payment Plan?
          </label>
          <button
            onClick={() => updatePricing('hasPaymentPlan', !config.pricing?.hasPaymentPlan)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              config.pricing?.hasPaymentPlan ? 'bg-primary-500' : 'bg-gray-300'
            }`}
          >
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              config.pricing?.hasPaymentPlan ? 'translate-x-6' : ''
            }`} />
          </button>
        </div>
        
        {config.pricing?.hasPaymentPlan && (
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Monthly Payment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-500">$</span>
              <input
                type="number"
                value={config.pricing?.paymentPlanPrice || ''}
                onChange={(e) => updatePricing('paymentPlanPrice', parseFloat(e.target.value) || 0)}
                placeholder="197"
                className="w-full pl-10 pr-4 py-3 text-lg font-semibold bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              x {Math.ceil((config.pricing?.offerPrice || 0) / (config.pricing?.paymentPlanPrice || 1))} payments
            </p>
          </div>
        )}
      </div>

      {/* Pricing Psychology Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          💰 Pricing Psychology Tips
        </p>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-700">End in 7 or 97</p>
              <p className="text-xs text-gray-500">$497, $997, $1997 convert better than round numbers</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-700">10-20% Rule</p>
              <p className="text-xs text-gray-500">Price at 10-20% of total value for best conversion</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Payment Plans</p>
              <p className="text-xs text-gray-500">Add 20-30% to total for payment plan friction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Price Suggestions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { price: Math.round(totalValue * 0.1 / 100) * 100 - 3, label: "Aggressive (10%)" },
          { price: Math.round(totalValue * 0.15 / 100) * 100 - 3, label: "Balanced (15%)" },
          { price: Math.round(totalValue * 0.2 / 100) * 100 - 3, label: "Premium (20%)" }
        ].map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => updatePricing('offerPrice', suggestion.price)}
            className="p-3 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
          >
            <div className="text-lg font-bold text-gray-900">${suggestion.price}</div>
            <div className="text-xs text-gray-500">{suggestion.label}</div>
          </button>
        ))}
      </div>
    </div>
  )
}