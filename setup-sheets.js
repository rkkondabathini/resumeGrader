const { google } = require('googleapis');
require('dotenv').config();

async function setupGoogleSheets() {
  console.log('🔧 Setting up Google Sheets API and permissions...\n');
  
  // Check environment variables
  console.log('📋 Current Configuration:');
  console.log('Sheet ID:', process.env.GOOGLE_SHEET_ID);
  console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
  console.log('');
  
  if (!process.env.GOOGLE_SHEET_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.error('❌ Missing required environment variables!');
    return;
  }

  try {
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
    console.log('\n📖 Testing sheet access...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'ResumeData!A:E',
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
    
    // Test writing to the sheet
    console.log('\n✍️ Testing write access...');
    const testUpdate = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'ResumeData!F1',
      valueInputOption: 'RAW',
      resource: {
        values: [['Test Write Access - ' + new Date().toISOString()]]
      }
    });
    
    console.log('✅ Write access successful!');
    
    // Clean up test data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'ResumeData!F:F',
    });
    
    console.log('🧹 Test data cleaned up');
    
    console.log('\n🎉 Google Sheets is fully configured and working!');
    console.log('Your Resume Grader will now update the actual Google Sheet.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('API has not been used') || error.message.includes('disabled')) {
      console.log('\n🔧 To fix this:');
      console.log('1. Go to: https://console.developers.google.com/apis/api/sheets.googleapis.com/overview?project=485591313736');
      console.log('2. Click "Enable" for Google Sheets API');
      console.log('3. Wait 2-3 minutes and try again');
    } else if (error.message.includes('permission') || error.message.includes('access')) {
      console.log('\n🔧 To fix this:');
      console.log('1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/' + process.env.GOOGLE_SHEET_ID);
      console.log('2. Click "Share" button');
      console.log('3. Add this email: ' + process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      console.log('4. Give "Editor" access');
      console.log('5. Make sure to share with "Anyone with the link" can view');
    } else {
      console.log('\n🔧 General troubleshooting:');
      console.log('1. Check your service account credentials');
      console.log('2. Verify the sheet ID is correct');
      console.log('3. Make sure the sheet has a tab named "ResumeData"');
    }
  }
}

setupGoogleSheets(); 