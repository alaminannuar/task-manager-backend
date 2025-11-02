const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require(".env").config(); // load variables from .env

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

// Use MONGO_URI from .env
const mongoURI = process.env.MONGO_URI || "mongodb+srv://testuser1:jsDDkAbGKQMRK3kv@cluster0.cuig9xs.mongodb.net/?appName=Cluster0";

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => {
        const app = express();

        // Allow CORS from your frontend
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

        // Use PORT from .env or fallback to 3000
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Task Manager API running on port ${PORT}`));
    })
    .catch((err) => console.log("MongoDB connection error:", err));

