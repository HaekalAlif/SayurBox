import api from "../api";

// Mendapatkan URL lengkap untuk gambar
export function getImageUrl(path) {
  if (!path) return "/assets/default-product.png";

  const baseStorageUrl = import.meta.env.VITE_STORAGE_URL || "/storage/";
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  const cleanBaseUrl = baseStorageUrl.endsWith("/")
    ? baseStorageUrl
    : `${baseStorageUrl}/`;

  return `${cleanBaseUrl}${cleanPath}`;
}

export function getProducts() {
  return api.get("/api/products");
}

export function getProduct(id) {
  return api.get(`/api/products/${id}`);
}

export function createProduct(data) {
  // Jika data berisi file gambar (multiple), gunakan FormData
  if (Array.isArray(data.images) && data.images.length > 0) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((img) => {
          formData.append("images[]", img);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return api.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Jika tidak ada gambar, gunakan JSON biasa
  return api.post("/api/products", data);
}

export function updateProduct(id, data) {
  // Jika data berisi file gambar (multiple), gunakan FormData
  if (Array.isArray(data.images) && data.images.length > 0) {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "images") {
        data.images.forEach((img) => {
          formData.append("images[]", img);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    return api.post(`/api/products/${id}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Jika tidak ada gambar, gunakan JSON biasa
  return api.put(`/api/products/${id}`, data);
}

export function deleteProduct(id) {
  return api.delete(`/api/products/${id}`);
}

export function getProductsByCategory(categoryId) {
  return api.get(`/api/products/category/${categoryId}`);
}

export function searchProducts(query) {
  return api.get(`/api/products/search/${query}`);
}

export function getProductBySlug(slug) {
  return api.get(`/api/products/slug/${slug}`);
}

export function getProductsByCategorySlug(slug) {
  return api.get(`/api/products/category/slug/${slug}`);
}
