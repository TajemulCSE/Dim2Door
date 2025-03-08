import React, { useState } from "react";
import "./Register.css";

import user_icon from "../Assets/user.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/padlock.png";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (formData.password !== formData.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        if (formData.password.length < 6) {
            setMessage("Password must be at least 6 characters!");
            return;
        }

        const userConfirmed = window.confirm(
            `Registration Successful!\n\nSave your credentials:\nUsername: ${formData.username}\nPassword: ${formData.password}\n\nClick OK to save.`
        );

        if (userConfirmed) {
            console.log("User Registered:", formData);
        }
    };

    return (
        <div className="container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <div className="underline"></div>
                
                <div className="input">
                    <img src={user_icon} alt="User Icon" />
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Enter your name" 
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
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
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm your password" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <p className="message">{message}</p>
                
                <button className="submit" onClick={handleSubmit}>Sign Up</button>

                
                <p className="login-link">
                    Already have an account? <a href="/login">Please Login</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
