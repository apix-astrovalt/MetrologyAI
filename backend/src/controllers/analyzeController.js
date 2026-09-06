const { analyzeProductImage } = require("../services/geminiService");
const { checkCompliance } = require("../services/ruleEngine");
const Scan = require("../models/scan");

const analyzeProduct = async (req, res) => {
  try {
    // 1. Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a product image.",
      });
    }

    // 2. Send image to Gemini
    console.log("Analyzing image with Gemini...");

    const extractedData = await analyzeProductImage(
      req.file.buffer,
      req.file.mimetype
    );

    console.log("Gemini extraction completed.");

    // 3. Check Legal Metrology compliance
    const compliance = checkCompliance(extractedData);

    console.log("Compliance check completed.");

    // 4. Save result to MongoDB
    const scan = await Scan.create({
      productName:
        extractedData.productName || "Unknown Product",

      category:
        extractedData.category || "Unknown",

      extractedData,

      complianceScore: compliance.score,

      status: compliance.status,

      issues: compliance.issues,
    });

    console.log("Scan saved to MongoDB.");

    // 5. Send result to frontend
    res.status(200).json({
      success: true,

      message: "Product analyzed successfully.",

      data: {
        scanId: scan._id,

        product: extractedData,

        compliance,
      },
    });
  } catch (error) {
    console.error("Analysis error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze product.",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeProduct,
};