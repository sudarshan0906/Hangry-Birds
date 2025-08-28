// src/MainApp.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import OrderPage from "./OrderPage";
import AccountOffcanvas from './AccountOffcanvas';

function App() {
  const [quantities, setQuantities] = useState({});
  const totalItems = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  const [pincode, setPincode] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const pincodeSuggestions = ["500001", "560068", "110011", "400001", "533126", "533125", "533124"];
  const foodItems = [
    { id: 1, name: "Pizza", price: 299, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT2uUt39lwCJYzu9CDwBdYGJc-a7ePAkDg9jtlRGKKUrrVvbLTh" },
    { id: 2, name: "Burger", price: 199, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQuacSQpLxa4Ut2nYGV66eD2a5maxXKcvuRfvARC_OX1c4X-Q9" },
    { id: 3, name: "Pasta", price: 249, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQLe4ZuMJv97476JedMfJL_u-xbB5I0d8gSRx1JhBL3dcq2-Uu_" },
    { id: 4, name: "Biryani", price: 299, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSDVEdX42BJnrnkBnlhZXpInplSYvZGrzv_vMRF2qegiYm5P4fg" },
    { id: 5, name: "Dosa", price: 149, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST7BgY8hhNAy8xMgaBNsRynhTP_E--bm4lTGuWCjvqMCV4ZaZe" },
    { id: 6, name: "Fries & Shewarma", price: 99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ4FuVenOo05XOdldzcQmXsKmtmC8ngYBDu5jISZxWXN39danY" },
    { id: 7, name: "Salad", price: 199, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQqpS9GxlfpYLLFO4GhuJwor4lpH7sHhoQriHwV3Ubs6BYrRkzO" },
    { id: 8, name: "Ice-Cream", price: 79, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRCeyBxfXyuM0ENos5DNgwtqV4pT0D2n9nNoeCaxFpTk8fBfEzg" },
    { id: 9, name: "Paratha", price: 69, image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQRl1mPPlcFnlbhfQjj60jIU0aK5lvFgsPxTj0RMDFM8UUvQxe3" },
    { id: 10, name: "North", price: 169, image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT4MMG2aNWtstOchSdfkAqcu8MMCvwFIIAVF8UTLWDMrcQGerkJ" },
    { id: 11, name: "South", price: 169, image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcToMSp1b2MUqwcgjiI1aTVlVspSkNS2_-etZljtUv6HGpq2V7Bz" },
    { id: 12, name: "Cakes", price: 369, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpb0UCmU6K0VnJVCYNstwQs05xquZ3XfzispUN4srKSndl7IDC" }
  ];
  useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);
    const loadedQuantities = {};
    parsedCart.forEach((item) => {
      loadedQuantities[item.id] = item.quantity;
    });
    setQuantities(loadedQuantities);
  }
}, []);

  // Save cart to localStorage whenever quantities change
  useEffect(() => {
    const cart = Object.entries(quantities).map(([id, quantity]) => {
      const item = foodItems.find(f => f.id === parseInt(id));
      return { ...item, quantity };
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [quantities]);

  const handleAddToCart = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const increment = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decrement = (id) => {
    setQuantities((prev) => {
      const newQty = prev[id] - 1;
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
  <Routes>
    <Route
      path="/"
      element={
    <div className="main-app-container" id="starting">
            <nav className="navbar">
              <img src="./logo.png" alt="logo" />
              <ul className="nav-links">
                <li><a href="#starting">Home</a></li>
                <li onClick={() => navigate("/order")}>Orders</li>
                <li className="cart-dropdown">
                  🛒 Cart {totalItems > 0 && <span className="cart-count">({totalItems})</span>}
                  <div className="cart-details">
                    {Object.entries(quantities).length > 0 ? (
                      <>
                        <div className="cart-scroll-wrapper">
                          <div className="cart-items-scroll">
                            {Object.entries(quantities).map(([id, qty]) => {
                              const item = foodItems.find(f => f.id === parseInt(id));
                              return (
                                <div key={id} className="cart-item-card">
                                  <img src={item?.image} alt={item?.name} className="cart-card-img" />
                                  <div className="cart-card-content">
                                    <h4>{item?.name}</h4>
                                    <h6>₹{item?.price}</h6>
                                    <div className="qty-controls">
                                      <button onClick={() => decrement(item.id)}>-</button>
                                      <span>{qty}</span>
                                      <button onClick={() => increment(item.id)}>+</button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <button className="order-now-btn" onClick={() => navigate("/order")}>Order Now</button>
                      </>
                    ) : (
                      <p>Cart is empty</p>
                    )}
                  </div>
                </li>
                <li>
  <a
    data-bs-toggle="offcanvas"
    href="#accountOffcanvas"
    role="button"
    aria-controls="accountOffcanvas"
  >
    Account
  </a>
</li>

                <li><a href="#endcredits">About Us</a></li>
                <li className="pincode-wrapper">
                  <div
                    className="drawer"
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    tabIndex="0"
                  >
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="pincode-input"
                    />
                    <span className="arrow">&#9662;</span>
                    {showSuggestions && (
                      <ul className="pincode-suggestions">
                        {pincodeSuggestions
                          .filter(code => code.startsWith(pincode))
                          .map(code => (
                            <li key={code} onClick={() => setPincode(code)}>{code}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                </li>
                <li><a href="#endcredits">Support</a></li>
                <li onClick={() => navigate("/login")}>Login</li>
              </ul>
            </nav>
    <div className="content-below-navbar"> 
      {/* Marquee Section */}
<div className="offer-marquee">
  <div className="marquee-content">
    <span>🔥 50% OFF on first order! </span>
    <span>💥 Free delivery above ₹199 </span>
    <span>🍕 Flat ₹100 OFF on Pizza orders </span>
    <span>🍔 Combo deals starting at ₹99 </span>
  </div>
</div>


      {/* Banner Carousel */}
      <section className="banner-carousel">
        <div className="carousel-track">
          <img src="/banner1.PNG" alt="Banner 1" />
          <img src="/banner2.PNG" alt="Banner 2" />
          <img src="/banner3.PNG" alt="Banner 3" />
        </div>
      </section>

      {/* Food Items */}
      <section className="food-section">
  <div className="repeating-box">
    <h2>Popular Dishes</h2>
    <div className="food-grid">
      {foodItems.map((item) => (
        <div className="food-card" key={item.id}>
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          {quantities[item.id] ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button onClick={() => decrement(item.id)}>-</button>
                <span>{quantities[item.id]}</span>
                <button onClick={() => increment(item.id)}>+</button>
              </div>
            ) : (
              <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
            )}

            </div>
          ))}
        </div>
      </div>
    </section>
      <div class="map">
        <h2>Discover delicious food from local favorites</h2>
        <br/>
        <img src="/maps.png" alt="map"></img> 
      </div>

      <footer className="footer" id="endcredits">
  <div className="footer-container">

    {/* Left: Logo and Apps */}
    <div className="footer-left">
      <h1>Hangry Birds</h1>
      <div>
        <img className="footer-logo" src="logo.png" alt="logo" />
      </div>
      <img className="img-11" src="/play.png" alt="Play Store" />
      <img className="img-12" src="/iOS_ajgrty.avif" alt="App Store" />
    </div>

    {/* Right: Link sections */}
    <div className="footer-right">
  {/* Column 1 */}
  <div className="footer-column">
    <div className="footer-section">
      <h5>Discover</h5>
      <ul>
        <li><a href="#">Get it on Google Play</a></li>
        <li><a href="#">Promotions</a></li>
        <li><a href="#">Shop groceries</a></li>
        <li><a href="#">Pickup near me</a></li>
        <li><a href="#">Restaurants near me</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h5>Contact Us</h5>
      <ul>
        <li><strong>Phone:</strong> <a href="tel:+916303626763">+91 6303626763</a></li>
        <li><strong>Email:</strong> <a href="mailto:sudarshandavuluri@gmail.com">sudarshandavuluri@gmail.com</a></li>
      </ul>
      <h5>follow us on</h5>
      <div className="logos">
      <div className="icon"><img className="fb" src="/facebook.png" alt="fb" /></div>
      <div className="icon"><img className="insta" src="/instagram.png" alt="insta" /></div>
      <div className="icon"><img className="twitter" src="/twitter.png" alt="twitter" /></div>
    </div>

    </div>
  </div>

  {/* Column 2 */}
  <div className="footer-column">
    <div className="footer-section">
      <h5>Support</h5>
      <ul>
        <li><a href="#">Get Help</a></li>
        <li><a href="#">Buy gift cards</a></li>
        <li><a href="#">View all cities</a></li>
        <li><a href="#">View all countries</a></li>
      </ul>
    </div>
  </div>

  {/* Column 3 */}
  <div className="footer-column">
    <div className="footer-section">
      <h5>Language</h5>
      <ul>
        <li><a href="#">English</a></li>
      </ul>
    </div>
  </div>
</div>

  </div>

  <div className="footer-bottom">
    <p>© {new Date().getFullYear()} Hangry Birds. All rights reserved.</p>
  </div>
</footer>
    </div>
    <AccountOffcanvas />

      </div>
    }
    />
    <Route path="/order" element={<OrderPage />} />
  </Routes>
);
}

export default App;
