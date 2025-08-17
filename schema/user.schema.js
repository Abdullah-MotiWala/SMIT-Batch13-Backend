const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, index: true },
    email: { type: String, required: true, unique: true },
    status: { type: Boolean, default: true },
    qualification: [{ type: { title: String }, required: true }],
    marriageYears: { type: Number, default: 0 },
    // createdAt:{type:Date,default:Date.now()}
  },
  { timestamps: true }
);

userSchema.index({ email: 1, status: 2 });
const User = model("user", userSchema);
module.exports = { User };
