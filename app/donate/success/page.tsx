import Link from 'next/link'

export default function DonateSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="text-5xl mb-4" aria-hidden="true">
            🙏
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Your donation means a lot. It helps keep this protein comparison tool free and up to date for everyone.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Back to product comparison
          </Link>
        </div>
      </div>
    </div>
  )
}
