require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, getDB } = require("./db");
const { ObjectId } = require("mongodb");
const { User } = require("./schema/user.schema");
const app = express();


const PORT = 5000;
const HOST = "127.0.0.1";

// const bodyParser = {
//   json: () => {
//     return (req, res, next) => {
//       let userdata = "";
//       req.on("data", (chunk) => {
//         const stringedBuffer = chunk.toString();
//         userdata += stringedBuffer;
//       });
//       req.on("end", () => {
//         userdata = JSON.parse(userdata);
//         req.abc = userdata;
//         next();
//       });
//     };
//   },
// };

app.get("/", (req, res) => {
  res.send("Working fine");
});

app.post("/user", bodyParser.json(), async (req, res) => {
  try {
    const user = {
      ...req.body,
    };
    // const db = await getDB();
    // await db.collection("user").insertOne(user);
    // insertMany
    const newUser = new User(user);
    // const createdUser = await User.create(user);
    // console.log(newUser, "===createdUser");
    await newUser.save();
    res.status(201).json({ data: newUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/user", async (req, res) => {
  const db = await getDB();
  const page = 1;
  const limit = 100;

  const offset = (page - 1) * limit;
  const data = await db
    .collection("user")
    .find()
    .limit(limit)
    .skip(offset)
    .toArray();

  res.status(200).json({ data });
});
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const data = await User.findById(id);
  res.status(200).json({ data });
});
app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const result = await User.findByIdAndDelete(id);
  console.log(result);
  res.status(200).json({ data: id, message: "Your user has been deleted" });
});
app.put("/user/:id", bodyParser.json(), async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const userObjectId = new ObjectId(id);
  const db = await getDB();
  const condition = { _id: userObjectId };
  const existingUser = await db.collection("user").findOne(condition);

  const newPayload = {
    ...existingUser,
    ...payload,
  };

  await db.collection("user").updateOne(condition, { $set: newPayload });
  // updateMany

  res.status(200).json({ data: newPayload });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, HOST, () => {
    console.log(`app is running on , and ${HOST}:${PORT}`);
  });
};

startServer();
