
const express = require("express");
const favouriteRou = express.Router();

const protectRoute = require("../middleware/protectRoute");
const favouriteController = require("../controllers/favouriteController");

favouriteRou.post("/:campId", protectRoute, favouriteController.toggleFavourite);

favouriteRou.get("/", protectRoute, favouriteController.getFavourites);

module.exports = favouriteRou;