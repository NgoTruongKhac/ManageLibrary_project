import { useState, useRef, useEffect } from "react";
import authApi from "../api/auth.api";
import { toast } from "react-toastify";
import DowntimeComponent from "./downtimes";

function FormOTP({ open }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  // Focus on first input when component mounts

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;

    // Allow only numbers
    if (isNaN(value)) return;

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value.substring(0, 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Move to previous input on backspace if current field is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim().slice(0, 6);

    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];

      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }

      setOtp(newOtp);

      // Focus on the next empty input or the last one
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex].focus();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    const otpValue = otp.join("");

    try {
      const response = await authApi.verifySignUp(otpValue);

      setIsVerifying(false);
      if (response.data) {
        setSuccess(true);
        handleCloseOtp();
        toast.success(response.data.message);
      }
    } catch (error) {
      setIsVerifying(false);

      if (error.response && error.response.data) {
        const message = error.response.data.message;

        setError(message);
      }
    }
  };

  const handleResend = () => {
    // Reset states
  };

  const handleCloseOtp = () => {
    const modalOtp = document.getElementById("form_otp");
    if (modalOtp) {
      modalOtp.close();
    }
  };

  return (
    <div className="modal-box w-100">
      <h2 className="text-2xl font-bold mb-3 text-center">
        Nhập mã xác nhận từ Email
      </h2>

      {open && <DowntimeComponent />}

      <div className="flex justify-center gap-2 mb-6 mt-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : null}
            className="input input-bordered w-12 h-12 text-center text-xl"
            maxLength={1}
            disabled={isVerifying || success}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-center text-sm mt-1 mb-1">{error}</p>
      )}

      <div className="flex flex-col justify-center w-full gap-4 mt-2">
        <button
          className={`btn btn-primary ${isVerifying ? "loading" : ""}`}
          onClick={handleVerify}
          disabled={isVerifying || success || otp.join("").length !== 6}
        >
          {isVerifying ? (
            <span className="loading loading-spinner text-white"></span>
          ) : (
            "Xác thực"
          )}
        </button>

        <div className="text-center">
          <button
            className="btn btn-link btn-sm"
            onClick={handleResend}
            disabled={isVerifying}
          >
            Gửi lại mã
          </button>
        </div>
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

export default FormOTP;
