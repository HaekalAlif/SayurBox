import api from "../api";

// List all order items for user
export function getOrderItems() {
  return api.get("/api/order-items");
}

// Get single order item
export function getOrderItem(id) {
  return api.get(`/api/order-items/${id}`);
}

// Update order item (quantity, price, subtotal)
export function updateOrderItem(id, data) {
  return api.put(`/api/order-items/${id}`, data);
}

// Delete order item
export function deleteOrderItem(id) {
  return api.delete(`/api/order-items/${id}`);
}
