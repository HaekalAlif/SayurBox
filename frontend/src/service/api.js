import axios from "axios";
import Cookies from "js-cookie"; 

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
});

api.interceptors.request.use((config) => {
  const xsrfToken = Cookies.get("XSRF-TOKEN");

  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
  }

  return config;
});

export default api;
