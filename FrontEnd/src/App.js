import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import EventsPage from "./components/EventsPage";
import MyEventsPage from "./components/MyEventsPage";
import NavBar from "./components/NavBar";
import AdminPage from "./components/AdminPage";
import "./App.css";
import AdminNavBar from "./components/AdminNaveBar";
import AdminEventPage from "./components/AdminEventPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "",
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userId", userId);
  }, [isLoggedIn, userRole, userId]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUserId(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
  };

  return (
    <Router>
      {isLoggedIn && userRole === "user" && <NavBar onLogout={handleLogout} />}
      {isLoggedIn && userRole === "admin" && (
        <AdminNavBar onLogout={handleLogout} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <AdminPage />
              ) : (
                <HomePage />
              )
            ) : (
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserRole={setUserRole}
                setUserId={setUserId}
              />
            )
          }
        />
        <Route
          path="/events"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <AdminEventPage />
              ) : (
                <EventsPage userId={userId} />
              )
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
        <Route
          path="/MyEvents"
          element={
            isLoggedIn ? (
              <MyEventsPage userId={userId} />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
