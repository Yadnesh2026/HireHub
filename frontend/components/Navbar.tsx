
"use client";

import { Button } from "@/components/ui/button";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.Navbar}>
      <div className={styles.leftSide}>
        <Link href="/">
          <Image
            src="/HireHub_logo.png"
            alt="HireHub Logo"
            width={160}
            height={60}
            priority
          />
        </Link>
      </div>

      <div className={styles.rightSide}>
        <Link href="/jobs">Find Jobs</Link>

        <div className={styles.authBtns}>
          <Button
            variant="ghost"
            onClick={() => router.push("/login")}
          >
            Log In
          </Button>

          <Button onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
