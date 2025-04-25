const userService = require('../services/auth.service');
const httpsStatus = require('../util/httpStatus')
const SignupVerification = require("../models/signUpVerification.model.js");
const UserModel = require("../models/user.model"); 
const SigninVerification = require('../models/signInVerification.model.js')
const tokenService=require("../services/token.service")
const bcrypt = require('bcrypt');
const sendOTP = require('../util/sendEmail');


const initiateSignup = async (req, res) => {

  try {
    const { name, email, username, password, role, hospital, specialization } = req.body;

    /*const user = userService.createUser({
        name, email, username, password, role,
        hospital: role === 'doctor' ? hospital : null,
        specialization: role === 'doctor' ? specialization : null
    })
    user.password = undefined;
    return res.status(httpsStatus.created).json({ message: "Account created successfully", user });
*/


    // Hash the password manually as temp schema doesn't have pre-save hook
    const hashedPassword = await bcrypt.hash(password, 8);

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP to store safely
    const hashedOtp = await bcrypt.hash(otp, 10);

    // Set OTP expiration (10 minutes from now)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Remove any previous temporary record if exists for the same email
    await SignupVerification.findOneAndDelete({ email });


    // Save signup data temporarily
    await SignupVerification.create({
      name,
      email,
      username,
      password: hashedPassword,
      role,
      hospital,
      specialization,
      otp: hashedOtp,
      expiresAt
    });

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP has been sent to your email" });
  }
  catch (err) {
    res.status(500).json({ message: "Signup initiation failed", error: err.message });
  }

}

// Endpoint: Verify OTP and create user
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the temporary record
    const tempRecord = await SignupVerification.findOne({ email });
    if (!tempRecord || tempRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Compare the entered OTP with hashed OTP stored
    const isMatch = await bcrypt.compare(otp, tempRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    // Create new user from the temporary data
    const newUser = await userService.createUser({
      name: tempRecord.name,
      email: tempRecord.email,
      username: tempRecord.username,
      password: tempRecord.password, // Already hashed in temporary record
      role: tempRecord.role,
      hospital: tempRecord.hospital,
      specialization: tempRecord.specialization,
      verified: true  // Mark as verified now
    });

    // Remove the temporary record
    await SignupVerification.deleteOne({ email });

    res.status(200).json({ message: "Email verified and user created successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP Verification failed", error: err.message });
  }
};

const initiateSignin = async (req, res) => {

  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select('+password');
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const isMatch =await user.isPasswordMatch(password);
console.log(isMatch)
    if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
    }
     // Generate a 6-digit OTP
     const otp = Math.floor(100000 + Math.random() * 900000).toString();
     // Hash OTP to store safely
     const hashedOtp = await bcrypt.hash(otp, 10);

     // Set OTP expiration (10 minutes from now)
     const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
     await SigninVerification.deleteOne({ email });
     // Save signup data temporarily
     await SigninVerification.create({
       email,
       otp: hashedOtp,
       expiresAt
     });

      await sendOTP(email, otp);
      res.status(200).json({ message: "OTP has been sent to your email" });
  }

  catch (err) {
    res.status(500).json({ message: "Signin initiation failed", error: err.message });
  }
}

const verifyLogin=async(req,res)=>{
  try
  {
    const { email, otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: " OTP is required" });
    }
    
    // Find the temporary record
    const tempRecord = await SigninVerification.findOne({ email });
    if (!tempRecord || tempRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const isMatch = await bcrypt.compare(otp, tempRecord.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }
    await SigninVerification.deleteOne({ email });
    const user=await UserModel.findOne({email})
    const token=tokenService.generateAuthToken(user);
    console.log(token);
    user.password=undefined;
    res.status(200).json({ message: "Login successful",token,user });


  }
  catch(e)
  {
    res.status(500).json({ message: "OTP Verification failed", error: e.message });
  }
}




module.exports = { initiateSignup, verifyOtp, initiateSignin,verifyLogin};