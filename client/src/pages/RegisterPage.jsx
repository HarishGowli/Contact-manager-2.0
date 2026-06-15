import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "./registerfile.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      await API.post("/api/auth/register", form);

      showToast("Registration successful! Please login.", "success");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response?.status === 400) {
        if (error.response?.data?.message === "User already exists") {
          showToast("User already exists. Please login instead.", "error");
        } else {
          showToast(error.response?.data?.message || "Registration failed. Please check your details.", "error");
        }
      } else if (error.response?.status === 500) {
        showToast("Server error. Please try again later.", "error");
      } else {
        showToast("Registration failed. Please check your connection and try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-icon">👤</div>

        <h1 className="register-title">Create an account</h1>

        <p className="register-subtitle">
          Join Contact Manager and stay organized
        </p>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              placeholder="e.g. Full Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="youremail@gmail.com"
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
              placeholder="••••••••"
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={isLoading}>
            <span>{isLoading ? "⏳ Creating account..." : "👤 Create account"}</span>
          </button>
        </form>

        <div className="register-divider"></div>

        <p className="register-footer">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;