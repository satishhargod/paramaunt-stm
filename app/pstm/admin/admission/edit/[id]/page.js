"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import "@/styles/admin/common.scss";
import "@/styles/admin/students.scss";

import { toast } from "react-toastify";

import { validateForm } from "../../../validation/validate";
import { ADMISSION_VALIDATION_RULES } from "../../../validation/admission.validation";

const DEFAULT_IMG = "/students/default-student.avif";

// ✅ helper for date format
const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export default function EditStudents() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
  first_name: "",
  last_name: "",
  gender: "",
  dob: "",
  email: "",
  admission_no: "",
  roll_no: "",
  class: "",
  section: "",
  status: "active",

  // ✅ parent fields add
  father_name: "",
  mother_name: "",
  phone: "",
  alternate_phone: "",
  p_email: "",
  occupation: "",
  p_address: "",
  p_city: "",
  p_state: "",
  p_pincode: "",
});

  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  // ================= FETCH =================
  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const res = await fetch(`/api/admin/admission/${id}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const student = data.data;

        setForm({
  first_name: student.first_name || "",
  last_name: student.last_name || "",
  gender: student.gender || "",
  dob: formatDateForInput(student.dob),
  email: student.email || "",
  admission_no: student.admission_no || "",
  roll_no: student.roll_no || "",
  class: student.class || "",
  section: student.section || "",
  status: student.status || "active",

  // ✅ parent mapping
  father_name: student.father_name || "",
  mother_name: student.mother_name || "",
  phone: student.phone || "",
  alternate_phone: student.alternate_phone || "",
  p_email: student.p_email || "",
  occupation: student.occupation || "",
  p_address: student.p_address || "",
  p_city: student.p_city || "",
  p_state: student.p_state || "",
  p_pincode: student.p_pincode || "",
});

        if (student.profile_image) {
          setPreview(student.profile_image);
        }
      } catch (err) {
        toast.error("Failed to load student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ================= IMAGE =================
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

      setPreview(URL.createObjectURL(file));

      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

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

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    const validationErrors = validateForm(
      form,
      ADMISSION_VALIDATION_RULES,
      "update"
    );

    if (Object.keys(validationErrors).length > 0) {
      console.log("validationErrors", validationErrors)
      setErrors(validationErrors);
      return;
    }

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key] ?? "");
      });

      const res = await fetch(`/api/admin/admission/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          toast.error(Object.values(data.errors)[0]);
        } else {
          toast.error(data.message || "Update failed");
        }
        return;
      }

      toast.success("Student updated successfully");
      router.push("/pstm/admin/admission");
    } catch (err) {
      toast.error("Server error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admission-form">
      {/* ================= PROFILE ================= */}
      <div className="card profile-card">
        <div className="image-box">
          <img src={preview} alt="student" />

          <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleImage}
            disabled={uploading}
          />

          {uploading && <p>Uploading...</p>}
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

      {/* ================= DETAILS ================= */}
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
{/* ================= PARENT DETAILS ================= */}
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
      {/* ================= ACTION ================= */}
      <div className="actions">
        <button onClick={handleSubmit}>Update Student</button>
      </div>
    </div>
  );
}