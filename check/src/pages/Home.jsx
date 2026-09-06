import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-badge">
          ⚖️ AI-Powered Legal Metrology
        </div>

        <h1 className="home-title">
          Check Product Labels
          <br />
          <span className="home-title-highlight">
            Smarter with AI
          </span>
        </h1>

        <p className="home-description">
          Upload a product package image and let AI identify
          mandatory declarations and check them against Legal
          Metrology requirements.
        </p>

        <div className="home-actions">
          <Link
            to="/scan"
            className="home-primary-button"
          >
            🔍 Scan Product
          </Link>

          <Link
            to="/dashboard"
            className="home-secondary-button"
          >
            📊 View Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="home-features">

        <div className="home-feature-card">
          <div className="home-feature-icon">
            🤖
          </div>

          <h3 className="home-feature-title">
            AI Image Analysis
          </h3>

          <p className="home-feature-description">
            Upload a product image and AI extracts important
            information from the package label.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="home-feature-icon">
            ⚖️
          </div>

          <h3 className="home-feature-title">
            Rule Checking
          </h3>

          <p className="home-feature-description">
            Extracted declarations are checked against applicable
            Legal Metrology requirements.
          </p>
        </div>

        <div className="home-feature-card">
          <div className="home-feature-icon">
            📊
          </div>

          <h3 className="home-feature-title">
            Compliance Report
          </h3>

          <p className="home-feature-description">
            Get a simple report showing detected declarations
            and potential issues.
          </p>
        </div>

      </section>

      {/* How It Works */}
      <section className="home-section">

        <div className="home-section-header">
          <h2 className="home-section-title">
            How It Works
          </h2>

          <p className="home-section-description">
            Three simple steps to analyze a product.
          </p>
        </div>

        <div className="home-steps">

          <div className="home-step">
            <div className="home-step-number">
              1
            </div>

            <h3 className="home-step-title">
              Upload
            </h3>

            <p className="home-step-description">
              Upload a clear image of the product package.
            </p>
          </div>

          <div className="home-step">
            <div className="home-step-number">
              2
            </div>

            <h3 className="home-step-title">
              Analyze
            </h3>

            <p className="home-step-description">
              AI extracts label information and identifies
              relevant declarations.
            </p>
          </div>

          <div className="home-step">
            <div className="home-step-number">
              3
            </div>

            <h3 className="home-step-title">
              Get Report
            </h3>

            <p className="home-step-description">
              View the compliance checks and potential issues.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="home-section home-cta">

        <div className="home-section-header">
          <h2 className="home-section-title">
            Ready to Check a Product?
          </h2>

          <p className="home-section-description">
            Start your first AI-assisted compliance scan.
          </p>

          <div className="home-actions">
            <Link
              to="/scan"
              className="home-primary-button"
            >
              🔍 Start Scanning
            </Link>
          </div>
        </div>

      </section>

      {/* Disclaimer */}
      <div className="home-disclaimer">
        This application provides an AI-assisted preliminary
        compliance check and should not be treated as a final
        legal determination.
      </div>
    </div>
  );
}

export default Home;