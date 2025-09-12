import api from "../api";

// Mendapatkan cart user
export function getCart(userId) {
  return api.get(`/api/carts/${userId}`);
}

// Membuat cart baru untuk user
export function createCart(userId) {
  return api.post("/api/carts", { user_id: userId });
}

// Menghapus cart
export function deleteCart(cartId) {
  return api.delete(`/api/carts/${cartId}`);
}
