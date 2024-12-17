const User = require("../Schema/UserModel");

const assignTaskControllers = async (req, res) => {
    try {
        const { email } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is invalid or not found",
            });
        }

        const userExist = await User.findById(user.id)

        if (email === userExist.email) {
            return res.status(400).json({
                success: false,
                message: "Cannot assign task to yourself",
            });
        }

        if (userExist.Assignies.includes(email)) {
            return res.status(400).json({
                success: false,
                message: "User already assigned",
            });
        }

        const assignee = await User.findOne({ email });

        if (!assignee) {
            return res.status(404).json({
                success: false,
                message: "Assignee not found",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(user.id,{$push:{Assignies:email}},{new:true})

        return res.status(201).json({
            success: true,
            data: updatedUser,
            message: "User assigned tasks successfully",
        });
        
    } catch (err) {
        return res.status(500).json({
            success: false,
            data: "Something went wrong, please try again later.",
            message: `Internal Server error, ${err.message}`,
        });
    }
};

module.exports = assignTaskControllers;
