'use client'

import { useState } from 'react'
import Image from 'next/image'

const beforeAfterImages = [
  {
    id: 1,
    src: '/images/Before and After/ProMax-Lipo-Body-Ruth-Jones.jpg',
    title: 'Full Body Transformation',
    description: 'Dramatic skin tightening after significant weight loss',
    area: 'body'
  },
  {
    id: 2,
    src: '/images/Before and After/ProMax-Lipo-Body-Torso-Ruth-Jones4.jpg',
    title: 'Torso Tightening',
    description: 'Visible skin tightening and body contouring',
    area: 'torso'
  },
  {
    id: 3,
    src: '/images/Before and After/ProMax-Lipo-Body-2-Clinic-Luciderm-Clinic.jpg',
    title: 'Abdominal Contouring',
    description: 'Professional body contouring - 6 sessions',
    area: 'abdomen'
  },
  {
    id: 4,
    src: '/images/Before and After/ProMax-Lipo-Body-5-Lynton-Clinic-5-Treatments-2017-Lynton.jpg',
    title: 'Complete Body Sculpting',
    description: 'Full body transformation - 5 ProMax Lipo treatments',
    area: 'body'
  },
  {
    id: 5,
    src: '/images/Before and After/ProMax-Lipo-Facial-Skin-indd.jpg',
    title: 'Facial Skin Tightening',
    description: 'ProMax Lipo facial rejuvenation results',
    area: 'face'
  },
  {
    id: 6,
    src: '/images/Before and After/ProMax-Lipo-Facial-Skin-Tigtening-LL.jpg',
    title: 'Neck & Jawline',
    description: 'Non-surgical face lift results',
    area: 'face'
  }
]

interface BeforeAfterGalleryProps {
  showTitle?: boolean
  maxImages?: number
  filterArea?: string
}

export default function BeforeAfterGallery({ 
  showTitle = true, 
  maxImages,
  filterArea 
}: BeforeAfterGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [imageError, setImageError] = useState<Record<number, boolean>>({})

  // Filter images if filterArea is provided
  let displayImages = filterArea 
    ? beforeAfterImages.filter(img => img.area === filterArea)
    : beforeAfterImages

  // Limit images if maxImages is provided
  if (maxImages) {
    displayImages = displayImages.slice(0, maxImages)
  }

  const handleImageError = (imageId: number) => {
    setImageError(prev => ({ ...prev, [imageId]: true }))
  }

  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-16">
            <div className="inline-block bg-white bg-opacity-10 text-white px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider mb-6">
              Proven Results
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-4">
              Real Transformations
            </h2>
            <p className="text-xl text-gray-300">
              ProMax Lipo results from actual clients
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayImages.map((image) => (
            <div
              key={image.id}
              className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedImage(image.id)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                {!imageError[image.id] ? (
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => handleImageError(image.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📸</div>
                      <p className="text-sm">Image Loading...</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="text-primary-500 font-semibold mb-2">
                  {image.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {showTitle && (
          <div className="text-center">
            <p className="text-gray-300 mb-6">
              Want to see more results specific to your concerns?
            </p>
            <button 
              onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-dark transition-all duration-300"
            >
              Take the Assessment for Personalized Results
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl font-bold"
            >
              ✕ Close
            </button>
            
            {(() => {
              const image = beforeAfterImages.find(img => img.id === selectedImage)
              return image ? (
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary-500 mb-2">
                      {image.title}
                    </h3>
                    <p className="text-gray-600">
                      {image.description}
                    </p>
                  </div>
                </div>
              ) : null
            })()}
          </div>
        </div>
      )}
    </section>
  )
}