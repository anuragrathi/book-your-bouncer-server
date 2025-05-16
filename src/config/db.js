const mongoose = require("mongoose");
require("dotenv").config();
const mongodbUrl = process.env.MONGO_URI;

const connectDb = () => {
  console.log("📡 Connecting to MongoDB...");
  return mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDb };
