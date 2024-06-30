const Log = require("../models/Log"); 
const User = require("../models/user"); 
const jwt = require("jsonwebtoken");

const logApiUsage = async (req, res, next) => {
  
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const isSubAdmin = await checkUserId(token);
    if (isSubAdmin.role == 'sub-admin') {
      const log = new Log({
        userId: isSubAdmin._id,
        endpoint: req.originalUrl,
        method: req.method,
        timestamp: new Date(),
      });
      await log.save();
    } else {
      if (isSubAdmin.role == 'admin'){
        next();
      }
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error("Logging error:", error);
    next();
  }
};

module.exports = logApiUsage;

async function checkUserId(token) {
  const id = await checkToken(token);
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error("Error checking user ID:", error);
    return ;
  }
}
async function checkToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id.toString();
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
}
