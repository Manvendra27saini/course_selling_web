const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Forbidden' });
    }
}

module.exports = {userMiddleware };
