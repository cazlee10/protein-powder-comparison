export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h1>
          
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-600">
              Have questions about protein powders or our recommendations?
            </p>
            <p className="text-lg text-gray-600">
              We'd love to hear from you!
            </p>
            
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <p className="text-sm text-gray-500 mb-2">Email us at:</p>
              <a 
                href="mailto:caroline.proteinpowder@gmail.com"
                className="text-2xl font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200"
              >
                caroline.proteinpowder@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

