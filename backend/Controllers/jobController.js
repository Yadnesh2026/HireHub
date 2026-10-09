const Job = require("../models/jobSchema")

//Create Job
const createJob = async(req,res,next)=>{
    try{
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

    }catch(err){
        next(err)
    }
      
}

//Get Jobs
const getJobs = async(req,res,next)=>{
    try{
    //Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1 ) * limit

    //Filtering by location and title
    const skill = req.query.skill
    const location = req.query.location;
    const title = req.query.title
    const filter ={}
    if(location){
        filter.location = location
    }
    if(title){
        filter.title={ $regex:title, $options:"i"}
    }
    if(skill){

        filter.skills = {$regex:skill, $options:"i"}
    }

    const getAll = await Job.find(filter).populate("recruiter","name email role")
    .skip(skip).limit(limit); // Give only name email role

    //List down the pages 
    const totalJobs = await Job.countDocuments(filter); //It counts how many job documents match your existing filter.
    const totalPages = Math.ceil(totalJobs/limit)

 res.status(200).json({
        message:"All Jobs",
        currentPage:page,
        totalJobs,
        totalPages,
        jobs:getAll
    })

    }catch(err){
        next(err)
    }
}
//     Suppose there are 23 jobs and your limit is 10:
// - Page 1: 10 jobs
// - Page 2: 10 jobs
// - Page 3: 3 jobs
// \(23 \div 10 = 2.3\), and Math.ceil(2.3) returns 3.

// limit = how many jobs per page.
// skip = how many jobs to skip before returning results.
// totalPages = how many pages are available in total.

//Update Job - Specfic Job can be deleted by that specific person only
const updateJob = async(req,res,next)=>{
    try{
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

    }catch(err){
        next(err)
    }
    
}

//Delete Route
const deleteJob = async(req,res,next)=>{
   try{
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

   }catch(err){
    next(err)
   }
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