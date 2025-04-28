const express = require('express');
const { createTask, getTasksForBoard, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management inside boards (requires authentication)
 */

/**
 * @swagger
 * /tasks/boards/{id}/tasks:
 *   post:
 *     summary: Create a new task in a board
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Board ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Homepage
 *               description:
 *                 type: string
 *                 example: Create the initial homepage design
 *               status:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 1
 *                 description: 1 = To Do, 2 = In Progress, 3 = Done
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task created successfully
 *       400:
 *         description: Bad Request (Invalid title or status)
 *       404:
 *         description: Board not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /tasks/boards/{id}/tasks:
 *   get:
 *     summary: Get all tasks for a board
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Board ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Tasks fetched successfully
 *                 tasks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       title:
 *                         type: string
 *                         example: Design Homepage
 *                       description:
 *                         type: string
 *                         example: Create the initial homepage design
 *                       status:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-04-26T15:00:00.000Z
 *       404:
 *         description: Board not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Design Landing Page
 *               description:
 *                 type: string
 *                 example: Revise the homepage design
 *               status:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 2
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task updated successfully
 *       400:
 *         description: Bad Request (Invalid input)
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Task ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Task deleted successfully
 *       404:
 *         description: Task not found
 *       401:
 *         description: Unauthorized
 */

router.post('/boards/:id/tasks', authMiddleware, createTask);
router.get('/boards/:id/tasks', authMiddleware, getTasksForBoard);
router.put('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);

module.exports = router;
