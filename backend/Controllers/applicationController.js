const Application = require("../models/applicationSchema.js");
const Application = require("../models/applicationSchema.js");
const Job = require("../models/jobSchema");
const mongoose = require("mongoose")



const applyJob = async (req, res, next) => {
try{
const jobId = req.params.jobId;
const candidateId = req.user.userId;

const job = await Job.findById(jobId);

if (!job) {
    return res.status(404).json({
      message: "Job not exist",
    });
}

//If the same candidate has apply for the Job or not
const exisitingApplication = await Application.findOne({
    candidate: candidateId,
    job: jobId,
});

if (exisitingApplication) {
    return res.status(409).json({
      message: "You have already applied for this Job",
    });
}

//if not exist create new Application
const newApplication = new Application({
    candidate: candidateId,
    job: jobId,
});
await newApplication.save();

res.status(200).json({
    message: "Applied Successfully",
});
    }catch(err){
        next(err)
    }
};




//Get User All Applications
const getMyApplications = async (req, res, next) => {
    try{
    // find() returns all matching documents of the loggedIn user
    const application = await Application.find({candidate: req.user.userId,}).populate("job");

    res.status(200).json({
    message:"All Applications of Job",
    applications: application
    })

    }catch(err){
        next(err)
    }
 
};




//Get applications for recuriter
const getApplicants =async(req,res,next)=>{
    try{
    //Give all the Job posted By rescuirter
    const allJob = await Job.find({recruiter: req.user.userId}) //Findd all the Job this recruiter posted

    const jobIds = allJob.map((job)=> job._id) //Extract only Job IDs into array

    const allApplications = await Application.find({
        job:{$in: jobIds } //Find applications for those jobs who has applied
    }).populate("candidate","name email").populate("job","title company")

    res.status(200).json({
        message:"Applicants fetched successfully",
        applications:allApplications
    })

    }catch(err){
        next(err)
    }

}

//Update Application to Pending, rejected, shortlisted by recuirter
const updateApplicationStatus = async(req,res,next)=>{
    try{
         const applicationId = req.params.id
    //Check if the ApplicationId is valid or not....OR it is send from direct Postman 
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
    return res.status(400).json({
        message: "Invalid application ID"
    });
    }
    const status = req.body.status //Coming from frontend what does they selcetd

    //Search in Mongo for application
    const application = await Application.findById(applicationId)

    if(!application){
        return res.status(404).json({
            message:"Application not found"
        })
    }
    //Who owns this job
    const job = await Job.findById(application.job) //Beacuse job is unders applicationSchema so we can use its id as this
    if (!job) {
    return res.status(404).json({
        message: "Job not found"
    });
    }

    //If the Same recuirter is updating the Job or not 
    if(job.recruiter.toString() != req.user.userId){
        return res.status(400).json({
            message:"You are not athuorised recruiter To Update this Job"
        })
    }

   const allowedStatuses = ["pending", "shortlisted", "rejected"];

   //Check if this above are same from frontend or not 
   if(! allowedStatuses.includes(status)){
     return res.status(400).json({
        message: "Invalid application status"
    });
   }


   application.status = status
   await application.save();

   res.status(200).json({
    message:"Application Updated"
   })

    }catch(err){
        next(err)
    }
}


//Resume Upload 
const uploadResume =async(req,res,next)=>{
    try{
        const resume = req.file
        const applicationId = req.params.applicationId
        if(!resume){
            return res.status(400).json({
                message:"Please Upload Resume"
            })
        }

        const application = await Application.findById(applicationId)
        if(!application){
            return res.status(400).json({
                message:"It is not Found"
            })
        }
        const candidateId = req.user.userId
        if(candidateId !== application.candidate.toString()){
            return res.status(402).json({
                message:"You are not the application candidate"
            })
        }
        application.resume = resume.path //stores the uploaded file's path in the application document.
        await application.save()

        return res.status(200).json({
            message:"Resume Uploaded Successfully",
            resume:application.resume
        })
    }catch(err){
        next(err)
    }
}

//Delete Application - Withdraw the application
const deleteApplication = async(req,res,next)=>{
    try{
    const applicationId = req.params.applicationId
    const candidate = req.user.userId

    const application = await Application.findById(applicationId)

    if(!application){
        return res.status(404).json({
            message:"Application does not exist"
        })
    }

    if(candidate != application.candidate.toString() ){
        return res.status(403).json({
            message:"You are not owner of this application"
        })
    }

    const deleteApplication = await Application.findByIdAndDelete(applicationId)

    res.status(200).json({
        message:"Application Deleted",
        deleteApplication
    })

    }catch(err){
        next(err)
    }
}

//Job application statistics for recuriter
const getApplications =  async(req,res)=>{
    try{
         const recruiter = req.user.userId
    const jobs = await Job.find({recruiter:recruiter}) //Find that recruiter's jobs
    const jobId = jobs.map((job)=> job._id); //Collect the job IDs ex:[j1, j2]

    //Find applications for those jobs
    const application = await Application.find({
        job:{$in: jobId} //Find applications where the job field matches any ID inside the jobIds array.
    })

    //Count pending applications
    const pendingApplication = application.filter(
        (application)=> application.status === "pending"
    ).length

    //count shortlisted applications
    const shortlistedApplication = application.filter(
        (application)=> application.status === "shortlisted"
    ).length

    //count rejected applications
    const rejectedApplication = application.filter(
        (application)=> application.status === "rejected"
    ).length

    const totalApplications = application.length;

    res.status(200).json({
        message:"All filter Applicatios",
        totalApplications: totalApplications,
        status:{
            pending: pendingApplication,
            shortlisted: shortlistedApplication,
            rejected: rejectedApplication
        }
    })

    }catch(err){
        next(err)
    }
}







module.exports = {applyJob,
    getMyApplications,
    getApplicants,updateApplicationStatus,
    uploadResume,
    deleteApplication,
    getApplications}
