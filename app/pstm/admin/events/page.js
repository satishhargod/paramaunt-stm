"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "@/styles/admin/events.scss";
import formatTime from "@/app/lib/formate";
import { MdAccessTime } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function EventsList() {
  const [events, setEvents] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const MAX_LENGTH = 100;


  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success) setEvents(data.data);
    } catch (err) {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this event?")) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      toast.success("Event deleted");
      fetchEvents();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (event) => {
    router.push(`/pstm/admin/events/edit/${event.id}`);
  };

  return (
    <>
      <div className="events-header">
        <h2>Events</h2>
        <button className="add-btn">+ Add Event</button>
      </div>

      {/* ✅ EMPTY STATE */}
      {events.length === 0 ? (
        <div className="no-events">
          <p>No Events Available</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((item) => (
            <div key={item.id} className="event-card">

              {/* IMAGE */}
              <div className="event-image">
                <img src={item.image || "/events/default-event.jpg"} />

                <div className="timeBadge">
                  <MdAccessTime className="icon" />
                  <span>{formatTime(item.time)}</span>
                </div>

                <div className="dateBadge">
                  <span>{new Date(item.date).getDate()}</span>
                  <small>
                    {new Date(item.date).toLocaleString("en-US", { month: "short" })}
                  </small>
                </div>
              </div>

              {/* CONTENT */}
              <div className="event-content">
                <h3 className="title">{item.title}</h3>

                <p>
                  {expanded
                    ? item.description
                    : item.description?.slice(0, MAX_LENGTH) +
                    (item.description?.length > MAX_LENGTH ? "..." : "")}

                  {item.description?.length > MAX_LENGTH && (
                    <span
                      onClick={() => setExpanded(!expanded)}
                      style={{
                        color: "#4f46e5",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      {expanded ? " Show Less" : " Show More"}
                    </span>
                  )}
                </p>

                <div className="location">📍 {item.location}</div>

                <div className="type">
                  {item.type === "sports"
                    ? "🏆 Sports"
                    : item.type === "annual_celebration"
                      ? "🎉 Annual Celebration"
                      : "🎉 Events"}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="event-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}