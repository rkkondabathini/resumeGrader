const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Mock data simulating Google Sheets
const mockSheetData = [
  {
    studentCode: 'IITRPRAI_24081034',
    authCode: '123',
    resumeLink: 'https://drive.google.com/open?id=1zp206_FU1OhxbPIDWY2z93KgSrGSY8KY',
    status: 'Not Cleared',
    feedback: 'You have spelling mistakes'
  },
  {
    studentCode: 'IITRPRAI_2408103',
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

// Helper function to find student
function findStudent(studentCode, authCode) {
  return mockSheetData.find(student => 
    student.studentCode === studentCode && student.authCode === authCode
  );
}

// Helper function to find student by code only
function findStudentByCode(studentCode) {
  return mockSheetData.find(student => student.studentCode === studentCode);
}

// API Routes

// POST /api/check-status
app.post('/api/check-status', async (req, res) => {
  try {
    const { studentCode, authCode } = req.body;

    if (!studentCode || !authCode) {
      return res.status(400).json({ error: 'Student Code and Auth Code are required' });
    }

    const student = findStudent(studentCode, authCode);
    
    if (!student) {
      return res.status(404).json({ error: 'Invalid Student Code or Auth Code' });
    }

    res.json({
      resumeLink: student.resumeLink,
      status: student.status,
      feedback: student.feedback
    });

  } catch (error) {
    console.error('Error checking status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/update-resume
app.post('/api/update-resume', async (req, res) => {
  try {
    const { studentCode, newResumeLink } = req.body;

    if (!studentCode || !newResumeLink) {
      return res.status(400).json({ error: 'Student Code and new Resume Link are required' });
    }

    // Validate Google Drive link format
    if (!newResumeLink.startsWith('https://drive.google.com/')) {
      return res.status(400).json({ error: 'Please provide a valid Google Drive link' });
    }

    // Find the student
    const student = findStudentByCode(studentCode);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if status is "Not Cleared" (allow update only if not cleared)
    if (student.status !== 'Not Cleared') {
      return res.status(400).json({ error: 'Resume can only be updated when status is "Not Cleared"' });
    }

    // Update the student data
    student.resumeLink = newResumeLink;
    student.status = 'Grading Pending';
    student.feedback = '';

    console.log(`Updated student ${studentCode} with new resume link: ${newResumeLink}`);

    res.json({ 
      success: true, 
      message: 'Resume updated successfully. Status changed to "Grading Pending".' 
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Resume Grader Mock Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🎯 Resume Grader Mock Server running on port ${PORT}`);
  console.log(`📱 Visit http://localhost:${PORT} to access the application`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  console.log(`\n📋 Available test credentials:`);
  mockSheetData.forEach(student => {
    console.log(`   Student Code: ${student.studentCode} | Auth Code: ${student.authCode} | Status: ${student.status}`);
  });
}); 