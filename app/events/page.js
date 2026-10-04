"use client"
import "../../styles/events.scss"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md";
import { useEffect, useState } from "react";
import formatTime from "../lib/formate";
export default function Events() {

  const [events, setEvents] = useState([]);
   const [expanded, setExpanded] = useState(false);

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
    window.scrollTo(0, 0);
  }, []);
  

  return (
    <>
      <Navbar />

      <section className="eventsSection">

        <div className="container">

          <div className="sectionHeader">

            <span className="sectionSubtitle">EVENTS & NEWS</span>

            <h2 className="sectionTitle">
              Upcoming Events & <span>News</span>
            </h2>

            <p className="sectionDesc">
              Stay updated with the latest events, celebrations, and activities happening
              at Paramount Academy Sitamau throughout the academic year.
            </p>

          </div>


          <div className="eventsGrid">

            {events.map((event, i) => (

              <div className="eventCard" key={i}>

                <div className="eventImg">

                  <img src={event.image} alt="event" />

                  <div className="timeBadge">
                    <MdAccessTime className="icon" />
                    <span>{formatTime(event.time)}</span>
                  </div>

                </div>

                <div className="eventContent">

                  <div className="dateBadge">
                    <span> {new Date(event.date).getDate()}</span>
                    <small>{new Date(event.date).toLocaleString("en-US", { month: "short" })}</small>
                  </div>

                  <h3>
                    {event.title}
                  </h3>

                  <p>
                    {expanded
                      ? event.description
                      : event.description?.slice(0, MAX_LENGTH) + (event.description?.length > MAX_LENGTH ? "..." : "")}


                    {event.description?.length > MAX_LENGTH && (
                      <span
                        onClick={() => setExpanded(!expanded)}
                        style={{ color: "#4f46e5", cursor: "pointer", fontWeight: 500 }}
                      >
                        {expanded ? " Show Less" : " Show More"}
                      </span>
                    )} </p>

                  <div className="location">
                    <MdLocationOn className="icon" />
                    <span>{event.location}</span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  )

}