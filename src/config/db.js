const { default: mongoose } = require("mongoose");
// connection to db
mondbUrl =
  "mongodb+srv://anuragrathi:kDGSLAShH6xVOTzJ@registrations.tlqyisv.mongodb.net/?retryWrites=true&w=majority&appName=REGISTRATIONS";
const connectDb = () => {
  console.log("Bouncer's DB is connected");
  return mongoose.connect(mondbUrl);
};

module.exports = { connectDb };
