const mongoose = require("mongoose");

const bouncerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    // required: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  pricingPerHour: {
    type: Number,
    // required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  height: {
    type: Number,
    // required: true,
  },
  weight: {
    type: Number,
    // required: true,
  },
  chestSize: {
    type: Number,
    // required: true,
  },
  bicepSize: {
    type: Number,
    // required: true,
  },
  bodyColor: {
    type: String,
    // required: true,  
  },
  role: {
    type: String,
    default: "bouncer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bouncer", bouncerSchema);
