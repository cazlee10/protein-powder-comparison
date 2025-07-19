import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Protein Powder Directory',
  description: 'Compare protein powder products and find the best value for your needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="+xWSsbCUaznN8gNuO9nZjg"
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