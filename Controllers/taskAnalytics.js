const Task = require("../Schema/TaskModel");
const User = require("../Schema/UserModel")

const taskAnalytics = async(req,res)=>{

  const counts = {
    priority:{
        High:0,
        Moderate:0,
        Low:0
    },
    progress:{
        Backlog:0,
        Progress:0,
        Done:0,
        todo:0
    },
    dueDate:0
  }

    try {

        const user = req.user;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const existingUser = await User.findById(user.id)

        const allTasks = await Task.find({
          _id: { $in: existingUser.AllTasks }
        });

        allTasks.forEach((task) => {
            // total_Count based on priority
            if (task.priority === "LOW PRIORITY") {
              counts.priority.Low++;
            } else if (task.priority === "MODERATE PRIORITY") {
              counts.priority.Moderate++;
            } else if (task.priority === "HIGH PRIORITY") {
              counts.priority.High++;
            }
      
            // total_Count based on task progress
            if (task.progress === "BACKLOG") {
              counts.progress.Backlog++;
            } else if (task.progress === "TO-DO") {
              counts.progress.todo++;
            } else if (task.progress === "PROGRESS") {
              counts.progress.Progress++;
            } else if (task.progress === "DONE") {
              counts.progress.Done++;
            }
      
            if (task.dueDate) {
              counts.dueDate++;
            }

          });

        return res.status(201).json({
            success:true,
            message:"Task Analytics updated successfully",
            data:counts
        })

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while counting all task analytics, please try again later.",
                message: `Internal Server error , ${err.message}`                
            }
        );
    }
    
}

module.exports = taskAnalytics;


