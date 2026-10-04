"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "@/styles/admin/teachers.scss";
import "@/styles/admin/common.scss";
import { TEACHER_VALIDATION_RULES } from "../../validation/teacher.validation";
import { validateForm } from "../../validation/validate";

const DEFAULT_IMG = "/students/default-student.avif";

export default function AddTeacher({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    status: "active",
  });

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    // remove error while typing
    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const handleSubmit = async () => {

    // ✅ frontend validation
    const validationErrors = validateForm(
      form,
      TEACHER_VALIDATION_RULES,
      "create"
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch("/api/admin/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ✅ backend validation errors
      if (!data.success) {
        // if API returns field errors
        if (data.errors) {
          setErrors(data.errors);
        }

        toast.error(data.message || "Something went wrong");
        return;
      }

      toast.success("Teacher added successfully");
        // router.push("/pstm/admin/teachers");
        setForm({
    status: "active",
  })
  setPreview(DEFAULT_IMG)

    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WEBP allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    try {
      setUploading(true);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "teachers");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setForm((prev) => ({
        ...prev,
        profile_img: data.url,
      }));

      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="teacher-form form-container">
      {/* ================= CARD 1 ================= */}
      <div className="card profile-card">
        <div className="image-box">
          <img src={preview} alt="teacher" />

          <label className="upload-btn">
            {uploading ? "Uploading..." : "Upload"}

            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImage}
              hidden
            />
          </label>
        </div>

        <div className="name-fields">
          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>

            <input
              value={form.first_name || ""}
              onChange={(e) =>
                handleChange("first_name", e.target.value)
              }
            />

            {errors.first_name && (
              <p className="error">{errors.first_name}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>

            <input
              value={form.last_name || ""}
              onChange={(e) =>
                handleChange("last_name", e.target.value)
              }
            />

            {errors.last_name && (
              <p className="error">{errors.last_name}</p>
            )}
          </div>
        </div>
      </div>

      {/* ================= CARD 2 ================= */}
      <div className="card form-card">
        <h4 className="card-title">Teacher Details</h4>

        <div className="form-grid">
          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>

            <select
              value={form.gender || ""}
              onChange={(e) =>
                handleChange("gender", e.target.value)
              }
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {errors.gender && (
              <p className="error">{errors.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>DOB</label>

            <input
              type="date"
              value={form.dob || ""}
              onChange={(e) =>
                handleChange("dob", e.target.value)
              }
            />

            {errors.dob && (
              <p className="error">{errors.dob}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>

            <input
              value={form.email || ""}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />

            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>

            <input
              value={form.phone || ""}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
            />

            {errors.phone && (
              <p className="error">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="form-group full">
            <label>Address</label>

            <input
              value={form.address || ""}
              onChange={(e) =>
                handleChange("address", e.target.value)
              }
            />

            {errors.address && (
              <p className="error">{errors.address}</p>
            )}
          </div>

          {/* Joining Date */}
          <div className="form-group">
            <label>Joining Date</label>

            <input
              type="date"
              value={form.joining_date || ""}
              onChange={(e) =>
                handleChange("joining_date", e.target.value)
              }
            />

            {errors.joining_date && (
              <p className="error">{errors.joining_date}</p>
            )}
          </div>

          {/* Designation */}
          <div className="form-group">
            <label>Designation</label>

            <input
              value={form.designation || ""}
              onChange={(e) =>
                handleChange("designation", e.target.value)
              }
            />

            {errors.designation && (
              <p className="error">{errors.designation}</p>
            )}
          </div>

          {/* Qualification */}
          <div className="form-group">
            <label>Qualification</label>

            <input
              value={form.qualification || ""}
              onChange={(e) =>
                handleChange("qualification", e.target.value)
              }
            />

            {errors.qualification && (
              <p className="error">{errors.qualification}</p>
            )}
          </div>

          {/* Experience */}
          <div className="form-group">
            <label>Experience</label>

            <input
              type="number"
              value={form.experience_years || ""}
              onChange={(e) =>
                handleChange(
                  "experience_years",
                  e.target.value
                )
              }
            />

            {errors.experience_years && (
              <p className="error">
                {errors.experience_years}
              </p>
            )}
          </div>

          {/* Status */}
          <div className="form-group">
            <label>Status</label>

            <select
              value={form.status || "active"}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {errors.status && (
              <p className="error">{errors.status}</p>
            )}
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="form-actions">
        <button className="btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
}