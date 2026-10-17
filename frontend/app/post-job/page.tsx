"use client"
import { useEffect, useState } from "react"
import styles from "./page.module.css"

export default function postJob(){
    const [formData, setFormData] = useState({
        title:"",
        company:"",
        location:"",
        salary:"",
        jobType:"",
        description:"",
        skills:""
    })

    const handleSubmit =async(e)=>{
        e.preventDefault()

        try{
            useEffect(()=>{

                  const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please log in first");
                }

                const fetchData = async()=>{
                    const response = await fetch("http://localhost:1000/api/job",{
                    method:"POST",
                    headers:{
                        "Content-type":"application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData)
                })

                const data = await response.json()

                if(!response.ok){
                throw new Error(data.message || "Something went wrong")
            }
        }

        fetchData()
    })

        }catch(err){
            console.log(err)
            alert(err instanceof Error ? err.message:"Something went wrong")
        }

    }

   

    return(
        <div className={styles.mainComponent}>

            <div className={styles.upperSide}>
                <h1>Post a Job</h1>
                <p>Create a new opportunity for candidates.</p>
            </div>

            <div className={styles.formSide}>
                <h2>Job Information</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.titleCompany}>
                        <div className={styles.title}>
                            <label htmlFor="title">Job Title</label>
                            <input placeholder="e.g Backend Developer" name="title" id="title"
                            value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                        </div>

                        <div className={styles.company}>
                            <label htmlFor="company">Company</label>
                            <input placeholder="Company name" name="company" id="company"
                             value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}/>
                        </div>
                    </div>

                    <div className={styles.locationSalary}>
                        <div className={styles.location}>
                            <label htmlFor="location">Location</label>
                            <input placeholder="e.g Pune/Remote" name="location" id="location"
                             value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}/>
                        </div>

                        <div className={styles.salary}>
                            <label htmlFor="salary">Salary</label>
                            <input placeholder="e.g 600000" name="salary" id="salary"
                             value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                        </div>
                    </div>

                    <div className={styles.jobType}>
                        <label htmlFor="jobType">Job Type</label>
                        <select name="jobType" id="jobType" 
                        value={formData.jobType} onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}>
                            <option value="" disabled>Select job type</option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div className={styles.skills}>
                        <label htmlFor="skills">Required Skills</label>
                        <input placeholder="e.g 600000" name="skills" id="skills"
                        value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })}/>
                    </div>

                    <div className={styles.description}>
                        <label htmlFor="description">Job Description</label>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Describe the role, responsibilities, and expectations..."
                            rows={5}
                            value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>


                    <button className={styles.publishBtn}>Publish Job</button>


                    
                    
                </form>


            </div>

        </div>
    )

}