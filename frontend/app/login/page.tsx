"use client"

import { useState } from "react"
import styles from "./page.module.css"
import { useRouter } from "next/navigation"

export default function Login(){

    const router = useRouter()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const handleSubmit =async(e)=>{
        e.preventDefault()

    
        const response = await fetch("http://localhost:1000/api/login",{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        })

        const data = await response.json()
        console.log(data)

        if(!response.ok){
            alert(data.message || "Login failed")
            return;
        }

        console.log("Login Successfull")
        console.log("JWT Token",data.token)

        //tempralry stores the token  //ata.token is the token returned by your backend.
        //localStorage stores data in the browser. "token" is the key used to retrieve your JWT later.

        // localStorage.setItem("token",data.token) 
        // router.push("/jobs");


        //Recuriter can got o recuirterrs page and candidate can go to candidates page only
        const payload = JSON.parse(
                    atob(  //Used to decode it and gives {"userId":"123","role":"recruiter"}
                        data.token
                        .split(".")[1]  //Splits Header[0] Payload[1] signture[2]  
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                    )
                    );

        if(payload.role == "recruiter"){
             router.push("/recruiterPortal");
        } else {
        router.push("/applied-jobs");
        }
    }


    
    return(
        <div className={styles.mainComponent}>

            <div className={styles.formPage}>
                <h1>Sign in to your account</h1>

                <form onSubmit={handleSubmit}>

                    <div className={styles.email}>
                        <label htmlFor="email">Email Address</label>
                        <input placeholder="you@example.com" id="email" name="email" value={formData.email} 
                        onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                    </div>

                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <input placeholder="Enter your password" type="password" id="password" name="password" value={formData.password}
                        onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                    </div>

                    <button type="submit" className={styles.submit}>Login</button>
                </form>

            </div>
        </div>
    )
}