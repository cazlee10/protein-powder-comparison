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
        console.log('useProducts: Starting to fetch products...')
        
        // Check if Supabase client is properly initialized
        if (!supabase) {
          throw new Error('Supabase client not initialized')
        }

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

        if (error) {
          console.error('useProducts: Supabase error:', error)
          throw error
        }

        console.log('useProducts: Successfully fetched products:', data?.length)
        setProducts(data || [])
        setError(null)
      } catch (err) {
        console.error('useProducts: Error details:', {
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
        
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products'
        setError(new Error(`Failed to fetch products: ${errorMessage}`))
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
} 