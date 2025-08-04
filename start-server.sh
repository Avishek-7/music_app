#!/bin/bash

# Modern Music Player - Development Server Launcher
# This script helps you quickly start a local server to test the music player

echo "🎵 Modern Music Player - Development Server"
echo "=========================================="
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "🐍 Starting Python HTTP Server on port 8000..."
    echo "📱 Open http://localhost:8000 in your browser"
    echo "🎧 Access the demo at http://localhost:8000/demo.html"
    echo "🎵 Main player at http://localhost:8000/index.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🐍 Starting Python HTTP Server on port 8000..."
    echo "📱 Open http://localhost:8000 in your browser"
    echo "🎧 Access the demo at http://localhost:8000/demo.html"
    echo "🎵 Main player at http://localhost:8000/index.html"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python -m http.server 8000
else
    echo "❌ Python not found. Please install Python or use another web server."
    echo ""
    echo "Alternative options:"
    echo "1. Install Node.js and run: npx http-server -p 8000"
    echo "2. Use Live Server extension in VS Code"
    echo "3. Open index.html directly in your browser (limited functionality)"
fi
