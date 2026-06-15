import { Link } from "react-router-dom";
import "./landingfile.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <div className="landing-icon">📋</div>
        
        <h1 className="landing-title">Contact Manager</h1>
        
        <p className="landing-subtitle">
          Organize and manage your contacts in one place
        </p>

        <div className="landing-divider"></div>

        <div className="landing-buttons">
          <Link to="/login" className="btn-login">
            <span>🔐 Login</span>
          </Link>

          <Link to="/register" className="btn-register">
            <span>👤 Create account</span>
          </Link>
        </div>

        <p className="landing-footer">
          Secure · Private · Always available
        </p>
      </div>
    </div>
  );
};

export default LandingPage;