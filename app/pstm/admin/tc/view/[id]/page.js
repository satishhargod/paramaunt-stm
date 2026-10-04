"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "@/styles/admin/tc.scss";

export default function ViewTCPage() {
  const params = useParams();
  const router = useRouter();

  const [data, setData] = useState(null);

  const fetchTC = async () => {
    const res = await fetch(
      `/api/admin/tc/${params.id}`
    );

    const result = await res.json();

    setData(result.data);
  };

  useEffect(() => {
    if (params.id) {
      fetchTC();
    }
  }, [params.id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="tc-page">
      <div className="view-card">
        <button
          className="back-btn"
          onClick={() => router.back()}
        >
          ← Back
        </button>

        <img
          src={data.tc_image}
          alt=""
          className="view-image"
        />

        <div className="view-content">
          <h2>{data.student_name}</h2>

          <p>
            <strong>Scholar Number:</strong>{" "}
            {data.scholar_number}
          </p>

          <p>
            <strong>Admission Year:</strong>{" "}
            {data.year_of_admission}
          </p>

          <p>
            <strong>Previous Class:</strong>{" "}
            {data.previous_class_passed}
          </p>

          <p>
            <strong>DOB:</strong>{" "}
            {data.date_of_birth}
          </p>

          <p>
            <strong>Father Name:</strong>{" "}
            {data.father_name}
          </p>

          <p>
            <strong>Mother Name:</strong>{" "}
            {data.mother_name}
          </p>

          <p>
            <strong>Issued TC Year:</strong>{" "}
            {data.year_of_issued_tc}
          </p>
        </div>
      </div>
    </div>
  );
}