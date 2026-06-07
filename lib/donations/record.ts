import { getServiceRoleClient } from '@/lib/supabase/service'

export type DonationRecord = {
  stripeCheckoutSessionId: string
  stripePaymentIntentId: string | null
  amountCents: number
  currency: string
  donorEmail: string | null
}

function formatAmount(amountCents: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amountCents / 100)
  } catch {
    return `${(amountCents / 100).toFixed(2)} ${currency.toUpperCase()}`
  }
}

async function sendDonationEmail(donation: DonationRecord): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const to = process.env.DONATION_NOTIFY_EMAIL ?? 'caroline.proteinpowder@gmail.com'
  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
  const amount = formatAmount(donation.amountCents, donation.currency)
  const donor = donation.donorEmail ?? 'Anonymous (no email provided)'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New donation received: ${amount}`,
      html: `
        <p>You received a new donation on your protein powder comparison site.</p>
        <ul>
          <li><strong>Amount:</strong> ${amount}</li>
          <li><strong>Donor email:</strong> ${donor}</li>
          <li><strong>Stripe session:</strong> ${donation.stripeCheckoutSessionId}</li>
        </ul>
      `,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('donation notify email failed:', res.status, detail)
  }
}

export async function recordDonation(donation: DonationRecord): Promise<'inserted' | 'duplicate'> {
  const supabase = getServiceRoleClient()

  const { error } = await supabase.from('donations').insert({
    stripe_checkout_session_id: donation.stripeCheckoutSessionId,
    stripe_payment_intent_id: donation.stripePaymentIntentId,
    amount_cents: donation.amountCents,
    currency: donation.currency.toLowerCase(),
    donor_email: donation.donorEmail,
    status: 'completed',
  })

  if (error) {
    if (error.code === '23505') {
      return 'duplicate'
    }
    throw error
  }

  await sendDonationEmail(donation).catch((e) => {
    console.error('donation notify email:', e)
  })

  return 'inserted'
}
