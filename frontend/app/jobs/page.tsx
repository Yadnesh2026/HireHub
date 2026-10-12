import React, { useState } from "react";
import styles from "./page.module.css";
import { Search, Target, TrendingUp,MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Job ={
  _id:string,
  title:string,
  description:string,
  company:string,
  location:string,
  salary:number,
  skills:string[];
}

function JobsPage() {
  const [job, setJob] = useState<Job[]>([]);

  return (
    <main className={styles.page}>
      <section>

        <div className={styles.nameBar}>
          <h1> Welcome Back, <span>User</span> </h1>
        </div>


        <div className={styles.searchbar}>
          <form className={styles.searchForm}>
            <Search className={styles.featureIcon} />
            <Input type="text"  placeholder="Job title or Keyword" className={styles.searchInput} />
            <MapPin className={styles.featureIcon}/>
            <Input type="text" placeholder="location" className={styles.searchInput}/>
            <Button type="submit" className={styles.searchBtn}>Search Jobs  </Button>
          </form>
        </div>



      <div className={styles.mainContent}>

        <div className={styles.filterSide}>

          <div className={styles.filterHead}>
            <h3>Filters</h3>
            <button>Reset All</button>
          </div>


          <div className={styles.filterCompany} defaultValue="">
            <h4>Company/ Industry</h4>

            <div className={styles.selectAll}>

              <select className={styles.filterSelect}>
                <option value="" disabled>Select Industry</option>
                <option>Information technology</option>
                <option>Finance</option>
                <option>Healthcare</option>
              </select>

            </div>
          </div>


          <div className={styles.filterSalary}>

            <h4>Salary Range</h4>
            <input type="range" className={styles.salarySlider} min="0" max="100" defaultValue="20"/>
              <div className={styles.salarySlab}>
                <span>₹1L</span>
                <span>₹3L</span>
                <span>₹9L</span>
                <span>₹15L+</span>
              </div>
          </div>

          
            <div className={styles.filterJobType}>
              <h4>Job Type</h4>

              <div className={styles.checkboxGrid}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="full-time" />
                  <span>Full-time</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="part-time" />
                  <span>Part-time</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="remote" />
                  <span>Remote</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="internship" />
                  <span>Internship</span>
                </label>
              </div>
            </div>
          
        </div>



        <div className={styles.jobGrid}>

          <div className={styles.jobCard}>

            <div className={styles.companyInfo}>

              <div className={styles.companyLogo}>A</div>

                <div>
                  <h3>Senior Ui Designer</h3>
                  <p>Amazon</p>
                </div>
            </div>

            <p className={styles.jobLocation}>Bengaluru, India</p>

            <div className={styles.jobTags}>
              <span>Full-Time</span>
              <span>On-site</span>
              <span>Senior Level</span>
            </div>

            <div className={styles.jobFooter}>
              <p>₹10L - ₹13L</p>
              <button type="button">Details</button>
            </div>

          </div>


          
          <div className={styles.jobCard}>Job 2</div>
          <div className={styles.jobCard}>Job 3</div>
          

        </div>








      </div>











      </section>
    </main>
  );
}

export default JobsPage;
