const user = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const SendEmail = require("../middleware/mailSender.js")

const CheckUser = async(req,res)=>{
    const {email} = req.body;
    try {
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }

        const OTP = Math.floor(100000 + Math.random() * 900000); 
        const expiryTime = Date.now() + 5 * 60 * 1000; // 5 min

        const findandUpdate = await user.findOneAndUpdate(
            { email },
            { $set: { OTP: OTP, otpExpire: expiryTime } },
            { new: true }
        );

        if(!findandUpdate){
            return res.status(200).json({message:"Invalid email"});
        }

        // Send OTP
        SendEmail(email, OTP);

        return res.status(200).json({message:"Verify your email and OTP"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error"});
    }
};


const CheckOtp = async(req,res)=>{
    const {email, OTP} = req.body;
    try {
        if(!email || !OTP){
            return res.status(400).json({message:"Email and OTP are required"});
        }

        const find = await user.findOne({ email });

        if(!find || !find.OTP || find.OTP !== OTP){
            return res.status(200).json({message:"Invalid email or OTP"});
        }

        if(find.otpExpire < Date.now()){
            return res.status(400).json({message:"OTP expired"});
        }

        return res.status(200).json({message:"OTP VERIFIED SUCCESSFULLY"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error"});
    }
};


const UpdatePassword = async(req,res)=>{
    const {email, OTP, password} = req.body;
    try {
        if(!email || !OTP || !password){
            return res.status(400).json({message:"Email, OTP, and Password are required"});
        }

        const find = await user.findOne({ email });

        if(!find || find.OTP !== OTP){
            return res.status(200).json({message:"Invalid email or OTP"});
        }

        if(find.otpExpire < Date.now()){
            return res.status(200).json({message:"OTP expired"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        find.password = hashedPassword;
        find.OTP = null;
        find.otpExpire = null;
        await find.save();

        return res.status(200).json({message:"Password updated successfully"});
    } catch (error) {
        console.log(error);
    return res.status(500).json({message:"Server error"});
    }
};


module.exports = {
    CheckUser,
    CheckOtp,
    UpdatePassword,
}
