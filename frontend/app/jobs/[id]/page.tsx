"use client"

import { useParams } from "next/navigation"
import styles from "./page.module.css"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Job ={
    _id:string;
    title:string;
    description:string;
    company:string;
    location:string;
    salary:number;
    skills:string[];
    jobType:string;
    responsibilities:string;
    requirements:string;
}


export default function JobDetails(){
    const router = useRouter()
    const params = useParams()
    const id = params.id

    const [job,setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
            const response = await fetch(`${process.env.NEXT_URL}/job/${id}`)

            if(!response.ok){
                throw new Error("Failed to fetch job details");
            }
            const data = await response.json();

            console.log("Job ID:", id);
            console.log("API response:", data);

            setJob(data.job)

            }catch(err){
                console.log(err)
            }finally {
                setIsLoading(false);
            }
        }


        fetchData()
    },[id]) //[id] tells the effect to run again if the ID changes.

    //If Job is Loading 
    if (isLoading) {
    return <p>Loading job details...</p>;
    }

    if (!job) {
        return <p>Job not found.</p>;
    }


    return(
        <main>
            <div className={styles.mainComponent}>


                <div className={styles.upperSide}>

                    <div className={styles.leftUpper}>

                        <div className={styles.logo}>A</div>
                        
                        <div className={styles.SecSide}>
                            <div className={styles.titleInfo}>
                                <h1>{job.title}</h1>

                                    <div className={styles.innerContent}>
                                        <p>{job.company}</p>
                                        <p>{job.location}</p>
                                    </div>

                            </div>

                            <div className={styles.downSide}>
                                <p>{job.jobType}</p>
                                <p>On-site</p>
                            </div>
                        </div>

                    </div>



                    <div className={styles.rightUpper}>
                        <div>
                            <h1>Salary</h1>
                            <p>₹{job.salary.toLocaleString("en-IN")}</p>
                        </div>

                        <div className={styles.btn} 
                        onClick={()=> router.push(`/jobs/apply?jobId=${job._id}`)}>
                            <button>Apply</button>
                        </div>
                    </div>




                </div>



                <div className={styles.middleSide}>

                    <div className={styles.desc}>
                        <h1>Description</h1>
                        <p>{job.description}</p>
                    </div>

                    <div className={styles.responsi}>
                        <h1>Responsibilities</h1>
                        <ul>
                            {job.responsibilities.split("\n").filter(Boolean).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.require}>
                        <h1>Requirements</h1>
                        <ul>
                            {job.requirements.split("\n").filter(Boolean).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                  
                </div>





            </div>
        </main>
    )
}