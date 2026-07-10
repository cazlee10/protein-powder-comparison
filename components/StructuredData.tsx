'use client'

import { SITE_URL } from '@/lib/config/site'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Protein Powder Helper",
    "description": "Compare protein powder products, prices, and nutrition facts. Find the best protein powder for your needs.",
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/products?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      SITE_URL
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
} 