const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, trim: true },
    OwnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Age__c: { type: Number },
    Biceps_in_Inches__c: { type: String, maxlength: 112 },
    BillingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    Chest_in_Inches__c: { type: String, maxlength: 112 },
    CreatedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Date_of_Registration__c: { type: Date },
    Description: { type: String },
    Tier: { type: String, maxlength: 2 },
    Height__c: { type: String, maxlength: 112 },
    LastModifiedById: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    NumberofLocations__c: { type: Number },
    OperatingHoursId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OperatingHours",
    },
    Phone: { type: String },
    Rating: { type: Number, min: 1, max: 5 },
    ShippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    Weight__c: { type: String, maxlength: 112 },
    YearStarted: { type: String, maxlength: 4 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
