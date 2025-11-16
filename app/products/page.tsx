'use client'

import { useState } from 'react'
import { ProductTable } from '@/components/products/ProductTable'
import { useProducts } from '@/lib/hooks/useProducts'
import CategoryFilter from '@/components/products/CategoryFilter'
import FloatingChat from '@/components/chat/FloatingChat'
import { DebugInfo } from '@/components/DebugInfo'
import Link from 'next/link'
import type { Product } from '@/lib/types/types'

export default function ProductsPage() {
  const { products, loading, error } = useProducts()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category))].sort()

  // Filter products by selected categories
  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(p => selectedCategories.includes(p.category))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-5xl font-black text-gray-800 tracking-tight uppercase bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Compare Protein Powders
          </h1>
          
          <div className="flex gap-3">
            <Link 
              href="/blog"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
            >
              Blog
            </Link>
            
            <Link 
              href="/contact"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="mb-8 w-full">
          <ul className="text-gray-700 leading-relaxed space-y-2">
            <li>🤓 Explore protein powder products from 20+ trusted brands.</li>
            <li>💪 Easily compare key price and macro information for each product to help you pick the best option.</li>
            <li>🥛 Filter by categories such as whey, vegan, protein water, and casein to narrow down your favourites.</li>
            <li>🏋🏻‍♀️ Sort by price, grams of protein per dollar, grams of protein per 100g, or calories/kilojoules per gram of protein to find what suits your goals.</li>
            <li className="flex items-start">
              <img
                src="https://hauisymevqhwoiciyjnz.supabase.co/storage/v1/object/sign/PROTEIN/20250616_2330_Cartoon%20Buff%20Quokka_simple_compose_01jxwevm5wfknsg52a59hj1xb5.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wZTdhY2RjZS05MzFjLTRmYjktYTE4NS1iMzRjZTUxYjUxNjYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJQUk9URUlOLzIwMjUwNjE2XzIzMzBfQ2FydG9vbiBCdWZmIFF1b2trYV9zaW1wbGVfY29tcG9zZV8wMWp4d2V2bTV3Zmtuc2c1MmE1OWhqMXhiNS5wbmciLCJpYXQiOjE3NjMyNzk2MjUsImV4cCI6MTg1Nzg4NzYyNX0.61-TKkj31PQZgDedslKx8x0DyqxUzsMHJtUGM340L3w"
                alt="Quokka assistant"
                className="w-5 h-5 mt-1 mr-2 shrink-0"
                loading="lazy"
                decoding="async"
              />
              <span>
                If you want any more information on ingredients, macros, comparison between products, or anything else, chat to our friendly quokka assistant in the chat box at the bottom right of your page!
              </span>
            </li>
          </ul>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />

        <ProductTable
          products={filteredProducts}
          loading={loading}
          error={error}
        />

        <FloatingChat />
        <DebugInfo />
      </div>
    </div>
  )
} 