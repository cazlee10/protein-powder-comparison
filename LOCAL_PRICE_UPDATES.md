# Local Price Updates

Since Vercel doesn't support Python, price updates need to be run locally to update the database.

## Quick Start

### Windows
```bash
# Double-click the file or run:
update_prices.bat
```

### Mac/Linux
```bash
# Make executable and run:
chmod +x update_prices.sh
./update_prices.sh
```

### Manual Run
```bash
python src/lib/scraping/price_scraper.py
```

## Prerequisites

1. **Python 3.8+** installed
2. **Dependencies** installed:
   ```bash
   python -m pip install beautifulsoup4 requests supabase lxml
   ```
3. **Environment variables** set in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

## What It Does

The script:
1. Connects to your Supabase database
2. Fetches all products with links
3. Scrapes current prices from:
   - MyProtein (au.myprotein.com)
   - Chemist Warehouse (chemistwarehouse.com.au)
   - Cost Price Supplements (costpricesupplements.com.au)
   - Bulk Nutrients (bulknutrients.com.au)
4. Updates the database with new prices
5. Returns a summary of results

## Expected Output

```json
{
  "success": true,
  "results": [...],
  "summary": {
    "total": 28,
    "updated": 20,
    "failed": 8
  }
}
```

## Troubleshooting

### Python Not Found
```bash
# Check Python installation
python --version

# If not found, install Python from python.org
```

### Missing Dependencies
```bash
# Install required packages
python -m pip install beautifulsoup4 requests supabase lxml
```

### Environment Variables
Make sure your `.env.local` file contains:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Network Issues
- Some websites may block automated requests
- Try running again later
- Check your internet connection

## Scheduling Updates

### Windows Task Scheduler
1. Open Task Scheduler
2. Create Basic Task
3. Set trigger (daily/weekly)
4. Action: Start a program
5. Program: `python`
6. Arguments: `src/lib/scraping/price_scraper.py`
7. Start in: `C:\path\to\your\project`

### Cron (Mac/Linux)
```bash
# Edit crontab
crontab -e

# Add line for daily updates at 9 AM
0 9 * * * cd /path/to/your/project && python src/lib/scraping/price_scraper.py
```

## Notes

- The script includes error handling and won't crash if some products fail
- Prices are validated to be within reasonable ranges ($20-$200)
- Failed updates don't affect successful ones
- The script is designed to be run regularly to keep prices current 