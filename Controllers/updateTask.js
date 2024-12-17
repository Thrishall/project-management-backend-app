const Task = require("../Schema/TaskModel");
const CheckList = require("../Schema/checkListModel");
const User = require("../Schema/UserModel");

const updateTask = async(req,res)=>{

    try {

        const {title,priority,assignedto,checkList,dueDate,progress} = req.body;
        
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
                message: "Task is Invalid or not found",
            });
        }
        
        if (title || priority || assignedto || checkList || dueDate || progress){

            task.title = title;
            task.priority = priority;
            task.dueDate = dueDate;
            task.progress = progress;

            if (assignedto){

                const existingAssignie = await User.findOne({email:assignedto})

                if (!existingAssignie) {
                    return res.status(400).json({
                        success: false,
                        message: "Assignie not found",
                    });
                }
                
                task.assignedto = assignedto;    
                await User.findByIdAndUpdate(existingAssignie._id,{$push:{AllTasks:taskId}},{new:true})
                
            }

            if (checkList && Array.isArray(checkList)) {
                const checklistItems = await Promise.all(
                    checkList.map(async (item) => {
                        const newChecklist = await CheckList.create({
                            checklistAdded: item.checklistAdded,
                            checked: item.checked || false
                        });
                        return newChecklist._id;
                    })
                );
                task.checkList = checklistItems;
            }

            await task.save()
        }

        return res.status(201).json(
            {
                success: true, 
                message: "Task Updated Successfully",
                data: task   
            }
        );

    }catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while updating existing Task please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }

}

module.exports = updateTask;