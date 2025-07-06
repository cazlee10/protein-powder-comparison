'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({ categories, selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCategoryToggle = (category: string) => {
    const newSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category]
    onCategoryChange(newSelectedCategories)
  }

  const handleSelectAll = () => {
    onCategoryChange([])
  }

  const selectedCount = selectedCategories.length
  const displayText = selectedCount === 0 
    ? 'All Categories' 
    : selectedCount === 1 
      ? selectedCategories[0]
      : `${selectedCount} Categories`

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3">Filter by Category</h2>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full max-w-xs px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <span className="text-sm font-medium text-gray-700">{displayText}</span>
          <ChevronDownIcon 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
              <button
                onClick={handleSelectAll}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                  selectedCategories.length === 0
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                  selectedCategories.length === 0 ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}>
                  {selectedCategories.length === 0 && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>
                All Categories
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors hover:bg-gray-50"
                >
                  <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                    selectedCategories.includes(category) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                  }`}>
                    {selectedCategories.includes(category) && (
                      <CheckIcon className="w-3 h-3 text-white" />
                    )}
                  </div>
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 