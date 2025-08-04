#!/bin/bash

# Create submission ZIP file for Modern Music Player
# This script packages all necessary files for submission

echo "🎵 Creating Music Player Submission Package..."
echo "============================================="

# Create a timestamp for the zip file
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="modern_music_player_submission_${TIMESTAMP}.zip"

# Create the zip file excluding unnecessary files
zip -r "${ZIP_NAME}" . \
    -x "*.DS_Store" \
    -x ".git/*" \
    -x "node_modules/*" \
    -x "*.log" \
    -x ".vscode/*" \
    -x "start-server.*" \
    -x "*.zip"

echo ""
echo "✅ Submission package created: ${ZIP_NAME}"
echo "📁 Package contains:"
echo "   - index.html (Main application)"
echo "   - styles.css (Complete styling)"
echo "   - script.js (JavaScript functionality)"
echo "   - demo.html (Project demonstration)"
echo "   - README.md (Documentation)"
echo "   - PROJECT_SUMMARY.md (Project overview)"
echo "   - package.json (Project configuration)"
echo "   - sample-audio/ (Audio files directory)"
echo ""
echo "🎯 Ready for submission!"
