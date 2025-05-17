const mongoose = require("mongoose");
const Account = require("../models/account.model.js");

// Create a new account
const createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an account by ID
const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid account ID" });
    }

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    res.json(updatedAccount);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  updateAccount,
};
