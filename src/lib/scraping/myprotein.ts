// @ts-check
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { supabase } from '../supabase/client';
import { v5 as uuidv5 } from 'uuid';

// Configure stealth plugin
puppeteer.use(StealthPlugin());

interface ScrapedProduct {
  name: string;
  brand: string;
  price: number;
  weight: number;
  protein_per_serving: number;
  serving_size: number;
  image_url: string;
}

export async function scrapeAndUploadMyprotein() {
  console.log('Starting scraper...');
  // Define a namespace for consistent UUID generation
  const MY_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';  // You can use any valid UUID as namespace
  
  const browser = await puppeteer.launch({ 
    headless: true,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  try {
    console.log('Navigating to MyProtein...');
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    const productId = '12313192';
    // Generate a consistent UUID from the product ID
    const uuid = uuidv5(productId, MY_NAMESPACE);
    
    await page.goto(`https://au.myprotein.com/sports-nutrition/impact-whey-isolate/${productId}.html`, {
      waitUntil: 'networkidle2'
    });
    
    console.log('Page loaded, extracting data...');

    // Wait for price element to be present
    await page.waitForSelector('p.productPrice_price');
    console.log('Price element found');

    // Wait for nutrition table
    await page.waitForSelector('table.nutritionalInfo_table');
    console.log('Nutrition table found');

    const priceData = await page.evaluate(() => {
      const priceElement = document.querySelector('p.productPrice_price');
      const proteinRow = Array.from(document.querySelectorAll('table.nutritionalInfo_table tr'))
        .find(row => row.textContent?.includes('Protein'));
      
      if (!priceElement) return null;
      
      const priceText = priceElement.textContent?.trim() || '';
      const price = parseFloat(priceText.replace('A$', '').trim());
      
      const proteinValue = proteinRow 
        ? parseFloat(proteinRow.querySelector('td')?.textContent?.replace('g', '').trim() || '0')
        : 0;
      
      return {
        id: uuid,  // Use the generated UUID
        external_id: productId,  // Store the original product ID
        price,
        name: 'Impact Whey Isolate',
        brand: 'Myprotein',
        weight: 1.0,
        protein_per_serving: proteinValue,
        serving_size: 25,
        image_url: document.querySelector('.athenaProductPage_mainImage img')?.getAttribute('src') || ''
      };
    });

    console.log('Extracted data:', priceData);

    if (priceData && priceData.price > 0) {
      console.log('Data found:', priceData);
      
      const { data, error } = await supabase
        .from('products')
        .upsert([priceData], {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select();

      if (error) {
        console.error('Supabase upload error:', error);
        return { success: false, error };
      }

      console.log('Data updated successfully');
      return { success: true, data };
    } else {
      console.log('No valid data found');
      return { success: false, error: 'No valid data found' };
    }

  } catch (error) {
    console.error('Error details:', error);
    return { success: false, error };
  } finally {
    await browser.close();
    console.log('Browser closed');
  }
}

// Execute if run directly
const isMainModule = process.argv[1]?.endsWith('myprotein.ts');

if (isMainModule) {
  console.log('Running main function...');
  scrapeAndUploadMyprotein()
    .then(result => console.log('Scraping completed:', result))
    .catch(error => console.error('Scraping failed:', error));
} else {
  console.log('Not running as main module');
}