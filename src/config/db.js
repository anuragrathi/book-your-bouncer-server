const { default: mongoose } = require("mongoose");
<<<<<<< HEAD
//connect to the database
//enter in mondbUrl  "mongodb+srv://anuragrathi:kDGSLAShH6xVOTzJ@registrations.tlqyisv.mongodb.net/?retryWrites=true&w=majority&appName=REGISTRATIONS
=======
>>>>>>> 1174869f64a4eec9365c62d0df18241bdb792972
// connection to db
mondbUrl =
  "******************************************************************";
const connectDb = () => {
  console.log("Bouncer's DB is connected");
  return mongoose.connect(mondbUrl);
};

module.exports = { connectDb };
