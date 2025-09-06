'use client'

import { useState, useEffect } from 'react'
import OfferWidgetEmbed from './OfferWidgetEmbed'

interface WidgetConfig {
  trigger: 'time' | 'scroll' | 'exit' | 'button'
  display: 'modal' | 'slide' | 'corner' | 'inline'
  delay?: number // seconds for time trigger
  scrollPercent?: number // percent for scroll trigger
}

export default function LeadBalloonWidget() {
  const [showWidget, setShowWidget] = useState(false)
  const [widgetConfig, setWidgetConfig] = useState<WidgetConfig>({
    trigger: 'time',
    display: 'modal',
    delay: 3
  })

  useEffect(() => {
    // Load widget configuration
    const config = localStorage.getItem('widgetConfig')
    if (config) {
      const parsed = JSON.parse(config)
      if (parsed.launchStyle) {
        setWidgetConfig({
          trigger: parsed.launchStyle.trigger || 'time',
          display: parsed.launchStyle.display || 'modal',
          delay: parsed.launchStyle.delay || 3,
          scrollPercent: parsed.launchStyle.scrollPercent || 50
        })
      }
    }

    // Set up triggers
    const { trigger, delay, scrollPercent } = widgetConfig

    if (trigger === 'time') {
      // Show after X seconds
      const timer = setTimeout(() => {
        setShowWidget(true)
      }, (delay || 3) * 1000)
      return () => clearTimeout(timer)
    }

    if (trigger === 'scroll') {
      // Show after scrolling X%
      const handleScroll = () => {
        const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        if (scrolled >= (scrollPercent || 50)) {
          setShowWidget(true)
          window.removeEventListener('scroll', handleScroll)
        }
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }

    if (trigger === 'exit') {
      // Show on exit intent
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setShowWidget(true)
          document.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
      document.addEventListener('mouseleave', handleMouseLeave)
      return () => document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [widgetConfig.trigger, widgetConfig.delay, widgetConfig.scrollPercent])

  if (!showWidget) return null

  // Modal display
  if (widgetConfig.display === 'modal') {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowWidget(false)}
        />
        
        {/* Widget */}
        <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
          {/* Close button */}
          <button
            onClick={() => setShowWidget(false)}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
          >
            ✕
          </button>
          
          <OfferWidgetEmbed />
        </div>
      </div>
    )
  }

  // Slide-in from right
  if (widgetConfig.display === 'slide') {
    return (
      <div className={`fixed right-0 top-20 z-[9999] max-w-md transform transition-transform duration-500 ${
        showWidget ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="relative shadow-2xl">
          <button
            onClick={() => setShowWidget(false)}
            className="absolute -left-10 top-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
          >
            ✕
          </button>
          <div className="max-h-[80vh] overflow-y-auto">
            <OfferWidgetEmbed />
          </div>
        </div>
      </div>
    )
  }

  // Corner popup
  if (widgetConfig.display === 'corner') {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] max-w-sm animate-bounceIn">
        <div className="relative shadow-2xl">
          <button
            onClick={() => setShowWidget(false)}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-sm"
          >
            ✕
          </button>
          <div className="scale-90">
            <OfferWidgetEmbed />
          </div>
        </div>
      </div>
    )
  }

  // Inline (embedded in page)
  return <OfferWidgetEmbed />
}

// Add animations to globals.css
const animationStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

.animate-slideUp {
  animation: slideUp 0.4s ease-out;
}

.animate-bounceIn {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
`