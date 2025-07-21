// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // ✅ this instead of LandingPage
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);  // ✅ correct now
