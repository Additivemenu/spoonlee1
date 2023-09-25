const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Configuring CORS for Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*",  // Allow any origin to access
    methods: ["GET", "POST"],  // Allowed methods
    allowedHeaders: ["my-custom-header"],  // Allowed headers
    credentials: true  // Indicates whether or not the response to the request can be exposed when the credentials flag is true
  }
});

// Configuring CORS for Express (if needed for other routes)
app.use(cors());

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    console.log("someone posted a message, now emit it to all users");
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(8080, () => {
  console.log("Listening on port 8080");
});
