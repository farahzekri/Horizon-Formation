const Log = require("../models/Log"); 
const User = require("../models/user"); 

const logApiUsage = async (req, res, next) => {
  

  try {
    const isSubAdmin = await checkUserId(req.params.id);

    if (isSubAdmin) {
      const log = new Log({
        userId: req.params.id,
        endpoint: req.originalUrl,
        method: req.method,
        timestamp: new Date(),
      });

      await log.save();
    } else {
      console.log("User is not a sub-admin, skipping logging");
    }

    next();
  } catch (error) {
    console.error("Logging error:", error);
    next();
  }
};

module.exports = logApiUsage;

async function checkUserId(id) {
  try {
    const user = await User.findById(id);

    if (!user || user.role !== "sub-admin") {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error checking user ID:", error);
    return false;
  }
}
