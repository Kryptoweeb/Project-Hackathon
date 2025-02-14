const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Allow cross-origin requests
app.use(bodyParser.json());  // Parse incoming JSON

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/cyberscan", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// MongoDB Schema and Model
const DataSchema = new mongoose.Schema({
  url: { type: String, required: true },
  email: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const DataModel = mongoose.model("Data", DataSchema);

// POST route to receive data and save to MongoDB
app.post("/api/check", async (req, res) => {
  const { url, email } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required." });
  }

  try {
    const newData = new DataModel({ url, email });
    await newData.save();
    res.status(200).json({ message: "Data stored successfully", data: newData });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to save data to MongoDB" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
