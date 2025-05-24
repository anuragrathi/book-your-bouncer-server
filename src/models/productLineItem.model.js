const mongoose = require("mongoose");

const productLineItemSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, maxlength: 80, trim: true },
    Account__c: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    Product__c: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    LastModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("ProductLineItem", productLineItemSchema);
