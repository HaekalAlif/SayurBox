import api from "../api";

export function getProductImages(productId) {
  return api.get(`/api/product-images/${productId}`);
}

export function addProductImage(productId, image, isPrimary = false) {
  const formData = new FormData();
  formData.append("product_id", productId);
  formData.append("image", image);
  formData.append("is_primary", isPrimary ? 1 : 0);

  return api.post("/api/product-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function deleteProductImage(imageId) {
  return api.delete(`/api/product-images/${imageId}`);
}

export function updateProductImage(imageId, data) {
  return api.put(`/api/product-images/${imageId}`, data);
}
