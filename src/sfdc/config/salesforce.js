const jsforce = require('jsforce');
require('dotenv').config();

let conn;

function getConnection() {
  if (!conn) {
    conn = new jsforce.Connection({
      loginUrl: process.env.SF_LOGIN_URL,
      clientId: process.env.SF_CLIENT_ID,
      clientSecret: process.env.SF_CLIENT_SECRET
    });

    return conn.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_TOKEN
    ).then(() => conn);
  }

  return Promise.resolve(conn);
}

module.exports = { getConnection };
