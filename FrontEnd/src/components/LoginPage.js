// src/components/LoginPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

function LoginPage({ setIsLoggedIn, setUserRole, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `https://localhost:7183/api/My/LogIn?ID=${username}&Pass=${password}`;
      const response = await axios.get(url);

      if (response.status === 200 && response.data) {
        setIsLoggedIn(true);
        setUserRole(response.data.role);
        setUserId(response.data.userId);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userId", response.data.userId.toString());
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error", error);
      alert("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
