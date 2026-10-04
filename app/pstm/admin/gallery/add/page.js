"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const DEFAULT_IMG = "/dummy.jpg";
import "@/styles/admin/gallery.scss";
import "@/styles/admin/common.scss";

export default function AddGallery() {
  const router = useRouter();
  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    upload_type: "image",
    title: "",
    year: "",
    type: "",
    image: "",
    video_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    toast.success("Added successfully");
    // onSuccess?.();
    setForm({
    upload_type: "image",
    title: "",
    year: "",
    type: "",
    image: "",
    video_url: "",
  })
    // router.push("/gallery");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return toast.error("Only JPG, PNG, WEBP allowed");
    }
    console.log("file.size",)
    if (file.size > 4 * 1024 * 1024) {
      return toast.error("Max size 4MB");
    }

    try {
      setUploading(true);

      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "gallery");

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setForm((prev) => ({
        ...prev,
        image: data.url,
      }));

      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-gallery-container">
      <h2>Add Gallery</h2>

      <form onSubmit={handleSubmit}>
        {/* Upload Type */}
        <select
          onChange={(e) =>
            setForm({ ...form, upload_type: e.target.value })
          }
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          placeholder="Title"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <select onChange={(e) => setForm({ ...form, year: e.target.value })}>
          <option value="">Select Year</option>
          {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027].map(y => (
            <option key={y}>{y}</option>
          ))}
        </select>

        <select
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="cultural program">Cultural Program</option>
          <option value="curricular activities">Curricular Activities</option>
        </select>

        {/* Conditional Fields */}
        {form.upload_type === "image" ? (
          <div className="image-box">
            <img src={preview} alt="events" />

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
        ) : (
          <input
            placeholder="YouTube URL"
            onChange={(e) =>
              setForm({ ...form, video_url: e.target.value })
            }
          />
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}