"use client";

import "../../styles/footer.scss";
import { FaFacebookF, FaInstagram, FaYoutube, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {

  const scrollToAbout = () => {
    const section = document.getElementById("about");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* SCHOOL INFO */}
        <div className="footer-col">
          <h2 className="logo">Paramount Academy</h2>

          {/* <p className="about">
            Paramount Academy Sitamau is dedicated to providing quality
            education with strong values, modern learning methods and a
            supportive environment where every child can grow, learn and
            achieve their dreams.
          </p> */}

          <div className="contact-item">
            <MdLocationOn className="locationicon" />
            <span>
              Mandsour Road Sitamau, <br />
              Madhya Pradesh 458990
            </span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>078987 31888, 7898822084</span>
          </div>

          <div className="contact-item">
            <MdEmail />
            <span>paramountsitamau@gmail.com</span>
          </div>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>

          <ul>
            <li onClick={scrollToAbout} style={{ cursor: "pointer" }}><Link href="/#about">About</Link></li>
            <li><Link href="/admission-enquiry">Admission</Link></li>
            <li><Link href="/facilities">Our Facilities</Link></li>
            <li><Link href="/mandatory-public-disclosure">Mandatory Public Disclosure(MPD)</Link></li>
            <li><Link href="/events">School Events</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
          </ul>
        </div>


        {/* SCHOOL INFO */}
        <div className="footer-col">
          <h3>School Information</h3>

          <ul>
            <li><Link href="/admission-enquiry">Admission Process</Link></li>
            <li><Link href="/">Fee Structure</Link></li>
            <li><Link href="/facilities">Transport Facility</Link></li>
            <li><Link href="/classes">Student Life</Link></li>
            <li><Link href="/contact-us">Contact Us</Link></li>
          </ul>
        </div>


        {/* NEWSLETTER */}
        <div className="footer-col newsletter">
          <h3>Stay Connected</h3>

          <p>Enter your email to receive updates and school news.</p>

          <div className="subscribe">
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>

          <div className="social">
            <a
              href="https://www.facebook.com/ParamountAcademySitamau/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span><FaFacebookF /></span>
            </a>

            <a
              href="https://www.instagram.com/popular/paramount-academy-sitamau/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span><FaInstagram /></span>
            </a>

            <a
              href="https://www.youtube.com/@paramountacademysitamau9671"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span><FaYoutube /></span>
            </a>
          </div>


        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <p>
          © 2026 Paramount Academy Sitamau | Developed By Satish Hargod | Mo. <a href="tel:+918602148689">+918602148689</a>
        </p>
      </div>


      {/* SCROLL TOP */}
      <div className="scroll-top" onClick={scrollTop}>
        <FaArrowUp />
      </div>

    </footer>
  );
}