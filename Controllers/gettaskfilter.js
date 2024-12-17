const Task = require("../Schema/TaskModel");
const User = require("../Schema/UserModel")

const getTaskFilter = async (req, res) => {
    try {

        const user = req.user;
        const { filter } = req.body;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is invalid or not found",
            });
        }

        const existingUser = await User.findById(user.id)

        let allTask;

        if(!filter){
            allTask = await Task.find({
                _id: { $in: existingUser.AllTasks }
            }).populate("checkList")

        } else{
            const dateFromFrontend = new Date(filter.date);
            dateFromFrontend.setHours(0, 0, 0, 0);

            let startOfDay, endOfDay;

            if(filter.filterBy === "today"){
                startOfDay = dateFromFrontend;
                
                endOfDay = new Date(dateFromFrontend);
                endOfDay.setHours(23, 59, 59, 999);

            } else if(filter.filterBy === "week") {
                const dayOfWeek = ( dateFromFrontend.getDay() + 6 ) % 7;
                startOfDay = new Date(dateFromFrontend);
                startOfDay.setDate(dateFromFrontend.getDate() - dayOfWeek);
                startOfDay.setHours(0, 0, 0, 0);

                endOfDay = new Date(startOfDay);
                endOfDay.setDate(startOfDay.getDate() + 6);
                endOfDay.setHours(23, 59, 59, 999)

            } else if(filter.filterBy === "month") {
                startOfDay = new Date(dateFromFrontend.getFullYear(), dateFromFrontend.getMonth(), 1);
                startOfDay.setHours(0, 0, 0, 0);

                endOfDay = new Date(dateFromFrontend.getFullYear(), dateFromFrontend.getMonth() + 1, 0);
                endOfDay.setHours(23, 59, 59, 999);
            }

            allTask = await Task.find({
                _id: { $in: existingUser.AllTasks },
                createdAt:{
                    $gte: startOfDay,
                    $lt: endOfDay
                }
            }).populate("checkList")
        }

        return res.status(200).json({
            success: true,
            message: "Today's tasks",
            data: allTask
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching tasks. Please try again later.",
            error: `Internal Server error: ${err.message}`
        });
    }
};

module.exports = getTaskFilter;
