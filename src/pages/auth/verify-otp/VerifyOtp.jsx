import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOtpController } from "../../../controllers/auth.controller";

import "./VerifyOtp.css";
import illustration from "../../../asetes/otp.png";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerifyOtp = () => {
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    verifyOtpController({
      otp,
      onSuccess: () => navigate("/reset-password"),
      setError: (msg) => setError(msg || "Invalid OTP. Please try again."),
    });
  };

  return (
    <div className="verify-wrapper">
      <div className="verify-card">
        <h1>Verify OTP</h1>
        <p className="verify-subtitle">
          Enter the 6-digit code sent to your email.
        </p>

        <label>OTP</label>
        <input
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setError("");
          }}
        />

        {error && <p className="verify-error">{error}</p>}

        <button className="verify-primary" onClick={handleVerifyOtp}>
          Verify OTP
        </button>

        <p className="verify-footer">
          Didn&apos;t receive it?{" "}
          <span onClick={() => navigate("/forgot-password")}>Resend OTP</span>
        </p>
      </div>

      <div className="verify-visual">
        <div className="verify-illustration-wrapper">
          <img
            src={illustration}
            alt="Verify OTP illustration"
            className="verify-illustration"
          />
        </div>
      </div>
    </div>
  );
}
