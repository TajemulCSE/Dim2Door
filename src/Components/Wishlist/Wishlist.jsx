import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Homepage/Header";
import Footer from "../Footer/Footer";
import { CartContext } from "../../CartContext";
import "./Wishlist.css";

import egg2 from "../Assets/Chicken_Eggs_Layer_White.png";
import egg3 from "../Assets/Quail_Eggs.png";
import egg5 from "../Assets/Purnava_Omega_Eggs.png";
import egg8 from "../Assets/Chicken_Eggs_Layer.png";

const wishlistItems = [
  {
    id: 8,
    name: "Free-Range Brown Eggs",
    price: 120,
    prevPrice: 150,
    img: egg8,
    discount: 20,
  },
  {
    id: 2,
    name: "Free-Range White Eggs",
    price: 200,
    prevPrice: null,
    img: egg2,
  },
  {
    id: 3,
    name: "Quail Eggs - 12pcs",
    price: 90,
    prevPrice: 110,
    img: egg3,
    discount: 18,
  },
  {
    id: 5,
    name: "Omega-3 Enriched Eggs",
    price: 160,
    prevPrice: 180,
    img: egg5,
    discount: 11,
  },
];

const Wishlist = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) =>
      addToCart({ ...item, image: item.img }) // Ensure image is included
    );
    navigate("/cart");
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, image: item.img }); // Ensure image is included
  };

  return (
    <>
      <Header />
      <div className="wishlist-page">
        <div className="breadcrumb">
          Home / <strong>Wishlist</strong>
        </div>

        <div className="wishlist-header">
          <h2>Wishlist ({wishlistItems.length})</h2>
          <button className="move-all-btn" onClick={handleMoveAllToCart}>
            Move All To Cart
          </button>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div className="wishlist-item" key={item.id}>
              {item.discount && <div className="badge">-{item.discount}%</div>}
              <img src={item.img} alt={item.name} />
              <h4>{item.name}</h4>
              <p className="price">
                ৳{item.price}{" "}
                {item.prevPrice && (
                  <span className="prev-price">৳{item.prevPrice}</span>
                )}
              </p>
              <button
                className="wishlist-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
              <button className="wishlist-delete-btn">
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
