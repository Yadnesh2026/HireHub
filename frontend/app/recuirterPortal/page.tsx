"use client"

import LeftSidebar from "@/components/LeftSidebar"
import styles from "./page.module.css"
import {
  BriefcaseBusiness,
  UsersRound,
  UserRoundCheck,
  Clock3
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function RecuirterPortal(){
    const router = useRouter()
    const [jobs, setJobs] = useState<any[]>([])

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

            const response = await fetch("http://localhost:1000/api/myjobs",{
                method:"GET",
                headers:{
                     Authorization:`Bearer ${token}`
                }
            })

            const data = await response.json()

            if(!response.ok){
                throw new Error(data.message || "Soemthing went wrong")
            }

            setJobs(data.job)
            setTotalApplicants(data.totalApplicants);
            setShortlisted(data.shortlisted);
            setPendingReview(data.pendingReview);


            }catch(err){
                console.log("Error fetching recuirter Jobs",err)
            }

        }

        fetchJobs()

    },[])

    return(
        <div className={styles.mainComponent}>

            <div><LeftSidebar/></div>

            <div className={styles.rightSide}>
                <h1>Recruiter Dashboard</h1>
                <p>Manage your hiring activity</p>

                <div className={styles.postJob}>
                    <p>+</p>
                    <p>Post a Job</p>
                </div>

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

                
               

                <div className={styles.downSide}>
                    <h1>Recent Job Posts</h1>

                     {jobs.length === 0 ?(
                    <p>No Jobs Posted yet.</p>
                ):(
                    jobs.slice(0,5).map((job)=>(
                        <div className={styles.jobPost}>
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