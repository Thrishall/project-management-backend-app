const User = require("../Schema/UserModel");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userUpdateController =  async(req,res)=>{
    try{

        const {userName,email,oldPassword,newPassword} = req.body;
        
        const user = req.user

        const userExist = await User.findById(user.id);

        if(!userExist){
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        if(userName){
            userExist.userName = userName;
        }

        if (email) {
            if (email !== userExist.email) {
                const oldEmail = await User.findOne({ email });
                if(oldEmail) {
                    return res.status(400).json({
                        success: false,
                        message: "This email is already registered, Please choose a different email."
                    });
                }
                userExist.email = email;
            }
        }

        if(oldPassword && newPassword){

            const oldPasswordVerify = await bcrypt.compare(oldPassword,userExist.password)
            if(!oldPasswordVerify){
                return res.status(401).json({
                    success: false,
                    message: "Old Password not matching"
                });
            }

            try {

                const hashPassword = await bcrypt.hash(newPassword,10)
                userExist.password = hashPassword

            } catch(err){
                return res.status(401).json({
                    success: false,
                    message: "something went wrong while hashing password"
                });
            }

        }

        await userExist.save()

        const updatedData = await User.findById(userExist._id).select("-password -__v")

        return res.status(200).json({
            success: true,
            message: "User Updated successfully",
            data: updatedData
        });
    
    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while updating data please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        );
    }
}

module.exports = userUpdateController;