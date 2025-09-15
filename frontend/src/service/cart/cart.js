import api from "../api";

export function getCart(userId) {
  return api.get(`/api/carts/${userId}`);
}

export function createCart(userId) {
  return api.post("/api/carts", { user_id: userId });
}

export function deleteCart(cartId) {
  return api.delete(`/api/carts/${cartId}`);
}
