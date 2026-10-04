"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AnnouncementModal() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
const router = useRouter();
  useEffect(() => {
    const fetchModal = async () => {
      try {
        const res = await fetch(
          "/api/admin/image-setting?type=announcement-modal"
        );
        const json = await res.json();

        if (json.success && json.data && json.data.status === "active") {
          setData(json.data);
          setOpen(true);
        }
      } catch (err) {
        console.error("Modal fetch error:", err);
      }
    };

    fetchModal();
  }, []);

  if (!open || !data) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          zIndex: 9998,
          animation: "fadeIn 0.2s ease",
        }}
      />

      {/* MODAL */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          width: "90%",
          maxWidth: "440px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          animation: "slideUp 0.25s ease",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close announcement"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "1px solid rgba(0,0,0,0.15)",
            background: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            color: "#374151",
            zIndex: 10,
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {/* IMAGE */}
        {data.img_path && (
          <div style={{ width: "100%",  overflow: "hidden", cursor: "pointer" }}  onClick={() => router.push(data.redirect || "/")}>
            <img
              src={data.img_path}
              alt={data.title || "Announcement"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        )}

        {/* CONTENT */}
        {/* <div style={{ padding: "20px 22px 24px" }}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: 700,
              color: "#973481",
              margin: "0 0 6px",
              textTransform: "uppercase",
              letterSpacing: "0.6px",
            }}
          >
            Announcement
          </p>

          <h3
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              margin: "0 0 8px",
            }}
          >
            {data.title}
          </h3>

          {data.redirect && (
            <a
              href={data.redirect}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "14px",
                padding: "10px 22px",
                background: "#973481",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Learn More
            </a>
          )}
        </div> */}
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}