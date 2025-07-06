import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/types/types'
import { StarIcon } from '@heroicons/react/20/solid'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link 
      href={`/products/${product.id}`}
      className="group relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
    >
      {product.image_url ? (
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg">
          <Image
            src={product.image_url}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        


        <div className="mt-2">
          <p className="text-sm font-medium text-gray-900">
            ${product.price.toFixed(2)} / kg
          </p>
          <p className="text-sm text-gray-500">
            {product.protein_per_100g}g protein per 100g
          </p>
        </div>
      </div>
    </Link>
  )
} 