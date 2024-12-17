const express = require("express");
const router = express.Router();
const registerController = require("../Controllers/registerController.js");
const loginController = require("../Controllers/loginController.js");
const logoutController = require("../Controllers/logoutController.js")

// create route to register new user
router.post("/register",registerController)

// create route for user login
router.post("/login",loginController)

// create route for logOut
router.post("/logout",logoutController)

module.exports = router;