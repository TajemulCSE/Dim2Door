// ===== Updated Register.jsx =====
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import api from "../../utils/api";

import user_icon from "../Assets/user.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/padlock.png";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Customer",
    address: "",
    phone: "",
    businessName: "",
    shopAddress: "",
    serviceArea: "",
    vehicleType: "",
    vehicleNumber: "",
  });
  const [nidFile, setNidFile] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("register-body");
    return () => document.body.classList.remove("register-body");
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => setNidFile(e.target.files[0]);

  const handleSubmit = async () => {
    setMessage("");
    setSubmitting(true);

    // Password checks
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      setSubmitting(false);
      return;
    }
    if (formData.password.length < 6) {
      setMessage("❌ Password must be at least 6 characters!");
      setSubmitting(false);
      return;
    }

    // Roles requiring NID upload
    const needsNID = ["Retailer", "Delivery Personnel", "Admin"].includes(
      formData.role
    );
    if (needsNID && !nidFile) {
      setMessage("❌ NID picture is required for this role!");
      setSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("username", formData.username);
      payload.append("email", formData.email);
      payload.append("password", formData.password);
      payload.append("role", formData.role);
      payload.append("phone", formData.phone);

      // Customer-specific field
      if (formData.role === "Customer") {
        payload.append("address", formData.address);
      }

      // Retailer-specific fields
      if (formData.role === "Retailer") {
        payload.append("businessName", formData.businessName);
        payload.append("shopAddress", formData.shopAddress);
        payload.append("serviceArea", formData.serviceArea);
        // NID upload
        payload.append("nid", nidFile);
      }

      // Delivery Personnel-specific fields
      if (formData.role === "Delivery Personnel") {
        payload.append("vehicleType", formData.vehicleType);
        payload.append("vehicleNumber", formData.vehicleNumber);
        payload.append("serviceArea", formData.serviceArea);
        // NID upload
        payload.append("nid", nidFile);
      }

      // Admin NID upload
      if (formData.role === "Admin") {
        payload.append("nid", nidFile);
      }

      const res = await api.post("/users/register", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.message.toLowerCase().includes("success")) {
        setMessage(`✅ ${res.data.message}`);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "Customer",
          address: "",
          phone: "",
          businessName: "",
          shopAddress: "",
          serviceArea: "",
          vehicleType: "",
          vehicleNumber: "",
        });
        setNidFile(null);
      } else {
        setMessage(`❌ ${res.data.message}`);
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setMessage("❌ Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <h2>Sign Up</h2>
        <div className="underline" />

        {/* Username */}
        <div className="input">
          <img src={user_icon} alt="User" />
          <input
            name="username"
            placeholder="Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="input">
          <img src={email_icon} alt="Email" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="input">
          <img src={password_icon} alt="Pass" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="Pass" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Role selector */}
        <div className="input">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="Customer">Customer</option>
            <option value="Retailer">Retailer</option>
            <option value="Delivery Personnel">Delivery Personnel</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Phone—visible for every role */}
        <div className="input">
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Customer only */}
        {formData.role === "Customer" && (
          <div className="input">
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Retailer only */}
        {formData.role === "Retailer" && (
          <>
            <div className="input">
              <input
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <input
                name="shopAddress"
                placeholder="Shop Address"
                value={formData.shopAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <input
                name="serviceArea"
                placeholder="Service Area"
                value={formData.serviceArea}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <label>Upload NID:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </>
        )}

        {/* Delivery Personnel only */}
        {formData.role === "Delivery Personnel" && (
          <>
            <div className="input">
              <input
                name="vehicleType"
                placeholder="Vehicle Type"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <input
                name="vehicleNumber"
                placeholder="Vehicle Number"
                value={formData.vehicleNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <input
                name="serviceArea"
                placeholder="Service Area"
                value={formData.serviceArea}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <label>Upload NID:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </>
        )}

        {/* Admin only */}
        {formData.role === "Admin" && (
          <div className="input">
            <label>Upload NID:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        )}

        <p className="message">{message}</p>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="submit"
        >
          {submitting ? "Registering..." : "Sign Up"}
        </button>

        <p className="login-link">
          Have an account? <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
