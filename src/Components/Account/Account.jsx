import React from "react";
import "./Account.css";
import Footer from '../Footer/Footer';
import Header from '../Homepage/Header';

const Account = () => {
  
  return (
        <>
          <Header />
    <div className="profile-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Home / <strong>My Account</strong>
      </div>
      
      <div className="profile-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <h3>Manage My Account</h3>
          <ul>
            <li className="active">My Profile</li>
            <li>Address Book</li>
            <li>My Payment Options</li>
          </ul>
          <h3>My Orders</h3>
          <ul>
            <li>My Returns</li>
            <li>My Cancellations</li>
          </ul>
          <h3>My Wishlist</h3>
        </aside>

        {/* Profile Form */}
        <div className="profile-form-container">
          <div className="greeting">Welcome! princeerk17</div>
          <h2>Edit Your Profile</h2>
          <form className="profile-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" defaultValue="Prince" />
              <input type="text" placeholder="Last Name" defaultValue="Sarker" />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" defaultValue="princeerk170@gmail.com" />
              <input type="text" placeholder="Address" defaultValue="House no: 857, East Shewrapara" />
            </div>

            <h4>Password Changes</h4>
            <div className="form-col">
              <input type="password" placeholder="Current Password" />
              <input type="password" placeholder="New Password" />
              <input type="password" placeholder="Confirm New Password" />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">Cancel</button>
              <button type="submit" className="save-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    <Footer/>
    </div>
    </>
  );
};

export default Account;
