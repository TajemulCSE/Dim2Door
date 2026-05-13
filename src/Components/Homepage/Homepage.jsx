// src/Components/Homepage/Homepage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Banner from './Banner';
import FlashSales from './FlashSales';
import Categories from './Categories';
import ProductGrid from './ProductGrid';
import Footer from '../Footer/Footer';
import './Homepage.css';

const Homepage = () => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const navigate = useNavigate();

  // Handles subcategory click from sidebar or category list
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    const exploreSection = document.querySelector('.explore-products-section');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Reset filters + scroll
  const handleResetViewAll = (sectionSelector) => {
    setSelectedSubcategory(null);
    navigate('/');
    const section = document.querySelector(sectionSelector);
    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="homepage">
      {/* Promo Banner */}
      <div className="top-black-bar">
        <p className="promo-text">
          Summer Sale For All Eggs And Free Express Delivery – OFF UPTO 10%!{' '}
          <Link to="/shop" className="promo-link">Shop Now</Link>
        </p>
      </div>

      <Header />

      <div className="homepage-main">
        <Sidebar onSubcategorySelect={handleSubcategorySelect} />

        <div className="main-content">
          {/* Category + Banner */}
          <section className="category-banner-section">
            <div className="categories-box">
              <Categories onSubcategorySelect={handleSubcategorySelect} />
            </div>
            <div className="banner-box">
              <Banner />
            </div>
          </section>

          <FlashSales />

          {/* Flash Deals Section */}
          <section className="flash-sales-section">
            <h3 className="section-subtitle">Flash Sales</h3>
            <ProductGrid />
            <button
              className="view-all"
              onClick={() => handleResetViewAll('.flash-sales-section')}
            >
              View All Flash Deals
            </button>
          </section>

          {/* Best Selling Section */}
          <section className="best-selling-section">
            <h3 className="section-subtitle">Best Selling Products</h3>
            <ProductGrid />
            <button
              className="view-all"
              onClick={() => handleResetViewAll('.best-selling-section')}
            >
              View All
            </button>
          </section>

          {/* All Products Section */}
          <section className="explore-products-section">
            <h3 className="section-subtitle">All Products</h3>
            {/* filterBy drives category filtering; if null, shows all */}
            <ProductGrid filterBy={selectedSubcategory} />
            <button
              className="view-all"
              onClick={() => handleResetViewAll('.explore-products-section')}
            >
              View All Products
            </button>
          </section>

          {/* Features */}
          <section className="features-section">
            <div className="feature-box">
              <i className="fas fa-truck"></i>
              <h4>FREE AND FAST DELIVERY</h4>
              <p>Free delivery for all orders over ৳140</p>
            </div>
            <div className="feature-box">
              <i className="fas fa-headphones-alt"></i>
              <h4>24/7 CUSTOMER SERVICE</h4>
              <p>Friendly 24/7 customer support</p>
            </div>
            <div className="feature-box">
              <i className="fas fa-check-circle"></i>
              <h4>MONEY BACK GUARANTEE</h4>
              <p>We return money within 30 days</p>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
