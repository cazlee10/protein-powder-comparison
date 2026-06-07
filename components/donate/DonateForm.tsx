'use client'

import { useState } from 'react'
import { DONATE_PRESET_AMOUNTS } from '@/lib/config/site'

type DonateFormProps = {
  currency: string
  cancelled?: boolean
}

function formatCurrency(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `$${amount}`
  }
}

export default function DonateForm({ currency, cancelled = false }: DonateFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(10)
  const [customAmount, setCustomAmount] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const resolvedAmount =
    selectedAmount === 'custom' ? Number.parseFloat(customAmount) : selectedAmount

  async function handleDonate() {
    setStatus('loading')
    setMessage('')

    if (!Number.isFinite(resolvedAmount) || resolvedAmount <= 0) {
      setStatus('error')
      setMessage('Please enter a valid donation amount.')
      return
    }

    try {
      const res = await fetch('/api/donate/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: resolvedAmount }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok || typeof data.url !== 'string') {
        setStatus('error')
        setMessage(typeof data.error === 'string' ? data.error : 'Something went wrong.')
        return
      }

      window.location.href = data.url
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      {cancelled && (
        <p className="mb-6 text-center text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          Checkout was cancelled. You can try again whenever you like.
        </p>
      )}

      <p className="text-sm text-gray-500 text-center mb-4">Choose an amount</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {DONATE_PRESET_AMOUNTS.map((amount) => (
          <button
            key={amount}
            type="button"
            onClick={() => setSelectedAmount(amount)}
            className={`px-4 py-3 rounded-lg font-semibold border-2 transition-all duration-200 ${
              selectedAmount === amount
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
            }`}
          >
            {formatCurrency(amount, currency)}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setSelectedAmount('custom')}
          className={`w-full px-4 py-3 rounded-lg font-semibold border-2 text-left transition-all duration-200 ${
            selectedAmount === 'custom'
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
          }`}
        >
          Custom amount
        </button>
        {selectedAmount === 'custom' && (
          <div className="mt-3">
            <label htmlFor="custom-amount" className="sr-only">
              Custom donation amount
            </label>
            <input
              id="custom-amount"
              type="number"
              min="1"
              max="1000"
              step="0.01"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={handleDonate}
          disabled={status === 'loading'}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        >
          {status === 'loading' ? 'Redirecting to Stripe…' : 'Donate with Stripe'}
        </button>

        {message && (
          <p className="mt-4 text-sm text-red-600" role="alert">
            {message}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-4">
          Secure payment processed by Stripe. Minimum $1, maximum $1,000.
        </p>
      </div>
    </div>
  )
}
