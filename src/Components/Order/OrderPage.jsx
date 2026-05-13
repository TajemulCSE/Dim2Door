// src/components/OrderPage/OrderPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./OrderPage.css";
import Header from "../Homepage/Header";
import Footer from "../Footer/Footer";

const OrderPage = () => (
  <>
    <Header />
    <div className="order-page-wrapper">
      <div className="order-page">
        <h2>Order Placed Successfully!</h2>
        <p>
          Thank you for your purchase. We’re preparing your order for delivery.
        </p>
        <Link to="/" className="back-home">
          ← Return to Homepage
        </Link>
      </div>
    </div>
    <Footer />
  </>
);

export default OrderPage;
