const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Check for required environment variables
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
  console.error('❌ Missing required environment variables!');
  console.error('Please create a .env file with:');
  console.error('- GOOGLE_SERVICE_ACCOUNT_EMAIL');
  console.error('- GOOGLE_PRIVATE_KEY');
  console.error('- GOOGLE_SHEET_ID');
  console.error('\nRun "npm run setup" to configure automatically.');
  process.exit(1);
}

// Google Sheets API setup with service account
const auth = new google.auth.GoogleAuth({
  keyFile: null,
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_TAB = (process.env.SHEET_TAB_NAME || 'ResumeData').replace(/['"]/g, '').trim() || 'ResumeData';

// Mock data as fallback
const mockSheetData = [
  {
    studentCode: 'IITRPRAI_24081034',
    authCode: '123',
    resumeLink: 'https://drive.google.com/open?id=1zp206_FU1OhxbPIDWY2z93KgSrGSY8KY',
    status: 'Not Cleared',
    feedback: 'You have spelling mistakes'
  },
  {
    studentCode: 'S001',
    authCode: 'AUTH123',
    resumeLink: 'https://drive.google.com/file/d/1ABC123DEF456/view?usp=sharing',
    status: 'Cleared',
    feedback: 'Excellent resume! Well formatted and comprehensive.'
  },
  {
    studentCode: 'S002',
    authCode: 'AUTH456',
    resumeLink: 'https://drive.google.com/file/d/2DEF456GHI789/view?usp=sharing',
    status: 'Not Cleared',
    feedback: 'Please improve the formatting and add more details to experience section.'
  }
];

// Helper function to find student row
async function findStudentRow(studentCode, authCode) {
  try {
    // Try Google Sheets first
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_TAB}!A:E`, // Student Code, Auth Code, Resume Link, Status, Feedback
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Skip header row and search for matching student
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[0] === studentCode && row[1] === authCode) {
        return {
          rowIndex: i + 1, // Google Sheets is 1-indexed
          data: {
            studentCode: row[0],
            authCode: row[1],
            resumeLink: row[2] || '',
            status: row[3] || '',
            feedback: row[4] || ''
          }
        };
      }
    }
    return null;
  } catch (error) {
    console.error('Google Sheets API error, falling back to mock data:', error.message);
    
    // Fallback to mock data
    const mockStudent = mockSheetData.find(student => 
      student.studentCode === studentCode && student.authCode === authCode
    );
    
    if (mockStudent) {
      return {
        rowIndex: 1, // Mock row index
        data: {
          studentCode: mockStudent.studentCode,
          authCode: mockStudent.authCode,
          resumeLink: mockStudent.resumeLink,
          status: mockStudent.status,
          feedback: mockStudent.feedback
        }
      };
    }
    
    return null;
  }
}

// API Routes

// POST /api/check-status
app.post('/api/check-status', async (req, res) => {
  try {
    const { studentCode, authCode } = req.body;

    if (!studentCode || !authCode) {
      return res.status(400).json({ error: 'Student Code and Auth Code are required' });
    }

    const studentData = await findStudentRow(studentCode, authCode);
    
    if (!studentData) {
      return res.status(404).json({ error: 'Invalid Student Code or Auth Code' });
    }

    // Show "Grading Pending" as feedback when status is "Grading Pending"
    let displayFeedback = studentData.data.feedback;
    if (studentData.data.status === 'Grading Pending') {
      displayFeedback = 'Grading Pending';
    }

    res.json({
      resumeLink: studentData.data.resumeLink,
      status: studentData.data.status,
      feedback: displayFeedback
    });

  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/update-resume
app.post('/api/update-resume', async (req, res) => {
  try {
    const { studentCode, authCode, newResumeLink } = req.body;

    if (!studentCode || !authCode || !newResumeLink) {
      return res.status(400).json({ error: 'Student Code, Auth Code, and new Resume Link are required' });
    }

    // Validate Google Drive link format
    if (!newResumeLink.startsWith('https://drive.google.com/')) {
      return res.status(400).json({ error: 'Please provide a valid Google Drive link' });
    }

    // Find the student by BOTH studentCode and authCode (same as check-status)
    const studentData = await findStudentRow(studentCode, authCode);

    if (!studentData) {
      return res.status(404).json({ error: 'Invalid Student Code or Auth Code' });
    }

    // Check if status is "Not Cleared" (allow update only if not cleared)
    if (studentData.data.status !== 'Not Cleared') {
      return res.status(400).json({ error: 'Resume can only be updated when status is "Not Cleared"' });
    }

    // Only update Google Sheets - no mock fallback so we don't pretend success when sheet fails
    try {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_TAB}!C${studentData.rowIndex}:E${studentData.rowIndex}`,
        valueInputOption: 'RAW',
        resource: {
          values: [[newResumeLink, 'Grading Pending', studentData.data.feedback]]
        }
      });
    } catch (sheetsError) {
      const msg = sheetsError.message || String(sheetsError);
      const details = sheetsError.response?.data ? JSON.stringify(sheetsError.response.data) : '';
      console.error('Google Sheets update failed:', msg, details);
      return res.status(503).json({
        error: `Could not save to the sheet. Please try again. If it keeps failing, ensure the sheet has a tab named "${SHEET_TAB}" and the service account has Editor access.`
      });
    }

    console.log(`Updated Google Sheets for student ${studentCode} - preserved feedback`);
    res.json({
      success: true,
      message: 'Resume updated successfully. Status changed to "Grading Pending". Previous feedback has been preserved.'
    });

  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
  console.log(`Resume Grading Feedback server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
  console.log(`✅ Feedback preservation enabled - original feedback will be kept in Google Sheets`);
}); 