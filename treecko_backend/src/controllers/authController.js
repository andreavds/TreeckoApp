const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { isValidEmail, isSecurePassword, isValidUsername } = require('../utils/validationHelpers');
const { generateToken } = require('../utils/jwtHandler');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!isSecurePassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character',
            });
        }
        if (!isValidUsername(username)) {
            return res.status(400).json({
                message: 'Username must be at least 3 characters long and contain only letters, numbers, and underscores',
            });
        }
        const [usernameCheck] = await db.execute(
            `SELECT id FROM users WHERE username = ?`,
            [username]
        );
        if (usernameCheck.length > 0) {
            return res.status(400).json({ message: 'Username is already taken' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Email is already in use' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = rows[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token });
        console.log(token);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


const fetchUserInfo = async (req, res) => {
    try {
        const userId = req.userId;
        const [row] = await db.execute(`SELECT * FROM users WHERE id = ?`, [userId]);
        if (row.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: row[0] });
    } catch (error) {
        console.error('Error fetching user info:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    fetchUserInfo,
};