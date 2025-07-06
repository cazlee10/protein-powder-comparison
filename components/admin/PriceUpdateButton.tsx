'use client'

import { useState } from 'react'
import supabase from '@/lib/supabase/client'

export function PriceUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState<string | null>(null)

  const updatePrices = async () => {
    setIsUpdating(true)
    setStatus('Starting price update...')
    setError(null)
    
    try {
      const response = await fetch('/api/update-prices', {
        method: 'POST',
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to update prices')
      }

      setStatus(`Updated ${data.summary.updated} of ${data.summary.total} products`)
    } catch (err) {
      console.error('Error updating prices:', err)
      setError(err instanceof Error ? err.message : 'Failed to update prices')
      setStatus('Failed to update prices')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <button
        onClick={updatePrices}
        disabled={isUpdating}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isUpdating ? 'Updating Prices...' : 'Update Prices'}
      </button>
      {status && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
          {status}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          Error: {error}
        </p>
      )}
    </div>
  )
}