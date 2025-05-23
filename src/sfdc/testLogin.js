const jsforce = require('jsforce');
require('dotenv').config();

async function testSalesforceLogin() {
  const conn = new jsforce.Connection({
    loginUrl: process.env.SF_LOGIN_URL,
    clientId: process.env.SF_CLIENT_ID,
    clientSecret: process.env.SF_CLIENT_SECRET
  });

  try {
    await conn.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_TOKEN
    );
    console.log('✅ Salesforce login successful!');
    console.log('🔑 Access Token:', conn.accessToken);
    console.log('👤 User ID:', conn.userInfo.id);
    console.log('🏢 Org ID:', conn.userInfo.organizationId);
  } catch (err) {
    console.error('❌ Salesforce login failed:', err.message);
  }
}

testSalesforceLogin();

// run using : PS C:\Users\agrom\OneDrive\Desktop\BYB_Anurag\book-your-bouncer-server> node "C:\Users\agrom\OneDrive\Desktop\BYB_Anurag\book-your-bouncer-server\src\sfdc\testLogin.js"
