'use client'
import React from 'react'

interface Question {
  question: string
  options: string[]
  scores: number[]
}

interface Props {
  config: any
  updateConfig: (updates: any) => void
}

export default function QualificationStep({ config, updateConfig }: Props) {
  const addQuestion = () => {
    const newQuestion: Question = {
      question: '',
      options: ['', '', '', ''],
      scores: [10, 7, 3, 0]
    }
    updateConfig({ 
      qualification: {
        ...config.qualification,
        questions: [...(config.qualification?.questions || []), newQuestion]
      }
    })
  }

  const updateQuestion = (index: number, field: keyof Question, value: any) => {
    const updated = [...(config.qualification?.questions || [])]
    updated[index] = { ...updated[index], [field]: value }
    updateConfig({ 
      qualification: {
        ...config.qualification,
        questions: updated
      }
    })
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...(config.qualification?.questions || [])]
    updated[qIndex].options[oIndex] = value
    updateConfig({ 
      qualification: {
        ...config.qualification,
        questions: updated
      }
    })
  }

  const updateScore = (qIndex: number, sIndex: number, value: number) => {
    const updated = [...(config.qualification?.questions || [])]
    updated[qIndex].scores[sIndex] = value
    updateConfig({ 
      qualification: {
        ...config.qualification,
        questions: updated
      }
    })
  }

  const removeQuestion = (index: number) => {
    const updated = (config.qualification?.questions || []).filter((_: any, i: number) => i !== index)
    updateConfig({ 
      qualification: {
        ...config.qualification,
        questions: updated
      }
    })
  }

  const qualificationTemplates = [
    {
      question: "What's your budget for solving this problem?",
      options: ["$5,000+", "$2,000-$5,000", "$500-$2,000", "Under $500"],
      scores: [10, 7, 3, 0]
    },
    {
      question: "How soon do you need to see results?",
      options: ["Yesterday (urgent)", "Within 30 days", "Within 90 days", "No rush"],
      scores: [10, 8, 5, 2]
    },
    {
      question: "How committed are you to solving this problem?",
      options: ["I'll do whatever it takes", "Very committed", "Somewhat committed", "Just exploring"],
      scores: [10, 7, 4, 1]
    },
    {
      question: "Have you tried to solve this before?",
      options: ["Yes, multiple times", "Yes, once or twice", "No, this is my first time", "Not sure"],
      scores: [10, 8, 5, 3]
    },
    {
      question: "How much time can you dedicate per week?",
      options: ["10+ hours", "5-10 hours", "2-5 hours", "Less than 2 hours"],
      scores: [10, 8, 5, 2]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Qualify Your Leads
        </h3>
        <p className="text-gray-600">
          Ask strategic questions to identify buyers vs browsers. Qualify for budget, urgency, and commitment.
        </p>
      </div>

      {/* Current Questions */}
      <div className="space-y-4">
        {(config.qualification?.questions || []).map((q: Question, qIdx: number) => (
          <div key={qIdx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">Question #{qIdx + 1}</span>
              <button
                onClick={() => removeQuestion(qIdx)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
            
            {/* Question Text */}
            <input
              type="text"
              value={q.question}
              onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
              placeholder="Enter your qualification question..."
              className="w-full px-4 py-2 mb-3 bg-white border border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            
            {/* Options with Scores */}
            <div className="space-y-2">
              {q.options.map((option: string, oIdx: number) => (
                <div key={oIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                    placeholder={`Option ${oIdx + 1}`}
                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">Score:</span>
                    <input
                      type="number"
                      value={q.scores[oIdx]}
                      onChange={(e) => updateScore(qIdx, oIdx, parseInt(e.target.value) || 0)}
                      className="w-12 px-2 py-1.5 text-sm text-center bg-white border border-gray-200 rounded focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Button */}
      <button
        onClick={addQuestion}
        className="w-full py-3 border-2 border-dashed border-gray-300 hover:border-primary-500 rounded-xl text-gray-600 hover:text-primary-600 font-medium transition-all"
      >
        + Add Qualification Question
      </button>

      {/* Template Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          🤖 Proven Qualification Templates
        </p>
        <div className="grid gap-2">
          {qualificationTemplates.map((template, idx) => (
            <button
              key={idx}
              onClick={() => {
                updateConfig({ 
                  qualification: {
                    ...config.qualification,
                    questions: [...(config.qualification?.questions || []), template]
                  }
                })
              }}
              className="text-left px-3 py-3 bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-lg transition-all"
            >
              <div className="font-medium text-sm text-gray-700">{template.question}</div>
              <div className="text-xs text-gray-500 mt-1">
                {template.options[0]} → {template.options[3]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scoring Strategy */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-semibold text-blue-900 mb-2">📊 Scoring Strategy</p>
        <div className="space-y-1 text-xs text-gray-700">
          <p>• <strong>10 points:</strong> Ideal customer, ready to buy</p>
          <p>• <strong>7-9 points:</strong> Good fit, needs slight nurturing</p>
          <p>• <strong>4-6 points:</strong> Maybe later, add to nurture sequence</p>
          <p>• <strong>0-3 points:</strong> Not qualified, politely redirect</p>
        </div>
      </div>

      {/* Best Practices */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-green-900 mb-2">✅ Do Ask About</p>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>• Budget (can they afford it?)</li>
            <li>• Timeline (are they urgent?)</li>
            <li>• Authority (can they decide?)</li>
            <li>• Commitment level</li>
          </ul>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm font-semibold text-red-900 mb-2">❌ Don't Ask About</p>
          <ul className="space-y-1 text-xs text-gray-700">
            <li>• Personal information too early</li>
            <li>• Questions unrelated to buying</li>
            <li>• Anything that feels invasive</li>
            <li>• Too many questions (5 max)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}