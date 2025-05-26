// src/pages/GoogleAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCart } from "../redux/cartSlice";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      dispatch(fetchCart());
      navigate("/"); // hoặc navigate về trang trước đó
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Đang xác thực...</p>;
};

export default GoogleAuthSuccess;
