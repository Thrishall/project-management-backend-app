const express = require("express");
const router = express.Router();
const userUpdateController = require("../Controllers/updateuser.js");
const assignTaskControllers = require("../Controllers/assignTask.js")
const IsAuth = require("../middlewares/auth.js");
const updatedUser = require("../Controllers/getUser.js");

// create route to update user
router.put("/update",IsAuth,userUpdateController)

// create route to assign task to different user
router.put("/assignTask",IsAuth,assignTaskControllers)

// create route to get userDeatils
router.get("/updatedUser",IsAuth,updatedUser)

module.exports = router;




