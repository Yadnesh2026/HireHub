"use client"

import { useEffect, useState } from "react";
import styles from  "./page.module.css"

type Applicant = {
    _id: string;
    candidate?: {
        name?: string;
    };
    job?: {
        title?: string;
    };
    status?: "pending" | "shortlisted" | "rejected";
};

type ApplicationStatus = NonNullable<Applicant["status"]>;

export default function Applicants(){
    const [applicants, setApplicants] = useState<Applicant[]>([]);

    //Updating the status
 const updateStatus = async (id: string, status: ApplicationStatus) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/application/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (response.ok) {
    setApplicants((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status } : app
      )
    );
  } else {
    alert("Failed to update status");
  }
};


    useEffect(() => {
        const getData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setApplicants([]);
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applicants`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setApplicants([]);
                    console.log(data.message || "Failed to fetch applicants");
                    return;
                }

                const applicantList = Array.isArray(data?.applications)
                    ? data.applications
                    : Array.isArray(data?.applicants)
                        ? data.applicants
                        : [];

                setApplicants(applicantList);
            } catch (err) {
                setApplicants([]);
                console.log("Error Fetching Applicants", err);
            }
        };

        getData();
    }, []);

    const applicantsList = Array.isArray(applicants) ? applicants : [];

    
       return (
  <div className={styles.applicantsPage}>
    <div className={styles.pageHeader}>
      <h1>Applicants</h1>
      <p>Review candidates and manage their applications.</p>
    </div>

    {applicantsList.length === 0 ? (
      <div className={styles.emptyState}>
        <h2>No applicants found</h2>
        <p>Applications for your jobs will appear here.</p>
      </div>
    ) : (
      <div className={styles.applicantsList}>
        {applicantsList.map((application) => (
          <div className={styles.applicantCard} key={application._id}>
            <div className={styles.applicantInfo}>
              <h2>{application.candidate?.name}</h2>
              <p className={styles.jobTitle}>
                {application.job?.title}
              </p>
            </div>

            <div className={styles.applicantActions}>
              <span
                className={`${styles.statusBadge} ${
                  application.status === "shortlisted"
                    ? styles.shortlisted
                    : application.status === "rejected"
                      ? styles.rejected
                      : styles.pending
                }`}
              >
                {application.status}
              </span>

              <button
                className={styles.shortlistBtn}
                onClick={() =>
                  updateStatus(application._id, "shortlisted")
                }
                disabled={application.status === "shortlisted"}
              >
                Shortlist
              </button>

              <button
                className={styles.rejectBtn}
                onClick={() =>
                  updateStatus(application._id, "rejected")
                }
                disabled={application.status === "rejected"}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>




);
}
