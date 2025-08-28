// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MainApp from "./MainApp";
import OrderPage from "./OrderPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(stored);
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <MainApp />
            ) : (
              <LandingPage onLogin={() => setLoggedIn(true)} />
            )
          }
        />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/home" element={<MainApp />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;