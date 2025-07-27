'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatHistory {
  role: 'user' | 'model'
  content: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const suggestionQuestions = [
    "What protein powders are dairy-free?",
    "Which products have the cleanest ingredients?",
    "Compare the ingredients of MyProtein and Optimum Nutrition",
    "Are there any products with artificial sweeteners?",
  ]

  const handleSuggestionClick = (question: string) => {
    setInput(question)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          history: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            content: msg.content
          })) as ChatHistory[]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response from server')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      if (!data.response) {
        throw new Error('No response received from the AI')
      }

      const assistantMessage: Message = { role: 'assistant', content: data.response }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      setError(error instanceof Error ? error.message : 'Failed to get response')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[600px] max-w-2xl mx-auto border rounded-lg shadow-lg bg-white text-black android-chat-container">
      {messages.length === 0 && (
        <div className="p-4 bg-gray-50">
          <h3 className="text-sm font-medium text-black mb-2">
            Suggested questions:
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestionQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(question)}
                className="text-sm bg-white text-black px-3 py-1 rounded-full border hover:bg-gray-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white android-chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
              ) : (
                message.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-black rounded-lg p-3">
              Analyzing ingredients and products...
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-100 text-red-800 rounded-lg p-3">
              {error}
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t bg-white android-chat-input">
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about ingredients, nutrition, or pricing..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-500 android-input-field"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @media screen and (max-width: 768px) {
            .android-chat-container {
              height: calc(100vh - 2rem);
              max-height: calc(100vh - 2rem);
              margin: 1rem;
            }
            
            .android-chat-messages {
              flex: 1;
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
            }
            
            .android-chat-input {
              position: sticky;
              bottom: 0;
              background: white;
              z-index: 10;
              padding-bottom: env(safe-area-inset-bottom);
            }
            
            .android-input-field {
              font-size: 16px; /* Prevents zoom on iOS */
            }
          }
          
          /* Android-specific fixes */
          @media screen and (max-width: 768px) and (orientation: portrait) {
            .android-chat-container {
              height: calc(100vh - 2rem);
              max-height: calc(100vh - 2rem);
            }
          }
          
          /* Ensure input stays visible on Android */
          @supports (-webkit-touch-callout: none) {
            /* iOS devices */
            .android-chat-input {
              padding-bottom: calc(1rem + env(safe-area-inset-bottom));
            }
          }
          
          @supports not (-webkit-touch-callout: none) {
            /* Android devices */
            .android-chat-input {
              padding-bottom: 1rem;
            }
          }
        `
      }} />
    </div>
  )
}