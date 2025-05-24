mongoose = require("mongoose");
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account ID format",
        errorCode: "INVALID_OBJECT_ID",
      });
    }

    const updatedAccount = await Account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
        errorCode: "NOT_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: updatedAccount,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Account update failed",
      error: err.message,
      errorCode: "UPDATE_ERROR",
    });
  }
};

// ❌ Delete an account by ID
const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid account ID format",
        errorCode: "INVALID_OBJECT_ID",
      });
    }

    const deletedAccount = await Account.findByIdAndDelete(id);

    if (!deletedAccount) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
        errorCode: "NOT_FOUND",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
      data: deletedAccount,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: err.message,
      errorCode: "DELETE_ERROR",
    });
  }
};

module.exports = {
  createAccount,
  getAllAccounts,
  updateAccount,
  deleteAccount, // ← Export the new function
};
