"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "@/styles/admin/image-settings.scss";
import "@/styles/admin/common.scss";

export default function NewsLine() {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    id: null,
    redirect: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/news-line");
      const data = await res.json();

      if (res.ok && data.data) {
        setForm({
          id: data.data.id,
          redirect: data.data.redirect || "",
          description: data.data.description || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const isEdit = !!form.id;

      const url = isEdit
        ? `/api/admin/news-line/${form.id}`
        : "/api/admin/news-line";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          redirect: form.redirect,
          description: form.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message || "Something went wrong");
      }

      toast.success(
        isEdit ? "Updated successfully" : "Created successfully"
      );

      fetchData();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-img-container">
      <h2>Modal Content Manager</h2>

      {loading ? (
        <div className="loader-wrap">
          <div className="spinner" />
          <p>Loading...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Redirect URL</label>
              <input
                type="text"
                placeholder="https://example.com/page"
                value={form.redirect}
                onChange={(e) =>
                  setForm({
                    ...form,
                    redirect: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={6}
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : form.id
              ? "Update"
              : "Create"}
          </button>
        </form>
      )}
    </div>
  );
}