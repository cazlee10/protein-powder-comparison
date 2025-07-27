'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  weight: number
  protein_per_100g: number
  serving_size: number
  image_url: string
  price_per_kg: number
  Kilojoules_per_serving: number
  category: string
  link: string
  is_natural: boolean
}

interface ProductTableProps {
  products: Product[]
  loading?: boolean
  error?: Error | null
}

type SortField = 'price' | 'protein_per_100g' | 'price_per_kg' | 'Kilojoules_per_serving' | 'protein_per_dollar'

export function ProductTable({ products, loading, error }: ProductTableProps) {
  const [sortField, setSortField] = useState<SortField>('price_per_kg')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error loading products: {error.message}</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>No products found.</p>
      </div>
    )
  }

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedProducts = [...products].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1
    if (sortField === 'protein_per_dollar') {
      const aValue = (a.protein_per_100g * 10) / a.price_per_kg
      const bValue = (b.protein_per_100g * 10) / b.price_per_kg
      return (aValue - bValue) * multiplier
    }
    return (a[sortField] - b[sortField]) * multiplier
  })

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null
    return sortDirection === 'asc' ? (
      <ChevronUpIcon className="w-2 h-2 md:w-4 md:h-4 inline ml-1" />
    ) : (
      <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4 inline ml-1" />
    )
  }

  const handleRowClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }

  const handleImageError = (productId: string) => {
    setFailedImages(prev => new Set(prev).add(productId))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 text-xs md:text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-16 md:w-48">
              Image
            </th>
            <th scope="col" className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-24 md:w-48">
              Product
            </th>
            <th scope="col" className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-20 md:w-24">
              Category
            </th>
            <th 
              scope="col" 
              className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-20 md:w-24"
              onClick={() => handleSort('price_per_kg')}
            >
              Price {renderSortIcon('price_per_kg')}
            </th>
            <th 
              scope="col" 
              className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-20 md:w-24"
              onClick={() => handleSort('protein_per_100g')}
            >
              Protein {renderSortIcon('protein_per_100g')}
            </th>
            <th 
              scope="col" 
              className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-20 md:w-24"
              onClick={() => handleSort('Kilojoules_per_serving')}
            >
              kJ {renderSortIcon('Kilojoules_per_serving')}
            </th>
            <th 
              scope="col" 
              className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-20 md:w-24"
              onClick={() => handleSort('protein_per_dollar')}
            >
              Protein/$ {renderSortIcon('protein_per_dollar')}
            </th>
            <th scope="col" className="px-1 md:px-6 py-2 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-20 md:w-24">
              <div className="break-words leading-tight">
                Artificial<br />Sweeteners
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => {
            const proteinPerDollar = (product.protein_per_100g * 10) / product.price_per_kg
            return (
            <tr 
              key={product.id} 
              className="hover:bg-gray-50 cursor-pointer" 
              onClick={() => handleRowClick(product.link)}
            >
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="relative h-12 w-12 md:h-56 md:w-56 mx-auto">
                  {!failedImages.has(product.id) ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="object-contain rounded-lg md:w-56 md:h-56"
                      onError={() => handleImageError(product.id)}
                      unoptimized
                    />
                  ) : (
                    <div className="h-12 w-12 md:h-56 md:w-56 flex items-center justify-center bg-gray-100 rounded-lg">
                      <span className="text-gray-400 text-xs md:text-sm">No img</span>
                    </div>
                  )}
                </div>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="text-xs md:text-sm font-medium text-gray-900 group-hover:text-indigo-600 break-words">
                  {product.name}
                </div>
                <div className="text-xs md:text-sm text-gray-500 break-words">{product.brand}</div>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <span className="px-1 md:px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 break-words">
                  {product.category}
                </span>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="text-xs md:text-sm text-gray-900 break-words">${product.price.toFixed(2)}</div>
                <div className="text-xs text-gray-500 break-words">${product.price_per_kg.toFixed(2)}/kg</div>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-900 break-words">
                {product.protein_per_100g}g
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="text-xs md:text-sm text-gray-900 break-words">
                  {product.Kilojoules_per_serving} kJ
                </div>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="text-xs md:text-sm text-gray-900 break-words">
                  {proteinPerDollar.toFixed(1)}g
                </div>
              </td>
              <td className="px-1 md:px-6 py-2 md:py-4">
                <div className="text-xs md:text-sm text-gray-900 break-words">
                  <span 
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.is_natural 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                    title={product.is_natural ? 'No artificial sweeteners' : 'Contains artificial sweeteners'}
                  >
                    {product.is_natural ? 'No' : 'Yes'}
                  </span>
                </div>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
} 