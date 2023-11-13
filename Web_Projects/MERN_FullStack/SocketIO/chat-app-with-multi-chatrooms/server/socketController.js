// Dependencies (these could be passed in as needed)
const chatHistory = {
  Room1: [],
  Room2: [],
  Room3: [],
  Room4: [],
};

const usersInRooms = {
  Room1: [],
  Room2: [],
  Room3: [],
  Room4: [],
};

let countdownTimers = {
  Room1: null,
  Room2: null,
  Room3: null,
  Room4: null,
};

const socketController = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinRoom", ({ name, room }) => {
      socket.join(room);
      // ! custom properties in socket object: username, currentRoom
      socket.username = name;
      socket.currentRoom = room;

      // !Check if the user is the first to join the room  ************
      const isFirstUserInRoom = usersInRooms[room].length === 0;

      usersInRooms[room].push(name); // Add user to active users list
      io.to(room).emit("roomUsers", usersInRooms[room]); // ! Send updated user list to everyone in the room (this line broadcasts the message to every user in the specified room, including the sender)
      socket.emit("chatHistory", chatHistory[room]); // ! Send the chat history to the user when they join
      socket.emit("message", {
        user: "admin",
        text: `Welcome to ${room}, ${name}!`,
      }); // Notify the user they have joined the room (This line sends a message only to the user who has just joined the room.)

      socket.broadcast.to(room).emit("message", {
        user: "admin",
        text: `${name} has joined ${room}!`,
      }); // Broadcast to all other users in the room (This line broadcasts a message to everyone else in the room, except for the user who just joined.)


      // ! If this is the first user in the room, start a countdown  and broadcast it to the room
      if (isFirstUserInRoom) {
        let timeLeft = 10;

        countdownTimers[room] = setInterval(() => {
          io.to(room).emit("countdown", timeLeft);
          timeLeft -= 1;

          if (timeLeft < 0) {
            clearInterval(countdownTimers[room]);
            countdownTimers[room] = null;

            io.to(room).emit("message", {
              user: "admin",
              text: "This room has already lasted for 10 seconds. Now start the game!",
            });

          }
        }, 1000); // 10 seconds
      }
    });

    socket.on("sendMessage", (message) => {
      const msgObject = { user: socket.username, text: message };

      // !Store the message in the chat history
      chatHistory[socket.currentRoom].push(msgObject);

      // Broadcast the message to everyone in the room
      io.to(socket.currentRoom).emit("message", msgObject);
    });

    socket.on("disconnect", () => {
      if (socket.currentRoom) {
        const room = socket.currentRoom;
        // Remove user from active users list
        usersInRooms[room] = usersInRooms[room].filter(
          (user) => user !== socket.username
        );

        // ! Send updated user list to everyone in the room
        io.to(room).emit("roomUsers", usersInRooms[room]);

        io.to(room).emit("message", {
          user: "admin",
          text: `${socket.username} has left.`,
        });
      }
      console.log(`Client ${socket.username} disconnected!`);
    });
  });
};

module.exports = socketController;
