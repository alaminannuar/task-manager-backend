const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No authorization header" });
  }

  // Expect "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Token missing after Bearer" });
  }

  try {
    const decoded = jwt.verify(
      token,
      "w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn"
    );
    req.user = decoded; // will include id: user._id
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
