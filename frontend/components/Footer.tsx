
import Link from "next/link";
import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
                       src="/HireNova_logo.png"
                       alt="HireNova Logo"
                       width={200}
                       height={80}
                       priority
                     />
          </Link>

          <p>
            Find opportunities that move your career forward.
          </p>
        </div>

        <div className={styles.footerLinks}>
          <div className={styles.linkGroup}>
            <h3>For Job Seekers</h3>
            <Link href="/jobs">Browse Jobs</Link>
            <Link href="/register">Create Account</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>For Employers</h3>
            <Link href="/recruiter/jobs">Post a Job</Link>
            <Link href="/register">Find Candidates</Link>
          </div>

          <div className={styles.linkGroup}>
            <h3>HireNova</h3>
            <Link href="/">Home</Link>
            <Link href="/jobs">Explore Opportunities</Link>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
       <p>© 2026 HireNova. All rights reserved.</p>
        <p>Connecting talent with opportunity.</p>
      </div>
    </footer>
  );
}
