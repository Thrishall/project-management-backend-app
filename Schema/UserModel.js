const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        Assignies:[],
        AllTasks:[
            {
                type:mongoose.Schema.ObjectId,
                ref:"Task"
            }
        ]
    }
)

module.exports = mongoose.model("User",UserSchema);