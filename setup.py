#!/usr/bin/env python3
"""
Setup script for Protein Powder Directory
Installs all required Python dependencies
"""

import subprocess
import sys

def install_requirements():
    """Install all requirements from requirements.txt"""
    try:
        print("Installing Python dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "app/requirements.txt"])
        print("✅ All Python dependencies installed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing dependencies: {e}")
        return False
    return True

if __name__ == "__main__":
    install_requirements() 