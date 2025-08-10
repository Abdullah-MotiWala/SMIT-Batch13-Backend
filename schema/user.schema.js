const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  name: { type: String, required: true, default: "Mr" },
  age: Number,
  cnic: String,
  phone: String,
});
