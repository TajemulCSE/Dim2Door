import React from "react";
import rooster1 from '../Assets/rooster1.png';
import rooster2 from '../Assets/rooster2.png';
import team1 from '../Assets/team1.png';
import team2 from '../Assets/team2.png';
import team3 from '../Assets/team3.png';

import Header from '../Homepage/Header'; // ✅ Add this line
import Footer from '../Footer/Footer';

import "./About.css";

const About = () => {
  return (
    <>
      <Header /> {/* ✅ Header added here */}

      <div className="about-page">
        <div className="breadcrumb">Home / <strong>About</strong></div>

        {/* Story */}
        <section className="about-story">
          <div className="about-text">
            <h1>Our Story</h1>
            <p>
              Launched in 2025, Dim2Door is Bangladesh's premier online Egg marketplace with an active presence in Dhaka.
              Supported by a wide range of products and data, Dim2Door has 10,500 suppliers and 300 storage facilities,
              serving over 3 million customers.
            </p>
            <p>Dim2Door offers over 100 products and is growing rapidly.</p>
          </div>
          <div className="about-images">
            <img src={rooster1} alt="Rooster" />
            <img src={rooster2} alt="Rooster 2" />
          </div>
        </section>

        {/* Stats */}
        <section className="about-stats">
          <div className="stat-box">10.5k<br /><span>Sellers active on our site</span></div>
          <div className="stat-box red">33k<br /><span>Monthly Product Sales</span></div>
          <div className="stat-box">45.5k<br /><span>Active Customers</span></div>
          <div className="stat-box">25k<br /><span>Annual Gross Sales</span></div>
        </section>

        {/* Team */}
        <section className="about-team">
          {[
            { name: "Prince Sarker", title: "CEO and Co-Developer", img: team1 },
            { name: "Nahian Reza Shafin", title: "Co-Developer", img: team2 },
            { name: "Md. Tajemul Islam", title: "Co-Developer", img: team3 },
          ].map((member, i) => (
            <div className="team-member" key={i}>
              <img src={member.img} alt={member.name} />
              <h4>{member.name}</h4>
              <p>{member.title}</p>
              <div className="social-icons">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-linkedin"></i>
              </div>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className="about-features">
          <div className="feature">
            <i className="fas fa-truck"></i>
            <h4>FREE AND FAST DELIVERY</h4>
            <p>Free delivery for all orders over  ৳140</p>
          </div>
          <div className="feature">
            <i className="fas fa-headphones-alt"></i>
            <h4>24/7 CUSTOMER SERVICE</h4>
            <p>Friendly 24/7 customer support</p>
          </div>
          <div className="feature">
            <i className="fas fa-check-circle"></i>
            <h4>MONEY BACK GUARANTEE</h4>
            <p>We return money within 30 days</p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
