const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const signupVerificationSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true // ⚠️ Hashed before saving
  },
  role: {
    type: String,
    enum: ["patient", "doctor"],
    default: null
  },
  hospital: {
    type: String,
    trim: true,
    required: function () {
      return this.role === 'doctor';
    }
  },
  specialization: {
    type: String,
    trim: true,
    required: function () {
      return this.role === 'doctor';
    }
  },
  otp: {
    type: String,
    required: true // 🔐 Hashed OTP
  },
  expiresAt: {
    type: Date,
    required: true // ⏳ When the OTP should expire
  }
}, { timestamps: true });

// Optional: Automatically remove expired documents
signupVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = model("SignupVerification", signupVerificationSchema);
