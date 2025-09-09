import api from "../api";

export function getAddresses() {
  return api.get("/api/addresses");
}

export function getAddress(id) {
  return api.get(`/api/addresses/${id}`);
}

export function createAddress(data) {
  return api.post("/api/addresses", data);
}

export function updateAddress(id, data) {
  return api.put(`/api/addresses/${id}`, data);
}

export function deleteAddress(id) {
  return api.delete(`/api/addresses/${id}`);
}

export function setDefaultAddress(id) {
  return api.post(`/api/addresses/${id}/default`);
}
