const Joi = require('joi');

const signUpValidation = Joi.object().keys({
    name: Joi.string().min(3).max(50).required().trim(),
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(), // ✅ Enforces valid email format
    password: Joi.string().required().min(8), // ✅ Ensure password is long enough
    role: Joi.string().valid("doctor", "patient").required(),


// Conditionally required if role is doctor
hospital: Joi.when('role', {
    is: 'doctor',
    then: Joi.string().min(2).required(),
    otherwise: Joi.forbidden()
}),
specialization: Joi.when('role', {
    is: 'doctor',
    then: Joi.string().min(3).required(),
    otherwise: Joi.forbidden()
})


});

const verifyOtpValidation = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).required()
  });

  const signinValidation = Joi.object().keys({
    
    email: Joi.string().email().required(), // ✅ Enforces valid email format
    password: Joi.string().required().min(8), // ✅ Ensure password is long enough

});


module.exports = { signUpValidation, verifyOtpValidation,signinValidation};
