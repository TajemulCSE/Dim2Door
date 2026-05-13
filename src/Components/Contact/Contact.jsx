import React from 'react';
import './Contact.css';
import Header from '../Homepage/Header';
import Footer from '../Footer/Footer';

const Contact = () => {
  return (
    <>
      <Header />
      <div className="contact-page">
        <div className="contact-breadcrumb">
          <p>Home / <strong>Contact</strong></p>
        </div>

        <div className="contact-container">
          <div className="contact-info-box">
            <div className="contact-info">
              <i className="fas fa-phone-alt"></i>
              <h4>Call Us</h4>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801736238281</p>
            </div>

            <div className="contact-info">
              <i className="fas fa-envelope"></i>
              <h4>Write To Us</h4>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: support@dim2door.com</p>
              <p>Emails: customer@dim2door.com</p>
            </div>
          </div>

          <div className="contact-form-box">
            <form className="contact-form">
              <input type="text" placeholder="Your Name *" required />
              <input type="email" placeholder="Your Email *" required />
              <input type="text" placeholder="Your Phone *" required />
              <textarea placeholder="Your Message" rows="6" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
