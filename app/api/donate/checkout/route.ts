import { NextResponse } from 'next/server'
import { getStripe, isStripeConfigured } from '@/lib/stripe'
import { DONATE_CURRENCY, SITE_URL } from '@/lib/config/site'

const MIN_AMOUNT_CENTS = 100
const MAX_AMOUNT_CENTS = 100_000

function getOrigin(req: Request): string {
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  if (host) return `${proto}://${host}`
  return SITE_URL
}

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: 'Donations are not configured yet.' }, { status: 503 })
  }

  try {
    const body = await req.json()
    const amount = typeof body?.amount === 'number' ? body.amount : Number(body?.amount)

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Please enter a valid donation amount.' }, { status: 400 })
    }

    const amountCents = Math.round(amount * 100)

    if (amountCents < MIN_AMOUNT_CENTS) {
      return NextResponse.json({ error: 'Minimum donation is $1.' }, { status: 400 })
    }

    if (amountCents > MAX_AMOUNT_CENTS) {
      return NextResponse.json({ error: 'Maximum donation is $1,000.' }, { status: 400 })
    }

    const origin = getOrigin(req)
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: DONATE_CURRENCY,
            product_data: {
              name: 'Donation — Protein Powder Comparison',
              description: 'Thank you for supporting this site!',
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate?cancelled=1`,
    })

    if (!session.url) {
      return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (e) {
    console.error('donate checkout:', e)
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
  }
}
