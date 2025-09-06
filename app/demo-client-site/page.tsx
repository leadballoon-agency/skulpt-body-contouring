'use client'

import { useEffect } from 'react'

export default function DemoClientSite() {
  useEffect(() => {
    // Load LeadBalloon script dynamically
    const script = document.createElement('script')
    script.src = '/leadballoon.js'
    script.setAttribute('data-account', 'demo')
    script.setAttribute('data-position', 'bottom-right')
    script.setAttribute('data-trigger', 'scroll')
    script.setAttribute('data-delay', '3000')
    document.body.appendChild(script)
    
    return () => {
      // Cleanup on unmount
      script.remove()
      const widgets = document.getElementById('leadballoon-widgets')
      if (widgets) widgets.remove()
    }
  }, [])
  
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Mock Client Website */}
        <header className="bg-gray-900 text-white py-4">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Demo Business Website</h1>
            <p className="text-gray-300">This simulates any client's website with LeadBalloon installed</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to Our Business</h2>
            <p className="text-gray-600 mb-4">
              This is a demo page showing how LeadBalloon AI widgets work when installed on any website.
              Just one line of code was added to this page, and now we have:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-8">
              <li>🎁 An offer widget that appears in the corner</li>
              <li>📋 An assessment modal that qualifies leads</li>
              <li>⏰ Smart triggers based on time, scroll, or exit intent</li>
              <li>💰 Conversion-optimized design and copy</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-2">How It Works:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Scroll down or wait a few seconds</li>
                <li>The offer widget will appear automatically</li>
                <li>Click the offer to see the assessment modal</li>
                <li>Everything is configured via the LeadBalloon AI dashboard</li>
              </ol>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Service {i}</h3>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 mb-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form className="max-w-lg">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea className="w-full px-4 py-2 border rounded" rows={4} />
              </div>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Send Message
              </button>
            </form>
          </section>

          <div className="py-12">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">🎯 For Testing:</h3>
              <p className="text-gray-700 mb-2">
                The LeadBalloon widgets should appear automatically on this page:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Trigger bubble in bottom-right corner (after 3 seconds)</li>
                <li>Full offer panel appears on scroll or after 5 seconds</li>
                <li>Click the CTA to see the assessment modal</li>
              </ul>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Demo Business. This page demonstrates LeadBalloon AI widget injection.</p>
          </div>
        </footer>
      </div>

    </>
  )
}