import { useState } from "react";
import { useEffect } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "./loginfile.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/api/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user?.name || "User");

      showToast("Login successful! Welcome back!", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      
      if (error.response?.status === 400) {
        showToast("Invalid credentials. Please check your email and password.", "error");
      } else if (error.response?.status === 401) {
        showToast("Unauthorized. Please check your credentials.", "error");
      } else if (error.response?.status === 500) {
        showToast("Server error. Please try again later.", "error");
      } else {
        showToast("Login failed. Please check your connection and try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">🔐</div>

        <h1 className="login-title">Welcome back</h1>

        <p className="login-subtitle">Login to your Contact Manager account</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            <span>{isLoading ? "⏳ Logging in..." : "🔐 Login"}</span>
          </button>
        </form>

        <div className="login-divider"></div>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;