// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import api from './utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1) Initialize from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // 2) Persist to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper to get auth token and user ID
  const token = localStorage.getItem('token');
  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?._id || null;
  };

  // 3) Core actions
  const addToCart = async (product, qty = 1) => {
    // Update local state
    setCartItems(prev => {
      const exists = prev.find(i => i.id === product.id);
      if (exists) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });

    // Sync with backend if logged in
    if (token) {
      try {
        await api.post('/cart', {
          userId: getUserId(),
          productId: product.id,
          quantity: qty,
        });
      } catch (err) {
        console.error('Cart sync failed:', err);
      }
    }
  };

  const removeFromCart = async (id) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
    if (token) {
      try {
        await api.delete(`/cart/${getUserId()}/${id}`);
      } catch (err) {
        console.error('Cart delete failed:', err);
      }
    }
  };

  const updateQuantity = async (id, quantity) => {
    setCartItems(prev =>
      prev.map(i => (i.id === id ? { ...i, quantity } : i))
    );
    if (token) {
      try {
        await api.post('/cart', {
          userId: getUserId(),
          productId: id,
          quantity,
        });
      } catch (err) {
        console.error('Cart update failed:', err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    if (token) {
      try {
        // You may need to adjust this endpoint to clear all items
        await api.delete(`/cart/${getUserId()}`);
      } catch (err) {
        console.error('Server clear cart failed:', err);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
