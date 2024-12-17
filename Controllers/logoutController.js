const logoutController = async(req,res) => {

    try {
        
        res.cookie("cookies", "", {
            httpOnly: true,
            expires: new Date()
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });
        
    } catch(err){
        return res.status(500).json(
            {
                success: false, 
                data: "Something went wrong please try again later",
                message: `Internal Server error , ${err.message}`                
            }
        )
    }

}

module.exports = logoutController;