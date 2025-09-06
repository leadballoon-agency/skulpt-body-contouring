'use client'
import React from 'react'

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function GuaranteeStep({ config, updateConfig }: Props) {
  const updateGuarantee = (field: string, value: any) => {
    updateConfig({
      guarantee: { ...config.guarantee, [field]: value }
    })
  }

  const guaranteeTemplates = {
    refund: [
      "30-Day Money Back Guarantee - If you don't see results in 30 days, we'll refund every penny",
      "60-Day Risk-Free Trial - Love it or get a full refund, no questions asked",
      "100% Satisfaction Guarantee - If you're not thrilled with your results, we'll make it right"
    ],
    double: [
      "Double Your Money Back - If you don't get results, we'll pay you double",
      "200% Guarantee - Get results or get double your investment back",
      "The Only Risk Is Not Taking Action - Double your money back if it doesn't work"
    ],
    'pay-after': [
      "Pay Only After You See Results - No payment until you achieve your goal",
      "Results First, Payment Later - We're so confident, you don't pay until it works",
      "Success-Based Pricing - Pay nothing unless you get the promised outcome"
    ]
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Remove All Risk
        </h3>
        <p className="text-gray-600">
          Make your guarantee so strong that NOT buying feels risky. Shift all risk from buyer to seller.
        </p>
      </div>

      {/* Guarantee Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Choose Your Guarantee Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => updateGuarantee('type', 'refund')}
            className={`p-4 rounded-xl border-2 transition-all ${
              config.guarantee?.type === 'refund'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-lg mb-1">💰</div>
            <div className="font-semibold text-sm text-gray-900">Money Back</div>
            <div className="text-xs text-gray-500 mt-1">Standard refund</div>
          </button>
          
          <button
            onClick={() => updateGuarantee('type', 'double')}
            className={`p-4 rounded-xl border-2 transition-all ${
              config.guarantee?.type === 'double'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-lg mb-1">💰💰</div>
            <div className="font-semibold text-sm text-gray-900">Double Money</div>
            <div className="text-xs text-gray-500 mt-1">200% refund</div>
          </button>
          
          <button
            onClick={() => updateGuarantee('type', 'pay-after')}
            className={`p-4 rounded-xl border-2 transition-all ${
              config.guarantee?.type === 'pay-after'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="text-lg mb-1">🎯</div>
            <div className="font-semibold text-sm text-gray-900">Pay After</div>
            <div className="text-xs text-gray-500 mt-1">Results first</div>
          </button>
        </div>
      </div>

      {/* Guarantee Text */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Guarantee Statement
        </label>
        <textarea
          value={config.guarantee?.text || ''}
          onChange={(e) => updateGuarantee('text', e.target.value)}
          placeholder="Write your guarantee here..."
          className="w-full px-4 py-4 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
          rows={4}
        />
        <p className="text-xs text-gray-500 mt-2">
          {config.guarantee?.text?.length || 0} characters (minimum 10)
        </p>
      </div>

      {/* Template Suggestions */}
      {config.guarantee?.type && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            🤖 AI-Powered Templates for {
              config.guarantee.type === 'refund' ? 'Money Back' :
              config.guarantee.type === 'double' ? 'Double Money' : 'Pay After'
            } Guarantee
          </p>
          <div className="grid gap-2">
            {guaranteeTemplates[config.guarantee.type as keyof typeof guaranteeTemplates].map((template, idx) => (
              <button
                key={idx}
                onClick={() => updateGuarantee('text', template)}
                className="text-left px-3 py-3 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg text-sm text-gray-700 transition-all"
              >
                {template}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Risk Reversal Examples */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-green-900 mb-2">✅ Strong Guarantees</p>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>• "If you don't lose 10 pounds, you pay nothing"</li>
            <li>• "Triple your leads or triple your money back"</li>
            <li>• "We'll work with you until you succeed"</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-red-900 mb-2">❌ Weak Guarantees</p>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>• "Satisfaction guaranteed" (vague)</li>
            <li>• "7-day refund" (too short)</li>
            <li>• "Terms and conditions apply" (scary)</li>
          </ul>
        </div>
      </div>

      {/* Psychology Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-yellow-900 mb-2">🧠 Psychology Insight</p>
        <p className="text-xs text-gray-700">
          Studies show that stronger guarantees actually result in FEWER refunds because:
          1) They attract serious buyers, 2) Create reciprocity, 3) Build trust.
          The stronger your guarantee, the more sales you'll make with fewer refunds.
        </p>
      </div>
    </div>
  )
}