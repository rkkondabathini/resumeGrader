const { google } = require('googleapis');
require('dotenv').config();

async function testGoogleSheet() {
  try {
    console.log('🔍 Testing Google Sheets API connection...\n');
    
    // Check environment variables
    console.log('📋 Environment Variables:');
    console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);
    console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log('Private Key Length:', process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.length : 'NOT SET');
    console.log('');
    
    if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('❌ Missing required environment variables!');
      return;
    }

    // Setup authentication
    const auth = new google.auth.GoogleAuth({
      keyFile: null,
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('🔐 Authentication setup complete');
    
    // Create sheets client
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('📊 Sheets client created');

    // Test reading from the sheet
    console.log('\n📖 Reading data from sheet...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'ResumeData!A:E', // Read all columns
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      console.log('❌ No data found in sheet');
      return;
    }

    console.log(`✅ Successfully read ${rows.length} rows from sheet`);
    console.log('\n📋 Sheet Data:');
    console.log('='.repeat(80));
    
    rows.forEach((row, index) => {
      console.log(`Row ${index + 1}:`, row);
    });
    
    console.log('='.repeat(80));
    
    // Look for your specific student
    console.log('\n🔍 Looking for student: IITRPRAI_24081034');
    const targetStudent = rows.find(row => row[0] === 'IITRPRAI_24081034');
    
    if (targetStudent) {
      console.log('✅ Found student data:');
      console.log('Student Code:', targetStudent[0]);
      console.log('Auth Code:', targetStudent[1]);
      console.log('Resume Link:', targetStudent[2] || 'Not set');
      console.log('Status:', targetStudent[3] || 'Not set');
      console.log('Feedback:', targetStudent[4] || 'Not set');
    } else {
      console.log('❌ Student IITRPRAI_24081034 not found in sheet');
      console.log('Available student codes:');
      rows.slice(1).forEach(row => {
        if (row[0]) console.log('-', row[0]);
      });
    }

  } catch (error) {
    console.error('❌ Error testing Google Sheet:', error.message);
    if (error.code === 'ERR_OSSL_UNSUPPORTED') {
      console.log('\n💡 This is an OpenSSL compatibility issue with Node.js.');
      console.log('Try using Node.js 16 or 18 for better compatibility.');
    }
  }
}

testGoogleSheet(); 