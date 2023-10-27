const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",  // or specify the domains: ["http://domain1.com", "http://domain2.com"]
        methods: ["GET", "POST"]
    }
});

// ! REST apis ----------------------------
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

// ! socket io apis ----------------------
io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('message', (data) => {
        console.log('Message from client:', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

