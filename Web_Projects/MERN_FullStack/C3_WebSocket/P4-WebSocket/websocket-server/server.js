const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// simple demo just 'on', not 'emit'
wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Hello from server: ${message}`);
    });

    ws.send('Welcome to the WebSocket server!');
});

server.listen(8080, () => {
    console.log('Server is listening on port 8080');
});
