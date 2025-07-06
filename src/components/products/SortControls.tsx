import { useState } from 'react'

type SortOption = 'price' | 'proteinPerServing' | 'proteinPerDollar' | 'rating'

interface SortControlsProps {
  onSort: (option: SortOption) => void
}

export function SortControls({ onSort }: SortControlsProps) {
  const [activeSort, setActiveSort] = useState<SortOption>('price')

  const handleSort = (option: SortOption) => {
    setActiveSort(option)
    onSort(option)
  }

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => handleSort('price')}
        className={`px-4 py-2 rounded ${
          activeSort === 'price' 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Price per kg
      </button>
      <button
        onClick={() => handleSort('proteinPerServing')}
        className={`px-4 py-2 rounded ${
          activeSort === 'proteinPerServing'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Protein per Serving
      </button>
      <button
        onClick={() => handleSort('proteinPerDollar')}
        className={`px-4 py-2 rounded ${
          activeSort === 'proteinPerDollar'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Value for Money
      </button>
      <button
        onClick={() => handleSort('rating')}
        className={`px-4 py-2 rounded ${
          activeSort === 'rating'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 hover:bg-gray-200'
        }`}
      >
        Rating
      </button>
    </div>
  )
} 