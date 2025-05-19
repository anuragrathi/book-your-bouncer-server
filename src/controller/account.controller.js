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

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("❌ Invalid MongoDB ObjectId:", id);
      return res.status(400).json({
        success: false,
        message: "Invalid account ID format",
        errorCode: "INVALID_OBJECT_ID"
      });
    }

    console.log("🔄 Updating Account:", id);
    console.log("📥 Incoming Update Payload:", JSON.stringify(req.body, null, 2));

    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAccount) {
      console.warn("⚠️ No account found with ID:", id);
      return res.status(404).json({
        success: false,
        message: "Account not found",
        errorCode: "NOT_FOUND"
      });
    }

    console.log("✅ Account updated successfully:", updatedAccount);
    return res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: updatedAccount
    });

  } catch (err) {
    console.error("💥 Account update failed:", err.message);

    return res.status(400).json({
      success: false,
      message: "Account update failed",
      error: err.message,
      errorCode: "UPDATE_ERROR"
    });
  }
};


module.exports = {
  createAccount,
  getAllAccounts,
  updateAccount,
};
