import { io } from "socket.io-client";

const socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
    console.log('Connected to server');
    
    socket.emit('message', 'Hello Server');
});