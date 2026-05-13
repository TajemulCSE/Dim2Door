// src/components/Admin/AddProduct.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";
import "./AddProduct.css";

export default function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: 0,
    imageUrl: "",       // will hold the Base64 string
    category: "",
    subcategory: "",
    isOnSale: false,
    discount: 0,
    saleEndsAt: ""
  });

  // When file input changes, read it and set as base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, imageUrl: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ensure an image was picked
    if (!form.imageUrl) {
      alert("Please select an image");
      return;
    }
    addProduct(form);
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Add Product</h2>

      <input
        name="name"
        value={form.name}
        placeholder="Product Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="number"
        name="price"
        value={form.price}
        placeholder="Price"
        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        required
      />

      <input
        name="category"
        value={form.category}
        placeholder="Category"
        onChange={e => setForm({ ...form, category: e.target.value })}
        required
      />

      <input
        name="subcategory"
        value={form.subcategory}
        placeholder="Subcategory"
        onChange={e => setForm({ ...form, subcategory: e.target.value })}
        required
      />

      <label>
        Product Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </label>

      {/* Preview */}
      {form.imageUrl && (
        <img
          src={form.imageUrl}
          alt="Preview"
          style={{ width: 120, margin: "10px 0", border: "1px solid #ccc" }}
        />
      )}

      <label>
        <input
          type="checkbox"
          checked={form.isOnSale}
          onChange={e => setForm({ ...form, isOnSale: e.target.checked })}
        />{" "}
        On Sale?
      </label>
      {form.isOnSale && (
        <>
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={form.discount}
            onChange={e =>
              setForm({ ...form, discount: Number(e.target.value) })
            }
            required
          />
          <input
            type="date"
            name="saleEndsAt"
            value={form.saleEndsAt}
            onChange={e => setForm({ ...form, saleEndsAt: e.target.value })}
            required
          />
        </>
      )}

      <button type="submit">Save</button>
    </form>
  );
}
