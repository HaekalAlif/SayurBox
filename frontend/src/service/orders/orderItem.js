import api from "../api";

export function getOrderItems() {
  return api.get("/api/order-items");
}

export function getOrderItem(id) {
  return api.get(`/api/order-items/${id}`);
}

export function updateOrderItem(id, data) {
  return api.put(`/api/order-items/${id}`, data);
}

export function deleteOrderItem(id) {
  return api.delete(`/api/order-items/${id}`);
}
