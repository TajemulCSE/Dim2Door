// src/contexts/ProductContext.jsx
import React, { createContext, useEffect, useState } from "react";

// 1. Seed data: your original eight eggs
import egg1 from "../Components/Assets/Duck_Eggs.png";
import egg2 from "../Components/Assets/Chicken_Eggs_Layer_White.png";
import egg3 from "../Components/Assets/Quail_Eggs.png";
import egg4 from "../Components/Assets/Chicken_Eggs.png";
import egg5 from "../Components/Assets/Purnava_Omega_Eggs.png";
import egg6 from "../Components/Assets/Purnava_Eggs.png";
import egg7 from "../Components/Assets/Paragon_Brown_Eggs.png";
import egg8 from "../Components/Assets/Chicken_Eggs_Layer.png";

const SEED_PRODUCTS = [
  { id: 1, name: "Deshi Duck Egg",          price: 160, imageUrl: egg1, category: "Duck" },
  { id: 2, name: "Layer Chicken White Egg", price: 140, imageUrl: egg2, category: "Farming Breeds" },
  { id: 3, name: "Local Quail Egg",         price:  90, imageUrl: egg3, category: "Quail" },
  { id: 4, name: "Deshi Chicken Egg",       price: 180, imageUrl: egg4, category: "Local Breeds" },
  { id: 5, name: "Purnava Omega Egg",       price: 180, imageUrl: egg5, category: "Purnava" },
  { id: 6, name: "Purnava Egg",             price: 180, imageUrl: egg6, category: "Purnava" },
  { id: 7, name: "Paragon Brown Egg",       price: 180, imageUrl: egg7, category: "Paragon" },
  { id: 8, name: "Layer Chicken Brown Egg", price: 180, imageUrl: egg8, category: "Farming Breeds" },
];

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Initialize state from localStorage synchronously
  const [products, setProducts] = useState(() => {
    try {
      const raw = localStorage.getItem("dim2door_products");
      return raw ? JSON.parse(raw) : SEED_PRODUCTS;
    } catch {
      return SEED_PRODUCTS;
    }
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem("dim2door_products", JSON.stringify(products));
  }, [products]);

  // CRUD operations
  const addProduct = (prod) => {
    const nextId = products.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    setProducts([...products, { ...prod, id: nextId }]);
  };

  const updateProduct = (id, updated) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};
