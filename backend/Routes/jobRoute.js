const express = require("express")
const authMiddleware = require("../Middleware/authMiddleware")
const roleMiddleware = require("../Middleware/roleMiddleware")
const {createJob,getJobs, updateJob, deleteJob} = require("../Controllers/jobController")
const router = express.Router()


//Create Job
router.post("/job",authMiddleware,roleMiddleware,createJob)

//Get Jobs
router.get("/job",getJobs)

//Update Jobs
router.put("/job/:id",authMiddleware,roleMiddleware,updateJob)

//Delete Jobs
router.delete("/job/:id",authMiddleware,roleMiddleware,deleteJob)


module.exports = router