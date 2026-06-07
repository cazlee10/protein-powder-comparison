import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { recordDonation } from '@/lib/donations/record'

export const runtime = 'nodejs'

type CheckoutSession = {
  id: string
  payment_status: string
  amount_total: number | null
  currency: string | null
  payment_intent?: string | { id: string } | null
  customer_details?: { email?: string | null } | null
  customer_email?: string | null
}

function paymentIntentId(session: CheckoutSession): string | null {
  const pi = session.payment_intent
  if (!pi) return null
  return typeof pi === 'string' ? pi : pi.id
}

async function handleCheckoutCompleted(session: CheckoutSession) {
  if (session.payment_status !== 'paid') return

  const amountCents = session.amount_total
  const currency = session.currency

  if (amountCents == null || !currency) {
    console.error('donate webhook: missing amount or currency on session', session.id)
    return
  }

  await recordDonation({
    stripeCheckoutSessionId: session.id,
    stripePaymentIntentId: paymentIntentId(session),
    amountCents,
    currency,
    donorEmail: session.customer_details?.email ?? session.customer_email ?? null,
  })
}

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('donate webhook: missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 503 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  let event: { type: string; data: { object: CheckoutSession } }

  try {
    const body = await req.text()
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as {
      type: string
      data: { object: CheckoutSession }
    }
  } catch (e) {
    console.error('donate webhook signature:', e)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
      default:
        break
    }
  } catch (e) {
    console.error('donate webhook handler:', e)
    return NextResponse.json({ error: 'Webhook handler failed.' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
