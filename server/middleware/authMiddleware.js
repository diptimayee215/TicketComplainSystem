const jwt = require("jsonwebtoken");
const User = require("../model/User");

// 🔐 Protect Middleware
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next(); // ✅ always call next if success
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

// 👑 Admin Middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).json({ message: "Access denied. Admin only." });
};

module.exports = { protect, adminOnly };