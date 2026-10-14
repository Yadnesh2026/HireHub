const express = require("express")
const app = express()
const ConnectDB = require("./config/db")
const userRoute = require("./Routes/userRoute")
const JobRoute = require("./Routes/jobRoute")
const applicationRoute = require("./Routes/applicationRoute")
const errMiddleware = require("./Middleware/errMiddleware");
const cors = require("cors")

app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use("/api",userRoute)
app.use("/api",JobRoute)
app.use("/api",applicationRoute)
app.use(errMiddleware)





const startServer = async()=>{
    try{
        await ConnectDB()
        app.listen(1000,()=>{
            console.log("Server is listening")
        })
    }catch(err){
        console.error("Database connection failed:", err.message)
        process.exit(1)
    }
}

startServer()