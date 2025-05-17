const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true }, 
    ProductCode: { type: String, unique: true }, 
    Description: { type: String, maxlength: 4000 }, 
    IsActive: { type: Boolean, default: true }, 
    Bouncer_Build__c: {
      type: String,
      enum: ["Lightweight", "Medium", "Heavyweight"],
    }, 
    Bouncer_Category__c: {
      type: String,
      enum: ["Elite", "Standard", "Rookie"],
    },
    ProductClass: { type: String, enum: ["Standard", "Premium", "Economy"] }, 
    QuantityUnitOfMeasure: {
      type: String,
      enum: ["Hour", "Day", "Event", "Shift"],
    },
    SourceProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, 
    CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    LastModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
