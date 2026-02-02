import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { loginController } from "../../../controllers/auth.controller";
import "./Login.css";
import logo from "../../../asetes/logo.png";
import illustration from "../../../asetes/illustration.png";

export default function Login() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!data.email || !data.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    loginController({
      data,
      onSuccess: ({ name }) => {
        localStorage.setItem("user", name);

        navigate("/dashboard");
      },
      setError: (msg) => setError(msg),
    });
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>Log in to your account</h1>
        <p className="login-subtitle">
          Welcome back! Please enter your details.
        </p>

        <label>Email</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Password</label>
        <div className="login-password">
          <input
            type={show ? "text" : "password"}
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="login-forgot">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>

        {/* ✅ INLINE ERROR */}
        {error && <p className="login-error">{error}</p>}

        <button className="login-primary" onClick={handleLogin}>
          Sign in
        </button>

        <p className="login-footer">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>

      <div className="login-visual">
        <div className="login-visual-header">
          <h2>
            Welcome to <br /> Company Name
          </h2>
          <img src={logo} alt="Logo" className="login-visual-logo" />
        </div>

        <div className="login-illustration-wrapper">
          <img
            src={illustration}
            alt="Illustration"
            className="login-illustration"
          />
        </div>
      </div>
    </div>
  );
}
