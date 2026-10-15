"use client"

import styles from "./page.module.css"
import { Search,UserRound,LayoutDashboard,FileCheck, Clock3,UserCheck, CircleX } from "lucide-react";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyProfile(){
    const router = useRouter()
    const [user, setUser] = useState({
        name:"",
        email:"",
        role:""
    })

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            router.push("/login")
            return
        }

        const fetchData =async()=>{
            try{
            const response = await fetch("http://localhost:1000/api/profile",{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
            })

            const data =await response.json()

            
            if(!response.ok){
                throw new Error(data.message || "Something went wrong")
            }

            console.log(data.user)

            }catch(err){
                console.log(err)
            }
           
        }

        fetchData()
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault()
        
    }

    return(
        <div className={styles.mainComponent}>

             <div className={styles.leftSide}>

                <div className={styles.dashboard}>
                    <LayoutDashboard size={20} className={styles.dashBoard_logo} />
                    <Link href="/applied-jobs">DashBoard</Link>

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



            <div className={styles.Myprofile}>
                <h1>My Profile</h1>
                <p>Manage your personal information and account details</p>
                
                <div className={styles.profileForm}>

                    <div className={styles.topSide}>
                        <h2>Your Name</h2>
                        <p>Candidate</p>
                    </div>

                    <div className={styles.formSide}>
                        <h3>Personal Information</h3>

                        <form onSubmit={handleSubmit}>

                            <div className={styles.name}>
                                <label htmlFor="name">Full Name</label>
                                <input name="name" id="name" placeholder="Your Full name" 
                                value={user.name} onChange={(e)=>setUser({...user,name:e.target.value})}/>
                            </div>

                            <div className={styles.email}>
                                <label>Email</label>
                                <input name="email" id="email" placeholder="you@Example.com"
                                value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}/>
                            </div>

                            <div className={styles.role}>
                                <label>Account Role</label>
                                 <select name="role"id="role" >
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            <button className={styles.btn}>Save Changes</button>
                           

                        </form>
                    </div>

                </div>
            </div>
            
        </div>
    )
}