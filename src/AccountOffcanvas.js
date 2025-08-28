import React, { useEffect, useState } from 'react';
import "./AccountOffcanvas.css";
const AccountOffcanvas = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    pincode: '',
    address: ''
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("hangryUser")) || {};
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("hangryUser");
    window.location.href = "/";  // Redirect to login
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex="-1"
      id="accountOffcanvas"
      aria-labelledby="accountOffcanvasLabel"
    >
      <div className="offcanvas-body">
        <div className="account-header">
          <img src="/account.png" alt="Account Logo" className="account-logo" />
          <h2>My Account</h2>
        </div>        
  <div className="account-details">
    <p><strong>Name:</strong> {user.name}</p>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>Phone:</strong> {user.phone}</p>
    <p><strong>Pincode:</strong> {user.pincode}</p>
    <p><strong>Address:</strong> {user.address}</p>
  </div>

  <div className="logout-btn-container text-center mt-4">
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  </div>
</div>


    </div>
  );
};

export default AccountOffcanvas;
