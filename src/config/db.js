const { default: mongoose } = require("mongoose");
//connect to the database
//enter in mondbUrl  "mongodb+srv://anuragrathi:kDGSLAShH6xVOTzJ@registrations.tlqyisv.mongodb.net/?retryWrites=true&w=majority&appName=REGISTRATIONS
// connection to db
// mondbUrl =
//   "******************************************************************";
const connectDb = () => {
  console.log("Bouncer's DB is connected");
  return mongoose.connect(mondbUrl);
};

module.exports = { connectDb };
