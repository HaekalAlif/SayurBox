import api from "../api";

export function addCartItem(cartId, productId, quantity) {
  return api.post("/api/cart-items", {
    cart_id: cartId,
    product_id: productId,
    quantity,
  });
}

export function updateCartItem(itemId, quantity) {
  return api.put(`/api/cart-items/${itemId}`, { quantity });
}

export function deleteCartItem(itemId) {
  return api.delete(`/api/cart-items/${itemId}`);
}
