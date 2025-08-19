const mongoose = require("mongoose");

const BouncerReservationSchema = new mongoose.Schema({
  userid :{type:String,default:null},
  guestid:{type:String,default:null},
  Bouncerid:{type:String,required:true},
  name: { type: String, required: true },
  img: { type: String, required: true }
});

module.exports = mongoose.model("Reservation", BouncerReservationSchema);
