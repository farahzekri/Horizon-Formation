const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, 'bahaeddine170');

        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const checkPermissions = (requiredPermission) => {
    return (req, res, next) => {
        const { role, permissions } = req.user;

        // Check if role is admin
        if (role === 'admin') {
            return next();
        }

        // Check if permissions array exists and includes requiredPermission
        if (permissions && permissions.includes(requiredPermission)) {
            return next();
        }

        // If not authorized
        return res.status(403).json({ message: 'Permission denied' });
    };
};

module.exports = { auth, checkPermissions };
