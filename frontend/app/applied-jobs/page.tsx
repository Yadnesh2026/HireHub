"use client"

import styles from "./page.module.css"
import Link from "next/link"
import { Search,UserRound,LayoutDashboard,FileCheck, Clock3,UserCheck, CircleX } from "lucide-react";
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
                    router.push("/login")
                }

                const response = await fetch("http://localhost:1000/api/application",{
                    method:"POST",
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
    const rejectedApplications = applications.filter((app)=>app.status === "rejected")

    return(
        <div className={styles.mainComponent}>

            <div className={styles.leftSide}>

                <div className={styles.dashboard}>
                    <LayoutDashboard size={20} className={styles.dashBoard_logo} />
                    <Link href="#">DashBoard</Link>

                </div>
               
                <div className={styles.find}>
                    <Search className={styles.featureIcon} />
                    <Link href="/jobs">Find Jobs</Link>
                </div>

                <div className={styles.profile}>
                    <UserRound size={20} />
                    <Link href="#">My Profile</Link>
                </div>
               
            </div>



            <div className={styles.rightSide}>
                <h1>Track your Applications</h1>
                <p>Here's your job search overview.</p>

                <div className={styles.MiddleBoxes}>

                    <div className={styles.firstBox}>
                        <FileCheck size={18} color="#A78BFA" />
                        <h1>04</h1>
                        <p>Applications</p>
                    </div>

                    <div className={styles.SecBox}>
                        <Clock3 size={18} color="#FBBF24" />
                        <h1>03</h1>
                        <p>Pending</p>
                    </div>

                     <div className={styles.ThirdBox}>
                        <UserCheck size={18} color="#34D399" />
                        <h1>03</h1>
                        <p>Shortlisted</p>
                    </div>

                     <div className={styles.fourthBox}>
                       <CircleX size={18} color="#F87171" />
                        <h1>03</h1>
                        <p>Rejected</p>
                    </div>
                </div>


                <div className={styles.downSide}>
                    <h1>Recent Application</h1>

                    <div className={styles.application}>
                        <div className={styles.logo}>A</div>

                        <div className={styles.applicationDetails}>
                            <h3>Backend Developer</h3>

                            <div className={styles.companyName}>
                                <p>TechNovaCrop</p>
                                <span>.</span>
                                <p>Pune</p>
                            </div>

                            <span className={styles.pending}>Pending</span>
                        </div>
                    </div>
                    
                   
                    


                </div>


                
               
            </div>



        </div>
    )
}