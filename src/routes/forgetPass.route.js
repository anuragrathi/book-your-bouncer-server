const express  = require("express");
const router = express.Router();
const forgetPassword  = require("../controller/forgetPass.controller.js");

router.post("/checkUser",forgetPassword.CheckUser);
router.post("/checkOtp",forgetPassword.CheckOtp);
router.post("/updatepass",forgetPassword.UpdatePassword);


module.exports = router;