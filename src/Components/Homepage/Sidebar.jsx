import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../Data/products'; // ✅ Import product data
import './Homepage.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#3c009d' }}>
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
