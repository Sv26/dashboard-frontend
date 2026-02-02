import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyOtpController,
  forgotController,
} from "../../../controllers/auth.controller";

import "./VerifyOtp.css";
import illustration from "../../../asetes/otp.png";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

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

  const handleResendOtp = () => {
    if (resending || cooldown > 0) return;

    setResending(true);

    forgotController({
      email: localStorage.getItem("resetEmail"),
      onSuccess: () => {
        alert("OTP resent");
        setCooldown(30);
        setResending(false);
      },
      setError: (msg) => {
        setError(msg || "Failed to resend OTP");
        setResending(false);
      },
    });
  };

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

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

        {/* ✅ FIXED RESEND OTP */}
        <button
          type="button"
          className={`resend-link ${
            cooldown > 0 || resending ? "disabled" : ""
          }`}
          onClick={handleResendOtp}
          disabled={cooldown > 0 || resending}
        >
          {resending
            ? "Sending..."
            : cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Resend OTP"}
        </button>

        <button className="verify-primary" onClick={handleVerifyOtp}>
          Verify OTP
        </button>
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
