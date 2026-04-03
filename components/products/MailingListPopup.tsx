'use client'

import { useEffect, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const STORAGE_KEY = 'protein_compare_mailing_popup_done'

export default function MailingListPopup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (window.localStorage.getItem(STORAGE_KEY)) return
      const t = window.setTimeout(() => setOpen(true), 600)
      return () => window.clearTimeout(t)
    } catch {
      setOpen(true)
    }
  }, [])

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    setOpen(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/mailing-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMessage(typeof data.error === 'string' ? data.error : 'Something went wrong.')
        return
      }
      setStatus('success')
      setMessage(typeof data.message === 'string' ? data.message : 'Thanks — you are subscribed!')
      try {
        window.localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
      window.setTimeout(() => setOpen(false), 2200)
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mailing-list-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={dismiss}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          aria-label="Dismiss"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2
          id="mailing-list-title"
          className="pr-10 text-xl font-bold tracking-tight text-gray-900"
        >
          Join our mailing list
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Hear about new deals and updates — we will only use your email for that.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label htmlFor="mailing-list-email" className="sr-only">
            Email address
          </label>
          <input
            id="mailing-list-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            disabled={status === 'loading'}
          />
          {message && (
            <p
              className={
                status === 'error' ? 'text-sm text-red-600' : 'text-sm text-green-700'
              }
            >
              {message}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex-1 min-w-[8rem] rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
            >
              {status === 'loading' ? 'Joining…' : 'Subscribe'}
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
            >
              Not now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
