const express = require("express");
const hostRou = express.Router();


const protectRoute = require("../middleware/protectRoute");
const hostController = require("../controllers/hostController");

hostRou.post("/camp", protectRoute, hostController.createCamp);

hostRou.get("/my-camps", protectRoute, hostController.getMyCamps);

hostRou.put("/camp/:campId", protectRoute, hostController.updateCamp);

hostRou.delete("/camp/:campId", protectRoute, hostController.deleteCamp);

module.exports = hostRou;
