import Image from 'next/image'
import Link from 'next/link'
import { StarIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import type { Product } from '@/lib/types/types'

interface ProductTableProps {
  products: Product[]
  onSort: (column: string, direction: 'asc' | 'desc') => void
  sortColumn: string
  sortDirection: 'asc' | 'desc'
}

export function ProductTable({ products, onSort, sortColumn, sortDirection }: ProductTableProps) {
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === 'asc' ? 
      <ChevronUpIcon className="w-2 h-2 md:w-4 md:h-4 ml-1" /> : 
      <ChevronDownIcon className="w-2 h-2 md:w-4 md:h-4 ml-1" />
  }

  const handleSort = (column: string) => {
    const newDirection = 
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(column, newDirection)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 text-xs md:text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider w-1/2 md:w-auto">
              Product
            </th>
            <th 
              className="px-1 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/6 md:w-auto"
              onClick={() => handleSort('price_per_kg')}
            >
              <div className="flex items-center">
                Price/kg
                {renderSortIcon('price_per_kg')}
              </div>
            </th>
            <th 
              className="px-1 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/6 md:w-auto"
              onClick={() => handleSort('protein_per_100g')}
            >
              <div className="flex items-center">
                Protein/100g
                {renderSortIcon('protein_per_100g')}
              </div>
            </th>
            <th 
              className="px-1 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer w-1/6 md:w-auto"
              onClick={() => handleSort('Kilojoules_per_serving')}
            >
              <div className="flex items-center">
                kJ/Serving
                {renderSortIcon('Kilojoules_per_serving')}
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-1 md:px-6 py-1 md:py-4">
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center"
                >
                  <div className="h-8 w-8 md:h-20 md:w-20 flex-shrink-0">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="object-cover md:w-20 md:h-20"
                      />
                    ) : (
                      <div className="h-8 w-8 md:h-20 md:w-20 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No img</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-1 md:ml-4 min-w-0 flex-1">
                    <div className="text-xs md:text-sm font-medium text-gray-900 truncate">{product.name}</div>
                    <div className="text-xs md:text-sm text-gray-500 truncate">{product.brand}</div>
                  </div>
                </a>
              </td>
              <td className="px-1 md:px-6 py-1 md:py-4 text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-900">${product.price_per_kg.toFixed(2)}</div>
              </td>
              <td className="px-1 md:px-6 py-1 md:py-4 text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-900">{product.protein_per_100g}g</div>
              </td>
              <td className="px-1 md:px-6 py-1 md:py-4 text-center md:text-left">
                <div className="text-xs md:text-sm text-gray-900">
                  {product.Kilojoules_per_serving || 0}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 