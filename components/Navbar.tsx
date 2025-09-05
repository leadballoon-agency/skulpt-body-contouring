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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => navigateToPage('/')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => navigateToPage('/tummy-reset')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            Tummy Reset
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => navigateToPage('/skintite')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            SkinTite
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => navigateToPage('/recovery-detox')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            Recovery
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => scrollToSection('treatment')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            Treatment
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => scrollToSection('faq')}
            className="text-dark hover:text-primary-500 font-medium transition-colors relative group"
          >
            FAQ
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full" />
          </button>
          
          <button
            onClick={() => scrollToSection('assessment')}
            className="bg-primary-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-600 transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-dark text-xl"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 bg-white bg-opacity-95 backdrop-blur-md rounded-lg mx-4 shadow-lg">
          <div className="px-6 py-4 space-y-4">
            <button
              onClick={() => navigateToPage('/')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              Home
            </button>
            <button
              onClick={() => navigateToPage('/tummy-reset')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              Tummy Reset
            </button>
            <button
              onClick={() => navigateToPage('/skintite')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              SkinTite
            </button>
            <button
              onClick={() => navigateToPage('/recovery-detox')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              Recovery
            </button>
            <button
              onClick={() => scrollToSection('treatment')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              Treatment
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="block w-full text-left text-dark hover:text-primary-500 font-medium py-2"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection('assessment')}
              className="block w-full bg-primary-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}