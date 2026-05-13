// src/components/Admin/EditProduct.jsx
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

export default function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct } = useContext(ProductContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const prod = products.find(p => p.id === Number(id));
    if (prod) setForm(prod);
  }, [id, products]);

  if (!form) return <p>Loading…</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(Number(id), form);
    navigate("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>Edit Product</h2>
      {["name", "imageUrl", "category", "subcategory"].map(f => (
        <input
          key={f}
          name={f}
          value={form[f] || ""}
          placeholder={f}
          onChange={e => setForm({ ...form, [f]: e.target.value })}
          required
        />
      ))}
      <input
        type="number"
        name="price"
        placeholder="price"
        value={form.price || 0}
        onChange={e => setForm({ ...form, price: Number(e.target.value) })}
        required
      />

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
            placeholder="discount %"
            value={form.discount}
            onChange={e => setForm({ ...form, discount: Number(e.target.value) })}
            required
          />
          <input
            type="date"
            name="saleEndsAt"
            value={new Date(form.saleEndsAt).toISOString().substr(0, 10)}
            onChange={e => setForm({ ...form, saleEndsAt: e.target.value })}
            required
          />
        </>
      )}

      <button type="submit">Update</button>
    </form>
  );
}
