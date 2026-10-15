import styles from "./page.module.css"
import { Search,UserRound,LayoutDashboard,FileCheck, Clock3,UserCheck, CircleX } from "lucide-react";
import Link from "next/link"

export default function MyProfile(){
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

                        <form>

                            <div className={styles.name}>
                                <label htmlFor="name">Full Name</label>
                                <input name="name" id="name" placeholder="Your Full name"/>
                            </div>

                            <div className="email">
                                <label>Email</label>
                                <input name="email" id="email" placeholder="you@Example.com"/>
                            </div>

                            <div className="role">
                                <label>Account Role</label>
                                 <select name="role"id="role" >
                                    <option value="candidate">Candidate</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>
                           

                        </form>
                    </div>

                </div>
            </div>
            
        </div>
    )
}