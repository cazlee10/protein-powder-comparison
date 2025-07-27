import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Script from 'next/script'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Protein Powder Helper - Compare Protein Powders & Find Best Value',
  description: 'Compare protein powder products, prices, and nutrition facts. Find the best protein powder for your needs with our comprehensive comparison tool.',
  keywords: 'protein powder, protein supplements, whey protein, protein comparison, best protein powder, protein powder prices, protein nutrition facts',
  authors: [{ name: 'Protein Powder Helper' }],
  creator: 'Protein Powder Helper',
  publisher: 'Protein Powder Helper',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://proteinpowderhelper.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Protein Powder Helper - Compare Protein Powders & Find Best Value',
    description: 'Compare protein powder products, prices, and nutrition facts. Find the best protein powder for your needs.',
    url: 'https://proteinpowderhelper.com',
    siteName: 'Protein Powder Helper',
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Protein Powder Helper - Compare Protein Powders',
    description: 'Compare protein powder products and find the best value for your needs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+xWSsbCUaznN8gNuO9nZjg"
          strategy="afterInteractive"
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="sUvPxPTzL5a4T+rI0PnFFw"
          strategy="afterInteractive"
        />
        <script 
          src="https://analytics.ahrefs.com/analytics.js" 
          data-key="sUvPxPTzL5a4T+rI0PnFFw" 
          async
        />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 