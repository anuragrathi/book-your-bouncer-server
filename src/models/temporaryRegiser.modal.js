const mongoose = require('mongoose');


const tempRegisterSchema = new mongoose.Schema(
     {
        email :{type:String,required:true,unique:true},
        OTP:{type: Number,required:true},
        isVerified:{type: Boolean, default: false},
     }
);

module.exports = mongoose.model('temporaryRegister',tempRegisterSchema);