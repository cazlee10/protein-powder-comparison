#!/usr/bin/env python3
import sys
import json
import os

def test_dependencies():
    """Test if all required dependencies are available"""
    try:
        import requests
        print("✓ requests imported successfully")
    except ImportError as e:
        print(f"✗ requests import failed: {e}")
        return False
    
    try:
        from bs4 import BeautifulSoup
        print("✓ BeautifulSoup imported successfully")
    except ImportError as e:
        print(f"✗ BeautifulSoup import failed: {e}")
        return False
    
    try:
        from supabase import create_client
        print("✓ supabase imported successfully")
    except ImportError as e:
        print(f"✗ supabase import failed: {e}")
        return False
    
    try:
        import lxml
        print("✓ lxml imported successfully")
    except ImportError as e:
        print(f"✗ lxml import failed: {e}")
        return False
    
    return True

def test_environment():
    """Test if environment variables are set"""
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
    key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
    
    if not url:
        print("✗ NEXT_PUBLIC_SUPABASE_URL not set")
        return False
    else:
        print("✓ NEXT_PUBLIC_SUPABASE_URL is set")
    
    if not key:
        print("✗ SUPABASE_SERVICE_ROLE_KEY not set")
        return False
    else:
        print("✓ SUPABASE_SERVICE_ROLE_KEY is set")
    
    return True

def test_supabase_connection():
    """Test Supabase connection"""
    try:
        from supabase import create_client
        
        url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
        key = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
        
        if not url or not key:
            print("✗ Missing environment variables for Supabase")
            return False
        
        supabase = create_client(url, key)
        
        # Try a simple query
        response = supabase.table('products').select('id').limit(1).execute()
        print("✓ Supabase connection successful")
        return True
        
    except Exception as e:
        print(f"✗ Supabase connection failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Python environment...")
    print("=" * 40)
    
    deps_ok = test_dependencies()
    env_ok = test_environment()
    supabase_ok = test_supabase_connection()
    
    print("=" * 40)
    
    result = {
        'success': deps_ok and env_ok and supabase_ok,
        'dependencies': deps_ok,
        'environment': env_ok,
        'supabase': supabase_ok
    }
    
    print(json.dumps(result, indent=2)) 