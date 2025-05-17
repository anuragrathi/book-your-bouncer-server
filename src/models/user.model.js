const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, select: false, minlength: 8 },
    googleId: { type: String, unique: true, sparse: true },
    image: String,
    phone: { type: String },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    authType: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);

/* Hash password if modified */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
