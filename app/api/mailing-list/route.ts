import { NextResponse } from 'next/server'
import { getServiceRoleClient } from '@/lib/supabase/service'

function isValidEmail(email: string): boolean {
  const t = email.trim()
  if (t.length > 254) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const supabase = getServiceRoleClient()
    const { error } = await supabase.from('mailing_list_signups').insert({
      email,
      source: 'products_page',
    })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ ok: true, message: 'You are already on the list.' })
      }
      console.error('mailing_list_signups insert:', error)
      return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, message: 'Thanks — you are subscribed!' })
  } catch (e) {
    console.error('mailing-list POST:', e)
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
