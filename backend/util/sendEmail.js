const nodemailer=require('nodemailer');
require('dotenv').config()

const transporter=nodemailer.createTransport(
    {
        service:"Gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    }
);

const sendOTPEmail = async (email, otp) => {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: `<h3>Your OTP is: ${otp}</h3><p>It expires in 10 minutes.</p>`,
    });
  };
  
  module.exports = sendOTPEmail;