import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

export async function GET(request: Request) {
  try {
    console.log('Starting price scrape...')
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1920, height: 1080 }
    })
    
    const page = await browser.newPage()
    
    // Set a realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    // Navigate to the page with specific variation
    await page.goto('https://au.myprotein.com/p/sports-nutrition/impact-whey-isolate/12313192/?variation=12313208', {
      waitUntil: 'networkidle0',
      timeout: 30000
    })

    // Wait for any dynamic content to load
    await page.waitForTimeout(2000)

    // Get price using XPath
    const price = await page.evaluate(() => {
      // Try multiple selectors to find the price
      const selectors = [
        // Try finding by exact text content
        Array.from(document.querySelectorAll('div')).find(
          el => el.textContent?.trim() === '$59.95‎/kg'
        ),
        // Try finding by price pattern
        Array.from(document.querySelectorAll('div')).find(
          el => el.textContent?.match(/^\$\d+\.\d+‎\/kg$/)
        ),
        // Try finding by data attributes
        document.querySelector('[data-product-price]'),
        // Try finding by specific text content
        Array.from(document.querySelectorAll('div')).find(
          el => el.textContent?.includes('$') && el.textContent?.includes('/kg')
        )
      ]

      // Log all found elements for debugging
      console.log('Potential price elements:', selectors.map(el => el?.textContent))

      // Find first valid price
      for (const element of selectors) {
        if (element) {
          const text = element.textContent?.trim() || ''
          const match = text.match(/\$(\d+\.\d+)/)
          if (match) {
            return parseFloat(match[1])
          }
        }
      }

      return null
    })

    // Log results
    console.log('Scraped price:', price)

    if (!price) {
      // Take screenshot for debugging
      await page.screenshot({ path: 'debug-screenshot.png' })
      
      // Get page content for debugging
      const content = await page.content()
      console.log('Page content:', content)
      
      return NextResponse.json({ error: 'Price not found' }, { status: 404 })
    }

    await browser.close()
    return NextResponse.json({ price })

  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json({ error: 'Failed to scrape price' }, { status: 500 })
  }
} 