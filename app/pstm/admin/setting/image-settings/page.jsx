"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import "@/styles/admin/image-settings.scss";
import "@/styles/admin/common.scss";

const DEFAULT_IMG = "/dummy.jpg";

const TYPES = [
  { value: "announcement-modal", label: "Announcement Modal" },
  //  { value: "result-10th", label: "10th Result" },
  // { value: "result-12th", label: "12th Result" },
  
];

export default function ModalImageUpdate() {
  const [selectedType, setSelectedType] = useState("announcement-modal");
  const [preview, setPreview] = useState(DEFAULT_IMG);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    redirect: "",
    img_path: "",
    type: "home-page-modal",
    status: "active",
  });

  // Fetch data when type changes
  useEffect(() => {
    fetchByType(selectedType);
  }, [selectedType]);

  const fetchByType = async (type) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/image-setting?type=${type}`);
      const data = await res.json();

      if (res.ok && data.data) {
        const d = data.data;
        setForm({
          id: d.id,
          title: d.title || "",
          redirect: d.redirect || "",
          img_path: d.img_path || "",
          type: d.type,
          status: d.status || "active",
        });
        setPreview(d.img_path || DEFAULT_IMG);
      } else {
        // No record found – reset form for new entry
        setForm({
          id: null,
          title: "",
          redirect: "",
          img_path: "",
          type,
          status: "active",
        });
        setPreview(DEFAULT_IMG);
      }
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // IMAGE UPLOAD
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type))
      return toast.error("Only JPG, PNG, WEBP allowed");
    if (file.size > 4 * 1024 * 1024)
      return toast.error("Max size 4MB");

    try {
      setUploading(true);
      setPreview(URL.createObjectURL(file));

      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "image-settings");

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setForm((prev) => ({ ...prev, img_path: data.url }));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const isEdit = !!form.id;
      const url = isEdit
        ? `/api/admin/image-setting/${form.id}`
        : "/api/admin/image-setting";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: selectedType }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success(isEdit ? "Updated successfully" : "Created successfully");

      // Refresh data
      fetchByType(selectedType);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-img-container">
      <h2>Modal Image Manager</h2>

      {loading ? (
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                placeholder="Enter title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Redirect URL</label>
              <input
                type="text"
                placeholder="https://example.com/page"
                value={form.redirect}
                onChange={(e) => setForm({ ...form, redirect: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* IMAGE */}
          <div className="image-box">
            <img src={preview} alt="modal preview" />
            <label className="upload-btn">
              {uploading ? "Uploading..." : "Upload Image"}
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImage}
                hidden
              />
            </label>
          </div>

          <div className="form-meta">
            <span className="type-badge">{selectedType}</span>
            {form.id && (
              <span className="record-id">Record ID: {form.id}</span>
            )}
          </div>

          <button type="submit" disabled={saving || uploading}>
            {saving ? "Saving..." : form.id ? "Update" : "Create"}
          </button>
        </form>
      )}
    </div>
  );
}