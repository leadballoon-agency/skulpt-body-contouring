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
  description: 'Lost weight with Ozempic or Mounjaro? Get rid of loose skin without surgery. Advanced body contouring - Peterborough\'s premier skin tightening clinic.',
  keywords: 'loose skin after weight loss, body contouring, Ozempic loose skin, Wegovy loose skin, Mounjaro loose skin, body contouring Peterborough, non-surgical skin tightening, advanced skin tightening, post weight loss skin treatment, skinny jab loose skin',
  authors: [{ name: 'Skulpt Body Contouring' }],
  creator: 'Skulpt Body Contouring',
  publisher: 'Skulpt Body Contouring',
  openGraph: {
    title: 'Skulpt - Fix Loose Skin After Weight Loss | Peterborough',
    description: 'Lost weight with Ozempic or Mounjaro? Professional skin tightening treatment for loose skin. Peterborough\'s leading body contouring clinic.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Skulpt Body Contouring',
    url: 'https://skintight.uk',
    images: [
      {
        url: '/images/logo.webp',
        width: 1200,
        height: 630,
        alt: 'Skulpt Body Contouring - Advanced Skin Tightening'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skulpt - Fix Loose Skin After Weight Loss',
    description: 'Professional skin tightening treatment for post-weight loss loose skin. Peterborough\'s premier clinic.',
    images: ['/images/logo.webp']
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://skintight.uk'
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
      <head>
        {/* Facebook Pixel Code */}
        <script dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1337105897562752');
            fbq('track', 'PageView');
          `
        }} />
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1337105897562752&ev=PageView&noscript=1"
          />
        </noscript>
        
        {/* Force scroll to top on every page load/refresh - placed in head for early execution */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Immediately disable scroll restoration
            if ('scrollRestoration' in history) {
              history.scrollRestoration = 'manual';
            }
            // Force immediate scroll to top
            window.scrollTo(0, 0);
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        
        {/* Additional scroll fix for all scenarios */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Multiple strategies to ensure scroll to top
              
              // 1. Immediate execution
              window.scrollTo(0, 0);
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              
              // 2. On DOM ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                });
              } else {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }
              
              // 3. On full page load
              window.addEventListener('load', function() {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              });
              
              // 4. After a tiny delay to catch any late-loading content
              setTimeout(function() {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              }, 100);
              
              // 5. On page show (handles back button)
              window.addEventListener('pageshow', function(event) {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
              });
            })();
          `
        }} />
      </body>
    </html>
  )
}