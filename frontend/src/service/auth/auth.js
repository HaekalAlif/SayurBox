import api from "../api"; // Import the configured instance

// This function will perform the "priming" request
export const getCsrfCookie = () => api.get("/sanctum/csrf-cookie");

export const register = async (data) => {
  return api.post("/api/register", data);
};

export const login = async (data) => {
  return api.post("/api/login", data);
};

export const forgotPassword = async (data) => {
  return api.post("/api/forgot-password", data);
};

export const resetPassword = async (data) => {
  return api.post("/api/reset-password", data);
};

export const verifyEmail = async (id, hash) => {
  return api.get(`/api/verify-email/${id}/${hash}`);
};

export const sendVerificationEmail = async () => {
  return api.post("/api/email/verification-notification");
};

export const logout = async () => {
  return api.post("/api/logout");
};
