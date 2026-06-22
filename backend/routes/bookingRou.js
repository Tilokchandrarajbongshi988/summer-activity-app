const express = require("express");
const bookingRou = express.Router();

const protectRoute = require("../middleware/protectRoute");
const bookingController =require("../controllers/bookingController");

bookingRou.post("/:campId", protectRoute, bookingController.bookCamp);

bookingRou.get("/", protectRoute, bookingController.getMyBookings);


module.exports = bookingRou;