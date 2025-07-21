// App.js
import React, { useState } from "react";
import LandingPage from "./LandingPage"; // You’ll create this file
import MainApp from "./MainApp";         // The one you just shared

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      {loggedIn ? <MainApp /> : <LandingPage onLogin={handleLogin} />}
    </>
  );
}

export default App;