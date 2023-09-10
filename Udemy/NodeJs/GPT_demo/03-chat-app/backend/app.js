const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const chatHistory = []; // Store chat messages in memory

// Use CORS middleware to allow cross-origin requests from port 3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));

io.on('connection', (socket) => {
    console.log('a user connected');

    // Send chat history to the newly connected user
    socket.emit('load chat history', chatHistory);

    socket.on('chat message', (msg) => {
        chatHistory.push(msg); // Store the message in chat history
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

