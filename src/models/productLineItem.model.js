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
    OwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Created By
    LastModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Last Modified By
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductLineItem", productLineItemSchema);
