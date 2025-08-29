const user = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const SendEmail = require("../middleware/mailSender.js")

const CheckUser = async(req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
               return res.status(400).json({message:"Email is reuired"});
        }
          const OTP = Math.floor(100000 + Math.random() * 900000); 
        const findandUpdate = await user.findOneAndUpdate(
            {email},
            {$set:{OTP:OTP}}
        )
         SendEmail(email,OTP);
        if(!findandUpdate){
             return res.status(200).json({message:"Invalid email"});
        }
         return res.status(200).json({message:"Verify your email and otp"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
};


const CheckOtp = async(req,res)=>{
    const {email,OTP} = req.body;
    try {
        if(!email || !OTP){
               return res.status(400).json({message:"Email is reuired"});
        }
        const find = await user.findOne(
            {email,OTP},
        )
        if(!find){
             return res.status(200).json({message:"Invalid email or OTP"});
        }
         return res.status(200).json({message:"OTP VERIFIED SUCCESSFULLY"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
};


const UpdatePassword = async(req,res)=>{
    const {email,OTP,password} = req.body;
    try {
        if(!email ||!OTP || !password){
               return res.status(400).json({message:"Email or OTP or Password is reuired"});
        }
        const hashedPassword = await bcrypt.hash(password,12)
        const findandUpdate = await user.findOneAndUpdate(
            {email,OTP},
            {$set:{password: hashedPassword}}
        )
        if(!findandUpdate){
             return res.status(200).json({message:"Invalid email"});
        }
         return res.status(200).json({message:"Password update sucessfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"});
    }
}

module.exports = {
    CheckUser,
    CheckOtp,
    UpdatePassword,
}