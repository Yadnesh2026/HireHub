"use client"

import { useState } from "react";
import styles from "./page.module.css"
import { useRouter,useSearchParams  } from "next/navigation";

export default function ApplyJob(){
     const [resume, setResume] = useState<File | null>(null);

     const searchParams = useSearchParams(); //useSearchParams() reads query parameters from the current URL.
     const router = useRouter()

     const handleSubmit = async()=>{
        if(!resume){
            alert("Please upload the Resume")
            return;
        }
        console.log("selected Resume",resume)

        const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];
            
        if(!allowedTypes.includes(resume.type)){
            alert("Please upload a PDF or DOC file")
            return
        }

        if(resume.size > 5 * 1024 * 1024){
            alert("Resume must be smaller than 5MB")
            return
        }

        console.log("Resume validation",resume.name)


        //Token after user Login    localStorage.getItem("token") retrieves the JWT saved during login.
        const token = localStorage.getItem("token");

        if(!token){
            alert("Please log in before applying for job.");
            router.push("/login") 
            return;
        }

        //Get the Job Id 
        const jobId = searchParams.get("jobId") //Used to get application JobId 

        //check if job id is missing
        if(!jobId){
            alert("Job ID is missing. Please selecet the job first ")
            return;
        }

        //Prepare the resume for submission
        const applicationData = new FormData() //new FormData() creates a container for form data, including files.

        applicationData.append("resume",resume)  //"resume" is the field name your backend would need to read.
        //applicationData.append("jobId",jobId)  //"jobId" identifies the job the candidate selected.

        //send te all Apply job response to backend
        const response = await fetch( `${process.env.NEXT_URL}/application/${jobId}`,{
            method:"POST",
            headers:{
                Authorization: `Bearer ${token}`
            },
            body:applicationData
        })

        const data = await response.json()
        console.log(data)

        //This displays the backend's message when available, or a fallback success message.
        if(!response.ok){
            alert(data.message || "Applicaation not send")
            return;
        }

        alert(data.message || "Application submitted successfully!");
        router.push("/jobs")

    

        
     }

    return(
        <main className={styles.main}>

            <section className={styles.header}>
                <p className={styles.eyebrow}>JOB APPLICATION</p>

                <h1>Apply for this position</h1>

                <p className={styles.subtitle}>
                    Take the next step in your career.
                    Upload your resume to apply for this role.
                </p>
            </section>

            <section className={styles.jobCard}>
                <div className={styles.jobIcon}>
                    <span>TC</span>
                </div>

                <div className={styles.jobInfo}>
                    <h2>Backend Developer</h2>
                    <p>TechCrop · Pune, India</p>

                    <span className={styles.jobType}>
                        Full-time
                    </span>
                </div>
            </section>

            <section className={styles.applicationCard}>
                <h2 className={styles.sectionTitle}>
                    Your application
                </h2>

                <p className={styles.description}>
                    Upload your latest resume so the recruiter
                    can review your qualifications.
                </p>

                <div className={styles.resumeSection}>
                    <label className={styles.label}>
                        Resume <span>*</span>
                    </label>

                    <label className={styles.uploadBox}>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) =>
                                setResume(e.target.files?.[0] ?? null)
                            }
                        />

                        <div className={styles.uploadIcon}>
                            <span>↑</span>
                        </div>

                        <h3>
                            {resume
                                ? resume.name
                                : "Upload your resume"}
                        </h3>

                        <p>
                            {resume
                                ? `${(resume.size / 1024 / 1024).toFixed(2)} MB`
                                : "Click to browse your files"}
                        </p>

                        <span className={styles.fileFormat}>
                            PDF, DOC or DOCX
                        </span>
                    </label>
                </div>

                

                <button
                    type="button"
                    className={styles.submitBtn}
                    disabled={!resume}
                    onClick={handleSubmit}
                >
                    Submit Application
                </button>

                <p className={styles.footerNote}>
                    Your application status will start as Pending.
                </p>
            </section>
        </main>
    )
}