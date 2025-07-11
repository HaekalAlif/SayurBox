import React, { useState, useEffect } from "react";
import { testAPI } from "../services/api";

const ApiTest = () => {
  const [testData, setTestData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    // Auto-test connection on component mount
    testConnection();
  }, []);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    setConnectionStatus("connecting");

    try {
      const response = await testAPI.test();
      setTestData(response.data);
      setConnectionStatus("connected");
      console.log("API Response:", response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Connection failed";
      setError("Failed to connect to API: " + errorMessage);
      setConnectionStatus("disconnected");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await testAPI.getUsers();
      setUsers(response.data);
      console.log("Users:", response.data);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to fetch users";
      setError("Failed to fetch users: " + errorMessage);
      console.error("Users Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "#28a745";
      case "connecting":
        return "#ffc107";
      case "disconnected":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6",
        }}
      >
        <h2 style={{ margin: 0, marginRight: "15px" }}>
          Laravel-React Integration Test
        </h2>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: getStatusColor(),
            marginRight: "8px",
          }}
        ></div>
        <span
          style={{
            fontSize: "14px",
            color: "#6c757d",
            textTransform: "capitalize",
          }}
        >
          {connectionStatus}
        </span>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={testConnection}
          disabled={loading}
          style={{
            marginRight: "10px",
            padding: "12px 24px",
            backgroundColor: loading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {loading && connectionStatus === "connecting"
            ? "Testing..."
            : "Test API Connection"}
        </button>

        <button
          onClick={fetchUsers}
          disabled={loading || connectionStatus !== "connected"}
          style={{
            padding: "12px 24px",
            backgroundColor: loading
              ? "#6c757d"
              : connectionStatus !== "connected"
              ? "#e9ecef"
              : "#28a745",
            color: connectionStatus !== "connected" ? "#6c757d" : "white",
            border: "none",
            borderRadius: "6px",
            cursor:
              loading || connectionStatus !== "connected"
                ? "not-allowed"
                : "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {loading && connectionStatus !== "connecting"
            ? "Loading..."
            : "Fetch Users"}
        </button>
      </div>

      {error && (
        <div
          style={{
            color: "#721c24",
            marginBottom: "20px",
            padding: "12px 16px",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "6px",
            fontSize: "14px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {testData && (
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#495057", marginBottom: "10px" }}>
            ✅ API Connection Successful
          </h3>
          <div
            style={{
              background: "#f8f9fa",
              padding: "15px",
              border: "1px solid #dee2e6",
              borderRadius: "6px",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          >
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
              {JSON.stringify(testData, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {users.length > 0 && (
        <div>
          <h3 style={{ color: "#495057", marginBottom: "15px" }}>
            👥 Users from API ({users.length})
          </h3>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  padding: "15px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    color: "#212529",
                    marginBottom: "5px",
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    color: "#6c757d",
                    fontSize: "14px",
                    marginBottom: "5px",
                  }}
                >
                  📧 {user.email}
                </div>
                <div style={{ color: "#6c757d", fontSize: "12px" }}>
                  📅 {new Date(user.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
