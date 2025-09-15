import api from "../api";

export function getOrders() {
  return api.get("/api/orders");
}

export function getOrder(id) {
  return api.get(`/api/orders/${id}`);
}

export function checkoutCart(data) {
  return api.post("/api/orders/checkout-cart", data);
}

export function buyNow(data) {
  return api.post("/api/orders/buy-now", data);
}

export function updateOrder(id, data) {
  return api.put(`/api/orders/${id}`, data);
}

export function deleteOrder(id) {
  return api.delete(`/api/orders/${id}`);
}

export function getAllOrders() {
  return api.get("/api/admin/orders");
}

export function getAdminOrder(id) {
  return api.get(`/api/admin/orders/${id}`);
}

export function updateAdminOrder(id, data) {
  return api.put(`/api/admin/orders/${id}`, data);
}
