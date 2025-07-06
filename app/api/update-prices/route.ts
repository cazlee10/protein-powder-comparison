// app/api/update-prices/route.ts
import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST() {
  try {
    const { stdout, stderr } = await execPromise('python src/lib/scraping/price_scraper.py', {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024
    });
    
    try {
      const cleanOutput = stdout.trim();
      const result = JSON.parse(cleanOutput);
      return NextResponse.json(result);
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Raw output:', stdout);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to parse script output',
        details: stdout
      });
    }
  } catch (error) {
    console.error('Execution error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}