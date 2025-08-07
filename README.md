# Resume Grading Feedback

A modern web application that allows students to check their resume status and submit updates through a Google Sheets backend. Built with Node.js, Express, and a beautiful dark mode UI.

## ✨ Features

- 🔐 **Secure Authentication**: Student Code + Authentication Code system
- 📊 **Real-time Status**: Check resume status (Cleared/Not Cleared/Grading Pending)
- 📝 **Detailed Feedback**: View comprehensive feedback from grading team
- 🔄 **Resume Updates**: Submit new Google Drive links for review
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🌙 **Dark Mode UI**: Modern, clean interface
- 🔗 **Google Sheets Integration**: Real-time data sync

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Google Cloud Platform account
- Google Sheets API enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume-grading-feedback.git
   cd resume-grading-feedback
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your Google Sheets credentials
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Visit the application**
   Open [http://localhost:3000](http://localhost:3000)

## 🔧 Setup Guide

### 1. Google Sheets Setup

1. **Create a Google Sheet** with this structure:
   ```
   Student Code | Auth Code | Resume Link | Resume Status | Feedback
   ```

2. **Enable Google Sheets API** in Google Cloud Console

3. **Create a Service Account** and download the JSON key

4. **Share your Google Sheet** with the service account email (Editor access)

### 2. Environment Configuration

Create a `.env` file with:
```env
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
PORT=3000
```

### 3. Test the Setup

```bash
# Test Google Sheets connection
node test-sheet.js

# Run with mock data (for development)
npm run dev-mock
```

## 🌐 Deployment

### Quick Deployment Options

1. **Railway (Recommended)** - Free tier, easy setup
2. **Render** - Free tier available
3. **Heroku** - Reliable, paid plans
4. **Vercel** - Great for frontend, free tier

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/resume-grading-feedback.git
   git push -u origin main
   ```

2. **Deploy to your chosen platform**
   - Follow the detailed guide in [DEPLOYMENT.md](DEPLOYMENT.md)
   - Add environment variables to your hosting platform
   - Deploy!

3. **Your app will be live at:**
   - Railway: `https://your-app-name.railway.app`
   - Render: `https://your-app-name.onrender.com`
   - Heroku: `https://your-app-name.herokuapp.com`

## 📱 Usage

### For Students

1. **Enter Credentials**
   - Student Code (e.g., `IITRPRAI_24081034`)
   - Authentication Code (e.g., `123`)

2. **Check Status**
   - View current resume link
   - See status (Cleared/Not Cleared/Grading Pending)
   - Read detailed feedback

3. **Submit Updates** (if status is "Not Cleared")
   - Provide new Google Drive link
   - Submit for re-grading
   - Status changes to "Grading Pending"

### For Administrators

1. **Manage Google Sheet**
   - Add new students with codes
   - Update resume status
   - Provide detailed feedback

2. **Monitor Submissions**
   - Check "Grading Pending" entries
   - Review new resume links
   - Update status and feedback

## 🛠️ Development

### Project Structure
```
resume-grading-feedback/
├── public/                 # Frontend files
│   ├── index.html         # Main UI
│   └── script.js          # Frontend logic
├── server.js              # Main server
├── server-mock.js         # Mock server for development
├── setup.js               # Environment setup wizard
├── test-sheet.js          # Google Sheets test
└── package.json           # Dependencies
```

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run mock       # Start mock server
npm run dev-mock   # Start mock server with nodemon
npm run setup      # Run setup wizard
npm run fix-env    # Fix environment variables
```

### API Endpoints

- `POST /api/check-status` - Check student resume status
- `POST /api/update-resume` - Submit new resume link

## 🔒 Security Features

- Environment variable protection
- Input validation and sanitization
- CORS configuration
- Google Sheets API authentication
- No sensitive data in client-side code

## 📊 Google Sheets Schema

| Column | Purpose | Example |
|--------|---------|---------|
| Student Code | Unique student identifier | `IITRPRAI_24081034` |
| Auth Code | Authentication password | `123` |
| Resume Link | Google Drive link | `https://drive.google.com/...` |
| Resume Status | Current status | `Cleared` / `Not Cleared` / `Grading Pending` |
| Feedback | Detailed feedback | `Please improve formatting...` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](DEPLOYMENT.md#troubleshooting)
2. Review application logs
3. Test locally first
4. Open an issue on GitHub

## 🎯 Roadmap

- [ ] Email notifications for status updates
- [ ] Bulk student import
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] API rate limiting
- [ ] User management system

---

**Built with ❤️ for better resume grading workflows** 