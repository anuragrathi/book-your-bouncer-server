const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
  try {
    const { name, email, password } = userData;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error(`User already exists with email: ${email}`);
    }
    const user = await User.create({
      name,
      email,
      password, // Let the model's pre-save hook handle hashing
    });
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).populate("address");
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No user found with email: ${email}`);
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserProfileByToken = async (token) => {
  try {
    if (!token) throw new Error("Authentication token is required");

    const decoded = jwtProvider.verifyToken(token);
    if (!decoded || !decoded.id) {
      throw new Error("Invalid token or token payload");
    }

    const user = await User.findById(decoded.id)
      .select("-password")
      .populate("address");
    if (!user) {
      throw new Error("User not found from token");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find().select("-password").populate("address");
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  findUserById,
  getUserByEmail,
  getUserProfileByToken,
  getAllUsers,
};
