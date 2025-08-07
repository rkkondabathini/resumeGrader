# Resume Grader - Student Portal

A web application that allows students to check their resume status and submit updated resume links through a Google Sheets backend.

## Features

- ✅ Student authentication with Student Code and Auth Code
- ✅ Display resume link, status, and feedback from Google Sheets
- ✅ Submit new resume links when status is "Not Cleared"
- ✅ Automatic status update to "Grading Pending" on new submission
- ✅ Modern, responsive UI with real-time feedback
- ✅ Google Sheets API integration

## Prerequisites

- Node.js (v14 or higher)
- Google Cloud Platform account
- Google Sheets API enabled
- A Google Service Account with Editor access to your Google Sheet

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd ResumeGrader
npm install
```

### 2. Google Sheets Setup

#### Create Google Sheet
1. Create a new Google Sheet
2. Name the first tab "ResumeData"
3. Add the following headers in row 1:
   - A1: Student Code
   - B1: Auth Code
   - C1: Resume Link
   - D1: Resume Status
   - E1: Feedback

#### Sample Data Structure
| Student Code | Auth Code | Resume Link | Resume Status | Feedback |
|--------------|-----------|-------------|---------------|----------|
| S001 | AUTH123 | https://drive.google.com/... | Cleared | Great work! |
| S002 | AUTH456 | https://drive.google.com/... | Not Cleared | Please improve formatting |

### 3. Google Cloud Platform Setup

#### Enable Google Sheets API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google Sheets API
4. Go to "APIs & Services" > "Library"
5. Search for "Google Sheets API" and enable it

#### Create Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in service account details
4. Click "Create and Continue"
5. Skip role assignment (we'll do this manually)
6. Click "Done"

#### Generate Service Account Key
1. Click on your service account
2. Go to "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Choose JSON format
5. Download the JSON file

#### Grant Sheet Access
1. Open your Google Sheet
2. Click "Share" button
3. Add your service account email (found in the JSON file)
4. Give "Editor" access
5. Copy the Sheet ID from the URL

### 4. Environment Configuration

1. Copy `env.example` to `.env`:
```bash
cp env.example .env
```

2. Edit `.env` with your configuration:
```env
# Google Sheets API Configuration
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"

# Server Configuration
PORT=3000
```

**Important Notes:**
- Replace `your_sheet_id_here` with your actual Google Sheet ID
- Replace `your_service_account@project.iam.gserviceaccount.com` with your service account email
- Copy the private key from your downloaded JSON file (keep the quotes and \n characters)

### 5. Run the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### POST /api/check-status
Check student resume status using Student Code and Auth Code.

**Request Body:**
```json
{
  "studentCode": "S001",
  "authCode": "AUTH123"
}
```

**Response:**
```json
{
  "resumeLink": "https://drive.google.com/...",
  "status": "Cleared",
  "feedback": "Great work!"
}
```

### POST /api/update-resume
Update resume link for a student (only when status is "Not Cleared").

**Request Body:**
```json
{
  "studentCode": "S001",
  "newResumeLink": "https://drive.google.com/..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume updated successfully. Status changed to \"Grading Pending\"."
}
```

## Usage Flow

1. **Student Access**: Student visits the web application
2. **Authentication**: Enters Student Code and Auth Code
3. **Status Check**: System validates credentials and displays resume information
4. **Resume Display**: Shows current resume link, status, and feedback
5. **Update Option**: If status is "Not Cleared", student can submit new resume link
6. **Status Update**: New submission automatically updates status to "Grading Pending"

## Status Types

- **Cleared**: Resume meets requirements
- **Not Cleared**: Resume needs updates
- **Grading Pending**: New resume submitted, awaiting review

## Security Features

- Authentication required for all operations
- Google Drive link validation
- Status-based update restrictions
- Input sanitization and validation

## Troubleshooting

### Common Issues

1. **"Invalid Student Code or Auth Code"**
   - Verify the student exists in your Google Sheet
   - Check that Student Code and Auth Code match exactly

2. **"Google Sheets API Error"**
   - Verify your service account has Editor access to the sheet
   - Check that your environment variables are correctly set
   - Ensure the Google Sheets API is enabled

3. **"Resume can only be updated when status is 'Not Cleared'"**
   - This is expected behavior - students can only update resumes that need changes

### Debug Mode

To see detailed error logs, run:
```bash
DEBUG=* npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review Google Sheets API documentation
3. Create an issue in the repository 