// app/api/update-prices/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST() {
  try {
    console.log('Starting price update...');
    
    // Check if Python is available
    let pythonAvailable = false;
    try {
      await execPromise('python --version');
      pythonAvailable = true;
    } catch (error) {
      console.error('Python not found:', error);
      // Return a helpful error message for Vercel deployment
      return NextResponse.json({ 
        success: false, 
        error: 'Python is not available in this environment. Price updates require Python with Beautiful Soup for web scraping.',
        note: 'This feature works locally but not on Vercel. Consider using a different hosting provider that supports Python or implementing scraping in JavaScript.',
        alternative: 'You can run price updates locally using: python src/lib/scraping/price_scraper.py'
      });
    }

    if (!pythonAvailable) {
      return NextResponse.json({ 
        success: false, 
        error: 'Python is not available'
      });
    }

    // Run the Python script with better error handling
    const { stdout, stderr } = await execPromise('python src/lib/scraping/price_scraper.py', {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
      timeout: 60000 // 60 second timeout
    });
    
    console.log('Python script stdout:', stdout);
    console.log('Python script stderr:', stderr);
    
    // Check if stderr contains any errors
    if (stderr && stderr.trim()) {
      console.error('Python script stderr:', stderr);
    }
    
    // Check if stdout starts with HTML (error page)
    if (stdout.trim().startsWith('<!DOCTYPE') || stdout.trim().startsWith('<html')) {
      console.error('Python script returned HTML instead of JSON:', stdout.substring(0, 500));
      return NextResponse.json({ 
        success: false, 
        error: 'Python script returned HTML error page instead of JSON',
        details: stdout.substring(0, 1000)
      });
    }
    
    try {
      const cleanOutput = stdout.trim();
      const result = JSON.parse(cleanOutput);
      return NextResponse.json(result);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw output:', stdout);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to parse script output as JSON',
        details: stdout.substring(0, 1000),
        parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error'
      });
    }
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown'
    });
  }
}