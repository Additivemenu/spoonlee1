const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Dummy in-memory database
const tasks = [
    { id: 1, description: 'Learn Express.js' },
    { id: 2, description: 'Create RESTful API' }
];

// READ all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// READ a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

// CREATE a new task
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.description
    };
    tasks.push(newTask);
    res.json(newTask);
});

// UPDATE a task by ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).send('Task not found');
    task.description = req.body.description;
    res.json(task);
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id, 10);
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return res.status(404).send('Task not found');
    tasks.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
