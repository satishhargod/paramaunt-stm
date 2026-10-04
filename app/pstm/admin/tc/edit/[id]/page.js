"use client";

import { useEffect, useState } from "react";
import {
  useParams,
  useRouter,
} from "next/navigation";
import { toast } from "react-toastify";

const DEFAULT_IMG = "/dummy.jpg";

import "@/styles/admin/tc.scss";
import "@/styles/admin/common.scss";

export default function EditTC() {
  const params = useParams();
  const router = useRouter();

  const currentYear =
    new Date().getFullYear();

  const admissionYears = [];

  for (
    let year = currentYear;
    year >= 2010;
    year--
  ) {
    admissionYears.push(year);
  }

  const [preview, setPreview] =
    useState(DEFAULT_IMG);

  const [uploading, setUploading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [form, setForm] = useState({
    student_name: "",
    year_of_admission: "",
    scholar_number: "",
    tc_number:"",
    previous_class_passed: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",
    year_of_issued_tc: "",
    tc_image: "",
  });

  // FETCH TC
  const fetchTC = async () => {
    try {
      const res = await fetch(
        `/api/admin/tc/${params.id}`
      );

      const data = await res.json();

      if (!res.ok) {
        return toast.error(
          data.message
        );
      }
      
      setForm({
        student_name:
          data.data.student_name || "",
        year_of_admission:
          data.data.year_of_admission ||
          "",
        scholar_number:
          data.data.scholar_number ||
          "",
           tc_number:
          data.data.tc_number ||
          "",
        previous_class_passed:
          data.data
            .previous_class_passed ||
          "",
      date_of_birth: data.data.date_of_birth || "",
        father_name:
          data.data.father_name || "",
        mother_name:
          data.data.mother_name || "",
        year_of_issued_tc:
          data.data.year_of_issued_tc ||
          "",
        tc_image:
          data.data.tc_image || "",
      });

      setPreview(
        data.data.tc_image ||
          DEFAULT_IMG
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchTC();
    }
  }, [params.id]);

  // UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `/api/admin/tc/${params.id}`,
      {
        method: "PUT",
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    toast.success(
      "TC Updated Successfully"
    );

    router.push("/pstm/admin/tc");
  };

  // IMAGE UPLOAD
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      return toast.error(
         "Only pdf allowed"
      );
    }

    if (
      file.size > 4 * 1024 * 1024
    ) {
      return toast.error(
        "Max size 4MB"
      );
    }

    try {
      setUploading(true);

      const previewUrl =
        URL.createObjectURL(file);

      setPreview(previewUrl);

      const fd = new FormData();

      fd.append("file", file);

      fd.append("folder", "tc");

      const res = await fetch(
        "/api/upload",
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data.message
        );

      setForm((prev) => ({
        ...prev,
        tc_image: data.url,
      }));

      toast.success(
        "Image uploaded"
      );
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return <p>Loading...</p>;

  return (
    <div className="add-tc-container">
      <div className="top-header">
        <button
          className="back-btn"
          onClick={() =>
            router.back()
          }
        >
          ← Back
        </button>

        <h2>
          Edit Transfer Certificate
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>
              Name of Student
            </label>

            <input
              type="text"
              placeholder="Enter Student Name"
              value={form.student_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  student_name:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Year of Admission
            </label>

            <select
              value={
                form.year_of_admission
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  year_of_admission:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Year
              </option>

              {admissionYears.map(
                (year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label>
              Scholar Number
            </label>

            <input
              type="text"
              placeholder="Scholar Number"
              value={
                form.scholar_number
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  scholar_number:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Tc Number
            </label>

            <input
              type="text"
              placeholder="Tc Number"
              value={
                form.tc_number
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  tc_number:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Previous Class Passed
            </label>

            <input
              type="text"
              placeholder="Class"
              value={
                form.previous_class_passed
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  previous_class_passed:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Date Of Birth
            </label>

            <input
              type="date"
              value={
                form.date_of_birth
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  date_of_birth:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Father Name
            </label>

            <input
              type="text"
              placeholder="Father Name"
              value={form.father_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  father_name:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Mother Name
            </label>

            <input
              type="text"
              placeholder="Mother Name"
              value={form.mother_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  mother_name:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>
              Year of Issued TC
            </label>

            <select
              value={
                form.year_of_issued_tc
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  year_of_issued_tc:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select Year
              </option>

              {admissionYears.map(
                (year) => (
                  <option
                    key={year}
                    value={year}
                  >
                    {year}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        {/* IMAGE */}
        {/* <div className="image-box">
          <img
            src={preview}
            alt="tc"
          />

          <label className="upload-btn">
            {uploading
              ? "Uploading..."
              : "Change TC"}

            <input
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImage}
              hidden
            />
          </label>
        </div> */}

        <div className="image-box">
          {preview && (
            <iframe
              src={preview}
              title="TC PDF"
              width="100%"
              height="500"
              style={{ border: "1px solid #ddd" }}
            />
          )}

          <label className="upload-btn">
            {uploading ? "Uploading..." : "Upload TC"}

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleImage}
              hidden
            />
          </label>
        </div>

        <button type="submit">
          Update TC
        </button>
      </form>
    </div>
  );
}