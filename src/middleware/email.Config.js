const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "paramjeetsingh16346@gmail.com",
    pass: "guyh wcvl nxih yxdz",
  },
});

module.exports = transporter;