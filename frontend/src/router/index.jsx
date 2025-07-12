import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Pages
import Home from "../pages/home/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Catch all route - 404 */}
      <Route
        path="*"
        element={
          <div
            style={{
              minHeight: "100vh",
              backgroundColor: "#f8f9fa",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: "4rem", margin: 0, color: "#dc3545" }}>
              404
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#6c757d",
                marginBottom: "20px",
              }}
            >
              Page not found
            </p>
            <a
              href="/"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "6px",
              }}
            >
              Go Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
