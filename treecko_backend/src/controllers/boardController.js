const db = require('../config/db');
const { isNonEmptyString } = require('../utils/validationHelpers');

const createBoard = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId; 

        if (!isNonEmptyString(name)) {
            return res.status(400).json({ message: 'Board name is required and must be valid' });
        }

        await db.execute(
            `INSERT INTO boards (name, user_id) VALUES (?, ?)`,
            [name.trim(), userId]
        );

        res.status(201).json({ message: 'Board created successfully' });
    } catch (error) {
        console.error('Error creating board:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getBoards = async (req, res) => {
    try {
        const userId = req.userId;

        const [boards] = await db.execute(
            `SELECT id, name, created_at FROM boards WHERE user_id = ?`,
            [userId]
        );
        if (boards.length === 0) {
            return res.status(404).json({ message: 'No boards found for the user' });
        }


        res.status(200).json({ message: 'Boards fetched successfully', boards });
    } catch (error) {
        console.error('Error fetching boards:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createBoard, getBoards };