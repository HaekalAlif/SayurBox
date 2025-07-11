import axios from "axios";

// Use Vite proxy in development, full URL in production
const baseURL = import.meta.env.DEV ? "/api" : "http://localhost:8000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(
      "Making API request:",
      config.method?.toUpperCase(),
      config.url
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("API response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const testAPI = {
  test: () => api.get("/test"),
  getUsers: () => api.get("/users"),
};

export default api;
