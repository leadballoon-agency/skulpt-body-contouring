'use client'

import { useEffect } from 'react'
import Script from 'next/script'

export default function WidgetDemo() {
  useEffect(() => {
    // Set different configs for demonstration
    if (typeof window !== 'undefined') {
      // We'll override configs via buttons
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Skulpt Assessment Widget Demo</h1>
          <p className="text-gray-400">
            Three powerful modes to capture leads on your website
          </p>
        </div>
      </header>

      {/* Demo Sections */}
      <div className="max-w-7xl mx-auto p-6 space-y-12">
        
        {/* Mode 1: Popup */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mode 1: Smart Popup</h2>
            <p className="text-gray-600">
              Trigger assessment popup based on user behavior
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Trigger Options:</h3>
              
              <button 
                onClick={() => {
                  if (window.SkulptAssessment) {
                    window.SkulptAssessment.open()
                  }
                }}
                className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Immediate Popup
              </button>
              
              <button 
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                onClick={() => alert('Move mouse to top of page to trigger exit intent')}
              >
                Exit Intent (Move mouse to top)
              </button>
              
              <button 
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                onClick={() => alert('Scroll down the page to 50% to trigger')}
              >
                Scroll Trigger (50% down)
              </button>
              
              <button 
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                onClick={() => alert('Wait 30 seconds on page to trigger')}
              >
                Time Delay (30 seconds)
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="font-mono text-sm mb-2">Implementation:</h4>
              <pre className="text-xs overflow-x-auto">
{`<script>
  window.SkulptConfig = {
    mode: 'popup',
    trigger: 'exit', // or 'scroll', 'time', 'immediate'
    partnerId: 'your-partner-id'
  };
</script>
<script src="https://skulpt.ai/widget.js"></script>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mode 2: Embed */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mode 2: Seamless Embed</h2>
            <p className="text-gray-600">
              Embed the assessment directly in your page
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Embedded Assessment:</h3>
              <div id="skulpt-assessment" className="min-h-[600px]">
                {/* Widget will be embedded here */}
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="font-mono text-sm mb-2">Implementation:</h4>
              <pre className="text-xs overflow-x-auto">
{`<!-- Add container where you want the form -->
<div id="skulpt-assessment"></div>

<!-- Add widget script -->
<script>
  window.SkulptConfig = {
    mode: 'embed',
    partnerId: 'your-partner-id'
  };
</script>
<script src="https://skulpt.ai/widget.js"></script>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Mode 3: Button Trigger */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Mode 3: Custom Button Triggers</h2>
            <p className="text-gray-600">
              Add assessment triggers to any button on your site
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Example Buttons:</h3>
              
              <button 
                data-skulpt="trigger"
                className="w-full px-6 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all"
              >
                Check If You Qualify
              </button>
              
              <button 
                data-skulpt="trigger"
                className="w-full px-6 py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
              >
                Get Free Assessment
              </button>
              
              <button 
                data-skulpt="trigger"
                className="w-full px-6 py-4 border-2 border-amber-600 text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
              >
                Start Your Transformation
              </button>
              
              <div className="text-sm text-gray-600 mt-4">
                <p>✓ Works with existing buttons</p>
                <p>✓ No design changes needed</p>
                <p>✓ Multiple buttons per page</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6">
              <h4 className="font-mono text-sm mb-2">Implementation:</h4>
              <pre className="text-xs overflow-x-auto">
{`<!-- Add to any button -->
<button data-skulpt="trigger">
  Your Button Text
</button>

<!-- Or use JavaScript -->
<button onclick="SkulptAssessment.open()">
  Open Assessment
</button>

<!-- Add widget script -->
<script>
  window.SkulptConfig = {
    mode: 'button',
    partnerId: 'your-partner-id'
  };
</script>
<script src="https://skulpt.ai/widget.js"></script>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="bg-gradient-to-br from-gray-900 to-black text-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Advanced Features</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">🎯 Smart Targeting</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Exit intent detection</li>
                <li>• Scroll percentage triggers</li>
                <li>• Time-based popups</li>
                <li>• Cookie-based frequency control</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">📊 Analytics & Tracking</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Partner attribution</li>
                <li>• Conversion tracking</li>
                <li>• Event monitoring</li>
                <li>• A/B testing support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">🎨 Customization</h3>
              <ul className="text-sm space-y-2 text-gray-300">
                <li>• Custom colors & themes</li>
                <li>• Configurable text</li>
                <li>• Mobile responsive</li>
                <li>• Multiple languages</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Integration Code */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Quick Integration</h2>
          
          <div className="bg-gray-900 text-gray-300 rounded-lg p-6">
            <pre className="text-sm overflow-x-auto">
{`<!-- Complete Integration Example -->
<script>
  // Configure the widget
  window.SkulptConfig = {
    // Choose mode: 'popup', 'embed', or 'button'
    mode: 'popup',
    
    // Popup triggers: 'exit', 'scroll', 'time', 'immediate'
    trigger: 'exit',
    
    // Additional options
    delay: 30000,           // For time trigger (ms)
    scrollPercent: 50,      // For scroll trigger (%)
    showOnMobile: true,     // Mobile support
    
    // Your partner ID
    partnerId: 'your-partner-id',
    
    // Customization
    primaryColor: '#D97706',
    headline: 'Transform Your Body',
    buttonText: 'Start Assessment'
  };
</script>

<!-- Add the widget script -->
<script src="https://skulpt.ai/widget.js" 
        data-partner="your-partner-id">
</script>`}
            </pre>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors">
              Get Your Partner ID →
            </button>
          </div>
        </section>
      </div>

      {/* Load Widget Scripts with different configs */}
      <Script id="skulpt-config-embed">
        {`
          // Configure for embed mode
          if (!window.SkulptConfig) {
            window.SkulptConfig = {
              mode: 'embed',
              partnerId: 'demo-embed'
            };
          }
        `}
      </Script>
      
      {/* Load the actual widget */}
      <Script 
        src="/widget.js" 
        data-partner="demo"
        strategy="afterInteractive"
      />
    </div>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SkulptConfig?: any;
    SkulptAssessment?: {
      open: () => void;
      close: () => void;
      config: any;
    };
  }
}