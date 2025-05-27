// Import useState từ React để quản lý trạng thái
import { useState } from "react";
import authApi from "../api/auth.api"; // Import API để xử lý đăng ký

function FormSignUp({ setOpen }) {
  // Khai báo state để lưu lỗi từ server khi đăng ký
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Khai báo state để lưu dữ liệu form
  const [email, setEmail] = useState(""); // Email nhập từ form
  const [password, setPassWord] = useState(""); // Mật khẩu nhập từ form
  const [confirmPassword, setConfirmPassword] = useState(""); // Xác nhận mật khẩu
  const [loading, setLoading] = useState(false); // Trạng thái loading khi gửi request

  // Hàm xử lý đăng ký
  const handleSignUp = async () => {
    setLoading(true); // Bắt đầu loading khi gửi request
    try {
      // Tạo username từ email bằng cách lấy phần trước "@"
      const username = email.split("@")[0];

      // Gửi dữ liệu đăng ký lên API
      const response = await authApi.signUp({
        username,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data); // Kiểm tra response từ server

      setLoading(false); // Dừng loading

      // Nếu đăng ký thành công, mở modal OTP để xác minh tài khoản
      if (response.data.message) {
        handleCloseSignUp(); // Đóng modal đăng ký
        setOpen(true); // Kích hoạt trạng thái mở modal OTP
        handleOpenOtp(); // Mở modal OTP
      }
    } catch (error) {
      setLoading(false); // Dừng loading nếu gặp lỗi

      // Kiểm tra nếu có lỗi từ server
      if (error.response && error.response.data && error.response.data.errors) {
        const errorList = error.response.data.errors;

        console.log(errorList); // In danh sách lỗi để debug

        // Cập nhật lỗi vào state để hiển thị trong form
        const newErrors = { email: "", password: "", confirmPassword: "" };

        errorList.forEach((err) => {
          if (err.value === email) newErrors.email = err.message; // Lỗi email
          if (err.value === password) newErrors.password = err.message; // Lỗi mật khẩu
          if (err.value === confirmPassword)
            newErrors.confirmPassword = err.message; // Lỗi xác nhận mật khẩu
        });

        setErrors(newErrors); // Cập nhật lỗi
      }
    }
  };

  // Hàm mở modal đăng nhập
  const handleOpenSignIn = () => {
    handleCloseSignUp(); // Đóng modal đăng ký
    const modalSignIn = document.getElementById("form_sign_in");
    if (modalSignIn) {
      modalSignIn.showModal(); // Hiển thị modal đăng nhập
    }
  };

  // Hàm đóng modal đăng ký
  const handleCloseSignUp = () => {
    const modalSignUp = document.getElementById("form_sign_up");
    if (modalSignUp) {
      modalSignUp.close(); // Đóng modal
    }
  };

  // Hàm mở modal OTP để xác thực tài khoản
  const handleOpenOtp = () => {
    const modalOtp = document.getElementById("form_otp");
    if (modalOtp) {
      modalOtp.showModal(); // Hiển thị modal OTP
    }
  };

  return (
    <div className="modal-box w-100">
      <h3 className="font-bold text-lg mb-4">Đăng ký</h3>

      {/* Input Email */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <input
            type="email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Input Mật khẩu */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Mật khẩu</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <input
            type="password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassWord(e.target.value)} // Cập nhật state mật khẩu
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Input Xác nhận mật khẩu */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Xác nhận mật khẩu</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <input
            type="password"
            className="w-full outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Cập nhật state xác nhận mật khẩu
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Nút đăng ký */}
      <div className="form-control mt-4">
        <button className="btn btn-primary w-full" onClick={handleSignUp}>
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Đăng Ký"
          )}
        </button>
      </div>

      {/* Chuyển sang đăng nhập */}
      <div className="text-center mt-6">
        <p>
          Bạn đã có tài khoản?{" "}
          <a href="#" className="link link-primary" onClick={handleOpenSignIn}>
            Đăng nhập
          </a>
        </p>
      </div>

      {/* Nút đóng modal */}
      <div className="modal-action mt-6">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormSignUp;
