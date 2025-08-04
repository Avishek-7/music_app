@echo off
REM Modern Music Player - Development Server Launcher (Windows)
REM This script helps you quickly start a local server to test the music player

echo 🎵 Modern Music Player - Development Server
echo ==========================================
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo 🐍 Starting Python HTTP Server on port 8000...
    echo 📱 Open http://localhost:8000 in your browser
    echo 🎧 Access the demo at http://localhost:8000/demo.html
    echo 🎵 Main player at http://localhost:8000/index.html
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
) else (
    python3 --version >nul 2>&1
    if %errorlevel% == 0 (
        echo 🐍 Starting Python HTTP Server on port 8000...
        echo 📱 Open http://localhost:8000 in your browser
        echo 🎧 Access the demo at http://localhost:8000/demo.html
        echo 🎵 Main player at http://localhost:8000/index.html
        echo.
        echo Press Ctrl+C to stop the server
        echo.
        python3 -m http.server 8000
    ) else (
        echo ❌ Python not found. Please install Python or use another web server.
        echo.
        echo Alternative options:
        echo 1. Install Node.js and run: npx http-server -p 8000
        echo 2. Use Live Server extension in VS Code
        echo 3. Open index.html directly in your browser (limited functionality)
        pause
    )
)
