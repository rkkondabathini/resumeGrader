#!/bin/bash

# Resume Grading Feedback - Deployment Script
echo "🚀 Resume Grading Feedback - Deployment Helper"
echo "=============================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with your environment variables:"
    echo ""
    echo "GOOGLE_SHEET_ID=your_sheet_id"
    echo "GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email"
    echo "GOOGLE_PRIVATE_KEY=\"your_private_key\""
    echo "PORT=3000"
    echo ""
    exit 1
fi

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit - Resume Grading Feedback"
    echo "✅ Git repository initialized"
fi

# Check if all files are committed
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing current changes..."
    git add .
    git commit -m "Update: Resume Grading Feedback - $(date)"
    echo "✅ Changes committed"
fi

echo ""
echo "🎯 Ready for deployment!"
echo ""
echo "Choose your deployment platform:"
echo "1. Railway (Recommended - Free & Easy)"
echo "2. Render (Free tier available)"
echo "3. Heroku (Paid)"
echo "4. Vercel (Free tier)"
echo ""
echo "📋 Pre-deployment checklist:"
echo "✅ .env file exists with all variables"
echo "✅ Google Sheets API is enabled"
echo "✅ Service account has Editor access"
echo "✅ All code is committed to Git"
echo ""
echo "🌐 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git remote add origin https://github.com/yourusername/resume-grading-feedback.git"
echo "   git push -u origin main"
echo ""
echo "2. Follow the deployment guide in DEPLOYMENT.md"
echo ""
echo "3. Add these environment variables to your hosting platform:"
echo "   GOOGLE_SHEET_ID=$(grep GOOGLE_SHEET_ID .env | cut -d '=' -f2)"
echo "   GOOGLE_SERVICE_ACCOUNT_EMAIL=$(grep GOOGLE_SERVICE_ACCOUNT_EMAIL .env | cut -d '=' -f2)"
echo "   PORT=3000"
echo ""
echo "🔗 Your app will be live at:"
echo "   Railway: https://your-app-name.railway.app"
echo "   Render: https://your-app-name.onrender.com"
echo "   Heroku: https://your-app-name.herokuapp.com"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "Happy deploying! 🚀" 