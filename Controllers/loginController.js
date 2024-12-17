const User = require("../Schema/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController =  async(req,res)=>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the details Carefully"
            });
        }

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(404).json({
                success: false,
                message: "User not registered"
            });
        }
        
        const isPasswordVerified = await bcrypt.compare(password,userExist.password)

        if(!isPasswordVerified){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const user = await User.findById(userExist._id).select("-password -__v")

        const payload = {
            id: userExist._id
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: "24h"
        })

        const options = {
            expiresIn : new Date( Date.now()+1*24*60*60*1000),
            httpOnly:true,
        }

        return res.cookie("cookies",token,options).status(201).json({
            success:true,
            token,
            message:"User Logged in Successfully",
            data:user
        })

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong, please try again later.",
                message: `Internal Server error , ${err.message}`                
            }
        );
    }
}

module.exports = loginController;