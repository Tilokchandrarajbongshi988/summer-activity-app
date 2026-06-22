const mongoose = require("mongoose");

const campSchema = new mongoose.Schema({
  activityName: {
    type: String,
    required: true,
  },

  description: String,

  price: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  photo: String,

  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Camp", campSchema);