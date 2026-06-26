const express = require("express");
const guestRou = express.Router();

const protectRoute = require("../middleware/protectRoute");
const guestController = require("../controllers/guestController");

guestRou.get("/", protectRoute, guestController.getAllCamps);
guestRou.get("/camps/:campId", protectRoute, guestController.getCampDetails);



module.exports = guestRou;
