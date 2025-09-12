import api from "../api";

// Menambah item ke cart
export function addCartItem(cartId, productId, quantity) {
  return api.post("/api/cart-items", {
    cart_id: cartId,
    product_id: productId,
    quantity,
  });
}

// Update item di cart
export function updateCartItem(itemId, quantity) {
  return api.put(`/api/cart-items/${itemId}`, { quantity });
}

// Hapus item dari cart
export function deleteCartItem(itemId) {
  return api.delete(`/api/cart-items/${itemId}`);
}
