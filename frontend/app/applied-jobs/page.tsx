"use client"

import styles from "./page.module.css"
import { FileCheck, Clock3, UserCheck, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AppliedJobs(){
    const router = useRouter()
    const [applications, setApplications] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true);

    //Fetch And send the data to backend 
    useEffect(()=>{
        const fetchApplication =async()=>{
            try{
                const token = localStorage.getItem("token")
                if(!token){
                    router.push("/login");
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application`,{
                    method:"GET",
                    headers:{
                        Authorization:`Bearer ${token}`
                    },
                })

                const data = await response.json()
                console.log(data)

                if(!response.ok){
                    throw new Error(data.message || "Failed to fetch applications")
                }
                setApplications(data.applications)
            }catch(err){
                console.log("Erroe Fetching application",err)
            }finally{
                setIsLoading(false)
            }
        }

        fetchApplication()
    },[router])

    //Total applications
    const totalApplications = applications.length; 

    const pendingApplications = applications.filter((app)=> app.status === "pending").length;
    const shortlistedApplications = applications.filter((app)=>app.status === "shortlisted").length
    const rejectedApplications = applications.filter((app)=>app.status === "rejected").length

    return(
        <div className={styles.mainComponent}>

            <div className={styles.rightSide}>
                <h1>Track your Applications</h1>
                <p>Here's your job search overview.</p>

                <div className={styles.MiddleBoxes}>

                    <div className={styles.firstBox}>
                        <FileCheck size={18} color="#A78BFA" />
                        <h1>{totalApplications}</h1>
                        <p>Applications</p>
                    </div>

                    <div className={styles.SecBox}>
                        <Clock3 size={18} color="#FBBF24" />
                        <h1>{pendingApplications}</h1>
                        <p>Pending</p>
                    </div>

                     <div className={styles.ThirdBox}>
                        <UserCheck size={18} color="#34D399" />
                        <h1>{shortlistedApplications}</h1>
                        <p>Shortlisted</p>
                    </div>

                     <div className={styles.fourthBox}>
                       <CircleX size={18} color="#F87171" />
                        <h1>{rejectedApplications}</h1>
                        <p>Rejected</p>
                    </div>
                </div>


                <div className={styles.downSide}>
                    <h1>Recent Application</h1>

                                        {isLoading ? (
                        <p>Loading applications...</p>
                    ) : applications.length === 0 ? (
                        <p>You haven't applied for any jobs yet.</p>
                    ) : (
                        applications.map((app) => (
                            <div className={styles.application} key={app._id}>
                                <div className={styles.logo}>
                                    {app.job?.company?.charAt(0) || "J"}
                                </div>

                                <div className={styles.applicationDetails}>
                                    <h3>{app.job?.title || "Job title unavailable"}</h3>

                                    <div className={styles.companyName}>
                                        <p>{app.job?.company || "Company unavailable"}</p>
                                        <span>·</span>
                                        <p>{app.job?.location || "Location unavailable"}</p>
                                    </div>

                                    <span className={styles.pending}>
                                        {app.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}

                  
                    
                   
                    


                </div>


                
               
            </div>



        </div>
    )
}