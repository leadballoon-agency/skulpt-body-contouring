'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to tummy-reset page
    router.push('/tummy-reset')
  }, [router])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">Redirecting...</h1>
        <p className="text-gray-500 mt-2">Taking you to our special offer page</p>
      </div>
    </div>
  )
}