#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Resume Grader Setup Wizard');
console.log('=============================\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setup() {
  try {
    console.log('This wizard will help you configure your Resume Grader application.\n');
    
    // Check if .env already exists
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const overwrite = await question('A .env file already exists. Do you want to overwrite it? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('Setup cancelled.');
        rl.close();
        return;
      }
    }

    console.log('\n📋 Please provide the following information:\n');

    const sheetId = await question('Google Sheet ID: ');
    const serviceAccountEmail = await question('Service Account Email: ');
    const privateKey = await question('Private Key (paste the entire key including BEGIN and END lines): ');
    const port = await question('Port (default: 3000): ') || '3000';

    // Create .env content
    const envContent = `# Google Sheets API Configuration
GOOGLE_SHEET_ID=${sheetId}
GOOGLE_SERVICE_ACCOUNT_EMAIL=${serviceAccountEmail}
GOOGLE_PRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"

# Server Configuration
PORT=${port}
`;

    // Write .env file
    fs.writeFileSync(envPath, envContent);

    console.log('\n✅ Configuration saved successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure your Google Sheet has a tab named "ResumeData"');
    console.log('2. Ensure your service account has Editor access to the sheet');
    console.log('3. Run "npm start" to start the application');
    console.log('4. Visit http://localhost:' + port + ' to access the app');
    
    console.log('\n📚 For detailed setup instructions, see README.md');
    console.log('📋 For Google Sheets template, see google-sheets-template.md');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setup(); 