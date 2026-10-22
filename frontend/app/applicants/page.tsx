"use client"


import { useEffect, useState } from "react"
import styles from "./page.module.css"

export default function Applicants(){
    const [applicants, setApplicants] = useState("")

   useEffect(() => {
  const getData = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const response = await fetch("http://localhost:1000/api/applicants", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setApplicants(data.applicants);
        
      } else {
        console.log(data.message || "Failed to fetch applicants");
      }


    } catch (err) {
      console.log("Error Fetching Applicants", err);
    }
  };

  getData();
}, []);

    return(
        <div>
            Applicants
        </div>
    )
}