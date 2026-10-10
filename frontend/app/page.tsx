import styles from "./page.module.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className={styles.mainLanding}>

        <h3>YOUR NEXT CHAPTER STARTS HERE</h3>
        <h1>Find work that moves you forward</h1>
        <h3>Discover opportunities that match your skills and ambitions.</h3>

        <form className={styles.searchForm}>
          <Input type="text" placeholder="Job title or Keyword"
          className={styles.searchInput}/>

          <Input type="text" placeholder="location"  
          className={styles.searchInput}/>

          <Button type="submit"  className={styles.searchBtn}>Search Jobs</Button>
        </form>

      </div>
    </main>
  )
}
