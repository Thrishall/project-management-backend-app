const express = require("express");
const app = express();
require("dotenv").config();
const dbConnect = require("./Config/DataBaseConfig");
const userAuthRouter = require("./Routes/UserAuthRoutes");
const userRouter = require("./Routes/UserRoutes");
const taskRouter = require("./Routes/TaskRoutes")
const cors = require("cors")

const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: ['https://vercel.com/thrishall-rs-projects/project-management-frontend-app', 'http://localhost:5173'],
    credentials: true           
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1",userAuthRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",taskRouter)

app.listen(PORT,()=>{
    console.log(`Server started at Port ${process.env.PORT}`)
})

dbConnect();