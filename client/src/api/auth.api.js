import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

// Tao url api
const API = axios.create({
  baseURL: `${apiUrl}/api/v1/auth`,
  withCredentials: true,
});
// api auth
const authApi = {
  signUp: async (data) => await API.post("/sign-up", data),
  verifySignUp: async (otp) => await API.post("/verify-sign-up", { otp }),
  signIn: async (data) => await API.post("/sign-in", data),
  signInWithGoogle: () => {
    window.location.href = `${apiUrl}/api/v1/auth/google`;
  },
  logOut: async () => await API.get("/log-out"),
};
export default authApi;
