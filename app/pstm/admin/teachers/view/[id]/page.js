"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "@/styles/admin/teachers.scss";
import "@/styles/admin/common.scss";

export default function TeacherView() {
  const params = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FORMAT DATE
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================
  // FETCH TEACHER
  // =========================
  const fetchData = async () => {
    try {
      setLoading(true);

      const id = params.id;

      const res = await fetch(
        `/api/admin/teachers/${id}`
      );

      const data = await res.json();

      if (!data.success) {
        return;
      }

      setTeacher(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      fetchData();
    }
  }, [params?.id]);

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return <p>Loading...</p>;
  }

  // =========================
  // NO DATA
  // =========================
  if (!teacher) {
    return <p>Teacher not found</p>;
  }

  return (
    <div className="teacher-view">
      {/* ================= TOP BAR ================= */}
      <div className="page-top">
        <Link
          href="/pstm/admin/teachers"
          className="back-btn"
        >
          ← Back to Teachers
        </Link>
      </div>

      {/* ================= PROFILE CARD ================= */}
      <div className="card profile-card">
        <div className="image-box">
          <img
            src={
              teacher.profile_img ||
              "/default-avatar-profile.avif"
            }
            alt="teacher"
          />
        </div>

        <div className="info">
          <h2>
            {teacher.first_name}{" "}
            {teacher.last_name}
          </h2>

          <p className="designation">
            {teacher.designation}
          </p>

          <div className="meta">
            <span>{teacher.gender}</span>

            <span>
              {teacher.experience_years} yrs exp
            </span>

            <span
              className={`status ${teacher.status}`}
            >
              {teacher.status}
            </span>
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="card">
        <h4 className="card-title">
          Contact Details
        </h4>

        <div className="details-grid">
          <div>
            <label>Email</label>

            <p>{teacher.email || "-"}</p>
          </div>

          <div>
            <label>Phone</label>

            <p>{teacher.phone || "-"}</p>
          </div>

          <div className="full">
            <label>Address</label>

            <p>{teacher.address || "-"}</p>
          </div>

          <div>
            <label>Joining Date</label>

            <p>
              {formatDate(
                teacher.joining_date
              )}
            </p>
          </div>

          <div>
            <label>Qualification</label>

            <p>
              {teacher.qualification || "-"}
            </p>
          </div>

          <div>
            <label>DOB</label>

            <p>
              {formatDate(teacher.dob)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}