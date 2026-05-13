// src/Components/Admin/ProductsList.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import "./ProductsList.css";

export default function ProductsList() {
  const navigate = useNavigate();
  const { products, deleteProduct } = useContext(ProductContext);

  // Go to the Add Product form
  const handleAdd = () => {
    navigate("/admin/products/add");
  };

  // Navigate to the EditProduct route with the product ID
  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  // Remove from context (and localStorage)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <div className="admin-products-list">
      <h2>All Products</h2>
      <button className="add-btn" onClick={handleAdd}>
        ➕ Add New Product
      </button>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price (৳)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="table-product-img"
                />
              </td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.category}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(p.id)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(p.id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
