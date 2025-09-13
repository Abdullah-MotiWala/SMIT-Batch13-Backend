const express = require("express");
const router = express.Router();
const { authGuard } = require("../middlewares/auth");
const { Ticket } = require("../schema/ticket.schema");
const { adminGuard } = require("../middlewares/adminGuard");

router.post("/", authGuard,adminGuard, async (req, res) => {
  let payload = req.body;
  const user = req.user;
  try {
    payload.createdBy = user.id;
    // const ticket = new Ticket(payload);
    // await ticket.save();

    await Ticket.create(payload);
    res.status(201).send({ message: "Ticket Created Succesfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/", authGuard, async (_, res) => {
  try {
    const tickets = await Ticket.find();
    res
      .status(201)
      .send({ message: "Ticket Created Succesfully", data: tickets });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { router };
