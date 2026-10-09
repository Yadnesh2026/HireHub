const express = require("express")
const {applyJob,getMyApplications, getApplicants,updateApplicationStatus} = require("../Controllers/applicationController")
const authMiddleware = require("../Middleware/authMiddleware")
const roleMiddleware = require("../Middleware/roleMiddleware")
const candidateMiddlware = require("../Middleware/candidateMiddleware.js")
const router = express.Router()


//Appl for Job
router.post("/application/:jobId",authMiddleware,candidateMiddlware,applyJob)

//get the Specfic User Application
router.get("/application",authMiddleware,getMyApplications)

//get All Applications from Jobs posted By recuirter
router.get("/applicants",authMiddleware,roleMiddleware,getApplicants)

//Update Applicaiton from recuirter
router.patch("/application/:id/status",authMiddleware,roleMiddleware,updateApplicationStatus)

module.exports = router