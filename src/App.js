import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import AdminDashBoard from './AdminDashBoard';
import CustomerDashboard from './CustomerDashboard';
import ResellerDashboard from './ResellerDashboard';
import DeliveryManDashboard from './DeliveryManDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/reseller" element={<ResellerDashboard />} />
        
<Route path="/deliveryman" element={<DeliveryManDashboard />} />
<Route path="/deliveryman/assigned" element={<div>Assigned Orders Page</div>} />
<Route path="/deliveryman/map" element={<div>Delivery Map Page</div>} />
<Route path="/deliveryman/status" element={<div>Update Delivery Status Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
