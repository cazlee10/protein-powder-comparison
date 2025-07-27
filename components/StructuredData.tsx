'use client'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Protein Powder Helper",
    "description": "Compare protein powder products, prices, and nutrition facts. Find the best protein powder for your needs.",
    "url": "https://proteinpowderhelper.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://proteinpowderhelper.com/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://proteinpowderhelper.com"
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