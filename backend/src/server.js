const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api", analyzeRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "MetrologyAI Backend is running 🚀",
  });
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully ✅");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
  });