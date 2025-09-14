require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./db");
const { router: userRouter } = require("./router/user.router");
const { router: authRouter } = require("./router/auth.router");
const { router: ticketRouter } = require("./router/ticket.router");
const app = express();
const cors = require("cors");

const PORT = 5000;
const HOST = "127.0.0.1";
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(bodyParser.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/ticket", ticketRouter);

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
