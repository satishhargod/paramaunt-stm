"use client";
import { useState } from "react";
import { FaUserGraduate, FaBookOpen, FaPhoneAlt, FaUserFriends, FaCommentDots, FaPaperPlane, FaShieldAlt, FaChalkboardTeacher, FaLaptopCode, FaSeedling, FaComments, FaCheckCircle, FaExclamationCircle, FaSchool, FaStar, FaSpinner } from "react-icons/fa";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "../../styles/admission-enquiry.scss";

export default function AdmissionEnquiry() {
  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    parentName: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/admission-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ studentName: "", className: "", parentName: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    setLoading(false);
  };

  const features = [
    { icon: <FaChalkboardTeacher />, text: "Experienced & Dedicated Faculty" },
    { icon: <FaLaptopCode />, text: "Smart & Modern Learning Environment" },
    { icon: <FaSeedling />, text: "Focus on Holistic Student Growth" },
    { icon: <FaComments />, text: "Regular Parent Communication" },
  ];

  const stats = [
    { num: "500+", label: "Students" },
    { num: "40+", label: "Teachers" },
    { num: "15+", label: "Years Est." },
  ];

  return (
    <>
      <Navbar />
      <div className="admission-enquiry">
        <div className="bgAccent" aria-hidden="true" />
        <div className="bgAccent2" aria-hidden="true" />

        <div className="container">
          {/* LEFT */}
          <div className="left">
            <div className="badge">
              <FaStar className="badgeStar" />
              <span>Admissions Open • Session 2026–27</span>
              <FaStar className="badgeStar" />
            </div>

            <div className="schoolIcon">
              <FaSchool />
            </div>

            <h2 className="heading">
              Enroll Your<br />
              <span className="headingAccent">Child Today</span>
            </h2>

            <p className="subtext">
              Give your child the best start in life. Fill out our quick enquiry
              form and our admission team will reach out within 24 hours.
            </p>

            <div className="divider" />

            <ul className="features">
              {features.map((f, i) => (
                <li key={i} className="featureItem">
                  <span className="featureIcon">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <div className="stats">
              {stats.map((s, i) => (
                <div key={i} className="statItem">
                  <span className="statNum">{s.num}</span>
                  <span className="statLabel">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            <div className="cardHeader">
              <h3>Submit Your Enquiry</h3>
              <p>We'll contact you within 24 hours</p>
            </div>

            <form onSubmit={handleSubmit} className="form" noValidate>
              <div className="field">
                <label className="label">
                  <FaUserGraduate /> Student Name
                </label>

                <div className="inputWrap">
                  <span className="inputIcon">
                    <FaUserGraduate />
                  </span>

                  <input
                    className="input"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="field">
                  <label className="label">
                    <FaBookOpen /> Class
                  </label>

                  <div className="inputWrap">
                    <span className="inputIcon">
                      <FaBookOpen />
                    </span>

                    <input
                      className="input"
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">
                    <FaPhoneAlt /> Contact
                  </label>

                  <div className="inputWrap">
                    <span className="inputIcon">
                      <FaPhoneAlt />
                    </span>

                    <input
                      className="input"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">
                  <FaUserFriends /> Parent Name
                </label>

                <div className="inputWrap">
                  <span className="inputIcon">
                    <FaUserFriends />
                  </span>

                  <input
                    className="input"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Query</label>

                <textarea
                  className="input textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {/* SUCCESS MESSAGE */}
              {status === "success" && (
                <div className="successMsg">
                  <FaCheckCircle />
                  Enquiry submitted successfully!
                </div>
              )}

              {/* ERROR MESSAGE */}
              {status === "error" && (
                <div className="errorMsg">
                  <FaExclamationCircle />
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                className="submitBtn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FaSpinner className="spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Submit Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
}