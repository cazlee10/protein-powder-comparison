import ChatInterface from '@/components/chat/ChatInterface'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Protein Powder AI Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ask about ingredients, nutrition facts, pricing, or get personalized recommendations
        </p>
        <ChatInterface />
      </div>
    </div>
  )
} 