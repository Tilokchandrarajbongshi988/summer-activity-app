const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },

  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
  }],
});

module.exports = mongoose.model("User", userSchema);