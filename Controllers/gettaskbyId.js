const Task = require("../Schema/TaskModel");

const getSingleTask = async(req,res)=>{

    try {

        const user = req.user;
        const {taskId} = req.params;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is invalid or not found",
            });
        }

        if(!taskId){
            return res.status(403).json({
                success: false,
                message: "Task Id not found",
            });
        }

        const getTask = await Task.findById(taskId).populate("checkList")

        if(!getTask){
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(201).json(
            {
                success: true, 
                message: "Task shared successfully",
                data:getTask    
            }
        );

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while fetching Task please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }



}

module.exports = getSingleTask;