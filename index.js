const express = require("express");
const bodyParser = require("body-parser");
const { connectDB, getDB } = require("./db");

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
    const db = await getDB();
    await db.collection("user").insertOne(user);
    res.status(201).json({ data: user });
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
    .find({ name: "Ali" })
    .limit(limit)
    .skip(offset)
    .toArray();

  res.status(200).json({ data });
});
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = USERs.find((u) => u.id == id);
  res.status(200).json({ data: user });
});
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const newUsers = USERs.filter((u) => u.id != id);
  USERs = newUsers;
  res.status(200).json({ data: id, message: "Your user has been deleted" });
});
app.put("/user/:id", bodyParser.json(), (req, res) => {
  const { id } = req.params;
  const existingUser = USERs.find((u) => u.id == id);
  const newUsers = USERs.filter((u) => u.id != id);
  const updatedUser = {
    ...req.body,
    id: existingUser.id,
  };
  newUsers.push(updatedUser);

  USERs = newUsers;
  res.status(200).json({ data: updatedUser });
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, HOST, () => {
    console.log(`app is running on , and ${HOST}:${PORT}`);
  });
};

startServer();
