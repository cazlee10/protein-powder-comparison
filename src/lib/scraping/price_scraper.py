# src/lib/scraping/price_scraper.py
import requests
from bs4 import BeautifulSoup, SoupStrainer
import json
import os
from supabase import create_client, Client
import sys
import traceback
import re
from dotenv import load_dotenv

# Load environment variables from .env.local file
load_dotenv('.env.local')

# Initialize Supabase client with secure environment variable handling
url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not url or not key:
    raise ValueError("Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(url, key)

def scrape_price(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=30)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'lxml')
        
        if 'myprotein.com' in url:
            try:
                # First, try to find the main product price using the specific class structure
                # Look for span with text-2xl font-semibold class (main price display)
                price_elements = soup.find_all('span', class_='text-2xl font-semibold')
                
                for element in price_elements:
                    text = element.get_text(strip=True)
                    # Look for A$ price patterns
                    if 'A$' in text:
                        price_match = re.search(r'A\$(\d+\.\d+)', text)
                        if price_match:
                            try:
                                price = float(price_match.group(1))
                                # Validate it's a reasonable total product price
                                if 20 <= price <= 500:
                                    return price
                            except ValueError:
                                continue
                
                # Fallback: try to find any price with A$ pattern in any element
                for element in soup.find_all(['span', 'div', 'p']):
                    text = element.get_text(strip=True)
                    if 'A$' in text and '/kg' not in text and 'out of 5' not in text:
                        price_match = re.search(r'A\$(\d+\.\d+)', text)
                        if price_match:
                            try:
                                price = float(price_match.group(1))
                                if 20 <= price <= 500:
                                    return price
                            except ValueError:
                                continue
                
                # Additional fallback: look for any price without /kg
                for element in soup.find_all(['span', 'div', 'p']):
                    text = element.get_text(strip=True)
                    if '$' in text and '/kg' not in text and 'out of 5' not in text:
                        price_match = re.search(r'\$(\d+\.\d+)', text)
                        if price_match:
                            try:
                                price = float(price_match.group(1))
                                if 20 <= price <= 500:
                                    return price
                            except ValueError:
                                continue
            except Exception:
                # If MyProtein scraping fails, return None
                pass
                
        elif 'chemistwarehouse.com.au' in url:
            try:
                # Try the specific price span first
                price_element = soup.find('span', {'class': 'product__price'})
                if not price_element:
                    # Fallback to ID if class doesn't work
                    price_element = soup.find('span', id=lambda x: x and 'lblActualPrice' in x)
                if not price_element:
                    # Fallback to h2 with the correct class
                    price_element = soup.find('h2', {'class': 'display-l text-colour-title-light'})
                if price_element:
                    try:
                        price_text = price_element.get_text(strip=True)
                        price = float(price_text.replace('$', '').strip())
                        # Convert to price per kg using the weight from the product title
                        weight_element = soup.find('h1', {'class': 'product__title'})
                        if weight_element:
                            weight_text = weight_element.get_text(strip=True)
                            weight_match = re.search(r'(\d+(?:\.\d+)?)\s*kg', weight_text, re.IGNORECASE)
                            if weight_match:
                                weight_kg = float(weight_match.group(1))
                                price_per_kg = price / weight_kg
                                if 20 <= price_per_kg <= 200:  # Sanity check
                                    return price_per_kg
                        # If no weight found in title, return price if it's within range
                        if 20 <= price <= 200:
                            return price
                    except (AttributeError, ValueError):
                        pass
            except Exception:
                # If Chemist Warehouse scraping fails, return None
                pass
                    
        elif 'costpricesupplements.com.au' in url:
            try:
                # Look for the variations form that contains the price data
                variations_form = soup.find('form', {'class': 'variations_form'})
                if variations_form:
                    # Get the data-product_variations attribute
                    variations_data = variations_form.get('data-product_variations')
                    if variations_data:
                        try:
                            # Parse the JSON data (handle HTML entities)
                            variations_data = variations_data.replace('&quot;', '"')
                            variations = json.loads(variations_data)
                            
                            # Get the first available variation's price
                            for variation in variations:
                                if variation.get('is_in_stock', False):
                                    display_price = variation.get('display_price')
                                    if display_price:
                                        price = float(display_price)
                                        if 20 <= price <= 200:  # Sanity check
                                            return price
                                    break
                        except (json.JSONDecodeError, ValueError, AttributeError, TypeError):
                            # If JSON parsing fails, continue to fallback method
                            pass
                
                # Fallback: try to find price in hidden input fields
                price_input = soup.find('input', {'name': 'gtm4wp_price'})
                if price_input:
                    try:
                        price = float(price_input.get('value', 0))
                        if 20 <= price <= 200:
                            return price
                    except (ValueError, AttributeError):
                        pass
            except Exception:
                # If any error occurs in Cost Price Supplements section, just return None
                pass
                    
        elif 'bulknutrients.com.au' in url:
            try:
                price_element = soup.select_one('.product-price')
                if price_element:
                    try:
                        price_text = price_element.get_text(strip=True)
                        price = float(price_text.replace('$', '').strip())
                        if 20 <= price <= 200:  # Sanity check
                            return price
                    except (AttributeError, ValueError):
                        return None
            except Exception:
                # If Bulk Nutrients scraping fails, return None
                pass
                
        elif 'blackbeltprotein.com.au' in url:
            try:
                # Look for the price in span with class "right" containing "per kilo"
                price_elements = soup.find_all('span', class_='right')
                
                for element in price_elements:
                    text = element.get_text(strip=True)
                    # Look for price patterns like "$30.60 per kilo"
                    if 'per kilo' in text.lower():
                        price_match = re.search(r'\$(\d+\.\d+)', text)
                        if price_match:
                            try:
                                price = float(price_match.group(1))
                                if 20 <= price <= 200:  # Sanity check for price per kg
                                    return price
                            except ValueError:
                                continue
                
                # Fallback: look for any price with $ pattern in the page
                for element in soup.find_all(['span', 'div', 'p']):
                    text = element.get_text(strip=True)
                    if '$' in text and 'per kilo' in text.lower():
                        price_match = re.search(r'\$(\d+\.\d+)', text)
                        if price_match:
                            try:
                                price = float(price_match.group(1))
                                if 20 <= price <= 200:
                                    return price
                            except ValueError:
                                continue
            except Exception:
                # If BlackBelt Protein scraping fails, return None
                pass
                
        return None
        
    except requests.RequestException as e:
        # Log request errors but don't expose sensitive information
        print(f"Request error for {url}: {str(e)}")
        return None
    except Exception as e:
        # Log general errors but don't expose sensitive information
        print(f"General error for {url}: {str(e)}")
        return None

def update_product_prices():
    try:
        response = supabase.table('products').select('id,link').execute()
        products = [p for p in response.data if p.get('link')]
        
        if not products:
            return {
                'success': True,
                'results': [],
                'summary': {'total': 0, 'updated': 0, 'failed': 0}
            }
        
        results = []
        updated_count = 0
        failed_count = 0
        
        for product in products:
            try:
                price = scrape_price(product['link'])
                if price:
                    update_response = supabase.table('products').update({
                        'price': price,
                        'updated_at': 'now()'
                    }).eq('id', product['id']).execute()
                    
                    if not getattr(update_response, 'error', None):
                        updated_count += 1
                        results.append({
                            'id': product['id'],
                            'success': True,
                            'price': price
                        })
                    else:
                        failed_count += 1
                        results.append({
                            'id': product['id'],
                            'success': False,
                            'error': 'Failed to update database'
                        })
                else:
                    failed_count += 1
                    results.append({
                        'id': product['id'],
                        'success': False,
                        'error': 'Price not found'
                    })
            except Exception as e:
                failed_count += 1
                results.append({
                    'id': product['id'],
                    'success': False,
                    'error': str(e)
                })
        
        return {
            'success': True,
            'results': results,
            'summary': {
                'total': len(products),
                'updated': updated_count,
                'failed': failed_count
            }
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

if __name__ == "__main__":
    try:
        result = update_product_prices()
        # Ensure clean JSON output with no extra prints
        print(json.dumps(result, default=str))
    except Exception as e:
        print(json.dumps({
            'success': False,
            'error': str(e)
        }))