import axios from "axios";
import Cookies from "js-cookie"; // Import library js-cookie

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Tetap wajib untuk mengirim/menerima cookies
});

// Membuat Interceptor untuk setiap request
api.interceptors.request.use((config) => {
  // 1. Baca token dari cookie
  const xsrfToken = Cookies.get("XSRF-TOKEN");

  // 2. Jika token ada, tambahkan sebagai header
  if (xsrfToken) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(xsrfToken);
  }

  // 3. Lanjutkan request dengan header yang sudah ditambahkan
  return config;
});

export default api;
