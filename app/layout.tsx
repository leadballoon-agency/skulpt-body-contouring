import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Skulpt - Fix Loose Skin After Weight Loss | Non-Surgical Solutions Peterborough',
  description: 'Lost weight with Ozempic or Mounjaro? Get rid of loose skin without surgery. ProMax Lipo by Lynton - Peterborough\'s premier body contouring clinic.',
  keywords: 'loose skin after weight loss, ProMax Lipo, Ozempic loose skin, Wegovy loose skin, Mounjaro loose skin, body contouring Peterborough, non-surgical skin tightening, Lynton ProMax Lipo, post weight loss skin treatment, skinny jab loose skin',
  authors: [{ name: 'Skulpt Body Contouring' }],
  creator: 'Skulpt Body Contouring',
  publisher: 'Skulpt Body Contouring',
  openGraph: {
    title: 'Skulpt - Fix Loose Skin After Weight Loss | Peterborough',
    description: 'Lost weight with Ozempic or Mounjaro? Professional ProMax Lipo treatment for loose skin. Peterborough\'s leading body contouring clinic.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Skulpt Body Contouring',
    url: 'https://skulpt.co.uk',
    images: [
      {
        url: '/images/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Skulpt Body Contouring - ProMax Lipo Treatment'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skulpt - Fix Loose Skin After Weight Loss',
    description: 'Professional ProMax Lipo treatment for post-weight loss loose skin. Peterborough\'s premier clinic.',
    images: ['/images/logo.webp']
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://skulpt.co.uk'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
        
        {/* Scroll Restoration Fix */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Force scroll to top on page load and disable browser scroll restoration
            if (typeof window !== 'undefined') {
              window.scrollTo(0, 0);
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
            }
          `
        }} />
      </body>
    </html>
  )
}