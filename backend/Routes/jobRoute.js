const express = require("express")
const authMiddleware = require("../Middleware/authMiddleware")
const roleMiddleware = require("../Middleware/roleMiddleware")
const {createJob,getJobs, updateJob, deleteJob, getMyJobs} = require("../Controllers/jobController")
const router = express.Router()


//Create Job
router.post("/job",authMiddleware,roleMiddleware,createJob)

//Get Jobs
router.get("/job",getJobs)

//Update Jobs
router.put("/job/:id",authMiddleware,roleMiddleware,updateJob)

//Delete Jobs
router.delete("/job/:id",authMiddleware,roleMiddleware,deleteJob)

// Recruiter dashboard — view their own jobs
router.get("/myjobs",authMiddleware,roleMiddleware,getMyJobs)


module.exports = router

// Test A — All jobs
// GET http://localhost:1000/api/jobs
// Returns all jobs.

// Test B — Filter by location
// GET http://localhost:1000/api/jobs?location=Pune
// Returns jobs whose location is exactly Pune.