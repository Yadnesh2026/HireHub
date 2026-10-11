"use client";
import styles from "./page.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search,Target,TrendingUp,} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //URLSearchParams is a built-in JavaScript API.It helps us construct query parameters for a URL.
    const params = new URLSearchParams();

    //Convert parameters into a URL string
    if(keyword.trim()){
      params.set("keyword", keyword.trim());
    }

    if(location.trim()){
      params.set("location", location.trim());
    }

    //Here, params is a URLSearchParams object that holds your parameters. It's not just one string. Thats why we are converting them to string
    const searchQuery = params.toString()

    router.push(`/jobs?${searchQuery}`);
  };

  return (
    <main className={styles.page}>
      <div className={styles.mainLanding}>
        <h3>YOUR NEXT CHAPTER STARTS HERE</h3>
        <h1>Find work that moves you forward</h1>
        <h3>Discover opportunities that match your skills and ambitions.</h3>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Job title or Keyword"
            className={styles.searchInput}
            value={keyword}
            onChange={(e)=> setKeyword(e.target.value)}
          
          />

          <Input
            type="text"
            placeholder="location"
            className={styles.searchInput}
            value={location}
            onChange={(e)=> setLocation(e.target.value)}
          />

          <Button type="submit" className={styles.searchBtn}>
            Search Jobs
          </Button>
        </form>
      </div>




        <section className={styles.MainColms}>
          <div className={styles.MainHead}>
            
            <h2>Why to Choose <b>HireNova?</b></h2>
            <p>A smarter way to find your next opportunity.</p>
          </div>

          <div className={styles.colms}>

            <div className={styles.col1}>
               <Search className={styles.featureIcon} />
              <h4>Easy Job Search</h4>
              <p>Find jobs that fit your skills</p>
            </div>

            <div className={styles.col2}>
              <Target className={styles.featureIcon}/>
              <h4>Relevant Opportunities</h4>
              <p>Discover roles that match your interests.</p>
            </div>

            <div className={styles.col3}>
              <TrendingUp className={styles.featureIcon}/>
              <h4>Career Growth</h4>
              <p>Take the next step in your career.</p>
            </div>

          </div>

        </section>

    </main>
  );
}
