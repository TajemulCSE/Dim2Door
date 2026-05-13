import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';
import { CartContext } from '../../CartContext';

// Icons
import userIcon from '../Assets/account_icon.png';
import wishlistIcon from '../Assets/wishlist.png';
import cartIcon from '../Assets/cart.png';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <Link to="/" className="logo-link">Dim2Door</Link>
        </div>

        {/* Navigation */}
        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/compare">Govt. vs Dim2Door</Link> {/* New Button */}
          <Link to="/about">About</Link>
          {isLoggedIn ? (
            <a href="/" onClick={handleLogout} className="nav-link logout-link">Log Out</a>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
        </nav>

        {/* Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What kind of eggs are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>

        {/* Icons */}
        <div className="header-icons">
          <Link to="/account" className="icon">
            <img src={userIcon} alt="Account" className="nav-icon" />
          </Link>
          <Link to="/wishlist" className="icon">
            <img src={wishlistIcon} alt="Wishlist" className="nav-icon" />
          </Link>
          <Link to="/cart" className="icon cart-icon">
            <img src={cartIcon} alt="Cart" className="nav-icon" />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
