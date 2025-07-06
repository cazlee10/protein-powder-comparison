'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function SupabaseTest() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('Testing Supabase connection...')
        setStatus('Testing connection...')

        // Test if we can access Supabase URL
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
          throw new Error('Supabase URL not found')
        }

        // Try a simple query
        const { data, error } = await supabase
          .from('products')
          .select('count')
          .limit(1)

        if (error) {
          throw error
        }

        setStatus('Connection successful!')
        console.log('Connection successful, data:', data)
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        setStatus(`Error: ${message}`)
        console.error('Connection error:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="p-4 m-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Supabase Connection Test</h2>
      <p className="text-gray-700">{status}</p>
    </div>
  )
} 