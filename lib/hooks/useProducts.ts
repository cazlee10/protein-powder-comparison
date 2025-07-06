'use client'

import { useState, useEffect } from 'react'
import supabase from '@/lib/supabase/client'
import { Product } from '@/lib/types/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            brand,
            price,
            weight,
            protein_per_100g,
            serving_size,
            image_url,
            price_per_kg,
            Kilojoules_per_serving,
            category,
            link
          `)

        if (error) throw error

        setProducts(data || [])
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch products'))
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
} 