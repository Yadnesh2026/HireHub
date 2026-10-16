"use client"

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import styles from "./LogoutBtn.module.css";

export default function LogoutBtn(){
    const router = useRouter()

    const handleSubmit =()=>{
        localStorage.removeItem("token")
        router.push("/login")
    }

    return(
        <button className={styles.logoutButton} onClick={handleSubmit}>
            <LogOut size={18}/>
            <span>Logout</span>
        </button>
    )

}