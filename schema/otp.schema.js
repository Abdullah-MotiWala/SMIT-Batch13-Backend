const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const otpSchema = new Schema(
  {
    code: { type: Number, required: true },
    userId: { type: String, required: true },
    expiredAt: { type: Date, required: false },
    resendAt: { type: Date },
    consumedAt: { type: Date },
  },
  { timestamps: true }
);

otpSchema.index({});
const Otp = model("otp", otpSchema);
module.exports = { Otp };
