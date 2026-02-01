import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPasswordController } from "../../../controllers/auth.controller";
import "./ResetPassword.css";
import illustration from "../../../asetes/Startup.png";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleReset = () => {
    setError("");

    if (!data.newPassword || !data.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (data.newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    resetPasswordController({
      data,
      onSuccess: () => navigate("/"),
      setError,
    });
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h1>Reset Password</h1>
        <p className="reset-subtitle">
          Choose a strong password to secure your account.
        </p>

        <label>New Password</label>
        <div className="reset-password">
          <input
            type={show ? "text" : "password"}
            value={data.newPassword}
            onChange={(e) => setData({ ...data, newPassword: e.target.value })}
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label>Confirm Password</label>
        <input
          type="password"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />

        {error && <p className="error">{error}</p>}

        <button className="reset-primary" onClick={handleReset}>
          Reset Password
        </button>

        {/* ✅ Back to Sign in */}
        <p className="reset-footer">
          Remembered your password?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>

      <div className="reset-visual">
        <img src={illustration} alt="Reset password" />
      </div>
    </div>
  );
}
