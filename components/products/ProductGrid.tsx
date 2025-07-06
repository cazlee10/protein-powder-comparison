'use client'

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import supabase from '@/src/lib/supabase/client';

interface ProductGridProps {
  featured?: boolean;
}

export default function ProductGrid({ featured = false }: ProductGridProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
            protein_per_dollar,
            category
          `);

        if (error) {
          console.error('Supabase query error:', {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          setError('Error loading products. Please try again later.');
          return;
        }

        if (!data?.length) {
          setError('No products found. Please check back later.');
          return;
        }

        setProducts(data);
      } catch (err) {
        console.error('Unexpected error in ProductGrid:', err);
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-md">
        {error}
      </div>
    );
  }

  // If featured is true, just show the first 3 products with highest protein per dollar
  const displayProducts = featured 
    ? [...products]
        .sort((a, b) => b.protein_per_dollar - a.protein_per_dollar)
        .slice(0, 3)
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
} 