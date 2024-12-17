const mongoose = require("mongoose")

const CheckListSchema = new mongoose.Schema(
    {
        checked:{
            type:Boolean,
            default:false
        },
        checklistAdded:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model("CheckList",CheckListSchema);