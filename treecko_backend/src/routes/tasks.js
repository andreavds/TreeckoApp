const express = require('express');
const { createTask, getTasksForBoard, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/boards/:id/tasks', authMiddleware, createTask);
router.get('/boards/:id/tasks', authMiddleware, getTasksForBoard);
router.put('/tasks/:id', authMiddleware, updateTask);
router.delete('/tasks/:id', authMiddleware, deleteTask);


module.exports = router;
