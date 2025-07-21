import React, { useEffect, useState } from "react";
import App from "./MainApp";
import "./Landing.css";

function LandingPage() {
  const [showApp, setShowApp] = useState(false);
  const [warning,setWarning] =useState();

  const handleLogin = () => {
    setShowApp(true);
  };
  const handleFind = () => {
        const isfind=false;
        if(!isfind)
          setWarning("ONCE YOU LOGIN YOU CAN GET YOUR FOOD...");
        setTimeout(()=>setWarning(""),3000);
  };


  

  // ✅ useEffect correctly placed inside the component
  useEffect(() => {
    const headlines = [
      "HUNGRY?",
      "MOVIE MARATHON?",
      "GAME NIGHT?",
      "BORED OF HOME FOOD?",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % headlines.length;
      const headlineElement = document.getElementById("headline");
      if (headlineElement) {
        headlineElement.textContent = headlines[index];
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  if (showApp) return <App />;

  return (
    <div>
      {/* Top Section */}
      <img className="img-1" src="/swiggypic.jpeg" alt="Swiggy Restaurant" />

      <div id="login">
        <img className="img-2" src="/logo.png" alt="Swiggy Logo" />
        <a
          className="l1"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          <b>Login</b>
        </a>
        <button
          className="btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
          aria-controls="offcanvasScrolling"
        >
          Sign up
        </button>

        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="false"
          data-bs-backdrop="true"
          tabIndex="-1"
          id="offcanvasScrolling"
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <h3>Login or create an account</h3>
            <div className="Phone">
              <input
                type="text"
                placeholder="Phone number"
                className="form-control"
              />
            </div>
            <div className="log">
              <button className="btn btn-dark" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="terms">
              <p>
                By continuing, you agree to our{" "}
                <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section */}
      <h1 id="headline">HUNGRY?</h1>
      <p>Order food from favourite restaurants near you.</p>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter your delivery location"
        />
          <button className="search-button" onClick={handleFind}>Find Food</button>
      </div>
      {warning && <p style={{ color: "red", fontSize: "12px" }}>{warning}</p>}

      <p className="pop">POPULAR CITIES IN INDIA</p>
      <div className="popular">
        {/* Cities as before */}
        <a className="l2" href="https://www.swiggy.com/city/ahmedabad">
          <p className="pop1">Ahmedabad</p>
        </a>
        <a className="l2" href="https://www.swiggy.com/city/bangalore">
          <p className="pop2">Bangalore</p>
        </a>
        <a class="l2" href="https://www.swiggy.com/city/chennai"
            ><p class="pop1">Chennai</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/delhi"
            ><p class="pop2">Delhi</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/gurgaon"
            ><p class="pop1">Gurgaon</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/hyderabad"
            ><p class="pop2">Hyderabad</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/kolkata"
            ><p class="pop1">Kolkata</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/mumbai"
            ><p class="pop2">Mumbai</p></a
          >
          <a class="l2" href="https://www.swiggy.com/city/pune"
            ><p class="pop1">Pune</p></a
          >
          <a class="l2" href="https://www.swiggy.com/auth#city-links"
            ><p class="pop2">& more.</p></a
          >
      </div>

      <img className="img-3" src="/sdown.jpg" alt="Scroll down" />

      {/* Bottom Section */}
      <div className="content">
        <div className="down">
          <h2 style={{ fontWeight: "bolder" }}>Restaurants in your pocket</h2>
          <h5 className="down-con">
            Order from your favorite restaurants & track on the go, with the
            all-new Swiggy app.
          </h5>
          <div className="apps">
            <a href="https://play.google.com/store/apps/details?id=in.swiggy.android">
              <img className="img-5" src="/play.png" alt="Play Store" />
            </a>
            <a href="https://apps.apple.com/in/app/swiggy-food-grocery-dineout/id989540920">
              <img className="img-6" src="/iOS_ajgrty.avif" alt="App Store" />
            </a>
          </div>
        </div>
        <img className="img-4" src="/s2.png" alt="Mobile App" />
      </div>
    </div>
  );
}

export default LandingPage;
