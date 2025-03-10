const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const checkPermissions = (...requiredPermissions) => {
  return (req, res, next) => {
    const { role, permissions } = req.user;

    if (role === "admin") {
      return next();
    }

    if (
      permissions &&
      requiredPermissions.some((permission) => permissions.includes(permission))
    ) {
      return next();
    }

    return res.status(403).json({ message: "Permission denied" });
  };
};

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken || refreshToken === "undefined") {
          return res.status(401).json({ message: "No refresh token provided" });
        }

        try {
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.JWT_SECRET
          );
          const newAccessToken = jwt.sign(
            {
              id: decodedRefreshToken.id,
              username: decodedRefreshToken.username,
              role: decodedRefreshToken.role,
              permissions: decodedRefreshToken.permissions,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10s" }
          );
          req.setHeader("authorization", newAccessToken);
          res.setHeader("authorization", newAccessToken);
          req.user = decodedRefreshToken;
          next();
        } catch (err) {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      } else {
        return res.status(401).json({ message: "Invalid access token" });
      }
    }
  } catch (error) {
    console.error("Error checking token:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { auth, checkPermissions, checkToken };
