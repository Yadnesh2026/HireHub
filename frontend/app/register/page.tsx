"use client"

import { useState } from "react"
import styles from "./page.module.css"

export default function Register(){

    //Form Data - consist of all register details
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        role:"candidate",
    })
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    //handle the after submit btn
    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(formData.name.trim().length < 3){
            setMessage("Name must be at least 3 characters long")
            return
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())){
            setMessage("Please enter a valid email address")
            return
        }

        if(formData.password.length < 8){
            setMessage("Password must be at least 8 characters long")
            return
        }

        if(formData.password !== formData.confirmPassword){
            setMessage("Passwords do not match")
            return
        }
        // console.log("Registration Data:",formData)
    

        try {
            setIsSubmitting(true)
            setMessage("")
            const controller = new AbortController()
            const timeout = setTimeout(() => controller.abort(), 10000)


            const response = await fetch("http://localhost:1000/api/user",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                signal: controller.signal,
                body:JSON.stringify({
                    name:formData.name,
                    email:formData.email,
                    password:formData.password,
                    role:formData.role
                })
            })
            
            clearTimeout(timeout)

            const data = await response.json()

            if (!response.ok) {
                setMessage(data.message || "Registration failed")
                return
            }

            setMessage("Account created successfully")
        } catch (error) {
            console.error("Registration request failed:", error)
            setMessage(error.name === "AbortError"
                ? "The server took too long to respond. Check that MongoDB and the backend are running."
                : "Unable to connect to the server. Make sure the backend is running on port 1000.")
        } finally {
            setIsSubmitting(false)
        }

}


    return(
        <div className={styles.mainComponent}>


            <div className={styles.formPage}>
                <h1>Create your Account</h1>
                <p>Join HireNova to Discover Opportunities.</p>

                <form onSubmit={handleSubmit} noValidate>

                    <div className={styles.name}>
                        <label htmlFor="name">Full Name</label>
                        <input placeholder="Enter your full name" name="name" id="name" minLength={3} required value={formData.name}
                        onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                    </div>

                     <div className={styles.email}>
                        <label htmlFor="email">Emaill Address</label>
                        <input placeholder="you@example.com" type="email" name="email" id="email" required value={formData.email}
                        onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                    </div>

                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <input placeholder="Create a password" type="password" name="password" id="password" minLength={8} required value={formData.password}
                        onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                    </div>

                    <div className={styles.confrimPassword}>

                        <label htmlFor="confirmPassword">Password</label>
                        <input placeholder="Re-enter your password" type="password" name="confirmPassword" id="confirmPassword" minLength={8} required value={formData.confirmPassword}
                        onChange={(e)=> setFormData({...formData, confirmPassword:e.target.value})}/>

                    </div>

                    <div className={styles.role}>
                        <label htmlFor="role">Account Type</label>

                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={(e)=>setFormData({...formData, role:e.target.value})}
                        >
                            <option value="candidate">Candidate</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        
                    </div>

                    <div className={styles.btn}>
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>

                    {message && <p role="alert">{message}</p>}

                </form>


            </div>


        </div>
    )

}