const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = { adminMiddleware };
