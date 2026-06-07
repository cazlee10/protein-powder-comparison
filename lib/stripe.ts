import Stripe from 'stripe'

function createStripeClient() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error('Missing STRIPE_SECRET_KEY')
  }
  return new Stripe(key, { apiVersion: '2026-05-27.dahlia' })
}

let stripe: ReturnType<typeof createStripeClient> | null = null

export function getStripe() {
  if (!stripe) {
    stripe = createStripeClient()
  }
  return stripe
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}
