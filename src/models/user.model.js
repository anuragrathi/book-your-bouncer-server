const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false, minlength: 8 },
    googleId: { type: String, unique: true, sparse: true },
    image: String,
    phone: { type: String },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    authType: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("User", userSchema);
