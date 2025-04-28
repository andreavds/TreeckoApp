const db = require('../config/db');
const { isNonEmptyString } = require('../utils/validationHelpers');

const createTask = async (req, res) => {
    try {
        const { id: boardId } = req.params;
        const { title, description, status } = req.body;

        if (!title || !isNonEmptyString(title)) {
            return res.status(400).json({ message: 'Task title is required and must be valid' });
        }
        if (![1, 2, 3].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value (1=To Do, 2=In Progress, 3=Done)' });
        }

        const [boardCheck] = await db.execute(
            `SELECT id FROM boards WHERE id = ?`,
            [boardId]
        );
        if (boardCheck.length === 0) {
            return res.status(404).json({ message: 'Board not found' });
        }

        await db.execute(
            `INSERT INTO tasks (title, description, status, board_id) VALUES (?, ?, ?, ?)`,
            [title.trim(), description || null, status, boardId]
        );

        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTasksForBoard = async (req, res) => {
    try {
        const { id: boardId } = req.params; 
        const [boardCheck] = await db.execute(
            `SELECT id FROM boards WHERE id = ?`,
            [boardId]
        );
        if (boardCheck.length === 0) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const [tasks] = await db.execute(
            `SELECT id, title, description, status, created_at FROM tasks WHERE board_id = ?`,
            [boardId]
        );

        res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;
        const { title, description, status } = req.body;

        if (title && !isNonEmptyString(title)) {
            return res.status(400).json({ message: 'Task title must be valid' });
        }
        if (status && ![1, 2, 3].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value (1=To Do, 2=In Progress, 3=Done)' });
        }

        const [taskCheck] = await db.execute(
            `SELECT id FROM tasks WHERE id = ?`,
            [taskId]
        );
        if (taskCheck.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await db.execute(
            `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`,
            [
                title ? title.trim() : null,
                description || null,
                status,
                taskId,
            ]
        );

        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params;

        const [taskCheck] = await db.execute(
            `SELECT id FROM tasks WHERE id = ?`,
            [taskId]
        );
        if (taskCheck.length === 0) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await db.execute(
            `DELETE FROM tasks WHERE id = ?`,
            [taskId]
        );

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { createTask, getTasksForBoard, updateTask, deleteTask };