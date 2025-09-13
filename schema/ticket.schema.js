const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ticketSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

ticketSchema.index({ createdBy: 1 });
const Ticket = model("ticket", ticketSchema);
module.exports = { Ticket };
