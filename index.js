// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Import routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Environment variables
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://testuser1:jsDDkAbGKQMRK3kv@cluster0.cuig9xs.mongodb.net/?appName=Cluster0";

const PORT = process.env.PORT || 5000;

// Frontend URLs (Render + Localhost)
const allowedOrigins = [
  "https://task-manager-frontend-jclr.onrender.com",
  "http://localhost:5173",
];

// Initialize app
const app = express();

// Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the origin ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Root route (quick test)
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running 🚀" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err.message);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Connect to MongoDB and start server
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Task Manager API running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
