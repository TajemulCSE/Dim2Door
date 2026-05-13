// src/Components/Homepage/ProductGrid.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { ProductContext } from '../../contexts/ProductContext';
import './Homepage.css';

const ProductGrid = ({ title = '', filterBy = null }) => {
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const location = useLocation();
  const [displayProducts, setDisplayProducts] = useState(products);

  useEffect(() => {
    let filtered = products;

    // Search filter
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      const lower = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lower)
      );
    }

    // Subcategory/name filter
    if (filterBy) {
      filtered = filtered.filter(p => p.name === filterBy);
    }

    setDisplayProducts(filtered);
  }, [location.search, filterBy, products]);

  return (
    <section className="product-grid">
      {title && <h3>{title}</h3>}
      <div className="products">
        {displayProducts.length > 0 ? (
          displayProducts.map(product => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
                <h4>{product.name}</h4>
                <p>৳{product.price}</p>
              </Link>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found for "{filterBy || 'your search'}"</p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
