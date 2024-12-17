const Task = require("../Schema/TaskModel")
const User = require("../Schema/UserModel")
const CheckList = require("../Schema/checkListModel")

const createTask = async(req,res)=>{
    try {

        const {title,priority,assignedto,checkList,dueDate,progress} = req.body;    
        const user = req.user;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is Invalid or not found",
            });
        }

        if (!title || !priority ||!checkList){
            return res.status(400).json({
                success: false,
                message: "Please provide all the details Carefully",
            });
        }

        const existingTask = await Task.findOne({ title, taskCreator: user.id });
        
        if (existingTask) {
            return res.status(400).json({
                success: false,
                message: "Task is already created please create with different one"
            });
        }
        
        const checklistItems = await Promise.all(
            checkList.map(async (item) => {
                const newChecklist = await CheckList.create({
                    checklistAdded: item.checklistAdded,
                    checked:item.checked
                });
                return newChecklist._id;
            })
        );
        
        let newTask = await Task.create(
            {
                title,
                priority,
                assignedto,
                checkList:checklistItems,
                dueDate,
                taskCreator:user.id,
                progress
            }
        )

        await User.findByIdAndUpdate(user.id,{$push:{AllTasks:newTask._id}},{new:true})

        if(assignedto){
            const existingAssignie = await User.findOne({email:assignedto})
    
            if(!existingAssignie){
                return res.status(400).json({
                    success: false,
                    message: "Assignie not found"
                });
            }
    
            await User.findByIdAndUpdate(existingAssignie._id,{$push:{AllTasks:newTask._id}})

            return res.status(201).json(
                {
                    success: true,
                    message: "Task added to assignie successfully",
                    data: newTask
                }
            )
        }

        return res.status(201).json(
            {
                success: true, 
                message: "New Task created successfully",
                data: newTask    
            }
        );

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while creating new Task please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }
}

module.exports = createTask;