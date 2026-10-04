"use client";

import { useState } from "react";
import "@/styles/admin/common.scss";
import "@/styles/admin/students.scss";
const DEFAULT_IMG = "/students/default-student.avif";
import { toast } from "react-toastify";

import { ADMISSION_VALIDATION_RULES } from "../../validation/admission.validation";
import { validateForm } from "../../validation/validate";


export default function CreateStudents() {
  const [form, setForm] = useState({status:'active'});
  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ validation
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

      // preview immediately (UX 🔥)
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // formData for upload API
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ save URL in form (IMPORTANT)
      setForm((prev) => ({
        ...prev,
        profile_image: data.url,
      }));

      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
  // ✅ validate
 const validationErrors = validateForm(
    form,
    ADMISSION_VALIDATION_RULES,
    "create"
  );

  if (Object.keys(validationErrors).length > 0) {
    console.log("validationErrors", validationErrors)
    setErrors(validationErrors);
    // toast.error(Object.values(validationErrors)[0]);
    return;
  }

  try {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    const res = await fetch("/api/admin/admission", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      // ✅ handle API validation errors
      if (data.errors) {
        setErrors(data.errors);

        // show first API error
        const firstError = Object.values(data.errors)[0];
        toast.error(firstError);
      } else {
        toast.error(data.message || "Something went wrong");
      }
      return;
    }

    toast.success("Student created successfully");

    // reset
    setForm({});
    setPreview(DEFAULT_IMG);
    setErrors({});
  } catch (err) {
    toast.error("Server error");
  }
};

  return (
    <div className="admission-form form-container">
      {/* <h2>Create Student</h2> */}

      {/* ================= CARD 1 ================= */}
      <div className="card profile-card">
        <div className="image-box">
          <img src={preview} alt="student" />
          {/* <input type="file" onChange={handleImage} /> */}
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
          <div className="form-group">
            <label>First Name</label>
            <input
              value={form.first_name || ""}
              onChange={(e) =>
                handleChange("first_name", e.target.value)
              }
            />
            {errors.first_name && <p className="error">{errors.first_name}</p>}
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              value={form.last_name || ""}
              onChange={(e) =>
                handleChange("last_name", e.target.value)
              }
            />
             {errors.last_name && <p className="error">{errors.last_name}</p>}
          </div>
        </div>
      </div>

      {/* ================= CARD 2 ================= */}
      <div className="card form-card">
        <h4 className="card-title">Student Details</h4>

        <div className="form-grid">
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
          </div>

          <div className="form-group">
            <label>DOB</label>
            <input
              type="date"
              value={form.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={form.email || ""}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Admission No</label>
            <input
              value={form.admission_no || ""}
              onChange={(e) =>
                handleChange("admission_no", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Roll No</label>
            <input
              value={form.roll_no || ""}
              onChange={(e) =>
                handleChange("roll_no", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Class</label>
            <input
              value={form.class || ""}
              onChange={(e) =>
                handleChange("class", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Section</label>
            <input
              value={form.section || ""}
              onChange={(e) =>
                handleChange("section", e.target.value)
              }
            />
          </div>

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
          </div>
        </div>
      </div>

      {/* ================= CARD 3 ================= */}
      <div className="card form-card">
        <h4 className="card-title">Parents Details</h4>

        <div className="form-grid">
          <div className="form-group">
            <label>Father Name</label>
            <input
              value={form.father_name || ""}
              onChange={(e) =>
                handleChange("father_name", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Mother Name</label>
            <input
              value={form.mother_name || ""}
              onChange={(e) =>
                handleChange("mother_name", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              value={form.phone || ""}
              onChange={(e) =>
                handleChange("phone", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Alternate Phone</label>
            <input
              value={form.alternate_phone || ""}
              onChange={(e) =>
                handleChange("alternate_phone", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={form.p_email || ""}
              onChange={(e) =>
                handleChange("p_email", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Occupation</label>
            <input
              value={form.occupation || ""}
              onChange={(e) =>
                handleChange("occupation", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Address</label>
            <input
              value={form.p_address || ""}
              onChange={(e) =>
                handleChange("p_address", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              value={form.p_city || ""}
              onChange={(e) =>
                handleChange("p_city", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              value={form.p_state || ""}
              onChange={(e) =>
                handleChange("p_state", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              value={form.p_pincode || ""}
              onChange={(e) =>
                handleChange("p_pincode", e.target.value)
              }
            />
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="form-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            Save
          </button>
          {/* <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button> */}
        </div>
    </div>
  );
}