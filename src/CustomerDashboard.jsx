import React from 'react';
import { NavLink } from 'react-router-dom';
import './CustomerDashboard.css';

export default function CustomerDashboard() {
  return (
    <div className="customer-dashboard-layout">
      <aside className="customer-sidebar">
        <h2>Customer Dashboard</h2>
        <img
          src="https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_1280.jpg"
          alt="Customer"
          className="customer-image"
        />
        <ul>
          <li>
            <NavLink to="/browse-products" className="sidebar-link">
              🛒 Browse &amp; Order Eggs
            </NavLink>
          </li>
          <li>
            <NavLink to="/track-order" className="sidebar-link">
              📦 Track Your Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/order-history" className="sidebar-link">
              🧾 View Order History
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className="sidebar-link">
              👤 Update Profile
            </NavLink>
          </li>
        </ul>
      </aside>

      <main className="customer-main">
        <h1>Welcome, Valued Customer!</h1>
        <p>Select an option from the sidebar to get started.</p>
      </main>
    </div>
  );
}
