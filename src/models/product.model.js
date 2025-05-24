const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true },
    ProductCode: { type: String, unique: true },
    Description: { type: String, maxlength: 4000 },
    IsActive: { type: Boolean, default: true },
    Bouncer_Build__c: {
      type: String,
      enum: ["Lean Built", "Medium Built", "Heavy Built"],
    },
    Bouncer_Category__c: {
      type: String,
      enum: ["3rd Class", "2nd Class", "1st Class"],
    },

    SourceProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    LastModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("Product", productSchema);
