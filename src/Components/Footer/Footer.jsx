import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import qrCode from '../Assets/qrcode.png';
import playStore from '../Assets/playstore.png';
import appStore from '../Assets/appstore.png';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          footerRef.current.classList.add("revealed");
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef}>
      <div className="footer-columns">

        {/* Exclusive Section */}
        <div className="column">
          <h4>Exclusive</h4>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </div>
        </div>

        {/* Support Section */}
        <div className="column">
          <h4>Support</h4>
          <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh</p>
          <p>dim2door@gmail.com</p>
          <p>+8801736283281</p>
        </div>

        {/* Account Section */}
        <div className="column">
          <h4>Account</h4>
          <ul>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/signup">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="column">
          <h4>Quick Link</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Use</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Download App */}
        <div className="column">
          <h4>Download App</h4>
          <p>Save ৳3 with App New User Only</p>
          <img src={qrCode} alt="QR Code" className="qr-code" />
          <div className="app-buttons">
            <img src={playStore} alt="Google Play" />
            <img src={appStore} alt="App Store" />
          </div>
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-linkedin"></i>
          </div>
        </div>

      </div>

      <p className="copyright">© Copyright Dim2Door 2024. All rights reserved.</p>

      <ScrollToTopButton />
    </footer>
  );
};

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    )
  );
};

export default Footer;
