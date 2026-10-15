import styles from "./page.module.css"
import Link from "next/link"
import { Search,UserRound,LayoutDashboard,FileCheck, Clock3,UserCheck, CircleX } from "lucide-react";

export default function AppliedJobs(){
    return(
        <div className={styles.mainComponent}>

            <div className={styles.leftSide}>

                <div className={styles.dashboard}>
                    <LayoutDashboard size={20} className={styles.dashBoard_logo} />
                    <Link href="#">DashBoard</Link>

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



            <div className={styles.rightSide}>
                <h1>Welcome Back!!</h1>
                <p>Here's your job search overview.</p>

                <div className={styles.MiddleBoxes}>

                    <div className={styles.firstBox}>
                        <FileCheck size={18} color="#A78BFA" />
                        <h1>04</h1>
                        <p>Applications</p>
                    </div>

                    <div className={styles.SecBox}>
                        <Clock3 size={18} color="#FBBF24" />
                        <h1>03</h1>
                        <p>Pending</p>
                    </div>

                     <div className={styles.ThirdBox}>
                        <UserCheck size={18} color="#34D399" />
                        <h1>03</h1>
                        <p>Shortlisted</p>
                    </div>

                     <div className={styles.fourthBox}>
                       <CircleX size={18} color="#F87171" />
                        <h1>03</h1>
                        <p>Rejected</p>
                    </div>
                </div>


                
               
            </div>



        </div>
    )
}