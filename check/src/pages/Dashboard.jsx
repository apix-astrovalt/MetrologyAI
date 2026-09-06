import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getScanHistory } from "../services/api";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getScanHistory();

        setScans(response.data || []);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalScans = scans.length;

  const passedScans = scans.filter(
    (scan) => scan.status === "pass"
  ).length;

  const warningScans = scans.filter(
    (scan) => scan.status === "warning"
  ).length;

  const failedScans = scans.filter(
    (scan) => scan.status === "fail"
  ).length;

  const averageScore =
    scans.length > 0
      ? Math.round(
          scans.reduce(
            (total, scan) => total + scan.complianceScore,
            0
          ) / scans.length
        )
      : 0;

  const recentScans = scans.slice(0, 5);

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-container">

        {/* Header */}
        <div className="dashboard-header">

          <div>
            <h1 className="dashboard-title">
              Dashboard
            </h1>

            <p className="dashboard-subtitle">
              Overview of your product compliance analysis.
            </p>
          </div>

          <button
            onClick={() => navigate("/scan")}
            className="dashboard-scan-button"
          >
            🔍 Scan New Product
          </button>

        </div>

        {/* Statistics */}
        <div className="dashboard-stats">

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              📦
            </div>

            <div>
              <p className="dashboard-stat-label">
                Total Scans
              </p>

              <p className="dashboard-stat-value">
                {loading ? "..." : totalScans}
              </p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              ✅
            </div>

            <div>
              <p className="dashboard-stat-label">
                Passed
              </p>

              <p className="dashboard-stat-value green">
                {loading ? "..." : passedScans}
              </p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              ⚠️
            </div>

            <div>
              <p className="dashboard-stat-label">
                Warnings
              </p>

              <p className="dashboard-stat-value yellow">
                {loading ? "..." : warningScans}
              </p>
            </div>
          </div>

          <div className="dashboard-stat-card">
            <div className="dashboard-stat-icon">
              ❌
            </div>

            <div>
              <p className="dashboard-stat-label">
                Issues
              </p>

              <p className="dashboard-stat-value red">
                {loading ? "..." : failedScans}
              </p>
            </div>
          </div>

        </div>

        {/* Main Grid */}
        <div className="dashboard-grid">

          {/* Recent Scans */}
          <section className="dashboard-card">

            <div className="dashboard-card-header">

              <h2 className="dashboard-card-title">
                Recent Scans
              </h2>

              <button
                onClick={() => navigate("/history")}
                className="dashboard-card-link"
              >
                View All →
              </button>

            </div>

            <div className="dashboard-scan-list">

              {loading ? (
                <p style={{ padding: "20px" }}>
                  Loading recent scans...
                </p>
              ) : recentScans.length === 0 ? (
                <p style={{ padding: "20px" }}>
                  No scans yet.
                </p>
              ) : (
                recentScans.map((scan) => (

                  <div
                    key={scan._id}
                    className="dashboard-scan-item"
                  >

                    <div className="dashboard-product">

                      <div className="dashboard-product-icon">
                        📦
                      </div>

                      <div>

                        <h3 className="dashboard-product-name">
                          {scan.productName || "Unknown Product"}
                        </h3>

                        <p className="dashboard-product-category">
                          {scan.category || "Unknown"}
                        </p>

                      </div>

                    </div>

                    <div className="dashboard-scan-result">

                      <div
                        className={`dashboard-score ${
                          scan.complianceScore >= 90
                            ? "high"
                            : scan.complianceScore >= 70
                            ? "medium"
                            : "low"
                        }`}
                      >
                        {scan.complianceScore}%
                      </div>

                      <span
                        className={`dashboard-status ${scan.status}`}
                      >
                        {scan.status === "pass"
                          ? "✓ PASS"
                          : scan.status === "warning"
                          ? "⚠ WARNING"
                          : "✕ ISSUES"}
                      </span>

                    </div>

                  </div>

                ))
              )}

            </div>

          </section>

          {/* Quick Scan */}
          <section className="dashboard-card dashboard-quick-scan">

            <div className="dashboard-quick-icon">
              🔍
            </div>

            <h2 className="dashboard-quick-title">
              Analyze a Product
            </h2>

            <p className="dashboard-quick-description">
              Upload a product package image and let AI
              identify mandatory declarations and potential
              compliance issues.
            </p>

            <button
              onClick={() => navigate("/scan")}
              className="dashboard-scan-button"
            >
              Start New Scan
            </button>

          </section>

        </div>

        {/* Overview */}
        <section className="dashboard-overview">

          <div className="dashboard-card-header">

            <h2 className="dashboard-card-title">
              Compliance Overview
            </h2>

          </div>

          <div className="dashboard-progress">

            <div className="dashboard-progress-header">

              <span>
                Average Compliance Score
              </span>

              <strong>
                {loading ? "..." : `${averageScore}%`}
              </strong>

            </div>

            <div className="dashboard-progress-bar">

              <div
                className="dashboard-progress-fill"
                style={{
                  width: `${averageScore}%`,
                }}
              />

            </div>

          </div>

        </section>

        {/* Disclaimer */}
        <p className="dashboard-disclaimer">
          AI-assisted preliminary compliance results.
          Not a final legal determination.
        </p>

      </main>
    </div>
  );
}

export default Dashboard;