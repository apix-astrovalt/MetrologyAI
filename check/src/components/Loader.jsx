import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            ⚖️
          </div>

          <div>
            <h1 className="navbar-logo-title">
              MetrologyAI
            </h1>

            <p className="navbar-logo-subtitle">
              Compliance Checker
            </p>
          </div>
        </Link>

        <div className="navbar-menu">
          <Link
            to="/"
            className={`navbar-link ${
              isActive("/") ? "active" : ""
            }`}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className={`navbar-link ${
              isActive("/dashboard") ? "active" : ""
            }`}
          >
            Dashboard
          </Link>

          <Link
            to="/scan"
            className={`navbar-link ${
              isActive("/scan") ? "active" : ""
            }`}
          >
            Scan Product
          </Link>

          <Link
            to="/history"
            className={`navbar-link ${
              isActive("/history") ? "active" : ""
            }`}
          >
            History
          </Link>
        </div>

        <Link
          to="/scan"
          className="navbar-scan-button"
        >
          🔍 Scan Now
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;