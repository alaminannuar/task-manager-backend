const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.3")
    .then(() => {
        const app = express();
        app.use(cors({
            origin: 'http://localhost:5173', // allow your frontend origin
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            credentials: true, // if you send cookies or auth headers
        }));
        app.use(express.json());

        app.use("/auth", authRoutes);
        app.use("/tasks", taskRoutes);

        app.listen(3000, () => console.log("Task Manager API running on port 3000"));
});
