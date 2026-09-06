const express = require("express");

const upload = require("../middleware/upload");

const {
  analyzeProduct,
} = require("../controllers/analyzeController");

const Scan = require("../models/scan");

const router = express.Router();


// POST /api/analyze
router.post(
  "/analyze",
  upload.single("image"),
  analyzeProduct
);


// GET /api/history
router.get("/history", async (req, res) => {
  try {
    const scans = await Scan.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: scans,
    });

  } catch (error) {
    console.error("History error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch scan history.",
    });
  }
});


module.exports = router;