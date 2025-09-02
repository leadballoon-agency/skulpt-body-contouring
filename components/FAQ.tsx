'use client'

import { useState } from 'react'

const faqData = [
  {
    id: 1,
    question: "Why didn't my doctor warn me about loose skin from skinny jabs?",
    answer: "The skinny jab revolution is still so new that many doctors focus on the weight loss benefits without discussing the inevitable loose skin. The rapid weight loss (often 20-30% of body weight in months) is simply too fast for skin elasticity to keep up. That's why we developed our ProMax Lipo programme specifically for this emerging crisis."
  },
  {
    id: 2,
    question: "How many sessions will I need?",
    answer: "Most clients achieve optimal results with 6 sessions, spaced 1-2 weeks apart. However, this varies based on the amount of loose skin, areas being treated, and individual response. Your practitioner will create a personalized plan during consultation."
  },
  {
    id: 3,
    question: "Is the treatment painful?",
    answer: "No, ProMax Lipo is completely painless. Most clients describe it as a warm, relaxing massage. You may feel gentle warmth from the RF and a light suction from the vacuum therapy, but there's no discomfort."
  },
  {
    id: 4,
    question: "When will I see results?",
    answer: "Many clients notice skin feeling tighter immediately after the first session. Visible improvements typically appear within 2-3 weeks as your body naturally eliminates fat cells and produces new collagen. Full results develop over 3-6 months."
  },
  {
    id: 5,
    question: "How much does it cost?",
    answer: "Pricing varies based on areas treated and number of sessions needed. Single sessions start from £150, with package deals offering significant savings. We offer flexible payment plans and often have special offers for GLP-1 users. Book a free consultation for exact pricing."
  },
  {
    id: 6,
    question: "Are there any side effects?",
    answer: "ProMax Lipo is very safe with minimal side effects. You may experience temporary redness, mild warmth, or slight tenderness in treated areas, which typically resolves within a few hours. There's no downtime and you can return to normal activities immediately."
  },
  {
    id: 7,
    question: "How is this different from surgical options?",
    answer: "Unlike surgery (tummy tucks, arm lifts), ProMax Lipo requires no incisions, anesthesia, or recovery time. While surgery removes excess skin, our treatment tightens existing skin and reduces fat. It's ideal for mild to moderate loose skin without the risks and downtime of surgery."
  },
  {
    id: 8,
    question: "Is loose skin inevitable with skinny jabs?",
    answer: "Unfortunately, yes. When you lose 20-30% of your body weight in 6-12 months (typical with Ozempic, Wegovy, Mounjaro), your skin simply cannot shrink fast enough. The GLP-1 drugs work too well, too fast. While amazing for weight loss, they create a new problem - excess skin that diet and exercise can't fix. That's where ProMax Lipo by Lynton comes in."
  }
]

export default function FAQ() {
  const [activeId, setActiveId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id)
  }

  return (
    <section className="py-20 bg-light-gray" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-50 text-primary-500 px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider mb-6">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-dark mb-4">
            The Questions Nobody Else Will Answer
          </h2>
          <p className="text-xl text-gray-600">
            The truth about skinny jab loose skin and how to fix it
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors ${
                  activeId === faq.id ? 'bg-gray-50' : ''
                }`}
              >
                <span className="text-lg font-semibold text-dark pr-4">
                  {faq.question}
                </span>
                <div
                  className={`transform transition-transform duration-200 ${
                    activeId === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div
                className={`transition-all duration-200 overflow-hidden ${
                  activeId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}