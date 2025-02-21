const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = []; // In-memory task storage

// Get all tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.json({ message: "Task added", task });
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
    tasks = tasks.filter(task => task.id !== req.params.id);
    res.json({ message: "Task deleted" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
