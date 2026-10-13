"use client"

import { useState } from "react";
import styles from "./page.module.css"

export default function ApplyJob(){
     const [resume, setResume] = useState<File | null>(null);

     const handleSubmit = ()=>{
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