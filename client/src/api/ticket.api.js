import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL: `${apiUrl}/api/v1/ticket`,
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const ticketApi = {
  createTicket: async (ticketBody) => await API.post("/", ticketBody),
  createTicketAdmin: async (userId, ticketBody) =>
    await API.post(`/${userId}`, ticketBody),
  getTicketByStatus: async (status) => await API.get(`/${status}`, status),
  setTicketStatus: async (ticketId, status) =>
    await API.patch(`${ticketId}/?status=${status}`),
  deleteTicket: async (ticketId) => await API.delete(`/${ticketId}`),
  getAllTicketByStatus: async (status, page) =>
    await API.get(`/admin/${status}?page=${page}`),
  getTotalTickets: async () => await API.get("/total"),
};

export default ticketApi;
