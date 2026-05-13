// src/components/Signin/Signin.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import "./Signin.css";

import user_icon from "../Assets/user.png";
import password_icon from "../Assets/padlock.png";

const Signin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("signin-body");
    return () => document.body.classList.remove("signin-body");
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setMessage("");
    setSubmitting(true);

    // Basic validation
    if (!credentials.email || !credentials.password) {
      setMessage("❌ Email and password are required.");
      setSubmitting(false);
      return;
    }

    try {
      // POST to login endpoint
      const res = await api.post("/users/login", credentials);

      if (res.data.success) {
        const { token, role, userId, username } = res.data;

        // 1) Persist auth info
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        // Store a minimal user object with _id so CartContext.getUserId() works
        localStorage.setItem("user", JSON.stringify({ _id: userId, username }));

        // 2) Handle optional redirect query param
        const params = new URLSearchParams(location.search);
        const redirectTo = params.get("redirect");

        if (redirectTo) {
          navigate(redirectTo);
        } else {
          // 3) Otherwise, role-based landing
          switch (role) {
            case "Admin":
              navigate("/admin");
              break;
            case "Retailer":
              navigate("/retailer");
              break;
            case "Delivery Personnel":
              navigate("/delivery");
              break;
            default:
              navigate("/");
          }
        }
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "❌ Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="form-box">
        <h2>Login</h2>
        <div className="underline" />

        <div className="input">
          <img src={user_icon} alt="User Icon" />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="Password Icon" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p className="message">{message}</p>}

        <button
          className="submit"
          onClick={handleLogin}
          disabled={submitting}
        >
          {submitting ? "Logging in..." : "Sign In"}
        </button>

        <p className="register-link">
          Forgot password? <Link to="/account">Reset Password</Link>
        </p>
        <p className="reset-password">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
