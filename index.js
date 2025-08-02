const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;
const HOST = "127.0.0.1";

let USERs = [];

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
  res.send("Working...");
});

app.post("/user", bodyParser.json(), (req, res) => {
  console.log(req.abc, "===abc");
  const id = Date.now();
  const user = {
    ...req.body,
    id,
  };
  USERs.push(user);
  res.status(201).json({ data: user });
});

app.get("/user", (req, res) => {
  res.status(200).json({ data: USERs });
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

app.listen(PORT, HOST, () => {
  console.log(`app is running on ${HOST}:${PORT}`);
});
