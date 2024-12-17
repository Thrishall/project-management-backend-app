const express = require("express");
const router = express.Router();
const IsAuth = require("../middlewares/auth.js")
const createTask = require("../Controllers/createTask.js")
const updateTask = require("../Controllers/updateTask.js");
const deleteTask = require("../Controllers/deletetask.js");
const taskAnalytics = require("../Controllers/taskAnalytics.js");
const getSingleTask = require("../Controllers/gettaskbyId.js");
const getTaskFilter = require("../Controllers/gettaskfilter.js");

// create route to add new Task
router.post("/createTask",IsAuth,createTask)

// router to get task by filter
router.post("/getTask",IsAuth,getTaskFilter)

// create route for getting task by id
router.get("/getTasks/:taskId",IsAuth,getSingleTask)

// create route for updating the task
router.put("/updateTask/:taskId",IsAuth,updateTask)

// create route for delete particular task
router.delete("/deleteTask/:taskId",IsAuth,deleteTask)

// create route for fetching all task analytics
router.get("/analytics",IsAuth,taskAnalytics)


module.exports = router;