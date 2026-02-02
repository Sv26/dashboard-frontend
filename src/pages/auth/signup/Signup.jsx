import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { signupController } from "../../../controllers/auth.controller";
import "./Signup.css";
import logo from "../../../asetes/logo.png";
import illustration from "../../../asetes/illustration.png";

export default function Signup() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

    if (!data.name || !data.email || !data.password) {
      setError("All fields are required");
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    signupController({
      data,
      onSuccess: () => navigate("/"),
      setError, // ✅ inline error only
    });
  };

  return (
    <div className="signup-wrapper">
      {/* LEFT CARD */}
      <div className="signup-card">
        <h1>Create an account</h1>
        <p className="signup-subtitle">Start your journey with us today.</p>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Example@email.com"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <label>Password</label>
        <div className="signup-password">
          <input
            type={show ? "text" : "password"}
            placeholder="at least 8 characters"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button type="button" onClick={() => setShow(!show)}>
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* ✅ INLINE ERROR */}
        {error && <p className="signup-error">{error}</p>}

        <button className="signup-primary" onClick={handleSignup}>
          Sign up
        </button>

        <p className="signup-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Sign in</span>
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="signup-visual">
        <div className="signup-visual-header">
          <h2>
            Welcome to <br /> Company Name
          </h2>
          <img src={logo} alt="Logo" className="signup-visual-logo" />
        </div>

        <div className="signup-illustration-wrapper">
          <img
            src={illustration}
            alt="Dashboard illustration"
            className="signup-illustration"
          />
        </div>
      </div>
    </div>
  );
}
