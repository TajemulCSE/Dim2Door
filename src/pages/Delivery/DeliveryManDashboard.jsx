import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DeliveryManDashboard.css';
import Header from '../../Components/Homepage/Header';

export default function DeliveryManDashboard() {
  const navigate = useNavigate();

  return (
  <>
    <Header />
    <div className="deliveryman-layout">
      <aside className="deliveryman-sidebar">
        <h2>Delivery Man Dashboard</h2>
        <ul>
          <li onClick={() => navigate('/deliveryman/assigned')}>📋 View Assigned Orders</li>
          <li onClick={() => navigate('/deliveryman/map')}>🗺️ Delivery Map</li>
          <li onClick={() => navigate('/deliveryman/status')}>✅ Update Delivery Status</li>
        </ul>
      </aside>

      <main className="deliveryman-main">
        <h1>Welcome, Delivery Agent!</h1>
        <p>Manage and track your deliveries from here.</p>
      </main>
    </div>
  </>
  );
}
