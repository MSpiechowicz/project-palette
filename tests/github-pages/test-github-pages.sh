#!/bin/bash

# Test script for GitHub Pages configuration
echo "🚀 Testing GitHub Pages configuration for project-palette..."

# Build the project with production settings
echo "📦 Building project..."
NODE_ENV=production npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if the HTML file has the correct base path
    if grep -q "/project-palette/" dist/index.html; then
        echo "✅ Base path configured correctly in HTML"
    else
        echo "❌ Base path not found in HTML"
        exit 1
    fi
    
    # Start preview server
    echo "🌐 Starting preview server..."
    echo "📱 Your app will be available at: http://localhost:4173/project-palette/"
    echo "🛑 Press Ctrl+C to stop the server"
    
    npm run preview
else
    echo "❌ Build failed!"
    exit 1
fi
