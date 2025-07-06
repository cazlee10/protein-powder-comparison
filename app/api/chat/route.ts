import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import supabase from '@/lib/supabase/client'

// Validate API key without exposing its value
if (!process.env.GOOGLE_AI_API_KEY) {
  console.error('GOOGLE_AI_API_KEY is not set!')
  throw new Error('Missing GOOGLE_AI_API_KEY environment variable')
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '')

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      )
    }

    // Fetch product data
    const { data: products } = await supabase
      .from('products')
      .select('*')

    if (!products) {
      throw new Error('Failed to fetch product data')
    }

    // Create product context
    const productContext = products
      .map(
        (p) =>
          `${p.name} (${p.brand})
           - Price: $${p.price.toFixed(2)}
           - Weight: ${p.weight}kg
           - Protein per 100g: ${p.protein_per_100g}g
           - Kilojoules per serving: ${p.Kilojoules_per_serving}kJ
           - Category: ${p.category}
           - Ingredients: ${p.ingredients || 'Not specified'}
           `
      )
      .join('\n\n')

    // Convert history to Gemini format
    const chatHistory = messages.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }))

    // Initialize chat model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    // Start chat with context
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: `Here is the product database information to use for answering questions:
            ${productContext}
            
            As an AI assistant, you should:
            1. Focus on providing accurate product information
            2. Compare products when relevant
            3. Highlight important nutritional information
            4. Mention any allergens or dietary considerations
            5. Stay factual and use only the provided product data
            6. Provide responses with clear, easy to read text formatting, including line breaks
            7. Compare differences in price and value (protein per dollar) where appropriate
            8. Use a friendly 'aussie' tone, using australian slang and colloquialisms such as those listed below (where possible); 
              BLOW YOUR DOUGH - spend all your money
              BLOODY OATH – yes; or it's true.
              BLOODY RIPPER - really awesome
              BIT OF A YARN - have a chat together
              BEAUT - very good
              BEAT AROUND THE BUSH - saying a lot without much meaning
              BLOODY – Very. Used to extenuate a point
              BONZER - awesome
              BUGGER ALL - to have nothing
              GIVE IT A BURL - to give it a try 
              CAT'S PYJAMAS - very special
              CHIN WAG - a long talk
              CHOCKERS - full up
              DIDN'T COME DOWN IN THE LAST SHOWER - not easily duped
              DON'T GET YOUR KNICKERS IN A KNOT - don't get upset
              DOUGH - money
              FAIR DINKUM – true, good              FLAT OUT LIKE A LIZARD DRINKING - busy
              HAVE A GANDER - take a look
              HAPPY AS A DOG WITH TWO TAILS - very happy
              MATE - term of friendship or greeting
              G'DAY MATE - Hello
              MORE THAN YOU CAN POKE A STICK AT - lots
              NO WORRIES, MATE - "no problem" or "you're welcome"
              ONYA - good on you
              SO HUNGRY COULD EAT THE ARSE OUT OF A LOW-FLYING DUCK - Very hungry
              TIGHT AS A FISH'S ARSE - stingy person`}]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will help users with their protein powder related questions using only the provided product database information.' }]
        },
        ...chatHistory
      ]
    })

    // Send message and get response
    const result = await chat.sendMessage(messages[messages.length - 1].content)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ message: text })
  } catch (error: any) {
    console.error('Chat API error:', error.message || 'Unknown error')
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    )
  }
} 