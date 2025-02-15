import "../styles/header.css";
import logo from "../../public/logo.jpg";
import React from "react";

function HeaderComponent({ isConnected }) {
  return (
    <header
      style={{
        backgroundColor: "#2a2a2a",
        padding: "1rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ margin: 0, color: "#ffffff" }}>
          Battlefield Management System
        </h1>
      </div>
    </header>
  );
}

export default HeaderComponent;
