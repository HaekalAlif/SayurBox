import api from "../api";

// List all orders for user
export function getOrders() {
  return api.get("/api/orders");
}

// Get single order
export function getOrder(id) {
  return api.get(`/api/orders/${id}`);
}

// Checkout from cart
export function checkoutCart(data) {
  // data: { delivery_slot: ... }
  return api.post("/api/orders/checkout-cart", data);
}

// Buy now (beli langsung tanpa cart)
export function buyNow(data) {
  // data: { product_id, quantity, price, delivery_slot }
  return api.post("/api/orders/buy-now", data);
}

// Update order (status, payment, delivery_slot)
export function updateOrder(id, data) {
  return api.put(`/api/orders/${id}`, data);
}

// Delete order
export function deleteOrder(id) {
  return api.delete(`/api/orders/${id}`);
}

//admin get all orders
export function getAllOrders() {
  return api.get("/api/admin/orders");
}
