import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashBoard() {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Admin Dashboard</h2>
        <img 
          src="https://tajemulcse.github.io/images/about-me.png" 
          alt="Admin" 
          className="admin-image" 
        />
        <ul>
          <li onClick={() => navigate('/admin/users')}>👥 Manage Users</li>
          <li onClick={() => navigate('/admin/orders')}>📦 Manage Orders</li>
          <li onClick={() => navigate('/admin/products')}>🛍️ Retailer Products</li>
          <li onClick={() => navigate('/admin/reports')}>📊 Generate Reports</li>
          <li onClick={() => navigate('/admin/settings')}>⚙️ Settings</li>
        </ul>
      </aside>

      <main className="admin-main">
        <h1>Welcome Admin Md. Tajemul Islam</h1>
        <p>Select an option from the sidebar to manage the platform.</p>
      </main>
    </div>
  );
}
