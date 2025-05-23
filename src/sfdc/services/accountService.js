const { getConnection } = require('../config/salesforce');

async function createAccount(data) {
  const conn = await getConnection();
  return await conn.sobject('Account').create(data);
}

async function getAccountById(id) {
  const conn = await getConnection();
  const soql = `SELECT Id, Name, Phone, Rating__c FROM Account WHERE Id = '${id}'`;
  const result = await conn.query(soql);
  return result.records[0];
}

async function getAllAccounts() {
  const conn = await getConnection();
  const soql = `SELECT Id, Name, Phone FROM Account ORDER BY CreatedDate DESC LIMIT 50`;
  const result = await conn.query(soql);
  return result.records;
}

async function updateAccount(id, updates) {
  const conn = await getConnection();
  updates.Id = id;
  return await conn.sobject('Account').update(updates);
}

async function deleteAccount(id) {
  const conn = await getConnection();
  return await conn.sobject('Account').destroy(id);
}

module.exports = {
  createAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
  deleteAccount
};
