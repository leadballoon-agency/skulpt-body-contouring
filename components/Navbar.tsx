'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false) // Only show on scroll
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      
      // Show navbar only when scrolling
      if (currentScroll > 100) {
        setIsVisible(true)
        setIsScrolled(true)
      } else {
        setIsVisible(false)
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navigateToPage = (path: string) => {
    window.location.href = path
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${
        isScrolled
          ? 'bg-black bg-opacity-80 backdrop-blur-lg shadow-2xl border-b border-[#967e15] border-opacity-40'
          : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative h-12 w-auto">
            <Image
              src="/images/logo.webp"
              alt="Skulpt Body Contouring"
              height={45}
              width={120}
              className="h-auto"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center space-x-4">
          <a
            href="tel:+447700173390"
            className="px-6 py-2.5 bg-[#967e15] text-white font-semibold rounded-full hover:bg-[#b59518] transition-all transform hover:scale-105 shadow-lg hover:shadow-[#967e15]/50 hover:shadow-xl flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Call Now</span>
          </a>
        </div>

        {/* Mobile Menu Button - Hidden for now */}
      </div>

      {/* Mobile Menu - Hidden for now */}
      {false && isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white bg-opacity-95 backdrop-blur-md rounded-lg mx-4 shadow-lg">
          {/* Mobile menu temporarily hidden - tummy-reset page only */}
        </div>
      )}
    </nav>
  )
}