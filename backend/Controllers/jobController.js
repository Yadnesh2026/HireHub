const Job = require("../models/jobSchema")

//Create Job
const createJob = async(req,res,next)=>{
        console.log("CREATE JOB CONTROLLER REACHED");
    const{title, description, company, location, salary, skills}= req.body
    const recruiter = req.user.userId

    const newJob = new Job({
        title, description, company, location, salary, skills,recruiter
    })
    await newJob.save()

    res.status(201).json({
        message:"Job Created",
        job:{
            title:newJob.title,
            company:newJob.company
        }
    })
}

//Get Jobs
const getJobs = async(req,res,next)=>{
    const getAll = await Job.find().populate("recruiter","name email role") // Give only name email role

    res.status(200).json({
        message:"All Jobs",
        jobs:getAll
    })
}

//Update Job - Specfic Job can be deleted by that specific person only
const updateJob = async(req,res,next)=>{
    const id = req.params.id
    const job = await Job.findById(id)
    const {title,description,company, location,salary,skills} = req.body

    if(!job){
        return res.status(404).json({
            message:"Job not found"
        })
    }
    //Check if the Job recuirter and Current Recuirter are same or not
    if(job.recruiter.toString() !== req.user.userId){
        return res.status(403).json({
            message:"You are not the Owner of this Job"
        })
    }
    //Update Job
    const updateJob = await Job.findByIdAndUpdate(
        id,{
            title,description,company,location,salary,skills
        },{new:true}
    )

    res.status(200).json({
        message:"Job Updated",
        job:{
            title:updateJob.title
        }
    })
}

//Delete Route
const deleteJob = async(req,res,next)=>{
    const id =req.params.id
    const job = await Job.findById(id)

    if(!job){
        return res.status(400).json({
            message:"Job does not exist"
        })
    }

    if(job.recruiter.toString() !== req.user.userId){
        return res.status(403).json({
            message:"You are not This Job Recruiter"
        })
    }

    await Job.findByIdAndDelete(id)

    res.status(200).json({
        message:"Job Deleted"
    })
}

// Find resource
//      ↓
// Does it exist?
//      ↓
// Who owns it?
//      ↓
// Is logged-in user the owner?
//      ↓
// YES → modify/delete
// NO  → 403


module.exports = {createJob, getJobs, updateJob,deleteJob}