// src/components/NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
function AdminNavBar({ onLogout }) {
  const handleLogoutClick = () => {
    onLogout();
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
    </nav>
  );
}

export default AdminNavBar;
