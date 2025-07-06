'use client'

import { useState } from 'react'
import supabase from '@/lib/supabase/client'

export function PriceUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [details, setDetails] = useState<string | null>(null)

  const updatePrices = async () => {
    setIsUpdating(true)
    setStatus('Starting price update...')
    setError(null)
    setDetails(null)
    
    try {
      const response = await fetch('/api/update-prices', {
        method: 'POST',
      })

      const data = await response.json()
      
      if (!data.success) {
        // Handle Python availability issues specially
        if (data.error && data.error.includes('Python is not available')) {
          setError('Price updates are not available in this environment')
          setDetails(data.note || 'This feature requires Python which is not available on this hosting platform.')
          if (data.alternative) {
            setDetails(prev => prev + ' ' + data.alternative)
          }
        } else {
          throw new Error(data.error || 'Failed to update prices')
        }
        return
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {isUpdating ? 'Updating Prices...' : 'Update Prices'}
      </button>
      {status && (
        <p className={`mt-2 text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
          {status}
        </p>
      )}
      {error && (
        <div className="mt-2 text-sm text-red-600">
          <p className="font-semibold">Error: {error}</p>
          {details && (
            <p className="mt-1 text-xs text-gray-600">{details}</p>
          )}
        </div>
      )}
    </div>
  )
}