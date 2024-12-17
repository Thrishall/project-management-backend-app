const User = require("../Schema/UserModel");
const bcrypt = require("bcrypt");

const registerController =  async(req,res)=>{
    try{

        const {userName,email,confirmPassword,password} = req.body;

        if(!userName || !email || !confirmPassword || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the details Carefully"
            });
        }

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "password and confirm password is not matching"
            });
        }

        const hashPassword = await bcrypt.hash(password,10)

        await User.create({userName,email,password:hashPassword})

        return res.status(201).json(
            {
                success: true, 
                message: "User Registered successfully",      
            }
        );

    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong please try again later.",
                message: `Internal Server error , ${err.message}`                
            }
        );
    }
}

module.exports = registerController;