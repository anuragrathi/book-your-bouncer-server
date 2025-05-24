const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    Salutation: { type: String, trim: true },
    FirstName: { type: String, trim: true },
    LastName: { type: String, trim: true },
    Age__c: { type: Number },
    Biceps_in_Inches__c: {
      type: String,
      enum: [
        "14 Inches",
        "15 Inches",
        "16 Inches",
        "17 Inches",
        "18 Inches",
        "19 Inches",
        "20 Inches",
        "21 Inches",
        "23 Inches",
        "24 Inches",
        "25 Inches",
        "Above 25 Inches",
      ],
    },

    Chest_in_Inches__c: {
      type: String,
      enum: [
        "40 Inches",
        "42 Inches",
        "44 Inches",
        "46 Inches",
        "48 Inches",
        "50 Inches",
        "52 Inches",
        "54 Inches",
        "58 Inches",
        "60 Inches",
        "62 Inches",
        "64 Inches",
        "66 Inches",
        "68 Inches",
        "Above 68 Inches",
      ],
    },

    Height_in_Centimeters__c: {
      type: String,
      enum: [
        "173 CM",
        "174 CM",
        "175 CM",
        "176 CM",
        "178 CM",
        "179 CM",
        "180 CM",
        "181 CM",
        "182 CM",
        "183 CM",
        "184 CM",
        "185 CM",
        "186 CM",
        "187 CM",
        "188 CM",
        "189 CM",
        "190 CM",
        "Above 190 CM",
      ],
    },

    BillingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    ShippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    Date_of_Registration__c: { type: Date },

    Phone: { type: String },

    Rating: {
      type: String,
      enum: ["Hot", "Warm", "Cold"],
    },

    Weight_in_Kilograms__c: {
      type: Number,
      max: 999,
    },

    Active__c: {
      type: String,
      enum: ["Yes", "No"],
    },

    Profile_Image__c: { type: String },

    Display_Image_1__c: { type: String },
    Display_Image_2__c: { type: String },
    Display_Image_3__c: { type: String },
    Display_Image_4__c: { type: String },
    Display_Image_5__c: { type: String },
  },
  { timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("Account", accountSchema);
