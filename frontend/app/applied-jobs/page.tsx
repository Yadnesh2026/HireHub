import styles from "./page.module.css"
import Link from "next/link"
import { Search,UserRound,LayoutDashboard } from "lucide-react";

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

            <div className={styles.rightSide}></div>
        </div>
    )
}