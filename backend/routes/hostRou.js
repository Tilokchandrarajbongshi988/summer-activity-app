const express = require("express");
const hostRou = express.Router();


const protectRoute = require("../middleware/protectRoute");
const hostController = require("../controllers/hostController");

hostRou.post("/createcamp", protectRoute, hostController.createCamp);

hostRou.get("/my-camps", protectRoute, hostController.getMyCamps);

hostRou.get("/camp/:campId", protectRoute, hostController.getCampById);

hostRou.put("/camp/:campId", protectRoute, hostController.updateCamp);

hostRou.delete("/camp/:campId", protectRoute, hostController.deleteCamp);

module.exports = hostRou;
