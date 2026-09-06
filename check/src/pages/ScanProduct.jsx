import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import ImageUploader from "../components/ImageUploader";

import { useCompliance } from "../context/ComplianceContext";
import { analyzeProduct } from "../services/api";

import "./ScanProduct.css";

function ScanProduct() {
  const navigate = useNavigate();

  const {
  selectedImage,
  setSelectedImage,
  setResult,
  setLoading,
  setError,
} = useCompliance();

  const handleAnalyze = async () => {
    if (!selectedImage) {
      alert("Please upload a product image first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await analyzeProduct(selectedImage);

      console.log("Analysis result:", data);

      setResult(data.data);

      navigate("/result");
    } catch (error) {
      console.error("Analysis failed:", error);

      setError(error.message || "Failed to analyze product.");

      alert(error.message || "Failed to analyze product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="scan-page">
      <Navbar />

      <main className="scan-container">

        {/* Header */}
        <div className="scan-header">

          <button
            onClick={() => navigate("/")}
            className="scan-back"
          >
            ← Back
          </button>

          <h1 className="scan-title">
            Scan Product
          </h1>

          <p className="scan-description">
            Upload a clear image of the product package to check its
            Legal Metrology compliance.
          </p>

        </div>

        {/* Upload */}
        <div className="scan-upload-card">

          <ImageUploader
            onImageSelect={(file) => {
              setSelectedImage(file);
              setError(null);
            }}
          />

          {selectedImage && (
            <button
              onClick={handleAnalyze}
              className="scan-analyze-button"
            >
              🔍 Analyze Product
            </button>
          )}

        </div>

        {/* Information Cards */}
        <div className="scan-info-grid">

          <div className="scan-info-card">
            <div className="scan-info-icon">
              🤖
            </div>

            <h3 className="scan-info-title">
              AI Analysis
            </h3>

            <p className="scan-info-description">
              AI extracts information from the package.
            </p>
          </div>

          <div className="scan-info-card">
            <div className="scan-info-icon">
              ⚖️
            </div>

            <h3 className="scan-info-title">
              Rule Checking
            </h3>

            <p className="scan-info-description">
              Mandatory declarations are checked against applicable
              Legal Metrology requirements.
            </p>
          </div>

          <div className="scan-info-card">
            <div className="scan-info-icon">
              📊
            </div>

            <h3 className="scan-info-title">
              Compliance Report
            </h3>

            <p className="scan-info-description">
              Get a clear compliance result and detected potential issues.
            </p>
          </div>

        </div>

        {/* Tips */}
        <div className="scan-tips">

          <h3 className="scan-tips-title">
            📸 Tips for a Better Scan
          </h3>

          <ul className="scan-tips-list">
            <li>Use a clear and high-resolution image.</li>
            <li>Make sure the package text is readable.</li>
            <li>Capture the front and back label when necessary.</li>
            <li>Avoid glare, shadows, and blurry images.</li>
          </ul>

        </div>

        {/* Disclaimer */}
        <p className="scan-disclaimer">
          This application provides an AI-assisted preliminary
          compliance check and should not be treated as a final
          legal determination.
        </p>

      </main>
    </div>
  );
}

export default ScanProduct;