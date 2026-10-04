"use client";
import { useState } from "react";
import "../../styles/career.scss";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";

export default function CareerPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // start loading

  try {
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    const res = await fetch("/api/career", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    if (res.ok) {
      setSuccess(true); 
      setForm({
        name: "",
        email: "",
        mobile: "",
        message: "",
        file: null,
      })
      setTimeout(()=>{
         setSuccess(false); 
      },7000)
    }
  } catch (error) {
    toast.error("Something went wrong!")
    // alert("");
  } finally {
    setLoading(false); // stop loading
  }
};

  return (
    <>
      <Navbar />
      <div className="career-page">
        <div className="career-container">

          {/* LEFT SIDE */}
          <div className="career-left">

            <span className="career-badge">🚀 We're Hiring</span>

            <h1>
              Build Your Future With <span>Us</span>
            </h1>

            <p>
              Join a team of passionate creators and innovators. Work on real-world
              projects, grow your skills, and make a meaningful impact every day.
            </p>

            <div className="career-points">
              <div className="point">
                <span>🚀</span>
                <div>
                  <h4>Growth Opportunities</h4>
                  <p>Learn, improve and grow your career faster</p>
                </div>
              </div>

              <div className="point">
                <span>🤝</span>
                <div>
                  <h4>Friendly Environment</h4>
                  <p>Supportive and collaborative team culture</p>
                </div>
              </div>

              <div className="point">
                <span>📚</span>
                <div>
                  <h4>Flexible Learning</h4>
                  <p>Upgrade your skills with real projects</p>
                </div>
              </div>

              <div className="point">
                <span>💡</span>
                <div>
                  <h4>Real Impact</h4>
                  <p>Your work actually matters here</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="career-right">
                  {success && (
                    <div className="success-message">
                      ✅ Your application has been submitted successfully. We’ll get back to you soon.
                    </div>
                  )}
            <form className="career-form" onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Enter your full name" onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input type="text" name="mobile" placeholder="Enter your mobile number" onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Cover Letter</label>
                <textarea name="message" placeholder="Tell us about yourself..." onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Upload Resume</label>
                <input type="file" name="file" onChange={handleChange} required />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
  {loading ? (
    <span className="loader"></span>
  ) : (
    "Submit Application"
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