const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 80,
    },
    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      required: true,
    },
    bookingType: {
      type: String,
      enum: ["Hourly", "Daily", "Monthly"],
      required: true,
    },
    cancellationType: {
      type: String,
      enum: ["User Request", "Admin Cancelled"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastModifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: Schema.Types.ObjectId,
      refPath: "ownerModel",
      required: true,
    },
    ownerModel: {
      type: String,
      enum: ["User", "Group"],
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, strict: "throw" }
);

module.exports = mongoose.model("Booking", bookingSchema);
