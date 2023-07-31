// controllers/taskController.js
const Task = require("../models/Task");

const taskController = {
    getAllTasks: async (req, res) => {
        try {
            const tasks = await Task.findAll();
            res.json(tasks);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    createTask: async (req, res) => {
        const { task_name } = req.body;
        try {
            const task = await Task.create({ task_name });
            res.json(task);
        } catch (err) {
            console.error("Error creating task:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    updateTask: async (req, res) => {
        const taskId = req.params.id;
        const { completed } = req.body;
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            task.completed = completed;
            await task.save();
            res.json(task);
        } catch (err) {
            console.error("Error updating task:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    deleteTask: async (req, res) => {
        const taskId = req.params.id;
        try {
            const task = await Task.findByPk(taskId);
            if (!task) {
                return res.status(404).json({ error: "Task not found" });
            }
            await task.destroy();
            res.json({ message: "Task deleted successfully" });
        } catch (err) {
            console.error("Error deleting task:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },
};

module.exports = taskController;
