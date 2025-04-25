const Joi = require('joi');

const userValidation = Joi.object({
  name: Joi.string().required(),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Phone number must be 10 digits' }),


  gender: Joi.string().valid('Male', 'Female', 'Others'),

  dob: Joi.date().iso().messages({
    'date.base': 'Invalid date format',
    'date.format': 'Date must be ISO format (YYYY-MM-DD)',
  }),

  bloodGroup: Joi.string().valid('O+', 'A+', 'B+', 'O-', 'A-', 'B-', 'AB+', 'AB-'),

  language: Joi.string().valid('English', 'Telugu', 'Hindi'),

  extraPhoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .allow('')
    .messages({ 'string.pattern.base': 'Extra phone number must be 10 digits' }),

  address: Joi.object({
    houseNo: Joi.string().allow('').optional().messages({
      'string.base': 'House number must be a string',
    }),
    colony: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    state: Joi.string().allow('').optional(),
    pincode: Joi.string()
      .pattern(/^[0-9]{6}$/)
      .allow('')
      .optional()
      .messages({ 'string.pattern.base': 'Pincode must be a 6-digit number' }),
  }).optional(), 
  // Handle profileImage as a string (URL)
  profileImage: Joi.optional()
});

module.exports = { userValidation };
