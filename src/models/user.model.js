const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  phone: {
    type: String,
  },
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "addresses",
    },
  ],
  // paymentInformation: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "payment_informtion",
  //   },
  // ],
  // ratings: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "ratings",
  //   },
  // ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "reviews",
  //   },
  // ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const user = mongoose.model("users", userschema);
module.exports = user;
