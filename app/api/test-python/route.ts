import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function GET() {
  try {
    console.log('Testing Python environment...');
    
    // Check if Python is available
    let pythonVersion = '';
    try {
      const { stdout } = await execPromise('python --version');
      pythonVersion = stdout.trim();
      console.log('Python version:', pythonVersion);
    } catch (error) {
      console.error('Python not found:', error);
      return NextResponse.json({ 
        success: false, 
        error: 'Python is not installed or not in PATH'
      });
    }

    // Test Python dependencies
    const { stdout, stderr } = await execPromise('python test_python.py', {
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
      timeout: 30000
    });
    
    console.log('Test script stdout:', stdout);
    if (stderr) {
      console.log('Test script stderr:', stderr);
    }
    
    try {
      // Find the JSON output in the stdout
      const lines = stdout.split('\n');
      let jsonOutput = '';
      for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim().startsWith('{')) {
          jsonOutput = lines[i].trim();
          break;
        }
      }
      
      if (!jsonOutput) {
        return NextResponse.json({ 
          success: false, 
          error: 'No JSON output found in Python test',
          stdout: stdout.substring(0, 1000)
        });
      }
      
      const result = JSON.parse(jsonOutput);
      return NextResponse.json({
        success: true,
        pythonVersion,
        ...result
      });
      
    } catch (parseError) {
      console.error('Parse error:', parseError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to parse test output',
        stdout: stdout.substring(0, 1000),
        parseError: parseError instanceof Error ? parseError.message : 'Unknown parse error'
      });
    }
    
  } catch (error) {
    console.error('Test execution error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 