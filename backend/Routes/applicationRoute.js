const express = require("express")
const {applyJob,getMyApplications, getApplicants,updateApplicationStatus,uploadResume, deleteApplication,getApplications} = require("../Controllers/applicationController")
const authMiddleware = require("../Middleware/authMiddleware")
const roleMiddleware = require("../Middleware/roleMiddleware")
const candidateMiddlware = require("../Middleware/candidateMiddleware.js")
const upload = require("../Middleware/uploadMiddleware")
const router = express.Router()


//Appl for Job
router.post("/application/:jobId",authMiddleware,candidateMiddlware,applyJob)

//get the Specfic User Application
router.get("/application",authMiddleware,getMyApplications)

//get All Applications from Jobs posted By recuirter
router.get("/applicants",authMiddleware,roleMiddleware,getApplicants)

//Update Applicaiton from recuirter
router.patch("/application/:id/status",authMiddleware,roleMiddleware,updateApplicationStatus)

//Resume Route
router.post("/application/:applicationId/resume",authMiddleware,candidateMiddlware,upload.single("resume"),uploadResume)

//Delete Route
router.delete("/application/:applicationId",authMiddleware,deleteApplication)

//Job Application Stactistics
router.get("/application-stats",authMiddleware,roleMiddleware,getApplications)




module.exports = router