const User = require("../Schema/UserModel");

const updatedUser = async(req,res) => {
    
    try {

        const user = req.user;

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is Invalid or not found",
            });
        }

        const updatedUser = await User.findById(user.id)

        return res.status(201).json(
            {
                success: true, 
                data:updatedUser     
            }
        );

    } catch(err) {
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong while getting user details, please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }
}

module.exports = updatedUser;