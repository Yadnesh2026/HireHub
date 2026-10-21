
"use client";

import { Button } from "@/components/ui/button";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutBtn from "./LogoutBtn";
import { UserRound } from "lucide-react";

function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setUserRole("");
        return;
      }

      setIsLoggedIn(true);
      const payload = JSON.parse(
        atob(
          token
            .split(".")[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/")
        )
      );
      setUserRole(payload.role);
    };

    updateAuthState();
    window.addEventListener("auth-change", updateAuthState);
    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("auth-change", updateAuthState);
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  return (

    <nav className={styles.Navbar}>
      <div className={styles.leftSide}>
        <Link href="/">
          <Image
            src="/HireNova_logo.png"
            alt="HireNova Logo"
            width={200}
            height={80}
            priority
          />
        </Link>
      </div>

      <div className={styles.rightSide}>
        {!isLoggedIn || userRole === "candidate" ? (
          <Link href="/jobs">Find Jobs</Link>
        ) : (
          <Link href="/post-job">Post a Job</Link>
        )}

        <div className={styles.authBtns}>
          {isLoggedIn ? (
          <>
              <Link href={
                userRole === "recruiter" ? "/recruiterPortal" : "/applied-jobs"
              }>
                {userRole === "recruiter" ? "Recruiter Dashboard" : "My Applications"}
              </Link>
              <div className={styles.profileMenu}>
                <button
                  type="button"
                  className={styles.profileButton}
                  aria-label="Open user menu"
                  aria-expanded={isProfileOpen}
                  onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
                >
                  <UserRound size={22} />
                </button>



                {isProfileOpen && (
                  <div className={styles.profileDropdown}>
                    <Link
                      href="/my-profile"
                      className={styles.profileLink}
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserRound size={18} />
                      <span>My Profile</span>
                    </Link>
                    <div className={styles.dropdownDivider} />
                    <LogoutBtn className={styles.dropdownLogout} />
                  </div>
                )}
              </div>
          </>
          ) :(
          <>
            <Button variant="ghost"  onClick={() => router.push("/login")}>Log In</Button>

            <Button className={styles.signUpButton} onClick={() => router.push("/register")}>
              Sign Up
            </Button>
          </>

          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
