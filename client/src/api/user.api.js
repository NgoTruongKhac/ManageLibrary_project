import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/user`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiUser = {
  getUser: async (userId) => await API.get(`/${userId}`),
  updateUser: async (userId, data) => await API.patch(`/${userId}`, data),
  updateAvatar: async (userId, formData) =>
    await API.patch(`/${userId}/avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  getUserByEmail: async (email) => await API.get(`/search?email=${email}`),
  getAllUsers: async (page) => await API.get(`/?page=${page}`),
  deleteUser: async (userId) => await API.delete(`/${userId}`),
  createUser: async (user) => await API.post("/", user),
  updateUserAdmin: async (userId, userData) =>
    await API.patch(`/admin/${userId}`, userData),
  getTotalUsers: async () => await API.get("/total"),
};

export default apiUser;
