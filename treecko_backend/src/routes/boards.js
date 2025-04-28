const express = require('express');
const { createBoard, getBoards } = require('../controllers/boardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Boards management (requires authentication)
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards for the authenticated user
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Boards fetched successfully
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Work board
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-04-26T14:48:00.000Z
 *       404:
 *         description: No boards found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No boards found for the user
 *       401:
 *         description: Unauthorized (token missing or invalid)
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Work board
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board created successfully
 *       400:
 *         description: Board name is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Board name is required and must be valid
 *       401:
 *         description: Unauthorized (token missing or invalid)
 */

router.get('/', authMiddleware, getBoards);
router.post('/', authMiddleware, createBoard);

module.exports = router;
