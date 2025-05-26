// src/context/UserContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import apiUser from "../api/user.api";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy token từ cookies -> decode -> lấy userId -> fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setLoading(false);

        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const response = await apiUser.getUser(userId);
        setUser(response.data);
        dispatch(fetchCart());
      } catch (error) {
        console.error("Lỗi khi lấy user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook để dùng trong các component
export const useUser = () => useContext(UserContext);
