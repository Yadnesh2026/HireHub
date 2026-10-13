"use client"

import { useParams } from "next/navigation"
import styles from "./page.module.css"
import { useEffect, useState } from "react";

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
    const params = useParams()
    const id = params.id

    const [job,setJob] = useState<Job | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
            const response = await fetch(`http://localhost:1000/api/job/${id}`)

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
                            <p>{job.salary}</p>
                        </div>

                        <div className={styles.btn}>
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
                        <p>{job.responsibilities}</p>
                    </div>

                    <div className={styles.require}>
                        <h1>Requirements</h1>
                        <p>{job.requirements}</p>
                    </div>
                  
                </div>





            </div>
        </main>
    )
}