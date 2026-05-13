import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminDashboard.css';
import Header from '../../Components/Homepage/Header';
import adminImage from '../../Components/Assets/team1.png';

export default function AdminDashboard() {
const navigate = useNavigate();
const { pathname } = useLocation();

return (
<>
<Header />
<div className="admin-layout">
<aside className="admin-sidebar">
<h2>Admin Dashboard</h2>
<img src={adminImage} alt="Admin" className="admin-image" />
<ul>
<li onClick={() => navigate('/admin/users')} className={pathname.includes('/admin/users') ? 'active' : ''}>
👥 Manage Users
</li>
<li onClick={() => navigate('/admin/orders')} className={pathname.includes('/admin/orders') ? 'active' : ''}>
📦 Manage Orders
</li>
<li onClick={() => navigate('/admin/products')} className={pathname === '/admin/products' ? 'active' : ''}>
🛍️ Retailer Products
</li>
<li onClick={() => navigate('/admin/products/add')} className={pathname.includes('/admin/products/add') ? 'active' : ''}>
➕ Add Product
</li>
<li onClick={() => navigate('/admin/products/edit')} className={pathname.includes('/admin/products/edit') ? 'active' : ''}>
✏️ Edit Product
</li>
<li onClick={() => navigate('/admin/reports')} className={pathname.includes('/admin/reports') ? 'active' : ''}>
📊 Generate Reports
</li>
<li onClick={() => navigate('/admin/settings')} className={pathname.includes('/admin/settings') ? 'active' : ''}>
⚙️ Settings
</li>
</ul>
</aside>
    <main className="admin-main">
      <Outlet />
    </main>
  </div>
</>
);
}