const { verifyToken } = require('../utils/jwtHandler');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied' });
    }

    try {
        const token = authorizationHeader.split(' ')[1]; // Extract the token from "Bearer <token>"
        const decoded = verifyToken(token); // Use the utility function to verify the token
        req.userId = decoded.userId; // Attach userId from the payload to the request
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        res.status(401).json({ message: error.message });
    }
};

module.exports = authMiddleware;