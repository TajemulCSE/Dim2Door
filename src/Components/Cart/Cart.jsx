// src/components/Cart.jsx
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import Header from "../Homepage/Header";
import Footer from "../Footer/Footer";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Local editable quantities
  const [localQuantities, setLocalQuantities] = useState({});

  useEffect(() => {
    const qs = {};
    cartItems.forEach(item => {
      qs[item.id] = item.quantity;
    });
    setLocalQuantities(qs);
  }, [cartItems]);

  // Total
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // Guarded checkout
  const handleProceed = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin?redirect=/checkout");
    } else {
      navigate("/checkout");
    }
  };

  // Apply edits
  const handleUpdateCart = () => {
    cartItems.forEach(item => {
      const newQty = Number(localQuantities[item.id]);
      if (newQty >= 1 && newQty !== item.quantity) {
        updateQuantity(item.id, newQty);
      }
    });
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>

          <div className="cart-table">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span></span>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty">
                Your cart is empty. 🙄 Add Items!!
              </div>
            ) : (
              cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <span>{item.name}</span>
                  <span>৳{item.price.toFixed(2)}</span>

                  <span>
                    <input
                      type="number"
                      min="1"
                      className="qty-input"
                      value={localQuantities[item.id] || item.quantity}
                      onChange={e =>
                        setLocalQuantities(prev => ({
                          ...prev,
                          [item.id]: e.target.value,
                        }))
                      }
                    />
                  </span>

                  <span>
                    ৳
                    {(
                      item.price *
                      (localQuantities[item.id] ?? item.quantity)
                    ).toFixed(2)}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    ✖
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="cart-actions">
            <button className="shop-btn" onClick={() => navigate("/")}>
              ← Return To Home
            </button>
            <button className="update-btn" onClick={handleUpdateCart}>
              Update Cart
            </button>
          </div>

          <div className="cart-total">
            <h3>Cart Total</h3>
            <p>
              <span>Subtotal:</span> <span>৳{total}</span>
            </p>
            <p>
              <span>Shipping:</span> <span>Free</span>
            </p>
            <p>
              <strong>
                <span>Total:</span> <span>৳{total}</span>
              </strong>
            </p>

            <button
              className="checkout-btn"
              disabled={cartItems.length === 0}
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
