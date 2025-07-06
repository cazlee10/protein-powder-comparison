'use client'
import { useEffect, useState } from 'react'
import type { Product } from '@/lib/types/types'
import { ProductCard } from './ProductCard'
import { supabase, checkSupabaseConnection, testSupabaseQuery } from '@/lib/supabase/client'
import React from 'react'

interface ProductGridProps {
  featured?: boolean
}

export default function ProductGrid({ featured = false }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        console.log('ProductGrid: Starting to load products...')
        
        // Check connection first
        const isConnected = await checkSupabaseConnection()
        if (!isConnected) {
          console.error('ProductGrid: Database connection failed')
          throw new Error('Unable to connect to database')
        }

        // Try test query first
        const testResult = await testSupabaseQuery()
        if (!testResult.success) {
          console.error('ProductGrid: Test query failed:', testResult.error)
          throw new Error('Database test query failed')
        }

        let query = supabase
          .from('products')
          .select('*, reviews(rating)')
          
        if (featured) {
          query = query.limit(4)
        }

        const { data, error } = await query

        if (error) {
          console.error('ProductGrid: Query error:', error)
          throw error
        }

        console.log('ProductGrid: Successfully loaded products:', data?.length)
        setProducts(data as Product[])
      } catch (err) {
        console.error('Error loading products:', err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [featured])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!products.length) {
    return <div>No products found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
} 