const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      default: "Unknown Product",
    },

    category: {
      type: String,
      default: "Unknown",
    },

    extractedData: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    complianceScore: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pass", "warning", "fail"],
      default: "warning",
    },

    issues: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);