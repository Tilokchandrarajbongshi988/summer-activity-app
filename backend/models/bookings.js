const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },

  paymentMethod: {
    type: String,
    default: "dummy",
  },

  amountPaid: {
    type: Number,
    default: 0,
  },

  paidAt: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
