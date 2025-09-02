'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ProgressPhoto {
  id: string
  url: string
  date: string
  week: number
  notes?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [showWowMoment, setShowWowMoment] = useState(false)
  const [userEmail, setUserEmail] = useState<string>('')
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([])
  const [isPhotoUploading, setIsPhotoUploading] = useState(false)

  useEffect(() => {
    // Check if user came from assessment
    const email = sessionStorage.getItem('assessmentEmail')
    if (!email) {
      router.push('/')
      return
    }
    
    setUserEmail(email)
    
    // Trigger wow moment after a brief delay
    setTimeout(() => {
      setShowWowMoment(true)
    }, 500)

    // Load existing progress photos (simulated)
    loadProgressPhotos()
  }, [router])

  const loadProgressPhotos = () => {
    // Simulate loading progress photos
    const mockPhotos: ProgressPhoto[] = [
      {
        id: '1',
        url: '/images/Before and After/before after 1.webp',
        date: new Date().toISOString().split('T')[0],
        week: 0,
        notes: 'Starting point - before treatment'
      }
    ]
    setProgressPhotos(mockPhotos)
  }

  const handlePhotoUpload = async (file: File, week: number) => {
    setIsPhotoUploading(true)
    
    try {
      // Here you would upload to Cloudinary
      // For demo, we'll simulate the upload
      const mockUrl = URL.createObjectURL(file)
      
      const newPhoto: ProgressPhoto = {
        id: Date.now().toString(),
        url: mockUrl,
        date: new Date().toISOString().split('T')[0],
        week,
        notes: `Week ${week} progress photo`
      }
      
      setProgressPhotos(prev => [...prev, newPhoto])
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsPhotoUploading(false)
    }
  }

  const startPhotoJourney = () => {
    // Create file input
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = false
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handlePhotoUpload(file, 0)
      }
    }
    
    input.click()
  }

  const bookConsultation = () => {
    window.open('https://link.skintight.uk/widget/booking/85AnUNYWb63J1DyMo1g9', '_blank')
  }

  if (!showWowMoment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Preparing your personalized dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Wow Moment Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white bg-opacity-10 rounded-full animate-blob"></div>
          <div className="absolute top-0 right-4 w-72 h-72 bg-accent-500 bg-opacity-20 rounded-full animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-pulse mb-6">
            <span className="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full text-sm font-semibold">
              🎉 CONGRATULATIONS!
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up">
            You're <span className="text-accent-300">Perfect</span> for ProMax Lipo!
          </h1>
          
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
            Based on your assessment, you're an ideal candidate for our revolutionary treatment. 
            Welcome to your transformation journey!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl">
              <div className="text-3xl font-bold text-accent-300">95%</div>
              <p className="text-sm">Match Score</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl">
              <div className="text-3xl font-bold text-accent-300">6</div>
              <p className="text-sm">Recommended Sessions</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-2xl">
              <div className="text-3xl font-bold text-accent-300">89%</div>
              <p className="text-sm">Success Rate for Your Profile</p>
            </div>
          </div>
          
          <button
            onClick={bookConsultation}
            className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-all hover:-translate-y-1 hover:shadow-xl mr-4"
          >
            Book Your Free Consultation
          </button>
          
          <button
            onClick={startPhotoJourney}
            className="bg-white bg-opacity-20 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-30 transition-all border border-white border-opacity-30"
          >
            📸 Start Photo Journey
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Photo Progress Tracking */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-dark">Your Transformation Journey</h2>
                <button
                  onClick={startPhotoJourney}
                  disabled={isPhotoUploading}
                  className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50"
                >
                  {isPhotoUploading ? 'Uploading...' : '+ Add Photo'}
                </button>
              </div>
              
              {progressPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {progressPhotos.map((photo) => (
                    <div key={photo.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={photo.url}
                          alt={`Week ${photo.week}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="mt-2 text-center">
                        <p className="font-semibold text-dark">Week {photo.week}</p>
                        <p className="text-sm text-gray-600">{photo.date}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Placeholder for future photos */}
                  {[1, 2, 3, 4, 5, 6].map((week) => (
                    !progressPhotos.find(p => p.week === week) && (
                      <div key={week} className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center group cursor-pointer hover:border-primary-500"
                           onClick={() => {
                             const input = document.createElement('input')
                             input.type = 'file'
                             input.accept = 'image/*'
                             input.onchange = (e) => {
                               const file = (e.target as HTMLInputElement).files?.[0]
                               if (file) handlePhotoUpload(file, week)
                             }
                             input.click()
                           }}>
                        <div className="text-3xl text-gray-400 mb-2">📸</div>
                        <p className="text-sm text-gray-500">Week {week}</p>
                        <p className="text-xs text-gray-400">Click to add</p>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-xl font-semibold text-dark mb-2">Start Your Photo Journey</h3>
                  <p className="text-gray-600 mb-6">Document your transformation with progress photos</p>
                  <button
                    onClick={startPhotoJourney}
                    className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
                  >
                    Take Your First Photo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-dark mb-4">Your Next Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <span className="text-gray-700">Book free consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <span className="text-gray-700">Schedule first session</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <span className="text-gray-700">Begin transformation</span>
                </div>
              </div>
            </div>

            {/* Treatment Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-dark mb-4">Your Treatment Plan</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Recommended Sessions:</span>
                  <span className="font-semibold">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Duration:</span>
                  <span className="font-semibold">45-60 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frequency:</span>
                  <span className="font-semibold">1-2 weeks apart</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Results:</span>
                  <span className="font-semibold text-accent-600">3-6 months</span>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Questions?</h3>
              <p className="text-primary-100 mb-4">Our team is here to help you every step of the way.</p>
              <button 
                onClick={() => window.open('https://wa.me/447700173390?text=Hi! I just completed my assessment and have some questions about ProMax Lipo.', '_blank')}
                className="w-full bg-white bg-opacity-20 text-white px-4 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all flex items-center justify-center gap-2"
              >
                💬 WhatsApp Us
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}