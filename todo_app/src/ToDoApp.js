import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

const ToDoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");

    // Fetch tasks from the backend
    useEffect(() => {
        axios.get(API_URL).then(response => setTasks(response.data));
    }, []);

    // Add a new task
    const addTask = async () => {
        const newTask = { id: Date.now().toString(), text: taskText };
        await axios.post(API_URL, newTask);
        setTasks([...tasks, newTask]);
        setTaskText(""); 
    };

    // Delete a task
    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>To-Do List</h1>
            <input 
                type="text" 
                placeholder="Enter task..." 
                value={taskText} 
                onChange={(e) => setTaskText(e.target.value)} 
            />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.text} 
                        <button onClick={() => deleteTask(task.id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoApp;
