"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import "@/styles/admin/common.scss";
import "@/styles/admin/students.scss";

import { toast } from "react-toastify";

const DEFAULT_IMG = "/students/default-student.avif";

// ✅ date formatter
const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toISOString().split("T")[0];
};

export default function ViewStudent() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [loading, setLoading] = useState(true);

  // ================= FETCH =================
  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/admin/admission/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const s = data.data;

        setForm({
          ...s,
          dob: formatDate(s.dob),
          admission_date: formatDate(s.admission_date),
        });

        if (s.profile_image) {
          setPreview(s.profile_image);
        }
      } catch (err) {
        toast.error("Failed to load student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admission-form">

      {/* ================= PROFILE ================= */}
      <div className="card profile-card">
        <div className="image-box">
          <img src={preview} alt="student" />
        </div>

        <div className="name-fields">
          <div className="form-group">
            <label>First Name</label>
            <input value={form.first_name || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input value={form.last_name || "-"} disabled />
          </div>
        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="card form-card">
        <h4 className="card-title">Student Details</h4>

        <div className="form-grid">
          <div className="form-group">
            <label>Gender</label>
            <input value={form.gender || "-"} disabled />
          </div>

          <div className="form-group">
            <label>DOB</label>
            <input value={form.dob || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={form.email || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Admission No</label>
            <input value={form.admission_no || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Roll No</label>
            <input value={form.roll_no || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Class</label>
            <input value={form.class || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Section</label>
            <input value={form.section || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Status</label>
            <input value={form.status || "-"} disabled />
          </div>
        </div>
      </div>

      {/* ================= PARENT DETAILS ================= */}
      <div className="card form-card">
        <h4 className="card-title">Parents Details</h4>

        <div className="form-grid">
          <div className="form-group">
            <label>Father Name</label>
            <input value={form.father_name || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Mother Name</label>
            <input value={form.mother_name || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Alternate Phone</label>
            <input value={form.alternate_phone || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={form.p_email || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <input value={form.occupation || "-"} disabled />
          </div>

          <div className="form-group full">
            <label>Address</label>
            <input value={form.p_address || "-"} disabled />
          </div>

          <div className="form-group">
            <label>City</label>
            <input value={form.p_city || "-"} disabled />
          </div>

          <div className="form-group">
            <label>State</label>
            <input value={form.p_state || "-"} disabled />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input value={form.p_pincode || "-"} disabled />
          </div>
        </div>
      </div>

      {/* ================= ACTION ================= */}
      <div className="actions">
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
}