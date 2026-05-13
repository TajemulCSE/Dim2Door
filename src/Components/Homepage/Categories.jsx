// src/Components/Homepage/Categories.jsx
import React, { useContext, useState } from 'react';
import { ProductContext } from '../../contexts/ProductContext';

const Categories = ({ onSubcategorySelect }) => {
  const { products } = useContext(ProductContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Build dynamic map: category -> array of product names
  const categoryMap = products.reduce((map, product) => {
    const { category, name } = product;
    if (!map[category]) {
      map[category] = [];
    }
    if (!map[category].includes(name)) {
      map[category].push(name);
    }
    return map;
  }, {});

  const handleCategoryClick = (cat) => {
    setSelectedCategory(prev => (prev === cat ? null : cat));
  };

  return (
    <section className="categories">
      <h2 className="section-subtitle">Browse By Category</h2>
      <div className="category-list">
        {Object.keys(categoryMap).map((cat) => (
          <div
            key={cat}
            className={`category-card ${selectedCategory === cat ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="subcategory-list">
          {categoryMap[selectedCategory].map((sub) => (
            <div
              key={sub}
              className="subcategory-card"
              onClick={() => onSubcategorySelect(sub)}
            >
              {sub}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
