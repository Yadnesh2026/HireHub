"use client"

import { useState } from "react"
import styles from "./page.module.css"
import Image from "next/image"

export default function Register(){
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const handleSubmit = (e)=>{
        e.preventDefault()
    }

    return(
        <div className={styles.mainComponent}>


            <div className={styles.formPage}>
                <h1>Create your Account</h1>
                <p>Join HireNova to Discover Opportunities.</p>

                <form onSubmit={handleSubmit}>

                    <div className={styles.name}>
                        <label htmlFor="name">Full Name</label>
                        <input placeholder="Enter your full name" name="name" id="name" value={formData.name}
                        onChange={(e)=>setFormData({...formData, name:e.target.value})}/>
                    </div>

                     <div className={styles.email}>
                        <label htmlFor="email">Emaill Address</label>
                        <input placeholder="you@example.com" name="email" id="email" value={formData.email}
                        onChange={(e)=>setFormData({...formData, email:e.target.value})}/>
                    </div>

                    <div className={styles.password}>
                        <label htmlFor="password">Password</label>
                        <input placeholder="Create a password" name="password" id="password" value={formData.password}
                        onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
                    </div>

                    <div className={styles.confrimPassword}>

                        <label htmlFor="confirmPassword">Password</label>
                        <input placeholder="Re-enter your password" name="confrimPassword" id="confrimPassword" value={formData.confirmPassword}
                        onChange={(e)=> setFormData({...formData, confirmPassword:e.target.value})}/>

                    </div>

                    <div className={styles.btn}>
                        <button>Create Account</button>
                    </div>


                </form>


            </div>


        </div>
    )

}