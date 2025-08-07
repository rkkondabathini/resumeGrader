# Resume Grader - Project Overview

## 🎯 Project Summary

A complete web application that allows students to check their resume status and submit updated resume links through a Google Sheets backend. Built with Node.js, Express.js, and modern frontend technologies.

## 📁 Project Structure

```
ResumeGrader/
├── 📄 server.js                 # Main Express.js server with Google Sheets API
├── 📄 package.json              # Node.js dependencies and scripts
├── 📄 setup.js                  # Interactive setup wizard
├── 📄 .env.example              # Environment variables template
├── 📄 .gitignore                # Git ignore rules
├── 📄 README.md                 # Comprehensive setup and usage guide
├── 📄 google-sheets-template.md # Google Sheets setup instructions
├── 📄 PROJECT_OVERVIEW.md       # This file
├── 📁 public/                   # Frontend files
│   ├── 📄 index.html            # Main HTML page with modern UI
│   └── 📄 script.js             # Frontend JavaScript functionality
└── 📁 node_modules/             # Dependencies (auto-generated)
```

## 🚀 Key Features

### ✅ Authentication System
- Student Code + Auth Code validation
- Secure access to individual resume data
- Input validation and sanitization

### ✅ Resume Status Display
- Shows current resume link (clickable)
- Displays status with color-coded badges:
  - 🟢 **Cleared** (Green)
  - 🔴 **Not Cleared** (Red)
  - 🟡 **Grading Pending** (Yellow)
- Shows feedback from grading team

### ✅ Resume Update System
- Students can submit new Google Drive links
- Only available when status is "Not Cleared"
- Automatic status update to "Grading Pending"
- Google Drive link validation

### ✅ Modern UI/UX
- Responsive design for all devices
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Real-time feedback and loading states
- Professional color scheme and typography

## 🔧 Technical Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Google Sheets API v4** - Database backend
- **googleapis** - Google API client
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Font Awesome** - Icons
- **Responsive Design** - Mobile-first approach

## 🔐 Security Features

- Environment variable protection
- Input validation and sanitization
- Google Drive link format validation
- Status-based update restrictions
- Service account authentication

## 📊 Data Flow

1. **Student Access** → Enter credentials
2. **Authentication** → Validate against Google Sheet
3. **Data Retrieval** → Fetch resume information
4. **Display** → Show status, link, and feedback
5. **Update** → Submit new link (if needed)
6. **Sheet Update** → Modify Google Sheet data

## 🎨 UI Components

### Main Form
- Student Code input
- Authentication Code input (password field)
- Check Status button

### Results Section
- Resume link (clickable)
- Status badge with colors
- Feedback text
- Update section (conditional)

### Update Section
- New resume link input
- Submit button
- Validation messages

### Notifications
- Success/error alerts
- Loading spinner
- Auto-hiding messages

## 🔄 API Endpoints

### `POST /api/check-status`
- **Purpose**: Authenticate and retrieve resume data
- **Input**: `{ studentCode, authCode }`
- **Output**: `{ resumeLink, status, feedback }`

### `POST /api/update-resume`
- **Purpose**: Update resume link for student
- **Input**: `{ studentCode, newResumeLink }`
- **Output**: `{ success, message }`

## 📋 Setup Requirements

### Prerequisites
- Node.js (v14+)
- Google Cloud Platform account
- Google Sheets API enabled
- Service account with Editor permissions

### Configuration
1. Google Sheet with "ResumeData" tab
2. Service account credentials
3. Environment variables setup
4. Sheet sharing permissions

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run setup wizard
npm run setup

# 3. Start the application
npm start

# 4. Visit http://localhost:3000
```

## 🎯 Use Cases

### For Students
- Check resume status anytime
- View feedback from graders
- Submit updated resumes when needed
- Track submission progress

### For Grading Team
- Centralized resume management
- Real-time status updates
- Automated workflow
- Easy feedback system

## 🔧 Customization Options

### UI Customization
- Modify colors in CSS variables
- Change fonts and styling
- Add custom animations
- Update branding elements

### Functionality Extension
- Add email notifications
- Implement file upload
- Add admin dashboard
- Create grading interface

### Data Structure
- Add more student fields
- Include multiple resume versions
- Add grading criteria
- Implement scoring system

## 📈 Scalability

- Stateless API design
- Google Sheets as scalable backend
- Modular code structure
- Easy deployment options

## 🛡️ Error Handling

- Comprehensive try-catch blocks
- User-friendly error messages
- Graceful degradation
- Input validation
- API error responses

## 📱 Mobile Responsiveness

- Mobile-first design
- Touch-friendly interface
- Responsive typography
- Optimized for all screen sizes

---

**Built with ❤️ for efficient resume management** 