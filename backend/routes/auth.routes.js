const express=require("express");
const authController=require('../controllers/auth.controller')
const validate=require('../middleware/validate')
const { signUpValidation, verifyOtpValidation, signinValidation}=require('../validations/auth.validation')
const asyncHandler=require('../helper/asyncHandler')
const router=express.Router();

router.post("/signup/initiate", validate(signUpValidation), asyncHandler(authController.initiateSignup));
router.post("/signup/verify", validate(verifyOtpValidation), asyncHandler(authController.verifyOtp));
router.post("/signin/initiate",validate(signinValidation), asyncHandler(authController.initiateSignin));
router.post("/signin/verify",validate(verifyOtpValidation), asyncHandler(authController.verifyLogin));


module.exports=router;