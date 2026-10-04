"use client";

import { useState } from "react";
import "@/styles/admin/login.scss";

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      // redirect to dashboard
      window.location.href = "/pstm/admin/dashboard";
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="admin-login">
       <div className="login-container">
        <div className="left-section">
          <img src="/logonobg.png" alt="logo" className="logoimg" />
          {/* <h1>Paramaunt Academy</h1> */}
          <p>Welcome back! Please login to your admin panel.</p>
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit}>
            <h2>Admin Login</h2>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit">Login</button>

            <p className="forgot">Forgot Password?</p>
          </form>
        </div>
      </div>
    </div>
  );
}