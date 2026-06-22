// External Module
const express = require("express");
const authRou = express.Router();

// Local Module
const authController = require("../controllers/authController");
const protectRoute = require("../middleware/protectRoute");


authRou.post("/signup", authController.postSignUp);
authRou.post("/login", authController.postLogin);
authRou.post("/logout", authController.postLogout);

authRou.get("/me", protectRoute, authController.getMe);


module.exports = authRou;
