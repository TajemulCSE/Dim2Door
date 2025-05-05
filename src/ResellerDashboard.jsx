import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResellerDashboard.css';

export default function ResellerDashboard() {
  const navigate = useNavigate();

  return (
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
        <p>Use the options on the left to manage your products and orders easily.</p>
      </main>
    </div>
  );
}
