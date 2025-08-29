const { Verification_Email_Template } = require("../libs/Template.js");
const transporter = require("../middleware/email.Config.js")

const SendMail = async(email,OTP)=>{
    try{
              const info = await transporter.sendMail({
    from: '"Book Your Bouncer" <paramjeetsingh16346@gmail.com>',
    to: email,
    subject: "Verify your OTP",
    text: "Verify your OTP",
    html: Verification_Email_Template.replace("{verificationCode}",String(OTP)),
  });
  console.log("email sent sucessfully",info);
    }
  catch(error){
    console.log(error);
  }
}

module.exports = SendMail;