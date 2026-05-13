import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import Footer from '../Footer/Footer';
import { products } from '../Data/products';
import { CartContext } from '../../CartContext';
import Header from "../Homepage/Header";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div style={{ padding: '2rem' }}>Product not found.</div>;
  }

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuyNow = () => {
    const productToAdd = {
      ...product,
      quantity,
    };

    addToCart(productToAdd);
    navigate('/checkout');
  };

  return (
    <>
      <Header />
    <div className="product-details-container">
      <div className="breadcrumb">
        Home / {product.category} / <span>{product.name}</span>
      </div>

      <div className="product-content">
        <div className="product-images">
          <div className="thumbnail-gallery">
            <img src={product.image} alt="Thumbnail" />
          </div>
          <div className="main-image">
            <img src={product.image} alt="Main" />
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="rating">
            ★★★★★ ({product.reviews} Reviews) | <span className="in-stock">In Stock</span>
          </p>
          <p className="price">
          ৳{product.price.toFixed(2)} <span className="old-price">৳{product.originalPrice.toFixed(2)}</span>
          </p>
          <p className="description">{product.description}</p>

          <div className="options">
            <label>Sizes:</label>
            <div className="sizes">
              {product.sizes.map((size, idx) => (
                <button key={idx}>{size}</button>
              ))}
            </div>
          </div>

          <div className="quantity-control">
            <label>Quantity:</label>
            <div className="quantity-buttons">
              <button onClick={decrementQty}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={incrementQty}>+</button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
            <button className="wishlist">❤️ Wishlist</button>
          </div>

          <div className="delivery-info">
            <p>🚚 Free Delivery on orders over ৳140</p>
            <p>🔄 1-Day Return Policy | <a href="/">Details</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </>
  );
};

export default ProductDetail;
