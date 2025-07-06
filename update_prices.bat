@echo off
echo Starting price update...
echo.
python src/lib/scraping/price_scraper.py
echo.
echo Price update completed!
pause 