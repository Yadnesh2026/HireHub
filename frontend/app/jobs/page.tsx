"use client"
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL } from "@/lib/api";

type Job ={
  _id:string,
  title:string,
  description:string,
  company:string,
  location:string,
  salary:number,
  skills:string[],
  jobType:string
}

function JobsPage() {
  const router = useRouter()
  //2.
  const searchParams = useSearchParams() //reads the search value from the URL.

  //Job Search and error, loading
  const [job, setJob] = useState<Job[]>([]);  //For fetching the Jobs
  const [isLoading, setIsLoading] = useState(true); //For loading Skeleton
  const [error, setError] = useState<string | null>(null); //For showing error
  const [userName, setUserName] = useState("User");
  const [search, setSearch] = useState("") //Search from Jobs page search Bar
  const [locationSearch, setLocationSearch] = useState("") //Search for location

  //Filter Section Funcational
  const[selectCompany, setSelectCompany] = useState("");
  const [salary, setSalary] = useState(15);                                                                                       
  const [selectJob, setSelectJob] = useState<string[]>([])

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch profile");
        }

        if (data.user?.name) {
          setUserName(data.user.name);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);



  //1. Search bar
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const params = new URLSearchParams() //use to create URL from Search components

    if(search.trim()){
      params.set("search",search.trim())
    };
    if(locationSearch.trim()){
      params.set("location",locationSearch.trim())
    }
    if(selectCompany){ //for filter DropDown
      params.set("company",selectCompany)
    }

    const queryString = params.toString() //params.toString() converts your URL parameters into a string.
    router.push(`/jobs?${queryString}`)
  }


  //Consist of all Jobs from backend 
  useEffect(() => {
  const allJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/job`);

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      console.log("API response",data)
      console.log("Job array",data.jobs)
      setJob(data.jobs);

    } catch (error) {

      console.error("Error fetching jobs:", error);
      setError("Unable to load jobs. Please try again.");

    } finally {
      setIsLoading(false);
    }
  };

  allJobs();
}, []);



//3. Filter the Job

  //To read the things from URL
  const searchQuery = searchParams.get("search") || ""
  const locationQuery = searchParams.get("location") || ""
  

  //DB Jobs should match the Search Input Title
  const filterJob = job.filter((j)=>{
    const matchTitle = j.title.toLowerCase().includes(searchQuery.toLowerCase())
    const locationMatch = j.location.toLowerCase().includes(locationQuery.toLowerCase())

    //Filter the DropDown - Company
    const companyDropDown = j.company.toLowerCase().includes(selectCompany.toLowerCase())

    //Salary Match
    const salaryMatch = j.salary <= salary *100000  //This converts the slider value from lakhs into rupees.

    //Job Type
    const jobTypeMatch = selectJob.length == 0 || selectJob.includes(j.jobType)

  

    return matchTitle && locationMatch && companyDropDown && salaryMatch && jobTypeMatch
  })

  //Handle JobTypes Filter
      const handleJobType = (type: string) => {
      setSelectJob((prev) =>
        prev.includes(type)
          ? prev.filter((item) => item !== type)
          : [...prev, type]
      );
    };
  




  return (
    <main className={styles.page}>
      <section>

        <div className={styles.nameBar}>
          <h1> Welcome Back, <span>{userName}</span> </h1>
        </div>


        <div className={styles.searchbar}>

          <form className={styles.searchForm} onSubmit={handleSubmit}>
            <Search className={styles.featureIcon} />
            <Input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  placeholder="Job title or Keyword" className={styles.searchInput} />

            <MapPin className={styles.featureIcon}/>
            <Input type="text" value={locationSearch} onChange={(e)=>setLocationSearch(e.target.value)} placeholder="location" className={styles.searchInput}/>

            <Button type="submit" className={styles.searchBtn}>Search Jobs  </Button>

          </form>

        </div>



      <div className={styles.mainContent}>

        {/* FilterSide */}
        <div className={styles.filterSide}>

          <div className={styles.filterHead}>
            <h3>Filters</h3>
            <button className={styles.reset} onClick={()=>{
              setSelectCompany("");
              setSalary(15)
              setSelectJob([])
            }}>Reset All</button>
          </div>


          <div className={styles.filterCompany} defaultValue="">
            <h4>Company/ Industry</h4>

            <div className={styles.selectAll}>

              <select className={styles.filterSelect} 
              value={selectCompany}onChange={(e)=>setSelectCompany(e.target.value)}>

                <option value="" disabled>Select Industry</option>
                <option>Information technology</option>
                <option>Finance</option>
                <option>Healthcare</option>

              </select>

            </div>
          </div>


          <div className={styles.filterSalary}>

            <h4>Salary Range</h4>
            <input type="range" value={salary} onChange={(e)=>setSalary(Number(e.target.value))} 
            className={styles.salarySlider} min="0" max="15" />
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

                  <input type="checkbox" value="full-time" checked={selectJob.includes("full-time")} 
                  onChange={()=> handleJobType("full-time")}/>

                  <span>Full-time</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="part-time" onChange={() => handleJobType("part-time")} 
                  checked={selectJob.includes("part-time")}/>

                  <span>Part-time</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="remote"onChange={() => handleJobType("remote")} 
                   checked={selectJob.includes("remote")}/>
                  <span>Remote</span>
                </label>

                <label className={styles.checkboxLabel}>
                  <input type="checkbox" value="internship" onChange={() => handleJobType("internship")}
                   checked={selectJob.includes("internship")} />
                  <span>Internship</span>
                </label>
              </div>
            </div>
          
        </div>



        {/* JobCard */}
        <div className={styles.jobGrid}>



          {isLoading && Array.from({ length: 6 }, (_, index) => (
            <div className={styles.skeletonCard} key={`skeleton-${index}`} aria-hidden="true">
              <div className={styles.skeletonHeader}>
                <div className={styles.skeletonLogo} />
                <div className={styles.skeletonTitle}>
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLineSmall} />
                </div>
              </div>
              <div className={styles.skeletonLineShort} />
              <div className={styles.skeletonLine} />
              <div className={styles.skeletonLineFull} />
            </div>
          ))}



          {!isLoading && error && (
            <p role="alert" className={styles.errorMessage}>{error}</p>
          )}



          {/* if No Matching Job found */}
          {!isLoading && !error && filterJob.length ===0 &&(
            <p className={styles.noJobs}>
              No Jobs Found. Try different Search Terms</p>
          )}




          {/* 4. Final Job Serach */}
          {!isLoading && !error && filterJob.map((job)=>(
             <div className={styles.jobCard} key={job._id}>

            <div className={styles.companyInfo}>

              <div className={styles.companyLogo}>{job.company.charAt(0)}</div>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                </div>
            </div>

            <p className={styles.jobLocation}>{job.location}</p>

            <div className={styles.jobTags}>
              {job.skills.slice(0, 3).map((skill)=>(
                <span key={skill}>{skill}</span>
              ))}
              {job.skills.length > 3 && (
                <span>+{job.skills.length - 3} more</span>
              )}

              {/* <span>Full-Time</span>
              <span>On-site</span>
              <span>Senior Level</span> */}
            </div>


            <div className={styles.jobFooter}>
              <p>₹{job.salary.toLocaleString("en-IN")}</p>


              <button type="button" onClick={()=>{
                router.push(`/jobs/${job._id}`)
              }}>Details</button>
            </div>

          </div>
          ))}



          {/* <div className={styles.jobCard}>

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
          <div className={styles.jobCard}>Job 3</div> */}
          
        </div>








      </div>











      </section>
    </main>
  );
}

export default JobsPage;
