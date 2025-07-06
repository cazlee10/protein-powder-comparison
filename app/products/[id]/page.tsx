'use client'

import { useEffect, useState } from 'react'
import supabase from '@/lib/supabase/client'
import { Product } from '@/lib/types/types'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', params.id)
          .single()

        if (error) throw error
        setProduct(data)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">
          {error || 'Product not found'}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <img
                  src={product.imageUrl || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <div className="text-gray-600 mb-4">
                  <p>Brand: {product.brand}</p>
                  <p>Price: ${product.price?.toFixed(2)}</p>
                  <p>Weight: {product.weight}kg</p>
                  <p>Protein per serving: {product.proteinPerServing}g</p>
                  <p>Calories per serving: {product.caloriesPerServing}</p>
                  <p>Serving size: {product.servingSize}g</p>
                  <p>Price per kg: ${product.pricePerKg?.toFixed(2)}</p>
                  <p>Protein per dollar: {product.proteinPerDollar?.toFixed(1)}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 