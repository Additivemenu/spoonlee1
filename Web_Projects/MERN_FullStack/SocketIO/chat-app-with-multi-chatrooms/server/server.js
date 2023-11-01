const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const socketController = require('./socketController');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});
 

// ! REST api ---------------------------------
app.get('/', (req, res) => {
    res.send('Chat server is up and running!');
});

// ! socket io --------------------------------
socketController(io);  // Set up the socket listeners

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
