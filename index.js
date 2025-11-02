const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require(".env").config(); // always load .env for local dev

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("Error: MONGO_URI is not defined in environment variables!");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB connected successfully.");

    const app = express();

    // CORS settings
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
    app.use(cors({
      origin: frontendURL,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }));

    app.use(express.json());

    // Routes
    app.use("/auth", authRoutes);
    app.use("/tasks", taskRoutes);

    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Task Manager API running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
