"use client"

import { useEffect, useState } from "react";

type Applicant = {
    _id: string;
    candidate?: {
        name?: string;
    };
    job?: {
        title?: string;
    };
    status?: string;
};

export default function Applicants(){
    const [applicants, setApplicants] = useState<Applicant[]>([]);

    //Updating the status
 const updateStatus = async (id: string, status: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:1000/api/application/${id}/status`,
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

                const response = await fetch("http://localhost:1000/api/applicants", {
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
        <div>
            <h1>Applicants</h1>

            {applicantsList.length === 0 ? (
                <p>No applicants found.</p>
            ) : (
                applicantsList.map((application) => (
                    <div key={application._id}>
                        <h2>{application.candidate?.name}</h2>
                        <p>{application.job?.title}</p>
                        <p>Status: {application.status}</p>

                        <button onClick={() => updateStatus(application._id, "shortlisted")}>
                        Shortlist
                        </button>

                        <button onClick={() => updateStatus(application._id, "rejected")}>
                        Reject
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
