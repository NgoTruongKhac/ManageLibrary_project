import { useState } from "react";
import authApi from "../api/auth.api";

function FormSignUp({ setOpen }) {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const username = email.split("@")[0];
      const response = await authApi.signUp({
        username,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);

      setLoading(false);

      if (response.data.message) {
        handleCloseSignUp();
        setOpen(true);
        handleOpenOtp();
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorList = error.response.data.errors;

        console.log(errorList);

        const newErrors = { email: "", password: "", confirmPassword: "" };

        errorList.forEach((err) => {
          if (err.value === email) newErrors.email = err.message;
          if (err.value === password) newErrors.password = err.message;
          if (err.value === confirmPassword)
            newErrors.confirmPassword = err.message;
        });

        setErrors(newErrors);
      }
    }
  };

  const handleOpenSignIn = () => {
    handleCloseSignUp();
    // Mở modal đăng ký
    const modalSignIn = document.getElementById("form_sign_in");
    if (modalSignIn) {
      modalSignIn.showModal(); // Hoặc classList.add("modal-open")
    }
  };

  const handleCloseSignUp = () => {
    const modalSignUp = document.getElementById("form_sign_up");
    if (modalSignUp) {
      modalSignUp.close(); // Hoặc classList.remove("modal-open") nếu bạn dùng toggle class
    }
  };

  const handleOpenOtp = () => {
    const modalOtp = document.getElementById("form_otp");
    if (modalOtp) {
      modalOtp.showModal();
    }
  };

  return (
    <div className="modal-box w-100">
      <h3 className="font-bold text-lg mb-4">Đăng ký</h3>

      {/* Email Input */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Mật khẩu</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>
      <div className="form-control w-full mb-2">
        <label className="label">
          <span className="label-text">Xác nhận mật khẩu</span>
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 gap-3">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            className="w-full outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Sign In Button */}
      <div className="form-control mt-4">
        <button className="btn btn-primary w-full" onClick={handleSignUp}>
          {loading ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Đăng Ký"
          )}
        </button>
      </div>

      <div className="divider mt-6">hoặc</div>

      {/* Google Button */}
      <div className="flex flex-col gap-3">
        <button className="btn bg-white text-black border-[#e5e5e5] w-full">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Đăng nhập với Google
        </button>
      </div>

      {/* Sign Up */}
      <div className="text-center mt-6">
        <p>
          Bạn đã có tài khoản?{" "}
          <a href="#" className="link link-primary" onClick={handleOpenSignIn}>
            Đăng nhập
          </a>
        </p>
      </div>

      {/* Close Button */}
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
