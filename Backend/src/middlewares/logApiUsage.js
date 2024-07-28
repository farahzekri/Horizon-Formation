const Log = require("../models/Log");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Middleware to log API usage
const logApiUsage = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const user = await checkUserId(token);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token, authorization denied" });
    }

    if (user.role === "sub-admin") {
      const log = new Log({
        userId: user._id,
        endpoint: req.originalUrl,
        method: req.method,
        timestamp: new Date(),
        headers: req.headers,
        body: req.body,
        userAgent: req.get("User-Agent"),
        ip: req.ip,
        responseStatus: res.locals.responseStatus,
      });
      await log.save();
      next();
    }

    if (user.role === "admin") {
      return next();
    }

    // return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.error("Logging error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = logApiUsage;

async function checkUserId(token) {
  const id = await checkToken(token);
  if (!id) {
    return null;
  }

  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("Error checking user ID:", error);
    return null;
  }
}

// Utility function to verify token and extract user ID
async function checkToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id.toString();
  } catch (error) {
    console.error("Error checking token:", error);
    return null;
  }
}
