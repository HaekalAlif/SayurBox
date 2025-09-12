import api from "../api";

export function getCategories() {
  return api.get("/api/categories");
}

export function getCategory(id) {
  return api.get(`/api/categories/${id}`);
}

export function createCategory(data) {
  return api.post("/api/categories", data);
}

export function updateCategory(id, data) {
  return api.put(`/api/categories/${id}`, data);
}

export function deleteCategory(id) {
  return api.delete(`/api/categories/${id}`);
}
