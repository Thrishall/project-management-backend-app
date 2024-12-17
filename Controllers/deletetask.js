const Task = require("../Schema/TaskModel")
const User = require("../Schema/UserModel")

const deleteTask = async(req,res)=>{

    try {
        
        const user = req.user;
        const {taskId} = req.params;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is invalid or not found",
            });
        }

        const task = await Task.findById(taskId);
        
        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task invalid or not found",
            });
        }
        
        await Task.findByIdAndDelete(taskId);

        await User.findByIdAndUpdate(user.id,{$pull:{AllTasks:mongoose.Types.ObjectId(taskId)}},{new:true})

        return res.status(201).json(
            {
                success: true, 
                message: "Task Deleted Successfully", 
            }
        );

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while deleteing task please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }

}

module.exports = deleteTask;