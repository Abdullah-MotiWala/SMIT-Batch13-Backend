require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db");
const { router } = require("./router/user.router");
const app = express();

const PORT = 5000;
const HOST = "127.0.0.1";
app.use(bodyParser.json());
app.use("/user", router);

app.get("/", (req, res) => {
  res.send("Working fine");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, HOST, () => {
    console.log(`app is running on , and ${HOST}:${PORT}`);
  });
};

startServer();
