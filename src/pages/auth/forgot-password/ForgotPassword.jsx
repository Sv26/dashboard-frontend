import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotController } from "../../../controllers/auth.controller";
import "./ForgotPassword.css";

import illustration from "../../../asetes/forgot.png";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    forgotController({
      email,
      onSuccess: () => {
        localStorage.setItem("resetEmail", email); // ✅ GOOD
        navigate("/verify-otp");
      },
      setError: (msg) =>
        setError(msg || "Email not registered. Please enter a valid email."),
    });
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        <h1>Forgot Password?</h1>
        <p className="forgot-subtitle">
          No worries! Enter your email and we&apos;ll send you a reset code.
        </p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Example@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        {/* 🔴 INLINE ERROR (INNER HTML) */}
        {error && <p className="forgot-error">{error}</p>}

        <button className="forgot-primary" onClick={handleSendOtp}>
          Send OTP
        </button>

        <p className="forgot-footer">
          Remember your password?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>

      <div className="forgot-visual">
        <div className="forgot-illustration-wrapper">
          <img
            src={illustration}
            alt="Forgot password illustration"
            className="forgot-illustration"
          />
        </div>
      </div>
    </div>
  );
}
