const express = require("express")
const app = express()
const ConnectDB = require("./config/db")
const userRoute = require("./Routes/userRoute")
const JobRoute = require("./Routes/jobRoute")
const applicationRoute = require("./Routes/applicationRoute")
const errMiddleware = require("./Middleware/errMiddleware");
const cors = require("cors")
require("dotenv").config()

const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
].filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)
        ) {
            callback(null, true)
            return
        }

        callback(new Error("Origin is not allowed by CORS"))
    },
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