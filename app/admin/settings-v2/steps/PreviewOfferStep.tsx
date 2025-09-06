'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function PreviewOfferStep({ config, updateConfig }: Props) {
  const totalValue = (config.valueStack || []).reduce((sum: number, item: any) => {
    return sum + (parseFloat(item.value) || 0)
  }, 0)

  const discount = totalValue > 0 
    ? Math.round((1 - (config.pricing?.offerPrice || 0) / totalValue) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Review Your Offer
        </h3>
        <p className="text-gray-600">
          This is exactly what your visitors will see. Make sure every element is compelling and clear.
        </p>
      </div>

      {/* Offer Summary Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
          <h4 className="text-2xl font-bold mb-2">Your Irresistible Offer</h4>
          <p className="text-primary-100">{config.dreamOutcome || 'Transform your life today'}</p>
        </div>

        {/* Value Stack */}
        <div className="p-6">
          <h5 className="text-lg font-bold text-gray-900 mb-4">Here's Everything You Get:</h5>
          <div className="space-y-3">
            {(config.valueStack || []).map((item: any, idx: number) => (
              <div key={idx} className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="font-semibold text-gray-900">{item.item}</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 ml-6 mt-1">{item.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    ${parseFloat(item.value || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total Value */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-700">Total Value:</span>
              <span className="text-2xl font-bold text-gray-400 line-through">
                ${totalValue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Today Only:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl font-bold text-green-600">
                  ${(config.pricing?.offerPrice || 0).toLocaleString()}
                </span>
                {discount > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    SAVE {discount}%
                  </span>
                )}
              </div>
              {config.pricing?.hasPaymentPlan && (
                <p className="text-sm text-gray-600 mt-3">
                  Or {Math.ceil((config.pricing?.offerPrice || 0) / (config.pricing?.paymentPlanPrice || 1))} payments of 
                  <span className="font-semibold"> ${config.pricing?.paymentPlanPrice}</span>
                </p>
              )}
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  {config.guarantee?.type === 'double' ? 'Double Your Money Back Guarantee' :
                   config.guarantee?.type === 'pay-after' ? 'Pay After Results Guarantee' :
                   'Money Back Guarantee'}
                </p>
                <p className="text-sm text-gray-700">
                  {config.guarantee?.text || 'Your satisfaction is 100% guaranteed'}
                </p>
              </div>
            </div>
          </div>

          {/* Urgency */}
          <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-red-900">
                  ⚡ Only {config.urgency?.spots || 7} Spots Remaining
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Offer expires in {config.urgency?.timerHours || 23}h {config.urgency?.timerMinutes || 59}m
                </p>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg">
                CLAIM YOUR SPOT →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h5 className="text-lg font-bold text-gray-900 mb-4">✅ Offer Checklist</h5>
        <div className="grid md:grid-cols-2 gap-3">
          <div className={`flex items-center gap-2 ${config.dreamOutcome?.length > 10 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{config.dreamOutcome?.length > 10 ? '✅' : '⭕'}</span>
            <span className="text-sm">Clear dream outcome defined</span>
          </div>
          <div className={`flex items-center gap-2 ${config.valueStack?.length >= 3 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{config.valueStack?.length >= 3 ? '✅' : '⭕'}</span>
            <span className="text-sm">At least 3 value components</span>
          </div>
          <div className={`flex items-center gap-2 ${discount >= 70 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{discount >= 70 ? '✅' : '⭕'}</span>
            <span className="text-sm">70%+ discount from total value</span>
          </div>
          <div className={`flex items-center gap-2 ${config.guarantee?.text?.length > 10 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{config.guarantee?.text?.length > 10 ? '✅' : '⭕'}</span>
            <span className="text-sm">Strong guarantee in place</span>
          </div>
          <div className={`flex items-center gap-2 ${config.urgency?.spots <= 10 ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{config.urgency?.spots <= 10 ? '✅' : '⭕'}</span>
            <span className="text-sm">Limited spots (scarcity)</span>
          </div>
          <div className={`flex items-center gap-2 ${config.urgency?.timerHours ? 'text-green-600' : 'text-gray-400'}`}>
            <span>{config.urgency?.timerHours ? '✅' : '⭕'}</span>
            <span className="text-sm">Countdown timer (urgency)</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">🚀 Ready to Launch?</p>
        <p className="text-xs text-gray-600">
          Your offer is looking great! Next, we'll set up the qualification questions to ensure 
          you're attracting the right customers who are ready to buy.
        </p>
      </div>
    </div>
  )
}