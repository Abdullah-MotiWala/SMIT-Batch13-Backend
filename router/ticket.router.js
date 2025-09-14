const express = require("express");
const router = express.Router();
const { authGuard } = require("../middlewares/auth");
const { Ticket } = require("../schema/ticket.schema");
const { adminGuard } = require("../middlewares/adminGuard");
const { User } = require("../schema/user.schema");

router.post("/", authGuard, adminGuard, async (req, res) => {
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
    // const tickets = await Ticket.find().populate({
    //   path: "createdBy",
    //   model: "user",
    //   select: "firstName lastName email",
    // });

    const tickets = await Ticket.find().populate({
      path: "createdBy",
      select: "firstName lastName email",
    });

    const ticketWithUsers = [];
    // tickets.forEach(async (ticket) => {
    //   const userId = ticket.createdBy;
    //   const user = await User.findById(userId);
    //   const newTicket = {
    //     ...ticket._doc,
    //     user,
    //   };
    //   console.log(newTicket);
    //   ticketWithUsers.push(newTicket);
    // });
    res
      .status(200)
      .send({ message: "Ticket Created Succesfully", data: tickets });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { router };
