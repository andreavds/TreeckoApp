const express = require('express');
const { createBoard, getBoards } = require('../controllers/boardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getBoards);
router.post('/', authMiddleware, createBoard);

module.exports = router;