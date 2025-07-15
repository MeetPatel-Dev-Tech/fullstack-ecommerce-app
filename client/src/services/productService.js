import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

export const getProducts = (search = "") => {
  return axios.get(`${API_URL}?search=${search}`);
};

export const addProduct = (product) => {
  return axios.post(API_URL, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
