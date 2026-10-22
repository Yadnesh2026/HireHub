"use client"

import styles from "./page.module.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyProfile(){
    const router = useRouter()
    const [user, setUser] = useState({
        name:"",
        email:"",
        role:""
    })
    const [message, setMessage] = useState("")
    const [err,setErr] = useState("");
    const [saving, setSaving]= useState(false)

    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token){
            router.push("/login")
            return
        }

        const fetchData =async()=>{
            try{
            const response = await fetch(`${process.env.NEXT_URL}/profile`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`
            },
            })

            const data =await response.json()

            if(!response.ok){
                throw new Error(data.message || "Something went wrong")
            }

            //Added the fetch data in user(usestate)
            setUser({
                name:data.user.name,
                email:data.user.email,
                role:data.user.role
            })
            


            }catch(err){
                console.log(err)
            }
           
        }

        fetchData()
    },[])


    //Update After form su
    const handleSubmit =async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        setSaving(true)

        setMessage("")
        setErr("")

        try{

        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("Token not get")
        }

        const fetchData = await fetch(`${process.env.NEXT_URL}/profile`,{
            method:"PUT",
            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-type":"application/json"
            },
            body: JSON.stringify({ //when sending data through fetch(), we need to convert that object into a JSON string so Express can parse it using express.json().
                name:user.name,
                email:user.email
            })
        }) 

        const data2 = await fetchData.json()

        if(!fetchData.ok){
            throw new Error(data2.message || "Data not fetched")
        }

        //After successfull changes backend send response 
        setMessage(data2.message)

        }catch(err){
            console.log(err)
            setErr(err instanceof Error ? err.message :"Something went wrong")
        }finally{
            setSaving(false) //stop saving
        }
    }

 



    return(
        <div className={styles.mainComponent}>

            <div className={styles.Myprofile}>
                <h1>My Profile</h1>
                <p>Manage your personal information and account details</p>
                
                <div className={styles.profileForm}>

                    <div className={styles.topSide}>
                        <h2>{user.name}</h2>
                        <p>{user.role}</p>
                    </div>

                    <div className={styles.formSide}>
                        <h3>Personal Information</h3>

                        <form onSubmit={handleSubmit}>

                            <div className={styles.name}>
                                <label htmlFor="name">Full Name</label>
                                <input name="name" id="name" placeholder="Your Full name" 
                                value={user.name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user,name:e.target.value})}/>
                            </div>

                            <div className={styles.email}>
                                <label>Email</label>
                                <input name="email" id="email" placeholder="you@Example.com"
                                value={user.email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser({...user,email:e.target.value})}/>
                            </div>

                            {/* <div className={styles.role}>
                                <label>Account Role</label>
                                 <select name="role"id="role" 
                                 onChange={(e: React.ChangeEvent<HTMLSelectElement>)=>setUser({...user, role:e.target.value})}>
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div> */}

                            <button className={styles.btn}>
                            {saving?"saving...":"Save Changes"}</button>
                        </form>

                        {message && (  //true && console.log("Hello")
                            <p className={styles.message}>{message}</p>
                        )}
                        {err && (
                            <p className={styles.err}>{err}</p>
                        )}


                    </div>

                </div>
            </div>
            
        </div>
    )
}