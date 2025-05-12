const { default: mongoose } = require("mongoose");

const mongodbUrl = process.env.MONGODB_URI;

const connectDb = () => {
  console.log("📡 Connecting to MongoDB...");
  return mongoose.connect(mongodbUrl);
};

module.exports = { connectDb };
