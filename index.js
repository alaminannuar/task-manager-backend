const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables locally
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Routes
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Environment variables
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://testuser1:jsDDkAbGKQMRK3kv@cluster0.cuig9xs.mongodb.net/taskdb?retryWrites=true&w=majority";

const frontendURL =
  process.env.FRONTEND_URL || "https://task-manager-frontend-jclr.onrender.com";

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const app = express();

    // CORS setup
    app.use(
      cors({
        origin: frontendURL,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

    // Parse JSON requests
    app.use(express.json());

    // Routes
    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({ message: "Route not found" });
    });

    // Global error handler
    app.use((err, req, res, next) => {
      console.error("Global error:", err);
      res.status(500).json({ message: "Internal server error" });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Task Manager API running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
