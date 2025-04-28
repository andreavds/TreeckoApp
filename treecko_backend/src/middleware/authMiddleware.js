const { verifyToken } = require('../utils/jwtHandler');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const token = authorizationHeader.split(' ')[1];
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: error.message });
    }
};

module.exports = authMiddleware;