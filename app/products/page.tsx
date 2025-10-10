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