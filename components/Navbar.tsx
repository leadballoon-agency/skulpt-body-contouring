'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset
      
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
      } ${isScrolled ? 'glassmorphism shadow-lg border-b border-white border-opacity-30' : ''}`}
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

        {/* Desktop Navigation - Hidden for now, just show logo */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation temporarily hidden - tummy-reset page only */}
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