import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  weight: number;
  protein_per_100g: number;
  serving_size: number;
  image_url: string;
  price_per_kg: number;
  protein_per_dollar: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 w-full">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="text-sm text-indigo-600 font-medium mb-1">{product.category}</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div>
              <span className="text-gray-500">Weight: </span>
              <span className="font-medium">{product.weight}kg</span>
            </div>
            <div>
              <span className="text-gray-500">Protein: </span>
              <span className="font-medium">{product.protein_per_100g}g/100g</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <span className="text-2xl font-bold text-indigo-600">${product.price.toFixed(2)}</span>
              <div className="text-xs text-gray-500">${product.price_per_kg.toFixed(2)}/kg</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-green-600">{product.protein_per_dollar.toFixed(1)}g/$</div>
              <div className="text-xs text-gray-500">protein per dollar</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 