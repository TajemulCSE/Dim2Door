import React, { useContext } from 'react';
import './Shop.css';
import Header from '../Homepage/Header';
import Footer from '../Footer/Footer';
import ProductGrid from '../Homepage/ProductGrid';
import { CartContext } from '../../CartContext';

const Shop = () => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="shop-page">
      <Header />

      <section className="shop-banner">
        <h1>All Egg Products</h1>
        <p>Find the best eggs from every category in one place.</p>
      </section>

      <section className="shop-grid">
        <ProductGrid addToCart={addToCart} />
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
