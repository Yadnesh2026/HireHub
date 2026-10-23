"use client"

import styles from "./page.module.css"
import {
  BriefcaseBusiness,
  UsersRound,
  UserRoundCheck,
  Clock3
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

type Job = {
  _id: string;
  title: string;
  company: string;
};

export default function RecuirterPortal(){
    const router = useRouter()
    const [jobs, setJobs] = useState<Job[]>([])

    const [totalApplicants, setTotalApplicants] = useState(0);
    const [shortlisted, setShortlisted] = useState(0);
    const [pendingReview, setPendingReview] = useState(0);

    useEffect(()=>{
        const fetchJobs =async()=>{
            try{

            const token = localStorage.getItem("token")
            if(!token){
                router.push("/login")
            }

            const response = await fetch(`${API_URL}/myjobs`,{
                method:"GET",
                headers:{
                     Authorization:`Bearer ${token}`
                }
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Soemthing went wrong")
            }

            setJobs(Array.isArray(data.job) ? data.job : [])
            setTotalApplicants(data.totalApplicants);
            setShortlisted(data.shortlisted);
            setPendingReview(data.pendingReview);


            }catch(err){
                console.log("Error fetching recuirter Jobs",err)
            }

        }

        fetchJobs()

    },[router])

    return(
        <div className={styles.mainComponent}>

            <div className={styles.rightSide}>
                <h1>Recruiter Dashboard</h1>
                <p>Manage your hiring activity</p>

                <button
                    type="button"
                    className={styles.postJob}
                    onClick={() => router.push("/post-job")}
                >
                    <p>+</p>
                    <p>Post a Job</p>
                </button>

                <div className={styles.Middleboxes}>
                    <div>
                        <BriefcaseBusiness color="#A78BFA" />
                        <h1>{jobs.length}</h1>
                        <p>Active Jobs</p>
                    </div>

                    <div>
                        <UsersRound  color="#C4B5FD"/>
                        <h1>{totalApplicants}</h1>
                        <p>Applications</p>
                    </div>

                    <div>
                        <UserRoundCheck color="#34D399"/>
                        <h1>{shortlisted}</h1>
                        <p>Shortlisted</p>
                    </div>

                    <div>
                        <Clock3 color="#FBBF24" />
                        <h1>{pendingReview}</h1>
                        <p>Pending Review</p>
                    </div>


                </div>

                <button
                    type="button"
                    className={styles.viewApplicants}
                    onClick={() => router.push("/applicants")}
                >
                    <UsersRound size={20} />
                    <span>View Applicants</span>
                    <span className={styles.applicantCount}>
                        {totalApplicants}
                    </span>
                </button>

               

                <div className={styles.downSide}>
                    <h1>Recent Job Posts</h1>

                     {jobs.length === 0 ?(
                    <p>No Jobs Posted yet.</p>
                ):(
                    jobs.slice(0,5).map((job)=>(
                        <div className={styles.jobPost} key={job._id}>
                        <h2>{job.title}</h2>
                        <p>{job.company}</p>

                    </div>
                        
                    ))
                )}

        

                </div>










            </div>


            
        </div>
    )
}