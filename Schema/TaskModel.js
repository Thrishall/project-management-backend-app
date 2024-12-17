const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required :true
        },
        priority:{
            type:String,
            enum:["HIGH PRIORITY","LOW PRIORITY","MODERATE PRIORITY"],
            required:true
        },
        progress:{
            type:String,
            enum:["BACKLOG","PROGRESS","DONE","TO-DO"],
            default: "TO-DO"
        },
        assignedto:{
            type:String
        },
        checkList:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"CheckList"
            }
        ],
        dueDate:{
            type:String
        },
        taskCreator:{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        },
        createdAt:{
            type: Date,
            default: Date.now
        }

    }
)

module.exports = mongoose.model("Task",TaskSchema);