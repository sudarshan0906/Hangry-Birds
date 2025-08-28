// src/OrderPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const restaurants = [
  { id: 1, name: "Nikitha FoodCourt", cuisine: "Indian", rating: 4.5, image: "/nikitha.jpeg" },
  { id: 2, name: "MFC", cuisine: "Chinese", rating: 4.2, image: "/mfc.jpeg" },
  { id: 3, name: "Hotel Punnami", cuisine: "South Indian", rating: 4.7, image: "/punnami.jpeg" },
  { id: 4, name: "Amrutha Family Restaurant", cuisine: "Italian", rating: 4.1, image: "/amrutha.jpeg" },
  { id: 5, name: "Blue Moon", cuisine: "Italian", rating: 4.4, image: "/bluemoon.jpeg" }
];

function OrderPage() {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const handleSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setOrderPlaced(false);
  };

  const handleOrder = () => {
    setOrderPlaced(true);
    localStorage.removeItem("cart"); // clear cart after placing order
  };

  const handleBack = () => {
    setSelectedRestaurant(null);
    setCoupon("");
    setOrderPlaced(false);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = coupon === "DISCOUNT10" ? 0.1 * total : 0;
  const finalTotal = total - discount;

  return (
    <div className="order-page">
      {!selectedRestaurant ? (
        <>
          <button className="back-btn" onClick={() => navigate("/home")}>← Back to Home</button>
          <h2>Choose a Restaurant to Place Your Order</h2>
          <div className="restaurant-grid">
            {restaurants.map((r) => (
              <div className="restaurant-card" key={r.id} onClick={() => handleSelect(r)}>
                <img src={r.image} alt={r.name} />
                <h3>{r.name}</h3>
                <p>{r.cuisine}</p>
                <p>⭐ {r.rating}</p>
              </div>
            ))}
          </div>
        </>
      ) : !orderPlaced ? (
        <>
          <h2>Ordering from: {selectedRestaurant.name}</h2>
          <button className="back-btn" onClick={handleBack}>← Back to Restaurants</button>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <div className="cart-section">
                {cartItems.map((item) => (
                  <div className="cart-card" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
              </div>

              <h4>Total: ₹{total}</h4>
              {discount > 0 && <h4>Discount: -₹{discount.toFixed(0)}</h4>}
              <h3>Final Amount: ₹{finalTotal.toFixed(0)}</h3>

              <button className="place-order-btn" onClick={handleOrder}>
                Place Order
              </button>
            </>
          )}
        </>
      ) : (
        <div className="success-msg">
          🎉 Your order from <strong>{selectedRestaurant.name}</strong> has been placed!
          <br />
          <button className="back-btn" onClick={handleBack}>← Back to Restaurants</button>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
