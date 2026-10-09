const express = require("express")
const app = express()
const ConnectDB = require("./config/db")
const userRoute = require("./Routes/userRoute")
const JobRoute = require("./Routes/jobRoute")

app.use(express.json())
app.use("/api",userRoute)
app.use("/api",JobRoute)





ConnectDB()
app.listen(1000,()=>{
    console.log("Server is listening")
})