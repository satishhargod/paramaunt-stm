"use client"
import Footer from "@/components/Footer";
import Navbar from "../../components/Navbar";
import "../../styles/contactus.scss";
import { useEffect } from "react";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <><Navbar />
      <div className="contact-us">
        <div className="contact-container">

          <div className="contact-header">
            <span className="contact-subtitle">CONTACT US</span>
            <h2 className="contact-title">
              Get in Touch With <span>Paramount Academy Sitamau</span>
            </h2>

            <p className="contact-description">
              Have questions about admissions, facilities, or school activities?
              Our team at Paramount Academy Sitamau is always ready to assist you.
              Feel free to reach out and we will be happy to help you with every query.
            </p>
          </div>


          <div className="contact-content">

            {/* Left Side Info */}
            <div className="contact-info">

              <div className="info-item">
                <h4>School Address</h4>
                <p>
                  Mandsour Road Sitamau,<br />
                  Madhya Pradesh – 458990
                </p>

                <a
                  href="https://maps.google.com/?q=Paramount+Academy+CBSE+School+Sitamau"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: "600" }}
                >
                  📍 Get Directions
                </a>
              </div>

              <div className="info-item">
                <h4>Email Address</h4>
                <p>
                  <a href="mailto:paramountsitamau@gmail.com">
                    paramountsitamau@gmail.com
                  </a>
                </p>
              </div>

              <div className="info-item">
                <h4>Contact Number</h4>
                <p>
                  <a href="tel:+917898731888">+91 7898731888</a>,   <a href="tel:+917898822084">+91 7898822084</a>  
                </p>
              </div>

              <div className="contact-cta">
                <h3>Admissions Open</h3>
                <p>
                  Paramount Academy Sitamau focuses on academic excellence,
                  character building, and holistic development to shape
                  confident and successful students for the future.
                </p>
              </div>

            </div>


            {/* Right Side Form */}
            <div className="contact-form">
              <div className="form-header">
                <h3>Get In Touch</h3>
                <p>
                  Fill out this form for booking a consultant advising session
                  or to get more information about Paramount Academy Sitamau.
                </p>
              </div>


              <form>

                <input type="text" placeholder="Your Name" required />

                <input type="email" placeholder="Your Email" required />

                <input type="text" placeholder="Subject" required />

                <textarea placeholder="Write your message..." rows="5"></textarea>

                <button type="submit">Send Message</button>

              </form>

            </div>

          </div>

        </div>
      </div>
      <Footer /></>
  );
}
