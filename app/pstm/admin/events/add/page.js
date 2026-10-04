"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "@/styles/admin/events.scss";
import "@/styles/admin/common.scss";

const DEFAULT_IMG = "/dummy.jpg";

export default function AddEvent({ onClose, onSuccess }) {
    const [form, setForm] = useState({
        status: "active",
        type: ""
    });

    const [preview, setPreview] = useState(DEFAULT_IMG);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleSubmit = async () => {
        // simple validation
        if (!form.title) return toast.error("Title is required");
        if (!form.date) return toast.error("Date is required");

        try {
            const res = await fetch("/api/admin/events", {
                method: "POST",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success("Event added successfully");
            onSuccess?.();
            setForm({
                status: "active"
            })
            // onClose();
        } catch (err) {
            toast.error(err.message || "Something went wrong");
        }
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.type)) {
            return toast.error("Only JPG, PNG, WEBP allowed");
        }

        if (file.size > 2 * 1024 * 1024) {
            return toast.error("Max size 2MB");
        }

        try {
            setUploading(true);

            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            const fd = new FormData();
            fd.append("file", file);
            fd.append("folder", "events");

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
        <div className="event-form form-container">

            {/* IMAGE CARD */}
            <div className="card profile-card">
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
            </div>

            {/* DETAILS CARD */}
            <div className="form-card">
                <h4 className="card-title">Event Details</h4>

                <div className="form-grid">
                    <div className="form-group full">
                        <label>Title</label>
                        <input
                            value={form.title || ""}
                            onChange={(e) => handleChange("title", e.target.value)}
                        />
                    </div>

                    <div className="form-group full">
                        <label>Description</label>
                        <textarea
                            rows={4}
                            value={form.description || ""}
                            onChange={(e) => handleChange("description", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input
                            value={form.location || ""}
                            onChange={(e) => handleChange("location", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Date</label>
                        <input
                            type="date"
                            value={form.date || ""}
                            onChange={(e) => handleChange("date", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Time</label>
                        <input
                            type="time"
                            value={form.time || ""}
                            onChange={(e) => handleChange("time", e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Event Type</label> 
                        <select
                            value={form.type || ""}
                            onChange={(e) => handleChange("type", e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="annual_celebration">Annual Celebration</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={form.status || "active"}
                            onChange={(e) => handleChange("status", e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ACTION */}
            <div className="form-actions">
                <button className="btn-primary" onClick={handleSubmit}>
                    Save Event
                </button>
            </div>
        </div>
    );
}