const mongoose = require("mongoose");
const { connect } = mongoose;

const uri = process.env.DB_URI;
const connectDB = async () => {
  try {
    await connect(uri);
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDB };
