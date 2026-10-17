"use client"
import { useState } from "react"
import styles from "./page.module.css"

export default function postJob(){
    const [formData, setFormData] = useState({
        title:"",
        company:"",
        locaton:"",
        salary:"",
        jobtype:"",
        description:"",
        skills:""
    })

    return(
        <div className={styles.mainComponent}>

            <div className={styles.upperSide}>
                <h1>Post a Job</h1>
                <p>Create a new opportunity for candidates.</p>
            </div>

            <div className={styles.formSide}>
                <h2>Job Information</h2>

                <form>
                    <div className={styles.titleCompany}>
                        <div className={styles.title}>
                            <label htmlFor="title">Job Title</label>
                            <input placeholder="e.g Backend Developer" name="title" id="title"/>
                        </div>

                        <div className={styles.company}>
                            <label htmlFor="company">Company</label>
                            <input placeholder="Company name" name="company" id="company"/>
                        </div>
                    </div>

                    <div className={styles.locationSalary}>
                        <div className={styles.location}>
                            <label htmlFor="location">Location</label>
                            <input placeholder="e.g Pune/Remote" name="location" id="location"/>
                        </div>

                        <div className={styles.salary}>
                            <label htmlFor="salary">Salary</label>
                            <input placeholder="e.g 600000" name="salary" id="salary"/>
                        </div>
                    </div>

                    <div className={styles.jobType}>
                        <label htmlFor="jobType">Job Type</label>
                        <select name="jobType" id="jobType" defaultValue="">
                            <option value="" disabled>Select job type</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div className={styles.skills}>
                        <label htmlFor="skills">Required Skills</label>
                        <input placeholder="e.g 600000" name="skills" id="skills"/>
                    </div>

                    <div className={styles.description}>
                        <label htmlFor="description">Job Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Describe the role, responsibilities, and expectations..."
                            rows={5}
                        />
                    </div>


                    <button className={styles.publishBtn}>Publish Job</button>


                    
                    
                </form>


            </div>

        </div>
    )

}