const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const signinVerificationSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      otp: {
        type: String,
        required: true // 🔐 Hashed OTP
      },
      expiresAt: {
        type: Date,
        required: true // ⏳ When the OTP should expire
      }
    }, { timestamps: true }
)

signinVerificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = model("SigninVerification", signinVerificationSchema);