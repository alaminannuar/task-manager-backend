const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Only load dotenv in local development
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Use environment variables
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://testuser1:jsDDkAbGKQMRK3kv@cluster0.cuig9xs.mongodb.net/?appName=Cluster0";
const frontendURL =
  process.env.FRONTEND_URL ||
  "https://task-manager-frontend-jclr.onrender.com/";
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    const app = express();

    // CORS
    app.use(
      cors({
        origin:"*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        credentials: true,
      })
    );

    app.use(express.json());

    // Routes
    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);

    // Start server
    app.listen(PORT, () => {
      console.log(`Task Manager API running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
