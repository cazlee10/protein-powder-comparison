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
      <ChevronUpIcon className="w-4 h-4 ml-1" /> : 
      <ChevronDownIcon className="w-4 h-4 ml-1" />
  }

  const handleSort = (column: string) => {
    const newDirection = 
      sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(column, newDirection)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('price_per_kg')}
            >
              <div className="flex items-center">
                Price/kg
                {renderSortIcon('price_per_kg')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              onClick={() => handleSort('protein_per_100g')}
            >
              <div className="flex items-center">
                Protein/100g
                {renderSortIcon('protein_per_100g')}
              </div>
            </th>
            <th 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
              <td className="px-6 py-4 whitespace-nowrap">
                <a 
                  href={product.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center"
                >
                  <div className="h-20 w-20 flex-shrink-0">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.brand}</div>
                  </div>
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">${product.price_per_kg.toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.protein_per_100g}g</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {product.Kilojoules_per_serving || 0} kJ
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 