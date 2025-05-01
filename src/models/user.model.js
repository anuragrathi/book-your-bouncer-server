const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    // required for Google and helpful for JWT
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // Only for local (JWT) users
    type: String,
  },
  googleId: {
    // Only for Google users
    type: String,
  },
  image: {
    // Optional profile pic (Google)
    type: String,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  phone: {
    type: String,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  authType: {
    type: String,
    enum: ["local", "google"],
    default: "local",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
