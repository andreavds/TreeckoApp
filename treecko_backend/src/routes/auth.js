const express = require('express');
const { registerUser, loginUser, fetchUserInfo } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
/*
POST /login: The user sends their username and password to the server. If valid, a JWT
token is returned.
*/
router.post('/login', loginUser);
router.get('/userinfo', verifyToken, fetchUserInfo);

module.exports = router;