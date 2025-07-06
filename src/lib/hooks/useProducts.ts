import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import type { Product } from '@/lib/types/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, reviews(rating)')
        
        if (error) throw error

        const productsWithMetrics = data.map(product => {
          const pricePerKg = product.price / product.weight
          return {
            ...product,
            pricePerKg,
            costPer100Gram: pricePerKg/(product.protein_per_100g * 10)*100,
            imageUrl: product.image_url,
            category: product.category,
            averageRating: calculateAverageRating(product.reviews),
            totalReviews: product.reviews?.length || 0
          }
        })

        setProducts(productsWithMetrics)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return { products, loading, error }
}

function calculateAverageRating(reviews: any[]) {
  if (!reviews?.length) return 0
  return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
} 