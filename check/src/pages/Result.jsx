import { useNavigate } from "react-router-dom";
import { useCompliance } from "../context/ComplianceContext";
import { jsPDF } from "jspdf";

import "./Result.css";

function Result() {
  const navigate = useNavigate();

  const { result, loading, error } = useCompliance();

  // =========================
  // NO RESULT
  // =========================

  if (!result && !loading) {
    return (
      <div className="result-page">
        <main className="result-container">
          <div className="result-card">
            <div className="result-card-header">
              <h2>No Analysis Found</h2>
            </div>

            <p style={{ padding: "20px" }}>
              Please scan a product first.
            </p>

            <button
              onClick={() => navigate("/scan")}
              className="result-report-button"
              style={{ margin: "20px" }}
            >
              ← Go to Scan
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="result-page">
        <main className="result-container">
          <div className="result-card">
            <p
              style={{
                padding: "30px",
                textAlign: "center",
              }}
            >
              🔍 Analyzing product...
            </p>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="result-page">
        <main className="result-container">
          <div className="result-action">
            <h2>❌ Analysis Failed</h2>

            <p>{error}</p>

            <button
              onClick={() => navigate("/scan")}
              className="result-report-button"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // DATA
  // =========================

  const product = result.product || {};
  const compliance = result.compliance || {};

  const checks = compliance.checks || [];

  const passed = compliance.passed || 0;
  const failed = compliance.failed || 0;
  const score = compliance.score || 0;

  // =========================
  // GENERATE PDF REPORT
  // =========================

  const generateReport = () => {
    try {
      const doc = new jsPDF();

      const reportDate = new Date().toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      );

      // =========================
      // HEADER
      // =========================

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);

      doc.text("MetrologyAI", 20, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);

      doc.text(
        "Legal Metrology Compliance Report",
        20,
        29
      );

      doc.setFontSize(9);

      doc.text(
        `Report Date: ${reportDate}`,
        20,
        37
      );

      // Horizontal line
      doc.setDrawColor(180, 180, 180);

      doc.line(20, 43, 190, 43);

      // =========================
      // COMPLIANCE SUMMARY
      // =========================

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Compliance Summary",
        20,
        56
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      doc.text(
        `Compliance Score: ${score}%`,
        20,
        67
      );

      doc.text(
        `Checks Passed: ${passed}`,
        20,
        75
      );

      doc.text(
        `Issues Detected: ${failed}`,
        20,
        83
      );

      doc.text(
        `Status: ${
          failed === 0
            ? "Potentially Compliant"
            : "Potential Non-Compliance"
        }`,
        20,
        91
      );

      // =========================
      // PRODUCT INFORMATION
      // =========================

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Product Information",
        20,
        108
      );

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      let productY = 119;

      const productInformation = [
        [
          "Product Name",
          product.productName || "Not detected",
        ],
        [
          "Category",
          product.category || "Not detected",
        ],
        [
          "Manufacturer",
          product.manufacturer || "Not detected",
        ],
        [
          "Manufacturer Address",
          product.manufacturerAddress ||
            "Not detected",
        ],
        [
          "Country of Origin",
          product.countryOfOrigin ||
            "Not detected",
        ],
        [
          "Net Quantity",
          product.netQuantity || "Not detected",
        ],
        [
          "MRP",
          product.mrp || "Not detected",
        ],
        [
          "Manufacturing Date",
          product.manufacturingDate ||
            "Not detected",
        ],
        [
          "Expiry Date",
          product.expiryDate || "Not detected",
        ],
        [
          "Best Before",
          product.bestBefore || "Not detected",
        ],
        [
          "Consumer Care",
          product.consumerCare || "Not detected",
        ],
        [
          "Dimensions",
          product.dimensions || "Not detected",
        ],
        [
          "Unit Sale Price",
          product.unitSalePrice ||
            "Not detected",
        ],
      ];

      productInformation.forEach(
        ([label, value]) => {
          const text = `${label}: ${value}`;

          const lines = doc.splitTextToSize(
            text,
            170
          );

          doc.text(lines, 20, productY);

          productY +=
            lines.length * 5 + 4;

          if (productY > 270) {
            doc.addPage();

            productY = 20;
          }
        }
      );

      // =========================
      // COMPLIANCE CHECKS
      // =========================

      if (productY > 240) {
        doc.addPage();
        productY = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      doc.text(
        "Compliance Checks",
        20,
        productY
      );

      productY += 12;

      checks.forEach((check, index) => {
        if (productY > 265) {
          doc.addPage();
          productY = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);

        doc.text(
          `${index + 1}. ${check.name}`,
          20,
          productY
        );

        productY += 6;

        doc.setFont("helvetica", "normal");

        doc.text(
          `Detected Value: ${check.value}`,
          25,
          productY
        );

        productY += 6;

        doc.text(
          `Status: ${
            check.status === "pass"
              ? "PASS"
              : "ISSUE DETECTED"
          }`,
          25,
          productY
        );

        productY += 10;

        doc.setDrawColor(
          220,
          220,
          220
        );

        doc.line(
          20,
          productY - 5,
          190,
          productY - 5
        );
      });

      // =========================
      // ISSUES
      // =========================

      if (
        compliance.issues &&
        compliance.issues.length > 0
      ) {
        if (productY > 235) {
          doc.addPage();
          productY = 20;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(15);

        doc.text(
          "Recommended Action",
          20,
          productY
        );

        productY += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        compliance.issues.forEach(
          (issue) => {
            const lines =
              doc.splitTextToSize(
                `• ${issue}`,
                165
              );

            doc.text(
              lines,
              22,
              productY
            );

            productY +=
              lines.length * 5 + 5;

            if (productY > 270) {
              doc.addPage();

              productY = 20;
            }
          }
        );
      }

      // =========================
      // DISCLAIMER
      // =========================

      if (productY > 260) {
        doc.addPage();
        productY = 20;
      }

      productY += 8;

      doc.setFont("helvetica", "italic");
      doc.setFontSize(8);

      const disclaimer =
        "This is an AI-assisted preliminary compliance check and should not be treated as a final legal determination.";

      const disclaimerLines =
        doc.splitTextToSize(
          disclaimer,
          165
        );

      doc.text(
        disclaimerLines,
        20,
        productY
      );

      // =========================
      // FOOTER
      // =========================

      const pageCount =
        doc.getNumberOfPages();

      for (
        let page = 1;
        page <= pageCount;
        page++
      ) {
        doc.setPage(page);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);

        doc.setTextColor(
          120,
          120,
          120
        );

        doc.text(
          "Generated by MetrologyAI",
          20,
          290
        );

        doc.text(
          `Page ${page} of ${pageCount}`,
          170,
          290
        );
      }

      // =========================
      // DOWNLOAD
      // =========================

      const safeName =
        (product.productName ||
          "Product")
          .replace(
            /[^a-z0-9]/gi,
            "_"
          );

      doc.save(
        `${safeName}_Compliance_Report.pdf`
      );
    } catch (error) {
      console.error(
        "PDF generation error:",
        error
      );

      alert(
        "Failed to generate the report."
      );
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <div className="result-page">

      <main className="result-container">

        {/* HEADER */}

        <div className="result-header">

          <div>

            <button
              onClick={() =>
                navigate("/scan")
              }
              className="result-back"
            >
              ← Scan Another Product
            </button>

            <h1 className="result-title">
              Compliance Result
            </h1>

            <p className="result-subtitle">
              AI-powered Legal Metrology
              analysis
            </p>

          </div>

          <button
            onClick={generateReport}
            className="result-report-button"
          >
            📄 Generate Report
          </button>

        </div>


        {/* SCORE CARD */}

        <section className="result-score-card">

          <div className="result-score-section">

            <div className="result-score">
              {score}%
            </div>

            <p className="result-score-label">
              Compliance Score
            </p>

          </div>


          <div className="result-summary">

            <div className="result-summary-title">

              <span className="result-summary-icon">
                {failed === 0
                  ? "✅"
                  : "⚠️"}
              </span>

              <div>

                <h2>
                  {failed === 0
                    ? "Potentially Compliant"
                    : "Potential Non-Compliance"}
                </h2>

                <p>
                  {passed} checks passed ·{" "}
                  {failed} issue
                  {failed !== 1
                    ? "s"
                    : ""}{" "}
                  detected
                </p>

              </div>

            </div>


            <div className="result-progress">

              <div
                className="result-progress-fill"
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

          </div>

        </section>


        {/* PRODUCT INFORMATION */}

        <section className="result-card">

          <div className="result-card-header">

            <h2>
              📦 Product Information
            </h2>

          </div>


          <div className="result-product-grid">

            <div className="result-product-item">

              <p>
                Product Name
              </p>

              <strong>
                {product.productName ||
                  "Not detected"}
              </strong>

            </div>


            <div className="result-product-item">

              <p>
                Category
              </p>

              <strong>
                {product.category ||
                  "Not detected"}
              </strong>

            </div>


            <div className="result-product-item">

              <p>
                Manufacturer
              </p>

              <strong>
                {product.manufacturer ||
                  "Not detected"}
              </strong>

            </div>


            <div className="result-product-item">

              <p>
                Country of Origin
              </p>

              <strong>
                {product.countryOfOrigin ||
                  "Not detected"}
              </strong>

            </div>

          </div>

        </section>


        {/* COMPLIANCE CHECKS */}

        <section className="result-card">

          <div className="result-card-header">

            <h2>
              ⚖️ Compliance Checks
            </h2>

          </div>


          <div className="result-checks">

            {checks.map(
              (check, index) => {

                const isPassed =
                  check.status ===
                  "pass";

                return (
                  <div
                    key={index}
                    className="result-check"
                  >

                    <div className="result-check-left">

                      <div
                        className={`result-check-icon ${
                          isPassed
                            ? "pass"
                            : "fail"
                        }`}
                      >
                        {isPassed
                          ? "✓"
                          : "✕"}
                      </div>


                      <div>

                        <h3>
                          {check.name}
                        </h3>

                        <p>
                          {check.value}
                        </p>

                      </div>

                    </div>


                    <span
                      className={`result-check-status ${
                        isPassed
                          ? "pass"
                          : "fail"
                      }`}
                    >
                      {isPassed
                        ? "PASS"
                        : "ISSUE DETECTED"}
                    </span>

                  </div>
                );
              }
            )}

          </div>

        </section>


        {/* RECOMMENDED ACTION */}

        {failed > 0 && (

          <section className="result-action">

            <h2>
              💡 Recommended Action
            </h2>

            <p>
              {compliance.issues?.length >
              0
                ? compliance.issues.join(
                    " "
                  )
                : "Review the detected compliance issues and verify the product package."}
            </p>

          </section>

        )}


        {/* DISCLAIMER */}

        <p className="result-disclaimer">

          This is an AI-assisted
          preliminary compliance check
          and should not be treated as a
          final legal determination.

        </p>

      </main>

    </div>
  );
}

export default Result;