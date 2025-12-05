const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
      }
      req.user = { id: decoded.userId, email: decoded.email, isAdmin: decoded.isAdmin };
    });

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = authMiddleware;
