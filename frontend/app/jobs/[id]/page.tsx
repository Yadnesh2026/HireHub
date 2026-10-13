"use client"

import { useParams } from "next/navigation"
import styles from "./page.module.css"


export default function JobDetails(){
    const params = useParams()
    const id = params.id

    return(
        <main>
            <div className={styles.mainComponent}>


                <div className={styles.upperSide}>

                    <div className={styles.leftUpper}>

                        <div className={styles.logo}>A</div>
                        
                        <div className={styles.SecSide}>
                            <div className={styles.titleInfo}>
                                <h1>Backend Developer</h1>

                                    <div className={styles.innerContent}>
                                        <p>TechCrop</p>
                                        <p>Pune, India</p>
                                    </div>

                            </div>

                            <div className={styles.downSide}>
                                <p>Full - Time</p>
                                <p>On-site</p>
                            </div>
                        </div>

                    </div>



                    <div className={styles.rightUpper}>
                        <div>
                            <h1>Salary</h1>
                            <p>500000</p>
                        </div>

                        <div className={styles.btn}>
                            <button>Apply</button>
                        </div>
                    </div>




                </div>



                <div className={styles.middleSide}>

                    <div className={styles.desc}>
                        <h1>Description</h1>
                        <p>dsaashdshdsahohsado</p>
                    </div>

                    <div className={styles.responsi}>
                        <h1>Resposnibilty</h1>
                        <p>adsihgsaudisaugdusagdusagdugsudga</p>
                    </div>

                    <div className={styles.require}>
                        <h1>Requiremnts</h1>
                        <p>dasjijaosidhsaoidoa</p>
                    </div>
                  
                </div>





            </div>
        </main>
    )
}