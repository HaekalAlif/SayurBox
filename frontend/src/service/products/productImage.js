import api from "../api";

// Mendapatkan semua gambar untuk produk tertentu
export function getProductImages(productId) {
  return api.get(`/api/product-images/${productId}`);
}

// Menambah gambar baru ke produk
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

// Menghapus gambar produk
export function deleteProductImage(imageId) {
  return api.delete(`/api/product-images/${imageId}`);
}

// Update gambar (misal set primary)
export function updateProductImage(imageId, data) {
  return api.put(`/api/product-images/${imageId}`, data);
}
