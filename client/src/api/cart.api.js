import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/cart`,
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiCart = {
  addCart: async (bookId) => await API.post(`/${bookId}`),
  getCarts: async () => await API.get("/"),
  deleteCart: async (bookId) => await API.delete(`/${bookId}`),
  updateCart: async (bookId, data) => await API.patch(`/${bookId}`, data),
};

export default apiCart;
