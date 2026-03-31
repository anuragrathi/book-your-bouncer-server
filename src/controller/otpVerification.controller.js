const tempRegisterSchema = require('../models/temporaryRegiser.modal');
const SendMail = require("../middleware/mailSender.js")

const registerTemporary = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 5 * 60 * 1000; 

    await tempRegisterSchema.findOneAndUpdate(
      { email },
      { OTP, isVerified: false, otpExpire: expiryTime },
      { upsert: true, new: true }
    );

    SendMail(email, OTP);

    return res.status(200).json({ message: "Check mail inbox for OTP" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


const CheckOtp = async (req, res) => {
  const { email, OTP } = req.body;
  try {
    if (!email || !OTP) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await tempRegisterSchema.findOne({ email });

    if (!user || user.OTP !== OTP) {
      return res.status(400).json({ message: "Invalid OTP or Email" });
    }

    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isVerified = true;
    user.OTP = null;         
    user.otpExpire = null;   
    await user.save();

    return res.status(200).json({ message: "OTP VERIFIED SUCCESSFULLY" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getVerification = async (req, res) => {
  try {
    const verified = await tempRegisterSchema.find({ isVerified: true });

    if (!verified || verified.length === 0) {
      return res.status(404).json({ message: "No verified users found" });
    }

    return res.status(200).json({ message: "Verified users", data: verified });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

module.exports = {
  registerTemporary,
  CheckOtp,
  getVerification,
};
