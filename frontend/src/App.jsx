import React from "react";
import ApiTest from "./components/ApiTest.jsx";

function App() {
  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "20px",
          backgroundColor: "white",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            color: "#212529",
            margin: 0,
            fontSize: "2.5rem",
            fontWeight: "300",
          }}
        >
          🥬 Sayurbox
        </h1>
        <p
          style={{
            color: "#6c757d",
            margin: "10px 0 0 0",
            fontSize: "1.1rem",
          }}
        >
          Laravel + React Integration Demo
        </p>
      </div>
      <ApiTest />
    </div>
  );
}

export default App;
