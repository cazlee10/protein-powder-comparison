import Link from 'next/link'
import DonateForm from '@/components/donate/DonateForm'
import { DONATE_CURRENCY } from '@/lib/config/site'
import { isStripeConfigured } from '@/lib/stripe'

type DonatePageProps = {
  searchParams: Promise<{ cancelled?: string }>
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const { cancelled } = await searchParams
  const stripeReady = isStripeConfigured()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Support This Site
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            This comparison tool is free to use. If you find it helpful, a small donation helps keep it running and up to date.
          </p>

          <ul className="text-gray-700 leading-relaxed space-y-3 mb-10 max-w-xl mx-auto">
            <li>Keep product prices and macros current across 20+ brands</li>
            <li>Host and maintain the comparison tools and chat assistant</li>
            <li>Publish new blog content and guides</li>
          </ul>

          {stripeReady ? (
            <DonateForm currency={DONATE_CURRENCY} cancelled={cancelled === '1'} />
          ) : (
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 max-w-xl mx-auto">
              <p className="text-gray-600 mb-4">
                Online donations are not configured yet. Add your Stripe keys to enable payments, or reach out directly:
              </p>
              <a
                href="mailto:caroline.proteinpowder@gmail.com"
                className="text-xl font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200"
              >
                caroline.proteinpowder@gmail.com
              </a>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-200"
            >
              ← Back to product comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
