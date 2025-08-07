#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function fixEnv() {
  console.log('🔧 Fixing .env file configuration...\n');
  
  try {
    // Read current .env file
    const envPath = '.env';
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    console.log('Current .env content:');
    console.log(envContent);
    console.log('\n---\n');
    
    console.log('📋 Please provide your Google Service Account private key:');
    console.log('(This should start with "-----BEGIN PRIVATE KEY-----" and end with "-----END PRIVATE KEY-----")');
    console.log('You can find this in your downloaded JSON file from Google Cloud Console.\n');
    
    const privateKey = await question('Paste your private key here: ');
    
    // Create new .env content
    const newEnvContent = `# Google Sheets API Configuration
GOOGLE_SHEET_ID=11qyHUhaQOu_CLbG584_iBfQx7-Yw0yApW68fVTHrgtY
GOOGLE_SERVICE_ACCOUNT_EMAIL=resumegrader@gmark-456615.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"

# Server Configuration
PORT=3000
`;
    
    // Write the new .env file
    fs.writeFileSync(envPath, newEnvContent);
    
    console.log('\n✅ .env file updated successfully!');
    console.log('\n🚀 You can now run: npm start');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

fixEnv(); 