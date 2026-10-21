"use client"

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import styles from "./LogoutBtn.module.css";

type LogoutBtnProps = {
    className?: string;
};

export default function LogoutBtn({ className = "" }: LogoutBtnProps){
    const router = useRouter()

    const handleSubmit =()=>{
        localStorage.removeItem("token")
        window.dispatchEvent(new Event("auth-change"))
        router.push("/login")
    }

    return(
        <button className={`${styles.logoutButton} ${className}`} onClick={handleSubmit}>
            <LogOut size={18}/>
            <span>Logout</span>
        </button>
    )

}