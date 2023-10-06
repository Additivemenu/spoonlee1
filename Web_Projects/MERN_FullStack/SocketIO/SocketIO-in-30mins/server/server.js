const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// /user nameSapce ---------------------------------------------
const userIo = io.of("/user"); // ! create a namespace
userIo.on("connection", (socket) => {
  console.log("connected to /user namespace with username: " + socket.username);
});

userIo.use((socket, next) => {
  if (socket.handshake.auth.token) {
    socket.username = getUsernameFromToken(socket.handshake.auth.token);
    next();
  } else {
    next(new Error("Please send token"));
  }
});

function getUsernameFromToken(token) {
  return token;
}

// normal namespace ---------------------------------------------
// each time a user connects to the server, we assign a socket object to each of them. It's like a session.
io.on("connection", (socket) => {
  // ! so code in this callback is per user since socket is per user
  console.log("New User Connected", `, socket id: ${socket.id}`);

  socket.on("send-message", (message, room) => {
    if (room === "") {
      // no room specified, send message to all users except the sender
      socket.broadcast.emit(
        "receive-message",
        `no room, server received message: ${message}`
      );
    } else {
      // for a targeted room, send message to all users in the room except the sender
      socket
        .to(room)
        .emit(
          "receive-message",
          `there is a room ${room},  server received message: ${message}`
        );
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined ${room}`); // ! display message: `Joined ${room}` in frontend, like a remote method invocation
  });

  socket.on("ping", (n) => console.log(n));
});

instrument(io, { auth: false });
