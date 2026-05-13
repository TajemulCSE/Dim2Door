// src/components/Checkout.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import api from "../../utils/api";
import Header from "../Homepage/Header";
import Footer from "../Footer/Footer";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    country: "Bangladesh",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = () => {
    const { fullName, phone, street, city } = address;
    return (
      fullName.trim() &&
      phone.trim() &&
      street.trim() &&
      city.trim() &&
      cartItems.length > 0
    );
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert(
        "Please fill all required fields and ensure you have at least one item in your cart."
      );
      return;
    }

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?._id) {
        alert("You must be signed in to place an order.");
        setLoading(false);
        return;
      }

      const payload = {
        userId: user._id,
        items: cartItems.map((i) => ({
          product: i.id,
          quantity: i.quantity,
          price: i.price,
        })),
        shippingAddress: address,
        paymentMethod,
        subtotal: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };

      await api.post("/orders", payload);
      await clearCart();

      // Save involved reseller IDs for dashboard notifications
      const resellerIds = [...new Set(cartItems.map((item) => item.resellerId))];
      localStorage.setItem("recentResellerIds", JSON.stringify(resellerIds));

      navigate("/order-complete");
    } catch (err) {
      console.error("Order placement failed:", err.response || err);
      alert("Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <Header />

      <div className="checkout-page">
        <div className="breadcrumb">
          <span onClick={() => navigate("/")}>Home</span> / <strong>Checkout</strong>
        </div>

        <div className="checkout-content">
          <div className="billing-details">
            <h2>Billing & Delivery Details</h2>
            <form>
              <input name="fullName" placeholder="Full Name*" value={address.fullName} onChange={handleInputChange} required />
              <input name="phone" placeholder="Phone Number*" value={address.phone} onChange={handleInputChange} required />
              <input name="street" placeholder="Street Address*" value={address.street} onChange={handleInputChange} required />
              <input name="city" placeholder="City*" value={address.city} onChange={handleInputChange} required />
              <input name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleInputChange} />
              <select name="country" value={address.country} onChange={handleInputChange}>
                <option>Bangladesh</option>
                <option>India</option>
                <option>Nepal</option>
              </select>
            </form>
          </div>

          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty 🛒</p>
            ) : (
              <>
                {cartItems.map((i) => (
                  <div className="item" key={i.id}>
                    <img src={i.image || "/images/egg-default.png"} alt={i.name} />
                    <p>{i.name}</p>
                    <span>৳{(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="price-summary">
                  <div>
                    <span>Subtotal:</span> <span>৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div>
                    <span>Shipping:</span> <span>Free</span>
                  </div>
                  <div className="total">
                    <strong>Total:</strong> <strong>৳{subtotal.toFixed(2)}</strong>
                  </div>
                </div>
              </>
            )}

            <div className="payment-methods">
              <h4>Payment Method</h4>
              <label>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
                Cash on Delivery
              </label>
              <label>
                <input type="radio" name="payment" value="bkash" checked={paymentMethod === "bkash"} onChange={() => setPaymentMethod("bkash")} />
                bKash / Nagad / Rocket
              </label>
            </div>

            <div className="coupon-section">
              <input type="text" placeholder="Coupon Code" />
              <button className="apply-coupon">Apply Coupon</button>
            </div>

            <button className="place-order" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>

        <div className="checkout-footer-buffer" />
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
