const express = require('express');
const router = express.Router();
const OtpController = require("../controller/otpVerification.controller.js");


router.post("/tempRegister",OtpController.registerTemporary);
router.post("/VerifyingOTP",OtpController.CheckOtp);
router.get("/getVerified",OtpController.getVerification);

module.exports = router;