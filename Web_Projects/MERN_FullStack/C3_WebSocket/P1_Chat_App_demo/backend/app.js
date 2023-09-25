const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const chatHistory = []; // Store chat messages in memory

// Configuring CORS for Socket.io
const io = socketIo(server, {
    cors: {
      origin: "*",  // Allow any origin to access
      methods: ["GET", "POST"],  // Allowed methods
      allowedHeaders: ["my-custom-header"],  // Allowed headers
      credentials: true  // Indicates whether or not the response to the request can be exposed when the credentials flag is true
    }
  });

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

