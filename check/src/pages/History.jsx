import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { getScanHistory } from "../services/api";

import "./History.css";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);

        const data = await getScanHistory();

        setHistory(data.data || data);
      } catch (error) {
        console.error("Failed to load history:", error);
        setError(error.message || "Failed to load scan history.");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const passedCount = history.filter(
    (item) => item.status === "pass"
  ).length;

  const attentionCount = history.filter(
    (item) => item.status !== "pass"
  ).length;

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="history-page">
      <Navbar />

      <main className="history-container">

        {/* Header */}
        <div className="history-header">

          <div>
            <h1 className="history-title">
              Scan History
            </h1>

            <p className="history-subtitle">
              View your previous product compliance checks.
            </p>
          </div>

          <button
            onClick={() => navigate("/scan")}
            className="history-scan-button"
          >
            🔍 Scan New Product
          </button>

        </div>

        {/* Statistics */}
        <div className="history-stats">

          <div className="history-stat-card">
            <p className="history-stat-label">
              Total Scans
            </p>

            <p className="history-stat-number">
              {history.length}
            </p>
          </div>

          <div className="history-stat-card">
            <p className="history-stat-label">
              Passed
            </p>

            <p className="history-stat-number pass">
              {passedCount}
            </p>
          </div>

          <div className="history-stat-card">
            <p className="history-stat-label">
              Needs Attention
            </p>

            <p className="history-stat-number warning">
              {attentionCount}
            </p>
          </div>

        </div>

        {/* History Card */}
        <div className="history-card">

          <div className="history-card-header">
            <h2 className="history-card-title">
              Previous Scans
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="history-empty">
              <div className="history-empty-icon">
                🔄
              </div>

              <h3 className="history-empty-title">
                Loading scans...
              </h3>

              <p className="history-empty-text">
                Fetching your scan history.
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="history-empty">

              <div className="history-empty-icon">
                ❌
              </div>

              <h3 className="history-empty-title">
                Failed to load history
              </h3>

              <p className="history-empty-text">
                {error}
              </p>

            </div>
          )}

          {/* Empty */}
          {!loading && !error && history.length === 0 && (
            <div className="history-empty">

              <div className="history-empty-icon">
                📦
              </div>

              <h3 className="history-empty-title">
                No scans yet
              </h3>

              <p className="history-empty-text">
                Scan your first product to see it here.
              </p>

              <button
                onClick={() => navigate("/scan")}
                className="history-empty-button"
              >
                Scan Product
              </button>

            </div>
          )}

          {/* History List */}
          {!loading && !error && history.length > 0 && (
            <div className="history-list">

              {history.map((item) => (

                <div
                  key={item._id}
                  className="history-item"
                >

                  <div className="history-item-content">

                    {/* Product */}
                    <div className="history-product">

                      <div className="history-product-icon">
                        📦
                      </div>

                      <div>

                        <h3 className="history-product-name">
                          {item.productName || "Unknown Product"}
                        </h3>

                        <p className="history-product-category">
                          {item.category || "Unknown"}
                        </p>

                        <p className="history-product-date">
                          {formatDate(item.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* Result */}
                    <div className="history-result">

                      <div className="history-score">

                        <p className="history-score-label">
                          Score
                        </p>

                        <p
                          className={`history-score-value ${
                            item.complianceScore >= 90
                              ? "high"
                              : item.complianceScore >= 70
                              ? "medium"
                              : "low"
                          }`}
                        >
                          {item.complianceScore}%
                        </p>

                      </div>

                      <span
                        className={`history-status ${item.status}`}
                      >
                        {item.status === "pass"
                          ? "✓ PASS"
                          : item.status === "warning"
                          ? "⚠ WARNING"
                          : "✕ ISSUES"}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          )}

        </div>

        {/* Disclaimer */}
        <p className="history-disclaimer">
          AI-assisted preliminary compliance results.
          Not a final legal determination.
        </p>

      </main>
    </div>
  );
}

export default History;