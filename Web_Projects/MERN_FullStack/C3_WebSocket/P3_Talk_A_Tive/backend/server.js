const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const colors = require("colors"); // coloring console.log() in terminal

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoute");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // !tell server to access json data

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler); // ! general error handler

const PORT = process.env.PORT || 8080;
const server = app.listen(
  PORT,
  console.log(`Server is listening on port ${PORT}`.yellow.bold)
);

// ! socket io =============================================== //
const io = require("socket.io")(server, {
  pingTimeout: 3600000,
  cors: {
    origin: "http://localhost:3000", //
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");

  // respond to client's setup event:
  socket.on("setup", (userData) => {
    // userData is the logged-in user from frontend
    socket.join(userData._id);
    console.log(`a user ${userData._id} is connected to socket io`.yellow.bold);
    socket.emit("connected");
  });

  socket.on("join chat", (chatRoom) => {
    socket.join(chatRoom); // ! like get registered in the observer list
    console.log(`a user joined room ${chatRoom}`.red.bold);
  });

  socket.on("typing", (chatRoom) => {
    socket.to(chatRoom).emit("typing");
  });
  socket.on("stop typing", (chatRoom) => {
    socket.in(chatRoom).emit("stop typing");
  });

  // ! 接化发new message -------------------------------------------------------- //
  socket.on("new message", (newMessageReceived) => {
    // newMessageReceived is the message sent from frontend
    let chat = newMessageReceived.chat;
    if (!chat.users) {
      console.log("chat.users is undefined");
      return;
    }

    // send message to all users in the chat except the sender
    console.log(
      `${newMessageReceived.sender._id} sent a message to chat ${chat._id}}, now emit it to other users for real-time chat`
        .yellow.bold
    );
    chat.users.forEach((user) => {
      // like loop over the observer list
      if (user._id === newMessageReceived.sender._id) {
        return; // skip the sender
      }
      socket.in(user._id).emit("message received", newMessageReceived); // ! select a user then send message to that user
    });
  });

  // turn off socket if user leave
  socket.off("setup", ()=>{
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  })
});
