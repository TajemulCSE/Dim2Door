// src/pages/Reseller/ResellerDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResellerDashboard.css';
import Header from '../../Components/Homepage/Header';

export default function ResellerDashboard() {
  const navigate = useNavigate();
  const [hasNewOrder, setHasNewOrder] = useState(false);

  // Simulate current reseller's ID from localStorage login
  const currentResellerId = JSON.parse(localStorage.getItem("user"))?.id || "reseller123";

  useEffect(() => {
    const recentIds = JSON.parse(localStorage.getItem("recentResellerIds") || "[]");
    if (recentIds.includes(currentResellerId)) {
      setHasNewOrder(true);
    }
  }, [currentResellerId]);

  return (
    <>
      <Header />
      <div className="reseller-layout">
        <aside className="reseller-sidebar">
          <h2>Reseller Panel</h2>
          <ul>
            <li onClick={() => navigate('/reseller/products')}>📦 Manage Products</li>
            <li onClick={() => navigate('/reseller/orders')}>🛒 View Orders</li>
            <li onClick={() => navigate('/reseller/add-product')}>➕ Add New Product</li>
            <li onClick={() => navigate('/reseller/profile')}>👤 My Profile</li>
          </ul>
        </aside>

        <main className="reseller-main">
          <h1>Welcome, Reseller!</h1>
          {hasNewOrder && (
            <p className="new-order-alert">🛎️ You have a new order! Please check the "View Orders" section.</p>
          )}
          <p>Use the options on the left to manage your products and orders easily.</p>
        </main>
      </div>
    </>
  );
}
