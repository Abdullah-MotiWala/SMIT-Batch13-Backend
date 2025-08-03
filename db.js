const { MongoClient } = require("mongodb");
const { DB_NAME } = require("./lib/constants");

const uri = "mongodb+srv://abdullah:s3cr3t@cluster0.lkwwdsa.mongodb.net/";

const client = new MongoClient(uri);
let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("DB Connected");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const getDB = async () => {
  if (!db) {
    await connectDB();
  }
  return db;
};

module.exports = { connectDB, getDB };
