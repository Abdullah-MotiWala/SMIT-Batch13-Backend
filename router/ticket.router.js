const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { authorization } = require("../middlewares/authorization");

router.post("/", authorization, async (req, res) => {
  const payload = req.body;
  res.status(201).send({ message: "Ticket Created Succesfully" });
});

module.exports = { router };
