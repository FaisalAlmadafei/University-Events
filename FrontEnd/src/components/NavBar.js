// src/components/NavBar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar({ onLogout }) {
  const handleLogoutClick = () => {
    onLogout(); // Call the logout handler passed as a prop
  };

  return (
    <nav className="navbar">
      <Link onClick={handleLogoutClick} className="nav-item">
        Logout
      </Link>
      <Link to="/" className="nav-item">
        Home
      </Link>
      <Link to="/events" className="nav-item">
        Events
      </Link>
      <Link to="/MyEvents" className="nav-item">
        My Events
      </Link>
    </nav>
  );
}

export default NavBar;
