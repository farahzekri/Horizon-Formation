const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const checkPermissions = (requiredPermission) => {
    return (req, res, next) => {
        const { role, permissions } = req.user;

        if (role === 'admin') {
            return next();
        }

        if (permissions && permissions.includes(requiredPermission)) {
            return next();
        }

        return res.status(403).json({ message: 'Permission denied' });
    };
};

module.exports = { auth, checkPermissions };
